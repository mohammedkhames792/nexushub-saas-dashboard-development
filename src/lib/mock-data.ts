import type { User, Post, Job, Article, Notification } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'mohamed-khamis',
    name: 'Mohamed Khamis',
    title: 'Senior Front-End Developer',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mohamed&backgroundColor=b6e3f4',
    coverPhoto: 'https://images.unsplash.com/photo-1451187585362-daf0f0fa6d6b?w=1200&h=400&fit=crop',
    bio: 'Passionate front-end architect specializing in React, Next.js, and TypeScript. Building next-gen web experiences with a focus on performance, accessibility, and stunning UI/UX. Open source contributor and tech community speaker.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Figma', 'AWS'],
    badges: [
      { id: 'b1', name: 'Next.js Wizard', icon: '⚡', color: 'bg-black text-white' },
      { id: 'b2', name: 'TypeScript Ninja', icon: '🥷', color: 'bg-blue-600 text-white' },
      { id: 'b3', name: 'Open Source Hero', icon: '🦸', color: 'bg-purple-600 text-white' },
      { id: 'b4', name: 'UI/UX Expert', icon: '🎨', color: 'bg-pink-600 text-white' },
    ],
    projects: [
      { id: 'p1', title: 'DevIn Platform', description: 'A next-gen developer ecosystem and command center.', tech: ['Next.js', 'TypeScript', 'Tailwind'], liveUrl: '#', githubUrl: '#', image: '' },
      { id: 'p2', title: 'AI Code Reviewer', description: 'AI-powered code review tool for PRs.', tech: ['React', 'Python', 'OpenAI'], liveUrl: '#', githubUrl: '#', image: '' },
      { id: 'p3', title: 'Real-Time Collab Editor', description: 'Multiplayer code editor with CRDT sync.', tech: ['Next.js', 'Y.js', 'WebSocket'], liveUrl: '#', githubUrl: '#', image: '' },
    ],
    openToWork: true,
    location: 'Cairo, Egypt',
    company: 'TechCorp Inc.',
    connections: 1247,
    postsCount: 89,
    online: true,
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Full-Stack Engineer at Stripe',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfbf',
    coverPhoto: 'https://images.unsplash.com/photo-1504384308060-c2957c880021?w=1200&h=400&fit=crop',
    bio: 'Full-stack engineer passionate about scalable distributed systems and developer tooling. Building the future of payments infrastructure.',
    skills: ['Go', 'React', 'PostgreSQL', 'Kubernetes', 'gRPC'],
    badges: [
      { id: 'b5', name: 'Go Master', icon: '🔵', color: 'bg-cyan-600 text-white' },
      { id: 'b6', name: 'System Design Pro', icon: '🏗️', color: 'bg-orange-600 text-white' },
    ],
    projects: [
      { id: 'p4', title: 'Payment Gateway', description: 'High-throughput payment processing system.', tech: ['Go', 'gRPC', 'K8s'], liveUrl: '#', githubUrl: '#', image: '' },
    ],
    openToWork: false,
    location: 'San Francisco, CA',
    company: 'Stripe',
    connections: 892,
    postsCount: 45,
    online: true,
  },
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    title: 'DevOps Lead | Cloud Architect',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=c0aede',
    coverPhoto: 'https://images.unsplash.com/photo-1558490249-1f1a29f1c614?w=1200&h=400&fit=crop',
    bio: 'Infrastructure as code enthusiast. Kubernetes, Terraform, and AWS are my playground. Making deployments boring since 2019.',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'Python'],
    badges: [
      { id: 'b7', name: 'Cloud Guru', icon: '☁️', color: 'bg-sky-600 text-white' },
      { id: 'b8', name: 'K8s Expert', icon: '🚢', color: 'bg-indigo-600 text-white' },
    ],
    projects: [
      { id: 'p5', title: 'AutoDeploy', description: 'Zero-downtime deployment automation tool.', tech: ['Terraform', 'Go', 'AWS'], liveUrl: '#', githubUrl: '#', image: '' },
    ],
    openToWork: false,
    location: 'Austin, TX',
    company: 'HashiCorp',
    connections: 634,
    postsCount: 32,
    online: false,
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'ML Engineer | Research Scientist',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=d1d4f9',
    coverPhoto: 'https://images.unsplash.com/photo-1485827404703-89b2f4a0ca33?w=1200&h=400&fit=crop',
    bio: 'Bridging the gap between research and production ML. Working on large language models and their applications in developer tools.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'MLOps', 'Rust'],
    badges: [
      { id: 'b9', name: 'AI Pioneer', icon: '🤖', color: 'bg-emerald-600 text-white' },
      { id: 'b10', name: 'Research Star', icon: '⭐', color: 'bg-amber-500 text-white' },
    ],
    projects: [
      { id: 'p6', title: 'CodeLlama Fine-tuner', description: 'Toolkit for fine-tuning code LLMs.', tech: ['Python', 'PyTorch', 'HuggingFace'], liveUrl: '#', githubUrl: '#', image: '' },
    ],
    openToWork: true,
    location: 'Bangalore, India',
    company: 'Google DeepMind',
    connections: 2103,
    postsCount: 67,
    online: true,
  },
  {
    id: 'james-wright',
    name: 'James Wright',
    title: 'iOS & React Native Developer',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=James&backgroundColor=ffd5dc',
    coverPhoto: 'https://images.unsplash.com/photo-1519389940435-ed07e8c0a946?w=1200&h=400&fit=crop',
    bio: 'Crafting beautiful mobile experiences. SwiftUI by day, React Native by night. Advocate for accessible mobile design.',
    skills: ['Swift', 'React Native', 'SwiftUI', 'Kotlin', 'Figma'],
    badges: [
      { id: 'b11', name: 'Mobile Maestro', icon: '📱', color: 'bg-violet-600 text-white' },
    ],
    projects: [],
    openToWork: false,
    location: 'London, UK',
    company: 'Revolut',
    connections: 456,
    postsCount: 18,
    online: false,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'mohamed-khamis',
    content: `🚀 Just shipped a massive feature: **VS Code-style code snippets** right inside our social feed!\n\nNow developers can share code with proper syntax highlighting, line numbers, and one-click copy. Here's a sneak peek:`,
    codeBlock: {
      language: 'typescript',
      code: `// Next.js App Router - Server Component
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  
  if (!user) notFound();
  return <ProfileView user={user} />;
}`,
    },
    createdAt: '2024-12-15T10:30:00Z',
    reactions: { like: 42, celebrate: 18, support: 7, insightful: 31 },
    userReaction: null,
    comments: [
      { id: 'c1', authorId: 'sarah-chen', content: 'This is incredible! The line numbers are a game-changer for code sharing.', createdAt: '2024-12-15T11:00:00Z' },
      { id: 'c2', authorId: 'alex-rivera', content: 'Finally! No more screenshotting code. 🎉', createdAt: '2024-12-15T11:15:00Z' },
    ],
    saved: false,
    hidden: false,
    reported: false,
  },
  {
    id: 'post-2',
    authorId: 'sarah-chen',
    content: `💡 Hot take: The best code is the code you never have to write.\n\nSpent this week deleting 3,000 lines of legacy code by leveraging PostgreSQL's native JSON operations instead of our custom Node.js transformation layer.\n\nResult: 40% faster API responses, 60% less infrastructure cost.\n\nSometimes the most impactful PR is a deletion.`,
    createdAt: '2024-12-14T14:20:00Z',
    reactions: { like: 89, celebrate: 34, support: 12, insightful: 56 },
    userReaction: 'like',
    comments: [
      { id: 'c3', authorId: 'mohamed-khamis', content: 'This! I\'ve been saying this for years. Delete code, ship faster. 💪', createdAt: '2024-12-14T15:00:00Z' },
    ],
    saved: true,
    hidden: false,
    reported: false,
  },
  {
    id: 'post-3',
    authorId: 'priya-sharma',
    content: `🤖 Announcing my new open-source project: **PromptForge** — a visual prompt engineering playground for developers.\n\nFeatures:\n• Side-by-side prompt comparison\n• Token usage analytics in real-time\n• Version control for prompts\n• One-click deployment to OpenAI/Anthropic APIs\n\nBuilt with Next.js 14, Drizzle ORM, and the new AI SDK. Check it out!`,
    codeBlock: {
      language: 'typescript',
      code: `// Prompt version control with Drizzle
export const promptVersions = pgTable('prompt_versions', {
  id: uuid('id').primaryKey().defaultRandom(),
  promptId: uuid('prompt_id').references(prompts.id),
  version: integer('version').notNull(),
  content: text('content').notNull(),
  tokenCount: integer('token_count'),
  createdAt: timestamp('created_at').defaultNow(),
});`,
    },
    createdAt: '2024-12-13T09:45:00Z',
    reactions: { like: 156, celebrate: 72, support: 23, insightful: 98 },
    userReaction: null,
    comments: [],
    saved: false,
    hidden: false,
    reported: false,
  },
  {
    id: 'post-4',
    authorId: 'alex-rivera',
    content: `🛠️ Infrastructure update: We just migrated our entire CI/CD pipeline from Jenkins to GitHub Actions.\n\nWhat used to take 45 minutes now takes 12. The developer experience improvement alone was worth it.\n\nKey changes:\n- Matrix builds for parallel testing\n- Reusable workflows across 30+ repos\n- Ephemeral environments for every PR\n\nSometimes the best infrastructure investment is simplifying your toolchain.`,
    createdAt: '2024-12-12T16:30:00Z',
    reactions: { like: 67, celebrate: 15, support: 28, insightful: 41 },
    userReaction: null,
    comments: [
      { id: 'c4', authorId: 'james-wright', content: 'We did the same migration last quarter. The speed improvement is insane!', createdAt: '2024-12-12T17:00:00Z' },
    ],
    saved: false,
    hidden: false,
    reported: false,
  },
  {
    id: 'post-5',
    authorId: 'james-wright',
    content: `📱 SwiftUI Tip: Use the new @Observable macro instead of ObservableObject for your view models.\n\nIt's 2x faster at change tracking and eliminates the need for @Published property wrappers. Here's the migration:`,
    codeBlock: {
      language: 'swift',
      code: `// Before: ObservableObject
class ProfileViewModel: ObservableObject {
  @Published var user: User?
  @Published var isLoading = false
}

// After: @Observable (Swift 5.9+)
@Observable
class ProfileViewModel {
  var user: User?
  var isLoading = false
}`,
    },
    createdAt: '2024-12-11T08:15:00Z',
    reactions: { like: 34, celebrate: 8, support: 5, insightful: 22 },
    userReaction: null,
    comments: [],
    saved: false,
    hidden: false,
    reported: false,
  },
];

