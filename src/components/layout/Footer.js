import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Media Center", href: "/media-center" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M14.5 8.1h2.2V4.3a28.4 28.4 0 0 0-3.2-.2c-3.2 0-5.4 2-5.4 5.6v3.1H4.5V17h3.6v8.9h4.5V17h3.5l.6-4.2h-4.1v-2.7c0-1.2.3-2 1.9-2Z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="5" y="5" width="18" height="18" rx="5" />
        <circle cx="14" cy="14" r="4" />
        <circle cx="19.5" cy="8.5" r="1" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <>
        <path d="M6.2 11h4v12h-4zM8.2 5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Z" />
        <path d="M13 11h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.8 2.6 4.8 6.1V23h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V23H13z" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <path d="M19 6.2c1.1 1.3 2.5 2.1 4.1 2.2v4.1a8.1 8.1 0 0 1-4-1v6.2a6.7 6.7 0 1 1-6.7-6.7c.4 0 .7 0 1.1.1v4.2a2.5 2.5 0 1 0 1.6 2.4V3.9H19z" />
    ),
  },
];

function SocialIcon({ children }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border/70 bg-gradient-to-b from-background to-muted/40 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.7fr_0.9fr_1.1fr]">
            <div>
              <Link
                href="/"
                className="group flex items-center gap-3 font-semibold"
                aria-label="Peace iTech Inc home"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted/50">
                  <Image
                    src="/logo-icon.png"
                    alt="Peace iTech Inc logo"
                    width={56}
                    height={56}
                    className="size-12 scale-125 object-contain transition-transform duration-300 group-hover:scale-[1.35]"
                  />
                </span>
                <span className="text-base text-foreground">
                  Peace iTech Inc
                </span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
                Premium technology solutions for websites, ERP, automation,
                cybersecurity, digital marketing, and dependable IT support.
              </p>
              <div className="mt-6 flex gap-2">
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    asChild
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#12B7A8] hover:text-[#005BFF]"
                  >
                    <Link href={link.href} aria-label={link.label}>
                      <SocialIcon>{link.icon}</SocialIcon>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <div className="mt-4 grid gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Services</h3>
              <div className="mt-4 grid gap-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Stay connected
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Get practical notes on business technology, automation, and
                secure digital growth.
              </p>
              {/* Simple newsletter UI: the form is visual until a backend/API route is added. */}
              <form className="mt-5 flex gap-2 rounded-full border border-border bg-muted/40 p-1">
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <Button type="submit" className="rounded-full px-5">
                  Join
                </Button>
              </form>
              <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                <Link
                  href="mailto:hello@peaceitech.com"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-[#005BFF]" aria-hidden="true" />
                  hello@peaceitech.com
                </Link>
                <Link
                  href="tel:+15550120188"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-[#005BFF]" aria-hidden="true" />
                  +1 (555) 012-0188
                </Link>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#005BFF]" aria-hidden="true" />
                  United States
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Peace iTech Inc. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="#" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Terms of Use
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Legal
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Site Map
              </Link>
            </div>
          </div>
      </div>
    </footer>
  );
}
