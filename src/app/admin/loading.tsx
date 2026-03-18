export default function Loading() {
  return (
    <div className="h-full min-h-[500px] flex flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <span className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">Loading dashboard...</span>
    </div>
  );
}
