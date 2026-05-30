// Client-side Instagram Caption Template Engine
export interface GeneratorOptions {
  tone: string;
  length: "short" | "medium" | "long";
  includeEmojis: boolean;
  includeCTA: boolean;
}

export interface GeneratedCaption {
  id: string;
  text: string;
  hashtags: string[];
}

// Data store of hooks, CTA formulas, and paragraph bridges based on tone
const TONE_DATA: Record<
  string,
  {
    hooks: string[];
    bodies: string[];
    ctas: string[];
  }
> = {
  excited: {
    hooks: [
      "🔥 The wait is officially OVER! 🚀",
      "🚨 Drop everything because you need to see this... 👇",
      "✨ Major news alert! We've been working on something huge... 🎉",
      "Wait, did someone say game-changer? Check this out! 👀👇",
      "BOOM! 💥 Here is exactly what you've been waiting for:"
    ],
    bodies: [
      "We've spent weeks perfecting this, and seeing it finally come to life is absolute magic. If you are ready to take your results to the next level, this is your sign.",
      "No more wasting time on setups that don't scale. We are opening the doors to a faster, smoother, and much more rewarding workflow starting today.",
      "Imagine having a system that does the heavy lifting for you while you focus on what you love. That is exactly what we created, and it is ready for you now."
    ],
    ctas: [
      "👉 Tap the link in our bio to grab yours before slots fill up! 🔗",
      "Drop a 'YES' below if you want early access sent straight to your DMs! 💬",
      "Let us know your thoughts in the comments—are you as hyped as we are? 👇"
    ]
  },
  professional: {
    hooks: [
      "How to optimize your content workflow (without adding extra overhead): 👇",
      "The strategic shift every modern creator needs to make today:",
      "We analyzed the top-performing social channels. Here is what we found:",
      "Efficiency isn't about working harder; it is about choosing the right tools. 📊",
      "An inside look at our core development and production roadmap:"
    ],
    bodies: [
      "Creating consistent high-quality output requires a blend of template structure and automation. By removing minor friction points in your daily layout, you unlock compound gains over time.",
      "We developed this solution with ease-of-use and professional output in mind. The goal is to provide a clean utility that fits directly into your existing dashboard workflow.",
      "As businesses scale, the demand for structured content increases. Establishing simple, localized systems ensures your team remains productive without API dependence."
    ],
    ctas: [
      "Learn more about our enterprise resources via the link in our bio.",
      "Share this post with a colleague who needs to streamline their operations.",
      "What is your biggest workflow bottleneck? Let's discuss in the comments."
    ]
  },
  funny: {
    hooks: [
      "I was going to write a normal post, but my coffee told me to post this instead. ☕",
      "My therapist said I need to share my thoughts. So here is a shameless plug: 👇",
      "Plot twist: this actually works. No, seriously. 🤯",
      "If you look closely, you can see me pretending to have everything together. 😂",
      "Rumor has it that reading this post increases your productivity by 400%. Just saying."
    ],
    bodies: [
      "We built this because we were tired of tools that require a PhD to run. Now you can do everything in one click and go back to scrolling cat videos.",
      "Some people spend hours designing systems. We spent ours coding it client-side so we could finish early and take a nap. Win-win.",
      "It is fast, it is shiny, and it won't steal your browser cookies. We think it's pretty neat, but our moms are our only active users so far."
    ],
    ctas: [
      "Click the bio link. Or don't. We aren't your boss. 😉",
      "Tag that one friend who is always complaining about their workload.",
      "Leave a comment. Any comment. Even a simple keyboard smash works."
    ]
  },
  minimalist: {
    hooks: [
      "Simplicity is the ultimate focus.",
      "Less planning. More creating.",
      "A clean workspace equals a clear mind. ✨",
      "Focus on the essentials.",
      "Keep it simple."
    ],
    bodies: [
      "We designed CaptionLab to be lightweight, fast, and distraction-free. Simply enter your keyword, get your copy, and move on.",
      "No accounts. No server queues. No friction. Just the tools you need to write copy instantly.",
      "Utility shouldn't be complicated. We focus on clean code and reliable output."
    ],
    ctas: [
      "Link in bio.",
      "Save this for your next project.",
      "Tell us: what are you creating today?"
    ]
  },
  witty: {
    hooks: [
      "Your competitors hope you ignore this post. 😉",
      "The best tools are the ones you actually use. Here's why:",
      "Let's be honest: your caption workflow is probably due for an upgrade.",
      "Not to brag, but we just made your content scheduling significantly easier.",
      "Why wait for APIs when local storage is right here?"
    ],
    bodies: [
      "We don't do fluff. We build direct utilities that output high-CTR hooks without asking for your credit card details or forcing a sign-in.",
      "Most copywriting products are just wrappers with monthly bills. We skipped the backend to give you instant, local utility.",
      "If you're still copy-pasting hashtags manually, we need to talk. Here is a better way to structure your caption tags."
    ],
    ctas: [
      "Ready to level up? Hit the link in our bio. 🔗",
      "Drop a comment if you're ready to ditch the credit limits.",
      "Double tap if this saved you a few minutes today."
    ]
  }
};

