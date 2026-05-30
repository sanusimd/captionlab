export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: string; // Markdown or simple HTML
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-instagram-captions-for-engagement",
    title: "How to Write Instagram Captions that Drive Massive Engagement",
    description: "Discover the step-by-step framework to write scroll-stopping captions, hook your readers, and generate more comments and saves on Instagram.",
    category: "Instagram Growth",
    publishedAt: "May 20, 2026",
    readTime: "5 min read",
    author: {
      name: "Alex Rivers",
      role: "SMM Growth Lead"
    },
    tags: ["instagram", "copywriting", "socialmedia"],
    content: `
      <p>Writing an Instagram caption isn’t just about describing what’s in your photo. It’s a strategic opportunity to hook your audience, start a conversation, and drive tangible actions like website clicks, saves, and comments.</p>
      
      <h2>1. The First Line is Everything (The Hook)</h2>
      <p>Instagram truncates captions after 125 characters, forcing users to click "more" to read the rest. If your first sentence doesn't immediately grab attention, they'll scroll past. Use curiosity gaps, bold statements, or direct questions to make them halt.</p>
      <blockquote>❌ Avoid: "Here is a photo of my morning coffee today."<br>✅ Try: "This 5-minute morning routine saved me 15 hours of work this week. ☕👇"</blockquote>

      <h2>2. Create Structure with Whitespace</h2>
      <p>People read captions on mobile devices. Dense paragraphs are hard to read and cause users to leave. Break up your sentences, use single-line paragraphs, and employ bullet points to keep your text readable.</p>

      <h2>3. Call to Action (CTA)</h2>
      <p>Every post should have one clear goal. Do you want them to click the link in your bio, share the post to their stories, or leave their thoughts in the comments? State it clearly at the end of the caption.</p>
    `
  },
  {
    slug: "youtube-seo-how-to-optimize-titles-for-ctr",
    title: "YouTube Title SEO: How to Rank and Drive Clicks",
    description: "Learn how to balance keyword optimization for search algorithms with psychological hooks that double your click-through rates.",
    category: "YouTube SEO",
    publishedAt: "May 22, 2026",
    readTime: "6 min read",
    author: {
      name: "Sarah K.",
      role: "Video Strategist"
    },
    tags: ["youtube", "seo", "click-through-rate"],
    content: `
      <p>YouTube is the world’s second-largest search engine. To get your videos recommended, you need two things: high watch time and a high click-through rate (CTR). Your title is the primary driver of CTR.</p>
      
      <h2>The CTR Equation</h2>
      <p>A great YouTube title combines keyword relevance with psychological triggers. It satisfies the search algorithm while appealing to human curiosity.</p>
      
      <h2>1. Front-load Your Core Keyword</h2>
      <p>Search bots read left-to-right. Place your target keyword phrase at the very beginning of the title. This boosts keyword indexing and prevents your focus topic from getting truncated on mobile feeds.</p>

      <h2>2. Keep it Under 60 Characters</h2>
      <p>If your title is cut off with an ellipsis (...), users miss the hook. Write titles that are punchy and fit cleanly inside recommendations and search lists.</p>
    `
  },
  {
    slug: "how-to-use-hashtags-to-go-viral-on-instagram",
    title: "The Hashtag Ladder Strategy: How to Go Viral on Instagram",
    description: "Stop spamming high-competition tags. Master the balanced hashtag ladder system to consistently rank on explorer feeds and tag searches.",
    category: "Hashtag Strategy",
    publishedAt: "May 24, 2026",
    readTime: "4 min read",
    author: {
      name: "Marcus Drake",
      role: "SEO Growth Architect"
    },
    tags: ["hashtag", "instagram", "viralgrowth"],
    content: `
      <p>Many creators think hashtags are dead. They aren’t—they’ve simply evolved. The Instagram algorithm uses hashtags to categorize your post and show it to highly targeted users. The secret is the Ladder Strategy.</p>
      
      <h2>What is the Hashtag Ladder Strategy?</h2>
      <p>Instead of copying the most popular tags, you distribute your tags across three categories based on competition level:</p>
      <ul>
        <li><strong>Niche (under 100k posts):</strong> Easy to rank, keeps your post visible in 'recent' lists for weeks.</li>
        <li><strong>Medium (100k - 1M posts):</strong> Balanced ranking potential for active accounts.</li>
        <li><strong>High (over 1M posts):</strong> Competitive, triggers initial rapid indexing.</li>
      </ul>
      <p>A balanced list uses roughly 30% from each tier to build momentum.</p>
    `
  }
];
