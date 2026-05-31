"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { generateYoutubeDescriptionsAction } from "@/app/actions/generate";
import { saveToHistory, getHistory, HistoryItem } from "@/lib/storage";
import { 
  Youtube, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Smile, 
  FileText, 
  ChevronDown 
} from "lucide-react";

export default function YoutubeDescriptionGenerator() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("excited");
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [ctaLink, setCtaLink] = useState("");

  const [description, setDescription] = useState("");
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
      const result = await generateYoutubeDescriptionsAction(topic, {
        title,
        tone,
        includeTimestamps,
        ctaLink
      });
      if (result.success && result.data) {
        setDescription(result.data);
        setGenerationSource(result.source);

        const savedItem = saveToHistory({
          toolId: "youtubedesc",
          toolName: "YouTube Description",
          input: `${tone} | ${title || "No Title"} | ${topic.slice(0, 30)}...`,
          output: result.data,
        });
        setHistory(prev => [savedItem, ...prev].slice(0, 50));
      }
    } catch (error) {
      console.error("Failed to generate YouTube description:", error);
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
                YouTube Description Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Write structured, SEO-friendly video description blocks with timestamps and resource links.
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
              {/* Video Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Video Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Next.js Secrets Only Pros Know!"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm"
                />
              </div>

              {/* Topic Focus */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  What is the video about?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Describe your video keywords, target outputs, or details..."
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
                    <option value="excited">Excited & High Energy 🚀</option>
                    <option value="professional">Professional & Direct 💼</option>
                    <option value="funny">Casual & Witty 😂</option>
                    <option value="minimalist">Minimalist & Clean ✨</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* CTA Link Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Call-to-Action Link (Optional)
                </label>
                <input
                  type="url"
                  value={ctaLink}
                  onChange={(e) => setCtaLink(e.target.value)}
                  placeholder="e.g. https://mywebsite.com/freebie"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm"
                />
              </div>

              {/* Timestamps toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeTimestamps}
                    onChange={(e) => setIncludeTimestamps(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span>Add Timestamp Placeholder List ⏱️</span>
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
                    Writing detailed outline...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Description
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {!description ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-12 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Generate Description
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter your video data and links to compose ready-made, high-converting YouTube descriptions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Structured Video Description
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
                  </div>
                </div>

                {/* Description Copy Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Copyable Block
                    </h3>
                    <button
                      onClick={() => handleCopyText("desc", description)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-750 transition-colors"
                    >
                      {copiedId === "desc" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy Description
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-350 leading-relaxed whitespace-pre-wrap select-all max-h-[500px] overflow-y-auto">
                    {description}
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
