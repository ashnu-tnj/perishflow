import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { RevealObserver } from "@/components/Reveal";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
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

export const viewport: Viewport = { themeColor: "#0b1120" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fresh focus:px-4 focus:py-2 focus:text-[#052e16]"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
