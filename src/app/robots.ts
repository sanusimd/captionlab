import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard"], // Protect localized history dashboard pages from indexing
    },
    sitemap: "https://captionhall.com/sitemap.xml",
  };
}
