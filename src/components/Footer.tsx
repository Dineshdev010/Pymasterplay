import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Heart, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [sawPython, setSawPython] = useState<boolean | null>(null);

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="PyMaster" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-lg text-foreground">PyMaster</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master Python from scratch with crystal-clear lessons, coding challenges, and a reward system.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Learn</h4>
            <ul className="space-y-2">
              <li><Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Python Lessons</Link></li>
              <li><Link to="/problems" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Practice Problems</Link></li>
              <li><Link to="/compiler" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Code Editor</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Python Jobs</Link></li>
              <li><Link to="/dsa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">DSA Mastery</Link></li>
              <li><Link to="/donate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">❤️ Donate</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Python Docs</a></li>
              <li><a href="https://pypi.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">PyPI Packages</a></li>
              <li><a href="https://pep8.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">PEP 8 Style Guide</a></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">🔒 Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">✉️ Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Did you see the Python? */}
        <motion.div
          className="border-t border-border pt-6 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-secondary/50 rounded-xl p-4 text-center mb-6">
            <motion.p
              className="text-sm font-medium text-foreground mb-3 flex items-center justify-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-xl">🐍</span>
              Did you see the Python slithering across your screen?
              <span className="text-xl">🐍</span>
            </motion.p>
            <div className="flex items-center justify-center gap-3">
              <motion.button
                onClick={() => setSawPython(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sawPython === true
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                Yes, I saw it! 🎉
              </motion.button>
              <motion.button
                onClick={() => setSawPython(false)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sawPython === false
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EyeOff className="w-4 h-4" />
                Not yet 👀
              </motion.button>
            </div>
            {sawPython === true && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-accent mt-2 font-medium"
              >
                🎊 You've been blessed by the Python! Good luck with your coding! 🐍✨
              </motion.p>
            )}
            {sawPython === false && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground mt-2"
              >
                Keep watching! The Python visits every hour from a random direction 🔍
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Animated donor section */}
        <motion.div
          className="border-t border-border pt-6 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5 text-destructive fill-destructive" />
            </motion.div>
            <Link to="/donate" className="group">
              <motion.p
                className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Support PyMaster — <span className="font-semibold text-primary">Donate via UPI / GPay</span> 🙏
              </motion.p>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["☕ Buy a Coffee", "💳 PayPal", "🇮🇳 UPI"].map((item, i) => (
              <motion.span
                key={item}
                className="text-xs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-xs text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Made with{" "}
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-3 h-3 text-destructive fill-destructive" />
            </motion.span>{" "}
            by <span className="font-semibold text-foreground">Dinesh Raja M</span>
          </motion.p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PyMaster. Learn Python, Build Skills, Earn Rewards.
          </p>
        </div>
      </div>
    </footer>
  );
}
