"use server";

import { z } from "zod";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

// Import existing fallback generators
import { generateInstagramCaptions } from "@/lib/generators/instagram";
import { generateYoutubeTitles } from "@/lib/generators/youtube";
import { generateHashtags } from "@/lib/generators/hashtag";
import { generateBlogTitles } from "@/lib/generators/blogtitle";

// Choose AI engine based on available keys, prioritizing Anthropic Claude
function getLanguageModel() {
  if (process.env.ANTHROPIC_API_KEY) {
    return anthropic("claude-3-5-haiku-latest");
  } else if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }
  return null;
}

// -------------------------------------------------------------
// 1. Instagram Caption Generator Action
// -------------------------------------------------------------
const instagramOptionsSchema = z.object({
  tone: z.string(),
  length: z.enum(["short", "medium", "long"]),
  includeEmojis: z.boolean(),
  includeCTA: z.boolean(),
});

export async function generateInstagramCaptionsAction(
  topic: string,
  options: z.infer<typeof instagramOptionsSchema>
) {
  const model = getLanguageModel();

  if (!model) {
    // Fall back to template generator
    const results = generateInstagramCaptions(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Write 3 unique, high-CTR, scroll-stopping Instagram caption variations about: "${topic}".
    
    Tone of voice ruleset: ${options.tone}.
    Length constraints: ${options.length} (short: ~1-2 short sentences, medium: ~2-3 paragraphs, long: ~3-4 detailed paragraphs).
    Include expressive emojis: ${options.includeEmojis ? "Yes" : "No"}.
    Include Call-to-Action (CTA) at the end: ${options.includeCTA ? "Yes" : "No"}.
    
    Make sure to write clean paragraph breaks. Avoid writing hashtags in the text body itself. Instead, provide a clean list of 8-12 relevant hashtags in the "hashtags" array field for each variation. Do not prefix hashtags with the "#" symbol.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        captions: z.array(
          z.object({
            text: z.string().describe("The text body of the caption, formatted with paragraph breaks if necessary."),
            hashtags: z.array(z.string()).describe("A list of 8-12 relevant hashtags without the '#' symbol."),
          })
        ),
      }),
      prompt,
    });

    const formattedData = object.captions.map((cap, idx) => ({
      id: `insta_ai_${Date.now()}_${idx}`,
      text: cap.text,
      hashtags: cap.hashtags,
    }));

    return {
      success: true,
      source: "ai" as const,
      data: formattedData,
    };
  } catch (error) {
    console.error("AI Generation failed, falling back to templates:", error);
    const results = generateInstagramCaptions(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}

// -------------------------------------------------------------
// 2. YouTube Title Generator Action
// -------------------------------------------------------------
const youtubeOptionsSchema = z.object({
  category: z.string(),
  style: z.string(),
});

export async function generateYoutubeTitlesAction(
  topic: string,
  options: z.infer<typeof youtubeOptionsSchema>
) {
  const model = getLanguageModel();

  if (!model) {
    const results = generateYoutubeTitles(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Generate 5 unique, click-maximizing, CTR-optimized YouTube video titles for the topic: "${topic}".
    
    Category type: ${options.category}
    Optimization style: ${options.style}
    
    Titles must bridge curiosity gaps, stay under 60 characters for SERP/mobile truncation safety, and use appropriate casing and emotional triggers.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        titles: z.array(
          z.object({
            title: z.string().describe("A clickworthy YouTube title under 60 characters."),
          })
        ),
      }),
      prompt,
    });

    const formattedData = object.titles.map((t, idx) => ({
      id: `yt_ai_${Date.now()}_${idx}`,
      title: t.title,
    }));

    return {
      success: true,
      source: "ai" as const,
      data: formattedData,
    };
  } catch (error) {
    console.error("AI Generation failed, falling back to templates:", error);
    const results = generateYoutubeTitles(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}

// -------------------------------------------------------------
// 3. Hashtag Generator Action
// -------------------------------------------------------------
const hashtagOptionsSchema = z.object({
  count: z.number(),
  strategy: z.enum(["high", "balanced", "niche"]),
});

export async function generateHashtagsAction(
  topic: string,
  options: z.infer<typeof hashtagOptionsSchema>
) {
  const model = getLanguageModel();

  if (!model) {
    const results = generateHashtags(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Generate a balanced list of exactly ${options.count} highly relevant hashtags for the topic: "${topic}".
    
    Reach strategy: ${options.strategy}.
    - High strategy: 60% high reach/broad tags, 30% medium reach, 10% niche reach.
    - Balanced strategy: 33% high reach, 33% medium reach, 33% niche reach.
    - Niche strategy: 10% high reach, 30% medium reach, 60% niche/ultra-targeted reach.
    
    Classify each tag appropriately into highReach, mediumReach, and nicheReach arrays. Provide the combined list in 'tags' (length matching the requested count of ${options.count}). Do not include the '#' symbol in the strings.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        tags: z.array(z.string()).describe("All tags combined."),
        highReach: z.array(z.string()).describe("High-reach tags (>1M posts)."),
        mediumReach: z.array(z.string()).describe("Medium-reach tags (100k-1M posts)."),
        nicheReach: z.array(z.string()).describe("Niche-reach tags (<100k posts)."),
      }),
      prompt,
    });

    return {
      success: true,
      source: "ai" as const,
      data: {
        tags: object.tags,
        highReach: object.highReach,
        mediumReach: object.mediumReach,
        nicheReach: object.nicheReach,
      },
    };
  } catch (error) {
    console.error("AI Generation failed, falling back to templates:", error);
    const results = generateHashtags(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}

// -------------------------------------------------------------
// 4. Blog Title Generator Action
// -------------------------------------------------------------
const blogOptionsSchema = z.object({
  audience: z.string(),
  style: z.string(),
});

export async function generateBlogTitlesAction(
  topic: string,
  options: z.infer<typeof blogOptionsSchema>
) {
  const model = getLanguageModel();

  if (!model) {
    const results = generateBlogTitles(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Write 5 unique, click-maximizing blog/article title hooks for the topic: "${topic}".
    
    Target Audience: ${options.audience}
    Article Style: ${options.style}
    
    Use numbers (listicles), front-load critical keyword phrases, and ensure the titles are catchy and optimized for search engine rankings.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        titles: z.array(
          z.object({
            title: z.string().describe("A catchy, SEO-optimized blog title hook."),
          })
        ),
      }),
      prompt,
    });

    const formattedData = object.titles.map((t, idx) => ({
      id: `blog_ai_${Date.now()}_${idx}`,
      title: t.title,
    }));

    return {
      success: true,
      source: "ai" as const,
      data: formattedData,
    };
  } catch (error) {
    console.error("AI Generation failed, falling back to templates:", error);
    const results = generateBlogTitles(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}
