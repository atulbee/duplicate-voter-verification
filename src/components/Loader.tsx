'use client';

export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500" role="status" aria-live="polite">
      <span className="inline-block animate-spin rounded-full border-2 border-current border-r-transparent h-4 w-4"></span>
      <span>{label}</span>
    </div>
  );
}
