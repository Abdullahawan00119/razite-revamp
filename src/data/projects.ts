export interface ProjectData {
  _id: string;
  slug: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  image: string;
  highlights?: string[];
  challenge?: string;
  solution?: string;
  outcome?: string;
  client?: string;
  year?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    _id: '1',
    slug: 'ecommerce-platform',
    title: 'Enterprise E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, advanced checkout flows, and multi-region scalability for global retail operations.',
    projectType: 'Web Development',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['99.99% uptime', '50K+ concurrent users', 'Multi-currency support'],
    challenge: 'Legacy monolithic system needed migration to microservices with zero downtime. Complex inventory sync across 15 warehouses.',
    solution: 'Phased migration using Next.js + Node.js microservices. Redis caching for real-time inventory. Stripe Connect for multi-vendor payments. AWS ECS for orchestration.',
    outcome: 'Reduced cart abandonment by 42%. Handled Black Friday peak of 85K concurrent users. 3x faster checkout flow.',
    client: 'Global Retail Inc.',
    year: '2024',
    liveUrl: 'https://ecommerce.example.com'
  },
  {
    _id: '2',
    slug: 'fintech-dashboard',
    title: 'Real-Time FinTech Analytics Dashboard',
    description: 'Interactive dashboard with WebSocket streaming, predictive analytics, and regulatory compliance reporting for financial institutions.',
    projectType: 'Data Analytics',
    technologies: ['React', 'TypeScript', 'D3.js', 'WebSockets', 'MongoDB', 'Kafka'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['Real-time data', 'SOC2 compliant', 'Mobile responsive'],
    challenge: 'Process 1M+ transactions/min with sub-500ms latency. Ensure financial data security and audit trails.',
    solution: 'React dashboard with D3 visualizations. Kafka for event streaming. MongoDB time-series. WebSocket bi-directional updates.',
    outcome: 'Reduced reporting time from 2hrs to 30s. 100% audit compliance. 25% increase in user engagement.',
    client: 'SecureFin Tech',
    year: '2023'
  },
  {
    _id: '3',
    slug: 'saas-hr-platform',
    title: 'SaaS HR Management Platform',
    description: 'Scalable HR platform with employee self-service, AI-driven onboarding, and advanced analytics for enterprise teams.',
    projectType: 'Cloud Migration',
    technologies: ['Vue.js', 'Django', 'AWS Lambda', 'Elasticsearch', 'Docker'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['AI matching', 'Zero trust security', 'Multi-tenant'],
    challenge: 'Onboard 10K+ employees across 50+ global offices with role-based access and compliance requirements.',
    solution: 'Vue.js frontend with Django REST API. AWS serverless architecture. Elasticsearch for employee search. Multi-tenant Docker containers.',
    outcome: 'Onboarding time reduced by 67%. 99.8% system availability. Processed 500K+ HR actions/month.',
    client: 'GlobalCorp HR',
    year: '2024'
  },
  {
    _id: '4',
    slug: 'mobile-fitness-app',
    title: 'AI-Powered Fitness Tracking App',
    description: 'Cross-platform mobile app with computer vision form analysis, personalized workout generation, and social challenges.',
    projectType: 'Mobile App',
    technologies: ['React Native', 'TensorFlow Lite', 'Firebase', 'Expo', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['Computer vision', 'Offline sync', 'Social features'],
    challenge: 'Accurate exercise form detection on mobile devices with varying lighting/camera quality. Offline functionality required.',
    solution: 'React Native with TensorFlow Lite for on-device ML. Firebase for sync and auth. GraphQL subscriptions for real-time challenges.',
    outcome: '95% form detection accuracy. 250K+ downloads in 6 months. 40% user retention improvement.',
    year: '2023'
  },
  {
    _id: '5',
    slug: 'blockchain-supplychain',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Decentralized supply chain visibility platform with smart contracts, IoT integration, and tamper-proof audit trails.',
    projectType: 'AI/ML',
    technologies: ['Solidity', 'React', 'IPFS', 'Polygon', 'Node-RED'],
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76fdd7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['Smart contracts', 'IoT integration', 'Zero-knowledge proofs'],
    challenge: 'Real-time tracking across 5 continents with immutable audit trails for regulatory compliance.',
    solution: 'Polygon blockchain with Solidity contracts. IPFS for document storage. Node-RED for IoT orchestration.',
    outcome: 'Reduced fraud by 89%. End-to-end visibility reduced disputes by 75%. Processed 2M+ shipments.',
    client: 'Global Logistics Co.',
    year: '2024'
  },
  {
    _id: '6',
    slug: 'edtech-platform',
    title: 'Interactive EdTech Learning Platform',
    description: 'Adaptive learning platform with gamification, real-time collaboration, and personalized curriculum generation.',
    projectType: 'Web Development',
    technologies: ['SvelteKit', 'Prisma', 'WebRTC', 'Three.js', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['Real-time collab', 'Gamification', 'VR previews'],
    challenge: 'Engage 100K+ students with personalized learning paths and live collaboration features.',
    solution: 'SvelteKit with WebRTC peer-to-peer. Prisma ORM with Supabase. Three.js for interactive 3D previews.',
    outcome: '85% completion rate vs industry 30%. Reduced dropout by 62%. Scaled to 50K concurrent users.',
    year: '2023'
  },
  {
    _id: '7',
    slug: 'healthcare-analytics',
    title: 'Healthcare Predictive Analytics',
    description: 'ML-powered patient risk prediction and resource allocation platform for hospital networks.',
    projectType: 'Data Analytics',
    technologies: ['Python', 'FastAPI', 'XGBoost', 'Snowflake', 'Tableau'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['95% prediction accuracy', 'HIPAA compliant', 'Real-time alerts'],
    challenge: 'Predict patient readmissions with 15%+ accuracy improvement using fragmented hospital data.',
    solution: 'XGBoost ensemble models with FastAPI serving. Snowflake data warehouse. Tableau dashboards.',
    outcome: 'Reduced readmissions by 28%. Saved $2.4M in first year. 92% clinician adoption.',
    client: 'HealthNet Hospitals',
    year: '2024'
  },
  {
    _id: '8',
    slug: 'logistics-optimizer',
    title: 'AI Route Optimization Engine',
    description: 'Real-time logistics optimization with dynamic pricing, fleet management, and carbon footprint tracking.',
    projectType: 'AI/ML',
    technologies: ['Go', 'OR-Tools', 'Kubernetes', 'PostgreSQL', 'RabbitMQ'],
    image: 'https://images.unsplash.com/photo-1559526325-9e255d7a8665?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    highlights: ['15% fuel savings', 'Real-time rerouting', 'Carbon tracking'],
    challenge: 'Optimize 10K+ daily deliveries across 200 vehicles with traffic, weather, and demand variability.',
    solution: 'Go microservices with OR-Tools optimization. Kubernetes autoscaling. RabbitMQ event bus.',
    outcome: '18.7% cost reduction. 22% faster deliveries. 14% lower emissions.',
    year: '2023'
  }
];

