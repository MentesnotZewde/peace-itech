import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock3,
  FileSearch,
  Gauge,
  Mail,
  PenTool,
  Rocket,
  SearchCheck,
  Share2,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServicePortfolioSection from "@/components/services/ServicePortfolioSection";

function InstagramLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 8.2h2.2V4.4c-.38-.05-1.7-.16-3.23-.16-3.2 0-5.39 1.95-5.39 5.52v3.11H4v4.25h3.58V24h4.39v-6.88h3.44l.55-4.25h-3.99v-2.69c0-1.23.34-1.98 2.03-1.98Z" />
    </svg>
  );
}

function LinkedInLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.37 7.43a2.53 2.53 0 1 1 0-5.06 2.53 2.53 0 0 1 0 5.06ZM3.18 21.63h4.38V8.98H3.18v12.65ZM9.91 8.98h4.2v1.73h.06c.58-1.05 2.01-2.1 4.14-2.1 4.43 0 5.25 2.8 5.25 6.44v6.58h-4.38v-5.84c0-1.39-.03-3.18-2.02-3.18-2.02 0-2.33 1.52-2.33 3.08v5.94H9.91V8.98Z" />
    </svg>
  );
}

function GoogleAdsLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M18.9 37.1 34.4 10.3a5.7 5.7 0 0 1 9.9 5.7L28.8 42.8a5.7 5.7 0 0 1-9.9-5.7Z"
        fill="#34A853"
      />
      <path
        d="M4.5 32.9 20 6.1A5.7 5.7 0 0 1 29.9 12L14.4 38.6a5.7 5.7 0 0 1-9.9-5.7Z"
        fill="#4285F4"
      />
      <circle cx="9.7" cy="35.9" r="6.2" fill="#FBBC04" />
    </svg>
  );
}

function MetaAdsLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M7 30.2c0-8.7 4.2-16.4 9.9-16.4 3.4 0 6.2 2.7 8.8 6.7 2.4-3.7 5.1-6.7 8.7-6.7 5.8 0 9.6 7.7 9.6 16.2 0 5.5-2.3 8.2-5.8 8.2-3.7 0-6.4-2.7-12.2-12.3C20.4 35.2 17.8 38.2 14 38.2c-4 0-7-2.8-7-8Z"
        stroke="#0866FF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleAnalyticsLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="8" y="24" width="8" height="16" rx="4" fill="#F9AB00" />
      <rect x="20" y="14" width="8" height="26" rx="4" fill="#E37400" />
      <rect x="32" y="6" width="8" height="34" rx="4" fill="#F9AB00" />
    </svg>
  );
}

function SearchConsoleLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M42 24.5c0-1.3-.1-2.4-.3-3.5H24.4v6.8h9.9a8.5 8.5 0 0 1-3.7 5.5v4.5h6c3.5-3.2 5.4-7.9 5.4-13.3Z"
        fill="#4285F4"
      />
      <path
        d="M24.4 42c5 0 9.2-1.7 12.2-4.5l-6-4.5a11.2 11.2 0 0 1-16.7-5.9H7.7v4.7A18.4 18.4 0 0 0 24.4 42Z"
        fill="#34A853"
      />
      <path
        d="M13.9 27.1a11.2 11.2 0 0 1 0-7.2v-4.7H7.7a18.4 18.4 0 0 0 0 16.6l6.2-4.7Z"
        fill="#FBBC05"
      />
      <path
        d="M24.4 13.3c2.7 0 5.1.9 7 2.8l5.3-5.3A18 18 0 0 0 24.4 6 18.4 18.4 0 0 0 7.7 15.2l6.2 4.7a11 11 0 0 1 10.5-6.6Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function HubSpotLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M34.6 19.2v-5.1a4.3 4.3 0 1 0-3.2 0v5.1a10.4 10.4 0 0 0-5 3.1L15.2 13.6a4.7 4.7 0 1 0-2.2 2.7l11.1 8.6a10.4 10.4 0 1 0 10.5-5.7Z"
        fill="#FF5C35"
      />
      <circle cx="33" cy="29.4" r="5" fill="white" />
    </svg>
  );
}

function MailchimpLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="18" fill="#FFE01B" />
      <path
        d="M14 29c2.2 5.6 10.5 7.1 16.7 2.5 5-3.7 5.2-10.2 1.6-13.5-3.1-2.9-8.5-2.6-12.4.7-2 1.7-3.4 3.9-4.4 6.6l6.2-2.4"
        stroke="#231E15"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30.5" cy="23" r="1.3" fill="#231E15" />
    </svg>
  );
}

function CanvaLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="canvaLogoGradient" x1="8" x2="40" y1="40" y2="8">
          <stop stopColor="#00C4CC" />
          <stop offset="0.5" stopColor="#7D2AE8" />
          <stop offset="1" stopColor="#00C4CC" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#canvaLogoGradient)" />
      <path
        d="M31 29.5c-2 2.5-5.2 4.1-8.2 4.1-4.8 0-7.7-3.4-6.7-8.5 1.1-5.4 5.8-10.6 11.4-10.6 3 0 5 1.5 5.4 3.7"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AhrefsLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="10" y="10" width="8" height="8" fill="#00A5EC" />
      <rect x="20" y="10" width="8" height="8" fill="#1D4ED8" />
      <rect x="20" y="20" width="8" height="8" fill="#00A5EC" />
      <rect x="30" y="20" width="8" height="8" fill="#1D4ED8" />
      <rect x="20" y="30" width="8" height="8" fill="#1D4ED8" />
      <rect x="10" y="30" width="8" height="8" fill="#00A5EC" />
      <rect x="10" y="20" width="8" height="8" fill="#1D4ED8" />
    </svg>
  );
}

function SocialPlatformCluster({ className = "", ...props }) {
  return (
    <span className={`relative block size-8 ${className}`} {...props}>
      <span className="absolute left-0 top-0 flex size-5 items-center justify-center rounded-full bg-[#005BFF] text-white ring-2 ring-white dark:ring-[#07111F]">
        <FacebookLogo className="size-3" aria-hidden="true" />
      </span>
      <span className="absolute bottom-0 left-1 flex size-5 items-center justify-center rounded-full bg-[#0077B5] text-white ring-2 ring-white dark:ring-[#07111F]">
        <LinkedInLogo className="size-3" aria-hidden="true" />
      </span>
      <span className="absolute bottom-1 right-0 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white ring-2 ring-white dark:ring-[#07111F]">
        <InstagramLogo className="size-3" aria-hidden="true" />
      </span>
    </span>
  );
}

