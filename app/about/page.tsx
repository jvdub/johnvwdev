import Image from "next/image";
import {
  generatePersonSchema,
  generateBreadcrumbSchema,
  JsonLd,
} from "../../lib/json-ld";
import { SITE_URL } from "../../lib/site";

export default function About() {
  const personSchema = generatePersonSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About" },
  ]);

  return (
    <>
      <JsonLd data={personSchema} id="person-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-about" />
      <div className="flex flex-col gap-8">
        <section
          aria-label="About"
          className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="leading-tight">About</h1>
              <p className="mt-4 text-lg text-fg-muted">
                Senior Software Engineer & Technical Leader Specializing in the
                transition from traditional Full-Stack to AI-integrated systems.
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
              I'm a software engineer and leader with 10+ years of experience
              across the stack. My background is a mix of high-level product
              engineering and deep technical foundations, including an M.S. in
              Computer Science with an AI specialization (2018).
            </p>
            <p className="mt-4 text-fg-muted">
              I've spent my career moving between the layers that matter most
              for the next decade of software:
            </p>
            <p className="mt-4 text-fg-muted">
              <strong>The Data Layer:</strong> Experience building ETL
              pipelines, understanding that AI is only as effective as the data
              architecture supporting it.
            </p>
            <p className="mt-4 text-fg-muted">
              <strong>The Interface:</strong> Years of focused frontend work,
              ensuring that complex technical capabilities remain intuitive for
              the end user.
            </p>
            <p className="mt-4 text-fg-muted">
              <strong>The People:</strong> A history of team leadership and
              teaching, focused on engineering hygiene and pragmatic adoption of
              new tools.
            </p>
            <p className="mt-4 text-fg-muted">
              My approach to AI is grounded in reality. While the industry
              focuses on the 'hype,' I focus on the integration: how to
              realistically move a product from deterministic logic to
              probabilistic models without sacrificing reliability. I'm
              interested in the hard work of preparing data environments and
              building the 'connective tissue' between legacy systems and modern
              AI workflows.
            </p>

            <hr className="my-6 border-border" />

            <p className="mt-4 text-fg-muted">
              <strong>Education:</strong> M.S. in Computer Science (Georgia
              Tech) and B.S. in Computer Science and Business (Utah State
              University).
            </p>
          </div>
        </section>

        <section
          aria-label="Now"
          className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
        >
          <h2>Now</h2>
          <p className="mt-3 max-w-3xl text-fg-muted">
            Currently, I'm focused on the practical incorporation of AI into
            enterprise software. This means identifying high-value, 'simple' AI
            wins while simultaneously doing the foundational data work required
            for more complex implementations.
          </p>
          <p className="mt-4 max-w-3xl text-fg-muted">
            I'm working on tightening feedback loops for my teams—using AI to
            assist in planning, documentation, and testing—while ensuring our
            core systems remain maintainable and well-architected as we evolve.
          </p>
        </section>
      </div>
    </>
  );
}
