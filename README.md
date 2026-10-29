# ClearSky Web Design — One-Page HVAC Web Design Website

A polished, fast, responsive one-page website for **ClearSky Web Design**, a web design service tailored for local residential HVAC companies in the United States.

---

## 📁 File Structure

```text
├── index.html       # Semantic HTML5 markup with accessible landmarks and forms
├── styles.css       # Clean, modern CSS with design tokens, responsive breakpoints, and WCAG AA contrast
├── script.js        # Vanilla JavaScript (form validation, mailto generation, mobile nav, Messenger config)
├── media/           # Folder for your media assets (to be added by you)
│   ├── hero-video.mp4    # (Your video asset)
│   └── hero-poster.webp  # (Your video poster / fallback image)
└── README.md        # Documentation and customization guide
```

---

## 🎨 Color Palette

- **Deep Navy** (`#0f233a`, `#08121e`): Professional, stable, trustworthy foundation.
- **Warm Orange** (`#ea580c`, `#d64a04`): Action-oriented, high-contrast accent for primary CTAs and highlights.
- **Crisp White & Slate** (`#ffffff`, `#f8fafc`, `#e2e8f0`): Clean, spacious, readable layout for high legibility.

---

## 🚀 Adding Your Media Files (Flow & Nano Banana)

As specified, no stock photos or generated media were placed in the project. The code is already pre-configured to load your custom assets from the `media/` directory:

1. Place your video file at:
   `media/hero-video.mp4`
2. Place your poster/fallback image at:
   `media/hero-poster.webp`

> **Note:** If these files are not yet present, the hero section displays a dark navy gradient fallback.

---

## ⚙️ How to Configure Facebook Messenger

In `script.js`, locate the configuration setting at the top:

```javascript
const FACEBOOK_MESSENGER_URL = "https://m.me/YOUR_FACEBOOK_PAGE_USERNAME";
```

- **Default state:** Because it contains `"YOUR_FACEBOOK_PAGE_USERNAME"`, the Messenger button is automatically hidden, ensuring no broken or guessed links are shown to visitors.
- **To enable:** Replace `YOUR_FACEBOOK_PAGE_USERNAME` with your actual Facebook page username or slug (e.g., `"https://m.me/ClearSkyWebDesign"`). Once updated, the "Message Me on Facebook" button will immediately appear in the contact options.

---

## ✉️ Contact Form & Email Handling

- **Recipient:** `csinput@gmail.com`
- **Behavior:** On submit, the form validates required fields (Name and Email) and automatically opens the user's default email client (`mailto:`) with a pre-filled subject and structured message body containing all submitted details.
- **Honest status message:** Rather than displaying a false "message sent" notification, the interface informs the user that their email application has been launched and provides a direct fallback link.

---

## 📱 Mobile & Accessibility Features

- **Mobile Sticky CTA:** A sticky button appears on mobile screens (`<= 768px`) for immediate contact access, and automatically hides when the user scrolls into the contact section to avoid obstructing form inputs.
- **Keyboard Navigation:** Includes a skip-to-content link, distinct `:focus-visible` focus rings, and full keyboard support for navigation and FAQ accordions.
- **Reduced Motion:** If a user has `prefers-reduced-motion` enabled in their system settings, video autoplay is disabled in favor of the static poster and CSS styling.
