import Link from 'next/link';
import { AnimatedName } from '@/components/AnimatedName';

const NAV_ITEMS = [
  { href: '/#about', label: 'About' },
  { href: '/#playground', label: 'Playground' },
  { href: '/#work', label: 'Work' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#cricket', label: 'Cricket' },
  { href: '/#blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteNav() {
  return (
    <nav className="sticky top-4 z-50 px-4 sm:px-8 pt-6">
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-full px-6 py-1 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
        <Link href="/" className="inline-flex items-center min-h-[44px]">
          <AnimatedName />
        </Link>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center min-h-[44px] px-2 -mx-2 text-soft hover:text-coral-text transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
