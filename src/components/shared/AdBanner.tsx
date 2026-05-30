"use client";

import React, { useEffect, useState } from "react";

interface AdBannerProps {
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export default function AdBanner({ slotId, format = "auto" }: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In production, you would run the Google AdSense pushing script:
    // try {
    //   ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    // } catch (e) {
    //   console.error("AdSense load error:", e);
    // }
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-slate-100 dark:bg-slate-900 rounded-xl h-24 w-full" />;
  }

  // Visual classes based on format
  const formatClasses = {
    auto: "h-28 w-full max-w-4xl mx-auto",
    horizontal: "h-24 w-full max-w-4xl mx-auto",
    rectangle: "h-64 w-80 mx-auto",
    vertical: "h-[600px] w-40 mx-auto"
  };

  return (
    <div className="my-8 text-center relative group">
      {/* Label for compliant ad disclosure */}
      <span className="block text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-1.5 font-mono">
        Sponsored Advertisement
      </span>
      
      <div className={`rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center transition-all ${formatClasses[format]}`}>
        {/* Mock Ad Display */}
        <div className="text-center p-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            AdSense Unit #{slotId} ({format.toUpperCase()})
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            Google Ad Placement Container
          </p>
        </div>
      </div>
    </div>
  );
}
