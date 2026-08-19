import "./globals.css";
import { Fredoka, Plus_Jakarta_Sans, Sora } from "next/font/google";
import AssistantWidget from "@/components/ai-assistant/AssistantWidget";
import PageLoader from "@/components/layout/PageLoader";
import JsonLd from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  defaultDescription,
  defaultKeywords,
  defaultTitle,
  organizationSchema,
  siteName,
  siteUrl,
  webSiteSchema,
} from "@/lib/seo";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  // Lets every page below use relative paths for canonicals and OG images.
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    // Pages set a bare title; the brand suffix is appended here so it can never
    // be forgotten or written two different ways.
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-icon.png",
  },
  category: "technology",
  // Stops iOS Safari from turning phone-number-like strings into links.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches the light/dark surfaces in globals.css so the browser chrome
  // blends with the page instead of flashing white.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // The font variables live on <html> so every rule that resolves
      // --font-sans (including the one on <html> itself) can see them.
      className={`${fredoka.variable} ${sora.variable} ${jakarta.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Site-wide identity. Page-level schema references these by @id. */}
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageLoader />
          {children}
          <AssistantWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
