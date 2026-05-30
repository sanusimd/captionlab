"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  getHistory, 
  removeFromHistory, 
  toggleFavorite, 
  HistoryItem 
} from "@/lib/storage";
import { 
  Instagram, 
  Youtube, 
  Hash, 
  Type, 
  FileText, 
  Copy, 
  Check, 
  Heart, 
  Trash2, 
  Sparkles, 
  Search, 
  Filter, 
  LayoutDashboard,
  Smile
} from "lucide-react";

export default function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "favorites">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load history client-side
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleToggleFav = (id: string) => {
    toggleFavorite(id);
    // Reload state
    setHistory(getHistory());
  };

  const handleDelete = (id: string) => {
    removeFromHistory(id);
    // Reload state
    setHistory(getHistory());
  };

  // Get tool icons based on toolId
  const getToolIcon = (toolId: string) => {
    const iconClasses = "h-4 w-4 text-white";
    switch (toolId) {
      case "instagram":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500 shadow-sm shadow-pink-500/10">
            <Instagram className={iconClasses} />
          </div>
        );
      case "youtube":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 shadow-sm shadow-red-500/10">
            <Youtube className={iconClasses} />
          </div>
        );
      case "hashtag":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 shadow-sm shadow-blue-500/10">
            <Hash className={iconClasses} />
          </div>
        );
      case "fancytext":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 shadow-sm shadow-amber-500/10">
            <Type className={iconClasses} />
          </div>
        );
      case "blogtitle":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 shadow-sm shadow-emerald-500/10">
            <FileText className={iconClasses} />
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500">
            <Sparkles className={iconClasses} />
          </div>
        );
    }
  };

  // Filters logic
  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.output.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toolName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "favorites") {
      return matchesSearch && item.isFavorite;
    }
    return matchesSearch;
  });

  const favoritesCount = history.filter(item => item.isFavorite).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/10">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                User Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your localized saved generations, bookmarks, and preferences.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 px-3 py-1.5 rounded-xl font-semibold">
              Status: <span className="text-slate-800 dark:text-slate-350">100% Free Lifetime</span>
            </span>
          </div>
        </div>

        {/* Dashboard Summary Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Generations</span>
            <h3 className="text-3xl font-extrabold font-heading mt-1">{history.length}</h3>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Saved Favorites</span>
            <h3 className="text-3xl font-extrabold font-heading mt-1 text-pink-500">{favoritesCount}</h3>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Storage Sync Status</span>
            <h3 className="text-3xl font-extrabold font-heading mt-1 text-slate-400 dark:text-slate-650">Local Only</h3>
          </div>
        </div>

        {/* Workspace Workspace & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings & Upgrades sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Navigation Launcher */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-heading">
                Launch Workspace Tool
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tools/instagram-caption-generator"
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-850 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span>Instagram Caption Gen</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500">Launch</span>
                </Link>
                <Link
                  href="/tools/youtube-title-generator"
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-850 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span>YouTube Title Gen</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500">Launch</span>
                </Link>
                <Link
                  href="/tools/hashtag-generator"
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-850 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span>Hashtag Generator</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500">Launch</span>
                </Link>
                <Link
                  href="/tools/fancy-text-generator"
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-850 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span>Fancy Text Gen</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500">Launch</span>
                </Link>
                <Link
                  href="/tools/blog-title-generator"
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-850 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span>Blog Title Gen</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500">Launch</span>
                </Link>
              </div>
            </div>
          </div>

          {/* History Feed list */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search and Filters row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search history logs..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 pl-9 pr-4 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-xs"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              {/* Filters toggle */}
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    filterType === "all"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  All Runs
                </button>
                <button
                  onClick={() => setFilterType("favorites")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    filterType === "favorites"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Favorites ({favoritesCount})
                </button>
              </div>
            </div>

            {/* List entries */}
            {filteredHistory.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-16 text-center shadow-sm">
                <Smile className="mx-auto h-10 w-10 text-slate-350 dark:text-slate-650 mb-4" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-350">No Logs Located</h3>
                <p className="mt-2 text-xs text-slate-450 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Start using our Instagram, YouTube, and Blog generators. Your runs will be logged here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    {/* Item header */}
                    <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2">
                        {getToolIcon(item.toolId)}
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading">
                            {item.toolName}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Item actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyText(item.id, item.output)}
                          className={`p-2 rounded-lg border transition-colors ${
                            copiedId === item.id
                              ? "border-green-200 bg-green-50 text-green-600 dark:border-green-950/30 dark:bg-green-950/20"
                              : "border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                          }`}
                          aria-label="Copy output"
                        >
                          {copiedId === item.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                        
                        <button
                          onClick={() => handleToggleFav(item.id)}
                          className={`p-2 rounded-lg border transition-all ${
                            item.isFavorite
                              ? "border-pink-200 bg-pink-50 text-pink-500 dark:border-pink-900/30 dark:bg-pink-950/20"
                              : "border-slate-200 dark:border-slate-850 text-slate-400 hover:text-pink-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                          aria-label="Toggle favorite"
                        >
                          <Heart className="h-3.5 w-3.5 fill-current" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-850 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Meta Input */}
                    <div className="mb-3 text-[11px] text-slate-400 dark:text-slate-500 font-mono break-words leading-tight bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
                      <strong>Input:</strong> {item.input}
                    </div>

                    {/* Output Text */}
                    <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed font-sans whitespace-pre-line break-words">
                      {item.output}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
