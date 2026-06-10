export const profile = {
  name: "Mehul Dadlani",
  role: "Product Engineer",
  location: "Bangalore, India",
  email: "mehuldadlani13@gmail.com",
  phone: "+91 7976 884 108",
  github: "https://github.com/mehuldadlani",
  githubHandle: "github.com/mehuldadlani",
  linkedin: "https://www.linkedin.com/in/mehuldadlani/",
  linkedinHandle: "linkedin.com/in/mehuldadlani",
  current: "Klydo",
  // The one-line positioning.
  lead: "I build mobile products end to end.",
  sub: "Product engineer working across Flutter, backend, and the release train, with a Web3 and security spine. Currently shipping at 100K+ user scale.",
};

export const education = {
  school: "SRM University",
  degree: "B.Tech CS · Cyber Security",
  period: "2021 → 2025",
};

/* compact hero timeline (newest first) — months drive the gantt bars */
export const timeline = [
  { org: "Klydo", role: "Product Engineer", period: "2025 → Now", months: 9, live: true },
  { org: "Avex", role: "SDE", period: "2024 → 2025", months: 13, live: false },
  { org: "GoGlobally", role: "Flutter Dev", period: "2023", months: 5, live: false },
  { org: "SRM University", role: "B.Tech CSE", period: "2021 → 2025", months: 48, live: false },
];

export const stats = [
  { value: 100, prefix: "", suffix: "K+", decimals: 0, unit: "USERS", label: "app installs shipped to" },
  { value: 50, prefix: "", suffix: "+", decimals: 0, unit: "DEPLOYS", label: "production releases owned" },
  { value: 2, prefix: "$", suffix: "K+", decimals: 0, unit: "PRIZES", label: "won across hackathons" },
];

export type Work = {
  index: string;
  company: string;
  role: string;
  period: string;
  mode: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const work: Work[] = [
  {
    index: "01",
    company: "Klydo",
    role: "Product Engineer",
    period: "Oct 2025 - Now",
    mode: "Bangalore · Intern to Full-time",
    summary:
      "Own end-to-end product systems for a 100K+ install commerce app: a server-driven UI framework, full-stack features, and the entire release train.",
    points: [
      "Architected an SDUI framework in Flutter (STAC) that renders order, cart, search, and feed screens from backend JSON, cutting layout and campaign ship time from weeks to hours with no app-store release.",
      "Shipped 5+ full-stack features (backend, admin console, Flutter): config-driven category-tree navigation, a spoof-resistant Mixpanel analytics proxy with per-user auth tokens, recommendation rails, and audience-targeted feed and search campaigns.",
      "Owned the release train: Shorebird code-push plus a GitHub Actions CI/CD pipeline across 50+ production releases with store-review-free OTA hotfixes.",
    ],
    stack: ["Flutter", "STAC", "Shorebird", "GitHub Actions", "Mixpanel"],
  },
  {
    index: "02",
    company: "Avex",
    role: "Software Development Engineer",
    period: "Jun 2024 - Jul 2025",
    mode: "Remote · Intern to Full-time",
    summary:
      "Built decentralized-identity and real-time data features for a DeFi mobile app.",
    points: [
      "Integrated decentralized identity (DID) into a DeFi mobile app in Flutter and Dart, letting users securely manage 5+ asset types and lifting platform engagement by 30%.",
      "Optimized real-time data by wiring GraphQL APIs into core Flutter libraries, bringing load times on key features under 2 seconds.",
    ],
    stack: ["Flutter", "Dart", "GraphQL", "DID", "DeFi"],
  },
  {
    index: "03",
    company: "GoGlobally",
    role: "Flutter Developer",
    period: "Aug 2023 - Dec 2023",
    mode: "Remote · Internship",
    summary:
      "Built features and backend infrastructure for an AI mood-analysis app.",
    points: [
      "Built 10+ features for 'Soul: AI Mood Analyser' with a distributed team, raising overall user interaction rates by ~40%.",
      "Integrated Firebase for authentication, cloud messaging, and real-time updates, improving UX and cutting server response time by 50%.",
    ],
    stack: ["Flutter", "Firebase", "Cloud Messaging"],
  },
];

export type Pillar = {
  title: string;
  tag: string;
  body: string;
  proof: string[];
};

export const pillars: Pillar[] = [
  {
    title: "Mobile",
    tag: "flutter / dart",
    body: "Flutter end to end: SDUI architecture, clean architecture, and the CI/CD release train behind a 100K+ install app.",
    proof: ["SDUI with STAC", "Riverpod · Dio · GoRouter", "Shorebird OTA"],
  },
  {
    title: "Web3",
    tag: "solidity / defi",
    body: "Shipped DeFi and decentralized-identity features in production, and a habit of winning crypto hackathons on the side.",
    proof: ["DID + 5 asset types", "Solidity", "Unfold · ETHIndia winner"],
  },
  {
    title: "Security",
    tag: "appsec / crypto",
    body: "A Cyber Security degree that shows up in the work: spoof-resistant analytics, auth tokens, and a CTF placement.",
    proof: ["Spoof-resistant proxy", "Cryptography", "Cyber Delta CTF"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Research Assistant",
    blurb:
      "An AI-powered academic profile analyzer: a FastAPI backend and a Flutter app, with CrewAI and ChromaDB driving research analysis, real-time visualization, and multi-level academic summaries.",
    stack: ["FastAPI", "Flutter", "CrewAI", "ChromaDB"],
    links: [{ label: "GitHub", href: "https://github.com/mehuldadlani" }],
  },
  {
    name: "Xfinitive",
    blurb:
      "A Bluetooth IoT app that detects hand motion and delivers real-time alerts to family. 90% of elderly users reported better medication adherence and less anxiety.",
    stack: ["Flutter", "BLE", "IoT"],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.xfinitive",
      },
      { label: "App Store", href: "https://apps.apple.com/" },
    ],
  },
];

export const repos = [
  { name: "GateBounty", lang: "Dart" },
  { name: "DAO-Com", lang: "Dart" },
  { name: "Twitt3r", lang: "C++" },
  { name: "Firebase-Authentication", lang: "Dart" },
];

export type Award = {
  place: string;
  title: string;
  event: string;
};

export const awards: Award[] = [
  { place: "1st", title: "$1,000 prize", event: "Unfold 2023, by CoinDCX" },
  { place: "3rd", title: "Router track", event: "5ireChain" },
  { place: "Win", title: "$500 prize", event: "Mozo Hack" },
  { place: "Win", title: "$500, Quantitative Voting", event: "ETHIndia" },
  { place: "2nd", title: "Capture The Flag", event: "Cyber Delta CTF" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C", "C++", "Solidity", "Dart", "SQL", "JS"],
  },
  {
    group: "Mobile",
    items: [
      "Flutter",
      "Riverpod",
      "Dio",
      "GoRouter",
      "Stac (SDUI)",
      "Shorebird",
      "Firebase",
    ],
  },
  {
    group: "Backend & Data",
    items: [
      "FastAPI",
      "Flask",
      "Node / Express",
      "PostgreSQL",
      "Supabase",
      "GraphQL",
      "ChromaDB",
    ],
  },
  {
    group: "Tooling & Security",
    items: [
      "AWS",
      "Docker",
      "GitHub Actions",
      "Mixpanel",
      "Sentry",
      "Cryptography",
    ],
  },
];
