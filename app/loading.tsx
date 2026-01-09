export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
        <div className="h-7 w-48 rounded bg-surface-2" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-surface-2" />
        <div className="mt-2 h-4 w-full max-w-lg rounded bg-surface-2" />
        <div className="mt-2 h-4 w-full max-w-md rounded bg-surface-2" />
      </div>
    </div>
  );
}
