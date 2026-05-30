import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://captionhall.com";

  // Static URL definitions
  const staticUrls = [
    "",
    "/tools",
    "/tools/instagram-caption-generator",
    "/tools/youtube-title-generator",
    "/tools/hashtag-generator",
    "/tools/fancy-text-generator",
    "/tools/blog-title-generator",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/tools/") ? 0.8 : 0.6,
  }));

  // Dynamic Blog articles
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticUrls, ...blogUrls];
}
