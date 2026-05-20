import "./globals.css";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  title: "Peace iTech Inc | Premium Technology Solutions",
  description:
    "Peace iTech Inc builds websites, ERP systems, automations, cybersecurity programs, digital marketing systems, and IT support for modern businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className={`${sora.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}

