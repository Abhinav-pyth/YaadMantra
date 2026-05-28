import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { PwaRegister } from "@/components/PwaRegister";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const appUrl = "https://yaadmantra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "YaadMantra | AI-powered Hindi mnemonic learning",
    template: "%s | YaadMantra"
  },
  description:
    "YaadMantra helps learners memorize geography, history, science, coding, UPSC, SSC, Java interview, and English vocabulary facts with Hindi mnemonic sentences.",
  applicationName: "YaadMantra",
  manifest: "/manifest.webmanifest",
  keywords: [
    "Hindi mnemonics",
    "YaadMantra",
    "UPSC memory tricks",
    "SSC mnemonics",
    "coding mnemonics",
    "Hindi learning app"
  ],
  authors: [{ name: "YaadMantra" }],
  openGraph: {
    title: "YaadMantra",
    description: "AI-like Hindi mnemonic learning platform that works offline and stores progress locally.",
    url: appUrl,
    siteName: "YaadMantra",
    locale: "hi_IN",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "YaadMantra",
    description: "Hindi mnemonic learning for exams, interviews, and daily revision."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f0" },
    { media: "(prefers-color-scheme: dark)", color: "#12151d" }
  ]
};

const themeScript = `
(() => {
  try {
    const key = "yaadmantra:theme:v1";
    const stored = localStorage.getItem(key);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored || preferred;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastProvider />
          <PwaRegister />
        </FavoritesProvider>
      </body>
    </html>
  );
}
