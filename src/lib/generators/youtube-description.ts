export interface YoutubeDescriptionOptions {
  title: string;
  tone: string; // 'excited' | 'professional' | 'funny' | 'minimalist'
  includeTimestamps: boolean;
  ctaLink: string;
}

const TONE_BODIES: Record<string, { intro: string; mid: string; outro: string }> = {
  excited: {
    intro: "🔥 Welcome back! In this video, we are diving deep into {topic}! 🚀 If you want to master this and level up your skills, you are in the exact right place.",
    mid: "We spent hours crafting this video to ensure you get absolute value. We are unpacking the exact workflow, the hidden tips, and the complete strategies that you can apply immediately.",
    outro: "Leave a comment below with your thoughts—we read and reply to every single one! Let's get into it!"
  },
  professional: {
    intro: "This video provides a structured guide and analysis of {topic}. Our objective is to detail best practices, core concepts, and execution methods to optimize your workspace results.",
    mid: "We focus on actionable workflows and operational metrics. Whether you are scaling an existing operation or establishing new frameworks, this breakdown serves as a diagnostic template.",
    outro: "For further inquiries or professional discussions, feel free to comment below. Thank you for watching."
  },
  funny: {
    intro: "Yes, we are actually talking about {topic} today. No, I didn't lose a bet. 😂 Welcome! Grab a snack because we are breaking this down without making it boring.",
    mid: "I did all the testing, made all the embarrassing mistakes, and built this video so that you don't have to suffer through the same learning curves. You're welcome.",
    outro: "Hit that subscribe button—my editor says I need to reach my goals or they won't let me leave the room. See you in the comments!"
  },
  minimalist: {
    intro: "An essential breakdown of {topic}.",
    mid: "We cover key workflows, optimization tips, and core frameworks. Straight to the point, with no filler.",
    outro: "Subscribe for more lightweight guides."
  }
};

export function generateYoutubeDescription(
  topic: string,
  options: YoutubeDescriptionOptions
): string {
  const targetTopic = topic.trim() || "modern social creation";
  const toneData = TONE_BODIES[options.tone] || TONE_BODIES.excited;

  const introText = toneData.intro.replace(/{topic}/g, targetTopic);
  const midText = toneData.mid;
  const outroText = toneData.outro;

  let description = `${options.title ? `🎬 VIDEO TITLE: ${options.title}\n\n` : ""}`;
  description += `${introText}\n\n`;
  description += `${midText}\n\n`;

  if (options.ctaLink.trim()) {
    description += `👇 ACCESS RESOURCES & LINKS:\n🔗 ${options.ctaLink.trim()}\n\n`;
  } else {
    description += `👇 ACCESS RESOURCES & LINKS:\n🔗 [Insert your link here]\n\n`;
  }

  if (options.includeTimestamps) {
    description += `⏱️ TIMESTAMPS:\n`;
    description += `0:00 - Introduction & Hook\n`;
    description += `1:45 - The Core Concept of ${targetTopic}\n`;
    description += `4:20 - Step-by-Step Setup & Action\n`;
    description += `8:10 - Common Mistakes to Avoid\n`;
    description += `11:05 - Outro & Summary\n\n`;
  }

  description += `${outroText}\n\n`;
  description += `-------------------------------------------------\n`;
  description += `🔔 Subscribe for more social optimization guides: youtube.com/c/yourchannel\n`;
  description += `👥 Connect on Twitter/X: @yourhandle\n`;
  
  // Strip special chars from topic to make tag seeds
  const tagSeed = targetTopic.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15);
  description += `\n#${tagSeed || "socialmedia"} #contentcreator #youtube`;

  return description;
}
