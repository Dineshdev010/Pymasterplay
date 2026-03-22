// ============================================================
// PROTECTED ROUTE — src/components/ProtectedRoute.tsx
// A wrapper component that redirects unauthenticated users to /auth.
// Wrap any page that requires login with this component.
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // While checking auth status, show a loading spinner
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // If not logged in, redirect to the auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated — render the protected content
  return <>{children}</>;
}
