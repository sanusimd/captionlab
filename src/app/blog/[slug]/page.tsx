import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { Calendar, Clock, User, ArrowLeft, Sparkles, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | CaptionLab Blog`,
    description: post.description,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Internal link recommendation widget based on post category
  const relatedTools = [
    { name: "Instagram Caption Creator", href: "/tools/instagram-caption-generator" },
    { name: "YouTube Title Optimiser", href: "/tools/youtube-title-generator" },
    { name: "Hashtag density Builder", href: "/tools/hashtag-generator" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
            {post.category}
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-450 leading-relaxed font-sans font-light">
            {post.description}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-slate-200/50 dark:border-slate-800/50 py-4 text-xs text-slate-450 dark:text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <User className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-350">{post.author.name}</span>
                <span className="mx-1.5">•</span>
                <span>{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article 
          className="prose dark:prose-invert max-w-none prose-slate prose-sm sm:prose-base font-sans leading-relaxed text-slate-750 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Dynamic Internal linking block / Sidebar recommendations */}
        <section className="mt-16 p-6 rounded-2xl border border-violet-100 dark:border-violet-950 bg-violet-50/50 dark:bg-violet-950/20 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Grow Your Reach Instantly
            </h3>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-sans">
            Ready to apply these techniques? Access our free, browser-based content generation utilities with zero sign-ups needed:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-sm transition-all flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {tool.name}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
