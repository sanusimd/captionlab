import React from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { FileText, Calendar, Clock, User } from "lucide-react";

export const metadata = {
  title: "Content Marketing & Social Media Growth Blog | Captionhall",
  description: "Learn actionable strategies, hooks formulas, YouTube optimization methods, and marketing hacks to grow your organic reach.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 px-3.5 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/50 mb-4">
            Creator Academy
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            Captionhall Growth Blog
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Case studies, copywriting guides, algorithm breakdowns, and marketing tips to expand your brand presence.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-850 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center gap-3 text-xs text-slate-450 dark:text-slate-500 mb-4">
                  <span className="bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-450 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-heading leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Author & Footer details */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-450 dark:text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-semibold text-slate-700 dark:text-slate-350">{post.author.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
