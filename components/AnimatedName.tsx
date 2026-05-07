'use client';

const NAME = 'Ramesh Venkatachalam';
const STAGGER = 0.15; // seconds between letter animations

/**
 * Animated brand name for the nav.
 * Letters slide in from the left one by one, hold, then exit right — loops forever.
 * Kept compact (text-base / text-lg / text-xl) since it sits in the nav pill.
 */
export function AnimatedName() {
  let charIndex = 0;
  const letters = NAME.split('').map((ch, i) => {
    if (ch === ' ') {
      return <span key={i} className="inline-block" style={{ width: '0.3em' }} />;
    }
    const delay = `${charIndex * STAGGER}s`;
    charIndex++;
    return (
      <span
        key={i}
        className="inline-block opacity-0 -translate-x-5 animate-name-slide"
        style={{ animationDelay: delay }}
      >
        {ch}
      </span>
    );
  });

  return (
    <div
      className="font-serif text-base sm:text-lg md:text-xl text-ink leading-none overflow-hidden whitespace-nowrap"
      aria-label={NAME}
    >
      {letters}
    </div>
  );
}
