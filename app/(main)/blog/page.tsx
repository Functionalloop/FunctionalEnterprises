import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, case studies, and practical guides from the Functional Enterprises team.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border-dark">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            Journal
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            Blog
          </h1>
        </div>
      </section>

      {/* ── Post grid ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-muted-light text-sm mb-2">
                No posts published yet.
              </p>
              <p className="font-body text-muted-lighter text-xs">
                Check back soon — we&apos;re writing something good.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-background border border-border-light hover:border-accent transition-colors duration-300"
                >
                  {/* Cover image */}
                  {post.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-surface-light">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Card body */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Category + read time */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-[9px] tracking-widest uppercase text-accent border border-accent/30 px-2 py-0.5">
                        {post.category}
                      </span>
                      <span className="font-body text-[10px] text-muted-lighter">
                        {post.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground-dark mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
                      {post.title}
                    </h2>

                    <p className="font-body text-sm text-muted-light leading-relaxed flex-1 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <div className="mt-auto border-t border-border-light pt-4">
                      <time
                        dateTime={post.publishedAt?.toISOString()}
                        className="font-body text-[10px] text-muted-lighter tracking-wide"
                      >
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Unpublished"}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
