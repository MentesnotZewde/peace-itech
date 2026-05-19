import Link from "next/link";
import { Globe2, Mail, MapPin, Phone, Send } from "lucide-react";

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

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border/70 bg-muted/30 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1.1fr]">
          <div>
            <Link href="#" className="flex items-center gap-3 font-semibold">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BFF] via-[#12B7FF] to-[#12B7FF] text-sm font-bold text-white">
                PI
              </span>
              Peace iTech Inc
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Premium technology solutions for websites, ERP, automation,
              cybersecurity, digital marketing, and dependable IT support.
            </p>
            <div className="mt-6 flex gap-2">
              {[Globe2, Send, Mail].map((Icon, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background"
                  aria-label="Social media link"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick links</h3>
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
            <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Get practical notes on business technology, automation, and secure
              digital growth.
            </p>
            {/* Simple newsletter UI: the form is visual until a backend/API route is added. */}
            <form className="mt-5 flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none transition-shadow focus:ring-3 focus:ring-ring/30"
              />
              <Button type="submit" className="rounded-full px-4">
                Join
              </Button>
            </form>
            <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="size-4" aria-hidden="true" />
                hello@peaceitech.com
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4" aria-hidden="true" />
                +1 (555) 012-0188
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" aria-hidden="true" />
                United States
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 Peace iTech Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


