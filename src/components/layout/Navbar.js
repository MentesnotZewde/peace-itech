"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Media Center", href: "/media-center" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let frameId;
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    frameId = requestAnimationFrame(() => {
      setIsDark(shouldUseDark);
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
  }

  function openServicesDropdown() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsServicesOpen(true);
  }

  function closeServicesDropdown() {
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 120);
  }

  return (
    <header className="sticky top-0 z-[100] w-full px-3 py-3 transition-colors">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-border/70 bg-background/85 px-4 shadow-lg shadow-foreground/5 backdrop-blur-2xl transition-colors lg:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 text-sm font-semibold tracking-normal text-foreground"
          aria-label="Peace iTech Inc home"
        >
          <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/logo-icon.png"
              alt="Peace iTech Inc logo"
              width={56}
              height={56}
              className="size-12 scale-125 object-contain transition-transform duration-300 group-hover:scale-[1.35]"
              priority
            />
          </span>

          <span className="truncate text-base font-semibold">
            Peace iTech Inc
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={openServicesDropdown}
            onMouseLeave={closeServicesDropdown}
            onFocus={openServicesDropdown}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground"
              aria-expanded={isServicesOpen}
              onClick={() => setIsServicesOpen((open) => !open)}
            >
              Services
              <ChevronDown
                className={`size-4 transition-transform ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              className={`fixed left-1/2 top-[5.25rem] z-[110] w-[min(50rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-200 ${
                isServicesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="rounded-[1.75rem] border border-border/70 bg-background/95 p-4 shadow-2xl shadow-foreground/10 ring-1 ring-background/80 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between gap-4 px-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Services
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enterprise technology services for growth, operations, and
                      support.
                    </p>
                  </div>

                  <span className="hidden rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
                    Peace iTech Inc
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group rounded-2xl border border-transparent p-4 transition-all hover:-translate-y-1 hover:border-border hover:bg-muted/50 hover:shadow-lg hover:shadow-foreground/5"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="flex gap-3">
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 ring-1 ring-blue-500/20 transition-transform group-hover:scale-105">
                            <Icon className="size-5" aria-hidden="true" />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              {service.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-2xl bg-foreground p-4 text-background">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Enterprise delivery model
                      </p>
                      <p className="mt-1 text-xs text-background/70">
                        Strategy, design, engineering, security, launch, and
                        support in one partner.
                      </p>
                    </div>
                    <ArrowRight
                      className="size-5 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-border/70 bg-background/70 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
            aria-label={
              isMounted && isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={toggleTheme}
          >
            {isMounted && isDark ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>

          <Button
            asChild
            className="h-11 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 px-5 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <Link href="/contact">
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen((open) => !open);
            setIsServicesOpen(false);
          }}
        >
          {isOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </Button>
      </nav>

      {isOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-border/70 bg-background/95 shadow-2xl shadow-foreground/10 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 p-3 sm:p-4">
            <Link
              href="/"
              className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div className="rounded-2xl border border-border/70 bg-muted/25 p-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen((open) => !open)}
              >
                Services
                <ChevronDown
                  className={`size-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isServicesOpen
                    ? "mt-2 max-h-[34rem] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-background"
                      onClick={() => {
                        setIsOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-blue-600"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-medium text-foreground">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                          {service.eyebrow}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 grid gap-2 border-t border-border/60 pt-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 justify-between rounded-full"
                onClick={toggleTheme}
              >
                {isMounted && isDark ? "Light mode" : "Dark mode"}
                {isMounted && isDark ? (
                  <Sun className="size-4" aria-hidden="true" />
                ) : (
                  <Moon className="size-4" aria-hidden="true" />
                )}
              </Button>

              <Button
                asChild
                className="h-11 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Start a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
