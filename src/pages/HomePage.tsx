import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="w-full">
      <Helmet>
        <title>PyMaster | Learn Python with Projects, Articles, and Practice</title>
        <meta
          name="description"
          content="PyMaster is a project-based Python learning platform. Read in-depth articles, practice with lessons and challenges, and understand how the platform is built."
        />
        <link rel="canonical" href={`${siteConfig.url}/`} />
      </Helmet>

      <header className="border-b border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary">Project-based Python learning</p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Learn Python by building real things, not by memorizing syntax
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-muted-foreground">
            PyMaster is my attempt to make Python learning practical and repeatable. Instead of treating programming as a list of rules, the site
            is organized around outcomes: writing code that runs, solving problems that feel like real tasks, and learning the habits that help you
            debug and improve your projects over time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Read the Blog
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors"
            >
              Explore the Project
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <section className="grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">What PyMaster is</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              PyMaster is a Python learning platform built as a real web product. It includes structured lessons, a practice problem bank, and a
              browser-based Python runner. But the most important part is that it is also a content website: it has long-form articles and
              documentation-style pages that explain the purpose of the platform, how features work, and how you can use them to build your own
              skills.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              If you are evaluating whether this is “just an app”, start with the{" "}
              <Link to="/blog" className="text-primary hover:underline">
                Blog
              </Link>{" "}
              and{" "}
              <Link to="/projects" className="text-primary hover:underline">
                Projects
              </Link>{" "}
              pages. Those are written to be useful even if you never sign in.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">Who it helps</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              PyMaster is designed for three kinds of learners. First, complete beginners who want explanations that feel grounded and not
              intimidating. Second, self-taught developers who can write code but struggle to structure projects, test reliably, and debug quickly.
              Third, job-seekers who need consistent practice and a portfolio story they can explain in interviews.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              For beginners, the lessons aim to reduce confusion and increase confidence. For intermediates, the problems and projects focus on
              pattern recognition and clean reasoning. For job-seekers, the site encourages daily practice and provides a roadmap to keep progress
              measurable.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">How to use the site</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A simple path is: read one article, practice one concept, then apply it in a tiny project. For example, read a debugging guide,
              solve two small problems, and then write a CLI script that logs its behavior. This loop is how you turn knowledge into skill.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              If you want a ready starting point, begin with{" "}
              <Link to="/blog/python-debugging-playbook" className="text-primary hover:underline">
                A Practical Python Debugging Playbook
              </Link>
              , then open the{" "}
              <Link to="/compiler" className="text-primary hover:underline">
                Compiler
              </Link>{" "}
              and intentionally break a small program to see errors and logs in action.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-foreground">The purpose of PyMaster (and why it’s content-first)</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Many coding sites look impressive but feel empty: they show a dashboard, a few cards, and a big “Start” button, yet they don’t
              explain what you are actually going to learn, why the content is trustworthy, or how the platform fits into a real learning plan. A
              content-first site solves that problem. It leads with useful text, clear navigation, and pages that can be read without waiting for
              API calls or sign-in flows.
            </p>
            <p>
              PyMaster is built with that approach because it respects your time. When you land on the site, you should immediately see meaningful
              publisher content: explanations, guides, and links that help you decide what to do next. Interactive tools like the compiler, problem
              bank, and progress tracking are valuable, but they should enhance the experience—not hide the content behind loaders or blank screens.
            </p>
            <p>
              This philosophy also matters for discoverability. Search engines and publisher review systems expect to find real pages, not just an
              empty application shell. That’s why PyMaster includes long-form articles and structured pages like{" "}
              <Link to="/about" className="text-primary hover:underline">
                About
              </Link>{" "}
              and{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              , along with internal linking between topics. The result is a website that is useful to humans and understandable to crawlers.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">Benefits you should expect</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground list-disc pl-5">
              <li>Clear mental models: not just “what to type”, but “why it works”.</li>
              <li>Repeatable practice: small daily progress instead of random bursts.</li>
              <li>Debugging confidence: errors become signals, not panic moments.</li>
              <li>Project thinking: organizing code, validating inputs, and writing tests.</li>
              <li>Interview readiness: you can explain what you built and what you learned.</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              If you want a concrete example of “project thinking”, read{" "}
              <Link to="/blog/python-scripts-to-reliable-tools" className="text-primary hover:underline">
                From Python Scripts to Reliable Tools
              </Link>{" "}
              and apply the checklist to a small utility you use every week.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">What you can do today</h2>
            <ol className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground list-decimal pl-5">
              <li>
                Read one article from the <Link to="/blog" className="text-primary hover:underline">Blog</Link> and take notes in your own words.
              </li>
              <li>
                Practice the idea using the <Link to="/compiler" className="text-primary hover:underline">Compiler</Link> (small code is best).
              </li>
              <li>
                Solve 1–3 problems from <Link to="/problems" className="text-primary hover:underline">Problems</Link> to reinforce the concept.
              </li>
              <li>
                Read <Link to="/projects" className="text-primary hover:underline">Projects</Link> to understand how this platform is designed.
              </li>
            </ol>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              If you have questions, feedback, or partnership ideas, use the{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact
              </Link>{" "}
              page. I read messages and use them to decide what content to write next.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-gradient-to-br from-background via-background to-primary/10 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-foreground">Trust, privacy, and what PyMaster is not</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              PyMaster is an educational platform. It is not a promise of employment, and it is not a “get rich quick” tool. The purpose is to
              help you learn Python skills you can apply in school, at work, or in personal projects. When you build a consistent learning habit,
              the results compound over time.
            </p>
            <p>
              When you use interactive tools, some features rely on a backend (for example, authentication and profile syncing). But the core pages
              you’re reading right now are designed to render instantly without waiting for API calls. That keeps the website accessible, fast, and
              friendly to both humans and search engines.
            </p>
            <p>
              For policy and transparency, you can read the{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . If you want a deeper technical overview of how the site runs Python in the browser, open{" "}
              <Link to="/projects" className="text-primary hover:underline">
                Projects
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

