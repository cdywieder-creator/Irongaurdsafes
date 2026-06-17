# Ironguard Safes — Marketing Website

A complete static marketing website for **Ironguard Safes**, a professional home
safe installation company serving the New York, New Jersey & Connecticut tristate area.

Built with plain HTML, CSS and JavaScript — **no frameworks, no build tools.**

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services grid, why-us trust badges, how-it-works, contact form |
| Services | `services.html` | Detailed breakdown of each safe type we install |
| About | `about.html` | Founder bio (Nuchem Braun) + company values |
| Contact | `contact.html` | Full contact form, phone, email & service area |

## Brand

- **Primary navy:** `#1a2233`
- **Accent gold:** `#c8a45c`
- **Backgrounds:** white / light gray (`#f5f6f9`) alternating
- **Headlines:** serif (Georgia) · **Body:** Inter (sans-serif)
- **Logo:** recreated as scalable SVG (`assets/images/logo.svg` and `logo-white.svg`)
  from the supplied brand PDF (kept at `assets/images/Ironguard_Logo.pdf`).

## Contact details used site-wide

- **Phone:** 848-222-3606
- **Email:** nate@ironguardsafes.com
- **Service area:** New York, New Jersey, Connecticut

## Structure

```
.
├── index.html
├── services.html
├── about.html
├── contact.html
├── _headers                 # Cloudflare Pages security & cache headers
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── logo.svg
│       ├── logo-white.svg
│       ├── favicon.svg
│       └── Ironguard_Logo.pdf
└── README.md
```

## Features

- Sticky responsive navigation with phone number (desktop) and mobile menu
- Smooth in-page scrolling to the contact section
- Reveal-on-scroll animations (respects `prefers-reduced-motion`)
- Client-side contact form validation with a success message
- Fully mobile responsive
- Hero image sourced from Unsplash (free, embedded via URL)

## Local preview

It's just static files — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git.**
3. Select this repository.
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (the repository root)
5. **Save and Deploy.**

The `_headers` file is applied automatically by Cloudflare Pages.

### Contact form note

The form currently runs a client-side demo handler (validates and shows a success
message). To receive real submissions, connect it to a form backend such as
[Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/),
Formspree, or a similar service.
