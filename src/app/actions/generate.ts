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
import { generateYoutubeTags } from "@/lib/generators/youtube-tag";
import { generateYoutubeDescription } from "@/lib/generators/youtube-description";

// Choose AI engine based on available keys, prioritizing Anthropic Claude
let cachedAnthropicModel: string | null = null;

async function getLanguageModel() {
  console.log("Checking API Keys. ANTHROPIC_API_KEY present:", !!process.env.ANTHROPIC_API_KEY, "OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
  if (process.env.ANTHROPIC_API_KEY) {
    if (cachedAnthropicModel) {
      console.log("Using cached Anthropic model:", cachedAnthropicModel);
      return anthropic(cachedAnthropicModel);
    }

    const preferences = [
      "claude-3-5-sonnet-20241022",
      "claude-3-5-sonnet-latest",
      "claude-3-5-sonnet-20240620",
      "claude-3-5-haiku-20241022",
      "claude-3-haiku-20240307",
    ];

    try {
      console.log("Querying Anthropic models list to find available models for this API key...");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch("https://api.anthropic.com/v1/models", {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const availableModels: string[] = data.data?.map((m: any) => m.id) || [];
        console.log("Anthropic API returned available models list:", availableModels);
        
        for (const pref of preferences) {
          if (availableModels.includes(pref)) {
            cachedAnthropicModel = pref;
            console.log(`Matched preferred Anthropic model: ${pref}`);
            break;
          }
        }

        if (!cachedAnthropicModel && availableModels.length > 0) {
          cachedAnthropicModel = availableModels[0];
          console.log(`No preferred model found in API response. Defaulting to first available model: ${cachedAnthropicModel}`);
        }
      } else {
        console.error("Failed to fetch Anthropic models. Status:", res.status, "Body:", await res.text());
      }
    } catch (err) {
      console.error("Error querying Anthropic models API (using fallback default):", err);
    }

    if (!cachedAnthropicModel) {
      cachedAnthropicModel = "claude-3-5-sonnet-20241022";
      console.log(`Defaulting to standard model: ${cachedAnthropicModel}`);
    }

    return anthropic(cachedAnthropicModel);
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
  const model = await getLanguageModel();

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
  const model = await getLanguageModel();

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
  const model = await getLanguageModel();

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
  const model = await getLanguageModel();

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

// -------------------------------------------------------------
// 5. YouTube Tag Generator Action
// -------------------------------------------------------------
const youtubeTagOptionsSchema = z.object({
  category: z.string(),
  count: z.number(),
});

export async function generateYoutubeTagsAction(
  topic: string,
  options: z.infer<typeof youtubeTagOptionsSchema>
) {
  const model = await getLanguageModel();

  if (!model) {
    const results = generateYoutubeTags(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Generate exactly ${options.count} highly relevant search-optimized YouTube tags for the video topic: "${topic}".
    
    Category: ${options.category}
    
    Return them as a flat array of strings. Do not include the '#' symbol. Keep them under 30 characters each.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        tags: z.array(z.string().describe("A relevant YouTube search tag without #.")),
      }),
      prompt,
    });

    return {
      success: true,
      source: "ai" as const,
      data: object.tags.slice(0, options.count),
    };
  } catch (error) {
    console.error("AI Tag Generation failed, falling back to templates:", error);
    const results = generateYoutubeTags(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}

// -------------------------------------------------------------
// 6. YouTube Description Generator Action
// -------------------------------------------------------------
const youtubeDescriptionOptionsSchema = z.object({
  title: z.string(),
  tone: z.string(),
  includeTimestamps: z.boolean(),
  ctaLink: z.string(),
});

export async function generateYoutubeDescriptionsAction(
  topic: string,
  options: z.infer<typeof youtubeDescriptionOptionsSchema>
) {
  const model = await getLanguageModel();

  if (!model) {
    const results = generateYoutubeDescription(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }

  try {
    const prompt = `Write an engaging, SEO-optimized YouTube video description for the video: "${options.title}" about: "${topic}".
    
    Tone of voice: ${options.tone}
    Call-to-Action Link: ${options.ctaLink ? options.ctaLink : "None provided"}
    Include timestamp outlines: ${options.includeTimestamps ? "Yes" : "No"}
    
    The description should include:
    1. A strong initial hook paragraph (first 2 lines are key for search snippets).
    2. A structured video outline detailing what the viewer will learn.
    3. Proper call-to-action placement for links.
    4. If timestamps are selected, provide a realistic timeline block starting with 0:00 (e.g. 0:00 - Intro, 1:30 - Core Concept, etc.).
    5. Clean social links spacing and 3 relevant search tags at the very bottom.`;

    const { object } = await generateObject({
      model,
      schema: z.object({
        description: z.string().describe("The full structured description copy formatted with newlines."),
      }),
      prompt,
    });

    return {
      success: true,
      source: "ai" as const,
      data: object.description,
    };
  } catch (error) {
    console.error("AI Description Generation failed, falling back to templates:", error);
    const results = generateYoutubeDescription(topic, options);
    return {
      success: true,
      source: "fallback" as const,
      data: results,
    };
  }
}
