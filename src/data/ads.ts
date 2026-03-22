// ============================================================
// AD CONFIGURATION — src/data/ads.ts
// Placeholder for Google AdSense integration.
// Currently using dummy content — replace with real Google Ads
// when AdSense account is approved and ad unit IDs are available.
// ============================================================

/**
 * AdConfig — Shape of each ad/content card.
 * - title: Headline text
 * - description: Body text shown during the ad
 * - link: URL opened in new tab (empty = no external link)
 * - color: Tailwind gradient classes for background styling
 */
export interface AdConfig {
  title: string;
  description: string;
  link: string;
  color: string;
}

// ============================================================
// GOOGLE ADSENSE INTEGRATION (TODO)
// ============================================================
// To integrate Google AdSense:
// 1. Sign up at https://www.google.com/adsense/
// 2. Add your AdSense script tag to index.html:
//    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID" crossorigin="anonymous"></script>
// 3. Replace the ad content below with your ad unit IDs
// 4. Create an AdSense component that renders <ins class="adsbygoogle" ...>
//
// Example AdSense component:
// export function GoogleAd({ adSlot }: { adSlot: string }) {
//   useEffect(() => {
//     try { (window as any).adsbygoogle = (window as any).adsbygoogle || []; (window as any).adsbygoogle.push({}); } catch (e) {}
//   }, []);
//   return (
//     <ins className="adsbygoogle" style={{ display: "block" }}
//       data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
//       data-ad-slot={adSlot}
//       data-ad-format="auto"
//       data-full-width-responsive="true" />
//   );
// }
// ============================================================

// --- Placeholder ad content (shown until Google Ads are configured) ---
export const AD_LINKS: AdConfig[] = [
  {
    title: "🐍 Python Pro Tips",
    description: "Did you know? Python's list comprehensions are up to 35% faster than traditional loops. Keep learning to master these techniques!",
    link: "",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "🚀 Level Up Your Skills",
    description: "Top developers spend 30 minutes a day practicing. You're already here — keep going and unlock your full potential!",
    link: "",
    color: "from-purple-600 to-pink-500",
  },
  {
    title: "💡 Fun Fact",
    description: "Python is named after Monty Python, not the snake! Guido van Rossum was a fan of the comedy group when he created the language.",
    link: "",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "🎯 Career Boost",
    description: "Python developers earn an average of $120K/year. Every problem you solve here gets you closer to that goal!",
    link: "",
    color: "from-green-500 to-emerald-600",
  },
];

// --- Ad Rotation ---
let adIndex = 0;

/** Get the next ad in rotation */
export function getNextAd(): AdConfig {
  const ad = AD_LINKS[adIndex % AD_LINKS.length];
  adIndex++;
  return ad;
}
