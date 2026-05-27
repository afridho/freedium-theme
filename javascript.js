(function () {
    "use strict";

    function initThemeSelector() {
        if (document.getElementById("theme-selector-root")) return;

        // 0. Penukaran Favicon Freedium ke Medium
        function changeFavicon() {
            // Hapus favicon bawaan Freedium agar tidak bentrok
            let links = document.querySelectorAll("link[rel*='icon']");
            links.forEach((link) => link.parentNode.removeChild(link));

            // Buat elemen link baru menggunakan favicon resmi Medium
            let newLink = document.createElement("link");
            newLink.type = "image/x-icon";
            newLink.rel = "shortcut icon";
            newLink.href = "https://favicon.im/medium.com";

            document.getElementsByTagName("head")[0].appendChild(newLink);
        }
        changeFavicon();

        // 1. Inject styling transisi global ke body secara dinamis
        const style = document.createElement("style");
        style.textContent = `
      body, main, article, p, span, h1, h2, h3, div, pre, code {
        transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                    color 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                    border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
    `;
        document.head.appendChild(style);

        // 2. Injeksi ID ke Profile Card & Restrukturisasi DOM (DIJADIKAN SATU BLOK AMAN)
        const authorCard = document.querySelector(
            ".m-2.mt-5.bg-gray-100, .bg-gray-100.dark\\:bg-gray-600",
        );
        if (authorCard) {
            authorCard.setAttribute("id", "freedium-author-card");

            // Menggabungkan struktur teks agar metadata pindah tepat di bawah nama penulis
            const textContainer = authorCard.querySelector(".flex-grow");
            const metaContainer = authorCard.querySelector(".px-4.pb-2");
            if (textContainer && metaContainer) {
                textContainer.appendChild(metaContainer);
            }
        }

        // 3. Hapus element link "< Go to the original" (Atas & Bawah)
        document
            .querySelectorAll("p.pb-3.text-green-500")
            .forEach((el) => el.remove());

        // 4. Injeksi ID untuk Tags Controller
        const tagContainer = document.querySelector(
            "div.flex.flex-wrap.gap-2.mt-5",
        );
        if (tagContainer) {
            tagContainer.setAttribute("id", "freedium-article-tags");
        }

        // 5. Bangun Struktur Komponen Gear & Floating Menu
        const rootContainer = document.createElement("div");
        rootContainer.id = "theme-selector-root";

        const menu = document.createElement("div");
        menu.id = "theme-floating-menu";

        const modes = [
            { id: "auto", label: "💻 Auto" },
            { id: "light", label: "☀️ Light" },
            { id: "dark", label: "🌙 Dark" },
        ];

        modes.forEach((mode) => {
            const btn = document.createElement("button");
            btn.className = "theme-menu-btn";
            btn.id = `theme-btn-${mode.id}`;
            btn.textContent = mode.label;

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                setTheme(mode.id);
                rootContainer.classList.remove("menu-open");
            });

            menu.appendChild(btn);
        });

        const gearBtn = document.createElement("button");
        gearBtn.id = "theme-gear-trigger";
        gearBtn.setAttribute("aria-label", "Theme Settings");
        gearBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    `;

        gearBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            rootContainer.classList.toggle("menu-open");
        });

        document.addEventListener("click", () => {
            rootContainer.classList.remove("menu-open");
        });

        rootContainer.appendChild(menu);
        rootContainer.appendChild(gearBtn);
        document.body.appendChild(rootContainer);

        // 6. Theme Logic Engine
        const systemDarkQuery = window.matchMedia(
            "(prefers-color-scheme: dark)",
        );

        function applyThemeClass(isDark) {
            if (isDark) {
                document.documentElement.setAttribute("data-theme", "dark");
                document.body.setAttribute("data-theme", "dark");
            } else {
                document.documentElement.removeAttribute("data-theme");
                document.body.removeAttribute("data-theme");
            }
        }

        function handleSystemChange(e) {
            if (localStorage.getItem("freedium-custom-theme") === "auto") {
                applyThemeClass(e.matches);
            }
        }

        function setTheme(theme) {
            localStorage.setItem("freedium-custom-theme", theme);

            document.querySelectorAll(".theme-menu-btn").forEach((btn) => {
                btn.classList.remove("active");
            });

            const activeBtn = document.getElementById(`theme-btn-${theme}`);
            if (activeBtn) activeBtn.classList.add("active");

            if (theme === "auto") {
                applyThemeClass(systemDarkQuery.matches);
                systemDarkQuery.addEventListener("change", handleSystemChange);
            } else {
                applyThemeClass(theme === "dark");
                systemDarkQuery.removeEventListener(
                    "change",
                    handleSystemChange,
                );
            }
        }

        const savedTheme =
            localStorage.getItem("freedium-custom-theme") || "auto";
        setTheme(savedTheme);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initThemeSelector);
    } else {
        initThemeSelector();
    }
    window.addEventListener("load", initThemeSelector);
})();
