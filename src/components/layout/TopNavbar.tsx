import { useState, useEffect } from "react";
import { 
  Check, ChevronDown, Clock, HeartHandshake, Languages, LogIn, LogOut, Menu, Moon, Settings, Sun, 
  Target, User, Volume2, VolumeX, Medal, Wallet, Focus, RefreshCw, LayoutGrid, Search, Command as CommandIcon,
  MousePointer2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";

import { AdViewModal } from "@/components/AdViewModal";
import { StreakFire } from "@/components/StreakFire";
import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { useFocus } from "@/contexts/FocusContext";
import { useSound } from "@/contexts/SoundContext";
import { useToast } from "@/hooks/use-toast";
import { getXpLevel } from "@/lib/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { navItems } from "./navItems";


const MENU_HINT_KEY = "pymaster_menu_hint_dismissed";



function TimeTracker() {
  const { progress, addTimeSpent } = useProgress();
  const [localTick, setLocalTick] = useState(0);

  // Tick local UI every second for a butter-smooth clock
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTick(p => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync to global context every 60 seconds (saves to localStorage automatically)
  useEffect(() => {
    const interval = setInterval(() => {
      addTimeSpent(60); 
    }, 60000);
    return () => clearInterval(interval);
  }, [addTimeSpent]);

  // Merge the persistently saved context time with the current minute's ticks
  const totalSeconds = (progress?.timeSpent || 0) + (localTick % 60);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const displayTime = hours > 0 
    ? `${hours}h ${minutes}m` 
    : `${minutes}m ${secs}s`;

  return (
    <div className="hidden lg:flex items-center">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono px-2 py-1 rounded-md bg-secondary/50 border border-border/50 shadow-sm" title="Total Code Time">
        <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span className="text-foreground tracking-wider font-semibold">{displayTime}</span>
      </div>
    </div>
  );
}

interface TopNavbarProps {
  onMenuToggle: () => void;
}

export function TopNavbar({ onMenuToggle }: TopNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { progress, syncNow } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { language, setLanguage, languageOptions, t } = useLanguage();
  const { muted, toggleMuted } = useSound();
  const { setShowFocusSettings, isActive, timeLeft } = useFocus();
  const { toast } = useToast();
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const primaryNavRoutes = ["/", "/learn", "/problems", "/dsa", "/dashboard"];
  const primaryNavItems = navItems.filter((item) => primaryNavRoutes.includes(item.to));
  const secondaryNavItems = navItems.filter((item) => !primaryNavRoutes.includes(item.to));
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuHint, setShowMenuHint] = useState(false);
  const menuGroups: Array<{ label: string; routes: string[] }> = [
    { label: t("menu.content"), routes: ["/blog", "/projects"] },
    { label: t("menu.practice"), routes: ["/compiler", "/quick-prep", "/python-game", "/python-quiz-100", "/aptitude"] },
    { label: t("menu.career"), routes: ["/jobs", "/career-roadmap", "/linux-learn", "/leaderboard", "/certificate"] },
    { label: t("menu.support"), routes: ["/donate", "/about", "/contact"] },
  ];
  const isRouteActive = (route: string) =>
    location.pathname === route || location.pathname.startsWith(`${route}/`);


  const groupedMenuItems = menuGroups
    .map((group) => ({
      label: group.label,
      items: group.routes
        .map((route) => secondaryNavItems.find((item) => item.to === route))
        .filter(Boolean),
    }))
    .filter((group) => group.items.length > 0);

  const groupedRouteSet = new Set(menuGroups.flatMap((g) => g.routes));
  const ungroupedMenuItems = secondaryNavItems.filter((item) => !groupedRouteSet.has(item.to));

  const handleSignOut = async () => {
    try {
      // Force immediate sync before clearing session and local storage
      await syncNow();
      await logout();
      toast({ title: "Signed out", description: "You've been signed out successfully." });
      navigate("/");
    } catch (err) {
      console.error("Sign out error", err);
      // Even if sync fails, we should probably allow logout, but let's warn
      await logout();
      toast({ title: "Signed out", description: "Progress sync failed, but you were signed out." });
      navigate("/");
    }
  };

  const handleHardRefresh = async () => {
    try {
      // Unregister all service workers
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      // Clear caches
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
          await caches.delete(name);
        }
      }
      // Force reload
      window.location.reload();
    } catch (error) {
      console.error("Hard refresh failed:", error);
      window.location.reload();
    }
  };

  const [showAd, setShowAd] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(MENU_HINT_KEY) === "1";
      if (!dismissed) setShowMenuHint(true);
    } catch {
      // ignore (privacy modes can block storage)
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    try {
      localStorage.setItem(MENU_HINT_KEY, "1");
    } catch {
      // ignore
    }
    setShowMenuHint(false);
  }, [menuOpen]);

  useEffect(() => {
    document.body.dataset.navProfileOpen = profileMenuOpen ? "true" : "false";
    window.dispatchEvent(new CustomEvent("pymaster-sidebar-change", { detail: { profileOpen: profileMenuOpen } }));

    return () => {
      delete document.body.dataset.navProfileOpen;
    };
  }, [profileMenuOpen]);

  const getLanguageTranslationKey = (val: string): any => {
    if (val === "english") return "language.defaultEnglish";
    return `language.${val}`;
  };
  const selectedLanguageLabel = t(getLanguageTranslationKey(language)) || "Default (English)";

  const xpLevel = getXpLevel(progress.xp);
  const isHighRank = xpLevel.level >= 13;

  const isPWA = typeof window !== "undefined" && (
    window.matchMedia("(display-mode: standalone)").matches || 
    (window.navigator as any).standalone || 
    document.referrer.includes("android-app://")
  );

  return (
    <>
    <style>{`
      @keyframes nav-shimmer {
        0% { transform: translateX(-150%); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateX(150%); opacity: 0; }
      }
    `}</style>
    <AdViewModal
      isOpen={showAd}
      onClose={() => setShowAd(false)}
      completionTitle="Thanks for supporting PyMaster"
      completionDescription="You can keep learning while we grow the platform."
    />
    <header className="h-[calc(4rem+env(safe-area-inset-top,0px))] sm:h-[calc(3.5rem+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] border-b border-border bg-card/80 backdrop-blur-md fixed top-0 left-0 right-0 z-[999] flex items-center px-2 sm:px-4 justify-between shrink-0 transition-all duration-300">
      <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
        <button
          onClick={onMenuToggle}
          className="flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 group relative">
          <div className="relative shrink-0">
            <motion.img 
              src="/logo.png" 
              alt="PyMaster" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl relative z-10 shadow-lg brightness-110 saturate-[1.7] contrast-110" 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <span className="font-bold text-base sm:text-lg text-foreground flex relative z-10 shrink-0">
            <span className="hidden sm:inline-flex">
              {"PyMaster".split("").map((char, index) => (
                <motion.span
                  key={index}
                  animate={{
                    y: [0, -4, 0, 4, 0], 
                    rotate: [0, 0, 0, 8, 0], 
                    opacity: [1, 1, 1, 0.8, 1], 
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4, 
                    delay: index * 0.1, 
                    times: [0, 0.2, 0.4, 0.6, 1], 
                    ease: "easeInOut"
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </span>
        </Link>
        <nav id="tour-nav-links" className="ml-1 hidden min-w-0 items-center gap-0.5 sm:flex xl:ml-2">
          <div className="flex shrink-0 items-center gap-0.5">
          {primaryNavItems.map((item) => {
            const navLabel = item.to === "/quick-prep"
              ? t("nav.quickPrep")
              : item.to === "/python-game"
                ? t("nav.pythonGame")
                : t(item.labelKey);
            const routeId = item.to === "/" ? "home" : (item.to.replace(/^\//, "") || "home");
            const hideOnLg = item.to === "/dashboard";
            return (
            <Link
              key={item.to}
              id={`tour-nav-${routeId}`}
              to={item.to}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 transition-all duration-200 ${
                hideOnLg ? "hidden xl:flex" : "flex"
              } ${
                isRouteActive(item.to)
                  ? "bg-secondary text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:scale-95"
              }`}
              title={navLabel}
            >
              <span className="shrink-0 text-base">{item.emoji}</span>
              <span className="whitespace-nowrap text-[11px] hidden xl:inline font-medium">{navLabel}</span>
            </Link>
          );
          })}
          </div>
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`relative ml-1 flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all duration-500 group overflow-hidden border border-border/50 hover:border-primary/50 ${
                  secondaryNavItems.some((item) => isRouteActive(item.to))
                    ? "bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "bg-secondary/40 text-muted-foreground hover:text-violet-300 hover:bg-secondary/60 hover:shadow-lg"
                }`}
                aria-label="Open more navigation links"
              >
                {/* Subtle Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-[25deg] animate-[nav-shimmer_6s_infinite] pointer-events-none" />

                <div className="relative flex items-center justify-center">
                  {/* Subtle pulsing background behind icon */}
                  <div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                  <LayoutGrid className="relative w-3.5 h-3.5 text-violet-400 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500" />
                </div>

                <span className="relative z-10">{t("common.menu")}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="mt-2 w-52">
              {groupedMenuItems.map((group, groupIndex) => (
                <div key={group.label}>
                  <DropdownMenuLabel className={groupIndex === 0 ? "px-2 py-1.5 text-xs" : "px-2 py-1.5 text-xs mt-1"}>
                    {group.label}
                  </DropdownMenuLabel>
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex w-full cursor-pointer items-center gap-2">
                        <span className="text-sm">{item.emoji}</span>
                        <span>{t(item.labelKey)}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {groupIndex < groupedMenuItems.length - 1 || ungroupedMenuItems.length > 0 ? <DropdownMenuSeparator /> : null}
                </div>
              ))}
              {ungroupedMenuItems.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex w-full cursor-pointer items-center gap-2">
                    <span className="text-sm">{item.emoji}</span>
                    <span>{t(item.labelKey)}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Smooth Real-Time Study Clock */}
        <div className="hidden md:block">
          <TimeTracker />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="hidden xl:flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium bg-secondary/50 text-foreground hover:bg-secondary transition-colors shrink-0 border border-border/60"
              aria-label="Select language"
              title={`Language: ${selectedLanguageLabel}`}
            >
              <Languages className="w-3.5 h-3.5 shrink-0" />
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 mt-2">
            <DropdownMenuLabel>{t("language.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languageOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => setLanguage(option.value)}
              >
                <span>{t(getLanguageTranslationKey(option.value))}</span>
                {language === option.value ? <Check className="w-4 h-4 text-primary" /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("pymaster-show-support-tip"))}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-500 shrink-0 group relative overflow-hidden"
          title={t("common.support")}
          aria-label={t("common.support")}
        >
          <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/5 transition-colors duration-500" />
          <HeartHandshake className="w-4 h-4 relative z-10 group-hover:scale-125 group-hover:animate-pulse transition-transform duration-500" />
        </button>

        <div className="hidden md:flex items-center gap-1">
          {!user && (
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={toggleMuted}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            title={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        <div className="hidden md:flex">
          <StreakFire streak={progress.streak} size="sm" showQuote />
        </div>
        <Link
          to="/dashboard"
          className="hidden sm:flex relative items-center rounded-full border border-border bg-secondary/20 backdrop-blur-md shadow-sm transition-all duration-500 hover:scale-105 group overflow-hidden shrink-0 h-9"
          title={`${xpLevel.title} Lv ${xpLevel.level} • Wallet: $${progress.wallet.toLocaleString()}`}
        >
          {/* Shared Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] animate-[nav-shimmer_5s_infinite] pointer-events-none" />

          {/* XP Level Section */}
          <div className={`flex items-center gap-1.5 px-3 h-full ${xpLevel.color} ${xpLevel.bg} border-r border-border relative`}>
            {isHighRank && (
              <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-[25deg] animate-[nav-shimmer_3s_infinite]" />
              </div>
            )}
            <Medal className={`w-3.5 h-3.5 ${isHighRank ? "animate-pulse" : ""}`} />
            <span className="font-bold tracking-tight text-[11px] whitespace-nowrap">
              <span className="hidden xl:inline mr-1">{xpLevel.title}</span>Lv {xpLevel.level}
            </span>
            {/* Micro Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[1.5px] bg-current opacity-10 w-full" />
            <div 
              className="absolute bottom-0 left-0 h-[1.5px] bg-current shadow-[0_0_4px_currentColor] transition-all duration-1000 ease-out" 
              style={{ width: `${xpLevel.progressPercentage}%` }} 
            />
          </div>

          {/* Wallet Section */}
          <div className="flex items-center gap-1.5 px-3 h-full bg-amber-500/10 text-amber-200">
            <Wallet className="h-3.5 w-3.5 text-amber-400 shrink-0 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="font-mono tracking-tighter shrink-0 font-black text-[11px]">
              ${progress.wallet.toLocaleString()}
            </span>
          </div>
        </Link>

        <button
          onClick={() => setShowFocusSettings(true)}
          className={`hidden md:flex relative items-center justify-center backdrop-blur-md transition-all duration-500 hover:scale-125 active:scale-95 group overflow-hidden ${
            isActive 
              ? "gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-600 dark:text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)] animate-pulse" 
              : "w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.6)] hover:shadow-[0_0_30px_rgba(217,70,239,0.8)] border border-white/30"
          }`}
          title={isActive ? "Focus Mode Active" : "Start Focus Mode"}
          aria-label="Focus Mode"
        >
          {/* Background Glow Effect on Hover */}
          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 blur-xl opacity-0 group-hover:opacity-100" />
          
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[25deg] animate-[nav-shimmer_2s_infinite]" />
          )}
          {!isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-[25deg] animate-[nav-shimmer_1.5s_infinite] group-hover:animate-[nav-shimmer_0.8s_infinite]" />
          )}
          
          <Target className={`relative z-10 ${isActive ? "w-3.5 h-3.5 animate-spin-slow drop-shadow-md" : "w-4 h-4 group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out drop-shadow-lg"}`} />
          
          {isActive && (
            <span className="relative z-10 font-bold tracking-tight text-[11px] font-mono drop-shadow-md">
              {formatTime(timeLeft)}
            </span>
          )}
        </button>


        {user ? (
          <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button id="tour-nav-profile" className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-secondary/30 hover:bg-secondary/50 border border-border/40 transition-all duration-300 outline-none cursor-pointer shrink-0 hover:shadow-md group">
                <Avatar className="h-7 w-7 shrink-0 border-2 border-primary/30 ring-2 ring-primary/5 shadow-sm transition-transform group-hover:scale-105">
                  {progress.avatarUrl ? (
                    <AvatarImage
                      src={progress.avatarUrl}
                      alt="Profile"
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-python-yellow/20 text-[10px] font-black text-primary">
                    {(progress.displayName || user.displayName || user.email || "U")[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`text-xs font-bold truncate max-w-[70px] sm:max-w-[120px] drop-shadow-sm animate-in fade-in slide-in-from-right-2 duration-500 ${
                  needRefresh 
                    ? "text-primary animate-pulse flex items-center gap-1" 
                    : "bg-gradient-to-r from-primary to-python-yellow bg-clip-text text-transparent"
                }`}>
                  {needRefresh ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin-slow" />
                      UPDATE READY
                    </>
                  ) : (
                    progress.displayName || user.displayName || user.email?.split("@")[0] || "User"
                  )}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-y-0.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="flex flex-col">
                <span className="truncate font-semibold">{progress.displayName || user.displayName || "User"}</span>
                <span className="truncate text-[10px] text-muted-foreground font-normal">{user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer flex items-center w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("common.profileDashboard")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  updateServiceWorker(true);
                }} 
                className={`cursor-pointer font-bold ${needRefresh ? "bg-primary/10 text-primary animate-pulse" : "text-primary"}`}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${needRefresh ? "animate-spin" : "animate-spin-slow"}`} />
                <span>{needRefresh ? "Click to Update Now" : "Refresh & Update"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{theme === "dark" ? t("common.lightMode") : t("common.darkMode")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  const current = localStorage.getItem("pymaster_custom_cursor") !== "false";
                  localStorage.setItem("pymaster_custom_cursor", (!current).toString());
                  window.dispatchEvent(new CustomEvent("pymaster_cursor_toggle"));
                  toast({ 
                    title: !current ? "Custom Cursor Disabled" : "Custom Cursor Enabled",
                    description: "Your preference has been saved."
                  });
                }} 
                className="cursor-pointer"
              >
                <MousePointer2 className="mr-2 h-4 w-4" />
                <span>{localStorage.getItem("pymaster_custom_cursor") === "false" ? "Enable Custom Cursor" : "Disable Custom Cursor"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("common.signOut")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-[9px] text-muted-foreground/50 font-mono text-right">
                v1.3.0-final-fix
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-blue-600 text-white hover:scale-105 transition-all duration-300 shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.4)] active:scale-95 shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t("common.signIn")}</span>
          </Link>
        )}
      </div>
    </header>
    </>
  );
}
