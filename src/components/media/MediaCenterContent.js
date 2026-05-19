"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { mediaPosts } from "@/lib/media";

const categories = ["All", "News", "Company Updates", "Events", "Technology Insights", "AI", "Blogs"];
const years = ["All", "2026", "2025"];

export default function MediaCenterContent() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  const featuredPosts = mediaPosts.filter((post) => post.featured);

  // Search/filter logic stays local because this is a small static media center.
  const filteredPosts = mediaPosts.filter((post) => {
    const matchesQuery = `${post.title} ${post.summary}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === "All" || post.category === category;
    const matchesYear = year === "All" || post.year === year;

    return matchesQuery && matchesCategory && matchesYear;
  });

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 -z-10 size-[32rem] rounded-full bg-[#12B7FF]/15 blur-3xl" />
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-muted/40 to-[#EAF8FF]/60 p-6 shadow-2xl shadow-foreground/10 dark:to-[#07111F]/40 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Media Center
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
            Stay informed with Peace iTech insights, news, and events.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore company updates, technology insights, AI ideas,
            cybersecurity guidance, and event coverage from our team.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#12B7FF]/10"
              >
                <div className="h-48 bg-gradient-to-br from-[#005BFF]/20 via-[#12B7FF]/20 to-[#12B7FF]/20 p-5">
                  <div className="h-full rounded-2xl border border-background/50 bg-background/45 backdrop-blur" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {post.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.5rem] border border-border/70 bg-background p-4 shadow-sm">
            {/* Responsive filter bar: stacks on mobile, becomes a toolbar on desktop. */}
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search media center"
                  className="h-12 w-full rounded-full border border-border bg-muted/40 pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-3 focus:ring-ring/30"
                />
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 rounded-full border border-border bg-muted/40 px-4 text-sm outline-none focus:ring-3 focus:ring-ring/30"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="h-12 rounded-full border border-border bg-muted/40 px-4 text-sm outline-none focus:ring-3 focus:ring-ring/30"
              >
                {years.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#005BFF]/10"
              >
                <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {post.summary}
                </p>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-border/70 bg-background p-8 text-center text-sm text-muted-foreground">
              No posts match the current filters.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}


