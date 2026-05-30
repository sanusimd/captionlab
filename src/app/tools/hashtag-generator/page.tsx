"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  generateHashtags, 
  GeneratedHashtags 
} from "@/lib/generators/hashtag";
import { 
  saveToHistory, 
  getHistory, 
  HistoryItem 
} from "@/lib/storage";
import { 
  Hash, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Smile, 
  TrendingUp, 
  Globe,
  ChevronDown
} from "lucide-react";

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState<number>(20);
  const [strategy, setStrategy] = useState<"high" | "balanced" | "niche">("balanced");

  const [hashtags, setHashtags] = useState<GeneratedHashtags | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const results = generateHashtags(topic, { count, strategy });
      setHashtags(results);
      setIsGenerating(false);

      if (results.tags.length > 0) {
        const fullOutput = results.tags.map(t => `#${t}`).join(" ");
        const savedItem = saveToHistory({
          toolId: "hashtag",
          toolName: "Hashtag List",
          input: `${count} tags | ${strategy} | ${topic}`,
          output: fullOutput
        });
        setHistory(prev => [savedItem, ...prev].slice(0, 50));
      }
    }, 500);
  };

  const handleCopyAll = (id: string, tags: string[]) => {
    const text = tags.map(t => `#${t}`).join(" ");
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/10">
              <Hash className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                Hashtag Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Find optimal density high-reach and low-competition tags for your posts.
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
                  Post Topic / Focus Keywords
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. digital marketing, web dev, design"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm"
                />
              </div>

              {/* Count Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Target Tag Count
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 30].map((c) => (
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

              {/* Strategy Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Tag Mix Strategy
                </label>
                <div className="relative">
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value as any)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm cursor-pointer"
                  >
                    <option value="balanced">Balanced Strategy (Best overall)</option>
                    <option value="high">High Reach Focus (Target popular feeds)</option>
                    <option value="niche">Niche Focus (Lower competition rankings)</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
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
                    Fetching tags...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Hashtags
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {!hashtags ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-12 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Generate Tags
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter focus keywords on the left and select tag volumes to build copy-paste ready hashtag lists.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Total copy block */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Copy-Paste Workspace
                    </h3>
                    <button
                      onClick={() => handleCopyAll("all", hashtags.tags)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      {copiedId === "all" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          Copied All!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy All Tags
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 text-sm font-mono text-slate-600 dark:text-slate-300 leading-relaxed break-all">
                    {hashtags.tags.map(t => `#${t}`).join(" ")}
                  </div>
                </div>

                {/* Reach Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* High Reach */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wide">
                      <Globe className="h-3.5 w-3.5" />
                      <span>High Reach</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">Competitive tags with over 1M posts.</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {hashtags.highReach.map(t => (
                        <span key={t} className="text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Balanced Reach */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 uppercase tracking-wide">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Medium Reach</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">Optimized tags with 100k - 1M posts.</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {hashtags.mediumReach.map(t => (
                        <span key={t} className="text-xs bg-violet-50 dark:bg-violet-950/20 text-violet-650 dark:text-violet-400 px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Niche Reach */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500 uppercase tracking-wide">
                      <Hash className="h-3.5 w-3.5" />
                      <span>Niche Reach</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">Highly targeted tags under 100k posts.</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {hashtags.nicheReach.map(t => (
                        <span key={t} className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
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

        {/* Hashtag Optimization Guide */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 font-heading">
            Hashtag Strategy: How to Rank in Social Feeds
          </h2>
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              Hashtags act as classification catalog systems for Instagram, TikTok, LinkedIn, and Twitter. Using only popular hashtags (e.g., #love, #trending) guarantees that your post is buried within seconds. Conversely, using only small niche tags limits your reach. A balanced ladder strategy solves this:
            </p>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              1. The Ladder Strategy (High, Medium, Niche)
            </h3>
            <p>
              Mix tags of different sizes. High-reach tags bring rapid initial visibility. Medium-reach tags give you a chance to rank in category feeds for a few hours. Niche tags have low competition, allowing your post to rank in Top/Recent results for weeks, feeding consistent organic reach.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              2. Keep It Relevant to the Graphic Context
            </h3>
            <p>
              Search engines scan post graphics using AI vision. If your hashtags do not match the image context, the algorithm registers a mismatch and penalizes reach. Ensure your keyword seeds reflect the actual graphic contents.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              3. Placement: Captions vs. Comments
            </h3>
            <p>
              Tests show that placing hashtags either at the bottom of your caption (separated by line breaks) or inside the first comment yields identical algorithmic indexing. Choose the placement that matches your visual aesthetic preferences.
            </p>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Captionhall Hashtag Generator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Free utility to generate balanced reach hashtag lists using density ladder structures for social content ranking."
          })
        }}
      />

      <Footer />
    </div>
  );
}
