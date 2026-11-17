# Sai Krupa Dental Care website

A static, single-page clinic website. No build step and no dependencies.

## Folder layout

```
public/                  <- the website. Deploy this folder only.
  index.html             page markup, SEO tags, structured data
  styles.css             all styles and colour tokens (see DESIGN.md)
  script.js              animations, menu, slider, FAQ, booking form (settings at the top)
  404.html               "page not found" page
  images/                photos, plus og-image.jpg for link previews
  favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192/512.png
  site.webmanifest       app icon and colour info for phones
  robots.txt, sitemap.xml
  _headers               security and caching headers (Netlify, Cloudflare Pages)
DESIGN.md                design system
backup/                  the files as they were before production prep
```

## Preview locally

```
cd public
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Any static host works. Point it at the `public` folder.

- **Netlify**: drag the `public` folder onto app.netlify.com/drop, or set the publish directory to `public`. `_headers` and `404.html` are used automatically.
- **Cloudflare Pages**: set the build output directory to `public`, with no build command. `_headers` and `404.html` are used automatically.
- **Vercel, GitHub Pages or shared hosting**: upload `public`. `404.html` works on all of them. Copy the headers from `_headers` into that host's config, because only Netlify and Cloudflare read `_headers`.

## Go-live checklist

These must be done before the site is public. Each one is marked `GO-LIVE` in the code where it applies.

1. **Domain.** Replace `https://www.saikrupadental.example` in `index.html` (canonical, Open Graph and structured data), `robots.txt` and `sitemap.xml`.
2. **Clinic details.** Check the name, address, phone, hours, fees, founding year and dentist details in `index.html`. That includes the JSON-LD block in `<head>`, the `tel:` links, the Google Maps link and `CLINIC_PHONE` in `script.js`.
3. **Team count.** The team section says "Four dentists", but the page shows five (two founders and three dentists). Correct whichever is wrong.
4. **Booking form.** In `script.js`, either:
   - set `FORM_ENDPOINT` to a form service URL (Formspree, Web3Forms, Getform or your own API) that accepts a JSON POST, or
   - leave it empty and set `WHATSAPP_NUMBER` to the clinic's real WhatsApp number (digits only, with 91). The form then opens WhatsApp with the request filled in.
5. **Photos.** Replace the stock photos with the clinic's own photos or properly licensed ones, at the same sizes (see the `width` and `height` in `index.html`). The before and after whitening photos must be a real patient's, shared with written consent. Regenerate `images/og-image.jpg` (900 x 472 or larger, at a 1.91:1 ratio).
6. **Legal.** If the form collects patient data, add a privacy notice in line with India's DPDP Act 2023, and check the content, especially the before and after photos, against Dental Council of India rules on advertising.
7. **After launch.** Submit `sitemap.xml` in Google Search Console, set up a Google Business Profile, and test the booking flow on a real phone.

### If you edit the small script in `<head>`

`_headers` allows that one inline script by its SHA-256 hash. If you change it, recompute the hash:

```
python -c "import re,hashlib,base64;s=open('public/index.html',encoding='utf-8').read();m=re.search(r'<script>(.*?)</script>',s,re.S);print(base64.b64encode(hashlib.sha256(m.group(1).encode()).digest()).decode())"
```

Then put the result in the `sha256-...` part of `_headers`. If you forget, nothing breaks: the browser skips the animations and the content stays visible.

## What changed in production prep (17 Nov 2026)

- Booking form: it only shows success when the request was actually sent, either to `FORM_ENDPOINT` or as a filled-in WhatsApp message. It also has field-level errors that move focus to the problem field, rejects past dates, includes a spam trap and has a sending state. Treatment rows preselect the matching chip.
- Reliability: if `script.js` fails to load, the animated content now reappears after 4 seconds instead of staying invisible.
- SEO: real canonical and Open Graph URLs (absolute, as social sites require), a dedicated share image, `url` in the structured data, `en-IN` language, a sitemap and robots.
- Security: a strict Content-Security-Policy. Every inline `style` attribute was moved into CSS so the policy can forbid them.
- Performance: width and height on the treatment thumbnails (no layout shift), and a deferred script.
- Added contact links (tap to call, open in Maps), favicons, a web manifest, a 404 page, and caching headers.
- Fixed a stray "Arka Dental Studio" comment in `styles.css`.
- The visual design and animations are unchanged.

## Update (17 Nov 2026, second pass)

- Removed the spinning hero badge, the "12 years" hero tag and the big footer wordmark. Marquee separators are now small dots.
- `styles.css` and `script.js` are linked with `?v=2` so returning visitors get the new files despite the one-day cache. Bump the number whenever you change either file.
