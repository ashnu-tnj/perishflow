import { COMPANY, CONTACT_EMAIL, SITE_NAME, SITE_URL, SUMMARY, TEAM, commodities } from "@/lib/content";

/** schema.org JSON-LD describing the organisation, its parent company and the site. */
export function StructuredData() {
  const org = `${SITE_URL}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        email: CONTACT_EMAIL,
        description: SUMMARY,
        slogan: "The cold chain that knows what's inside.",
        knowsAbout: [
          "Cold chain logistics",
          "Refrigerated containers (reefers)",
          "Perishable cargo monitoring",
          "Shelf-life prediction",
          "Ethylene control",
          ...commodities.map((c) => c.name),
        ],
        member: { "@type": "Person", name: TEAM.name, sameAs: [TEAM.f6s] },
        parentOrganization: {
          "@type": "Organization",
          legalName: COMPANY.legalName,
          name: COMPANY.legalName,
          identifier: { "@type": "PropertyValue", propertyID: "CIN", value: COMPANY.cin },
          address: {
            "@type": "PostalAddress",
            addressLocality: COMPANY.locality,
            addressRegion: COMPANY.region,
            addressCountry: COMPANY.country,
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SUMMARY,
        inLanguage: "en",
        publisher: { "@id": org },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here once "<" is escaped, so it cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
