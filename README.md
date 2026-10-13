# PerishFlow — landing page

Marketing site for **PerishFlow**, AI-powered cargo environment management for refrigerated containers
(Sense → Understand → Predict → Act).

Built with Next.js 16 (App Router, static export), React 19, Tailwind CSS v4 and Lucide icons.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint     # TypeScript check
```

## Structure

| Path | What |
|------|------|
| `lib/content.ts` | All site copy and data (single source for the page, `llms.txt` and structured data) |
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

## AI & search visibility

- `robots.txt` explicitly allows AI crawlers and assistants (GPTBot, ChatGPT-User, ClaudeBot, Claude-User, Google-Extended, PerplexityBot, Applebot, …).
- `/llms.txt` and `/llms-full.txt` ([llmstxt.org](https://llmstxt.org)) give AI assistants a clean Markdown summary and the full site text, generated from `lib/content.ts` (`lib/llms.ts`).
- JSON-LD (`components/StructuredData.tsx`) describes PerishFlow and its parent company, Aflatus (OPC) Private Limited.
- All commodity profiles are in the static HTML (inactive tabs use `hidden`), so crawlers that don't run JavaScript still see them.

## Domain & deployment

Live at **https://www.perishflow.com**. Domain registered at BigRock; site runs as the `perishflow` Docker
Compose project on the Hostinger VPS `srv1047573` (`72.60.203.152`), behind the Traefik proxy from the `n8n`
project, which issues Let's Encrypt certificates automatically. The canonical URL lives in `lib/site.ts`.

| Host | Behaviour |
|------|-----------|
| `www.perishflow.com` | Serves the site |
| `perishflow.com` | 301 → `https://www.perishflow.com` |
| `perishflow.aflatus.com` | 301 → `https://www.perishflow.com` (old address) |

**DNS (BigRock):** `A @ → 72.60.203.152`, `CNAME www → perishflow.com`.

**Deploy:** every push to `claude/main` runs `.github/workflows/publish-image.yml`, which builds the
`Dockerfile` and pushes `ghcr.io/ashnu-tnj/perishflow:latest`. Then redeploy the `perishflow` project
(Hostinger → VPS → Docker Manager → Update, compose file in `deploy/docker-compose.yml`) to pull it.
Hostinger's deploy only pulls images, it never builds them, which is why the image is built in CI.
