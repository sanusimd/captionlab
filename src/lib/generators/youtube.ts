export interface YoutubeOptions {
  category: string; // 'tutorial' | 'vlog' | 'review' | 'listicle' | 'sensational'
  style: string; // 'clickworthy' | 'seo' | 'hype' | 'curiosity'
}

export interface GeneratedTitle {
  id: string;
  title: string;
}

const TEMPLATES: Record<
  string,
  Record<string, string[]>
> = {
  tutorial: {
    clickworthy: [
      "How to {topic} (Step-By-Step Guide For Beginners)",
      "The Easy Way to {topic} (No Experience Required!)",
      "Stop Doing This When You {topic}! 🛑",
      "How to {topic} Like a Pro in 2026",
      "I Tried to {topic} in 24 Hours (Here's How)"
    ],
    seo: [
      "How to {topic} - Complete Beginner Tutorial",
      "Learn {topic}: Step-by-Step Practical Guide",
      "{topic} Tutorial: How to Get Started Easily",
      "Best Practices for {topic} (2026 Guide)",
      "How to Set Up and Optimize {topic}"
    ],
    hype: [
      "The Ultimate Guide to {topic} You've Been Waiting For! 🔥",
      "Master {topic} INSTANTLY! (Secret Method Revealed)",
      "How to {topic} 10x Faster! ⚡",
      "The Only {topic} Tutorial You Will Ever Need!",
      "How to {topic} (Guaranteed Results!)"
    ]
  },
  vlog: {
    clickworthy: [
      "I Tried {topic} For 30 Days (Here's What Happened)",
      "This is Why I Started {topic}... (Honest Truth)",
      "My Secrets to {topic} (What They Don't Tell You)",
      "A Day in the Life: {topic} Edition",
      "What I Learned After {topic} For a Year"
    ],
    seo: [
      "My Experience with {topic}: A Daily Vlog",
      "How {topic} Changed My Daily Routine",
      "Tips for {topic} (My Personal Vlogging Journey)",
      "Why {topic} is Essential for Modern Creators",
      "Behind the Scenes: My {topic} Workflow"
    ],
    hype: [
      "I Spent $1,000 on {topic} (Was It Worth It?!) 💸",
      "The Crazy Truth About {topic}! 🤯",
      "How {topic} Completely Ruined My Schedule (In a Good Way)",
      "Doing {topic} For 24 Hours Straight!",
      "I Swore I'd Never Try {topic}... Until Now"
    ]
  },
  review: {
    clickworthy: [
      "Is {topic} Actually Worth It? (Honest Review)",
      "{topic} Review: Don't Buy Until You Watch This! 🛑",
      "The Truth About {topic} (Pros & Cons)",
      "I Tested {topic} So You Don't Have To",
      "Is {topic} a Scam or Legit?"
    ],
    seo: [
      "Detailed {topic} Review & Walkthrough",
      "{topic} Review 2026: Features, Specs, and Price",
      "Comparison: {topic} vs Competitors",
      "How to Choose the Best {topic} for Your Needs",
      "Is {topic} Worth the Money? (Full Breakdown)"
    ],
    hype: [
      "This {topic} is a Game-Changer! 🤯 (Full Review)",
      "Why Everyone is Obsessed with {topic}! 🔥",
      "Is This the Best {topic} of 2026?!",
      "This {topic} Changed Everything... 🚀",
      "Why I am Throwing Away My Old {topic}!"
    ]
  },
  listicle: {
    clickworthy: [
      "10 {topic} Secrets You Need To Know",
      "Top 5 {topic} Mistakes to Avoid in 2026",
      "7 {topic} Hacks That Feel Illegal to Know 🤫",
      "5 Signs You Need a New {topic}",
      "The Top 3 {topic} Tools Ranked"
    ],
    seo: [
      "Top 10 {topic} Tips for Better Results",
      "5 Common {topic} Problems and How to Fix Them",
      "Best {topic} Resources for Beginners",
      "10 Essential Tools for {topic}",
      "5 Steps to Optimize Your {topic}"
    ],
    hype: [
      "10 INSANE {topic} Hacks You Need to Try! 🔥",
      "Top 5 {topic} Trends That Will Explode in 2026!",
      "7 {topic} Secrets Only Professionals Use! 🤫",
      "10 {topic} Mistakes That Are Costing You Millions",
      "The Top 5 {topic} tools That Will Blow Your Mind!"
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

export function generateYoutubeTitles(
  topic: string,
  options: YoutubeOptions
): GeneratedTitle[] {
  const targetTopic = topic.trim() 
    ? capitalizeFirstLetter(topic.trim()) 
    : "Social Media Growth";
  
  const categoryTemplates = TEMPLATES[options.category] || TEMPLATES.tutorial;
  let templates = categoryTemplates[options.style] || categoryTemplates.clickworthy;
  
  // If we don't have templates for this style, fall back to clickworthy
  if (!templates || templates.length === 0) {
    templates = categoryTemplates.clickworthy || DEFAULT_TEMPLATES;
  }

  return templates.map((tpl, idx) => ({
    id: `yt_${Date.now()}_${idx}`,
    title: tpl.replace(/{topic}/g, targetTopic)
  }));
}
