"use client";

import { useRef, useState } from "react";

type Commodity = {
  id: string;
  name: string;
  band: string;
  rh: string;
  ethylene: string;
  chilling: boolean;
  priorities: string[];
  note: string;
};

// Indicative carriage ranges only — actual set points depend on cultivar, maturity and voyage.
const commodities: Commodity[] = [
  {
    id: "pineapple",
    name: "Pineapple",
    band: "7 – 10 °C",
    rh: "85 – 90%",
    ethylene: "Low producer",
    chilling: true,
    priorities: ["Chilling-injury avoidance", "Humidity balance", "Zone uniformity"],
    note: "Too cold and internal browning appears days after discharge — invisible at the port.",
  },
  {
    id: "mango",
    name: "Mango",
    band: "10 – 13 °C",
    rh: "85 – 90%",
    ethylene: "Climacteric producer",
    chilling: true,
    priorities: ["Ethylene scrubbing", "Ripening-rate prediction", "Hotspot detection"],
    note: "One warm pocket near the doors can trigger ripening that spreads through the load.",
  },
  {
    id: "banana",
    name: "Banana",
    band: "13 – 14.5 °C",
    rh: "90 – 95%",
    ethylene: "Highly sensitive",
    chilling: true,
    priorities: ["Ethylene control", "CO₂ / O₂ management", "Premature-ripening alerts"],
    note: "A narrow band between chilling damage and green-life loss makes precision essential.",
  },
  {
    id: "grapes",
    name: "Table grapes",
    band: "-1 – 0 °C",
    rh: "90 – 95%",
    ethylene: "Non-climacteric",
    chilling: false,
    priorities: ["Condensation prevention", "Humidity management", "Rapid pull-down"],
    note: "Free water on the bunches invites decay — condensation risk matters as much as temperature.",
  },
  {
    id: "berries",
    name: "Berries",
    band: "0 – 1 °C",
    rh: "90 – 95%",
    ethylene: "Low producer",
    chilling: false,
    priorities: ["Fast pull-down", "CO₂ enrichment", "Condensation risk"],
    note: "Short natural shelf life means every hour out of band is expensive.",
  },
  {
    id: "avocado",
    name: "Avocado",
    band: "5 – 7 °C",
    rh: "85 – 90%",
    ethylene: "Climacteric, sensitive",
    chilling: true,
    priorities: ["Ripening control", "Ethylene filtration", "Controlled atmosphere"],
    note: "Softening in transit is the classic claim — prediction lets you act before it starts.",
  },
  {
    id: "citrus",
    name: "Citrus",
    band: "3 – 13 °C (by type)",
    rh: "85 – 90%",
    ethylene: "Non-climacteric",
    chilling: true,
    priorities: ["Variety-specific bands", "Chilling-injury avoidance", "Decay risk"],
    note: "Lemons, oranges and mandarins each want different conditions — context is everything.",
  },
  {
    id: "flowers",
    name: "Cut flowers",
    band: "0 – 2 °C",
    rh: "90 – 95%",
    ethylene: "Highly sensitive",
    chilling: false,
    priorities: ["Ethylene filtration", "Humidity control", "Airflow uniformity"],
    note: "Trace ethylene from a mixed load can wilt a shipment before it reaches auction.",
  },
];

export function CommoditySelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = commodities[active];

  const onKey = (e: React.KeyboardEvent) => {
    const last = commodities.length - 1;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
      <div
        role="tablist"
        aria-label="Commodities"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {commodities.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-left text-sm transition-colors duration-200 lg:rounded-xl ${
                selected
                  ? "border-fresh bg-fresh/10 text-fg"
                  : "border-line text-fg-muted hover:border-fg-muted hover:text-fg"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${c.id}`}
        aria-labelledby={`tab-${c.id}`}
        tabIndex={0}
        className="rounded-3xl border border-line bg-card p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-2xl font-semibold">{c.name}</h3>
          <span className="font-mono text-xs text-fg-muted">Indicative carriage profile</span>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-bg/60 p-4">
            <dt className="text-xs text-fg-muted">Temperature band</dt>
            <dd className="mt-1 font-mono text-lg text-ice">{c.band}</dd>
          </div>
          <div className="rounded-2xl bg-bg/60 p-4">
            <dt className="text-xs text-fg-muted">Relative humidity</dt>
            <dd className="mt-1 font-mono text-lg">{c.rh}</dd>
          </div>
          <div className="rounded-2xl bg-bg/60 p-4">
            <dt className="text-xs text-fg-muted">Ethylene profile</dt>
            <dd className="mt-1 text-base">{c.ethylene}</dd>
          </div>
        </dl>

        <p className="mt-6 text-fg-muted">{c.note}</p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-fg-muted">
          PerishFlow control priorities
        </h4>
        <ol className="mt-3 flex flex-wrap gap-2">
          {c.priorities.map((p, i) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm"
            >
              <span className="font-mono text-xs text-fresh">{String(i + 1).padStart(2, "0")}</span>
              {p}
            </li>
          ))}
          {c.chilling && (
            <li className="inline-flex items-center rounded-full border border-warn/40 bg-warn/10 px-3 py-1.5 text-sm text-warn">
              Chilling-sensitive
            </li>
          )}
        </ol>

        <p className="mt-6 text-xs text-fg-muted">
          Ranges are indicative and vary by cultivar, maturity and voyage length.
        </p>
      </div>
    </div>
  );
}
