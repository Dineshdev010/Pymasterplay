import { useEffect, useMemo, useRef, useState } from "react";
import { getNextAd } from "@/data/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    __pymasterAdsenseLoader?: Promise<void>;
  }
}

interface GoogleAdProps {
  slot?: string;
  label?: string;
  className?: string;
  minHeight?: number;
}

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT?.trim() || "";

function loadAdsenseScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.__pymasterAdsenseLoader) {
    return window.__pymasterAdsenseLoader;
  }

  const existingScript = document.querySelector<HTMLScriptElement>('script[data-pymaster-adsense="true"]');
  if (existingScript) {
    window.__pymasterAdsenseLoader = Promise.resolve();
    return window.__pymasterAdsenseLoader;
  }

  window.__pymasterAdsenseLoader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.pymasterAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google AdSense script."));
    document.head.appendChild(script);
  });

  return window.__pymasterAdsenseLoader;
}

function PlaceholderAd({ label, className, minHeight }: Required<Pick<GoogleAdProps, "label" | "className" | "minHeight">>) {
  const ad = useMemo(() => getNextAd(), []);

  return (
    <div className={className}>
      <div
        className={`overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm`}
        style={{ minHeight }}
      >
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>{label}</span>
          <span>Promo</span>
        </div>
        <div className={`bg-gradient-to-r ${ad.color} p-5 text-white`}>
          <div className="text-sm font-semibold">{ad.title}</div>
          <p className="mt-2 text-sm/6 text-white/90">{ad.description}</p>
        </div>
      </div>
    </div>
  );
}

export function GoogleAd({
  slot,
  label = "Sponsored",
  className = "",
  minHeight = 160,
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || typeof window === "undefined" || !adRef.current) {
      return;
    }

    let cancelled = false;

    loadAdsenseScript()
      .then(() => {
        if (cancelled || !adRef.current || adRef.current.dataset.adsbygoogleStatus) {
          return;
        }

        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        } catch {
          setLoadFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot || loadFailed) {
    return <PlaceholderAd label={label} className={className} minHeight={minHeight} />;
  }

  return (
    <div className={className}>
      <div
        className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
        style={{ minHeight }}
      >
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>{label}</span>
          <span>Google Ads</span>
        </div>
        <div className="px-3 py-3">
          <ins
            ref={adRef}
            className="adsbygoogle block w-full"
            style={{ minHeight }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
