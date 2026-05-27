# freedium-theme

> A custom Stylus/UserCSS + Userscript that transforms [Freedium](https://freedium.cfd) into a clean, authentic **Medium reading experience** — complete with dark mode, a floating theme switcher, and editorial typography.

---

## ✨ Features

- **Medium-faithful typography** — Charter/Georgia serif for body text, system sans-serif for headings, matching Medium's exact font sizes and line-heights
- **Dark mode support** — full dark/light/auto theme switching with smooth CSS transitions
- **Floating theme switcher** — a glassmorphic gear button (bottom-left) with a pop-up menu to switch between Auto, Light, and Dark modes. Preference is saved to `localStorage`
- **Clean author card** — restructured DOM so the author profile photo, name, and metadata align perfectly like on Medium
- **Inline code styling** — Vercel-style minimalist inline code chips with monospace font
- **Blockquote styling** — neutral gray left-border, italic serif, editorial spacing
- **Image polish** — rounded corners (`border-radius: 12px`) and subtle border on all article images
- **Article tags** — pill-style tags matching Medium's tag UI
- **Clutter removal** — hides Freedium's nav, footer, "Go to the original" banners, and milestone announcements
- **Medium favicon** — swaps Freedium's favicon with Medium's official icon

---

## 📁 Project Structure

```
freedium-theme/
├── style.css       # Custom CSS overrides (install via Stylus)
└── javascript.js   # Userscript (install via Tampermonkey / Violentmonkey)
```

---

## 🚀 Installation

### 1. CSS — via Stylus

1. Install the [Stylus](https://add0n.com/stylus.html) browser extension (Chrome / Firefox / Edge)
2. Open Stylus → **Write new style**
3. Set the **Applies to** URL to: `freedium.cfd`
4. Paste the contents of [`style.css`](./style.css)
5. Save

### 2. JavaScript — via Tampermonkey

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or [Violentmonkey](https://violentmonkey.github.io/))
2. Create a **New Script**
3. Add the following metadata block at the top, then paste [`javascript.js`](./javascript.js) below it:

```js
// ==UserScript==
// @name         freedium-theme
// @namespace    https://github.com/your-username/freedium-theme
// @version      1.0
// @description  Transform Freedium into a Medium-like reading experience
// @author       You
// @match        https://freedium.cfd/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
```

4. Save and enable the script

---

## 🎨 Theme System

The theme switcher is injected dynamically via JavaScript. It appears as a **gear icon (⚙️)** fixed at the **bottom-left corner** of the page.

| Mode | Behavior |
|------|----------|
| 💻 Auto | Follows system dark/light preference (`prefers-color-scheme`) |
| ☀️ Light | Forces light mode |
| 🌙 Dark | Forces dark mode |

The selected theme is persisted in `localStorage` under the key `freedium-custom-theme`.

---

## 🎨 Design Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg-color` | `#ffffff` | `#0f0f0f` |
| `--text-color` | `#242424` | `#e6e6e6` |
| `--muted-text` | `#6b6b6b` | `#b3b3b3` |
| `--border-color` | `#f2f2f2` | `#242424` |
| `--code-bg` | `#f9f9f9` | `#1a1a1a` |
| `--accent-color` | `#1a8917` | *(unchanged)* |
| `--font-serif` | Charter, Georgia, Cambria, serif | |
| `--font-sans` | system-ui, -apple-system, Helvetica Neue… | |

---

## 🛠 Customization

All visual tokens live in the `:root` block at the top of `style.css`. You can freely adjust:

- **Font sizes** — `h1` (42px), `h2` (28px), `h3` (22px), `body` (20px)
- **Max content width** — default `820px` in `main, .container, article`
- **Accent color** — `--accent-color` (currently Medium green `#1a8917`)

---

## 🤝 Contributing

Pull requests are welcome. If you find a Freedium UI element that breaks the Medium look, feel free to open an issue with a screenshot.

---

## 📄 License

MIT — free to use, modify, and distribute.
