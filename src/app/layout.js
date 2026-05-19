import "./globals.css";

export const metadata = {
  title: "Peace iTech Inc | Premium Technology Solutions",
  description:
    "Peace iTech Inc builds websites, ERP systems, automations, cybersecurity programs, digital marketing systems, and IT support for modern businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

