'use client';

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

export function PlaygroundSection() {
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

  const filterChips: { id: typeof activeFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...ALL_TAGS.map((t) => ({ id: t, label: TAG_LABEL[t] })),
    { id: 'archived', label: 'Archived' },
  ];

  return (
    <section id="playground" className="px-4 sm:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">The playground</p>
          <h2 className="font-serif text-4xl sm:text-5xl mb-4">
            Things I'm <em className="text-coral italic">building</em> in public.
          </h2>
          <p className="text-soft max-w-2xl mx-auto">
            Live PoCs at the intersection of agentic AI, GCP, and enterprise architecture.
            Some are shipped, some are experiments, some are dead. Honesty is the point.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
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

        {/* Project grid */}
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
  );
}

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
      <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accentBg}`} />

      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl">{p.emoji ?? '◇'}</div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[p.status]}`}>
            {STATUS_LABEL[p.status]}
          </span>
        </div>

        <h3 className="font-serif text-xl mb-2 leading-tight">{p.name}</h3>
        <p className="text-soft text-sm leading-relaxed mb-4">{p.oneLiner}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 bg-cream rounded-full text-soft">
              {TAG_LABEL[t]}
            </span>
          ))}
        </div>

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
