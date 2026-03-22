import { useEffect, useRef } from "react";

// Randomly pick a mode on module load (persists until full page refresh)
const BG_MODE: "blackhole" | "solarsystem" = Math.random() > 0.5 ? "blackhole" : "solarsystem";

interface Star {
  x: number; y: number; size: number; brightness: number; twinkleSpeed: number; phase: number;
}

interface Planet {
  orbitRadius: number; angle: number; speed: number; size: number; color: string;
  ringColor?: string; hasRing: boolean; name: string;
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const starCount = Math.min(350, Math.floor((window.innerWidth * window.innerHeight) / 2500));
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.3,
      brightness: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const cx = canvas.width * 0.65;
    const cy = canvas.height * 0.45;

    // Solar system planets
    planetsRef.current = [
      { orbitRadius: 45, angle: 0, speed: 0.008, size: 3, color: "#b0b0b0", hasRing: false, name: "Mercury" },
      { orbitRadius: 70, angle: 2.5, speed: 0.006, size: 5, color: "#e8c468", hasRing: false, name: "Venus" },
      { orbitRadius: 100, angle: 4.2, speed: 0.004, size: 6, color: "#4a90d9", hasRing: false, name: "Earth" },
      { orbitRadius: 135, angle: 1.1, speed: 0.003, size: 4.5, color: "#c05030", hasRing: false, name: "Mars" },
      { orbitRadius: 190, angle: 3.5, speed: 0.0018, size: 14, color: "#d4a56a", hasRing: true, ringColor: "#c8b07060", name: "Jupiter" },
      { orbitRadius: 250, angle: 5.2, speed: 0.0012, size: 12, color: "#d4c890", hasRing: true, ringColor: "#c8b87050", name: "Saturn" },
      { orbitRadius: 310, angle: 0.8, speed: 0.0008, size: 8, color: "#7ec8e3", hasRing: true, ringColor: "#7ec8e340", name: "Uranus" },
      { orbitRadius: 360, angle: 4.0, speed: 0.0005, size: 7.5, color: "#4466cc", hasRing: false, name: "Neptune" },
    ];

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (BG_MODE === "blackhole") {
        drawBlackHoleScene(ctx, canvas, cx, cy, time);
      } else {
        drawSolarSystemScene(ctx, canvas, cx, cy, time);
      }

      // Stars (common to both)
      for (const s of starsRef.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.3 + 0.7;
        const alpha = s.brightness * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        if (s.size > 1.5) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Planets
      for (const p of planetsRef.current) {
        p.angle += p.speed;
        const orbitFlatten = BG_MODE === "blackhole" ? 0.3 : 0.5;

        // Orbit trail
        ctx.beginPath();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, orbitFlatten);
        ctx.arc(0, 0, p.orbitRadius, 0, Math.PI * 2);
        ctx.restore();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        const px = cx + Math.cos(p.angle) * p.orbitRadius;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * orbitFlatten;

        // Ring
        if (p.hasRing && p.ringColor) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.3);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();
        }

        // Planet body
        const pGrad = ctx.createRadialGradient(px - p.size * 0.3, py - p.size * 0.3, 0, px, py, p.size);
        pGrad.addColorStop(0, p.color);
        pGrad.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      }

      // Shooting stars
      if (Math.random() < 0.006) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          vx: (Math.random() - 0.3) * 4,
          vy: Math.random() * 3 + 1,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: Math.random() * 1.5 + 0.5,
        });
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(ss => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        const alpha = 1 - ss.life / ss.maxLife;
        if (alpha <= 0) return false;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 6, ss.y - ss.vy * 6);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.lineWidth = ss.size;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        return true;
      });

      // Mouse glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        mouseGlow.addColorStop(0, "hsla(212, 80%, 60%, 0.06)");
        mouseGlow.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(mx - 80, my - 80, 160, 160);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

