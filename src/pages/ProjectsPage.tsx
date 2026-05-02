// ============================================================
// PROJECTS PAGE — src/pages/ProjectsPage.tsx
// Overhauled with glassmorphic design and interactive showcases.
// ============================================================
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { 
  Code, Globe, Cpu, Layers, Zap, Shield, 
  ArrowRight, Terminal, Database, Cloud, 
  Sparkles, CheckCircle2 
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-foreground selection:bg-primary/30 pb-24">
      <Helmet>
        <title>Projects | PyMaster Architecture</title>
        <meta
          name="description"
          content="A detailed overview of the PyMaster project: goals, features, and high-performance architecture."
        />
        <link rel="canonical" href={`${siteConfig.url}/projects`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full opacity-20" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-expert-purple/5 blur-[120px] rounded-full opacity-10" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Engineering Overview</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          >
            The PyMaster <br />
            <span className="text-primary">Ecosystem.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            PyMaster is not just a website—it's a high-performance learning engine built with modern web technologies. We prioritize speed, interactive feedback, and a content-first philosophy.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/learn"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              Explore Lessons <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/compiler"
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md font-bold hover:bg-white/10 transition-all"
            >
              Try Compiler
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Project Card */}
      <section className="px-4 mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-5xl mx-auto p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Cpu className="w-32 h-32 text-primary" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" /> The Core Philosophy
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                The foundation of PyMaster is built on the belief that **learners shouldn’t have to choose between reading and doing.** Most platforms either offer dry documentation or isolated coding tasks. We unify both into a single, cohesive experience.
              </p>
              <p>
                Our "Content-First" approach ensures that even without JavaScript or a fast connection, the primary educational value—the text—is delivered instantly. We then enhance that text with interactive elements once the environment is ready.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: "Architecture", val: "SPA" },
                { label: "Execution", val: "WASM" },
                { label: "Deployment", val: "Vercel" },
                { label: "Backend", val: "Supabase" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/5 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">{item.label}</div>
                  <div className="text-sm font-mono text-white font-bold">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Grid */}
      <section className="px-4 py-20 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Technical Architecture</h2>
            <p className="text-muted-foreground">Built with the most advanced tools in the modern web ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Layers, 
                title: "Vite + React SPA", 
                desc: "Blazing fast client-side navigation and component-driven UI using the latest React patterns.",
                color: "text-blue-400"
              },
              { 
                icon: Terminal, 
                title: "WASM Execution", 
                desc: "Python runs directly in your browser using Pyodide, ensuring zero latency and high security.",
                color: "text-emerald-400"
              },
              { 
                icon: Database, 
                title: "Supabase Core", 
                desc: "Real-time user progress, profile management, and leaderboard sync via Postgres.",
                color: "text-orange-400"
              },
              { 
                icon: Globe, 
                title: "Content-First SEO", 
                desc: "Optimized for search engines and ad platforms with meaningful initial server-side content.",
                color: "text-cyan-400"
              },
              { 
                icon: Shield, 
                title: "Secure Sandbox", 
                desc: "Execution is isolated in Web Workers, preventing UI freezes and unauthorized system access.",
                color: "text-rose-400"
              },
              { 
                icon: Cloud, 
                title: "Edge Deployment", 
                desc: "Globally distributed assets via Vercel Edge Network for sub-100ms load times.",
                color: "text-indigo-400"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="p-8 rounded-[2rem] border border-white/5 bg-surface-1 hover:border-primary/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Performance Choices</h2>
              <div className="space-y-6">
                {[
                  "No gating of initial content behind loaders.",
                  "Code execution runs on a separate thread (Web Workers).",
                  "Modular code-splitting for faster feature delivery.",
                  "Zero server-side computation for basic practice labs."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-expert-purple/20 shadow-2xl"
            >
              <div className="bg-[#0a0c10] rounded-[2.4rem] p-8 overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" /> Browser-Native Runner
                </h3>
                <div className="bg-[#1a1c24] rounded-xl p-4 font-mono text-xs text-white/80 border border-white/5 space-y-2">
                  <div className="text-primary-foreground/40"># Initializing Pyodide...</div>
                  <div><span className="text-python-blue">import</span> pandas <span className="text-python-blue">as</span> pd</div>
                  <div>df = pd.DataFrame({"{"}"val": [1, 2, 3]{"}"})</div>
                  <div><span className="text-python-yellow">print</span>(df.describe())</div>
                  <div className="pt-2 text-streak-green">&gt;&gt;&gt; Output received in 12ms</div>
                </div>
                <div className="mt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>WASM v1.0.4</span>
                  <span className="text-primary">Status: Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-4 py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">The Road Ahead</h2>
          <p className="text-muted-foreground mb-16">What we're engineering next to improve your learning experience.</p>
          
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              { title: "Collaborative Labs", desc: "Pair programming in the browser with real-time sync." },
              { title: "AI Debugging", desc: "Neural assistance for explaining complex code errors." },
              { title: "Mobile IDE", desc: "A optimized coding interface for on-the-go practice." },
              { title: "Advanced Tracks", desc: "Expert modules for Machine Learning and Cybersec." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-colors">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all"
              >
                Suggest a Feature
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
