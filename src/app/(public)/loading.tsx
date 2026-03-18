export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary shadow-sm" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
