"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  generateInstagramCaptions, 
  GeneratedCaption 
} from "@/lib/generators/instagram";
import { 
  saveToHistory, 
  getHistory, 
  toggleFavorite, 
  HistoryItem 
} from "@/lib/storage";
import { 
  Instagram, 
  Copy, 
  Check, 
  Heart, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  ChevronDown, 
  Clock, 
  Smile, 
  FileText 
} from "lucide-react";

export default function InstagramCaptionGenerator() {
  // Input states
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("excited");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);

  // Output states
  const [captions, setCaptions] = useState<GeneratedCaption[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load history on mount
  useEffect(() => {
    const loadedHistory = getHistory();
    setHistory(loadedHistory);
    
    // Identify which local runs are favorited
    const favorites = loadedHistory.filter(item => item.isFavorite).map(item => item.id);
    setFavoriteIds(favorites);
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    
    // Simple micro-delay to simulate processing and feel premium
    setTimeout(() => {
      const results = generateInstagramCaptions(topic, {
        tone,
        length,
        includeEmojis,
        includeCTA
      });
      
      setCaptions(results);
      setIsGenerating(false);

      // Save the first result to LocalStorage history
      if (results.length > 0) {
        const savedItem = saveToHistory({
          toolId: "instagram",
          toolName: "Instagram Caption",
          input: topic,
          output: results[0].text,
          hashtags: results[0].hashtags
        });
        
        // Refresh local history view
        setHistory(prev => [savedItem, ...prev].slice(0, 50));
      }
    }, 600);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCopyTags = (id: string, tags: string[]) => {
    const tagString = tags.map(t => `#${t}`).join(" ");
    navigator.clipboard.writeText(tagString);
    setCopiedId(`tags_${id}`);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleFavorite = (item: GeneratedCaption) => {
    // If it is in local state, toggle it
    const isFav = favoriteIds.includes(item.id);
    let updatedFavs;
    if (isFav) {
      updatedFavs = favoriteIds.filter(id => id !== item.id);
    } else {
      updatedFavs = [...favoriteIds, item.id];
    }
    setFavoriteIds(updatedFavs);

    // Save to LocalStorage by matching output text in history
    const matchedHistoryItem = history.find(h => h.output === item.text);
    if (matchedHistoryItem) {
      toggleFavorite(matchedHistoryItem.id);
      setHistory(getHistory());
    } else {
      // Save it first, then favorite
      const saved = saveToHistory({
        toolId: "instagram",
        toolName: "Instagram Caption",
        input: topic,
        output: item.text,
        hashtags: item.hashtags
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/10">
              <Instagram className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                Instagram Caption Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Write scroll-stopping grid posts and Reels hook copy instantly.
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
                  What is your post about?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Launching a new local coffee shop featuring organic cold brew and homemade cinnamon rolls"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm resize-none"
                />
              </div>

              {/* Tone Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Tone of Voice
                </label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm cursor-pointer"
                  >
                    <option value="excited">Excited & Hype 🚀</option>
                    <option value="professional">Professional & Direct 📊</option>
                    <option value="funny">Humorous & Casual 😂</option>
                    <option value="minimalist">Minimalist & Clean ✨</option>
                    <option value="witty">Witty & Creative 😉</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Length Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Caption Length
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["short", "medium", "long"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLength(l)}
                      className={`py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                        length === l
                          ? "border-violet-600 bg-violet-50 text-violet-600 dark:border-violet-500 dark:bg-violet-950/30 dark:text-violet-400"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Switcheable Settings */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeEmojis}
                    onChange={(e) => setIncludeEmojis(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span>Include expressive Emojis ☕</span>
                </label>
                
                <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeCTA}
                    onChange={(e) => setIncludeCTA(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span>Add Call-to-Action hooks 👇</span>
                </label>
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
                    Assembling templates...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Captions
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {captions.length === 0 ? (
              /* Empty State */
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-12 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Generate Your Copy
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter your theme, select a tone ruleset, and watch your optimized caption drafts appear here instantly.
                </p>
              </div>
            ) : (
              /* Caption Outputs */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Generated Caption Variations
                  </h3>
                  <span className="text-xs text-violet-500 font-semibold bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded-full">
                    3 Drafts Ready
                  </span>
                </div>

                {captions.map((caption, idx) => (
                  <div
                    key={caption.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <span className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-300 dark:text-slate-700">
                      #{idx + 1}
                    </span>

                    {/* Output Text */}
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line pr-6">
                      {caption.text}
                    </div>

                    {/* Hashtags display */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {caption.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Tool Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(caption.id, caption.text)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            {copiedId === caption.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy Caption
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleCopyTags(caption.id, caption.hashtags)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            {copiedId === `tags_${caption.id}` ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                Tags Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy Tags
                              </>
                            )}
                          </button>
                        </div>

                        <button
                          onClick={() => handleFavorite(caption)}
                          className={`p-2 rounded-lg border transition-all ${
                            favoriteIds.includes(caption.id)
                              ? "border-pink-200 bg-pink-50 text-pink-500 dark:border-pink-900/30 dark:bg-pink-950/20"
                              : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-pink-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                          aria-label="Add to favorites"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ad Integration banner */}
        <div className="w-full mt-12 text-center">
          <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30 py-4 px-6 text-xs text-slate-400 tracking-wider uppercase font-mono">
            Sponsored Link Ad Space
          </div>
        </div>

        {/* SEO Information & Guides */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 font-heading">
            How to Write Engaging Instagram Captions That Drive Traffic
          </h2>
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              In the age of visual content, captions remain a primary driver of retention, search relevance, and audience interaction. While a striking photo or high-tempo Reel catches the user's eye, the caption is where relationships are built and conversions happen. Here is how you can use CaptionLab to maximize your content potential:
            </p>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              1. Win with the First Sentence (The Hook)
            </h3>
            <p>
              Instagram collapses descriptions after a couple of lines. If your first sentence doesn't command attention, the rest of your copy goes completely unread. Use high-impact declarations, questions, or curiosity gaps to compel users to tap "more".
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              2. Add Structure using Whitespace and Bullets
            </h3>
            <p>
              Dense blocks of copy are difficult to read on mobile viewports. Break down long paragraphs into single lines, bullet points, or list structures. Emoticons can serve as excellent visual anchors to segregate different thoughts.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              3. Conclude with a clear Call-to-Action (CTA)
            </h3>
            <p>
              Never assume your reader knows what to do next. Tell them explicitly: whether it's tapping the link in your bio, tagging a colleague, saving the post for later reference, or leaving a comment with their opinions.
            </p>
          </div>

          {/* Programmatic FAQ Accordion */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 font-heading">
              Frequently Asked Questions
            </h3>
            
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/50">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-heading">
                Is this Instagram Caption Generator really free?
              </h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-sans">
                Yes! Every tool on CaptionLab operates 100% client-side in your web browser. There are no credit limitations, no billing systems, and no logins required.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/50">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-heading">
                Does this tool send my descriptions to external servers?
              </h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-sans">
                No. CaptionLab values your privacy. The generation logic runs locally using predefined mathematical sentence rules and template structures, meaning your input keywords never leave your machine.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* JSON-LD Schema Script for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "CaptionLab Instagram Caption Generator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Free, instant client-side Instagram caption generator. Choose tones, emoji variables, calls to action, and generate three custom drafts immediately."
          })
        }}
      />

      <Footer />
    </div>
  );
}
