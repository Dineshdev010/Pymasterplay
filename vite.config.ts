import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      watch: {
        usePolling: false,
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["logo.png", "icon-192.png", "icon-512.png"],
        manifestFilename: "manifest.json",
        manifest: {
          id: "/",
          name: "PyMaster",
          short_name: "PyMaster",
          description: "Learn Python with lessons, practice problems, quick prep, and a built-in browser compiler.",
          start_url: "/",
          scope: "/",
          display: "standalone",
          display_override: ["standalone", "minimal-ui", "browser"],
          background_color: "#0a0c10",
          theme_color: "#0a0c10",
          icons: [
            {
              src: "/icon-192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallbackDenylist: [/^\/api\//],
          globIgnores: ["**/pyodide/**"],
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith("/pyodide/"),
              handler: "CacheFirst",
              options: {
                cacheName: "pyodide-runtime-cache",
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
        // Dev service-worker caching can keep old JS around and cause errors like "X is not defined".
        devOptions: {
          enabled: !isDev,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {},
    },
  };
});
