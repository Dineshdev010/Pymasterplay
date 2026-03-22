// ============================================================
// INDEX PAGE — src/pages/Index.tsx
// Fallback page — this is the default Lovable template page.
// In this app, the actual home page is LandingPage.tsx,
// which is rendered at "/" in the router (App.tsx).
// This file exists as a safety net if routing fails.
// ============================================================

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;
