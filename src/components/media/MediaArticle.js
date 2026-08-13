import Link from "next/link";
import { CalendarDays, Mail } from "lucide-react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CategoryPill({ children }) {
  return (
    <span className="inline-flex rounded-md bg-[#005BFF]/10 px-3 py-1 text-sm font-medium text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
      {children}
    </span>
  );
}

function DateLine({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-muted-foreground ${className}`}
    >
      <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}

// Vertical share rail: fixed beside the article on wide screens, and a plain
// row above it on smaller ones.
function ShareRail({ url, title }) {
  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Icon: FaFacebookF,
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: FaXTwitter,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      Icon: Mail,
    },
  ];

  return (
    <div className="flex gap-3 lg:sticky lg:top-28 lg:flex-col lg:gap-4">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="flex size-11 items-center justify-center rounded-full bg-[#005BFF] text-white shadow-[0_14px_30px_rgba(0,91,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#004FE0] dark:bg-[#12B7FF] dark:hover:bg-[#0FA3E4]"
        >
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function LatestList({ items }) {
  if (!items.length) return null;

  return (
    <aside className="lg:sticky lg:top-28">
      <h2 className="text-sm font-medium text-muted-foreground">
        Latest News &amp; Events
      </h2>

      <div className="mt-5 space-y-6">
        {items.map((item) => (
          <article key={item.id} className="flex gap-4">
            <Link
              href={`/media-center/${item.id}`}
              className="relative block size-20 shrink-0 overflow-hidden rounded-lg bg-muted"
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#005BFF]/12 to-[#12B7FF]/12" />
              )}
            </Link>

            <div className="min-w-0 space-y-2">
              <Link
                href={`/media-center/${item.id}`}
                className="block text-sm font-semibold leading-snug text-foreground transition hover:text-[#005BFF] dark:hover:text-[#12B7FF]"
              >
                {item.title}
              </Link>
              <DateLine className="text-xs">{formatDate(item.date)}</DateLine>
              <div>
                <CategoryPill>{item.category}</CategoryPill>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default function MediaArticle({ item, related, shareUrl }) {
  // Blank lines separate paragraphs; single newlines stay inside one.
  const paragraphs = (item.content || item.summary || "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[3.5rem_minmax(0,1fr)_20rem]">
        <div className="order-2 lg:order-1">
          <ShareRail url={shareUrl} title={item.title} />
        </div>

        <article className="order-1 min-w-0 lg:order-2">
          {item.image && (
            <div className="overflow-hidden rounded-2xl border border-border/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          )}

          <h1 className="mt-10 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {item.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DateLine>{formatDate(item.date) || formatDate(item.createdAt)}</DateLine>
            <CategoryPill>{item.category}</CategoryPill>
          </div>

          <div className="mt-10 space-y-6 text-lg leading-8 text-foreground/90">
            {paragraphs.length ? (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">
                This article has no content yet.
              </p>
            )}
          </div>
        </article>

        <div className="order-3">
          <LatestList items={related} />
        </div>
      </div>
    </main>
  );
}
