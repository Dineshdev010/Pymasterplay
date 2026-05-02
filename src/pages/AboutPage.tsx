// ============================================================
// ABOUT PAGE — src/pages/AboutPage.tsx
// Overhauled with interactive hero, stats counters, and mission timeline.
// ============================================================
import { Link } from "react-router-dom";
import { Users, Target, Heart, Code, BookOpen, Trophy, Rocket, Sparkles, Shield, Zap, Terminal, Star } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { AboutUsSection } from "@/components/landing/AboutUsSection";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// --- Helper: Animated Counter ---
function StatCounter({ value, label, icon: Icon, delay = 0 }: { value: number; label: string; icon: any; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      custom={delay}
      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-500 hover:border-primary/50"
    >
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-3xl font-extrabold text-foreground mb-1 tabular-nums">
        {count.toLocaleString()}{value > 100 ? "+" : ""}
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

// --- Helper: Timeline Item ---
function TimelineItem({ year, title, desc, icon: Icon, side = "left", delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-center justify-between mb-12 w-full ${side === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className="hidden md:block w-5/12" />
      <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-primary shadow-lg shadow-primary/20">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className={`w-full md:w-5/12 p-6 rounded-2xl border border-white/10 bg-surface-1/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 ${side === "left" ? "text-left md:text-right" : "text-left"}`}>
        <span className="text-xs font-bold text-primary uppercase tracking-widest">{year}</span>
        <h3 className="text-lg font-bold text-foreground mt-1">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { language } = useLanguage();
  const containerRef = useRef(null);

  const text = {
    english: {
      about: "About",
      intro: "PyMaster is a premium, interactive ecosystem engineered for modern Python learners. We bridge the gap between static theory and real-world mastery.",
      mission: "Our Vision",
      missionDesc: "We believe that high-tier programming education should be accessible, high-performance, and visually inspiring. Our goal is to empower 1 million learners to build the future with Python.",
      stats: {
        lessons: "Structured Lessons",
        problems: "Code Challenges",
        stars: "Stars Caught",
        users: "Active Learners"
      },
      timeline: {
        t1: { year: "2024 Q1", title: "The Concept", desc: "PyMaster was born from a simple idea: coding should be beautiful and browser-native." },
        t2: { year: "2024 Q3", title: "Beta Launch", desc: "First 500 users joined, testing our browser-based Pyodide compiler." },
        t3: { year: "2025 Q1", title: "Scaling Up", desc: "Reached 50k solves and expanded the curriculum to include Data Science & Web Dev." },
        t4: { year: "2025 Q4", title: "Future Horizon", desc: "Integrating AI-powered debugging and collaborative coding rooms." }
      },
      offer: "The Core Experience",
      team: "The Architects",
      touch: "Start Your Journey",
      touchDesc: "Ready to go from 'Hello World' to 'Software Architect'? Join our community today.",
      emailUs: "Connect with Us",
      supportUs: "Support the Project ❤️"
    },
    tamil: { about: "PyMaster பற்றி", intro: "PyMaster என்பது நவீன பைதான் கற்பவர்களுக்காக உருவாக்கப்பட்ட ஒரு பிரீமியம் தளம்.", mission: "எங்கள் நோக்கம்", missionDesc: "தரமான நிரலாக்க கல்வி அனைவருக்கும் எளிதாகவும், அழகாகவும் கிடைக்க வேண்டும் என்பதே எங்கள் லட்சியம்.", stats: { lessons: "பாடங்கள்", problems: "சவால்கள்", stars: "நட்சத்திரங்கள்", users: "மாணவர்கள்" }, timeline: { t1: { year: "2024 Q1", title: "துவக்கம்", desc: "பைதான் கற்றல் அழகாகவும் எளிதாகவும் இருக்க வேண்டும் என்ற எண்ணம் உருவானது." }, t2: { year: "2024 Q3", title: "பீட்டா வெளியீடு", desc: "முதல் 500 மாணவர்கள் இணைந்து எங்கள் தளத்தை சோதித்தனர்." }, t3: { year: "2025 Q1", title: "வளர்ச்சி", desc: "50,000 தீர்வுகள் எட்டப்பட்டன, பாடத்திட்டம் விரிவுபடுத்தப்பட்டது." }, t4: { year: "2025 Q4", title: "எதிர்காலம்", desc: "AI உதவியுடன் கூடிய கற்றல் முறைகளை அறிமுகப்படுத்த உள்ளோம்." } }, offer: "நாங்கள் வழங்குவது", team: "எங்கள் குழு", touch: "உங்கள் பயணத்தைத் தொடங்குங்கள்", touchDesc: "இன்றே எங்களுடன் இணைந்து பைதான் மாஸ்டராகுங்கள்.", emailUs: "தொடர்பு கொள்ள", supportUs: "ஆதரிக்க ❤️" },
    kannada: { about: "PyMaster ಬಗ್ಗೆ", intro: "PyMaster ಒಂದು ಪ್ರೀಮಿಯಂ ಮತ್ತು ಸಂವಹನಾತ್ಮಕ ವೇದಿಕೆಯಾಗಿದ್ದು, ಆಧುನಿಕ ಪೈಥಾನ್ ಕಲಿಯುವವರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.", mission: "ನಮ್ಮ ದೃಷ್ಟಿಕೋನ", missionDesc: "ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣವು ಎಲ್ಲರಿಗೂ ಪ್ರೇರಣೆ ನೀಡುವಂತಿರಬೇಕು ಎಂಬುದು ನಮ್ಮ ನಂಬಿಕೆ.", stats: { lessons: "ಪಾಠಗಳು", problems: "ಸವಾಲುಗಳು", stars: "ನಕ್ಷತ್ರಗಳು", users: "ಕಲಿಯುವವರು" }, timeline: { t1: { year: "2024 Q1", title: "ಪರಿಕಲ್ಪನೆ", desc: "ಕೋಡಿಂಗ್ ಸುಂದರವಾಗಿರಬೇಕು ಎಂಬ ಕಲ್ಪನೆಯಿಂದ ಇದು ಹುಟ್ಟಿತು." }, t2: { year: "2024 Q3", title: "ಬೀಟಾ ಬಿಡುಗಡೆ", desc: "ಮೊದಲ 500 ಬಳಕೆದಾರರು ಸೇರಿಕೊಂಡರು." }, t3: { year: "2025 Q1", title: "ವಿಸ್ತರಣೆ", desc: "50,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲಾಗಿದೆ." }, t4: { year: "2025 Q4", title: "ಭವಿಷ್ಯ", desc: "AI ಆಧಾರಿತ ಕಲಿಕೆಯನ್ನು ಪರಿಚಯಿಸಲಾಗುತ್ತಿದೆ." } }, offer: "ನಾವು ನೀಡುವುದು", team: "ನಮ್ಮ ತಂಡ", touch: "ನಿಮ್ಮ ಪಯಣ ಆರಂಭಿಸಿ", touchDesc: "ಇಂದೇ ನಮ್ಮ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ.", emailUs: "ಸಂಪರ್ಕಿಸಿ", supportUs: "ಬೆಂಬಲಿಸಿ ❤️" },
    telugu: { about: "PyMaster గురించి", intro: "PyMaster అనేది ఆధునిక పైథాన్ అభ్యాసకుల కోసం రూపొందించబడిన ఒక ప్రీమియం ప్లాట్‌ఫారమ్.", mission: "మా దార్శనికత", missionDesc: "ప్రోగ్రామింగ్ విద్య అందరికీ స్పూర్తిదాయకంగా ఉండాలని మేము కోరుకున్నాము.", stats: { lessons: "పాఠాలు", problems: "సవాళ్లు", stars: "నక్షత్రాలు", users: "అభ్యాసకులు" }, timeline: { t1: { year: "2024 Q1", title: "భావన", desc: "కోడింగ్ అందంగా ఉండాలి అనే ఆలోచనతో ఇది మొదలైంది." }, t2: { year: "2024 Q3", title: "బీటా లాంచ్", desc: "మొదటి 500 మంది అభ్యాసకులు చేరారు." }, t3: { year: "2025 Q1", title: "అభివృద్ధి", desc: "50,000 పరిష్కారాలు దాటాయి." }, t4: { year: "2025 Q4", title: "భవిష్యత్తు", desc: "AI ఆధారిత ఫీచర్లను తీసుకురాబోతున్నాం." } }, offer: "మేము అందించేవి", team: "మా బృందం", touch: "మీ ప్రయాణాన్ని ప్రారంభించండి", touchDesc: "పైథాన్ మాస్టర్ కావడానికి సిద్ధమా?", emailUs: "సంప్రదించండి", supportUs: "మద్దతు ఇవ్వండి ❤️" },
    hindi: { about: "PyMaster के बारे में", intro: "PyMaster एक प्रीमियम और इंटरैक्टिव प्लेटफॉर्म है जो आधुनिक पायथन शिक्षार्थियों के लिए बनाया गया है।", mission: "हमारा दृष्टिकोण", missionDesc: "हम मानते हैं कि गुणवत्तापूर्ण शिक्षा प्रेरणादायक और सुलभ होनी चाहिए।", stats: { lessons: "पाठ", problems: "चुनौतियां", stars: "सितारे", users: "शिक्षार्थी" }, timeline: { t1: { year: "2024 Q1", title: "विचार", desc: "कोडिंग सुंदर होनी चाहिए, इसी सोच से इसकी शुरुआत हुई।" }, t2: { year: "2024 Q3", title: "बीटा लॉन्च", desc: "पहले 500 शिक्षार्थी जुड़े।" }, t3: { year: "2025 Q1", title: "विस्तार", desc: "50,000 समस्याओं का समाधान किया गया।" }, t4: { year: "2025 Q4", title: "भविष्य", desc: "AI आधारित लर्निंग को जोड़ने की तैयारी।" } }, offer: "हमारी विशेषताएं", team: "हमारी टीम", touch: "अपनी यात्रा शुरू करें", touchDesc: "आज ही हमारे समुदाय में शामिल हों।", emailUs: "संपर्क करें", supportUs: "सपोर्ट करें ❤️" },
  } as const;

  const t = (text[language as keyof typeof text] || text.english) as any;

  return (
    <div className="min-h-screen bg-[#05070a] text-foreground selection:bg-primary/30" ref={containerRef}>
      <Helmet>
        <title>About PyMaster | Premium Python Mastery</title>
        <meta name="description" content="Discover the story behind PyMaster - a premium Python learning ecosystem designed for impact." />
      </Helmet>

      {/* Hero with Dynamic Background */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-30" />
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-python-blue/5 blur-[100px] rounded-full"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Established 2024
          </motion.div>
          
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-8"
          >
            Decoding the Future of <br />
            <span className="text-primary italic">Python Mastery.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {t.intro}
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            <StatCounter icon={BookOpen} value={25} label={t.stats.lessons} delay={0} />
            <StatCounter icon={Code} value={180} label={t.stats.problems} delay={1} />
            <StatCounter icon={Star} value={500} label={t.stats.stars} delay={2} />
            <StatCounter icon={Users} value={1200} label={t.stats.users} delay={3} />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{t.mission}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.missionDesc}
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Shield, title: "Uncompromising Quality", desc: "Every lesson is manually vetted for clarity." },
                  { icon: Zap, title: "High Velocity", desc: "No fluff. Straight to the skills you need." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                alt="Code" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-center max-w-[280px]">
                  <Terminal className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-mono text-primary-foreground italic">"Simplicity is the ultimate sophistication."</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Evolution</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-20" />
            
            <TimelineItem year={t.timeline.t1.year} title={t.timeline.t1.title} desc={t.timeline.t1.desc} icon={Rocket} side="left" delay={0} />
            <TimelineItem year={t.timeline.t2.year} title={t.timeline.t2.title} desc={t.timeline.t2.desc} icon={Users} side="right" delay={0.1} />
            <TimelineItem year={t.timeline.t3.year} title={t.timeline.t3.title} desc={t.timeline.t3.desc} icon={Trophy} side="left" delay={0.2} />
            <TimelineItem year={t.timeline.t4.year} title={t.timeline.t4.title} desc={t.timeline.t4.desc} icon={Sparkles} side="right" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Offer Cards */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t.offer}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Interactive Curriculum", desc: "Live-running examples in every chapter. No local setup needed." },
              { icon: Code, title: "Real-world Labs", desc: "Problems modeled after actual industry tasks and interview questions." },
              { icon: Heart, title: "Community Driven", desc: "Built for learners, by learners. Feedback shapes every update." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 rounded-2xl border border-white/5 bg-surface-1 hover:border-primary/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Author Section */}
      <div className="py-12 border-t border-white/5">
        <AboutUsSection />
      </div>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            {t.touch}
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-10">
            {t.touchDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={`mailto:${siteConfig.contact.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {t.emailUs}
            </motion.a>
            <Link to="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md font-bold hover:bg-white/10 transition-all"
              >
                Browse Lessons
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
