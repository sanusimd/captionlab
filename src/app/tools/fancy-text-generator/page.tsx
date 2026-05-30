"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  generateFancyText, 
  StyledText 
} from "@/lib/generators/fancytext";
import { 
  saveToHistory, 
  getHistory, 
  HistoryItem 
} from "@/lib/storage";
import { 
  Type, 
  Copy, 
  Check, 
  Smile, 
  FileText, 
  Info 
} from "lucide-react";

export default function FancyTextGenerator() {
  const [inputText, setInputText] = useState("CaptionLab Style");
  const [outputs, setOutputs] = useState<StyledText[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Update styles dynamically as user types
  useEffect(() => {
    const results = generateFancyText(inputText);
    setOutputs(results);
  }, [inputText]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopyText = (styleName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(styleName);
    
    // Save to history on copy
    const savedItem = saveToHistory({
      toolId: "fancytext",
      toolName: "Fancy Text Style",
      input: styleName,
      output: text
    });
    setHistory(prev => [savedItem, ...prev].slice(0, 50));
    
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/10">
              <Type className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-heading">
                Fancy Text Generator
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Format standard copy into aesthetic bold, script, gothic, and bubble unicode fonts.
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
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Enter Your Text Below
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type something amazing..."
                rows={5}
                maxLength={200}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all text-sm resize-none"
              />
            </div>
            
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-100 dark:border-amber-900/50 flex gap-3 text-xs text-amber-800 dark:text-amber-400">
              <Info className="h-5 w-5 shrink-0" />
              <p className="leading-relaxed">
                <strong>Accessibility Tip:</strong> Unicode fonts are built using mathematical symbols. Screen readers cannot interpret them as standard letters. Use them sparingly for key words and hooks, rather than entire paragraphs.
              </p>
            </div>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Aesthetic Font Formats
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {outputs.map((out) => (
                <div
                  key={out.styleName}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {out.styleName.split(" ")[0]} {out.styleName.split(" ")[1] || ""}
                    </span>
                    <p className="text-sm md:text-base font-semibold text-slate-850 dark:text-slate-100 break-all select-all">
                      {out.text}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyText(out.styleName, out.text)}
                    className={`p-2.5 rounded-lg border shrink-0 transition-all ${
                      copiedId === out.styleName
                        ? "border-green-200 bg-green-50 text-green-600 dark:border-green-950/30 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                    }`}
                    aria-label="Copy text"
                  >
                    {copiedId === out.styleName ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="w-full mt-12 text-center">
          <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30 py-4 px-6 text-xs text-slate-400 tracking-wider uppercase font-mono">
            Sponsored Link Ad Space
          </div>
        </div>

        {/* Unicode Text Guide */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 font-heading">
            Understanding Unicode Styling & Bio Formatting
          </h2>
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              Social networks like Instagram, TikTok, and Twitter do not provide options for custom styling. When you see profiles with bold hooks, script subtitles, or gothic headlines, they are using Unicode symbols. Here is how it operates:
            </p>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              How do Unicode Fonts work?
            </h3>
            <p>
              Unicode is a computing industry standard designed to consistently encode and represent text across all platforms. The styled characters output by CaptionLab are not standard alphabetic characters; they are mathematical letters located in special mathematical blocks. Because they are base symbol assets, browsers render them exactly as they are without formatting controls.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 font-heading">
              Best Practices for Bio Formatting
            </h3>
            <p>
              Use these fonts to highlight critical points, names, dates, or core CTAs in your Instagram bio or social updates. Avoid writing full captions in styled unicode, as screen readers read them as individual mathematical symbols (e.g. "Mathematical Bold Sans Capital A..."), rendering your post completely inaccessible to visually impaired users.
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
            "name": "CaptionLab Fancy Text Generator",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Free, instant client-side unicode styling formatter. Convert text into bold, script, and gothic fonts instantly."
          })
        }}
      />

      <Footer />
    </div>
  );
}
