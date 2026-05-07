/**
 * Playground project data.
 * Update this file as you ship, archive, or pivot a project.
 * The grid, filter chips, and build log all read from this list.
 */

export type Status = 'live' | 'experimenting' | 'archived' | 'coming-soon';
export type Tag = 'agentic-ai' | 'gcp' | 'rag' | 'frontend' | 'open-source' | 'tool';

export interface Project {
  slug: string;             // url-friendly id
  name: string;             // display name
  oneLiner: string;         // why this exists, one sentence
  status: Status;
  tags: Tag[];
  liveUrl?: string;         // public demo
  sourceUrl?: string;       // github / gitlab
  caseStudyUrl?: string;    // /playground/[slug] — optional deep dive
  shippedAt: string;        // ISO date — drives the build log
  metric?: {                // only if real
    label: string;          // e.g. 'users', 'MRR', 'docs parsed'
    value: string;          // e.g. '1.2k', '$0', '47k'
  };
  emoji?: string;           // small visual marker
  cardAccent?: 'peach' | 'sage' | 'plum' | 'coral'; // background tint
}

/**
 * Order: most-recent shipped first. The build log uses this order too.
 * Be ruthless — a stale or broken entry hurts more than a smaller grid.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'accomp',
    name: 'accomp work',
    oneLiner: 'Early-stage startup idea — AI-matched carpooling for enterprise teams, with verified colleagues, ESG reporting, and subsidy billing built in.',
    status: 'experimenting',
    tags: ['agentic-ai', 'gcp'],
    liveUrl: 'https://www.accomp.ai/',
    shippedAt: '2026-03-15',
    emoji: '🚗',
    cardAccent: 'sage',
  },
  {
    slug: 'monowall',
    name: 'Monowall',
    oneLiner: 'Agentic control plane for governed cloud infrastructure — describe intent, get HCL, policy verdicts, and approval gates before anything applies.',
    status: 'experimenting',
    tags: ['agentic-ai', 'gcp', 'tool'],
    shippedAt: '2026-05-01',
    emoji: '🧱',
    cardAccent: 'plum',
  },
  {
    slug: 'splitvite',
    name: 'Splitvite',
    oneLiner: 'Describe a meeting in plain English; Claude parses it into segments and sends each attendee an invite for only the part they\'re needed in.',
    status: 'experimenting',
    tags: ['agentic-ai', 'tool', 'frontend'],
    shippedAt: '2026-05-05',
    emoji: '✂️',
    cardAccent: 'coral',
  },
  {
    slug: 'agent-observability',
    name: 'Agent Observability',
    oneLiner: 'A multi-agent layer over Prometheus that explains incidents in plain English.',
    status: 'coming-soon',
    tags: ['agentic-ai', 'gcp'],
    shippedAt: '2026-05-30',
    emoji: '📡',
    cardAccent: 'peach',
  },
];

/** Helpers used by the page. */
export const ALL_TAGS: Tag[] = ['agentic-ai', 'gcp', 'rag', 'frontend', 'open-source', 'tool'];

export const TAG_LABEL: Record<Tag, string> = {
  'agentic-ai': 'Agentic AI',
  'gcp': 'GCP',
  'rag': 'RAG',
  'frontend': 'Frontend',
  'open-source': 'Open Source',
  'tool': 'Dev tool',
};

export const STATUS_LABEL: Record<Status, string> = {
  'live': 'Live',
  'experimenting': 'Experimenting',
  'archived': 'Archived',
  'coming-soon': 'Coming soon',
};
