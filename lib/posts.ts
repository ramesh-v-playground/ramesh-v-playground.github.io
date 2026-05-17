export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  body: string;
}

const SOURCE = 'https://cloud.google.com/blog/products/data-analytics/whats-new-with-google-data-cloud';

export const POSTS: Post[] = [
  {
    slug: 'managed-airflow-feature-wave-2026',
    title: 'Managed Airflow grows up: 3.1 GA, agentic troubleshooting at the DAG level',
    excerpt:
      "The January preview of Gemini Cloud Assist in Cloud Composer was the appetizer. May's feature wave is the meal — Airflow 3.1 GA with a real architectural reset underneath.",
    date: '2026-05-04',
    source: SOURCE,
    body: `Google shipped a wave of Managed Service for Apache Airflow updates: Airflow 3.1 GA, agentic troubleshooting embedded in the dashboard, and the structural changes underneath that make both serious for enterprise workloads.

The architectural reset in 3.1 is the part operators should care about first. Scheduler and execution layer are now decoupled, DAG versioning is native (with historical structure and run history retained per version), backfills are a first-class scheduler concept instead of a sidecar, and event-driven scheduling can trigger workflows from data assets and external queues. These are the things teams hand-rolled around Airflow for years.

Then there's Human-in-the-Loop — pause execution for a human decision via the UI with deadline alerts on critical pipelines. That's the missing primitive for any pipeline that touches regulated data movement, model promotion, or anything else where you want a person to nod before the next task runs.

On the assistance side: the January preview shipped as task-level root cause analysis. The May update elevates it to DAG execution level — troubleshooting holistically across the run, not just the failed task. That's the move from "what's wrong with this task" to "what's wrong with this pipeline," which is the question operators actually ask at 3am.

Platform teams running Airflow at scale: stop building scaffolding around backfills and DAG versioning. The platform finally absorbed the patterns you've been maintaining.`,
  },
  {
    slug: 'managed-airflow-mcp-yaml-orchestration',
    title: 'Managed Airflow gets an MCP server and YAML pipelines — orchestration goes agent-first',
    excerpt:
      'Two changes in the May feature wave matter for the next decade of pipeline work: a managed Airflow MCP server, and declarative YAML pipelines that no longer require Python expertise.',
    date: '2026-05-04',
    source: SOURCE,
    body: `Buried in the May Managed Airflow feature wave are two changes that reshape who can author and who can operate orchestration. A managed Airflow MCP Server lands in public preview, and a declarative YAML pipeline format lets non-Python users author end-to-end orchestration including cross-product dependencies (dbt, Spark, DTS).

The MCP server is the obvious through-line from the database-tier MCP rollout in February. Google operationalized MCP across AlloyDB, Spanner, Cloud SQL, Bigtable, Firestore three months ago; now it reaches the orchestration tier. Tools surface like list_environments, get_dag_run, get_task_instance — exactly the primitives an agent needs to reason about a running pipeline without being co-located with the operator UI. Same protocol, same governance story, same "you don't run the server yourself" win.

The YAML format is the more controversial change. Defining DAGs in Python has been Airflow's strength (full programmatic power) and its weakness (you need a Python developer to author one). Declarative YAML moves authoring into reach of data analysts, dbt practitioners, and anyone who's been blocked by "we need an engineer to add this pipeline."

The right read: the YAML layer isn't replacing Python DAGs — it's a lower-barrier on-ramp that compiles into the same execution model. Power users keep Python; the long tail of "I just need to schedule three steps with a dependency" gets unblocked. That's the same pattern Looker pulled with self-service Explores for analytics — governed core, exploratory edge.

For enterprise data platform teams: this is the moment to stop being the bottleneck on pipeline authoring. Expose the YAML format and the MCP server to your domain teams. Keep Python for the things that earn it.`,
  },
  {
    slug: 'bigquery-odbc-driver-preview',
    title: "BigQuery's first-party ODBC driver is the unsexy enterprise win of 2026",
    excerpt:
      "Google quietly shipped a first-party ODBC driver for BigQuery. If you've ever debugged a BI dashboard at 3am over a flaky connector, this matters more than it sounds.",
    date: '2026-04-22',
    source: SOURCE,
    body: `Google quietly shipped a Google-built ODBC driver for BigQuery in preview. On its face this is a yawn — there are already third-party ODBC drivers. But if you've ever debugged a production BI dashboard at 3am over a third-party connector that mishandles a Standard SQL feature, you know exactly why this matters.

First-party drivers do two things third-party can't: they ship in lockstep with the underlying engine, and they get prioritized engineering when something breaks. Enterprise BI stacks (Tableau, Power BI, anything legacy) live or die on the connector's behavior under load. Google owning this layer reduces a real class of incident.

The ODBC and JDBC pair (the JDBC driver landed earlier in January) signals something bigger: BigQuery is being repositioned for the slow-moving enterprise data estate, not just the lake-and-warehouse-modern crowd. Most of the world still uses ODBC.

Architects: this is one fewer license to renew, and one fewer vendor to chase down for a security review.`,
  },
  {
    slug: 'data-studio-ai-era',
    title: 'Data Studio is being repositioned, and it\'s about agents, not dashboards',
    excerpt:
      'Looker Studio is expanding from visualization tool to host for BigQuery conversational agents and Colab data apps. The frame for enterprise BI just shifted.',
    date: '2026-04-15',
    source: SOURCE,
    body: `Looker Studio (née Data Studio) is being expanded from a visualization tool to a host for BigQuery conversational agents and Colab-built data apps. That's a meaningful repositioning.

The frame for years has been: dashboards as the answer surface. The new frame is: conversational agents and notebooks as the answer surface, with dashboards as one rendering option among several. That's how enterprise BI actually gets used in 2026 — analysts iterate in Colab, agents handle the long-tail "where is X?" questions, dashboards remain for the executive view.

The architectural implication: if Looker Studio is the host, you've consolidated three distinct user experiences (BI, notebook, conversational analytics) into one governed surface that already has IAM, sharing, and embedding worked out. That's worth a lot more than another visualization library.

For enterprise data teams: stop building bespoke wrappers around Vertex agents to get them in front of users. The host is now the BI tool everyone already opens.`,
  },
  {
    slug: 'bigquery-graph-preview',
    title: 'BigQuery Graph: graph analytics where your data already lives',
    excerpt:
      "Graph analytics has always meant moving data into a dedicated graph database. BigQuery Graph inverts that — and the cost calculus changes.",
    date: '2026-04-15',
    source: SOURCE,
    body: `Graph analytics has historically required moving your data to a dedicated graph database — Neo4j, JanusGraph, Neptune. BigQuery Graph (preview) inverts that: model and traverse relationships against the data already in BigQuery.

For enterprise use cases — fraud, identity resolution, supply chain, network analysis — the dominant cost was never the graph engine. It was the ETL, the duplication, the staleness, the second governance regime. Pulling graph compute into the warehouse layer kills those costs.

What I'd watch: query language compatibility. Graph workloads have non-trivial semantics around traversals, pathfinding, and recursion. If BigQuery Graph supports a meaningful subset of SQL/PGQ or openCypher, this becomes a default choice for most enterprises. If it's a custom dialect, adoption stalls.

Either way, the direction is right. Most "we need a graph database" conversations end with "do you really need a separate database, or do you need graph queries?" This narrows the answer.`,
  },
  {
    slug: 'looker-embedded-conversational',
    title: 'Looker Embedded gets natural language — what it changes for product teams',
    excerpt:
      "Adding Gemini to Looker Embedded isn't about asking data questions in English. It's about who can finally ship that to customers without failing a security review.",
    date: '2026-04-08',
    source: SOURCE,
    body: `You can now add Gemini-powered natural language experiences to apps built on Looker Embedded. The interesting question isn't "can we ask data questions in English" — every data tool has had that for two years now. It's: who gets to embed it where.

Looker Embedded is the layer enterprise SaaS products use to ship customer-facing analytics inside their own UI. Adding conversational analytics there means a product team can give their customers — not just internal analysts — a natural language interface to the customer's own data, governed by the customer's own model.

That's the unlock. Enterprise SaaS has been timid about shipping AI into customer-facing surfaces because of governance, privacy, and hallucination risk. Looker's semantic layer constrains the model to a sanctioned schema — you don't get a hallucinated table name; you get "I don't know."

This is the version of conversational analytics that survives a security review.`,
  },
  {
    slug: 'looker-self-service-explores',
    title: "Self-service Explores in Looker: the trade-off enterprises have been waiting for",
    excerpt:
      "LookML governance is a strength and a bottleneck. Self-service Explores accept the trade-off most mature data teams already make outside the tool.",
    date: '2026-04-08',
    source: SOURCE,
    body: `Looker's strength has always been its semantic layer — LookML enforces a single source of truth. Its weakness has always been that getting your data into LookML is a project. Self-service Explores let users bring their own data and gain instant access to insights, governed by the existing semantic environment.

This is the right trade-off. Enterprise BI fails at the extremes: pure self-service (analytics chaos, six versions of "revenue") and pure top-down (a 9-month wait to model a new dataset). Self-service Explores accept that the long tail of analyst questions doesn't justify a LookML modeling cycle, while still keeping governance over the dimensions that matter.

The architectural read: Looker is bifurcating into a governed core and an exploratory edge. That mirrors how mature enterprise data teams already work — they just had to do it outside the tool until now.`,
  },
  {
    slug: 'cloud-sql-autoscaling-read-pools',
    title: "Cloud SQL gets autoscaling read pools — a small feature with big implications",
    excerpt:
      "Read replicas you don't have to capacity-plan for. The boring database keeps winning, and that's the right outcome.",
    date: '2026-03-25',
    source: SOURCE,
    body: `Cloud SQL now supports autoscaling read pools: provision multiple read replicas behind a single endpoint, scale capacity based on real-time load. This is overdue.

If you've operated Postgres or MySQL on Cloud SQL at scale, the read replica pattern is familiar: spin up replicas, point read traffic at them via a load balancer or a sidecar pooler, manage capacity manually. Autoscaling collapses that operational burden into a managed feature.

The honest question: is this enough to keep regulated workloads on Cloud SQL instead of pushing them to AlloyDB or Spanner? For most enterprise OLTP, yes. The vast majority of database workloads I see at the enterprise tier are read-dominated, capacity-elastic, and don't need globally distributed semantics. Cloud SQL with autoscaling read pools is the cheapest path to "good enough" for that profile.

The boring database keeps winning.`,
  },
  {
    slug: 'gemini-bigquery-studio-analytics-partner',
    title: 'Gemini in BigQuery Studio is now the analytics partner, not the autocomplete',
    excerpt:
      "The repositioning from code assistant to analytics partner sounds like marketing — but the technical lift is real, and it's mostly grounded retrieval.",
    date: '2026-03-18',
    source: SOURCE,
    body: `Gemini in BigQuery Studio shipped as a code assistant. The latest update repositions it as a "context-aware analytics partner." The distinction matters.

A code assistant fills in a SELECT clause. An analytics partner reasons across the warehouse — joins you didn't know existed, semantic conflicts, data quality issues — and surfaces them in the flow of a query. That's a different product, even if the input box looks the same.

The technical lift here is mostly retrieval, not generation. The model needs grounded access to the schema graph, the lineage, the column-level statistics, the prior queries on this dataset. Gemini in BigQuery Studio has direct access to all of those — no MCP server, no custom retrieval pipeline.

For enterprise data engineering teams: this is the version of "an LLM in your data warehouse" that doesn't require you to stand up the agent infrastructure yourself. That's worth a lot when you're already over budget on the AI roadmap.`,
  },
  {
    slug: 'mcp-google-cloud-databases',
    title: 'MCP for AlloyDB, Spanner, Cloud SQL: the protocol becomes infrastructure',
    excerpt:
      'Managed and remote MCP support across Google Cloud databases is a strong signal: MCP just won the protocol fight.',
    date: '2026-02-25',
    source: SOURCE,
    body: `Managed and remote MCP support landed for AlloyDB, Spanner, Cloud SQL, Bigtable, and Firestore. Read that line again — Google just made Model Context Protocol a first-class infrastructure feature across its database portfolio.

What this means in practice: agents (Claude, Gemini, anything supporting MCP) get governed, authenticated, schema-aware access to enterprise data without you running a custom MCP server. The connection is managed — IAM-aware, audit-logged, rate-limited.

The strategic read is bigger. MCP started as an Anthropic-led protocol. Six months ago the fear was that every cloud vendor would ship a competing one. Google not only adopted it but is now operationalizing it across the database tier. That's a strong signal MCP has won the protocol fight.

For enterprise architects: stop building per-database wrappers for agents. The protocol layer is now infrastructure, the same way ODBC was for BI.`,
  },
  {
    slug: 'conversational-analytics-api-bigquery',
    title: 'The Conversational Analytics API: when natural-language queries become a building block',
    excerpt:
      'The headless version of Conversational Analytics — the engine, exposed. Useful because enterprise UIs are bespoke and nobody wants to embed Looker.',
    date: '2026-02-25',
    source: SOURCE,
    body: `The Conversational Analytics API for BigQuery lets you build conversational agents that understand natural language, query data, and return text, tables, and charts. This is the headless version of the Conversational Analytics product — the engine, exposed.

Why does the API matter when the UI already exists? Because enterprise UIs are bespoke. Internal portals, customer-facing apps, Slackbots, voice assistants — each one wants conversational analytics, none of them want to embed Looker. An API decouples "ask data questions in English" from "use Looker."

The architectural value is composition. Pair the API with your existing identity layer, your audit pipeline, your front-end framework — and you have a domain-specific conversational analytics surface that you fully own. That's how enterprises actually adopt this stuff.

If the API hits parity with the UI in retrieval quality, it becomes a default choice for any internal tool that touches BigQuery.`,
  },
  {
    slug: 'conversational-analytics-bigquery-studio',
    title: 'Conversational Analytics in BigQuery: the ground floor for the API that came later',
    excerpt:
      'BigQuery Studio shipped the user-facing capability first, then exposed it as a primitive. The "build vs buy" calculus for internal analytics agents shifted in January.',
    date: '2026-01-28',
    source: SOURCE,
    body: `The first wave of Conversational Analytics shipped directly in BigQuery Studio in January — natural language, query generation, execution, visualization, all in one flow. The same surface eventually became the API the platform team shipped in February.

Two takeaways. First: the right way to ship a building block is to use it yourself first. BigQuery Studio's analytics agent isn't a demo of the API — it's the productized version, battle-tested. Second: this is a useful pattern for any enterprise data platform team. Ship the user-facing capability, then expose it as a primitive. You learn what to expose by what you actually used.

For enterprise architects considering "build vs buy" on internal analytics agents: the calculus shifted in January. The thing you would have built — schema-aware NL2SQL with query execution and visualization — now exists at the warehouse layer. Build budget should move to the surfaces and integrations that are uniquely yours.`,
  },
  {
    slug: 'firestore-enterprise-pipeline',
    title: 'Firestore Enterprise: the document store grows up',
    excerpt:
      'Index-less queries, pipeline operations, observability tooling. Firestore is no longer the "use only for the obvious cases" document store.',
    date: '2026-01-21',
    source: SOURCE,
    body: `Firestore Enterprise edition shipped with a new query engine — over 100 new query features, index-less queries, new index types, observability tooling. This is a substantial upgrade, not an incremental release.

The classic Firestore complaint was the query model: NoSQL with strict index requirements, fast for the queries you anticipated, painful for the ones you didn't. Index-less queries change the cost curve for ad-hoc work. Pipeline operations (the Enterprise edition's headline feature) close the gap with the relational world for analytical patterns.

What this means for enterprise: Firestore is no longer the "use only for the obvious cases" document store. Pair it with the pipeline operations and Conversational Analytics improvements landing across the data tier, and Firestore becomes a credible transactional layer for agent-driven applications — the use case where document semantics actually fit.

The boring choice — Postgres — still wins for most workloads. But if your workload was already document-shaped and you accepted the limitations, those limitations just got shorter.`,
  },
  {
    slug: 'bigquery-jdbc-driver-preview',
    title: "BigQuery's Google-built JDBC driver — the quiet enterprise unlock",
    excerpt:
      "Java is still the default language for enterprise data engineering. A first-party JDBC driver is plumbing — and plumbing is what compounds.",
    date: '2026-01-14',
    source: SOURCE,
    body: `The JDBC driver landed in January, three months before the matching ODBC driver. Same story: Google-built, open-source, first-party connectivity for the enterprise data stack.

Java is still the default language for enterprise data engineering — Spark, Beam, custom ETL, internal services. JDBC connectivity to BigQuery has been functional but third-party for years. A Google-built driver brings two practical wins: the driver ships in lockstep with BigQuery's Standard SQL surface, and Google's support team owns it end-to-end when something breaks.

The deeper read: this is the "make BigQuery the enterprise default" arc, played out as plumbing. It's not glamorous. But the cost of owning the connector layer is the cost of owning the integration story for ten years of Java code that needs to talk to your warehouse.

For platform teams maintaining BigQuery as a standard target: switch to the first-party drivers when they hit GA. One less license, one less vendor escalation path.`,
  },
  {
    slug: 'gemini-cloud-composer-investigations',
    title: 'Gemini Cloud Assist for Cloud Composer 3: incident triage, automated',
    excerpt:
      "If you've owned an Airflow deployment, you know exactly which 3am workflow this replaces. Pattern-matching is what an LLM with grounded log access does well.",
    date: '2026-01-14',
    source: SOURCE,
    body: `Gemini Cloud Assist investigations are now in Cloud Composer 3, providing automated root cause analysis for failed Airflow tasks with actionable recommendations. If you've owned an Airflow deployment, you know exactly what this replaces.

The Airflow failure-mode workflow is depressingly familiar: task fails, you stare at the log, you cross-reference task code, you scroll through the DAG, you check upstream dependencies, you remember it failed last Wednesday for a different reason. Most of that is pattern-matching, not investigation — exactly what an LLM with grounded log access does well.

What I'd want to see: how does the assistant handle multi-task failures with cascading effects? Single-task root cause is straightforward; the harder Airflow problems are the ones where the assistant needs to reason about state across the DAG.

Either way, this is the right place for Gemini Cloud Assist to land first. Airflow is the exact mix of structured metadata, unstructured logs, and pattern-rich failure modes where an LLM agent actually pays for itself in operator time saved.`,
  },
];

export function formatPostDate(iso: string): { day: string; mon: string } {
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-US', { day: '2-digit' });
  const mon = d.toLocaleDateString('en-US', { month: 'short' });
  return { day, mon };
}
