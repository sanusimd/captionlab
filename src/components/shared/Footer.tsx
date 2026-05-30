import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { name: "Instagram Caption Gen", href: "/tools/instagram-caption-generator" },
    { name: "YouTube Title Gen", href: "/tools/youtube-title-generator" },
    { name: "Hashtag Generator", href: "/tools/hashtag-generator" },
    { name: "Fancy Text Generator", href: "/tools/fancy-text-generator" },
    { name: "Blog Title Generator", href: "/tools/blog-title-generator" },
  ];

  const resourceLinks = [
    { name: "Content Blog", href: "/blog" },
    { name: "All Utilities", href: "/tools" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Settings", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                CaptionLab
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Create high-performing hooks, captions, titles, and formatting with our free developer-grade content workspace. No credits, no speed limits.
            </p>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-50">
              Content Tools
            </h4>
            <ul className="mt-4 space-y-2">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-50">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-50">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {currentYear} CaptionLab. All rights reserved. Built client-side for maximum privacy.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for social media growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
