'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PlaygroundSection } from '@/components/PlaygroundSection';
import { SiteNav } from '@/components/SiteNav';
import { ModeToggle, type Mode } from '@/components/ModeToggle';
import { POSTS, formatPostDate, readingTime } from '@/lib/posts';

const PRO_SECTIONS = new Set(['playground', 'work', 'stack', 'blog']);
const PERSONAL_SECTIONS = new Set(['cricket', 'life']);
const MODE_KEY = 'ramesh-site-mode';

export default function Home() {
  const [mode, setMode] = useState<Mode>('professional');
  const isPro = mode === 'professional';

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (PRO_SECTIONS.has(hash)) {
      setMode('professional');
      return;
    }
    if (PERSONAL_SECTIONS.has(hash)) {
      setMode('personal');
      return;
    }
    const stored = window.localStorage.getItem(MODE_KEY);
    if (stored === 'professional' || stored === 'personal') {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace('#', '');
      if (PRO_SECTIONS.has(hash)) setMode('professional');
      else if (PERSONAL_SECTIONS.has(hash)) setMode('personal');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {/* Top bar: menu (left) + mode toggle (right) */}
      <div className="sticky top-0 z-40 w-full px-4 sm:px-8 pt-5 pb-2 flex items-center justify-between gap-4">
        <SiteNav mode={mode} />
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-8 pt-12 pb-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Profile photo with availability dot */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-peach via-coral/30 to-sage/40 blur-xl opacity-70" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt="Ramesh Venkatachalam"
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
              />
              <span
                title="Open to interesting conversations"
                aria-label="Available"
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-sage ring-4 ring-white shadow"
              />
            </div>
          </div>

          {/* Name + role */}
          <h2 className="font-serif text-2xl sm:text-3xl text-ink tracking-tight">
            Ramesh Venkatachalam
          </h2>
          <p className="text-sm sm:text-base text-soft mt-1 mb-8">
            {isPro
              ? 'Lead Solutions Architect · Dallas, TX'
              : 'Builder · Cricketer · Dallas, TX'}
          </p>

          <div key={`hero-${mode}`} className="mode-fade">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-soft mb-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-sage motion-safe:animate-blink" />
              {isPro
                ? 'Currently at Aetna (CVS Health) · Dallas, TX'
                : 'Living, building, and playing cricket in Dallas, TX'}
            </div>

            {isPro ? (
              <>
                <h1 className="font-serif text-[clamp(3rem,5vw+1.5rem,6rem)] leading-[0.95] mb-6 tracking-tight text-balance">
                  Architecting the{' '}
                  <br />
                  <span className="squiggle">agentic</span> enterprise.
                </h1>
                <p className="text-lg sm:text-xl text-soft max-w-3xl mx-auto mb-10 leading-relaxed">
                  Lead solutions architect with 20+ years across telecom, supply chain, insurance,
                  and healthtech. I sit at the intersection of GCP, full-stack engineering, and
                  agentic AI — turning complex architectural problems into elegant, scalable systems.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="#playground"
                    className="bg-ink text-cream px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(42,42,58,0.3)] transition"
                  >
                    See the playground →
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
                  {[
                    { n: '20+', l: 'Years building' },
                    { n: '6', l: 'Industries shipped' },
                    { n: '3', l: 'Capabilities, rare combo' },
                    { n: '1', l: 'Aetna · CVS Health' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="bg-white rounded-2xl p-5 text-left shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition"
                    >
                      <div className="font-serif text-4xl text-coral leading-none">{s.n}</div>
                      <div className="text-xs uppercase tracking-widest text-soft mt-2">{s.l}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="font-serif text-[clamp(3rem,5vw+1.5rem,6rem)] leading-[0.95] mb-6 tracking-tight text-balance">
                  Builder, cricketer, <br />
                  <span className="squiggle">human</span> in Dallas.
                </h1>
                <p className="text-lg sm:text-xl text-soft max-w-3xl mx-auto mb-10 leading-relaxed">
                  Off the clock I&apos;m on a cricket ground in DFW, drawing systems on the back of
                  napkins, or building little things in public. This side of the site is the
                  stuff that doesn&apos;t fit on the résumé.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="#cricket"
                    className="bg-ink text-cream px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(42,42,58,0.3)] transition"
                  >
                    The cricket side →
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
                  {[
                    { n: '🏏', l: 'Most weekends' },
                    { n: '5', l: 'Day Test cricket — best format' },
                    { n: '🇮🇳', l: 'The team I follow' },
                    { n: 'DFW', l: 'Home base' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="bg-white rounded-2xl p-5 text-left shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition"
                    >
                      <div className="font-serif text-4xl text-plum leading-none">{s.n}</div>
                      <div className="text-xs uppercase tracking-widest text-soft mt-2">{s.l}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div key={`body-${mode}`} className="mode-fade">
        {/* About */}
        <section id="about" className="px-4 sm:px-8 py-20 bg-peach/10">
          <div className="max-w-6xl mx-auto">
            {isPro ? (
              <>
                <div className="text-center mb-16">
                  <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">
                    A little about me
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    Twenty years across <em className="text-coral italic">six</em> industries.
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    The career view in one paragraph — then the three things I actually do, and how I think.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 sm:p-12 mb-8 max-w-3xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)]">
                  <p className="text-ink text-lg leading-[1.8] mb-5 drop-cap">
                    I started in <strong className="font-semibold">telecom and networking</strong>, where systems either work or they take down a region — that&apos;s where I learned to respect the unglamorous foundations. From there: <strong className="font-semibold">supply chain</strong>, then <strong className="font-semibold">healthtech</strong>, then enterprise platforms across multiple verticals, and for the last several years deep in <strong className="font-semibold">health insurance</strong>.
                  </p>
                  <p className="text-soft text-[1.05rem] leading-[1.8] mb-5">
                    That breadth matters more than it looks. Every industry teaches a different lesson — telecom teaches you reliability, supply chain teaches you orchestration under uncertainty, insurance teaches you that compliance and AI have to coexist or neither ships. Today I&apos;m at <strong className="text-ink">Aetna (CVS Health)</strong>, leading enterprise-scale initiatives around <strong className="text-ink">agentic AI on GCP</strong>, micro-frontend architecture, Zero Trust security, and on-prem-to-cloud migration.
                  </p>
                  <p className="text-soft text-[1.05rem] leading-[1.8]">
                    I&apos;m a visual thinker — I&apos;d rather draw the system than describe it. I value pragmatic trade-offs over architectural purity, and I&apos;m drawn to problems where deep domain knowledge compounds with new technology. Right now that&apos;s <strong className="text-ink">agentic AI</strong> meeting <strong className="text-ink">enterprise insurance</strong>, and the leverage there is enormous.
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-12 max-w-4xl mx-auto">
                  {[
                    { name: 'Telecom', emoji: '📡' },
                    { name: 'Networking', emoji: '🌐' },
                    { name: 'Supply Chain', emoji: '📦' },
                    { name: 'HealthTech', emoji: '🩺' },
                    { name: 'Enterprise', emoji: '🏢' },
                    { name: 'Insurance', emoji: '🏥' },
                  ].map((d) => (
                    <div key={d.name} className="bg-white rounded-2xl p-3 text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                      <div className="text-xl mb-1">{d.emoji}</div>
                      <div className="text-[11px] uppercase tracking-wider text-soft">{d.name}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-10">
                  <h3 className="font-serif text-2xl sm:text-3xl">
                    Three capabilities, <em className="text-coral italic">rarely</em> combined
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: '☁️',
                      bg: 'bg-peach',
                      title: 'Cloud-native architecture',
                      body: 'GCP, Terraform, Kubernetes. Workload Identity Federation, IAM, Zero Trust patterns. IaC, CI/CD, secrets management — the unglamorous foundations that make everything else possible.',
                    },
                    {
                      icon: '⚙️',
                      bg: 'bg-sage/30',
                      title: 'Full-stack engineering depth',
                      body: 'Java/Spring Boot on the back, React Micro Frontends on the front. The kind of polyglot fluency that lets architecture diagrams turn into shipped systems.',
                    },
                    {
                      icon: '🤖',
                      bg: 'bg-plum/10',
                      title: 'Agentic AI systems design',
                      body: 'Multi-agent orchestration with ADK, RAG pipelines, Vertex AI Search, Claude Managed Agents, tool-using LLMs. Production-ready integrations grounded in enterprise reality.',
                    },
                  ].map((card) => (
                    <div key={card.title} className={`${card.bg} rounded-3xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition`}>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                        {card.icon}
                      </div>
                      <h3 className="font-serif text-2xl mb-3">{card.title}</h3>
                      <p className="text-soft text-[15px] leading-relaxed">{card.body}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-16">
                  <p className="text-plum font-semibold text-sm uppercase tracking-widest mb-3">
                    Off the clock
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    The version of me <em className="text-plum italic">outside</em> the office.
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    Family, cricket, building things for fun, and a long-running interest in why
                    good systems and good cricket teams look surprisingly alike.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 sm:p-12 mb-12 max-w-3xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)]">
                  <p className="text-ink text-lg leading-[1.8] mb-5 drop-cap">
                    I moved to <strong className="font-semibold">Dallas</strong> years ago and have
                    no plans to leave. The metro has grown into a real home — a serious South Asian
                    cricket community, great food, weather that lets you play outside most of the
                    year, and a tech scene that quietly punches above its weight.
                  </p>
                  <p className="text-soft text-[1.05rem] leading-[1.8] mb-5">
                    Outside of work I&apos;m usually doing one of four things: on a cricket ground,
                    watching a Test match across time zones, prototyping a side project, or
                    reading. I write the occasional post about whatever I&apos;m thinking through —
                    often architecture, sometimes cricket, sometimes the weird overlap.
                  </p>
                  <p className="text-soft text-[1.05rem] leading-[1.8]">
                    I&apos;m a visual thinker who loves drawing systems on paper. The same instinct
                    shows up everywhere — in how I read a cricket pitch, sketch a weekend project,
                    or plan a family trip. Constraints first, then design.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: '🏏',
                      bg: 'bg-peach',
                      title: 'Cricket — playing and watching',
                      body: 'Weekend cricket in DFW with a local club. Tests during the week — five days, a session at a time, the most architecturally interesting sport on the planet.',
                    },
                    {
                      icon: '🛠️',
                      bg: 'bg-sage/30',
                      title: 'Building in public',
                      body: 'Small PoCs at the intersection of LLMs, GCP, and whatever caught my eye this month. Some ship, some die. The point is the learning loop, not the launch.',
                    },
                    {
                      icon: '📚',
                      bg: 'bg-plum/10',
                      title: 'Reading + writing',
                      body: 'Long reads on systems, ops, and the operators behind them. I write to think — short posts when something clicks, longer ones when I want to remember why.',
                    },
                  ].map((card) => (
                    <div key={card.title} className={`${card.bg} rounded-3xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition`}>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                        {card.icon}
                      </div>
                      <h3 className="font-serif text-2xl mb-3">{card.title}</h3>
                      <p className="text-soft text-[15px] leading-relaxed">{card.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Professional-only: Playground + Work + Stack + Blog */}
        {isPro && (
          <>
            <PlaygroundSection />

            <section id="work" className="px-4 sm:px-8 py-20 bg-peach/10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">
                    Currently driving
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    At Aetna · <em className="text-coral">CVS Health</em>
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    Enterprise-scale initiatives where the cloud, AI, and security layers all have to
                    hold up at once.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      tag: 'Agentic AI',
                      title: 'Agentic AI platform',
                      desc: 'Designing the platform layer for autonomous agents using Claude Managed Agents and Vertex AI — multi-agent workflows, tool integration, governance.',
                      bg: 'bg-peach/40',
                    },
                    {
                      tag: 'Frontend',
                      title: 'Micro Frontend architecture',
                      desc: 'Unified Aetna Client Experience Platform built as composable, persona-specific MFEs — letting independent teams ship to a coherent user surface.',
                      bg: 'bg-sage/30',
                    },
                    {
                      tag: 'Security',
                      title: 'Zero Trust on GCP',
                      desc: 'GCP Workload Identity Federation, IAM design, and Zero Trust security patterns — eliminating long-lived credentials at enterprise scale.',
                      bg: 'bg-plum/15',
                    },
                    {
                      tag: 'Data',
                      title: 'Cloud data migration',
                      desc: 'On-prem → GCP migration architecture with CDC, Datastream, Pub/Sub, and BigQuery / MongoDB / PostgreSQL targets. Near-real-time, governed.',
                      bg: 'bg-coral/15',
                    },
                  ].map((p) => (
                    <div key={p.title} className="bg-white rounded-[2rem] p-10 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition relative overflow-hidden block">
                      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full ${p.bg}`} />
                      <div className="relative">
                        <span className="inline-block bg-ink text-cream px-3 py-1 rounded-full text-xs font-medium mb-4">{p.tag}</span>
                        <h3 className="font-serif text-3xl mb-3 leading-tight">{p.title}</h3>
                        <p className="text-soft leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="stack" className="px-4 sm:px-8 py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">
                    The stack
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    Tools I <em className="text-coral">reach for</em>
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    Twenty years of picking tools, then unpicking them. These are the ones I keep coming
                    back to — across architecture, AI, and the domains where they collide.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      heading: '🔧 Core Stack',
                      chip: 'bg-peach/60 text-ink',
                      items: ['GCP', 'Vertex AI', 'Terraform', 'Java / Spring Boot', 'React', 'GKE', 'Pub/Sub', 'Dataflow'],
                    },
                    {
                      heading: '🤖 AI / ML',
                      chip: 'bg-coral/15 text-coral-text',
                      items: ['Agentic AI', 'Multi-Agent Systems', 'RAG', 'Vertex AI Search', 'LLM Integration', 'Prompt Engineering', 'Claude Managed Agents', 'Google ADK'],
                    },
                    {
                      heading: '☁️ Infrastructure',
                      chip: 'bg-sage/30 text-ink',
                      items: ['Cloud-Native Architecture', 'IaC', 'CI/CD', 'Workload Identity', 'Secrets Management', 'Zero Trust', 'GKE', 'Cloud Run'],
                    },
                    {
                      heading: '💻 Languages',
                      chip: 'bg-ink/10 text-ink',
                      items: ['Java', 'TypeScript', 'Python', 'SQL', 'Go', 'Bash', 'YAML', 'HCL'],
                    },
                    {
                      heading: '🎨 Frontend',
                      chip: 'bg-plum/15 text-plum',
                      items: ['Next.js', 'React', 'Tailwind CSS', 'Module Federation', 'Micro Frontends', 'Server Components', 'MDX'],
                    },
                    {
                      heading: '🏥 Domain',
                      chip: 'bg-cream text-ink ring-1 ring-soft/15',
                      items: ['Health Insurance', 'Telecom', 'Supply Chain', 'Networking', 'HealthTech', 'Enterprise Platforms'],
                    },
                  ].map((group) => (
                    <div key={group.heading} className="bg-white rounded-3xl p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                      <h3 className="font-serif text-xl mb-4">{group.heading}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((tag) => (
                          <span key={tag} className={`text-sm px-3 py-1.5 rounded-full ${group.chip}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="blog" className="px-4 sm:px-8 py-20 bg-peach/10">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">
                    From the blog
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    Thinking out <em className="text-coral">loud</em>
                  </h2>
                  <p className="text-soft">
                    Quick takes on Google Cloud Data Cloud product news — what each release means
                    for enterprise architects.
                  </p>
                </div>
                <div className="space-y-3">
                  {POSTS.map((post) => {
                    const { day, mon } = formatPostDate(post.date);
                    const mins = readingTime(post.body);
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="bg-white rounded-2xl p-7 flex gap-6 items-center hover:translate-x-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition shadow-[0_2px_20px_rgba(0,0,0,0.03)]"
                      >
                        <div className="text-center w-14 flex-shrink-0">
                          <div className="font-serif text-3xl text-coral leading-none">{day}</div>
                          <div className="text-xs uppercase tracking-widest text-soft mt-1">{mon}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-xl mb-1">{post.title}</h4>
                          <p className="text-soft text-sm mb-2">{post.excerpt}</p>
                          <div className="text-[11px] uppercase tracking-widest text-soft/80">
                            {mins} min read
                          </div>
                        </div>
                        <div className="text-coral-text text-2xl">→</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Personal-only: Cricket + Life */}
        {!isPro && (
          <>
            <section id="cricket" className="px-4 sm:px-8 py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <p className="text-plum font-semibold text-sm uppercase tracking-widest mb-3">
                    When I&apos;m not in IDE
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    I play <em className="text-plum italic">cricket</em>. And watch a lot of it too.
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    Weekends are for the pitch — the rest of the week, I&apos;m following Tests across time zones.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 sm:p-12 mb-8 max-w-5xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-sage/30" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-peach/40" />
                  <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
                    {/* Stylized stumps + ball SVG */}
                    <svg
                      width="120"
                      height="140"
                      viewBox="0 0 120 140"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <g stroke="#6b4e71" strokeWidth="6" strokeLinecap="round">
                        <line x1="30" y1="25" x2="30" y2="115" />
                        <line x1="60" y1="25" x2="60" y2="115" />
                        <line x1="90" y1="25" x2="90" y2="115" />
                      </g>
                      <g stroke="#6b4e71" strokeWidth="4" strokeLinecap="round">
                        <line x1="22" y1="22" x2="48" y2="22" />
                        <line x1="72" y1="22" x2="98" y2="22" />
                      </g>
                      <circle cx="60" cy="125" r="9" fill="#ff7a59" />
                      <path
                        d="M53 122 Q60 127, 67 122"
                        stroke="#fdf8f3"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                    <div>
                      <p className="text-plum font-semibold text-xs uppercase tracking-widest mb-2">My weekend</p>
                      <h3 className="font-serif text-3xl sm:text-4xl mb-3 leading-tight">
                        Weekend cricket in Dallas.
                      </h3>
                      <p className="text-soft text-[1.05rem] leading-relaxed mb-3">
                        Most weekends you&apos;ll find me on a cricket ground somewhere in the Dallas-Fort Worth metro,
                        playing with a local club. North Texas has a serious South Asian cricket scene, and the
                        community here is the real deal — leagues, tournaments, kids&apos; coaching, the whole thing.
                      </p>
                      <p className="text-soft text-[1.05rem] leading-relaxed">
                        It&apos;s the best context-switch from a week of architecture diagrams: two hours where the only
                        thing you&apos;re solving is whether to leave the next ball or play it.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-peach rounded-3xl p-8">
                    <div className="text-4xl mb-4">🇮🇳</div>
                    <h3 className="font-serif text-2xl mb-3">The team I follow</h3>
                    <p className="text-soft text-[15px] leading-relaxed">
                      India through every era — Tendulkar, Dravid, Kohli, the current generation. IPL too,
                      though Tests will always be the real game. Good cricket transcends the result.
                    </p>
                  </div>
                  <div className="bg-sage/30 rounded-3xl p-8">
                    <div className="text-4xl mb-4">⏱️</div>
                    <h3 className="font-serif text-2xl mb-3">The format I love most</h3>
                    <p className="text-soft text-[15px] leading-relaxed">
                      Test cricket. Five days, a session at a time, where strategy compounds and a single
                      bad over on day two costs you the match on day five. The most architecturally
                      interesting sport on the planet.
                    </p>
                  </div>
                  <div className="bg-plum/15 rounded-3xl p-8">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="font-serif text-2xl mb-3">Why an architect loves it</h3>
                    <p className="text-soft text-[15px] leading-relaxed">
                      Cricket is a stack of nested systems — each ball is a transaction, each over a session,
                      each session a deployment. Field placement is architecture. Captaincy is on-call ops.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)]">
                  <p className="font-serif text-xl mb-3 text-ink">A few cricket truths I keep coming back to:</p>
                  <ul className="space-y-3 text-soft text-[1.05rem] leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-plum font-bold flex-shrink-0">→</span>
                      <span><strong className="text-ink">&ldquo;Form is temporary, class is permanent.&rdquo;</strong> True for batters. Also true for engineers.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum font-bold flex-shrink-0">→</span>
                      <span><strong className="text-ink">The boring middle overs win Test matches.</strong> Same goes for the unglamorous infrastructure work most platforms run on.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum font-bold flex-shrink-0">→</span>
                      <span><strong className="text-ink">A good captain reads the pitch before the lineup.</strong> A good architect reads the constraints before the requirements.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum font-bold flex-shrink-0">→</span>
                      <span><strong className="text-ink">No team wins without a wicketkeeper.</strong> The unsung backbone — same as the platform engineers nobody invites to the demo.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="life" className="px-4 sm:px-8 py-20 bg-peach/10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <p className="text-plum font-semibold text-sm uppercase tracking-widest mb-3">
                    Life in Dallas
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">
                    Home, <em className="text-plum italic">people</em>, the small stuff.
                  </h2>
                  <p className="text-soft max-w-2xl mx-auto">
                    The rhythm outside the laptop — the things that make a place feel like home.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      icon: '🏡',
                      title: 'Dallas-Fort Worth',
                      body: 'A real home now. Family, friends, neighbors who know your name. The kind of place that grows on you slowly and then completely.',
                      bg: 'bg-peach/40',
                    },
                    {
                      icon: '🍛',
                      title: 'Food, mostly South Indian',
                      body: 'Filter coffee, dosa, biryani on weekends. DFW has spoiled me — the South Asian food scene here is genuinely world-class.',
                      bg: 'bg-sage/30',
                    },
                    {
                      icon: '✈️',
                      title: 'Travel when I can',
                      body: 'Long trips back to India, road trips around Texas, the occasional cricket tour. Always on the lookout for a good Test match in person.',
                      bg: 'bg-plum/15',
                    },
                    {
                      icon: '📖',
                      title: 'Currently reading',
                      body: 'A mix of systems books, founder memoirs, and old cricket writing. I keep a running list — happy to share what I have not put down lately.',
                      bg: 'bg-coral/15',
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="bg-white rounded-[2rem] p-10 relative overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition"
                    >
                      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full ${c.bg}`} />
                      <div className="relative">
                        <div className="text-4xl mb-4">{c.icon}</div>
                        <h3 className="font-serif text-2xl mb-3 leading-tight">{c.title}</h3>
                        <p className="text-soft leading-relaxed">{c.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Contact — both modes */}
        <section id="contact" className="px-4 sm:px-8 py-12">
          <div className="max-w-4xl mx-auto bg-ink rounded-[2rem] p-12 sm:p-16 text-center text-cream relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-coral/20" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-sage/20" />
            <div className="relative">
              {isPro ? (
                <>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 leading-tight text-balance">
                    Helping enterprises unlock <span className="text-coral">agentic AI</span>.
                  </h2>
                  <p className="opacity-85 mb-8 max-w-xl mx-auto leading-relaxed">
                    Autonomous agents, multi-agent workflows, tool-using LLMs, grounded RAG — the
                    architecture work that turns enterprise AI ambitions into production systems.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-4xl sm:text-5xl mb-4 leading-tight text-balance">
                    Say hi, talk <span className="text-coral">cricket</span>, or just trade book recs.
                  </h2>
                  <p className="opacity-85 mb-8 max-w-xl mx-auto leading-relaxed">
                    Always up for a coffee in DFW, a cricket nets session, or a long email about
                    whatever you are building. The inbox is open.
                  </p>
                </>
              )}
              <a
                href="mailto:rameshkumar.venkatachalam@gmail.com"
                className="inline-block font-serif text-2xl sm:text-3xl text-coral hover:underline transition"
              >
                rameshkumar.venkatachalam@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-12 px-4 text-center text-soft text-sm">
        <div className="flex justify-center gap-5 mb-5">
          <a
            href="https://github.com/ramesh-v-playground"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-soft hover:text-ink transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.7.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.15c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/rameshkumar-venkatachalam/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-soft hover:text-ink transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="mailto:rameshkumar.venkatachalam@gmail.com"
            aria-label="Email"
            className="text-soft hover:text-ink transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 7 9-7" />
            </svg>
          </a>
        </div>
        © 2026 Ramesh Venkatachalam. All rights reserved.
      </footer>
    </>
  );
}