const DEFAULT_HASHTAGS = [
  "socialmedia", "contentcreator", "marketingtips", "solopreneur", "indiehacker",
  "instagramtips", "growthhacking", "copywriting", "creativelife", "startup",
  "businessgrowth", "workflow", "branding", "digitalmarketing", "marketingstrategy"
];

// Helper to get random items from array
function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate hashtags based on keyword matching
function generateHashtags(topic: string): string[] {
  const cleanedTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Custom tag matching
  const matchingTags = DEFAULT_HASHTAGS.filter(tag => 
    cleanedTopic.includes(tag) || tag.includes(cleanedTopic)
  );

  // Blend matching tags with random popular ones
  const finalTags = new Set<string>();
  
  matchingTags.forEach(tag => finalTags.add(tag));
  
  // Ensure we have at least 8 tags
  const fillerCount = 10 - finalTags.size;
  if (fillerCount > 0) {
    const fillers = getRandomItems(DEFAULT_HASHTAGS, fillerCount);
    fillers.forEach(tag => finalTags.add(tag));
  }

  // If topic has words, add them as tags
  const words = topic.split(/\s+/).filter(w => w.length > 3).map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ""));
  words.slice(0, 3).forEach(word => {
    if (word && word.length > 2) finalTags.add(word);
  });

  return Array.from(finalTags).slice(0, 12);
}

export function generateInstagramCaptions(
  topic: string,
  options: GeneratorOptions
): GeneratedCaption[] {
  const toneData = TONE_DATA[options.tone] || TONE_DATA.excited;
  const targetTopic = topic.trim() || "creating amazing content";
  const matchedHashtags = generateHashtags(targetTopic);

  // Generate 3 unique layouts
  const captions: GeneratedCaption[] = [];

  for (let i = 0; i < 3; i++) {
    const hook = getRandomItems(toneData.hooks, 1)[0];
    const body = getRandomItems(toneData.bodies, 1)[0];
    const cta = getRandomItems(toneData.ctas, 1)[0];

    let fullText = "";

    // Build based on layout types
    if (i === 0) {
      // Type 1: Hook -> Bridge -> Topic focus -> CTA
      fullText = `${hook}\n\n${body} Specifying: "${targetTopic}".\n\n${options.includeCTA ? cta : ""}`;
    } else if (i === 1) {
      // Type 2: Minimalist question -> Topic focus -> Action
      fullText = `Thinking about "${targetTopic}"? 🤔\n\n${body}\n\n${options.includeCTA ? "👇 Let me know:\n" + cta : ""}`;
    } else {
      // Type 3: Direct narrative -> Bulleted takeaways
      fullText = `Quick thoughts on ${targetTopic}:\n\n✅ Fast implementation leads to rapid learnings.\n✅ Quality output wins the feed algorithm.\n\n${body}\n\n${options.includeCTA ? cta : ""}`;
    }

    // Clean up Emojis if requested false
    if (!options.includeEmojis) {
      fullText = fullText.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/gu, "");
    }

    // Adjust length
    if (options.length === "short") {
      const paragraphs = fullText.split("\n\n");
      // Keep hook and CTA/conclusion, drop middle body
      fullText = paragraphs.length > 2 ? `${paragraphs[0]}\n\n${paragraphs[paragraphs.length - 1]}` : fullText;
    } else if (options.length === "long") {
      fullText += `\n\nRemember, consistency overrides intensity when compiling your social posts. Take action today!`;
    }

    captions.push({
      id: `insta_${Date.now()}_${i}`,
      text: fullText.trim(),
      hashtags: matchedHashtags
    });
  }

  return captions;
}
