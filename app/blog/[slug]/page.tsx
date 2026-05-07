import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, formatPostDate } from '@/lib/posts';
import { SiteNav } from '@/components/SiteNav';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const { day, mon } = formatPostDate(post.date);
  const paragraphs = post.body.split(/\n\n+/);

  return (
    <>
      <SiteNav />

      <article className="px-4 sm:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-coral-text font-semibold text-sm uppercase tracking-widest mb-8 hover:opacity-70 transition"
          >
            ← Back to writing
          </Link>

          <div className="flex items-baseline gap-4 mb-6">
            <div className="text-center w-14 flex-shrink-0">
              <div className="font-serif text-3xl text-coral leading-none">{day}</div>
              <div className="text-xs uppercase tracking-widest text-soft mt-1">{mon}</div>
            </div>
            <p className="text-soft text-sm">
              On{' '}
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral-text hover:underline"
              >
                Google Data Cloud product news
              </a>
            </p>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="text-ink text-[1.1rem] leading-[1.8] space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-cream">
            <Link
              href="/#blog"
              className="text-coral-text font-semibold hover:underline"
            >
              ← More writing
            </Link>
          </div>
        </div>
      </article>

      <footer className="py-12 text-center text-soft text-sm">
        © 2026 Ramesh · Dallas, TX · Architecting the agentic enterprise
      </footer>
    </>
  );
}
