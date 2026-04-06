import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getBlogPost } from "@/data/blogPosts";
import { siteConfig } from "@/config/site";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Helmet>
          <title>Article not found | PyMaster</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Article not found</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The article you’re looking for doesn’t exist (or the link is incorrect). Browse the{" "}
            <Link to="/blog" className="text-primary hover:underline">
              Blog index
            </Link>{" "}
            or return to{" "}
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            .
          </p>
        </main>
      </div>
    );
  }

  const canonical = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Helmet>
        <title>{post.title} | PyMaster</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <article>
        <header>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
              Published {post.publishedAt}
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <main className="mt-10 space-y-10">
          {post.sections.map((section) => {
            const HeadingTag = section.level === 3 ? "h3" : "h2";
            return (
              <section key={section.heading} aria-label={section.heading} className="space-y-3">
                <HeadingTag className={section.level === 3 ? "text-lg font-bold text-foreground" : "text-2xl font-extrabold text-foreground"}>
                  {section.heading}
                </HeadingTag>
                {section.paragraphs.map((para) => (
                  <p key={para.slice(0, 36)} className="text-sm sm:text-base leading-7 text-muted-foreground">
                    {para}
                  </p>
                ))}
              </section>
            );
          })}

          <section className="rounded-2xl border border-border bg-surface-1/60 p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl font-extrabold text-foreground">Continue on PyMaster</h2>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Browse more topics on the{" "}
              <Link to="/blog" className="text-primary hover:underline">
                Blog
              </Link>
              , learn what this platform includes on{" "}
              <Link to="/projects" className="text-primary hover:underline">
                Projects
              </Link>
              , or start practicing with{" "}
              <Link to="/learn" className="text-primary hover:underline">
                Lessons
              </Link>{" "}
              and{" "}
              <Link to="/problems" className="text-primary hover:underline">
                Problems
              </Link>
              .
            </p>
          </section>
        </main>
      </article>
    </div>
  );
}

