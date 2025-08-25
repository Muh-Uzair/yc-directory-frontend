import "@/styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "YC Directory - Showcase Your Startup to the World",
    template: "%s | YC Directory",
  },
  description:
    "Join the premier directory of innovative startups. Connect with investors, partners, and customers. Showcase your startup to a global audience and accelerate your growth journey.",
  keywords: [
    "startup directory",
    "startup showcase",
    "entrepreneurs",
    "investors",
    "venture capital",
    "startup funding",
    "innovation",
    "tech startups",
    "business directory",
    "startup community",
    "YC Directory",
    "startup platform",
  ],
  authors: [{ name: "YC Directory Team" }],
  creator: "YC Directory",
  publisher: "YC Directory",
  category: "Business",
  classification: "Startup Directory Platform",

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification tags (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
  },

  // App-specific metadata
  applicationName: "YC Directory",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },

  // Additional SEO enhancements
  alternates: {
    canonical: "https://ycdirectory.com",
    languages: {
      "en-US": "https://ycdirectory.com",
    },
  },

  // Icons and manifest
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Other metadata
  other: {
    "theme-color": "oklch(71.5% 0.143 215.221)",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
