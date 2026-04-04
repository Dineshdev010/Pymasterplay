import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const canonical = "https://pymaster.pro/python-learning-for-beginners";

export default function PythonLearningBeginnersPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <Helmet>
        <title>Python Learning For Beginners (Free) | PyMaster</title>
        <meta
          name="description"
          content="Start Python learning for beginners with clear lessons, practice problems, DSA basics, and a built-in compiler. Free and beginner-friendly."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="Python Learning For Beginners (Free) | PyMaster" />
        <meta
          property="og:description"
          content="A beginner-friendly Python roadmap: basics, hands-on practice, DSA intro, and daily learning plan."
        />
        <meta property="og:image" content="https://pymaster.pro/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Python Learning For Beginners (Free) | PyMaster" />
        <meta
          name="twitter:description"
          content="A beginner-friendly Python roadmap with lessons, practice problems, and a built-in compiler."
        />
        <meta name="twitter:image" content="https://pymaster.pro/og-image.png" />
      </Helmet>

      <article className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Python Learning For Beginners
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            If you are starting from zero, this page gives you a simple, practical plan to learn Python without
            confusion.
          </p>
        </header>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Step 1: Learn Core Basics</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start with variables, data types, conditions, loops, and functions. Focus on writing and running code
            every day, even for 20 minutes.
          </p>
          <Link to="/learn" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            Start beginner lessons
          </Link>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Step 2: Practice Small Problems</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Solve beginner-friendly problems to build confidence. Consistency matters more than speed in the first
            month.
          </p>
          <Link to="/problems" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            Practice Python problems
          </Link>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Step 3: Use The Built-In Compiler</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Test your ideas quickly, change code, and learn from output. Hands-on execution is the fastest way to
            improve.
          </p>
          <Link to="/compiler" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            Open Python compiler
          </Link>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Step 4: Begin DSA Slowly</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Once basics feel easy, start arrays, strings, and hash maps. You do not need advanced DSA on day one.
          </p>
          <Link to="/dsa" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            Learn DSA basics in Python
          </Link>
        </section>

        <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
          <h2 className="text-xl font-semibold text-foreground">Simple Daily Plan (30 Minutes)</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>10 min: Read one clear concept.</li>
            <li>10 min: Run and edit sample code.</li>
            <li>10 min: Solve one small practice problem.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
