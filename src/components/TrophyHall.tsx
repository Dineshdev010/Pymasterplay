import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

interface TrophyMilestone {
  stars: number;
  emoji: string;
  title: string;
  color: string;
  glow: string;
}

const trophyMilestones: TrophyMilestone[] = [
  { stars: 20, emoji: "🥉", title: "Bronze Trophy", color: "from-amber-600/20 to-amber-900/20 border-amber-500/30 text-amber-500", glow: "shadow-amber-500/40" },
  { stars: 50, emoji: "🥈", title: "Silver Trophy", color: "from-slate-400/20 to-slate-600/20 border-slate-400/30 text-slate-300", glow: "shadow-slate-400/40" },
  { stars: 100, emoji: "🏆", title: "Gold Trophy", color: "from-yellow-400/20 to-yellow-600/20 border-yellow-500/30 text-yellow-500", glow: "shadow-yellow-500/50" },
  { stars: 200, emoji: "💎", title: "Diamond Trophy", color: "from-blue-400/20 to-blue-600/20 border-blue-400/30 text-blue-400", glow: "shadow-blue-400/50" },
  { stars: 350, emoji: "🌟", title: "Supernova", color: "from-purple-500/20 to-purple-700/20 border-purple-500/30 text-purple-400", glow: "shadow-purple-500/50" },
  { stars: 500, emoji: "👑", title: "Legendary Crown", color: "from-emerald-400/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400", glow: "shadow-emerald-500/60" },
  { stars: 1000, emoji: "🐉", title: "Dragon Master", color: "from-red-500/20 to-red-700/20 border-red-500/40 text-red-500", glow: "shadow-red-500/60" },
];

function TrophyCard({ m, achieved }: { m: TrophyMilestone; achieved: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!achieved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      className="relative group h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={achieved ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } : {}}
        className={`relative h-full flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 ${
          achieved
            ? `bg-gradient-to-br ${m.color} backdrop-blur-xl group-hover:scale-[1.02] cursor-default`
            : "bg-surface-1 border-border/50 opacity-40 grayscale"
        }`}
      >
        {/* Glow Aura behind card */}
        {achieved && (
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl pointer-events-none ${m.glow.replace("shadow", "bg")}`} style={{ transform: "translateZ(-10px)" }} />
        )}
        
        {/* Hover Border Glow outline */}
        {achieved && (
          <div className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_var(--tw-shadow-color)] ${m.glow} pointer-events-none`} />
        )}
        
        {/* Inner Content Popping out */}
        <div 
          className="relative z-10 flex flex-col items-center"
          style={achieved ? { transform: "translateZ(40px)" } : {}}
        >
          <div className="text-5xl mb-3 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
            {m.emoji}
          </div>
          <div className="text-sm font-extrabold text-foreground leading-tight px-1 mb-1 text-center drop-shadow-md">{m.title}</div>
          <div className="text-xs text-muted-foreground font-semibold">{m.stars} ⭐</div>
          
          {achieved && (
            <div className="mt-3 text-[10px] font-bold text-current uppercase tracking-wider bg-current/10 border border-current/30 px-3 py-1 rounded-full">
              Unlocked
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TrophyHall({ starsCaught }: { starsCaught: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {trophyMilestones.map((m) => (
        <TrophyCard key={m.stars} m={m} achieved={starsCaught >= m.stars} />
      ))}
    </div>
  );
}
