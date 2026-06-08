'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Mode } from '@/components/ModeToggle';

const PROFESSIONAL_NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#playground', label: 'Playground' },
  { href: '/#work', label: 'Work' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];

const PERSONAL_NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#cricket', label: 'Cricket' },
  { href: '/#life', label: 'Life' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteNav({ mode = 'professional' as Mode }: { mode?: Mode }) {
  const items = mode === 'personal' ? PERSONAL_NAV : PROFESSIONAL_NAV;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Open ${mode} menu`}
        className="relative inline-flex items-center justify-center w-11 h-11 bg-white/80 backdrop-blur-md rounded-full text-ink shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:text-coral-text transition"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M1 1.5 H17 M1 7 H17 M1 12.5 H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
        <span
          aria-hidden="true"
          className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[8px] leading-[14px] flex items-center justify-center font-bold ring-2 ring-cream ${
            mode === 'personal' ? 'bg-plum text-cream' : 'bg-coral text-cream'
          }`}
        >
          {mode === 'personal' ? '✦' : '⚙'}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 border border-cream z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-5 py-2.5 text-sm text-soft hover:text-ink hover:bg-cream transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
