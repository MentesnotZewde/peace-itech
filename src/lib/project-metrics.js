// Derived numbers for the dashboard. Everything here is computed from the
// same project rows the tables render, so the tiles, the chart, and the table
// can never disagree.

export const MONTHS_SHOWN = 8;

function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Projects bucketed by the month they started, oldest first, always exactly
 * `months` buckets ending with the current month.
 */
export function monthlyProjectCounts(projects, months = MONTHS_SHOWN, now = new Date()) {
  const buckets = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: monthKey(date),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      projects: 0,
    });
  }

  const index = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  for (const project of projects) {
    const started = parseDate(project.createdAt);
    if (!started) continue;
    const bucket = index.get(monthKey(started));
    if (bucket) bucket.projects += 1;
  }

  return buckets;
}

export function startedInMonth(projects, monthsAgo, now = new Date()) {
  const target = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);

  return projects.filter((project) => {
    const started = parseDate(project.createdAt);
    return started && monthKey(started) === monthKey(target);
  }).length;
}

function customerOf(project) {
  return project.company || project.name || null;
}

export function projectStats(projects, now = new Date()) {
  const completed = projects.filter(
    (p) => p.projectstatus === "Completed",
  ).length;

  const activeCustomers = new Set(
    projects
      .filter((p) => p.projectstatus !== "Completed")
      .map(customerOf)
      .filter(Boolean),
  ).size;

  const totalCustomers = new Set(projects.map(customerOf).filter(Boolean)).size;

  const thisMonth = startedInMonth(projects, 0, now);
  const lastMonth = startedInMonth(projects, 1, now);

  return {
    total: projects.length,
    completed,
    completionRate: projects.length
      ? Math.round((completed / projects.length) * 100)
      : 0,
    activeCustomers,
    totalCustomers,
    startedThisMonth: thisMonth,
    startedLastMonth: lastMonth,
    trend: thisMonth >= lastMonth ? "up" : "down",
  };
}

/** Most recently touched projects — what "activity" means on the overview. */
export function recentProjects(projects, limit = 4) {
  return [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt),
    )
    .slice(0, limit);
}
