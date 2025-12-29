import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StatecraftTA from "@/components/StatecraftTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"], 
  variable: "--font-ibm-plex-serif" 
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Statecraft Simulations | AP Government",
  description: "The ultimate situation room for AP Government students.",
  verification: {
    // Add your Google Search Console verification code here
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        <div className="fixed inset-0 tactical-grid pointer-events-none -z-10" />
        <Navbar />
        <main>{children}</main>
        <StatecraftTA />
        
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
