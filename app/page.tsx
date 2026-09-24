import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  Cpu,
  FileBarChart,
  Gauge,
  Layers,
  Minus,
  Plug,
  Radar,
  Ship,
  SlidersHorizontal,
  Sprout,
  Thermometer,
  TrendingUp,
  Wind,
} from "lucide-react";
import { CommoditySelector } from "@/components/CommoditySelector";
import { CONTACT_EMAIL, ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { ContainerStack } from "@/components/ContainerStack";
import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import { TelemetryPreview } from "@/components/TelemetryPreview";

function SectionHeader({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-4xl sm:text-5xl">
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
    paint: "navy",
    body: "Distributed probes across multiple cargo zones — not one return-air sensor — capture the real environment around the fruit.",
    tags: ["Temperature", "Humidity", "CO₂", "O₂", "Ethylene", "Airflow", "Shock"],
  },
  {
    icon: BrainCircuit,
    name: "Understand",
    paint: "rust",
    body: "Raw readings are interpreted in context: what the cargo is, when it was harvested, and how long it still has to travel.",
    tags: ["Produce type", "Harvest date", "Voyage duration"],
  },
  {
    icon: TrendingUp,
    name: "Predict",
    paint: "steel",
    body: "Models estimate shelf-life risk, ripening acceleration, hotspots and condensation before any damage is visible.",
    tags: ["Shelf-life risk", "Ripening", "Hotspots", "Condensation"],
  },
  {
    icon: SlidersHorizontal,
    name: "Act",
    paint: "green",
    body: "Control modules respond to the prediction — then PerishFlow measures whether the response actually worked.",
    tags: ["Air circulation", "Humidity", "Ethylene filtration", "CO₂ management"],
  },
] as const;

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
    phase: "01",
    name: "Sensing & baseline data",
    body: "Build the multi-zone sensing infrastructure and create baseline datasets from real shipments.",
    current: true,
  },
  {
    phase: "02",
    name: "Predictive models",
    body: "Train deterioration and shelf-life models on commodity-specific data.",
  },
  {
    phase: "03",
    name: "Active control",
    body: "Integrate airflow, humidity, ethylene and atmosphere control with closed-loop verification.",
  },
  {
    phase: "04",
    name: "Commercial scale",
    body: "Scale with shipping lines, exporters and logistics partners across key trade lanes.",
  },
];

