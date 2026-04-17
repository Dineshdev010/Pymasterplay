import { useEffect, useState } from "react";
import { Download, Smartphone, Share2, X, ExternalLink, Zap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";


interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const PWA_MODAL_DISMISSED_KEY = "pymaster_pwa_prompt_dismissed";


function isIosDevice() {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}



function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function PwaInstallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);


  useEffect(() => {
    if (isStandaloneMode()) return;

    const dismissed = localStorage.getItem(PWA_MODAL_DISMISSED_KEY);
    const now = Date.now();
    
    // If dismissed recently (within 24 hours), don't show
    if (dismissed && now - parseInt(dismissed) < 1000 * 60 * 60 * 24) {
      return;
    }

    setIsIos(isIosDevice());


    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);

      
      // Auto-trigger the popup after a delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000); // 15 seconds delay for engagement
      return () => clearTimeout(timer);
    };

    // Logic for when native prompt is not supported but we want to show instructions anyway (like iOS)
    if (isIosDevice()) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 25000); // Longer delay for iOS since we can't trigger native prompt
      return () => clearTimeout(timer);
    }

    const handleOpenManual = () => {
      setIsOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("pymaster-open-pwa-modal", handleOpenManual);
    
    // Check if prompt already fired before React mounted
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt as BeforeInstallPromptEvent);

      setTimeout(() => setIsOpen(true), 15000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("pymaster-open-pwa-modal", handleOpenManual);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsOpen(false);
        localStorage.setItem(PWA_MODAL_DISMISSED_KEY, Date.now().toString());
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      // iOS just stays open to show instructions
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(PWA_MODAL_DISMISSED_KEY, Date.now().toString());
  };

  if (isStandaloneMode()) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={handleDismiss}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Brand Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-500 to-cyan-500" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                {/* Logo Section */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative bg-gradient-to-br from-surface-1 to-surface-2 p-4 rounded-2xl border border-border shadow-xl">
                    <img src="/logo.png" alt="PyMaster" className="w-16 h-16 rounded-xl brightness-110 saturate-150 contrast-110" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                  Take PyMaster Anywhere
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-sm leading-relaxed mb-8">
                  Install the app for the best learning experience. Practice Python anytime, even in low connection.
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-streak-green/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-streak-green" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80">Faster Loading</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80">One-Tap Access</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-reward-gold/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-reward-gold" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80">Private & Secure</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-expert-purple/10 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-expert-purple" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80">Full Screen View</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                  {!isIos ? (
                    <Button 
                      size="lg" 
                      className="w-full h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 shadow-[0_8px_20px_rgba(37,99,235,0.3)] gap-2 group"
                      onClick={handleInstall}
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Install PyMaster App
                    </Button>
                  ) : (
                    <div className="space-y-4">
                       <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-left">
                        <div className="flex items-center gap-2 mb-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <h3 className="font-bold text-foreground">Add to iPhone</h3>
                        </div>
                        <ol className="space-y-4 text-sm">
                          <li className="flex gap-3 items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">1</span>
                            <span className="text-muted-foreground leading-snug">
                              Tap the <Share2 className="w-4 h-4 inline-block mx-1 text-primary" /> <strong>Share</strong> button in the Safari footer.
                            </span>
                          </li>
                          <li className="flex gap-3 items-start">
                             <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">2</span>
                             <span className="text-muted-foreground leading-snug">
                              Scroll down and choose <strong className="text-foreground">"Add to Home Screen"</strong>.
                            </span>
                          </li>
                          <li className="flex gap-3 items-start">
                             <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">3</span>
                             <span className="text-muted-foreground leading-snug">
                              Tap <strong className="text-foreground">Add</strong> in the top right corner.
                            </span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleDismiss}
                    className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Maybe later
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Accent */}
            <div className="bg-secondary/20 p-4 border-t border-border flex items-center justify-center">
               <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3" /> Built for Modern Web Safety
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
