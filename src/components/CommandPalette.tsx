// ============================================================
// COMMAND PALETTE — src/components/CommandPalette.tsx
// A high-performance, Ctrl+K accessible navigation hub.
// Features: Recent searches, Quick Actions, and Pro UI.
// ============================================================
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Command } from "cmdk";
import { 
  Search, 
  BookOpen, 
  Code, 
  LayoutDashboard, 
  Trophy, 
  Briefcase, 
  Info, 
  Home, 
  Settings,
  Hash, 
  Zap, 
  Sparkles, 
  Terminal, 
  Moon, 
  Sun,
  Command as CommandIcon, 
  Clock, 
  Globe, 
  Volume2,
  VolumeX,
  ChevronRight,
  Star,
  Layers,
  Brain,
  Calculator,
  LogOut,
  User
} from "lucide-react";
import { lessons } from "@/data/lessons";
import { problems } from "@/data/problems";
import { careerTracks } from "@/data/careerLessons";
import { dsaTopics } from "@/pages/DSAPage";
import { aptitudeTypes } from "@/data/aptitudeQuestions";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useSound } from "@/contexts/SoundContext";

interface RecentItem {
  id: string;
  type: 'page' | 'lesson' | 'problem' | 'dsa' | 'aptitude';
  label: string;
  path: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { muted, toggleMuted } = useSound();
  const [search, setSearch] = useState("");
  
  const isHomePage = location.pathname === "/";

  // --- Optimized Data Lists ---
  const careerModules = useMemo(() => 
    careerTracks.flatMap(track => 
      track.lessons.map(lesson => ({ 
        ...lesson, 
        trackId: track.id, 
        trackTitle: track.title 
      }))
    ), []
  );

  const problemsList = useMemo(() => problems.slice(0, 50), []);

