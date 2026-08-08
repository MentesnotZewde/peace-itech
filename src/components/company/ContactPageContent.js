"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  Home,
  LockKeyhole,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contactDetails = [
  {
    title: "Email Us",
    primary: "info@peaceitech.com",
    detail: "We reply to new inquiries within one business day.",
    icon: Mail,
  },
  {
    title: "Call Us",
    primary: "+1 (416) 555-0198",
    detail: "Monday to Friday, 9:00 AM - 6:00 PM EST.",
    icon: Phone,
  },
  {
    title: "Business Hours",
    primary: "Monday - Friday",
    detail: "Canada and Ethiopia project support available.",
    icon: Clock,
  },
  {
    title: "Response Time",
    primary: "Within 1 business day",
    detail: "We will help you choose the right next step.",
    icon: MessageCircle,
  },
];

const fields = [
  { label: "Full Name", type: "text", icon: User },
  { label: "Email Address", type: "email", icon: Mail },
  { label: "Phone Number", type: "tel", icon: Phone },
  { label: "Office", type: "text", icon: Building2 },
];

const offices = [
  {
    title: "Canada Office",
    flag: "/images/canada_flag.png",
    location: "Toronto, Ontario, Canada",
    phone: "+1 (416) 555-0198",
    email: "canada@peaceitech.com",
    address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7, Canada",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM (EST)",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.222957290138!2d-79.3142905!3d43.685128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd21d5fddf1d%3A0xb333bf515a38b2d2!2sWado%20Tax%20Services!5e0!3m2!1sen!2set!4v1786128513364!5m2!1sen!2set",
  },
  {
    title: "Ethiopia Office",
    flag: "/images/ethio_flag.png",
    location: "Addis Ababa, Ethiopia",
    phone: "+251 11 123 4567",
    email: "ethiopia@peaceitech.com",
    address: "Bole Road, Edna Mall Building, 5th Floor, Addis Ababa, Ethiopia",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM (EAT)",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.770523871153!2d38.7912883!3d8.9932514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850070bdd3ed%3A0x41e19890a166badc!2sSelam%20City%20Mall%20%231%20%7C%20Bole!5e0!3m2!1sen!2sus!4v1786128705615!5m2!1sen!2sus",
  },
];

