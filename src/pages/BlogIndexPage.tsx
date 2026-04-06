import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/config/site";

export default function BlogIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Helmet>
        <title>Blog | PyMaster</title>
        <meta
          name="description"
          content="Read practical Python articles on debugging, clean code, and building reliable tools. Each post includes clear explanations and next steps."
        />
        <link rel="canonical" href={`${siteConfig.url}/blog`} />
      </Helmet>

      <header className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">PyMaster Blog</h1>
        <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
          This blog is written for learners who want practical progress: clear explanations, repeatable workflows, and a bridge from small exercises
          to real projects. Each article is designed to be useful even if you never sign in—because learning should not be locked behind an app
          flow.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          New here? Start with{" "}
          <Link to="/blog/python-debugging-playbook" className="text-primary hover:underline">
            A Practical Python Debugging Playbook
          </Link>{" "}
          or explore how PyMaster itself is built on the{" "}
          <Link to="/projects" className="text-primary hover:underline">
            Projects
          </Link>{" "}
          page.
        </p>
      </header>

      <main className="mt-10">
        <section aria-label="Articles" className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-border bg-card/70 p-6">
              <header>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary">{post.publishedAt}</p>
                <h2 className="mt-2 text-xl font-bold text-foreground">
                  <Link to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.description}</p>
              </header>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-foreground">What you’ll get from these articles</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            <p>
              Each post focuses on one outcome—like writing better CLI tools, debugging without guessing, or modeling data cleanly—then shows the
              thinking behind it. This is deliberate: reading is not the goal, building is. If you apply one idea from each article in a small
              project, you’ll grow faster than by collecting dozens of disconnected tips.
            </p>
            <p>
              If you want to see the “real product” side of PyMaster—how the platform is structured and why the content is designed to render
              immediately—visit{" "}
              <Link to="/projects" className="text-primary hover:underline">
                Projects
              </Link>
              . For a personal overview, visit{" "}
              <Link to="/about" className="text-primary hover:underline">
                About
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