  // Load recent items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pymaster_recent_commands");
    if (saved) setRecent(JSON.parse(saved));
  }, []);

  // Save a recent item
  const addToRecent = useCallback((item: RecentItem) => {
    setRecent((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, 5);
      localStorage.setItem("pymaster_recent_commands", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle the menu when ⌘K / Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    const handleOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", handleOpen);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  const runCommand = useCallback((command: () => void, item?: RecentItem) => {
    setOpen(false);
    if (item) addToRecent(item);
    command();
  }, [addToRecent]);

  return (
    <>
      {/* Zen Ultra-Premium Floating Trigger Button (Home screen only) */}
      {isHomePage && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-24 lg:bottom-12 left-12 z-[60] group flex items-center justify-center"
          title="Global Search (Ctrl+K)"
        >
          {/* Harmonic Pulse Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ 
                  opacity: [0.5, 0], 
                  scale: [1, 2],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 2,
                  ease: "easeOut"
                }}
                className="absolute w-full h-full rounded-full border border-primary/20 pointer-events-none"
              />
            ))}
          </div>

          <div className="relative w-14 h-14">
            {/* Celestial Orbiting Dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/60 blur-[1px] shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
            </motion.div>

            {/* Main Zen Body */}
            <div className="relative w-full h-full rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-all duration-700 ease-in-out">
              {/* Refined Internal Glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <Search className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-all duration-700 ease-in-out group-hover:scale-110" strokeWidth={1.5} />
              
              {/* Light Sweep Effect */}
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              />
            </div>

            {/* Hyper-Elegant Floating Label */}
            <div className="absolute left-full ml-8 px-5 py-2.5 rounded-[2rem] bg-background/30 backdrop-blur-3xl border border-white/5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-1000 pointer-events-none hidden lg:flex items-center gap-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Search</span>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/10 dark:bg-white/5 border border-white/5">
                <CommandIcon className="w-2.5 h-2.5 text-muted-foreground/50" />
                <span className="text-[9px] font-bold text-muted-foreground/60 tracking-tighter">K</span>
              </div>
            </div>
          </div>
        </motion.button>
      )}

      {/* Command Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
              className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/20 dark:border-white/10 bg-background/80 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
              <Command className="flex h-full w-full flex-col overflow-hidden relative z-10">
                {/* Search Input Area */}
                <div className="flex items-center border-b border-border/40 px-8 py-2 bg-background/40">
                  <div className="relative mr-4">
                    <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md animate-pulse" />
                    <Search className="relative h-5 w-5 shrink-0 text-primary" />
                  </div>
                  <Command.Input 
                    autoFocus
                    placeholder="Search anything... (lessons, problems, tools)" 
                    value={search}
                    onValueChange={setSearch}
                    className="flex h-16 w-full rounded-md bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <kbd className="h-6 rounded border border-border bg-secondary/50 px-2 text-[10px] font-mono text-muted-foreground flex items-center shadow-sm">ESC</kbd>
                  </div>
                </div>

                <Command.List className="max-h-[450px] overflow-y-auto overflow-x-hidden p-3 scroll-py-2 custom-scrollbar">
                  <Command.Empty className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No matches found. Try searching for "Python" or "Loop".</p>
                    </div>
                  </Command.Empty>

                  {/* Recently Visited */}
                  {recent.length > 0 && (
                    <Command.Group heading={<GroupHeader icon={Clock} label="Recently Visited" />}>
                      {recent.map((item) => (
                        <PaletteItem 
                          key={item.id}
                          type={item.type}
                          icon={item.type === 'lesson' ? Hash : item.type === 'problem' ? Code : Globe}
                          label={item.label}
                          onSelect={() => runCommand(() => navigate(item.path))}
                        />
                      ))}
                    </Command.Group>
                  )}

                  {/* Quick Actions */}
                  <Command.Group heading={<GroupHeader icon={Zap} label="Quick Actions" />}>
                    <PaletteItem 
                      type="page"
                      icon={theme === "dark" ? Sun : Moon} 
                      label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`} 
                      onSelect={() => runCommand(() => toggleTheme())} 
                    />
                    <PaletteItem 
                      type="page"
                      icon={muted ? Volume2 : VolumeX} 
                      label={muted ? "Unmute Sounds" : "Mute Sounds"} 
                      onSelect={() => runCommand(() => toggleMuted())} 
                    />
                  </Command.Group>

                  {/* Navigation */}
                  <Command.Group heading={<GroupHeader icon={LayoutDashboard} label="Navigation" />}>
                    <PaletteItem type="page" icon={Home} label="Home" onSelect={() => runCommand(() => navigate("/"), { id: 'home', type: 'page', label: 'Home', path: '/' })} />
                    <PaletteItem type="page" icon={LayoutDashboard} label="Dashboard" onSelect={() => runCommand(() => navigate("/dashboard"), { id: 'dash', type: 'page', label: 'Dashboard', path: '/dashboard' })} />
                    <PaletteItem type="page" icon={BookOpen} label="Curriculum" onSelect={() => runCommand(() => navigate("/learn"), { id: 'learn', type: 'page', label: 'Learn', path: '/learn' })} />
                    <PaletteItem type="page" icon={Code} label="Code Problems" onSelect={() => runCommand(() => navigate("/problems"), { id: 'probs', type: 'page', label: 'Problems', path: '/problems' })} />
                    <PaletteItem type="page" icon={Terminal} label="Python Compiler" onSelect={() => runCommand(() => navigate("/compiler"), { id: 'comp', type: 'page', label: 'Compiler', path: '/compiler' })} />
                  </Command.Group>

                   {/* Top Lessons */}
                  <Command.Group heading={<GroupHeader icon={Hash} label="Featured Lessons" />}>
                    {(search ? lessons : lessons.slice(0, 10)).map((lesson) => (
                      <PaletteItem
                        key={lesson.id}
                        type="lesson"
                        icon={Hash}
                        label={lesson.title}
                        description={lesson.category}
                        onSelect={() => runCommand(() => navigate(`/learn?lesson=${lesson.id}`), { id: lesson.id, type: 'lesson', label: lesson.title, path: `/learn?lesson=${lesson.id}` })}
                      />
                    ))}
                  </Command.Group>

                  {/* Career Track Modules */}
                  <Command.Group heading={<GroupHeader icon={Layers} label="Career Modules" />}>
                    {(search ? careerModules : careerModules.slice(0, 10)).map((lesson) => (
                      <PaletteItem
                        key={lesson.id}
                        type="career"
                        icon={Layers}
                        label={lesson.title}
                        description={lesson.trackTitle}
                        onSelect={() => runCommand(() => navigate(`/career/${lesson.trackId}?lesson=${lesson.id}`), { id: lesson.id, type: 'lesson', label: lesson.title, path: `/career/${lesson.trackId}?lesson=${lesson.id}` })}
                      />
                    ))}
                  </Command.Group>

                  {/* DSA Topics */}
                  <Command.Group heading={<GroupHeader icon={Brain} label="DSA Topics" />}>
                    {(search ? dsaTopics : dsaTopics.slice(0, 10)).map((topic) => (
                      <PaletteItem
                        key={topic.id}
                        type="dsa"
                        icon={Brain}
                        label={topic.title}
                        description={topic.difficulty}
                        onSelect={() => runCommand(() => navigate(`/dsa?topic=${topic.id}`), { id: topic.id, type: 'dsa', label: topic.title, path: `/dsa?topic=${topic.id}` })}
                      />
                    ))}
                  </Command.Group>

                  {/* Aptitude Modules */}
                  <Command.Group heading={<GroupHeader icon={Calculator} label="Aptitude & Reasoning" />}>
                    {aptitudeTypes.map((type) => (
                      <PaletteItem
                        key={type.title}
                        type="aptitude"
                        icon={Calculator}
                        label={type.title}
                        description={type.focus}
                        onSelect={() => runCommand(() => navigate(`/aptitude?type=${type.title}`), { id: type.title, type: 'aptitude', label: type.title, path: `/aptitude?type=${type.title}` })}
                      />
                    ))}
                  </Command.Group>

                  {/* Coding Problems */}
                  <Command.Group heading={<GroupHeader icon={Star} label="Practice Problems" />}>
                    {(search ? problemsList : problemsList.slice(0, 10)).map((problem) => (
                      <PaletteItem
                        key={problem.id}
                        type="problem"
                        icon={Code}
                        label={problem.title}
                        description={problem.difficulty}
                        onSelect={() => runCommand(() => navigate(`/problems/${problem.id}`), { id: problem.id, type: 'problem', label: problem.title, path: `/problems/${problem.id}` })}
                      />
                    ))}
                  </Command.Group>

                </Command.List>

                {/* Footer Info */}
                <div className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Select</span>
                    <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Navigate</span>
                  </div>
                  <span className="text-primary">PyMaster Pro v1.0</span>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function GroupHeader({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2.5 py-4 px-3">
      <div className="h-0.5 w-6 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
      <span className="text-[11px] font-black uppercase tracking-[0.25em] text-primary/80">{label}</span>
      <div className="h-px flex-1 bg-border/40" />
    </div>
  );
}

const PaletteItem = React.memo(({ icon: Icon, label, description, onSelect, type }: { icon: any; label: string; description?: string; onSelect: () => void; type?: string }) => {
  const colors = {
    lesson: 'border-amber-500/20 bg-amber-500/10 text-amber-600',
    problem: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600',
    career: 'border-sky-500/20 bg-sky-500/10 text-sky-600',
    dsa: 'border-purple-500/20 bg-purple-500/10 text-purple-600',
    aptitude: 'border-pink-500/20 bg-pink-500/10 text-pink-600',
    page: 'border-primary/20 bg-primary/10 text-primary',
  }[type || 'page'] || 'border-primary/20 bg-primary/10 text-primary';

  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-3xl px-5 py-4 text-sm text-foreground/70 aria-selected:bg-primary/5 data-[selected=true]:bg-primary/5 transition-all duration-300 group relative mb-2 mx-1 overflow-hidden"
    >
      <div className="flex items-center gap-5 relative z-10 min-w-0">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 group-aria-selected:scale-110 group-data-[selected=true]:scale-110 ${colors}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-base tracking-tight truncate group-aria-selected:text-foreground group-data-[selected=true]:text-foreground transition-colors">{label}</span>
          {description && (
            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em] truncate group-aria-selected:text-primary/70 group-data-[selected=true]:text-primary/70 transition-colors mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 opacity-0 translate-x-4 group-aria-selected:opacity-100 group-aria-selected:translate-x-0 group-data-[selected=true]:opacity-100 group-data-[selected=true]:translate-x-0 transition-all duration-300 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-primary/50">Open</span>
        <ChevronRight className="w-5 h-5 text-primary" />
      </div>
      
      {/* Active Indicator Bar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full group-aria-selected:h-8 group-data-[selected=true]:h-8 transition-all duration-300" />
      
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-aria-selected:opacity-100 group-data-[selected=true]:opacity-100 transition-opacity pointer-events-none" />
    </Command.Item>
  );
});

PaletteItem.displayName = "PaletteItem";
