'use client';

export type Mode = 'professional' | 'personal';

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Switch between Professional and Personal"
      className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-full p-1 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    >
      <button
        role="tab"
        aria-selected={mode === 'professional'}
        aria-label="Professional"
        onClick={() => onChange('professional')}
        className={`inline-flex items-center gap-2 text-sm px-3 sm:px-5 py-2.5 rounded-full font-medium transition ${
          mode === 'professional'
            ? 'bg-ink text-cream shadow-[0_4px_15px_rgba(42,42,58,0.25)]'
            : 'text-soft hover:text-ink'
        }`}
      >
        <span aria-hidden="true">⚙</span>
        <span className="hidden sm:inline">Professional</span>
      </button>
      <button
        role="tab"
        aria-selected={mode === 'personal'}
        aria-label="Personal"
        onClick={() => onChange('personal')}
        className={`inline-flex items-center gap-2 text-sm px-3 sm:px-5 py-2.5 rounded-full font-medium transition ${
          mode === 'personal'
            ? 'bg-ink text-cream shadow-[0_4px_15px_rgba(42,42,58,0.25)]'
            : 'text-soft hover:text-ink'
        }`}
      >
        <span aria-hidden="true">✦</span>
        <span className="hidden sm:inline">Personal</span>
      </button>
    </div>
  );
}
