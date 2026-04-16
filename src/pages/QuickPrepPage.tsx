import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { 
  Clock3, Copy, LayoutDashboard, Search, Star, StarOff, Play, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { 
  prepTracks, QUICK_TIPS, TECH_COLOR_CLASSES, TECH_DATA,
  getCardExplanation,
  type TechType, type CheatsheetCard, type CheatsheetSection, type TechEntry
} from "@/data/quickPrepData";
import { highlightSnippet } from "@/utils/highlighter";
import { Sparkles, Terminal, Code2, Brain, Target, HelpCircle } from "lucide-react";
import { useTour } from "@/contexts/TourContext";


export default function QuickPrepPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TechType>('python');
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Persistence for favorites
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("pymaster_prep_favs") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("pymaster_prep_favs", JSON.stringify(favorites));
  }, [favorites]);

  const activeTech = TECH_DATA[activeTab];
  const activeKey = activeTab === "pandas" ? "Pandas" : activeTab;
  const sectionFilterText = query.trim().toLowerCase();
  
  const filteredSections = useMemo(
    () =>
      activeTech.sections
        .map((section) => ({
          ...section,
          cards: section.cards.filter((card) => {
            const matchesQuery = !sectionFilterText || `${card.title} ${card.snippet}`.toLowerCase().includes(sectionFilterText);
            const matchesFavorites = !showFavoritesOnly || favorites[`${activeTab}:${section.title}:${card.title}`];
            return matchesQuery && matchesFavorites;
          }),
        }))
        .filter((section) => section.cards.length > 0),
    [activeTech.sections, activeTab, favorites, sectionFilterText, showFavoritesOnly],
  );

  const activeTechSummary = {
    sections: filteredSections.length,
    snippets: filteredSections.reduce((total, section) => total + section.cards.length, 0),
  };

  const totalFavorites = useMemo(() => Object.values(favorites).filter(Boolean).length, [favorites]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Snippet copied!", { icon: "📋" });
  };

  const toggleFavorite = (key: string) => {
    setFavorites((current) => ({ ...current, [key]: !current[key] }));
  };

  const { startTour, hasSeenTour } = useTour();

  const handleStartTour = useCallback(() => {
    startTour([
      {
        targetId: "tour-prep-header",
        title: "Quick Prep Hub",
        content: "Master key concepts in minutes. Perfect for last-minute interview reviews or daily warmups.",
      },
      {
        targetId: "tour-prep-tracks",
        title: "Guided Tracks",
        content: "Choose a track based on your time constraints. 15, 30, or 25-minute sprints.",
      },
      {
        targetId: "tour-tech-tabs",
        title: "Switch Technologies",
        content: "Switch between Python, SQL, Pandas, Linux, and Git instantly.",
      },
      {
        targetId: "tour-search",
        title: "Search & Filter",
        content: "Quickly find the specific concept or command you're looking for.",
      },
      {
        targetId: "tour-first-card",
        title: "Snippet Cards",
        content: "Every card includes a copyable snippet and a shortcut to open it in the compiler.",
      },
      {
        targetId: "tour-fav-star",
        title: "Save Favorites",
        content: "Click the star to save snippets you use often. They'll stay here even if you refresh!",
      },
    ], "quickprep");
  }, [startTour]);

  useEffect(() => {
    if (!hasSeenTour("quickprep")) {
      const timer = setTimeout(() => {
        handleStartTour();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTour, handleStartTour]);

  const openInCompiler = (codeSnippet: string) => {
    // Map 'git' to 'linux' for the compiler terminal mode
    const compilerLang = activeTab === 'git' ? 'linux' : activeTab;
    navigate(`/compiler?code=${encodeURIComponent(codeSnippet)}&lang=${compilerLang}`);
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 selection:bg-primary/30">
      <Helmet>
        <title>Quick Prep | PyMaster Hub</title>
        <meta name="description" content="Multi-tech interview prep for Python, SQL, Pandas, Linux, and Git." />
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 bg-[#0b1020]/50 py-16 sm:py-20">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-indigo-500/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="max-w-4xl flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <Link to="/" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/30">←</span>
                  Back to Dashboard
                </Link>
                <div id="tour-prep-header" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                  <Target className="h-4 w-4" />
                  Master Prep hub
                </div>
                <button 
                  onClick={handleStartTour}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  <HelpCircle className="h-4 w-4" /> Tour
                </button>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
                Ready in <span className="text-primary italic font-serif">Minutes</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl font-medium">
                High-yield patterns for <span className="text-white">Python</span>, <span className="text-white">SQL</span>, <span className="text-white">Data</span>, and <span className="text-white">System Ops</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* --- STATS OVERVIEW --- */}
        <div className="mb-10 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-xl">
              <Code2 className="h-5 w-5 text-blue-400" />
              <div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Coverage</div>
                 <div className="text-xl font-bold text-white tracking-tight">Full Hub</div>
              </div>
           </div>
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-xl">
              <Brain className="h-5 w-5 text-amber-400" />
              <div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Readiness</div>
                 <div className="text-xl font-bold text-white tracking-tight">High Yield</div>
              </div>
           </div>
        </div>

        {/* --- PREP TRACKS --- */}
        <div id="tour-prep-tracks" className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {prepTracks.map((track, idx) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative rounded-[2rem] border border-white/5 bg-slate-900/40 p-1 overflow-hidden transition-all hover:border-white/10 hover:shadow-2xl`}
            >
              <div className={`p-6 space-y-6`}>
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner">
                    <Clock3 className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{track.duration}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{track.title}</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">{track.description}</p>
                </div>
                
                <div className="space-y-2">
                   {track.steps.map((step) => {
                     const StepIcon = step.icon;
                     return (
                        <Link 
                          key={step.label} 
                          to={step.to}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.08] transition-all group/step"
                        >
                          <StepIcon className="h-4 w-4 text-slate-500 group-hover/step:text-primary" />
                          <span className="text-base font-bold text-slate-300">{step.label}</span>
                        </Link>
                     );
                   })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Tech Selection</span>
          </div>
          
          <div id="tour-tech-tabs" className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md">
            {Object.entries(TECH_DATA).map(([key, data]: [string, TechEntry]) => {
              const Icon = data.icon;
              const isActive = activeTab === key;
              const palette = TECH_COLOR_CLASSES[key as TechType];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as TechType)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                    isActive 
                      ? palette.tabActive
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? palette.iconActive : ""}`} />
                  <span className="capitalize">{key === 'pandas' ? 'Pandas' : key}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold uppercase tracking-wider ${TECH_COLOR_CLASSES[activeTab].badge}`}>
            {activeKey} focus
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {activeTechSummary.sections} sections
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {activeTechSummary.snippets} snippets
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300">
            {totalFavorites} favorites
          </span>
        </div>

        <div id="tour-search" className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="group focus-within:ring-2 focus-within:ring-primary/40 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-slate-300 transition-all">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${activeKey} snippets...`}
              className="w-full bg-transparent text-base text-slate-200 outline-none placeholder:text-slate-500"
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            )}
          </label>
          <Button
            type="button"
            variant="outline"
            className={`border-white/10 h-full ${showFavoritesOnly ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-slate-300"}`}
            onClick={() => setShowFavoritesOnly((value) => !value)}
          >
            {showFavoritesOnly ? <StarOff className="mr-2 h-4 w-4 fill-primary" /> : <Star className="mr-2 h-4 w-4" />}
            {showFavoritesOnly ? "Show All" : "Favorites"}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {filteredSections.map((section: CheatsheetSection, sectionIdx) => (
              <div key={section.title} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-base font-black tracking-widest text-slate-400 uppercase">{section.title}</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:gap-6">
                  {section.cards.map((card: CheatsheetCard, cardIdx) => (
                    (() => {
                      const favoriteKey = `${activeTab}:${section.title}:${card.title}`;
                      const isFavorite = Boolean(favorites[favoriteKey]);
                      return (
                    <div
                      key={card.title}
                      id={sectionIdx === 0 && cardIdx === 0 ? "tour-first-card" : undefined}
                      className="group relative rounded-[1.5rem] border border-white/5 bg-slate-900/40 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div className="mb-4 flex items-center justify-between">
                         <h4 className="text-base font-bold text-slate-100">{card.title}</h4>
                         <div className="flex items-center gap-1.5">
                           <button 
                             onClick={() => openInCompiler(card.snippet)}
                             className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-primary hover:border-primary/40 transition-all"
                             title="Open in Compiler"
                           >
                             <Play className="h-4 w-4" />
                           </button>
                           <button
                             onClick={() => toggleFavorite(favoriteKey)}
                             id={sectionIdx === 0 && cardIdx === 0 ? "tour-fav-star" : undefined}
                             className={`p-1.5 rounded-lg border transition-all ${isFavorite ? "border-primary/40 bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-slate-400 hover:text-primary"}`}
                           >
                             <Star className={`h-4 w-4 ${isFavorite ? 'fill-primary' : ''}`} />
                           </button>
                           <button 
                             onClick={() => copyToClipboard(card.snippet)}
                             className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-primary transition-all md:opacity-0 md:group-hover:opacity-100"
                           >
                             <Copy className="h-4 w-4" />
                           </button>
                         </div>
                      </div>
                      {getCardExplanation(activeTab, card.title) && (
                        <p className="mb-4 text-sm text-slate-400 leading-relaxed">
                          {getCardExplanation(activeTab, card.title)}
                        </p>
                      )}
                      
                      {/* --- TERMINAL WRAPPER FOR LINUX --- */}
                      <div className={`rounded-xl overflow-hidden shadow-xl ${activeTab === 'linux' ? 'ring-1 ring-white/10' : ''}`}>
                        {activeTab === 'linux' && (
                          <div className="bg-[#1e1e1e] px-3 py-1.5 border-b border-white/5 flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        )}
                        <div className="bg-[#060b16] p-4 ring-1 ring-inset ring-indigo-400/30">
                          <pre className="overflow-x-auto text-[15px] sm:text-base font-mono text-blue-100 whitespace-pre selection:bg-fuchsia-500/30 leading-7 not-italic">
                            <code
                              dangerouslySetInnerHTML={{
                                __html: `${activeTab === 'linux' ? '<span class="text-emerald-300 font-semibold mr-1.5">$</span>' : ''}${highlightSnippet(card.snippet, activeTab)}`
                              }}
                            />
                          </pre>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                        <span className="text-sm font-semibold text-slate-400 tracking-wide">High Yield Pattern</span>
                      </div>
                    </div>
                      );
                    })()
                  ))}
                </div>
              </div>
            ))}
            {filteredSections.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-slate-300">No snippets match your current filters.</p>
                <p className="mt-1 text-base text-slate-500">Try a broader search or turn off favorites-only mode.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <section className="mt-20">
           <div className="rounded-[3rem] bg-gradient-to-br from-primary/10 via-slate-900 to-slate-950 p-10 sm:p-16 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Sparkles className="h-48 w-48 text-primary" />
              </div>
              <div className="relative space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Quick Rules for Mastery</h2>
                    <p className="max-w-xl text-lg text-slate-400 leading-relaxed">Apply these simple principles to your daily prep to level up fast.</p>
                 </div>
                 
                 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {QUICK_TIPS.map((tip, i) => (
                       <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 ring-1 ring-inset ring-white/[0.01]">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold text-lg border border-primary/20">
                             {i + 1}
                          </div>
                          <p className="text-base font-medium text-slate-300 leading-relaxed">{tip}</p>
                       </div>
                    ))}
                 </div>

                 <div className="pt-4">
                    <Button asChild className="rounded-2xl h-14 px-10 text-xl font-bold shadow-xl shadow-primary/20">
                       <Link to="/compiler" className="flex items-center gap-3">
                          Go to Compiler <Terminal className="h-5 w-5" />
                       </Link>
                    </Button>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
