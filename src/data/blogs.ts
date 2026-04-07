export interface BlogPostData {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: Array<{ type: 'heading' | 'paragraph'; text: string }>;
  author: string;
  category: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  status: 'published' | 'draft';
}

export const BLOGS: BlogPostData[] = [
  {
    _id: '1',
    slug: 'microservices-architecture-best-practices',
    title: 'Microservices Architecture: Scaling Without the Complexity',
    excerpt: 'Practical strategies for building resilient microservices architectures that scale gracefully while maintaining developer productivity.',
    author: 'Kamran Aziz',
    category: 'Cloud Strategy',
    date: '2024-10-15',
    readTime: '12 min',
    featured: true,
    status: 'published',
    content: [
      { type: 'heading', text: 'The Microservices Decision Matrix' },
      { type: 'paragraph', text: 'Not every application needs microservices. Use this framework to determine if decomposition makes sense for your use case. Key factors: team size (>20 engineers), domain complexity, and scaling requirements.' },
      { type: 'heading', text: 'Domain-Driven Design Foundations' },
      { type: 'paragraph', text: 'Start with Bounded Contexts. Identify single responsibilities within your domain. Each service should own one business capability completely – from data to business logic.' },
      { type: 'heading', text: 'Event-Driven Communication Patterns' },
      { type: 'paragraph', text: 'Synchronous APIs create tight coupling. Use Kafka or RabbitMQ for asynchronous events. Implement Event Sourcing + CQRS for complex domains requiring audit trails and multiple read models.' },
      { type: 'heading', text: 'Practical Deployment Strategies' },
      { type: 'paragraph', text: 'Kubernetes with ArgoCD for GitOps. Istio service mesh for traffic management. Progressive delivery with Canary releases. Observability triad: metrics (Prometheus), traces (Jaeger), logs (Loki).' }
    ]
  },
  {
    _id: '2',
    slug: 'react-performance-2024',
    title: 'React Performance in 2024: Beyond useMemo',
    excerpt: 'Modern React optimization techniques that actually move the needle. Virtual lists, compiler optimizations, and framework-agnostic patterns.',
    author: 'Syed Raza',
    category: 'App Development',
    date: '2024-10-08',
    readTime: '9 min',
    status: 'published',
    content: [
      { type: 'heading', text: 'The React Compiler Changes Everything' },
      { type: 'paragraph', text: 'React 19\'s compiler eliminates 90% of stale closure issues. No more manual memoization for most components. Focus on layout effects and streaming SSR.' },
      { type: 'heading', text: 'Virtualisation Done Right' },
      { type: 'paragraph', text: 'TanStack Virtual + React Window. Fixed-size vs dynamic measurement. IntersectionObserver for progressive loading. 100K+ row tables at 60fps.' },
      { type: 'heading', text: 'Server Components First' },
      { type: 'paragraph', text: 'Extract static data fetching to Server Components. Client boundaries only where interactivity required. Bundle size wins compound.' }
    ]
  },
  {
    _id: '3',
    slug: 'database-sharding-strategies',
    title: 'Database Sharding: When and How to Get It Right',
    excerpt: 'Vertical vs horizontal partitioning, consistent hashing, and production patterns from companies processing billions of writes daily.',
    author: 'Malik Muzzammil',
    category: 'Data Analytics',
    date: '2024-09-28',
    readTime: '14 min',
    status: 'published',
    content: [
      { type: 'heading', text: 'Sharding Isn\'t Scaling' },
      { type: 'paragraph', text: 'Sharding solves distribution, not scale. First optimize queries, indexes, caching. Shard only when single-node bottlenecks remain.' },
      { type: 'heading', text: 'Hash-Based vs Range Sharding' },
      { type: 'paragraph', text: 'Consistent hashing minimizes data movement on resharding. Range sharding better for inequality queries. Hybrid approaches win.' },
      { type: 'heading', text: 'Production Gotchas' },
      { type: 'paragraph', text: 'Hot shards kill performance. Monitor write throughput per shard. Cross-shard transactions require sagas or 2PC.' }
    ]
  },
  {
    _id: '4',
    slug: 'serverless-cost-optimization',
    title: 'Serverless Cost Optimization: $100K Annual Savings',
    excerpt: 'Real patterns from production systems. Provisioned concurrency vs warm starts, architectural decisions that saved 78% compute costs.',
    author: 'Kamran Aziz',
    category: 'Cloud Strategy',
    date: '2024-09-20',
    readTime: '11 min',
    status: 'published',
    content: [
      { type: 'heading', text: 'Cold Start Myths' },
      { type: 'paragraph', text: 'Custom runtimes reduce cold starts by 85%. ARM Graviton2 processors cut costs 20% with identical performance.' },
      { type: 'heading', text: 'Architectural Cost Wins' },
      { type: 'paragraph', text: 'Event-driven > request-response. Durable Objects for stateful coordination. Edge compute for latency-sensitive APIs.' }
    ]
  },
  {
    _id: '5',
    slug: 'type-safety-frontend',
    title: 'Type-Safe Frontend Architecture at Scale',
    excerpt: 'Zod + React Query + tRPC. Eliminating runtime errors entirely while maintaining DX.',
    author: 'Syed Raza',
    category: 'App Development',
    date: '2024-09-12',
    readTime: '8 min',
    status: 'published',
    content: [
      { type: 'heading', text: 'End-to-End Type Safety' },
      { type: 'paragraph', text: 'tRPC + Zod schemas + React Query. Backend changes instantly reflected in frontend. No more "works on my machine".' },
      { type: 'heading', text: 'Runtime Validation Patterns' },
      { type: 'paragraph', text: 'SuperRefine for complex validations. z.union() for API versioning. z.discriminatedUnion() for polymorphic responses.' }
    ]
  },
  {
    _id: '6',
    slug: 'observability-engineering',
    title: 'Observability Engineering: Beyond Three Pillars',
    excerpt: 'Distributed tracing, SLO engineering, and chaos practices that actually improve system reliability.',
    author: 'Malik Muzzammil',
    category: 'Security',
    date: '2024-09-05',
    readTime: '13 min',
    status: 'published',
    content: [
      { type: 'heading', text: 'SLO Engineering Framework' },
      { type: 'paragraph', text: 'Define error budgets. 99.9% availability = 43min downtime/month. Align on-call rotations with error budget consumption.' },
      { type: 'heading', text: 'Tracing at Scale' },
      { type: 'paragraph', text: 'OpenTelemetry + Jaeger. Sampling strategies. Head-based sampling for high-cardinality services.' }
    ]
  }
];

