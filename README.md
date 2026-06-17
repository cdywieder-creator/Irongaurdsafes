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
- **Headlines:** Space Grotesk · **Body:** Inter
- **Logo:** converted directly from the supplied brand PDF (`assets/images/Ironguard_Logo.pdf`)
  into vector SVG (`assets/images/logo.svg`) — the exact navy/white shield + "IRONGUARD SAFES"
  lockup, self-contained so it renders on any background.
- **Photos:** safe imagery is loaded from Unsplash; every photo slot has a branded
  gold-on-navy fallback tile that appears automatically if an image fails to load.

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

### Contact form (Cloudflare Pages Function + Resend)

The contact form posts to a Pages Function at `functions/api/contact.js`
(route: `POST /api/contact`), which emails submissions via [Resend](https://resend.com).

**One-time setup:**

1. **Resend account:** sign up at [resend.com](https://resend.com) (free tier: 100 emails/day).
2. **Verify your domain:** Resend → *Domains* → add `ironguardsafes.com` and add the
   DNS records it gives you. Since the domain is on Cloudflare, add them in
   **Cloudflare → DNS** (or click "Verify" if Resend can add them for you).
3. **API key:** Resend → *API Keys* → create one, copy it.
4. **Cloudflare Pages variables:** project → **Settings → Variables and Secrets**, add:
   | Name | Type | Value |
   |------|------|-------|
   | `RESEND_API_KEY` | Secret | your Resend API key |
   | `CONTACT_TO` | Plaintext | `nate@ironguardsafes.com` |
   | `CONTACT_FROM` | Plaintext | `Ironguard Website <noreply@ironguardsafes.com>` |
5. **Redeploy** (Deployments → Retry deployment) so the variables take effect.

The function validates input, blocks spam via a honeypot field, and sends a
formatted email with the visitor's details (reply-to is set to the visitor's email).

> Until these variables are set, the form returns a friendly "please call us" message
> instead of failing silently. Local `python3 -m http.server` won't run the function —
> use `npx wrangler pages dev .` to test the function locally.
