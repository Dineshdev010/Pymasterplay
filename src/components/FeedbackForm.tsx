import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

import { useLocation } from "react-router-dom";

export function FeedbackForm() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Please select a star rating", variant: "destructive" });
      return;
    }
    if (!message.trim()) {
      toast({ title: "Please write a message", variant: "destructive" });
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`PyMaster Feedback - ${rating}⭐`);
    const body = encodeURIComponent(
      `Name: ${name || "Anonymous"}\nRating: ${"⭐".repeat(rating)} (${rating}/5)\n\nFeedback:\n${message}`
    );
    window.open(`mailto:pymasterg@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => {
      setSending(false);
      setIsOpen(false);
      setRating(0);
      setName("");
      setMessage("");
      toast({ title: "Thank you for your feedback! ⭐" });
    }, 1000);
  };

  if (!isHomePage) return null;

  return (
    <>
      {/* Zen Ultra-Premium Feedback Trigger (Bottom Right) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 lg:bottom-12 right-12 z-[60] group flex items-center justify-center"
        title="Send Feedback"
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
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 pointer-events-none"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/60 blur-[1px] shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          </motion.div>

          {/* Main Zen Body */}
          <div className="relative w-full h-full rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-all duration-700 ease-in-out">
            {/* Refined Internal Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <MessageSquare className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-all duration-700 ease-in-out group-hover:scale-110" strokeWidth={1.5} />
            
            {/* Light Sweep Effect */}
            <motion.div 
              animate={{ x: [-100, 100] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />
          </div>

          {/* Hyper-Elegant Floating Label (Mirroring Search) */}
          <div className="absolute right-full mr-8 px-5 py-2.5 rounded-[2rem] bg-background/30 backdrop-blur-3xl border border-white/5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-1000 pointer-events-none hidden lg:flex items-center gap-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Feedback</span>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/10 dark:bg-white/5 border border-white/5">
              <Star className="w-2.5 h-2.5 text-python-yellow" fill="currentColor" />
              <span className="text-[9px] font-bold text-muted-foreground/60 tracking-tighter">Rate</span>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              className="relative w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-foreground mb-1">Rate PyMaster ⭐</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your feedback helps us improve!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredStar || rating)
                            ? "text-python-yellow fill-python-yellow"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    className="text-center text-sm text-python-yellow font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {["", "Poor 😔", "Fair 😐", "Good 🙂", "Great 😄", "Amazing 🤩"][rating]}
                  </motion.p>
                )}

                <Input
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="bg-surface-2 border-border"
                />

                <Textarea
                  placeholder="Write your feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  rows={4}
                  className="bg-surface-2 border-border resize-none"
                />

                <Button type="submit" className="w-full" disabled={sending}>
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Sending..." : "Send Feedback"}
                </Button>

                <p className="text-[10px] text-muted-foreground text-center">
                  Feedback will be sent to pymasterg@gmail.com
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
