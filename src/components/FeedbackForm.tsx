import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export function FeedbackForm() {
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

  return (
    <>
      {/* Floating feedback button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 0 0 hsl(212 92% 45% / 0.4)", "0 0 0 12px hsl(212 92% 45% / 0)", "0 0 0 0 hsl(212 92% 45% / 0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageSquare className="w-5 h-5" />
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
