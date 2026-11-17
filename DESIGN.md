# Sai Krupa Dental Care: Design System

Theme name: **Warm Cream Clinic**. A soft cream base that feels calm and welcoming, sand bands for structure, and one trusted dental blue for actions.

## 1. Colour (60 / 30 / 10)

| Share | Role | Token | Value |
|---|---|---|---|
| 60% | Page background | `--paper` | `#F8F3EA` |
| 60% | Alternate band (results) | `--paper-2` | `#F3ECE0` |
| 60% | Cards, form, trust tiles | `--card` | `#FFFCF7` |
| 60% | Hairlines | `--rule` | `#E3D8C6` |
| 30% | Sand bands: marquee, first visit, booking | `--tint` | `#EDE2D0` |
| 30% | Deeper sand, footer wordmark | `--tint-2` | `#E0D0B6` |
| 10% | Buttons, fees, numbers, badge, slider knob | `--brand` | `#1E63A8` |
| 10% | Hover | `--brand-deep` | `#164F88` |
| 10% | Text on blue | `--on-brand` | `#FFFFFF` |
| text | Headings and body | `--ink` | `#0F2A44` |
| text | Secondary | `--muted` | `#5E6470` |

Rules
- Light only (`color-scheme: light`), so it looks the same on every phone, including ones set to dark mode.
- Blue is the only strong colour. Use it for things to tap or notice, never for big backgrounds.
- Shadows are warm brown, not grey, so they sit naturally on cream.

## 2. Typography

One family, **Plus Jakarta Sans**, for a clean clinical feel.

| Role | Weight | Size |
|---|---|---|
| H1 | 800 | `clamp(44px, 6.6vw, 92px)`, tracking -0.04em |
| Section H2 | 700 | `clamp(36px, 4.6vw, 64px)` |
| Statement paragraph | 600 | `clamp(26px, 3.2vw, 44px)` |
| Treatment names | 700 | `clamp(26px, 3.4vw, 44px)` |
| Body | 400 to 500 | 17px, line height 1.6 |
| Buttons, labels | 700 | 14.5 to 16px |

Sentence case throughout. No all-caps labels.

## 3. Shape

Soft and friendly: images and cards use a 14 to 22px radius, buttons and chips are pills, the logo is a rounded square.

## 4. Motion

| Effect | Where | How |
|---|---|---|
| Line mask reveal | Every big heading | Each line slides up from behind a mask, staggered 90ms |
| Scroll word highlight | Statement paragraph | Words go from faint to full as you scroll through |
| Image wipe | Hero, statement, team, hygiene | Image uncovers bottom to top while settling from 118% to 100% scale |
| Fade up | Paragraphs, lists | 18px rise with fade |
| Marquee | Treatments band | Endless scroll, pauses on hover |
| Rotating badge | Hero | 18 second spin |
| Cursor preview | Treatments list (desktop) | Photo follows the cursor with easing and a slight tilt |
| Rolling button label | All buttons | Label rolls up on hover |
| Smooth scroll | Menu and all in-page links | Eased glide (about 0.5 to 1.1 seconds, by distance) that stops below the header. Stops if the visitor scrolls themselves. |
| Header | Top | Turns solid after scroll, hides when scrolling down, returns when scrolling up |
| Stacked cards | First visit | Cards stick and pile up as you scroll |
| Wordmark | Footer | Letters rise one by one |
| Mobile action bar | Phones | Call and Book buttons slide up after the first screen |

Easing for all: `cubic-bezier(.22, .9, .25, 1)`. All motion switches off for visitors with reduced motion turned on. Content is fully visible if JavaScript does not load: the inline script in `<head>` hides animated content only while it waits for `script.js`, and shows it again after 4 seconds if that file never runs.

## 5. Layout

- Max width 1240px. Gutter 16px on phones, 40px from 800px.
- Section padding 110px on phones, 150 to 160px on desktop.
- Breakpoints: 640, 760, 800, 960px.

```
+--------------------------------------------------------------+
| Sai Krupa   Treatments Results Your visit Dentists Questions [Book]|
+--------------------------------------------------------------+
| Gentle dental             |  (badge)                         |
| care for your             |  [ tall photo, wipes in ]        |
| whole family.             |                                  |
| lede          [Book]      |  12 years                        |
|               [Treat]     |                                  |
| [emergency] [X-ray/OPG] [specialists] [EMI]  trust strip     |
+--------------------------------------------------------------+
| ✦ marquee of treatments ✦                                    | soft blue
+--------------------------------------------------------------+
| big statement, words light up      | photo + note            |
| Treatments list: name | text | fee  (hover photo follows)    |
| Before/after: copy + facts | drag slider                     | paper-2
| First visit: 4 sticky stacked cards                          | soft blue
| Team: founders | 3 dentists                                  |
| Hygiene: photo | list                                        |
| FAQ: title | accordion                                       |
| Booking: copy + contacts | white form card                   | soft blue
| Footer + giant "Sai Krupa." wordmark                         |
+--------------------------------------------------------------+
```

## 6. Components

- **Button**: pill, 54px tall. `btn-brand` main, `btn-line` outline second.
- **Treatment row**: big serif name, short description, starting fee. Hover slides the name and fills the row.
- **Before/after slider**: a hidden range input sits on top, so it works with mouse, touch and keyboard arrows.
- **Process card**: number in serif, title, text, time. The last card is blue.
- **FAQ**: buttons with a plus that turns to a minus. The answer opens smoothly.
- **Form**: underline fields with floating labels, chip buttons for the treatment, inline error message, success message replaces the form.

## 7. Voice

Warm, plain and specific: real times, real fees, real steps. No exclamation marks, no hype words.

## 8. Files

```
public/index.html   markup
public/styles.css   tokens and styles
public/script.js    reveals, header, menu, cursor preview, slider, FAQ, form
public/images/      photos
DESIGN.md           this file
README.md           deploy steps and go-live checklist
```

## 9. Built-in best practice

- SEO: page title and description, canonical link, Open Graph and Twitter tags for link previews.
- Local SEO: `Dentist` structured data (schema.org JSON-LD) with address, phone and hours.
- Performance: hero image preloaded with high priority, other images lazy loaded with width and height set, fonts with `display=swap`, no frameworks.
- Accessibility: skip link, labelled form fields, keyboard friendly slider and FAQ, visible focus, reduced motion respected, text contrast checked.
- Mobile: sticky Call and Book bar, safe-area padding for notched phones.

## 10. Before going live

- Replace the clinic name, address, phone, fees, founding year and dentist details with the real ones, in both the page and the JSON-LD block in `index.html`.
- Set the real website address in the `canonical` link.
- Replace the stock photos with the clinic's own photos or licensed stock.
- Connect the booking form in `script.js` to a backend, email service or WhatsApp.
