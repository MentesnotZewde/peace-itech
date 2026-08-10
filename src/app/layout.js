import "./globals.css";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import AssistantWidget from "@/components/ai-assistant/AssistantWidget";
import PageLoader from "@/components/layout/PageLoader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
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
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${fredoka.variable} ${jakarta.variable} min-h-full flex flex-col font-sans`}
      >
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
