import "./globals.css";
import { Fredoka, Plus_Jakarta_Sans, Sora } from "next/font/google";
import AssistantWidget from "@/components/ai-assistant/AssistantWidget";
import PageLoader from "@/components/layout/PageLoader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Peace iTech Inc | Premium Technology Solutions",
  description:
    "Peace iTech Inc builds websites, ERP systems, automations, cybersecurity programs, digital marketing systems, and IT support for modern businesses.",
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
