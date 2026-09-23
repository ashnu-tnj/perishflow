"use client";

import { Pause, Play, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Scripted, clearly-labelled simulation of the PerishFlow console.
 * A hotspot builds near the door end of a mango shipment, the model flags
 * it, the airflow module responds, and the zone recovers. Loops forever.
 */

const SET_POINT = 12.0;
const CYCLE = 24;
const ZONES = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"] as const;
const HOT = "D2";

type Frame = {
  temps: Record<string, number>;
  rh: number;
  co2: number;
  ethylene: number;
  risk: number; // 0–100
  log: { t: string; msg: string; tone: "info" | "warn" | "act" }[];
};

function frameAt(tick: number): Frame {
  const t = tick % CYCLE;
  // hotspot delta: ramps up 0→8, held until 10, recovers 10→18
  const hot = t <= 8 ? 0.25 * t : t <= 10 ? 2.0 : Math.max(0, 2.0 - 0.25 * (t - 10));
  const wobble = (i: number) => Math.sin(tick * 0.9 + i * 1.7) * 0.12;

  const temps: Record<string, number> = {};
  ZONES.forEach((z, i) => {
    const neighbour = z === "D1" || z === "C2" ? hot * 0.35 : 0;
    temps[z] = SET_POINT + wobble(i) + (z === HOT ? hot : neighbour);
  });

  const ethylene = t <= 12 ? 0.4 + t * 0.06 : Math.max(0.4, 1.12 - (t - 12) * 0.12);
  const risk = Math.round(Math.min(100, 12 + hot * 22 + (ethylene - 0.4) * 18));

  const log: Frame["log"] = [];
  if (t >= 4) log.push({ t: "T+04", msg: `Zone ${HOT} +${(0.25 * 4).toFixed(1)}°C above set point`, tone: "info" });
  if (t >= 7) log.push({ t: "T+07", msg: "Ripening acceleration predicted — door end", tone: "warn" });
  if (t >= 10) log.push({ t: "T+10", msg: `Airflow boosted to zone ${HOT}`, tone: "act" });
  if (t >= 13) log.push({ t: "T+13", msg: "Ethylene scrubber engaged", tone: "act" });
  if (t >= 18) log.push({ t: "T+18", msg: `Zone ${HOT} back in band — response verified`, tone: "info" });

  return {
    temps,
    rh: 88 + Math.sin(tick * 0.5) * 1.2,
    co2: 0.9 + Math.sin(tick * 0.3) * 0.08,
    ethylene,
    risk,
    log: log.slice(-3).reverse(),
  };
}

function zoneColor(delta: number) {
  if (delta >= 1.2) return "bg-risk/80 text-white";
  if (delta >= 0.6) return "bg-warn/80 text-[#1f1300]";
  return "bg-fresh/20 text-fg";
}

export function TelemetryPreview() {
  const [tick, setTick] = useState(CYCLE - 5); // start near the "resolved" end on first paint
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const running = !paused && !reduced && visible;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((n) => n + 1);
    }, 1400);
    return () => window.clearInterval(id);
  }, [running]);

  // Reduced motion: show a single meaningful snapshot (hotspot detected + action taken)
  const f = frameAt(reduced ? 11 : tick);
  const riskTone = f.risk >= 55 ? "bg-risk" : f.risk >= 30 ? "bg-warn" : "bg-fresh";
  const riskLabel = f.risk >= 55 ? "Elevated" : f.risk >= 30 ? "Watch" : "Nominal";

  return (
    <div ref={ref} className="glass relative rounded-3xl p-4 shadow-2xl shadow-black/40 sm:p-5">
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
            Reefer MSKU-40R · Mango · Day 9 of 14
          </p>
          <p className="mt-1 font-display text-base font-semibold">Cargo condition console</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-muted">
            <span className={`h-1.5 w-1.5 rounded-full bg-ice ${running ? "pulse-dot" : ""}`} aria-hidden />
            Simulated data
          </span>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-200 hover:bg-muted hover:text-fg"
              aria-label={paused ? "Resume simulation" : "Pause simulation"}
            >
              {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
            </button>
          )}
        </div>
      </div>

      {/* container heat map */}
      <div className="mt-4 rounded-2xl border border-line bg-bg/60 p-3">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-fg-muted">
          <span>Front · reefer unit</span>
          <span>Doors</span>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5" role="img" aria-label={`Container zone temperatures. Zone ${HOT} is ${(f.temps[HOT] - SET_POINT).toFixed(1)} degrees above set point.`}>
          {["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2"].map((z) => {
            const d = f.temps[z] - SET_POINT;
            return (
              <div
                key={z}
                className={`flex h-14 flex-col justify-between rounded-lg px-2 py-1.5 transition-colors duration-700 ${zoneColor(d)}`}
              >
                <span className="font-mono text-[10px] opacity-80">{z}</span>
                <span className="font-mono text-sm tabular-nums">{f.temps[z].toFixed(1)}°</span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-fg-muted">
          <Wind size={12} aria-hidden /> Set point {SET_POINT.toFixed(1)}°C · airflow front → doors
        </div>
      </div>

      {/* readings */}
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {[
          { k: "Humidity", v: `${f.rh.toFixed(0)}%` },
          { k: "CO₂", v: `${f.co2.toFixed(2)}%` },
          { k: "Ethylene", v: `${f.ethylene.toFixed(2)} ppm` },
        ].map((r) => (
          <div key={r.k} className="rounded-xl border border-line bg-bg/40 px-3 py-2">
            <dt className="text-[11px] text-fg-muted">{r.k}</dt>
            <dd className="font-mono text-sm tabular-nums">{r.v}</dd>
          </div>
        ))}
      </dl>

      {/* risk */}
      <div className="mt-3 rounded-xl border border-line bg-bg/40 px-3 py-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-fg-muted">Predicted shelf-life risk</span>
          <span className="font-mono tabular-nums">
            {f.risk}/100 · {riskLabel}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={f.risk}
          aria-label="Predicted shelf-life risk"
        >
          <div className={`h-full rounded-full transition-all duration-700 ${riskTone}`} style={{ width: `${f.risk}%` }} />
        </div>
      </div>

      {/* event log */}
      <ul className="mt-3 min-h-[5.25rem] space-y-1.5" aria-label="Recent events">
        {f.log.length === 0 && (
          <li className="font-mono text-[11px] text-fg-muted">All zones within band.</li>
        )}
        {f.log.map((l) => (
          <li key={l.t} className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-fg-muted">{l.t}</span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                l.tone === "act" ? "bg-fresh" : l.tone === "warn" ? "bg-warn" : "bg-ice"
              }`}
              aria-hidden
            />
            <span className="truncate">{l.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
