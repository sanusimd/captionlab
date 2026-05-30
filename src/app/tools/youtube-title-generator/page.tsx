"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  generateYoutubeTitles, 
  GeneratedTitle 
} from "@/lib/generators/youtube";
import { 
  saveToHistory, 
  getHistory, 
  toggleFavorite, 
  HistoryItem 
} from "@/lib/storage";
import { 
  Youtube, 
  Copy, 
  Check, 
  Heart, 
  Sparkles, 
  RefreshCw, 
  ChevronDown, 
  Smile 
} from "lucide-react";

export default function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("tutorial");
  const [style, setStyle] = useState("clickworthy");

  const [titles, setTitles] = useState<GeneratedTitle[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadedHistory = getHistory();
    setHistory(loadedHistory);
    const favorites = loadedHistory.filter(item => item.isFavorite).map(item => item.id);
    setFavoriteIds(favorites);
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const results = generateYoutubeTitles(topic, { category, style });
      setTitles(results);
      setIsGenerating(false);

      if (results.length > 0) {
        const savedItem = saveToHistory({
          toolId: "youtube",
          toolName: "YouTube Title",
          input: `${category} | ${style} | ${topic}`,
          output: results[0].title
        });
        setHistory(prev => [savedItem, ...prev].slice(0, 50));
      }
    }, 500);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleFavorite = (item: GeneratedTitle) => {
    const isFav = favoriteIds.includes(item.id);
    let updatedFavs;
    if (isFav) {
      updatedFavs = favoriteIds.filter(id => id !== item.id);
    } else {
      updatedFavs = [...favoriteIds, item.id];
    }
    setFavoriteIds(updatedFavs);

    const matchedHistoryItem = history.find(h => h.output === item.title);
    if (matchedHistoryItem) {
      toggleFavorite(matchedHistoryItem.id);
      setHistory(getHistory());
    } else {
      const saved = saveToHistory({
        toolId: "youtube",
        toolName: "YouTube Title",
        input: topic,
        output: item.title
      });
      toggleFavorite(saved.id);
      setHistory(getHistory());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-500 to-orange-500 text-white shadow-md shadow-red-500/10">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                YouTube Title Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Generate high-CTR, click-worthy video titles tailored to video algorithms.
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
                  What is your video about?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. coding a SaaS product from scratch using Next.js in 24 hours"
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
                    <option value="tutorial">Tutorial / How-To 💻</option>
                    <option value="vlog">Vlog & Storytelling 📷</option>
                    <option value="review">Product Review & Comparison 🔎</option>
                    <option value="listicle">Listicle / Top Tips 📊</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Title Style Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Optimization Angle
                </label>
                <div className="relative">
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm cursor-pointer"
                  >
                    <option value="clickworthy">CTR-Clickworthy Hook</option>
                    <option value="seo">Search Engine Optimized (SEO)</option>
                    <option value="hype">High-Energy Hype</option>
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
                    Analyzing keywords...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Titles
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {titles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-12 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Generate Viral Titles
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter your topic details and select optimization angles to generate highly clickable layouts.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    CTR Recommendations
                  </h3>
                  <span className="text-xs text-violet-500 font-semibold bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded-full">
                    5 Variations
                  </span>
                </div>

                {titles.map((t, idx) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <span className="text-xs font-mono font-bold text-slate-400">#0{idx + 1}</span>
                      <h4 className="text-sm md:text-base font-semibold text-slate-850 dark:text-slate-200 leading-snug">
                        {t.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 self-center">
                      <button
                        onClick={() => handleCopyText(t.id, t.title)}
                        className={`p-2.5 rounded-lg border transition-colors ${
                          copiedId === t.id
                            ? "border-green-200 bg-green-50 text-green-600 dark:border-green-950/30 dark:bg-green-950/20"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                        }`}
                        aria-label="Copy title"
                      >
                        {copiedId === t.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => handleFavorite(t)}
                        className={`p-2.5 rounded-lg border transition-all ${
                          favoriteIds.includes(t.id)
                            ? "border-pink-200 bg-pink-50 text-pink-500 dark:border-pink-900/30 dark:bg-pink-950/20"
                            : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-pink-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                        aria-label="Add to favorites"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
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

        {/* YouTube SEO Guide */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 font-heading">
            YouTube Title SEO Guide: How to Maximize Recommendations
          </h2>
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              Your YouTube thumbnail stops the scroll, but your title makes them click. If the connection between your thumbnail context and video header is weak, your CTR declines, and search recommendations drop. Follow these principles for optimized YouTube titles:
            </p>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              1. Front-Load Primary Target Keywords
            </h3>
            <p>
              Place high-volume keywords near the beginning of your title. This ensures that users see them instantly on mobile notifications and search results before the text is truncated.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              2. Keep Titles Under 60 Characters
            </h3>
            <p>
              While YouTube allows up to 100 characters, titles exceeding 55-60 characters are regularly cut off in recommendation feeds and side-panel widgets. Focus on impact and cut unnecessary words.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              3. Master the Curiosity Gap
            </h3>
            <p>
              Create questions or partial statements that induce curiosity (e.g., "I Tried X... (Honest Truth)"). Ensure you deliver on the promise inside your actual video to maintain search rankings and watch-time retention.
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
            "name": "CaptionLab YouTube Title Generator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Free tool to generate high click-through rate YouTube titles. Optimize for search algorithms or click hooks instantly."
          })
        }}
      />

      <Footer />
    </div>
  );
}
