import Link from 'next/link';
import { PlaygroundSection } from '@/components/PlaygroundSection';
import { SiteNav } from '@/components/SiteNav';
import { POSTS, formatPostDate } from '@/lib/posts';

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* Hero */}
      <section className="px-4 sm:px-8 pt-16 pb-24 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-soft mb-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <span className="w-2 h-2 rounded-full bg-sage animate-blink" />
            Currently at Aetna (CVS Health) · Dallas, TX
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] mb-6 tracking-tight">
            Architecting the
            <br />
            <span className="squiggle">agentic</span> enterprise.
          </h1>
          <p className="text-lg sm:text-xl text-soft max-w-3xl mx-auto mb-10 leading-relaxed">
            Enterprise solutions architect with 20+ years across telecom, supply chain, insurance,
            and healthtech. I sit at the intersection of GCP, full-stack engineering, and
            agentic AI — turning complex architectural problems into elegant, scalable systems.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#playground" className="bg-ink text-cream px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(42,42,58,0.3)] transition">
              See the playground →
            </a>
          </div>
          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { n: '20+', l: 'Years building' },
              { n: '6', l: 'Industries shipped' },
              { n: '3', l: 'Capabilities, rare combo' },
              { n: '1', l: 'Aetna · CVS Health' },
            ].map((s) => (
              <div key={s.l} className="text-left">
                <div className="font-serif text-4xl text-coral leading-none">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-soft mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 sm:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">A little about me</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
              Twenty years across <em className="text-coral italic">six</em> industries.
            </h2>
            <p className="text-soft max-w-2xl mx-auto">
              The career view in one paragraph — then the three things I actually do, and how I think.
            </p>
          </div>

          {/* Narrative bio */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 mb-8 max-w-4xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)]">
            <p className="text-ink text-lg leading-[1.8] mb-5">
              I started in <strong className="font-semibold">telecom and networking</strong>, where systems either work or they take down a region — that's where I learned to respect the unglamorous foundations. From there: <strong className="font-semibold">supply chain</strong>, then <strong className="font-semibold">healthtech</strong>, then enterprise platforms across multiple verticals, and for the last several years deep in <strong className="font-semibold">health insurance</strong>.
            </p>
            <p className="text-soft text-[1.05rem] leading-[1.8] mb-5">
              That breadth matters more than it looks. Every industry teaches a different lesson — telecom teaches you reliability, supply chain teaches you orchestration under uncertainty, insurance teaches you that compliance and AI have to coexist or neither ships. Today I'm at <strong className="text-ink">Aetna (CVS Health)</strong>, leading enterprise-scale initiatives around <strong className="text-ink">agentic AI on GCP</strong>, micro-frontend architecture, Zero Trust security, and on-prem-to-cloud migration.
            </p>
            <p className="text-soft text-[1.05rem] leading-[1.8]">
              I'm a visual thinker — I'd rather draw the system than describe it. I value pragmatic trade-offs over architectural purity, and I'm drawn to problems where deep domain knowledge compounds with new technology. Right now that's <strong className="text-ink">agentic AI</strong> meeting <strong className="text-ink">enterprise insurance</strong>, and the leverage there is enormous.
            </p>
          </div>

          {/* Career timeline strip */}
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

          {/* Three capabilities */}
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
        </div>
      </section>

      {/* Playground */}
      <PlaygroundSection />

      {/* Current work */}
      <section id="work" className="px-4 sm:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">Currently driving</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
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

      {/* Stack */}
      <section id="stack" className="px-4 sm:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">The stack</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
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
                items: ['GCP', 'Vertex AI', 'Terraform', 'Java / Spring Boot', 'React', 'GKE', 'Pub/Sub', 'Dataflow'],
              },
              {
                heading: '🤖 AI / ML',
                items: ['Agentic AI', 'Multi-Agent Systems', 'RAG', 'Vertex AI Search', 'LLM Integration', 'Prompt Engineering', 'Claude Managed Agents', 'Google ADK'],
              },
              {
                heading: '☁️ Infrastructure',
                items: ['Cloud-Native Architecture', 'IaC', 'CI/CD', 'Workload Identity', 'Secrets Management', 'Zero Trust', 'GKE', 'Cloud Run'],
              },
              {
                heading: '💻 Languages',
                items: ['Java', 'TypeScript', 'Python', 'SQL', 'Go', 'Bash', 'YAML', 'HCL'],
              },
              {
                heading: '🎨 Frontend',
                items: ['Next.js', 'React', 'Tailwind CSS', 'Module Federation', 'Micro Frontends', 'Server Components', 'MDX'],
              },
              {
                heading: '🏥 Domain',
                items: ['Health Insurance', 'Telecom', 'Supply Chain', 'Networking', 'HealthTech', 'Enterprise Platforms'],
              },
            ].map((group) => (
              <div key={group.heading} className="bg-white rounded-3xl p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                <h3 className="font-serif text-xl mb-4">{group.heading}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tag) => (
                    <span key={tag} className="text-sm px-3 py-1.5 bg-cream rounded-full text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Cricket */}
      <section id="cricket" className="px-4 sm:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">When I'm not in IDE</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
              I play <em className="text-coral italic">cricket</em>. And watch a lot of it too.
            </h2>
            <p className="text-soft max-w-2xl mx-auto">
              Weekends are for the pitch — the rest of the week, I'm following Tests across time zones.
            </p>
          </div>

          {/* Featured: I play */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 mb-8 max-w-5xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-sage/30" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-peach/40" />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="text-7xl sm:text-8xl">🏏</div>
              <div>
                <p className="text-coral-text font-semibold text-xs uppercase tracking-widest mb-2">My weekend</p>
                <h3 className="font-serif text-3xl sm:text-4xl mb-3 leading-tight">
                  Weekend cricket in Dallas.
                </h3>
                <p className="text-soft text-[1.05rem] leading-relaxed mb-3">
                  Most weekends you'll find me on a cricket ground somewhere in the Dallas-Fort Worth metro,
                  playing with a local club. North Texas has a serious South Asian cricket scene, and the
                  community here is the real deal — leagues, tournaments, kids' coaching, the whole thing.
                </p>
                <p className="text-soft text-[1.05rem] leading-relaxed">
                  It's the best context-switch from a week of architecture diagrams: two hours where the only
                  thing you're solving is whether to leave the next ball or play it.
                </p>
              </div>
            </div>
          </div>

          {/* Three supporting cards: team, format, architect parallel */}
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

          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto shadow-[0_2px_30px_rgba(0,0,0,0.04)]">
            <p className="font-serif text-xl mb-3 text-ink">A few cricket truths I keep coming back to:</p>
            <ul className="space-y-3 text-soft text-[1.05rem] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-coral-text font-bold flex-shrink-0">→</span>
                <span><strong className="text-ink">"Form is temporary, class is permanent."</strong> True for batters. Also true for engineers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-coral-text font-bold flex-shrink-0">→</span>
                <span><strong className="text-ink">The boring middle overs win Test matches.</strong> Same goes for the unglamorous infrastructure work most platforms run on.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-coral-text font-bold flex-shrink-0">→</span>
                <span><strong className="text-ink">A good captain reads the pitch before the lineup.</strong> A good architect reads the constraints before the requirements.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-coral-text font-bold flex-shrink-0">→</span>
                <span><strong className="text-ink">No team wins without a wicketkeeper.</strong> The unsung backbone — same as the platform engineers nobody invites to the demo.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="px-4 sm:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-coral-text font-semibold text-sm uppercase tracking-widest mb-3">From the blog</p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
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
                    <p className="text-soft text-sm">{post.excerpt}</p>
                  </div>
                  <div className="text-coral-text text-2xl">→</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-4 sm:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-ink rounded-[2rem] p-12 sm:p-16 text-center text-cream relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-coral/20" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-sage/20" />
          <div className="relative">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4 leading-tight">
              Helping enterprises unlock <span className="text-coral">agentic AI</span>.
            </h2>
            <p className="opacity-85 mb-8 max-w-xl mx-auto leading-relaxed">
              Autonomous agents, multi-agent workflows, tool-using LLMs, grounded RAG — the
              architecture work that turns enterprise AI ambitions into production systems.
            </p>
            <a
              href="mailto:rameshkumar.venkatachalam@gmail.com"
              className="inline-block font-serif text-2xl sm:text-3xl text-coral hover:underline transition"
            >
              rameshkumar.venkatachalam@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-soft text-sm">
        © 2026 Ramesh · Dallas, TX · Architecting the agentic enterprise
      </footer>
    </>
  );
}
