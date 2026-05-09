export default function Loading() {
  return (
    <div className="min-h-screen bg-ink p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-14 w-48 animate-pulse rounded-2xl bg-white/10" />
        <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