export default function ContactPageContent() {
  return (
    <main className="flex-1">
      <section className="relative isolate -mt-[5.5rem] min-h-[22rem] overflow-hidden sm:min-h-[24rem] lg:min-h-[26rem]">
        <Image
          src="/images/contact banner.png"
          alt="Business consultants reviewing a project tablet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#020817]/58" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.88),rgba(2,8,23,0.54)_46%,rgba(0,91,255,0.18))]" />
        <div className="relative mx-auto flex min-h-[22rem] max-w-7xl items-center px-4 pb-10 pt-[8rem] sm:min-h-[24rem] sm:px-6 lg:min-h-[26rem] lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-medium text-white/78">
              <Link
                href="/"
                aria-label="Home"
                className="text-[#12B7FF] transition hover:text-white"
              >
                <Home className="h-4 w-4" />
              </Link>
              <span>/</span>
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
              Let&apos;s talk about how Peace iTech Inc can support your
              business across Canada, Ethiopia, and beyond.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <ScrollReveal>
            <form className="rounded-[1rem] border border-[#005BFF]/12 bg-white/86 p-6 shadow-[0_20px_58px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                Send us a message
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                We&apos;d love to hear from you. Fill out the form and our
                team will get back to you shortly.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <label key={field.label} className="relative block">
                      <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={field.type}
                        placeholder={field.label}
                        className="h-12 w-full rounded-[0.65rem] border border-[#005BFF]/12 bg-background/70 px-12 text-sm text-foreground outline-none transition focus:border-[#005BFF]/42 focus:ring-3 focus:ring-[#005BFF]/12 dark:border-[#12B7FF]/16 dark:bg-[#07142A]/72 dark:focus:border-[#12B7FF]/42"
                      />
                    </label>
                  );
                })}
              </div>

              <label className="relative mt-4 block">
                <MessageCircle className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Subject"
                  className="h-12 w-full rounded-[0.65rem] border border-[#005BFF]/12 bg-background/70 px-12 text-sm text-foreground outline-none transition focus:border-[#005BFF]/42 focus:ring-3 focus:ring-[#005BFF]/12 dark:border-[#12B7FF]/16 dark:bg-[#07142A]/72 dark:focus:border-[#12B7FF]/42"
                />
              </label>

              <label className="relative mt-4 block">
                <MessageCircle className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <textarea
                  rows={5}
                  placeholder="Message"
                  className="w-full resize-none rounded-[0.65rem] border border-[#005BFF]/12 bg-background/70 px-12 py-4 text-sm text-foreground outline-none transition focus:border-[#005BFF]/42 focus:ring-3 focus:ring-[#005BFF]/12 dark:border-[#12B7FF]/16 dark:bg-[#07142A]/72 dark:focus:border-[#12B7FF]/42"
                />
              </label>

              <Button
                type="submit"
                className="mt-5 h-12 w-full rounded-[0.65rem] bg-[#005BFF] text-sm font-semibold text-white shadow-[0_16px_34px_rgba(0,91,255,0.22)] hover:bg-[#004FE0]"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <LockKeyhole className="h-4 w-4" />
                Your information is secure and will never be shared.
              </p>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <aside className="h-full rounded-[1rem] border border-[#005BFF]/10 bg-[#F8FBFF]/86 p-6 shadow-[0_20px_58px_rgba(0,91,255,0.07)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-normal text-foreground">
                Get in touch
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Reach out to us using any of the options below.
              </p>

              <div className="mt-7 divide-y divide-[#005BFF]/10 dark:divide-[#12B7FF]/14">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005BFF] text-white shadow-[0_14px_30px_rgba(0,91,255,0.22)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#005BFF] dark:text-[#12B7FF]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {item.primary}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 pb-16 transition-colors sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Our Offices
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              We&apos;re in Canada and Ethiopia
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Two offices. One commitment to your success.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {offices.map((office, index) => (
              <ScrollReveal key={office.title} delay={index * 0.06}>
                <article className="overflow-hidden rounded-[1rem] border border-[#005BFF]/12 bg-white/86 shadow-[0_18px_48px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74">
                  <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[17rem] overflow-hidden bg-[#EAF3FF] dark:bg-[#07142A]">
                      <iframe
                        src={office.mapSrc}
                        title={`${office.title} map`}
                        className="absolute inset-0 h-full w-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,91,255,0.08),rgba(2,8,23,0.04))]" />
                      <div className="pointer-events-none absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-white text-[#005BFF] shadow-[0_18px_38px_rgba(0,91,255,0.18)] dark:bg-[#0B1830] dark:text-[#12B7FF]">
                        <MapPin className="h-8 w-8" />
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-normal text-foreground">
                          {office.title}
                        </h3>
                        <span className="inline-flex h-7 w-10 items-center justify-center overflow-hidden rounded-[0.35rem] border border-[#005BFF]/12 bg-white shadow-sm dark:border-[#12B7FF]/18">
                          <Image
                            src={office.flag}
                            alt={`${office.title} flag`}
                            width={40}
                            height={28}
                            className="h-full w-full object-cover"
                          />
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 text-sm">
                        {[
                          { icon: MapPin, value: office.location },
                          { icon: Phone, value: office.phone },
                          { icon: Mail, value: office.email },
                          { icon: MapPin, value: office.address },
                          { icon: Clock, value: office.hours },
                        ].map((item) => {
                          const Icon = item.icon;

                          return (
                            <div key={item.value} className="flex gap-3">
                              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#005BFF] dark:text-[#12B7FF]" />
                              <span className="leading-6 text-muted-foreground">
                                {item.value}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
