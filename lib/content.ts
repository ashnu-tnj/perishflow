/**
 * Single source for the site's copy and data. The landing page, /llms.txt,
 * /llms-full.txt and the JSON-LD structured data all read from here so they
 * never drift apart.
 */
import { SITE_URL } from "./site";

export { SITE_URL };

export const SITE_NAME = "PerishFlow";
export const TAGLINE = "The cold chain that knows what's inside.";
export const SUMMARY =
  "PerishFlow is an AI-powered cargo environment management system for refrigerated shipping containers (reefers). " +
  "It senses conditions across every cargo zone, understands them in the context of the produce on board, predicts " +
  "deterioration before it is visible, and acts through control modules to protect shelf life in transit.";
export const STAGE = "Pre-MVP (Phase 1: sensing infrastructure and baseline datasets).";
export const CONTACT_EMAIL = "info@aflatus.com";

export const COMPANY = {
  legalName: "Aflatus (OPC) Private Limited",
  cin: "U46301TN2025OPC184784",
  registeredOffice: "Chennai, Tamil Nadu, India",
  locality: "Chennai",
  region: "Tamil Nadu",
  country: "IN",
} as const;

export const FOUNDER = {
  name: "Mohamed Ashfaaq Kalifulla",
  f6s: "https://www.f6s.com/member/mohamed-kalifulla",
} as const;

export const problems = [
  {
    title: "One sensor, one number",
    body: "Conventional reefers control on return-air temperature. Hotspots near the doors or deep in the stow go unseen.",
  },
  {
    title: "Invisible chemistry",
    body: "Ethylene build-up and shifting CO₂ / O₂ accelerate ripening long before a single piece of fruit looks different.",
  },
  {
    title: "Found too late",
    body: "Without a record of cargo condition, damage surfaces at discharge — and becomes a dispute instead of a decision.",
  },
];

export const FOOD_LOSS_STAT = {
  value: "~14%",
  text: "of the world's food is lost between harvest and retail",
  source: "FAO, The State of Food and Agriculture 2019",
} as const;

export const steps = [
  {
    name: "Sense",
    paint: "navy",
    body: "Distributed probes across multiple cargo zones — not one return-air sensor — capture the real environment around the fruit.",
    tags: ["Temperature", "Humidity", "CO₂", "O₂", "Ethylene", "Airflow", "Shock"],
  },
  {
    name: "Understand",
    paint: "rust",
    body: "Raw readings are interpreted in context: what the cargo is, when it was harvested, and how long it still has to travel.",
    tags: ["Produce type", "Harvest date", "Voyage duration"],
  },
  {
    name: "Predict",
    paint: "steel",
    body: "Models estimate shelf-life risk, ripening acceleration, hotspots and condensation before any damage is visible.",
    tags: ["Shelf-life risk", "Ripening", "Hotspots", "Condensation"],
  },
  {
    name: "Act",
    paint: "green",
    body: "Control modules respond to the prediction — then PerishFlow measures whether the response actually worked.",
    tags: ["Air circulation", "Humidity", "Ethylene filtration", "CO₂ management"],
  },
] as const;


export const comparison = [
  ["Knows its set temperature", true, true],
  ["Measures conditions in every cargo zone", false, true],
  ["Tracks ethylene, CO₂ and O₂ around the produce", false, true],
  ["Understands what the cargo is and how old it is", false, true],
  ["Predicts deterioration before it is visible", false, true],
  ["Acts on a specific zone and verifies the result", false, true],
] as const;


export const revenue = [
  { name: "Hardware", body: "Sensing and control modules, sold or leased per container." },
  { name: "Per-shipment analytics", body: "AI condition monitoring priced per voyage." },
  { name: "Dashboard subscriptions", body: "Live and historical views for exporters and importers." },
  { name: "Fleet analytics", body: "Enterprise insight across lanes, vessels and seasons." },
  { name: "Cargo-condition reports", body: "Evidence for claims, insurers and quality disputes." },
  { name: "Platform APIs", body: "Condition data piped into TMS, ERP and trading systems." },
];


export const roadmap = [
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


export type Commodity = {
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
export const commodities: Commodity[] = [
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

export const futureCommodities = ["Seafood", "Dairy", "Pharmaceuticals"];
