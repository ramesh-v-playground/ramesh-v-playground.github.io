import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramesh Venkatachalam — Solutions Architect',
  description:
    'Solutions Architect with 20+ years across telecom, supply chain, insurance, and healthtech. GCP, Terraform, agentic AI. Based in Dallas, TX.',
  openGraph: {
    title: 'Ramesh Venkatachalam — Solutions Architect',
    description: 'Cloud, agentic AI, and the architecture work that turns enterprise AI ambitions into production systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts loaded via <link> tags at runtime instead of next/font/google.
          Why: next/font/google fetches CSS from Google during the build, which
          breaks any offline / sandboxed build environment. Loading at runtime
          makes the build deterministic and lets Pages serve the site without
          ever needing build-time access to fonts.googleapis.com.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-ink font-sans antialiased relative overflow-x-hidden">
        {/* Floating gradient orbs — soft enough to never reduce text contrast */}
        <div className="pointer-events-none fixed -top-52 -right-52 w-[500px] h-[500px] rounded-full bg-peach/40 blur-3xl animate-float1 z-0" />
        <div className="pointer-events-none fixed -bottom-72 -left-52 w-[600px] h-[600px] rounded-full bg-sage/30 blur-3xl animate-float2 z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
