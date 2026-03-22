import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  emoji: string;
  reward?: string;
}

export function CelebrationModal({ isOpen, onClose, title, subtitle, emoji, reward }: CelebrationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-card border-2 border-primary/40 rounded-2xl p-8 sm:p-10 max-w-sm w-full mx-4 text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Animated emoji */}
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              {emoji}
            </motion.div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                >
                  <Star className="w-6 h-6 text-python-yellow fill-python-yellow" />
                </motion.div>
              ))}
            </div>

            <motion.h2
              className="text-2xl font-extrabold text-foreground mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {subtitle}
            </motion.p>

            {reward && (
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reward-gold/10 border border-reward-gold/30 text-reward-gold font-medium text-sm mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                💰 {reward}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button onClick={onClose} className="w-full gap-2 mt-2">
                <Trophy className="w-4 h-4" /> Continue 🚀
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
