import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  Cpu,
  Droplets,
  FileBarChart,
  Gauge,
  Layers,
  MapPin,
  Minus,
  Plug,
  Radar,
  Ship,
  SlidersHorizontal,
  Sprout,
  Thermometer,
  TrendingUp,
  Truck,
  Wind,
} from "lucide-react";
import { CommoditySelector } from "@/components/CommoditySelector";
import { CONTACT_EMAIL, ContactForm } from "@/components/ContactForm";
import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import { TelemetryPreview } from "@/components/TelemetryPreview";

function SectionHeader({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-fg-muted">{lead}</p>}
    </div>
  );
}

const steps = [
  {
    icon: Radar,
    name: "Sense",
    body: "Distributed probes across multiple cargo zones — not one return-air sensor — capture the real environment around the fruit.",
    tags: ["Temperature", "Humidity", "CO₂", "O₂", "Ethylene", "Airflow", "Shock"],
  },
  {
    icon: BrainCircuit,
    name: "Understand",
    body: "Raw readings are interpreted in context: what the cargo is, when it was harvested, and how long it still has to travel.",
    tags: ["Produce type", "Harvest date", "Voyage duration"],
  },
  {
    icon: TrendingUp,
    name: "Predict",
    body: "Models estimate shelf-life risk, ripening acceleration, hotspots and condensation before any damage is visible.",
    tags: ["Shelf-life risk", "Ripening", "Hotspots", "Condensation"],
  },
  {
    icon: SlidersHorizontal,
    name: "Act",
    body: "Control modules respond to the prediction — then PerishFlow measures whether the response actually worked.",
    tags: ["Air circulation", "Humidity", "Ethylene filtration", "CO₂ management"],
  },
];

const comparison = [
  ["Knows its set temperature", true, true],
  ["Measures conditions in every cargo zone", false, true],
  ["Tracks ethylene, CO₂ and O₂ around the produce", false, true],
  ["Understands what the cargo is and how old it is", false, true],
  ["Predicts deterioration before it is visible", false, true],
  ["Acts on a specific zone and verifies the result", false, true],
] as const;

const revenue = [
  { icon: Cpu, name: "Hardware", body: "Sensing and control modules, sold or leased per container." },
  { icon: Ship, name: "Per-shipment analytics", body: "AI condition monitoring priced per voyage." },
  { icon: Gauge, name: "Dashboard subscriptions", body: "Live and historical views for exporters and importers." },
  { icon: Layers, name: "Fleet analytics", body: "Enterprise insight across lanes, vessels and seasons." },
  { icon: FileBarChart, name: "Cargo-condition reports", body: "Evidence for claims, insurers and quality disputes." },
  { icon: Plug, name: "Platform APIs", body: "Condition data piped into TMS, ERP and trading systems." },
];

