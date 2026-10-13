"use client";

import { useRef, useState } from "react";
import { commodities } from "@/lib/content";

export function CommoditySelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
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
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-[2px] border px-4 py-2 text-left text-sm transition-colors duration-200  ${
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

      {/* Every panel is in the HTML (inactive ones `hidden`) so crawlers and AI tools see all commodities. */}
      {commodities.map((c, idx) => (
        <div
          key={c.id}
          role="tabpanel"
          id={`panel-${c.id}`}
          aria-labelledby={`tab-${c.id}`}
          tabIndex={0}
          hidden={idx !== active}
          className="rounded-[3px] border border-line bg-card p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl font-semibold">{c.name}</h3>
            <span className="font-mono text-xs text-fg-muted">Indicative carriage profile</span>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[3px] bg-bg/60 p-4">
              <dt className="text-xs text-fg-muted">Temperature band</dt>
              <dd className="mt-1 font-mono text-lg text-ice">{c.band}</dd>
            </div>
            <div className="rounded-[3px] bg-bg/60 p-4">
              <dt className="text-xs text-fg-muted">Relative humidity</dt>
              <dd className="mt-1 font-mono text-lg">{c.rh}</dd>
            </div>
            <div className="rounded-[3px] bg-bg/60 p-4">
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
                className="inline-flex items-center gap-2 rounded-[2px] border border-line px-3 py-1.5 text-sm"
              >
                <span className="font-mono text-xs text-fresh">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
            {c.chilling && (
              <li className="inline-flex items-center rounded-[2px] border border-warn/40 bg-warn/10 px-3 py-1.5 text-sm text-warn">
                Chilling-sensitive
              </li>
            )}
          </ol>

          <p className="mt-6 text-xs text-fg-muted">
            Ranges are indicative and vary by cultivar, maturity and voyage length.
          </p>
        </div>
      ))}
    </div>
  );
}
