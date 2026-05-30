export interface HashtagOptions {
  count: number; // 10 | 20 | 30
  strategy: "high" | "balanced" | "niche";
}

export interface GeneratedHashtags {
  tags: string[];
  highReach: string[];
  mediumReach: string[];
  nicheReach: string[];
}

const HASHTAG_BANK = {
  high: [
    "socialmedia", "trending", "explorepage", "viral", "marketing", "business", 
    "entrepreneur", "success", "motivation", "contentcreator", "love", "photooftheday",
    "instagood", "fashion", "beautiful", "art", "photography", "happy", "cute", "follow"
  ],
  medium: [
    "socialmediatips", "contentcreation", "marketingstrategy", "solopreneur", "indiehacker",
    "growthhacking", "brandingtips", "copywriting", "creativelife", "startuplife",
    "businessgrowth", "workflow", "digitalmarketingtips", "instagramgrowth", "seoexpert",
    "productivitytips", "hustlehard", "dailyroutine", "marketingagency", "creativestudio"
  ],
  niche: [
    "instagramcaptiontips", "youtubeseotutorial", "hashtagstrategies", "fancytextstyle",
    "blogtitlehooks", "indiecreatorhub", "microagencyowner", "clientfocusedbusiness",
    "workfromanywheresetup", "nocodemarketing", "localbrandingexperts", "creativecopywriters",
    "saasgrowthhacks", "solodeveloperlife", "creatorworkflows", "organicreachboost"
  ]
};

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateHashtags(
  topic: string,
  options: HashtagOptions
): GeneratedHashtags {
  const cleanedTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Custom tag seed matching based on topic keyword
  let topicSeeds: string[] = [];
  if (cleanedTopic) {
    // Generate some tags from words
    const words = topic.split(/\s+/).filter(w => w.length > 2);
    words.slice(0, 3).forEach(w => {
      const cleanW = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanW) {
        topicSeeds.push(cleanW);
        topicSeeds.push(`${cleanW}tips`);
        topicSeeds.push(`${cleanW}life`);
      }
    });
  }

  // Shuffle banks
  const highBank = shuffle(HASHTAG_BANK.high);
  const mediumBank = shuffle(HASHTAG_BANK.medium);
  const nicheBank = shuffle(HASHTAG_BANK.niche);

  // Allocate count based on strategy
  let highCount = 0;
  let mediumCount = 0;
  let nicheCount = 0;

  if (options.strategy === "high") {
    // High strategy: 60% High, 30% Medium, 10% Niche
    highCount = Math.round(options.count * 0.6);
    mediumCount = Math.round(options.count * 0.3);
    nicheCount = options.count - (highCount + mediumCount);
  } else if (options.strategy === "niche") {
    // Niche strategy: 10% High, 30% Medium, 60% Niche
    highCount = Math.round(options.count * 0.1);
    mediumCount = Math.round(options.count * 0.3);
    nicheCount = options.count - (highCount + mediumCount);
  } else {
    // Balanced strategy: 33% each
    highCount = Math.floor(options.count / 3);
    mediumCount = Math.floor(options.count / 3);
    nicheCount = options.count - (highCount + mediumCount);
  }

  // Draw items
  const highReach = highBank.slice(0, highCount);
  const mediumReach = mediumBank.slice(0, mediumCount);
  
  // Inject topic seeds into niche category
  const nicheReachSet = new Set<string>();
  topicSeeds.forEach(seed => {
    if (nicheReachSet.size < nicheCount) {
      nicheReachSet.add(seed);
    }
  });
  
  nicheBank.forEach(tag => {
    if (nicheReachSet.size < nicheCount) {
      nicheReachSet.add(tag);
    }
  });
  
  const nicheReach = Array.from(nicheReachSet);

  // Combine and sort
  const combined = shuffle([...highReach, ...mediumReach, ...nicheReach]);

  return {
    tags: combined,
    highReach,
    mediumReach,
    nicheReach
  };
}
