export interface YoutubeTagOptions {
  category: string; // 'tech' | 'gaming' | 'vlog' | 'education' | 'marketing' | 'lifestyle'
  count: number; // 10 | 20 | 30
}

const TAG_BANK: Record<string, string[]> = {
  tech: [
    "tech", "technology", "techreview", "unboxing", "gadgets", "software", "developer", 
    "programming", "coding", "webdev", "ai", "hardware", "pctips", "setup", "futuretech"
  ],
  gaming: [
    "gaming", "gameplay", "gamer", "playthrough", "letsplay", "walkthrough", "speedrun", 
    "pcgaming", "consolegaming", "twitchstreamer", "gamingnews", "multiplayer", "multiplayergame"
  ],
  vlog: [
    "vlog", "dailyvlog", "travelvlog", "dayinthelife", "lifestyle", "storytime", 
    "personalvlog", "vloggerlife", "adventure", "routines", "weeklyvlog", "vlogs"
  ],
  education: [
    "education", "tutorial", "science", "history", "explaining", "learning", "tipsandtricks", 
    "edutok", "howtovideo", "studyhacks", "facts", "knowledge", "courses", "lectures"
  ],
  marketing: [
    "marketing", "business", "digitalmarketing", "seo", "growthhacking", "entrepreneur", 
    "startups", "finance", "investing", "socialmedia", "freelancing", "agency", "branding"
  ],
  lifestyle: [
    "lifestyle", "fashion", "fitness", "cooking", "recipes", "hacks", "organization", 
    "minimalism", "homedecor", "beauty", "travel", "productivity", "wellness", "diy"
  ]
};

const GLOBAL_SEEDS = [
  "youtube", "youtuber", "subscribe", "video", "viral", "trending", "contentcreator", "creator"
];

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateYoutubeTags(
  topic: string,
  options: YoutubeTagOptions
): string[] {
  const cleanedTopic = topic.toLowerCase().trim();
  const words = cleanedTopic.split(/\s+/).filter(w => w.length > 2).map(w => w.replace(/[^a-z0-9]/g, ""));
  
  const selectedBank = TAG_BANK[options.category] || TAG_BANK.tech;
  const combinedBank = [...selectedBank, ...GLOBAL_SEEDS];

  const generatedTags = new Set<string>();

  // 1. Add topic words as tags
  words.slice(0, 4).forEach(word => {
    if (word) {
      generatedTags.add(word);
      // Add variations
      if (options.category === "tech" || options.category === "education") {
        generatedTags.add(`${word}tutorial`);
      } else if (options.category === "vlog") {
        generatedTags.add(`${word}vlog`);
      } else {
        generatedTags.add(`${word}tips`);
      }
    }
  });

  // 2. Add composite tags (word combinations)
  if (words.length >= 2) {
    generatedTags.add(`${words[0]}${words[1]}`);
    if (words[2]) {
      generatedTags.add(`${words[0]}${words[2]}`);
    }
  }

  // 3. Fill up with selected category bank tags
  const shuffledBank = shuffle(combinedBank);
  shuffledBank.forEach(tag => {
    if (generatedTags.size < options.count) {
      generatedTags.add(tag);
    }
  });

  return Array.from(generatedTags).slice(0, options.count);
}