function SocialGrowthCard({ className = "" }) {
  const channels = [
    {
      label: "Instagram",
      value: "12.4K",
      change: "+18.7%",
      color: "from-pink-500 to-orange-400",
      icon: InstagramLogo,
    },
    {
      label: "Facebook",
      value: "8.7K",
      change: "+12.3%",
      color: "from-[#005BFF] to-[#12B7FF]",
      icon: FacebookLogo,
    },
    {
      label: "LinkedIn",
      value: "5.2K",
      change: "+9.1%",
      color: "from-[#0077B5] to-[#12B7FF]",
      icon: LinkedInLogo,
    },
  ];

  return (
    <div
      className={`rounded-2xl border border-[#005BFF]/10 bg-white/86 p-4 shadow-[0_24px_58px_rgba(0,91,255,0.14)] backdrop-blur-xl dark:border-[#12B7FF]/18 dark:bg-[#07111F]/82 dark:shadow-[#12B7FF]/12 ${className}`}
    >
      <p className="text-xs font-bold text-foreground">Social Media Growth</p>
      <div className="mt-3 divide-y divide-[#07111F]/8 dark:divide-white/10">
        {channels.map((channel) => {
          const ChannelIcon = channel.icon;

          return (
            <div
              key={channel.label}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5"
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${channel.color} text-white`}
                aria-label={channel.label}
              >
                <ChannelIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-foreground">
                {channel.value}
              </span>
              <span className="text-xs font-bold text-emerald-500">
                {channel.change}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#07111F]/8 pt-3 text-[0.68rem] dark:border-white/10">
        <span className="font-medium text-muted-foreground">
          Total Followers
        </span>
        <span className="font-bold text-foreground">
          26.3K <span className="text-emerald-500">+15.8%</span>
        </span>
      </div>
    </div>
  );
}

function DigitalMarketingHero({ service }) {
  return (
    <section
      aria-label={`${service.title} hero section`}
      className="relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/16 via-background/2 to-background/84 dark:from-background/22 dark:via-background/8 dark:to-background/90" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="web-hero-copy-enter max-w-3xl">
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-[2.35rem]">
              <span
                className="animate-hero-heading-word block opacity-0"
                style={{ animationDelay: "120ms" }}
              >
                Digital Marketing
              </span>
              <span
                className="animate-hero-heading-word block opacity-0"
                style={{ animationDelay: "260ms" }}
              >
                That Drives
              </span>
              <span
                className="animate-hero-heading-word hero-heading-accent block opacity-0"
                style={{ animationDelay: "400ms" }}
              >
                Real Growth
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-md">
              Data-driven strategies. Creative campaigns. Measurable results. We
              help brands attract, engage, and convert the right audience into
              loyal customers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/contact">
                  Get a Free Strategy Call
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md border-[#005BFF]/45 bg-background/70 px-6 text-[#005BFF] backdrop-blur hover:-translate-y-0.5 dark:border-[#12B7FF]/40 dark:text-[#12B7FF]"
              >
                <Link href="/media-center">
                  See Our Results
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="web-hero-image-enter relative mx-auto w-full max-w-[58rem]">
            <div className="absolute inset-x-10 bottom-6 h-14 rounded-full bg-[#005BFF]/22 blur-2xl dark:bg-[#12B7FF]/24" />
            <Image
              src="/images/digital-marketing hero_v2.png.png"
              alt="Marketing strategist reviewing digital campaign performance on a laptop"
              width={1280}
              height={900}
              priority
              quality={85}
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(0,91,255,0.18)] dark:drop-shadow-[0_28px_50px_rgba(18,183,255,0.18)]"
              sizes="(min-width: 1280px) 54rem, (min-width: 1024px) 50vw, 100vw"
            />
            <SocialGrowthCard className="mt-5 lg:absolute lg:left-2 lg:top-[8%] lg:z-20 lg:mt-0 lg:w-[14rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

const digitalMarketingServiceCards = [
  {
    title: "SEO Strategy",
    description:
      "Improve visibility, search rankings, and long-term organic growth.",
    icon: SearchCheck,
  },
  {
    title: "Social Media Marketing",
    description:
      "Build brand awareness and engage your audience across key platforms.",
    icon: Share2,
  },
  {
    title: "Paid Advertising",
    description:
      "Launch targeted campaigns that drive qualified traffic and measurable ROI.",
    icon: Target,
  },
  {
    title: "Content Marketing",
    description:
      "Create compelling content that educates, attracts, and converts.",
    icon: PenTool,
  },
  {
    title: "Email Marketing",
    description:
      "Nurture leads and retain customers through smart email journeys.",
    icon: Mail,
  },
  {
    title: "Analytics & Reporting",
    description:
      "Track performance, uncover insights, and optimize every campaign.",
    icon: Gauge,
  },
];

const digitalMarketingProcessSteps = [
  {
    title: "Discover",
    description: "We learn about your business, goals, and target audience.",
    icon: SearchCheck,
  },
  {
    title: "Research",
    description: "We analyze your market, competitors, and opportunities.",
    icon: FileSearch,
  },
  {
    title: "Strategy",
    description: "We build a data-driven strategy tailored to your goals.",
    icon: Target,
  },
  {
    title: "Launch",
    description: "We execute campaigns across the right channels.",
    icon: Rocket,
  },
  {
    title: "Optimize",
    description: "We monitor, analyze, and optimize for better results.",
    icon: BarChart3,
  },
];

const digitalMarketingTools = [
  { name: "Google Ads", logo: GoogleAdsLogo },
  { name: "Meta Ads", logo: MetaAdsLogo },
  { name: "Google Analytics 4", logo: GoogleAnalyticsLogo },
  { name: "Google Search Console", logo: SearchConsoleLogo },
  { name: "HubSpot", logo: HubSpotLogo },
  { name: "Mailchimp", logo: MailchimpLogo },
  { name: "Canva", logo: CanvaLogo },
  { name: "Ahrefs", logo: AhrefsLogo },
];

const digitalMarketingPricingPlans = [
  {
    name: "Starter",
    subtitle: "For small businesses just getting started",
    price: "$199",
    icon: Rocket,
    noteIcon: Sparkles,
    note: "Perfect for startups & local businesses.",
    features: [
      "Social Media Management",
      "8 Posts per Month",
      "Basic SEO (On-Page)",
      "Google Business Profile Setup",
      "Monthly Performance Report",
      "Email Support",
    ],
  },
  {
    name: "Growth",
    subtitle: "For businesses ready to grow faster",
    price: "$399",
    icon: BarChart3,
    noteIcon: Target,
    popular: true,
    note: "Best value for growing businesses.",
    features: [
      "Everything in Starter",
      "Social Media (12 Posts per Month)",
      "Advanced SEO (On-Page + Technical)",
      "Google Ads Management ($300 Ad Spend)",
      "Content Creation (2 Blog Posts)",
      "Monthly Strategy Call",
      "Detailed Performance Report",
    ],
  },
  {
    name: "Pro",
    subtitle: "For businesses that want maximum results",
    price: "$799",
    icon: Trophy,
    noteIcon: Rocket,
    note: "For businesses serious about scaling.",
    features: [
      "Everything in Growth",
      "Social Media (20+ Posts per Month)",
      "Advanced SEO (Full Strategy)",
      "Google Ads Management ($800 Ad Spend)",
      "Content Creation (4 Blog Posts + Videos)",
      "Conversion Rate Optimization",
      "Dedicated Account Manager",
      "Weekly Performance Reports",
    ],
  },
];

const digitalMarketingCtaHighlights = [
  {
    title: "Growth audit",
    description: "Find quick wins",
    icon: SearchCheck,
  },
  {
    title: "Campaign roadmap",
    description: "Clear next steps",
    icon: Target,
  },
  {
    title: "Measured reporting",
    description: "Know what works",
    icon: BarChart3,
  },
];

const digitalMarketingCtaTrustPoints = [
  "No pressure",
  "Clear strategy",
  "Practical growth plan",
];

function DigitalMarketingServicesSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Digital Marketing Services
              <span className="block">Built for Growth</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              We combine strategy, creativity, data, and technology to help
              brands attract, engage, and convert the right audience.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {digitalMarketingServiceCards.map((card, index) => {
            const Icon = card.icon;
            const isRightColumnCard = index === 2 || index === 5;

            return (
              <ScrollReveal key={card.title} delay={80 + index * 60}>
                <article
                  className={`group flex min-h-56 flex-col border border-[#005BFF]/10 bg-white/82 p-6 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12 ${
                    isRightColumnCard ? "lg:rounded-tr-[5.5rem]" : ""
                  }`}
                >
                  {Icon ? (
                    <span className="flex size-10 items-center justify-center text-[#005BFF] dark:text-[#12B7FF]">
                      <Icon
                        className="size-8 stroke-[1.35]"
                        aria-hidden="true"
                      />
                    </span>
                  ) : null}
                  <h3
                    className={`text-base font-semibold leading-6 text-foreground ${
                      Icon ? "mt-8" : "mt-0"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {card.description}
                  </p>
                  <Link
                    href="/contact"
                    aria-label={`Learn more about ${card.title}`}
                    className="mt-auto flex size-9 items-center justify-center rounded-full border border-[#005BFF]/18 text-[#005BFF] transition-all duration-300 hover:border-[#005BFF] hover:bg-[#005BFF] hover:text-white dark:border-[#12B7FF]/22 dark:text-[#12B7FF] dark:hover:border-[#12B7FF] dark:hover:bg-[#12B7FF] dark:hover:text-[#07111F]"
                  >
                    <ArrowRight
                      className="size-4 -rotate-45"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingProcessSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute left-0 top-0 -z-10 h-56 w-72 bg-[radial-gradient(circle_at_left,rgba(0,91,255,0.06),transparent_68%)]" />
      <div className="absolute right-0 top-0 -z-10 h-56 w-72 bg-[radial-gradient(circle_at_right,rgba(18,183,255,0.06),transparent_68%)]" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Our Process
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              How We Work
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              A proven 5-step process to deliver consistent results.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <div className="absolute left-[10%] right-[10%] top-[4.9rem] hidden h-px bg-[#005BFF]/45 lg:block" />
          {digitalMarketingProcessSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <ScrollReveal key={step.title} delay={90 + index * 90}>
                <article className="relative flex h-full flex-col items-center text-center">
                  <span className="absolute top-0 z-20 flex size-8 items-center justify-center rounded-full bg-[#005BFF] text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,91,255,0.24)]">
                    {index + 1}
                  </span>
                  <div className="relative mt-4 flex size-32 items-center justify-center rounded-full border border-[#005BFF]/18 bg-white/78 shadow-[0_18px_42px_rgba(0,91,255,0.09)] backdrop-blur-xl dark:border-[#12B7FF]/18 dark:bg-[#07111F]/78 dark:shadow-black/20">
                    <span className="absolute inset-2 rounded-full border border-dashed border-[#005BFF]/32 dark:border-[#12B7FF]/34" />
                    <span className="flex size-20 items-center justify-center rounded-full bg-white text-[#005BFF] shadow-[inset_0_0_0_1px_rgba(0,91,255,0.08),0_10px_28px_rgba(0,91,255,0.08)] dark:bg-[#0B1830] dark:text-[#12B7FF]">
                      <Icon
                        className="size-10 stroke-[1.7]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-44 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingToolsSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Tools & Platforms We Use
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Trusted Tools. Proven Results.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {digitalMarketingTools.map((tool, index) => {
            const Logo = tool.logo;

            return (
              <ScrollReveal key={tool.name} delay={70 + index * 55}>
                <div
                  className="animate-hero-card-enter group flex min-h-32 flex-col items-center justify-center rounded-xl border border-[#005BFF]/12 bg-white/78 p-4 text-center shadow-xl shadow-[#005BFF]/7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-2xl hover:shadow-[#12B7FF]/18 dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <Logo
                    className="size-11 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm font-semibold leading-5 text-foreground">
                    {tool.name}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DigitalMarketingPricingSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute right-10 top-8 -z-10 hidden grid-cols-8 gap-2 opacity-30 lg:grid">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index} className="size-1 rounded-full bg-[#005BFF]/28" />
        ))}
      </div>

      {/* Header and cards mirror the web development pricing section, so the
          two service pages read as one system. */}
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-sky-500" />
              <span className="text-sm font-semibold tracking-[0.3em] text-sky-500">
                PRICING
              </span>
            </div>

            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              Affordable pricing,
              <br />
              <span className="font-heading italic text-sky-500">
                real results.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:leading-8">
              Simple, transparent plans designed to fit your business and
              deliver measurable growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-sm gap-5 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {digitalMarketingPricingPlans.map((plan, index) => {
            const NoteIcon = plan.noteIcon;

            return (
              <ScrollReveal key={plan.name} delay={100 + index * 100}>
                <article
                  className={`group relative flex h-full flex-col rounded-[1.25rem] border bg-white p-5 shadow-[0_18px_50px_rgba(7,24,216,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/45 hover:shadow-[0_28px_64px_rgba(18,183,255,0.18)] dark:bg-[#0B1830] dark:shadow-black/20 dark:hover:shadow-[#12B7FF]/12 sm:p-6 ${
                    plan.popular
                      ? "border-[#12B7FF]/65 ring-1 ring-[#12B7FF]/20"
                      : "border-[#005BFF]/12 dark:border-[#12B7FF]/14"
                  }`}
                >
                  {plan.popular ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#005BFF] to-[#12B7FF] px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#12B7FF]/25">
                      Most Popular
                    </span>
                  ) : null}

                  <h3 className="font-serif text-xl text-foreground">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {plan.subtitle}
                  </p>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="font-serif text-3xl text-foreground sm:text-4xl">
                      {plan.price}
                    </span>
                    <span className="pb-1.5 text-xs text-muted-foreground">
                      /month
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
                      >
                        <Check
                          size={16}
                          className="mt-1 shrink-0 text-sky-500"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <Button
                      asChild
                      className="h-auto w-full rounded-md border border-[#005BFF]/20 bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-none transition-all duration-300 hover:border-[#12B7FF] hover:bg-gradient-to-r hover:from-[#005BFF] hover:to-[#12B7FF] hover:text-white hover:shadow-lg hover:shadow-[#12B7FF]/25 dark:border-[#12B7FF]/25 dark:bg-[#07111F] dark:hover:border-[#12B7FF]"
                    >
                      <Link href="/book-appointment">Get Started</Link>
                    </Button>

                    <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                      <NoteIcon
                        className="size-3.5 shrink-0 text-sky-500"
                        aria-hidden="true"
                      />
                      {plan.note}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// No panel, matching the web development page: the closing pitch sits directly
// on the page with a hairline rule carrying the supporting points beneath it.
function DigitalMarketingFinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
            Start with clarity
          </p>

          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
            Ready to turn attention into
            <span
              className="hero-heading-accent block"
              style={{ textShadow: "none" }}
            >
              measurable growth?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Tell us what you want to improve. We&apos;ll help shape the right
            strategy, channels, content, and reporting plan for your next stage
            of growth.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-md bg-[#005BFF] px-8 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004FE0]"
            >
              <Link href="/book-appointment">
                Book a strategy call
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>

            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-[#12B7FF]" aria-hidden="true" />
              Response within 24 hours
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {digitalMarketingCtaTrustPoints.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-4 text-[#12B7FF]"
                  aria-hidden="true"
                />
                {point}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-5xl border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-3">
          {digitalMarketingCtaHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                delay={120 + index * 120}
                className="flex flex-col items-center border-b border-[#005BFF]/12 px-6 py-8 text-center last:border-b-0 dark:border-[#12B7FF]/14 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <Icon
                  className="size-6 stroke-[1.6] text-[#005BFF] dark:text-[#12B7FF]"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// `projects` comes from the route: this page places the portfolio itself
// (above the CTA), so the slug is listed in SLUGS_WITH_INLINE_PORTFOLIO and the
// route no longer appends one after the page.
export default function DigitalMarketingPage({ service, projects }) {
  return (
    <main className="flex-1">
      <DigitalMarketingHero service={service} />
      <DigitalMarketingServicesSection />
      <DigitalMarketingProcessSection />
      <DigitalMarketingToolsSection />
      <DigitalMarketingPricingSection />
      <ServicePortfolioSection service={service} projects={projects} />
      <DigitalMarketingFinalCTA />
    </main>
  );
}
