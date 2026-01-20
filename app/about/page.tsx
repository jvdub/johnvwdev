import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col gap-8">
      <section
        aria-label="About"
        className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="leading-tight">About</h1>
            <p className="mt-4 text-lg text-fg-muted">
              I’m a senior software engineer and people-focused technical leader
              with 10+ years of experience building, evolving, and operating
              software systems.
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src="/jvw_headshot.jpg"
              alt="Headshot of John Van Wagenen"
              width={112}
              height={112}
              sizes="(min-width: 640px) 112px, 96px"
              className="h-24 w-24 rounded-full border border-border bg-surface-2 object-cover shadow-elev sm:h-28 sm:w-28"
              priority
            />
          </div>
        </div>

        <div className="mt-6 max-w-3xl">
          <p className="text-fg-muted">
            I enjoy working across the stack, from modern frontend (React,
            TypeScript, and contemporary tooling) to backend systems, data, and
            cloud infrastructure. I’m comfortable in greenfield work and equally
            comfortable improving large, long-lived systems.
          </p>
          <p className="mt-4 text-fg-muted">
            My leadership style is pragmatic and collaborative: I care about
            clarity, good engineering hygiene, and helping teams do their best
            work while delivering real business value. I’ve led and mentored
            engineers, partnered closely with product and design, and invested
            in continuous improvement.
          </p>
          <p className="mt-4 text-fg-muted">
            I’m especially interested in how AI can augment software development
            beyond code generation by improving planning, documentation,
            architecture, and decision-making. I also enjoy teaching and
            knowledge-sharing.
          </p>
          <p className="mt-4 text-fg-muted">
            Education: M.S. in Computer Science (Georgia Tech) and B.S. in
            Computer Science and Business (Utah State University).
          </p>
        </div>
      </section>

      <section
        aria-label="Now"
        className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <h2>Now</h2>
        <p className="mt-3 max-w-3xl text-fg-muted">
          Right now, I’m focused on incorporating AI into enterprise software
          while building reliable, maintainable systems and tightening feedback
          loops for teams with better tests, better tooling, and better docs.
          I’m also exploring practical AI-augmented workflows that help
          engineers plan, communicate, and ship with more confidence.
        </p>
      </section>
    </div>
  );
}
