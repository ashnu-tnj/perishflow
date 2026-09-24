# Landing page override — Shipping-container theme

Overrides `../MASTER.md` for the marketing landing page. Where this file is silent, MASTER rules apply.

## Concept
The page is a container yard: every major section is a shipping container, stacked down the page.

| Element | Rule |
|---|---|
| Shell | `<Container paint=…>` — vertical corrugation, darker top/bottom rails, four ISO corner castings |
| Marking | Stencilled ISO 6346 code (`PFLU` + serial + computed check digit) and size-type code (22G1, 45G1, 45R1); decorative, `aria-hidden`, lg+ only |
| Paints | navy `#1b3858`, rust `#7f2d14`, green `#1d4a32`, steel `#323d4b`, reefer white `#e6ebef` |
| Reefer section | White reefer re-scopes colour tokens to a light palette so all children keep ≥4.5:1 contrast |
| Accent | Safety yellow `#fbbf24` for primary actions, eyebrows and focus rings; green = cargo in band, orange/red = risk |
| Corners | 0–3px radius. Containers are rectangles |
| Type | Barlow Condensed (uppercase headings) · Barlow (body) · Saira Stencil (markings, numerals) · JetBrains Mono (telemetry) |
| Details | Hazard stripes as dividers, port skyline + gantry crane in hero, door locking bars around the contact form |

## Anti-patterns
- Stencil type for body copy or long headings (legibility)
- Muted grey text on painted steel without the lifted `--color-fg-muted` override
- Decorative markings exposed to screen readers
