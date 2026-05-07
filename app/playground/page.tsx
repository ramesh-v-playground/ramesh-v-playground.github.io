'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  PROJECTS,
  ALL_TAGS,
  TAG_LABEL,
  STATUS_LABEL,
  type Status,
  type Tag,
  type Project,
} from '@/lib/projects';
import { AnimatedName } from '@/components/AnimatedName';

const STATUS_STYLES: Record<Status, string> = {
  'live': 'bg-sage/40 text-ink',
  'experimenting': 'bg-peach text-ink',
  'archived': 'bg-soft/15 text-soft line-through-not',
  'coming-soon': 'bg-plum/15 text-plum',
};

const ACCENT_BG: Record<NonNullable<Project['cardAccent']>, string> = {
  peach: 'bg-peach/40',
  sage: 'bg-sage/40',
  plum: 'bg-plum/15',
  coral: 'bg-coral/15',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function PlaygroundPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'archived' | Tag>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') {
      return PROJECTS.filter((p) => p.status !== 'archived');
    }
    if (activeFilter === 'archived') {
      return PROJECTS.filter((p) => p.status === 'archived');
    }
    return PROJECTS.filter((p) => p.tags.includes(activeFilter as Tag));
  }, [activeFilter]);

  const buildLog = useMemo(
    () => [...PROJECTS].sort((a, b) => (a.shippedAt < b.shippedAt ? 1 : -1)).slice(0, 5),
    []
  );

  const filterChips: { id: typeof activeFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...ALL_TAGS.map((t) => ({ id: t, label: TAG_LABEL[t] })),
    { id: 'archived', label: 'Archived' },
  ];

  return (
    <>
      {/* Nav */}
      <nav className="sticky top-4 z-50 px-4 sm:px-8 pt-6">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-full px-6 py-3 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
          <Link href="/"><AnimatedName /></Link>
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li><Link href="/#about" className="text-soft hover:text-coral-text transition">About</Link></li>
            <li><Link href="/playground" className="text-coral-text font-semibold transition">Playground</Link></li>
            <li><Link href="/#work" className="text-soft hover:text-coral-text transition">Work</Link></li>
            <li><Link href="/#stack" className="text-soft hover:text-coral-text transition">Stack</Link></li>
            <li><Link href="/#cricket" className="text-soft hover:text-coral-text transition">Cricket</Link></li>
            <li><Link href="/#blog" className="text-soft hover:text-coral-text transition">Writing</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 sm:px-8 pt-16 pb-12 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-4">
            The playground
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl leading-[0.95] mb-6 tracking-tight">
            Things I'm <em className="text-coral italic">building</em> in public.
          </h1>
          <p className="text-lg sm:text-xl text-soft max-w-2xl mx-auto leading-relaxed">
            Live PoCs at the intersection of agentic AI, GCP, and enterprise architecture.
            Some are shipped, some are experiments, some are dead. Honesty is the point.
          </p>
        </div>
      </section>

      {/* Filter chips */}
      <section className="px-4 sm:px-8 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`text-sm px-4 py-2 rounded-full transition font-medium ${
                activeFilter === chip.id
                  ? 'bg-ink text-cream'
                  : 'bg-white text-soft hover:text-ink shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Project grid */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-soft">
              <p className="font-serif text-2xl mb-2">Nothing here yet.</p>
              <p>Try a different filter — or check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Build log */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">Build log</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Recently <em className="text-coral italic">shipped</em></h2>
          </div>
          <div className="space-y-2">
            {buildLog.map((p) => (
              <div key={p.slug} className="flex gap-4 items-baseline bg-white rounded-2xl p-5 shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
                <div className="text-xs uppercase tracking-widest text-soft w-24 flex-shrink-0">
                  {formatDate(p.shippedAt)}
                </div>
                <div className="flex-1">
                  <span className="font-serif text-lg">{p.name}</span>
                  <span className={`ml-3 inline-block text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-soft text-sm mt-8">
            Updated as I ship — no fixed cadence, no fake "weekly" promises.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-ink rounded-[2rem] p-12 sm:p-16 text-center text-cream relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-coral/20" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-sage/20" />
          <div className="relative">
            <h2 className="font-serif text-3xl sm:text-5xl mb-4 leading-tight">
              See something that fits your problem?
            </h2>
            <p className="opacity-85 mb-8 max-w-xl mx-auto leading-relaxed">
              Each PoC here points at the kind of work I do for enterprise clients.
              If one looks close to what you're solving, let's talk.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-soft text-sm">
        © 2026 Ramesh · Dallas, TX · Building in public
      </footer>
    </>
  );
}

/* --- Card --- */

function ProjectCard({ project: p }: { project: Project }) {
  const accentBg = p.cardAccent ? ACCENT_BG[p.cardAccent] : 'bg-peach/40';
  const isClickable = !!p.liveUrl;
  const Wrapper: React.ElementType = isClickable ? 'a' : 'div';
  const wrapperProps = isClickable
    ? { href: p.liveUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`block bg-white rounded-3xl p-6 relative overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.03)] transition ${
        isClickable ? 'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-pointer' : ''
      }`}
    >
      {/* Accent blob */}
      <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accentBg}`} />

      <div className="relative">
        {/* Top row: emoji + status */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl">{p.emoji ?? '◇'}</div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[p.status]}`}>
            {STATUS_LABEL[p.status]}
          </span>
        </div>

        {/* Title + one-liner */}
        <h3 className="font-serif text-xl mb-2 leading-tight">{p.name}</h3>
        <p className="text-soft text-sm leading-relaxed mb-4">{p.oneLiner}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 bg-cream rounded-full text-soft">
              {TAG_LABEL[t]}
            </span>
          ))}
        </div>

        {/* Bottom row: metric + actions */}
        <div className="flex justify-between items-center pt-3 border-t border-cream">
          {p.metric ? (
            <div>
              <span className="font-serif text-lg text-ink">{p.metric.value}</span>
              <span className="text-xs text-soft ml-1">{p.metric.label}</span>
            </div>
          ) : (
            <div className="text-xs text-soft">Shipped {formatDate(p.shippedAt)}</div>
          )}

          <div className="flex gap-2 text-xs">
            {p.liveUrl && (
              <span className="text-coral-text font-semibold">Visit →</span>
            )}
            {!p.liveUrl && p.sourceUrl && (
              <span className="text-coral-text font-semibold">Source →</span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