export const MOCK_JOBS: Job[] = [
  { id: 'job-1', title: 'Senior Front-End Engineer', company: 'Vercel', logo: '▲', location: 'Remote', type: 'Full-time', salary: '$150K - $220K', tech: ['React', 'Next.js', 'TypeScript'], description: 'Build the future of web deployment infrastructure. Work on Next.js core and Vercel platform features.', postedAt: '2024-12-15' },
  { id: 'job-2', title: 'Full-Stack Developer', company: 'Stripe', logo: 'S', location: 'San Francisco, CA', type: 'Full-time', salary: '$180K - $260K', tech: ['React', 'Go', 'Ruby'], description: 'Help build the economic infrastructure of the internet. Work on payment processing and developer APIs.', postedAt: '2024-12-14' },
  { id: 'job-3', title: 'Platform Engineer', company: 'Cloudflare', logo: '☁️', location: 'Remote', type: 'Full-time', salary: '$140K - $200K', tech: ['Rust', 'Go', 'C++'], description: 'Work on edge computing infrastructure serving millions of requests per second.', postedAt: '2024-12-13' },
  { id: 'job-4', title: 'ML Infrastructure Engineer', company: 'Anthropic', logo: 'A', location: 'San Francisco, CA', type: 'Full-time', salary: '$200K - $350K', tech: ['Python', 'PyTorch', 'CUDA'], description: 'Build the infrastructure that trains and serves large language models at scale.', postedAt: '2024-12-12' },
  { id: 'job-5', title: 'Senior iOS Developer', company: 'Revolut', logo: 'R', location: 'London, UK', type: 'Full-time', salary: '£90K - £140K', tech: ['Swift', 'SwiftUI', 'UIKit'], description: 'Build world-class banking experiences for millions of users across Europe.', postedAt: '2024-12-11' },
  { id: 'job-6', title: 'DevOps Engineer', company: 'Datadog', logo: 'D', location: 'New York, NY', type: 'Full-time', salary: '$160K - $240K', tech: ['Kubernetes', 'Terraform', 'AWS'], description: 'Scale monitoring infrastructure handling trillions of data points per day.', postedAt: '2024-12-10' },
  { id: 'job-7', title: 'React Native Developer', company: 'Shopify', logo: '🛍️', location: 'Remote', type: 'Contract', salary: '$120K - $180K', tech: ['React Native', 'TypeScript', 'GraphQL'], description: 'Build mobile commerce experiences powering millions of merchants worldwide.', postedAt: '2024-12-09' },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Complete Guide to Next.js 14 Server Components',
    authorId: 'mohamed-khamis',
    excerpt: 'Deep dive into React Server Components, streaming, and the new App Router patterns that will change how you build web apps.',
    content: `# The Complete Guide to Next.js 14 Server Components\n\nServer Components represent a paradigm shift in how we think about React applications. Instead of every component rendering on the client, Server Components execute on the server and send rendered HTML to the client.\n\n## Why Server Components Matter\n\nThe key insight is that Server Components allow us to:\n\n1. **Access backend resources directly** — No need for API routes just to fetch data\n2. **Reduce client-side JavaScript** — Components don't ship to the browser\n3. **Improve initial page load** — Server-rendered HTML streams to the client\n\n## The Mental Model\n\nThink of your component tree as having two types of nodes:\n\n- **Server Components** — Default in App Router. Can be async, access DB, read files.\n- **Client Components** — Opt-in with "use client". Handle interactivity, state, effects.\n\n## Practical Example\n\nWhen building a profile page, the data fetching happens on the server while interactive elements like "Follow" buttons are client components.\n\nThis architecture dramatically reduces the JavaScript shipped to the client while maintaining rich interactivity exactly where it's needed.`,
    coverImage: 'https://images.unsplash.com/photo-1555069932-67f1b0099a2b?w=800&h=400&fit=crop',
    readTime: '12 min',
    createdAt: '2024-12-15',
    tags: ['Next.js', 'React', 'Server Components'],
    claps: 342,
  },
  {
    id: 'art-2',
    title: 'Building Scalable ML Infrastructure at Google Scale',
    authorId: 'priya-sharma',
    excerpt: 'Lessons learned from training and serving large language models across thousands of GPUs.',
    content: `# Building Scalable ML Infrastructure\n\nTraining large language models at scale requires a fundamentally different approach to infrastructure than traditional web applications.\n\n## The Challenge\n\nWhen you're distributing training across 4,000+ GPUs, every millisecond of communication overhead matters. The infrastructure becomes as important as the model architecture.\n\n## Key Principles\n\n1. **Pipeline parallelism** over simple data parallelism\n2. **Gradient accumulation** to simulate larger batch sizes\n3. **Mixed precision training** for memory efficiency\n4. **Checkpointing every N steps** to handle preemptions\n\n## Infrastructure Stack\n\nOur training infrastructure relies on custom-built GPU clusters with high-bandwidth interconnects, orchestrated by Kubernetes with custom schedulers that understand GPU topology.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-1b3e3c5c5a0d?w=800&h=400&fit=crop',
    readTime: '18 min',
    createdAt: '2024-12-13',
    tags: ['Machine Learning', 'Infrastructure', 'MLOps'],
    claps: 567,
  },
  {
    id: 'art-3',
    title: 'Zero-Downtime Deployments: A Practical Guide',
    authorId: 'alex-rivera',
    excerpt: 'How we achieved true zero-downtime deployments across 200+ microservices using canary releases and feature flags.',
    content: `# Zero-Downtime Deployments\n\nDeploying without downtime isn't just about blue-green deployments anymore. Modern systems require more sophisticated approaches.\n\n## The Strategy\n\nWe combine three techniques:\n\n1. **Canary Releases** — Route 5% traffic to new version\n2. **Feature Flags** — Decouple deployment from release\n3. **Automated Rollback** — If error rate > 0.1%, auto-rollback\n\n## Implementation\n\nThe key is having robust health checks and metrics that can detect degradation within seconds, not minutes. We use a combination of application-level metrics and synthetic monitoring.`,
    coverImage: 'https://images.unsplash.com/photo-1667372393089-0a25e9444348?w=800&h=400&fit=crop',
    readTime: '15 min',
    createdAt: '2024-12-11',
    tags: ['DevOps', 'Deployment', 'Kubernetes'],
    claps: 234,
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', fromUserId: 'sarah-chen', content: 'liked your post about VS Code code snippets', createdAt: '2024-12-15T12:00:00Z', read: false },
  { id: 'n2', type: 'comment', fromUserId: 'alex-rivera', content: 'commented on your post: "Great insight on Server Components!"', createdAt: '2024-12-15T11:30:00Z', read: false },
  { id: 'n3', type: 'connection', fromUserId: 'priya-sharma', content: 'wants to connect with you', createdAt: '2024-12-14T09:00:00Z', read: false },
  { id: 'n4', type: 'mention', fromUserId: 'james-wright', content: 'mentioned you in a post about React Native', createdAt: '2024-12-13T16:00:00Z', read: true },
  { id: 'n5', type: 'job', fromUserId: 'sarah-chen', content: 'shared a job opportunity at Stripe', createdAt: '2024-12-12T10:00:00Z', read: true },
  { id: 'n6', type: 'like', fromUserId: 'priya-sharma', content: 'celebrated your achievement: 1000 connections!', createdAt: '2024-12-11T08:00:00Z', read: true },
];
