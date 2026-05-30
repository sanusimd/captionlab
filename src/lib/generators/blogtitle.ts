export interface BlogTitleOptions {
  audience: string; // 'beginners' | 'experts' | 'general'
  style: string; // 'howto' | 'listicle' | 'question' | 'guide'
}

export interface GeneratedBlogTitle {
  id: string;
  title: string;
}

const TEMPLATES: Record<
  string,
  Record<string, string[]>
> = {
  beginners: {
    howto: [
      "How to Start with {topic} (A Simple Step-by-Step Guide)",
      "How to {topic} for Beginners: The Absolute First Steps",
      "The Easy Way to Learn {topic} (Without Getting Confused)",
      "How to Master the Basics of {topic} in 5 Easy Steps",
      "Learn How to {topic} from Scratch (No Experience Needed)"
    ],
    listicle: [
      "10 Essential {topic} Tips for Complete Beginners",
      "5 Common {topic} Mistakes New Creators Make (And How to Avoid Them)",
      "The Top 7 {topic} Tools Every Beginner Needs",
      "5 Easy {topic} Hacks That Will Save You Hours",
      "10 Things I Wish I Knew Before Starting {topic}"
    ],
    question: [
      "What is {topic}? A Complete Beginner's Explanation",
      "Is {topic} Hard to Learn? (The Honest Truth for Beginners)",
      "Wondering How to Start {topic}? Read This First!",
      "Should You Try {topic} in 2026? (A Beginner's Breakdown)",
      "Why is {topic} Important? Everything You Need to Know"
    ],
    guide: [
      "The Ultimate Beginner's Guide to {topic} (2026 Edition)",
      "{topic} 101: Everything You Need to Know to Get Started",
      "A Complete Starter Kit to Mastering {topic}",
      "The No-Nonsense Guide to {topic} for Absolute Beginners",
      "Simplifying {topic}: A Step-by-Step Overview"
    ]
  },
  experts: {
    howto: [
      "How to Optimize Your {topic} Workflow for Maximum Output",
      "Advanced Techniques: How to Scale {topic} Efficiently",
      "How to Programmatically Automate Your {topic} Systems",
      "How to Leverage {topic} for High-Growth SEO Strategies",
      "How to Debug and Troubleshoot Advanced {topic} Failures"
    ],
    listicle: [
      "7 Advanced {topic} Strategies the Pros Keep Secret",
      "5 Hidden Features of {topic} You Aren't Using Yet",
      "10 {topic} KPIs You Should Be Tracking in 2026",
      "5 Enterprise-Level {topic} Frameworks You Need to Know",
      "Top 3 {topic} Optimization Tweaks for Better Conversions"
    ],
    question: [
      "Is Your {topic} Strategy Outdated? (How to Check)",
      "Why is Your {topic} Pipeline Slow? (Detailed Diagnostic)",
      "Should You Transition Your {topic} to Serverless Architecture?",
      "Are You Tracking the Right {topic} Performance Metrics?",
      "Can {topic} Automations Save Your Team 20+ Hours a Week?"
    ],
    guide: [
      "The Advanced Playbook for Optimizing {topic} Pipelines",
      "Beyond the Basics: An Expert Guide to Mastering {topic}",
      "The Complete {topic} Strategy Guide for SaaS Founders",
      "A Deep Dive Into Advanced {topic} Architectural Patterns",
      "The Modern CTO's Guide to Implementing {topic}"
    ]
  },
  general: {
    howto: [
      "How to Make {topic} Part of Your Daily Creative Routine",
      "How to Perfect Your {topic} Setup in Under 10 Minutes",
      "How to Explain {topic} to Anyone (Simple Analogy)",
      "How to Turn Your {topic} into a Profit Center",
      "How to Use {topic} to Drive 10x More Organic Traffic"
    ],
    listicle: [
      "10 {topic} Examples to Inspire Your Next Project",
      "5 Myths About {topic} You Need to Stop Believing",
      "Top 7 {topic} Trends to Watch for This Year",
      "5 Quick Ways to Level Up Your {topic} Today",
      "10 Surprising Statistics About {topic} (2026 Update)"
    ],
    question: [
      "What is the Future of {topic}? (Expert Predictions)",
      "Why is Everyone Talking About {topic} Right Now?",
      "Which {topic} Tool is Actually the Best? (Tested & Compared)",
      "How Can {topic} Increase Your Content Output?",
      "Is {topic} the Key to Better Engagement rates?"
    ],
    guide: [
      "The Definitive Guide to {topic} (Tips, Tricks & Secrets)",
      "{topic} Decoded: The Only Resource You Need to Read",
      "The Practical Guide to Understanding {topic} Easily",
      "Everything You Need to Know About {topic} (in 5 Minutes)",
      "A Quick Guide to Getting the Most Out of {topic}"
    ]
  }
};

const DEFAULT_TEMPLATES = [
  "How to Master {topic} in 10 Minutes",
  "The Ultimate {topic} Cheat Sheet",
  "What Nobody Tells You About {topic}",
  "Is {topic} Still Worth It in 2026?",
  "How to Get Started with {topic} Today"
];

function capitalizeFirstLetter(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function generateBlogTitles(
  topic: string,
  options: BlogTitleOptions
): GeneratedBlogTitle[] {
  const targetTopic = topic.trim() 
    ? capitalizeFirstLetter(topic.trim()) 
    : "Content Strategy";

  const audienceTemplates = TEMPLATES[options.audience] || TEMPLATES.general;
  let templates = audienceTemplates[options.style] || audienceTemplates.howto;

  // Fallback
  if (!templates || templates.length === 0) {
    templates = DEFAULT_TEMPLATES;
  }

  return templates.map((tpl, idx) => ({
    id: `blog_${Date.now()}_${idx}`,
    title: tpl.replace(/{topic}/g, targetTopic)
  }));
}
