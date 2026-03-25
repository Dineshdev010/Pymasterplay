import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, HeartHandshake } from "lucide-react";
import { toast } from "sonner";
import { getNextAd, type AdConfig } from "@/data/ads";

const AD_DURATION = 15; // seconds to watch

export function AdViewModal({
  isOpen,
  onClose,
  onComplete,
  completionTitle = "Thanks for supporting PyMaster",
  completionDescription = "Your request has been unlocked.",
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  completionTitle?: string;
  completionDescription?: string;
}) {
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);
  const [completed, setCompleted] = useState(false);
  const [ad] = useState<AdConfig>(() => getNextAd());

  // NOTE: Google AdSense integration pending
  // When ready, replace the ad content div below with a GoogleAd component
  // See src/data/ads.ts for integration instructions
  // TODO: ADD ADSENSE GOOGLE AD SCRIPT HERE

  // Open ad link in new tab when modal opens (only if link exists)
  useEffect(() => {
    if (isOpen && ad.link) {
      window.open(ad.link, "_blank", "noopener,noreferrer");
    }
  }, [isOpen, ad.link]);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(AD_DURATION);
      setCompleted(false);
      return;
    }

    if (timeLeft <= 0) {
      if (!completed) {
        setCompleted(true);
        toast.success(completionTitle, { description: completionDescription });
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [completionDescription, completionTitle, isOpen, timeLeft, completed, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={completed ? onClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Ad Content */}
            <div className={`bg-gradient-to-br ${ad.color} p-8 text-center space-y-4`}>
              <h3 className="text-2xl font-bold text-white">{ad.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{ad.description}</p>
            </div>

            {/* Timer / Completion */}
            <div className="p-6 space-y-4">
              {!completed ? (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Support message in progress
                    </span>
                    <span className="font-mono font-bold text-foreground">{timeLeft}s</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((AD_DURATION - timeLeft) / AD_DURATION) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Keep this open for a moment to continue.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-3"
                >
                  <HeartHandshake className="w-12 h-12 text-primary mx-auto" />
                  <h4 className="text-lg font-bold text-foreground">{completionTitle}</h4>
                  <p className="text-sm text-muted-foreground">{completionDescription}</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
