"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { generateYoutubeTagsAction } from "@/app/actions/generate";
import { saveToHistory, getHistory, HistoryItem } from "@/lib/storage";
import { 
  Youtube, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Smile, 
  Tag, 
  ChevronDown 
} from "lucide-react";

export default function YoutubeTagGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("tech");
  const [count, setCount] = useState<number>(20);

  const [tags, setTags] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSource, setGenerationSource] = useState<"ai" | "fallback" | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const result = await generateYoutubeTagsAction(topic, { category, count });
      if (result.success && result.data) {
        setTags(result.data);
        setGenerationSource(result.source);

        if (result.data.length > 0) {
          const tagString = result.data.map(t => `#${t}`).join(", ");
          const savedItem = saveToHistory({
            toolId: "youtubetag",
            toolName: "YouTube Tags",
            input: `${count} tags | ${category} | ${topic}`,
            output: tagString,
          });
          setHistory(prev => [savedItem, ...prev].slice(0, 50));
        }
      }
    } catch (error) {
      console.error("Failed to generate YouTube tags:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-650 to-rose-600 text-white shadow-md shadow-red-500/10">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                YouTube Tag Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Generate SEO-optimized keywords and tags to rank your videos higher in search results.
              </p>
            </div>
          </div>
          
          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            ← Back to All Tools
          </Link>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Topic Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  What is your video topic?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Build a Next.js portfolio website with Tailwind CSS and deploy on Vercel"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm resize-none"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Video Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm cursor-pointer"
                  >
                    <option value="tech">Tech & Science 💻</option>
                    <option value="gaming">Gaming & Let's Play 🎮</option>
                    <option value="vlog">Vlogging & Travel 📷</option>
                    <option value="education">Education & How-to 🎓</option>
                    <option value="marketing">Business & Marketing 📈</option>
                    <option value="lifestyle">Lifestyle & Fitness 🥑</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Count Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Number of Tags
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([10, 20, 30] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCount(c)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        count === c
                          ? "border-violet-600 bg-violet-50 text-violet-600 dark:border-violet-500 dark:bg-violet-950/30 dark:text-violet-400"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {c} Tags
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating || !topic.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 text-white font-medium py-3.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing seo targets...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Tags
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {tags.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-12 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Generate SEO Tags
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter your topic details and select categories to generate high-ranking tag combinations.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Generated Tags
                  </h3>
                  <div className="flex items-center gap-2">
                    {generationSource === "ai" ? (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Generated ⚡
                      </span>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                        Template Fallback 📝
                      </span>
                    )}
                    <span className="text-xs text-violet-500 font-semibold bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded-full">
                      {tags.length} tags
                    </span>
                  </div>
                </div>

                {/* Comma-Separated copy card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Copy-Paste Tag String
                    </h3>
                    <button
                      onClick={() => handleCopyText("all", tags.map(t => `#${t}`).join(", "))}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-750 transition-colors"
                    >
                      {copiedId === "all" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          Copied String!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy All
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 text-sm font-mono text-slate-650 dark:text-slate-300 leading-relaxed break-all select-all">
                    {tags.map(t => `#${t}`).join(", ")}
                  </div>
                </div>

                {/* Tag Pill Visual List */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Individual Keywords list
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="group flex items-center gap-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-350"
                      >
                        <Tag className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-mono">#{tag}</span>
                        <button
                          onClick={() => handleCopyText(tag, `#${tag}`)}
                          className="text-slate-400 hover:text-violet-650 ml-1 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedId === tag ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ad Space */}
        <div className="w-full mt-12 text-center">
          <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30 py-4 px-6 text-xs text-slate-400 tracking-wider uppercase font-mono">
            Sponsored Link Ad Space
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
