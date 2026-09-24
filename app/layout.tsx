import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono, Saira_Stencil } from "next/font/google";
import { RevealObserver } from "@/components/Reveal";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});
const sans = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-barlow", display: "swap" });
const stencil = Saira_Stencil({ subsets: ["latin"], weight: "600", variable: "--font-saira-stencil", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://perishflow.aflatus.com"),
  title: "PerishFlow AI — Cold chain that knows what's inside",
  description:
    "AI-powered cargo environment management for refrigerated containers. PerishFlow senses, understands, predicts and acts on the condition of perishable cargo in transit.",
  openGraph: {
    title: "PerishFlow AI — Cold chain that knows what's inside",
    description:
      "Sense → Understand → Predict → Act. Active, cargo-aware environment control for reefer containers.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0e1116" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${stencil.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-safety focus:px-4 focus:py-2 focus:text-[#052e16]"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
