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
| `app/page.tsx` | All page sections: hero, problem, system, commodities, business model, roadmap, location, contact |
| `app/globals.css` | Design tokens (`@theme`) and shared component classes |
| `components/TelemetryPreview.tsx` | Scripted, clearly-labelled *simulated* reefer console in the hero (pausable, honours reduced motion, stops offscreen) |
| `components/CommoditySelector.tsx` | Accessible tabs with indicative carriage profiles per commodity |
| `components/ContactForm.tsx` | Labelled form with on-blur validation; opens a pre-filled email to `hello@perishflow.aflatus.com` |
| `design-system/perishflow/MASTER.md` | Design system generated with the UI/UX Pro Max skill |

## Design system

Generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill (installed in
`.claude/skills/ui-ux-pro-max`, MIT). Pattern: *Real-Time / Operations Landing*. Palette: dark slate with
status green (fresh), ice blue (cold) and amber/red for risk. Type: Space Grotesk (display), DM Sans (body),
JetBrains Mono (telemetry).

The contact form has no backend — swap the `mailto:` in `ContactForm.tsx` for Formspree, Resend or an API route when ready.
