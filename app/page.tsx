import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section
        aria-label="Intro"
        className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="leading-tight">
              <span className="text-xl font-semibold text-fg-muted sm:text-2xl">
                Hi, I’m
              </span>{" "}
              John Van Wagenen
            </h1>
            <p className="mt-4 text-lg text-fg-muted">
              I build software and write about what I’m learning—engineering
              notes, patterns, and occasional project updates.
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src="/jvw_headshot.jpg"
              alt="Headshot of John Van Wagenen"
              width={112}
              height={112}
              sizes="(min-width: 640px) 112px, 96px"
              className="h-24 w-24 rounded-full border border-border bg-surface2 object-cover shadow-elev sm:h-28 sm:w-28"
              priority
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Read the blog
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Browse projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Contact
          </Link>
        </div>
      </section>

      <section
        aria-label="Quick links"
        className="grid w-full gap-4 sm:grid-cols-2"
      >
        <Link
          href="/blog"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <h2 className="text-xl font-semibold tracking-tight">Blog</h2>
          <p className="mt-2 text-fg-muted">
            Writing-first notes and posts, newest first.
          </p>
          <p className="mt-3 text-sm text-fg-muted">Go to /blog →</p>
        </Link>

        <Link
          href="/projects"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-fg-muted">
            A short list of things I’ve built (placeholders for now).
          </p>
          <p className="mt-3 text-sm text-fg-muted">Go to /projects →</p>
        </Link>
      </section>

      <section
        aria-label="Writing and consulting"
        className="grid w-full gap-4 lg:grid-cols-2"
      >
        <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2>Writing</h2>
            <Link href="/blog" className="text-sm">
              See all →
            </Link>
          </div>
          <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
          <p className="mt-4 text-fg-muted">
            A blog-first space for pragmatic notes, project write-ups, and
            occasional deep dives.
          </p>

          <ul className="mt-6 grid gap-3" aria-label="Recent articles">
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Coming soon
              </p>
              <p className="mt-1 font-medium text-fg">
                Demystifying AI in Engineering
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                A pragmatic look at what AI can and can’t do.
              </p>
            </li>
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Coming soon
              </p>
              <p className="mt-1 font-medium text-fg">
                AI and Software Engineering: More Than Just Coding
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                How AI helps beyond code generation—from design to testing.
              </p>
            </li>
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Coming soon
              </p>
              <p className="mt-1 font-medium text-fg">
                Where AI Falls Short in Production Systems
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Limitations through the lens of senior engineering experience.
              </p>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2>Consulting</h2>
            <Link href="/contact" className="text-sm">
              Get in touch →
            </Link>
          </div>
          <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
          <p className="mt-4 text-fg-muted">
            Available for focused engagements where senior engineering judgment
            and execution speed matter.
          </p>

          <ul className="mt-6 grid gap-3" aria-label="Engagement types">
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Architecture
              </p>
              <p className="mt-1 font-medium text-fg">
                System design &amp; technical direction
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Clear plans, tradeoffs, and pragmatic sequencing.
              </p>
            </li>
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Delivery
              </p>
              <p className="mt-1 font-medium text-fg">
                Feature work &amp; platform improvements
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Shipping production-quality code with ownership.
              </p>
            </li>
            <li className="rounded-md border border-border bg-surface2 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Stability
              </p>
              <p className="mt-1 font-medium text-fg">
                Performance, reliability, and cleanup
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Reduce toil, tighten feedback loops, and improve uptime.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
