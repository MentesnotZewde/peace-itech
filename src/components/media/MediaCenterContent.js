"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = ["All", "News", "Events", "Company Updates", "Insights"];

const postImages = [
  "/images/about us banner.png",
  "/images/company-story-3.png",
  "/images/digital-marketing hero.png",
  "/images/contact banner.png",
  "/images/automation-hero-v3.png",
  "/images/company-story-2.png",
];

const normalizedCategory = (category) => {
  if (["Technology Insights", "AI", "Blogs"].includes(category)) {
    return "Insights";
  }

  return category;
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Published items from the database. Nothing is invented here: if the list is
// empty the page says so, rather than showing samples that lead nowhere.
const toDisplayPosts = (items) =>
  (items || []).map((item, index) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    featured: item.featured,
    date: formatDate(item.date) || formatDate(item.createdAt),
    displayCategory: normalizedCategory(item.category),
    image: item.image || postImages[index % postImages.length],
  }));

// Counts come from the database, so the banner tracks what is actually
// published instead of a number someone has to remember to update.
const toDisplayStats = (stats) => [
  {
    value: stats?.published ?? 0,
    label: "Published articles",
    Icon: Newspaper,
  },
  { value: stats?.updates ?? 0, label: "Events & updates", Icon: CalendarDays },
  { value: stats?.topics ?? 0, label: "Topics covered", Icon: TrendingUp },
];

function PostLink({ id, className, children }) {
  if (!id) return <article className={className}>{children}</article>;

  return (
    <Link href={`/media-center/${id}`} className={`block ${className}`}>
      {children}
    </Link>
  );
}

export default function MediaCenterContent({ items, stats }) {
  const [category, setCategory] = useState("All");
  const posts = useMemo(() => toDisplayPosts(items), [items]);
  const mediaStats = useMemo(() => toDisplayStats(stats), [stats]);

  const visiblePosts =
    category === "All"
      ? posts
      : posts.filter((post) => post.displayCategory === category);
  const mainPosts = visiblePosts.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="flex-1">
      <section className="px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Media Center
            </p>
            <h1 className="mt-3 text-3xl font-semibold font-heading leading-tight tracking-normal text-foreground sm:text-3xl">
              Stay informed with Peace iTech insights, news, and events.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl  leading-7 text-muted-foreground">
              Explore company updates, practical technology ideas, event notes,
              and growth stories from our team.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`h-10 rounded-[0.65rem] px-7 text-sm font-semibold transition ${
                    category === item
                      ? "bg-[#005BFF] text-white shadow-[0_14px_30px_rgba(0,91,255,0.22)]"
                      : "bg-white/78 text-foreground shadow-[0_10px_28px_rgba(0,91,255,0.05)] hover:bg-[#005BFF]/8 dark:bg-[#0B1830]/72 dark:hover:bg-[#12B7FF]/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_19rem]">
            <div className="grid gap-5 md:grid-cols-3">
              {mainPosts.length === 0 && (
                <div className="md:col-span-3 rounded-[0.85rem] border border-dashed border-[#005BFF]/20 bg-white/70 p-10 text-center dark:border-[#12B7FF]/20 dark:bg-[#0B1830]/60">
                  <p className="text-base font-medium text-foreground">
                    {posts.length === 0
                      ? "No articles published yet."
                      : "No articles in this category yet."}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check back soon for news, events, and insights from our
                    team.
                  </p>
                </div>
              )}
              {mainPosts.map((post, index) => (
                <ScrollReveal key={post.id || post.title} delay={index * 0.05}>
                  <PostLink
                    id={post.id}
                    className="group overflow-hidden rounded-[0.85rem] border border-[#005BFF]/12 bg-white/88 shadow-[0_16px_42px_rgba(0,91,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#005BFF]/32 hover:shadow-[0_24px_58px_rgba(0,91,255,0.13)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74 dark:hover:border-[#12B7FF]/34"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 90vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.02),rgba(2,8,23,0.22))]" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#005BFF] dark:text-[#12B7FF]">
                        {post.displayCategory}
                      </p>
                      <h2 className="mt-3 min-h-[3.25rem] text-base font-semibold leading-7 text-foreground">
                        {post.title}
                      </h2>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                          {post.date}
                        </p>
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#005BFF]/24 text-[#005BFF] transition group-hover:bg-[#005BFF] group-hover:text-white dark:border-[#12B7FF]/28 dark:text-[#12B7FF]"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </PostLink>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal
              delay={0.12}
              className={latestPosts.length ? "" : "hidden"}
            >
              <aside className="rounded-[0.85rem] border border-[#005BFF]/10 bg-white/88 p-5 shadow-[0_18px_48px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-7 w-1 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Latest Updates
                  </h2>
                </div>
                <div className="space-y-4">
                  {latestPosts.map((post) => (
                    <PostLink
                      key={post.id || post.title}
                      id={post.id}
                      className="flex gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.45rem]">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="4rem"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {post.date}
                        </p>
                      </div>
                    </PostLink>
                  ))}
                </div>
                <Link
                  href="/media-center"
                  className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[0.65rem] bg-[#005BFF] text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,91,255,0.22)] transition hover:bg-[#004FE0]"
                >
                  View All News
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.14}>
            <div className="mt-8 grid gap-4 rounded-[1rem] border border-[#005BFF]/10 bg-white/76 p-4 shadow-[0_16px_44px_rgba(0,91,255,0.06)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/68 sm:grid-cols-3">
              {mediaStats.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005BFF]/9 text-[#005BFF] dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      {value}
                    </p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