function drawBlackHoleScene(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, cx: number, cy: number, time: number) {
  // Deep space
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.8);
  bgGrad.addColorStop(0, "hsla(270, 30%, 8%, 0.3)");
  bgGrad.addColorStop(0.5, "hsla(220, 20%, 4%, 0.2)");
  bgGrad.addColorStop(1, "transparent");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nebula
  const nebula = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.6, 0, canvas.width * 0.3, canvas.height * 0.6, 300);
  nebula.addColorStop(0, "hsla(270, 60%, 40%, 0.05)");
  nebula.addColorStop(0.5, "hsla(212, 60%, 40%, 0.03)");
  nebula.addColorStop(1, "transparent");
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Black hole
  const bhSize = 35 + Math.sin(time * 0.005) * 5;
  const bhGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, bhSize + 10);
  bhGrad.addColorStop(0, "rgba(0, 0, 0, 0.98)");
  bhGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.8)");
  bhGrad.addColorStop(0.75, "hsla(270, 80%, 50%, 0.2)");
  bhGrad.addColorStop(0.9, "hsla(30, 90%, 50%, 0.1)");
  bhGrad.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(cx, cy, bhSize + 10, 0, Math.PI * 2);
  ctx.fillStyle = bhGrad;
  ctx.fill();

  // Accretion disk
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.25);
  for (let ring = 0; ring < 3; ring++) {
    const radius = 50 + ring * 15;
    const diskGrad = ctx.createRadialGradient(0, 0, radius - 8, 0, 0, radius + 8);
    diskGrad.addColorStop(0, "transparent");
    diskGrad.addColorStop(0.4, `hsla(${30 + ring * 20}, 90%, 55%, ${0.08 + Math.sin(time * 0.01 + ring) * 0.04})`);
    diskGrad.addColorStop(0.6, `hsla(${270 + ring * 15}, 70%, 50%, ${0.06 + Math.sin(time * 0.015 + ring) * 0.03})`);
    diskGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
    ctx.fillStyle = diskGrad;
    ctx.fill();
  }
  ctx.restore();

  // Gravitational lensing glow
  const lensGrad = ctx.createRadialGradient(cx, cy, bhSize, cx, cy, bhSize + 40);
  lensGrad.addColorStop(0, "hsla(212, 80%, 60%, 0.05)");
  lensGrad.addColorStop(0.5, "hsla(270, 60%, 50%, 0.03)");
  lensGrad.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(cx, cy, bhSize + 40, 0, Math.PI * 2);
  ctx.fillStyle = lensGrad;
  ctx.fill();
}

function drawSolarSystemScene(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, cx: number, cy: number, time: number) {
  // Warm space gradient
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.7);
  bgGrad.addColorStop(0, "hsla(40, 80%, 50%, 0.08)");
  bgGrad.addColorStop(0.3, "hsla(25, 50%, 20%, 0.04)");
  bgGrad.addColorStop(0.7, "hsla(220, 30%, 6%, 0.2)");
  bgGrad.addColorStop(1, "transparent");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sun
  const sunRadius = 22 + Math.sin(time * 0.02) * 2;
  
  // Sun corona
  for (let i = 3; i >= 0; i--) {
    const coronaGrad = ctx.createRadialGradient(cx, cy, sunRadius, cx, cy, sunRadius + 20 + i * 15);
    coronaGrad.addColorStop(0, `hsla(40, 100%, 65%, ${0.06 - i * 0.01})`);
    coronaGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius + 20 + i * 15, 0, Math.PI * 2);
    ctx.fillStyle = coronaGrad;
    ctx.fill();
  }

  // Sun body
  const sunGrad = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, sunRadius);
  sunGrad.addColorStop(0, "hsl(50, 100%, 90%)");
  sunGrad.addColorStop(0.4, "hsl(40, 100%, 65%)");
  sunGrad.addColorStop(0.8, "hsl(25, 100%, 50%)");
  sunGrad.addColorStop(1, "hsl(15, 90%, 40%)");
  ctx.beginPath();
  ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = sunGrad;
  ctx.fill();

  // Sun glow
  const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius * 4);
  glowGrad.addColorStop(0, "hsla(45, 100%, 70%, 0.15)");
  glowGrad.addColorStop(0.5, "hsla(40, 90%, 50%, 0.05)");
  glowGrad.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(cx, cy, sunRadius * 4, 0, Math.PI * 2);
  ctx.fillStyle = glowGrad;
  ctx.fill();
}
