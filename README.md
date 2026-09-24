# PerishFlow AI — landing page

Marketing site for **PerishFlow AI**, AI-powered cargo environment management for refrigerated containers
(Sense → Understand → Predict → Act).

Built with Next.js 16 (App Router, static export), React 19, Tailwind CSS v4 and Lucide icons.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out — deploy anywhere (Vercel, Netlify, S3, GitHub Pages)
npm run lint     # TypeScript check
```

## Structure

| Path | What |
|------|------|
| `app/page.tsx` | All page sections: hero (container yard), problem, system, commodities, business model, roadmap, contact |
| `components/Container.tsx` | Shipping-container shell (corrugation, corner castings, ISO 6346 marking with real check digit) |
| `components/ContainerStack.tsx` | Decorative port skyline with stacked containers and a gantry crane |
| `app/globals.css` | Design tokens (`@theme`) and shared component classes |
| `components/TelemetryPreview.tsx` | Scripted, clearly-labelled *simulated* reefer console in the hero (pausable, honours reduced motion, stops offscreen) |
| `components/CommoditySelector.tsx` | Accessible tabs with indicative carriage profiles per commodity |
| `components/ContactForm.tsx` | Labelled form with on-blur validation; opens a pre-filled email to `info@aflatus.com` |
| `design-system/perishflow/MASTER.md` | Design system generated with the UI/UX Pro Max skill |
| `design-system/perishflow/pages/landing.md` | Container-theme override for the landing page |

## Design system

Generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill (installed in
`.claude/skills/ui-ux-pro-max`, MIT). The landing page uses a **shipping-container theme** (see
`design-system/perishflow/pages/landing.md`): each section is a container painted navy, rust, green, steel or
reefer-white, with safety-yellow actions. Type: Barlow Condensed (display), Barlow (body), Saira Stencil
(markings), JetBrains Mono (telemetry).

The contact form has no backend — swap the `mailto:` in `ContactForm.tsx` for Formspree, Resend or an API route when ready.
