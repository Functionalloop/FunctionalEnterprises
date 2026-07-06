import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/lib/db/blog";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts(true);
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [post, relatedPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(true),
  ]);

  if (!post || !post.published) notFound();

  const morePosts = relatedPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 font-body text-xs text-muted-darker tracking-wide">
            <Link href="/blog" className="hover:text-muted-dark transition-colors">
              Blog
            </Link>
            <span aria-hidden="true">→</span>
            <span className="text-muted-dark">{post.title}</span>
          </div>

          {/* Category + read time */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-body text-[9px] tracking-widest uppercase text-accent border border-accent/30 px-2 py-0.5">
              {post.category}
            </span>
            <span className="font-body text-[10px] text-muted-darker">
              {post.readTime} min read
            </span>
          </div>

          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            {post.title}
          </h1>

          <p className="font-body text-muted-dark text-base leading-relaxed max-w-2xl mb-8">
            {post.excerpt}
          </p>

          {post.publishedAt && (
            <time
              dateTime={post.publishedAt.toISOString()}
              className="font-body text-[10px] text-muted-darker tracking-widest uppercase"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </div>
      </section>

      {/* ── Cover image ────────────────────────────────────────────────────── */}
      {post.coverImage && (
        <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-surface-light">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Article body ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[780px] mx-auto px-5 sm:px-6 md:px-10">
          <div
            className="prose prose-sm md:prose-base max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground-dark
              prose-p:font-body prose-p:text-muted-light prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground-dark
              prose-code:font-body prose-code:text-accent prose-code:bg-surface-light prose-code:px-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-5 prose-blockquote:text-muted-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* ── More posts ─────────────────────────────────────────────────────── */}
      {morePosts.length > 0 && (
        <section className="bg-surface-light border-t border-border-light py-20 md:py-24">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-muted-light mb-12">
              More from the Blog
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col bg-background border border-border-light hover:border-accent transition-colors duration-300"
                >
                  {p.coverImage && (
                    <div className="relative aspect-video overflow-hidden bg-surface-light">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block font-body text-[9px] tracking-widest uppercase text-accent bg-foreground-dark px-2 py-1 rounded-sm mb-3">
                      {p.category}
                    </span>
                    <h3 className="font-display font-bold text-base tracking-tight text-foreground-dark group-hover:text-accent transition-colors duration-200 leading-snug">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark border-t border-border-dark py-20 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-center">
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-[0.97] mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Ready to work together?
          </h2>
          <Button href="/contact" variant="primary" size="lg">
            Start a project →
          </Button>
        </div>
      </section>
    </main>
  );
}
