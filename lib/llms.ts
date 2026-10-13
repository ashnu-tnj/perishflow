/**
 * Markdown for AI assistants, following the llms.txt convention (https://llmstxt.org).
 * Generated from lib/content.ts at build time so it always matches the page.
 */
import {
  COMPANY,
  CONTACT_EMAIL,
  FOOD_LOSS_STAT,
  SITE_NAME,
  SITE_URL,
  STAGE,
  SUMMARY,
  TAGLINE,
  TEAM,
  commodities,
  comparison,
  futureCommodities,
  problems,
  revenue,
  roadmap,
  steps,
} from "./content";

const url = (hash = "") => `${SITE_URL}/${hash}`;

function companyBlock() {
  return [
    "## Company",
    "",
    `- ${SITE_NAME} is a part of ${COMPANY.legalName} (CIN ${COMPANY.cin}).`,
    `- Registered office: ${COMPANY.registeredOffice}.`,
    `- Team: ${TEAM.name} ([F6S profile](${TEAM.f6s})).`,
    `- Stage: ${STAGE}`,
    `- Contact: ${CONTACT_EMAIL}`,
    `- Website: ${SITE_URL}`,
  ].join("\n");
}

export function llmsTxt() {
  return `# ${SITE_NAME}

> ${SUMMARY}

${TAGLINE} Conventional reefers hold a set temperature; ${SITE_NAME} manages the actual condition of the cargo inside.

## Key facts

- What it is: AI cargo environment management for refrigerated shipping containers (reefers).
- How it works: Sense → Understand → Predict → Act, a closed control loop.
- Signals sensed: ${steps[0].tags.join(", ")}.
- Launch commodities: ${commodities.map((c) => c.name).join(", ")}. Next: ${futureCommodities.join(", ")}.
- Business model: ${revenue.map((r) => r.name).join(", ")}.
- Stage: ${STAGE}

## Pages

- [Overview](${url()}): the full landing page.
- [The problem](${url("#problem")}): why set-point control misses cargo condition.
- [The system](${url("#system")}): Sense → Understand → Predict → Act, and how it compares with a conventional reefer.
- [Commodities](${url("#commodities")}): carriage profiles and control priorities per commodity.
- [Business model](${url("#model")}): revenue streams.
- [Roadmap](${url("#roadmap")}): development phases.
- [Contact](${url("#contact")}): request a conversation.

## Optional

- [Full text for LLMs](${url("llms-full.txt")}): every section of the site as Markdown, including all commodity profiles.

${companyBlock()}
`;
}

export function llmsFullTxt() {
  const yes = (b: boolean) => (b ? "Yes" : "No");
  return `# ${SITE_NAME}: full site content

> ${SUMMARY}

Source: ${SITE_URL}. This file mirrors the website for AI assistants and is regenerated on every release.

## The problem

A container knows its set point. Not the condition of its cargo. Quality loss in transit is usually discovered at the destination, when it is too late to do anything but file a claim.

${problems.map((p) => `- **${p.title}.** ${p.body}`).join("\n")}

${FOOD_LOSS_STAT.value} ${FOOD_LOSS_STAT.text} (source: ${FOOD_LOSS_STAT.source}).

## The system: Sense → Understand → Predict → Act

${steps.map((s, i) => `### ${i + 1}. ${s.name}\n\n${s.body}\n\nCovers: ${s.tags.join(", ")}.`).join("\n\n")}

### Conventional reefer vs ${SITE_NAME}

| Capability | Conventional reefer | ${SITE_NAME} |
|---|---|---|
${comparison.map(([label, legacy, pf]) => `| ${label} | ${yes(legacy)} | ${yes(pf)} |`).join("\n")}

## Commodities

Every cargo spoils differently. ${SITE_NAME} starts with high-value fresh produce; ${futureCommodities.join(", ").toLowerCase()} follow. Ranges are indicative and vary by cultivar, maturity and voyage length.

${commodities
  .map(
    (c) => `### ${c.name}

- Temperature band: ${c.band}
- Relative humidity: ${c.rh}
- Ethylene profile: ${c.ethylene}
- Chilling-sensitive: ${yes(c.chilling)}
- ${SITE_NAME} control priorities: ${c.priorities.join("; ")}

${c.note}`,
  )
  .join("\n\n")}

## Business model

Hardware in the box. Intelligence on every voyage. Built for exporters, shipping lines, logistics operators and importers.

${revenue.map((r) => `- **${r.name}:** ${r.body}`).join("\n")}

## Roadmap

${roadmap.map((r) => `- **Phase ${Number(r.phase)}: ${r.name}**${r.current ? " (current)" : ""}. ${r.body}`).join("\n")}

## Contact

${SITE_NAME} is speaking with investors, exporters, logistics operators and research partners: to pilot a sensing kit on a live lane, share commodity expertise or data, or discuss investment. Email ${CONTACT_EMAIL} or use the form at ${url("#contact")}.

${companyBlock()}
`;
}
