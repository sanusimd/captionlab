"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  Instagram, 
  Youtube, 
  Hash, 
  Type, 
  FileText, 
  Search, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";

export default function ToolsIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      name: "Instagram Caption Generator",
      desc: "Write scroll-stopping hooks, bullet points, and calls-to-action for your grid posts and Reels.",
      icon: Instagram,
      href: "/tools/instagram-caption-generator",
      color: "from-pink-500 to-rose-500",
      tags: ["instagram", "caption", "social", "reels", "copywriting"],
      badge: "Popular"
    },
    {
      name: "YouTube Title Generator",
      desc: "Generate click-worthy, CTR-optimized video titles that stand out in feed recommendations and search.",
      icon: Youtube,
      href: "/tools/youtube-title-generator",
      color: "from-red-500 to-orange-500",
      tags: ["youtube", "title", "ctr", "video", "marketing"],
      badge: "CTR Boost"
    },
    {
      name: "Hashtag Generator",
      desc: "Find low-competition and high-reach hashtags arranged in optimal copy-paste density lists.",
      icon: Hash,
      href: "/tools/hashtag-generator",
      color: "from-blue-500 to-indigo-500",
      tags: ["hashtag", "tags", "reach", "seo", "instagram", "tiktok"],
      badge: "SEO Reach"
    },
    {
      name: "Fancy Text Generator",
      desc: "Style standard captions into bold, italic, script, and aesthetic unicode fonts to stand out visually.",
      icon: Type,
      href: "/tools/fancy-text-generator",
      color: "from-amber-500 to-yellow-500",
      tags: ["fancy", "text", "fonts", "unicode", "bio", "styling"],
      badge: "Formatting"
    },
    {
      name: "Blog Title Generator",
      desc: "Develop catchy, SEO-friendly article headers and click-maximizing titles based on target keywords.",
      icon: FileText,
      href: "/tools/blog-title-generator",
      color: "from-emerald-500 to-teal-500",
      tags: ["blog", "headline", "title", "seo", "article"],
      badge: "SEO Traffic"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.desc.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.includes(query))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 px-3 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/50 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            No API Keys. Free Forever.
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            Creator Utility Directory
          </h1>
          
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            A comprehensive suite of client-side optimization widgets for social media managers and copywriting strategists.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. caption, youtube)..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 pl-10 pr-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm shadow-sm"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">No tools match your search criteria. Try searching for something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-850 transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${tool.color} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs bg-slate-50 dark:bg-slate-950 text-slate-500 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-100 dark:border-slate-850">
                        {tool.badge}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-heading">
                      {tool.name}
                    </h2>
                    
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-750 dark:hover:text-violet-300"
                    >
                      Open Workspace
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ad block */}
        <div className="w-full mt-16 text-center">
          <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30 py-4 px-6 text-xs text-slate-400 tracking-wider uppercase font-mono">
            Sponsored Link Ad Space
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
