import React from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  Instagram, 
  Youtube, 
  Hash, 
  Type, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      name: "Instagram Caption Generator",
      desc: "Generate scroll-stopping hooks, bullet points, and customized calls-to-action for your grid posts and Reels.",
      icon: Instagram,
      slug: "instagram-caption-generator",
      color: "from-pink-500 to-rose-500",
      badge: "Viral Hits"
    },
    {
      name: "YouTube Title Generator",
      desc: "Create click-worthy, CTR-optimized video titles that stand out in feed recommendations and search.",
      icon: Youtube,
      slug: "youtube-title-generator",
      color: "from-red-500 to-orange-500",
      badge: "CTR Boost"
    },
    {
      name: "Hashtag Generator",
      desc: "Find low-competition and high-reach hashtags arranged in optimal copy-paste density lists.",
      icon: Hash,
      slug: "hashtag-generator",
      color: "from-blue-500 to-indigo-500",
      badge: "SEO Reach"
    },
    {
      name: "Fancy Text Generator",
      desc: "Style standard captions into bold, italic, script, and aesthetic unicode fonts to stand out visually.",
      icon: Type,
      slug: "fancy-text-generator",
      color: "from-amber-500 to-yellow-500",
      badge: "Formatting"
    },
    {
      name: "Blog Title Generator",
      desc: "Develop catchy, SEO-friendly article headers and click-maximizing titles based on target keywords.",
      icon: FileText,
      slug: "blog-title-generator",
      color: "from-emerald-500 to-teal-500",
      badge: "SEO Traffic"
    }
  ];

  const features = [
    {
      title: "No Signups or APIs Needed",
      desc: "Use every tool completely free without sharing email or configuring API keys. Pure local processing.",
      icon: ShieldCheck
    },
    {
      title: "Zero Latency Speeds",
      desc: "Built entirely on client-side JS logic, pages and results load instantly with no server queue times.",
      icon: Zap
    },
    {
      title: "LocalStorage Saved History",
      desc: "Your runs and favorite generated items are stored directly inside your browser so you never lose them.",
      icon: Clock
    },
    {
      title: "Optimized for Search Traffic",
      desc: "Designed using schema markup and clean structures to capture long-tail organic search volume.",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: "CaptionLab has completely changed my Instagram scheduling process. The captions it generates are formatted beautifully without breaking line breaks.",
      author: "Sarah K.",
      role: "Social Media Specialist",
      handle: "@sarahk_creates"
    },
    {
      quote: "The YouTube Title generator is gold. I ran two A/B tests on older videos using its recommendations and saw click-through rates jump by 3%.",
      author: "Devon Miller",
      role: "Vlogger & Educator",
      handle: "MillerTech"
    },
    {
      quote: "I use the Fancy Text tool for my Twitter bio and newsletters. It's clean, doesn't crash on mobile, and doesn't spam me with ads.",
      author: "Alex Rivers",
      role: "Indie Maker",
      handle: "@alex_rivers"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-400/10 dark:bg-violet-900/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-400/10 dark:bg-indigo-900/10 blur-[100px] pointer-events-none animate-pulse-slow" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 px-3.5 py-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/50 mb-6 hover:scale-105 transition-transform duration-200">
            <Sparkles className="h-4 w-4" />
            100% Free Creator Workspace
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 max-w-4xl mx-auto leading-[1.1] font-heading">
            Create Scroll-Stopping Social Media Content in{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Seconds
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Generate high-converting captions, click-worthy titles, optimized hashtags, and aesthetic fonts. Fast, client-side, and no signups required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3.5 shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 transition-all hover:-translate-y-0.5"
            >
              Explore Free Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium px-6 py-3.5 transition-all hover:-translate-y-0.5"
            >
              Read Growth Blog
            </Link>
          </div>

          {/* Interactive Mockup Container */}
          <div className="mt-16 lg:mt-20 max-w-5xl mx-auto p-2 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-inner">
              {/* Mockup Header Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 block" />
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  captionlab.com/tools/instagram-generator
                </div>
                <div className="w-12" />
              </div>

              {/* Mockup Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 text-left p-6 md:p-8 gap-6 md:gap-8 bg-slate-50/50 dark:bg-slate-950">
                {/* Inputs Panel Mockup */}
                <div className="md:col-span-5 space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/50 shadow-sm">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Enter Topic / Keyword</label>
                    <div className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center px-3 text-sm text-slate-400">
                      Product launch details...
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Select Tone</label>
                    <div className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between px-3 text-sm text-slate-400">
                      <span>Excited 🚀</span>
                      <span className="text-xs">▼</span>
                    </div>
                  </div>
                  <button disabled className="w-full h-11 rounded-lg bg-violet-600 text-white font-medium text-sm flex items-center justify-center shadow-sm">
                    Generate Hook
                  </button>
                </div>

                {/* Outputs Panel Mockup */}
                <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Generated Results</span>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm relative group">
                      <div className="text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                        🚨 STOP scrolling! We just launched something huge. CaptionLab is finally here—100% free content tools for creators.
                      </div>
                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex gap-2">
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-500 font-mono">#marketing</span>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-500 font-mono">#saas</span>
                        </div>
                        <span className="text-xs text-violet-500 font-medium">Click to Copy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ads Integration Space (Soft AdSense Mockup for Stage 5/9 validation) */}
      <div className="max-w-7xl mx-auto w-full px-4 mb-20 text-center">
        <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/30 py-4 px-6 text-xs text-slate-400 tracking-wider uppercase font-mono">
          Sponsored Link Ad Space
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-slate-100/40 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-heading">
              Our Content Creation Hub
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              No API keys or complex setups. Select one of our dedicated generators and start creating instantly.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Tool Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${tool.color} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-heading">
                      {tool.name}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
                    >
                      Launch Tool
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                <Award className="h-3.5 w-3.5" /> Core Advantages
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight font-heading">
                Lightweight Tools Built For Maximum Output
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                Why load heavy SaaS workspaces when you just need copy-pasteable social captions and tags? CaptionLab runs right inside your web client. No servers, no signups, no credit limits.
              </p>
            </div>

            {/* Right side grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 font-heading">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-100/40 dark:bg-slate-900/20 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-heading">
              Loved By Creators & Marketers
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              See what creators think about building content with CaptionLab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between"
              >
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {t.author}
                    </h4>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {t.role}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-violet-500">
                    {t.handle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-700 text-white p-8 md:p-12 lg:p-16 shadow-xl overflow-hidden text-center">
            {/* Background design elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-400/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
                Ready to Supercharge Your Content Output?
              </h2>
              <p className="text-sm md:text-base text-violet-100 leading-relaxed">
                Save hours of caption copywriting and hashtag sorting. Get immediate results with zero restrictions. Free forever.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tools"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-violet-700 hover:bg-violet-50 font-medium px-6 py-3.5 shadow-sm transition-all"
                >
                  Generate Content Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-violet-800/20 hover:bg-violet-800/30 text-white font-medium px-6 py-3.5 transition-all"
                >
                  Read Growth Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
