import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Helmet>
        <title>Projects | PyMaster</title>
        <meta
          name="description"
          content="A detailed overview of the PyMaster project: goals, features, architecture, browser-based Python execution, and how the site is designed to be content-first."
        />
        <link rel="canonical" href={`${siteConfig.url}/projects`} />
      </Helmet>

      <header className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Projects</h1>
        <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
          This page explains what PyMaster is building and why. It’s written like project documentation—because a learning platform should be able
          to explain itself clearly. If you want tutorials instead, visit the{" "}
          <Link to="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          .
        </p>
      </header>

      <main className="mt-10 space-y-10">
        <section className="rounded-2xl border border-border bg-card/70 p-6 sm:p-8 space-y-3">
          <h2 className="text-2xl font-extrabold text-foreground">Project: PyMaster (Python learning platform)</h2>
          <p className="text-sm sm:text-base leading-7 text-muted-foreground">
            PyMaster is a project-based learning site built with React + TypeScript and deployed on Vercel. The core idea is simple: combine
            readable content (articles and documentation-style pages) with interactive practice (lessons, problem solving, and a browser-based
            Python runner). Learners shouldn’t have to choose between “reading” and “doing”—they should be able to move between both in one place.
          </p>
          <p className="text-sm sm:text-base leading-7 text-muted-foreground">
            The homepage is intentionally content-first: it renders meaningful text immediately and then enhances the experience with interactive
            features. This avoids the common pitfall of a blank shell that only becomes useful after multiple API calls or a login screen.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/learn"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Lessons
            </Link>
            <Link
              to="/compiler"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors"
            >
              Compiler
            </Link>
            <Link
              to="/problems"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors"
            >
              Problems
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">Key features (what users actually get)</h2>
            <ul className="list-disc pl-5 text-sm sm:text-base leading-7 text-muted-foreground space-y-2">
              <li>Structured lessons for learning Python concepts in a logical order.</li>
              <li>A problem bank to practice and build problem-solving skill.</li>
              <li>A browser-based compiler for experimenting without installing anything.</li>
              <li>Gamified progress tracking (XP, streaks, and lightweight rewards).</li>
              <li>Career support areas like a jobs page and learning tracks.</li>
            </ul>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              The point is not to “gamify” for the sake of it; it’s to keep practice consistent. Consistency is what turns Python from a confusing
              topic into a comfortable skill.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">Content-first UX (why it matters)</h2>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Many web apps show a full-screen loader or a blank page while waiting for JavaScript chunks and API calls. That hurts users, and it
              can confuse crawlers and publisher reviewers. PyMaster avoids that by ensuring key pages have real text content available instantly.
            </p>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Concretely, the public pages like{" "}
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
              ,{" "}
              <Link to="/about" className="text-primary hover:underline">
                About
              </Link>
              , and{" "}
              <Link to="/blog" className="text-primary hover:underline">
                Blog
              </Link>{" "}
              are designed to render meaningful content without waiting for network responses. Interactive pages can still load data later, but the
              site never feels “empty”.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-extrabold text-foreground">Architecture overview</h2>
          <div className="space-y-3 text-sm sm:text-base leading-7 text-muted-foreground">
            <p>
              PyMaster is a Vite + React SPA with a component-driven UI (Tailwind + shadcn/ui). It uses client-side routing for pages, and it’s
              deployed on Vercel with a rewrite rule so deep links like <code className="font-mono">/blog/…</code> work correctly.
            </p>
            <p>
              For authentication and user data, the platform uses Supabase (Auth + Database). Auth-dependent pages are protected, but public pages
              stay readable without requiring sign-in. This separation is important for both user trust and for the “publisher content” expectation
              of ad platforms.
            </p>
            <p>
              The interactive Python runner is implemented using Pyodide in a Web Worker. That means Python execution does not block the main UI
              thread, runaway code can be stopped, and normal practice doesn’t require server-side compute.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">Performance and reliability choices</h2>
            <ul className="list-disc pl-5 text-sm sm:text-base leading-7 text-muted-foreground space-y-2">
              <li>Key content pages are not gated behind loaders or API calls.</li>
              <li>Heavier feature pages can load additional code and data as needed.</li>
              <li>Browser Python execution is isolated in a worker to keep the UI responsive.</li>
              <li>Clear error handling prevents “blank screens” when something fails.</li>
            </ul>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              This approach keeps time-to-content low for humans and prevents the “empty app shell” experience that is commonly flagged during
              publisher reviews.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">Roadmap (what I’m improving next)</h2>
            <ul className="list-disc pl-5 text-sm sm:text-base leading-7 text-muted-foreground space-y-2">
              <li>More long-form articles and “mini-project” walkthroughs on the Blog.</li>
              <li>Better indexing and internal linking between lessons, problems, and articles.</li>
              <li>More beginner-friendly explanations in the first 10 lessons.</li>
              <li>More validation and anti-flake checks for interactive features.</li>
            </ul>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              If you’d like to suggest topics, use{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              . Feedback helps prioritize what gets written and built.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

