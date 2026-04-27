import { useEffect, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const UPDATE_TOAST_ID = "pymaster-pwa-update";
const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function PwaUpdater() {
  const hasReloadedRef = useRef(false);
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  });

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let intervalId: number | undefined;

    const checkForUpdate = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        await registration?.update();
      } catch (error) {
        console.warn("PWA update check failed:", error);
      }
    };

    void checkForUpdate();
    intervalId = window.setInterval(() => {
      void checkForUpdate();
    }, UPDATE_CHECK_INTERVAL_MS);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        void checkForUpdate();
      }
    };

    const handleControllerChange = () => {
      if (hasReloadedRef.current) return;
      hasReloadedRef.current = true;
      window.location.reload();
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("online", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("online", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  useEffect(() => {
    if (needRefresh) {
      if (document.visibilityState === "hidden") {
        void updateServiceWorker(true);
        setNeedRefresh(false);
        return;
      }

      toast("New version available", {
        id: UPDATE_TOAST_ID,
        description: "Update to the latest version of PyMaster for new features and fixes.",
        duration: Infinity,
        action: (
          <Button
            size="sm"
            onClick={() => {
              void updateServiceWorker(true);
              setNeedRefresh(false);
            }}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Update
          </Button>
        ),
      });
    }
  }, [needRefresh, updateServiceWorker, setNeedRefresh]);

  return null; // This component doesn't render anything visible directly
}