const roadmap = [
  {
    phase: "Phase 1",
    name: "Sensing & baseline data",
    body: "Build the multi-zone sensing infrastructure and create baseline datasets from real shipments.",
    current: true,
  },
  {
    phase: "Phase 2",
    name: "Predictive models",
    body: "Train deterioration and shelf-life models on commodity-specific data.",
  },
  {
    phase: "Phase 3",
    name: "Active control",
    body: "Integrate airflow, humidity, ethylene and atmosphere control with closed-loop verification.",
  },
  {
    phase: "Phase 4",
    name: "Commercial scale",
    body: "Scale with shipping lines, exporters and logistics partners across key trade lanes.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* ─── Hero ─────────────────────────────────────────── */}
        <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.16),transparent)]"
            aria-hidden
          />
          <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div data-reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-fg-muted">
                <Sprout size={14} className="text-fresh" aria-hidden />
                AI cargo environment management for reefers
              </p>
              <h1 id="hero-title" className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl">
                The cold chain that knows <span className="text-fresh">what&apos;s inside.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-fg-muted">
                Reefer containers hold a set temperature. PerishFlow understands the cargo — sensing every zone,
                predicting deterioration before it&apos;s visible, and acting to protect shelf life in transit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary">
                  Request a conversation <ArrowRight size={16} aria-hidden />
                </a>
                <a href="#system" className="btn-ghost">
                  See how the system works
                </a>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
                {[
                  { k: "Signals sensed", v: "7" },
                  { k: "Launch commodities", v: "8" },
                  { k: "Control modules", v: "4" },
                ].map((s) => (
                  <div key={s.k}>
                    <dd className="font-display text-2xl font-semibold sm:text-3xl">{s.v}</dd>
                    <dt className="mt-1 text-xs text-fg-muted sm:text-sm">{s.k}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div data-reveal style={{ ["--reveal-i" as string]: 2 }}>
              <TelemetryPreview />
            </div>
          </div>
        </section>

        {/* ─── Problem ──────────────────────────────────────── */}
        <section id="problem" aria-labelledby="problem-title" className="border-t border-line bg-surface py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader
              id="problem-title"
              eyebrow="The problem"
              title="A container knows its set point. Not the condition of its cargo."
              lead="Quality loss in transit is usually discovered at the destination — when it is too late to do anything but file a claim."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Thermometer,
                  title: "One sensor, one number",
                  body: "Conventional reefers control on return-air temperature. Hotspots near the doors or deep in the stow go unseen.",
                },
                {
                  icon: Wind,
                  title: "Invisible chemistry",
                  body: "Ethylene build-up and shifting CO₂ / O₂ accelerate ripening long before a single piece of fruit looks different.",
                },
                {
                  icon: Activity,
                  title: "Found too late",
                  body: "Without a record of cargo condition, damage surfaces at discharge — and becomes a dispute instead of a decision.",
                },
              ].map((c, i) => (
                <article
                  key={c.title}
                  data-reveal
                  style={{ ["--reveal-i" as string]: i }}
                  className="rounded-3xl border border-line bg-card p-6 transition-colors duration-200 hover:border-fg-muted/50"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-ice">
                    <c.icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-fg-muted">{c.body}</p>
                </article>
              ))}
            </div>

            <figure
              data-reveal
              className="mt-12 grid gap-6 rounded-3xl border border-line bg-bg/60 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center"
            >
              <p className="font-display text-5xl font-semibold text-warn sm:text-6xl">~14%</p>
              <figcaption>
                <p className="text-lg">
                  of the world&apos;s food is lost between harvest and retail — much of it perishables moving through
                  cold chains that cannot see the cargo they carry.
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  Source: FAO, <cite>The State of Food and Agriculture 2019</cite>.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ─── System ───────────────────────────────────────── */}
        <section id="system" aria-labelledby="system-title" className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader
              id="system-title"
              eyebrow="The system"
              title="Sense → Understand → Predict → Act"
              lead="A closed loop that turns a refrigerated box into an actively managed cargo environment."
            />

            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.name}
                  data-reveal
                  style={{ ["--reveal-i" as string]: i }}
                  className="relative flex flex-col rounded-3xl border border-line bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-fresh/15 text-fresh">
                      <s.icon size={20} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-fg-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-fg-muted">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.name} inputs and outputs`}>
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            {/* comparison */}
            <div id="intelligence" data-reveal className="mt-20 overflow-hidden rounded-3xl border border-line">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Conventional reefer compared with PerishFlow</caption>
                <thead className="bg-surface">
                  <tr>
                    <th scope="col" className="p-4 text-sm font-medium text-fg-muted sm:p-5">
                      Capability
                    </th>
                    <th scope="col" className="w-24 p-4 text-center text-sm font-medium text-fg-muted sm:w-40 sm:p-5">
                      Conventional reefer
                    </th>
                    <th scope="col" className="w-24 p-4 text-center text-sm font-semibold text-fresh sm:w-40 sm:p-5">
                      PerishFlow
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([label, legacy, pf]) => (
                    <tr key={label} className="border-t border-line">
                      <th scope="row" className="p-4 text-sm font-normal sm:p-5 sm:text-base">
                        {label}
                      </th>
                      <td className="p-4 text-center sm:p-5">
                        {legacy ? (
                          <Check className="mx-auto text-fg-muted" size={18} aria-label="Yes" />
                        ) : (
                          <Minus className="mx-auto text-fg-muted/50" size={18} aria-label="No" />
                        )}
                      </td>
                      <td className="bg-fresh/[0.04] p-4 text-center sm:p-5">
                        {pf && <Check className="mx-auto text-fresh" size={18} aria-label="Yes" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Commodities ──────────────────────────────────── */}
        <section id="commodities" aria-labelledby="commodities-title" className="border-t border-line bg-surface py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader
              id="commodities-title"
              eyebrow="Commodities"
              title="Every cargo spoils differently."
              lead="PerishFlow starts with high-value fresh produce, each with its own temperature band and control priorities. Seafood, dairy and pharmaceuticals follow."
            />
            <div className="mt-12" data-reveal>
              <CommoditySelector />
            </div>
          </div>
        </section>

        {/* ─── Business model ───────────────────────────────── */}
        <section id="model" aria-labelledby="model-title" className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader
              id="model-title"
              eyebrow="Business model"
              title="Hardware in the box. Intelligence on every voyage."
              lead="Built for exporters, shipping lines, logistics operators and importers — with revenue that compounds as the fleet and dataset grow."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {revenue.map((r, i) => (
                <li
                  key={r.name}
                  data-reveal
                  style={{ ["--reveal-i" as string]: i }}
                  className="flex gap-4 rounded-3xl border border-line bg-card p-6 transition-colors duration-200 hover:border-fg-muted/50"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-ice">
                    <r.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold">{r.name}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Roadmap ──────────────────────────────────────── */}
        <section id="roadmap" aria-labelledby="roadmap-title" className="border-t border-line bg-surface py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader
              id="roadmap-title"
              eyebrow="Roadmap"
              title="From first sensor to fleet scale."
              lead="PerishFlow is pre-MVP. We're building the data foundation first — because good predictions start with honest measurements."
            />
            <ol className="relative mt-12 grid gap-4 lg:grid-cols-4">
              {roadmap.map((r, i) => (
                <li
                  key={r.phase}
                  data-reveal
                  style={{ ["--reveal-i" as string]: i }}
                  aria-current={r.current ? "step" : undefined}
                  className={`relative rounded-3xl border p-6 ${
                    r.current ? "border-fresh/60 bg-fresh/[0.06]" : "border-line bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">{r.phase}</span>
                    {r.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-fresh/15 px-2.5 py-1 text-xs font-medium text-fresh">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-fresh" aria-hidden />
                        Now
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{r.name}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Location ─────────────────────────────────────── */}
        <section aria-labelledby="where-title" className="py-20 sm:py-28">
          <div className="container-page">
            <div
              data-reveal
              className="grid gap-10 rounded-[2rem] border border-line bg-gradient-to-br from-card to-surface p-8 sm:p-12 lg:grid-cols-2 lg:items-center"
            >
              <div>
                <p className="eyebrow">Where we build</p>
                <h2 id="where-title" className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Abu Dhabi, at the crossroads of global food trade.
                </h2>
                <p className="mt-4 text-lg text-fg-muted">
                  Based in the Hub71 ecosystem, PerishFlow sits alongside world-class port and logistics infrastructure
                  and a national focus on food security — with our sights set on global trade lanes.
                </p>
              </div>
              <ul className="grid gap-3">
                {[
                  { icon: MapPin, t: "Hub71 ecosystem, Abu Dhabi, UAE" },
                  { icon: Truck, t: "Regional logistics and re-export infrastructure" },
                  { icon: Droplets, t: "Aligned with food-security priorities" },
                ].map((x) => (
                  <li key={x.t} className="flex items-center gap-3 rounded-2xl border border-line bg-bg/50 p-4">
                    <x.icon size={20} className="shrink-0 text-fresh" aria-hidden />
                    <span>{x.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Contact ──────────────────────────────────────── */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface py-20 sm:py-28">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div data-reveal>
              <p className="eyebrow">Get in touch</p>
              <h2 id="contact-title" className="mt-3 text-3xl font-semibold sm:text-4xl">
                Let&apos;s protect cargo together.
              </h2>
              <p className="mt-4 text-lg text-fg-muted">
                We&apos;re speaking with investors, exporters, logistics operators and research partners who want to
                shape the first cargo-aware cold chain.
              </p>
              <ul className="mt-8 space-y-3">
                {["Pilot a sensing kit on a live lane", "Share commodity expertise or data", "Discuss investment"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3">
                      <Check size={18} className="text-fresh" aria-hidden /> {t}
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-8 text-sm text-fg-muted">
                Prefer email?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-fresh underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <div data-reveal style={{ ["--reveal-i" as string]: 1 }}>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10">
        <div className="container-page flex flex-col items-start justify-between gap-6 text-sm text-fg-muted sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Logo size={24} />
            <span>© {new Date().getFullYear()} PerishFlow AI · Abu Dhabi, UAE</span>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><a className="hover:text-fg" href="#system">System</a></li>
              <li><a className="hover:text-fg" href="#commodities">Commodities</a></li>
              <li><a className="hover:text-fg" href="#roadmap">Roadmap</a></li>
              <li><a className="hover:text-fg" href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
