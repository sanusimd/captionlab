export interface WPPost {
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
  content: string;
  tags: string[];
}

const WP_API_URL = process.env.WORDPRESS_API_URL || "";

export async function fetchWordpressPosts(): Promise<WPPost[]> {
  if (!WP_API_URL) {
    return [];
  }

  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=20`, {
      next: { revalidate: 3600 }, // Cache pages for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }
    
    const posts = await res.json();
    
    return posts.map((post: any) => {
      // Map WordPress categories
      const categories = post._embedded?.['wp:term']?.[0] || [];
      const categoryName = categories.length > 0 ? categories[0].name : "Growth Tips";
      
      // Map WordPress author
      const author = post._embedded?.['author']?.[0];
      const authorName = author ? author.name : "Captionhall Writer";
      const authorRole = author ? (author.description || "Author") : "Staff Writer";
      
      // Calculate a rough read time (1 min per 200 words)
      const wordCount = (post.content?.rendered || "").split(/\s+/).length;
      const readTimeVal = Math.max(1, Math.round(wordCount / 200));
      
      // Format Date
      const dateObj = new Date(post.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        slug: post.slug,
        title: post.title?.rendered || "",
        description: post.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "", // Strip HTML tags
        category: categoryName,
        publishedAt: formattedDate,
        readTime: `${readTimeVal} min read`,
        author: {
          name: authorName,
          role: authorRole,
        },
        content: post.content?.rendered || "",
        tags: post._embedded?.['wp:term']?.[1]?.map((t: any) => t.name) || [],
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts from WordPress, using empty fallback:", error);
    return [];
  }
}

export async function fetchWordpressPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_API_URL) {
    return null;
  }

  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }
    
    const posts = await res.json();
    if (!posts || posts.length === 0) return null;
    
    const post = posts[0];
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const categoryName = categories.length > 0 ? categories[0].name : "Growth Tips";
    
    const author = post._embedded?.['author']?.[0];
    const authorName = author ? author.name : "Captionhall Writer";
    const authorRole = author ? (author.description || "Author") : "Staff Writer";
    
    const wordCount = (post.content?.rendered || "").split(/\s+/).length;
    const readTimeVal = Math.max(1, Math.round(wordCount / 200));
    
    const dateObj = new Date(post.date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return {
      slug: post.slug,
      title: post.title?.rendered || "",
      description: post.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "",
      category: categoryName,
      publishedAt: formattedDate,
      readTime: `${readTimeVal} min read`,
      author: {
        name: authorName,
        role: authorRole,
      },
      content: post.content?.rendered || "",
      tags: post._embedded?.['wp:term']?.[1]?.map((t: any) => t.name) || [],
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug} from WordPress:`, error);
    return null;
  }
}