/** Spacing between stacked "containers" leaves room for the corner castings. */
const SECTION = "container-page py-10 sm:py-14";
const BOX_PAD = "px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* ─── Hero: the container yard ─────────────────────── */}
        <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36">
          <div className="yard-lines pointer-events-none absolute inset-0" aria-hidden />
          <div className="container-page relative grid items-center gap-14 pb-10 lg:grid-cols-[1.05fr_1fr]">
            <div data-reveal>
              <p className="inline-flex items-center gap-2 border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs text-fg-muted">
                <Sprout size={14} className="text-fresh" aria-hidden />
                AI cargo environment management for reefers
              </p>
              <h1 id="hero-title" className="mt-6 text-5xl sm:text-6xl lg:text-7xl">
                The cold chain that knows <span className="text-safety">what&apos;s inside.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-fg-muted">
                Reefer containers hold a set temperature. PerishFlow understands the cargo — sensing every zone,
                predicting deterioration before it&apos;s visible, and acting to protect shelf life in transit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary">
                  Request a conversation <ArrowRight size={18} aria-hidden />
                </a>
                <a href="#system" className="btn-ghost">
                  See how the system works
                </a>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t-2 border-line pt-6">
                {[
                  { k: "Signals sensed", v: "07" },
                  { k: "Launch commodities", v: "08" },
                  { k: "Control modules", v: "04" },
                ].map((s) => (
                  <div key={s.k}>
                    <dd className="font-stencil text-3xl text-fg sm:text-4xl">{s.v}</dd>
                    <dt className="mt-1 text-sm text-fg-muted">{s.k}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div data-reveal style={{ ["--reveal-i" as string]: 2 }}>
              <TelemetryPreview />
            </div>
          </div>
          <ContainerStack className="relative mx-auto block h-40 w-full max-w-6xl opacity-80 sm:h-56" />
          <div className="hazard h-2" aria-hidden />
        </section>

        {/* ─── Problem ──────────────────────────────────────── */}
        <section id="problem" aria-labelledby="problem-title" className={SECTION}>
          <Container paint="navy" serial="100017" type="22G1" className={BOX_PAD} data-reveal>
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
              ].map((c) => (
                <article key={c.title} className="plate p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center bg-muted text-ice">
                    <c.icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-2xl">{c.title}</h3>
                  <p className="mt-2 text-fg-muted">{c.body}</p>
                </article>
              ))}
            </div>

            <figure className="plate mt-6 grid gap-6 border-l-4 border-l-safety p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
              <p className="font-stencil text-6xl text-safety">~14%</p>
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
          </Container>
        </section>

        {/* ─── System ───────────────────────────────────────── */}
        <section id="system" aria-labelledby="system-title" className={SECTION}>
          <div className="mb-10" data-reveal>
            <SectionHeader
              id="system-title"
              eyebrow="The system"
              title="Sense → Understand → Predict → Act"
              lead="A closed loop that turns a refrigerated box into an actively managed cargo environment."
            />
          </div>

          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((s, i) => (
              <li key={s.name} data-reveal style={{ ["--reveal-i" as string]: i }} className="flex">
                <Container paint={s.paint} className="flex w-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center bg-black/25 text-safety">
                      <s.icon size={20} aria-hidden />
                    </span>
                    <span className="font-stencil text-3xl text-fg/70">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-3xl">{s.name}</h3>
                  <p className="mt-2 flex-1 text-fg/85">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.name} inputs and outputs`}>
                    {s.tags.map((t) => (
                      <li key={t} className="bg-black/30 px-2 py-1 font-mono text-[11px] text-fg/85">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Container>
              </li>
            ))}
          </ol>

          {/* comparison */}
          <div id="intelligence" data-reveal className="mt-14 overflow-hidden border-2 border-line bg-surface">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Conventional reefer compared with PerishFlow</caption>
              <thead className="bg-card">
                <tr>
                  <th scope="col" className="p-4 font-display text-base uppercase tracking-wide text-fg-muted sm:p-5">
                    Capability
                  </th>
                  <th scope="col" className="w-24 p-4 text-center font-display text-base uppercase tracking-wide text-fg-muted sm:w-44 sm:p-5">
                    Conventional reefer
                  </th>
                  <th scope="col" className="w-24 bg-safety/10 p-4 text-center font-display text-base uppercase tracking-wide text-safety sm:w-44 sm:p-5">
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
                    <td className="bg-safety/[0.05] p-4 text-center sm:p-5">
                      {pf && <Check className="mx-auto text-fresh" size={20} strokeWidth={3} aria-label="Yes" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Commodities: the white reefer ────────────────── */}
        <section id="commodities" aria-labelledby="commodities-title" className={SECTION}>
          <Container paint="reefer" serial="400231" type="45R1" className={BOX_PAD} data-reveal>
            <SectionHeader
              id="commodities-title"
              eyebrow="Commodities · Reefer 45R1"
              title="Every cargo spoils differently."
              lead="PerishFlow starts with high-value fresh produce, each with its own temperature band and control priorities. Seafood, dairy and pharmaceuticals follow."
            />
            <div className="mt-12">
              <CommoditySelector />
            </div>
          </Container>
        </section>

        {/* ─── Business model ───────────────────────────────── */}
        <section id="model" aria-labelledby="model-title" className={SECTION}>
          <Container paint="rust" serial="200584" type="22G1" className={BOX_PAD} data-reveal>
            <SectionHeader
              id="model-title"
              eyebrow="Business model"
              title="Hardware in the box. Intelligence on every voyage."
              lead="Built for exporters, shipping lines, logistics operators and importers — with revenue that compounds as the fleet and dataset grow."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {revenue.map((r) => (
                <li key={r.name} className="plate flex gap-4 p-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-black/30 text-safety">
                    <r.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl">{r.name}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ─── Roadmap: loading the stack ───────────────────── */}
        <section id="roadmap" aria-labelledby="roadmap-title" className={SECTION}>
          <div data-reveal>
            <SectionHeader
              id="roadmap-title"
              eyebrow="Roadmap"
              title="From first sensor to fleet scale."
              lead="PerishFlow is pre-MVP. We're building the data foundation first — because good predictions start with honest measurements."
            />
          </div>
          <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-4">
            {roadmap.map((r, i) => (
              <li
                key={r.phase}
                data-reveal
                style={{ ["--reveal-i" as string]: i }}
                aria-current={r.current ? "step" : undefined}
                className="flex"
              >
                <Container
                  paint={r.current ? "green" : "steel"}
                  className={`flex w-full flex-col p-6 ${r.current ? "" : "opacity-80"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-stencil text-4xl text-fg/80">{r.phase}</span>
                    {r.current ? (
                      <span className="inline-flex items-center gap-1.5 bg-safety px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wide text-[#1a1200]">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#1a1200]" aria-hidden />
                        Loading now
                      </span>
                    ) : (
                      <span className="border border-fg/25 px-2.5 py-1 font-display text-sm uppercase tracking-wide text-fg/70">
                        Queued
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-2xl">{r.name}</h3>
                  <p className="mt-2 text-fg/80">{r.body}</p>
                </Container>
              </li>
            ))}
          </ol>
          <div className="hazard mt-6 h-2" aria-hidden />
        </section>

        {/* ─── Contact: open the doors ──────────────────────── */}
        <section id="contact" aria-labelledby="contact-title" className={`${SECTION} pb-20 sm:pb-28`}>
          <Container paint="green" serial="300912" type="45G1" className="px-5 py-10 sm:px-10 sm:py-14 lg:px-6 lg:py-16" data-reveal>
            <div className="grid gap-12 lg:grid-cols-[auto_1fr_1.3fr_auto] lg:gap-10">
              {/* door locking bars (left door) */}
              <div className="hidden gap-6 px-4 pt-14 lg:flex" aria-hidden>
                <span className="lock-rod" />
                <span className="lock-rod" />
              </div>

              <div className="lg:pt-10">
                <p className="eyebrow">Open the doors</p>
                <h2 id="contact-title" className="mt-3 text-4xl sm:text-5xl">
                  Let&apos;s protect cargo together.
                </h2>
                <p className="mt-4 text-lg text-fg/85">
                  We&apos;re speaking with investors, exporters, logistics operators and research partners who want to
                  shape the first cargo-aware cold chain.
                </p>
                <ul className="mt-8 space-y-3">
                  {["Pilot a sensing kit on a live lane", "Share commodity expertise or data", "Discuss investment"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-3">
                        <Check size={18} className="text-safety" strokeWidth={3} aria-hidden /> {t}
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-8 text-fg/85">
                  Prefer email?{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-safety underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <div className="lg:pt-10">
                <ContactForm />
              </div>

              {/* door locking bars (right door) */}
              <div className="hidden gap-6 px-4 pt-14 lg:flex" aria-hidden>
                <span className="lock-rod" />
                <span className="lock-rod" />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer>
        <div className="hazard h-2" aria-hidden />
        <div className="container-page flex flex-col items-start justify-between gap-6 py-10 text-sm text-fg-muted sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span>© {new Date().getFullYear()} PerishFlow AI</span>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-display text-base uppercase tracking-wide">
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
