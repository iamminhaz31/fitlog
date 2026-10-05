import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] items-center justify-center gap-3 text-zinc-400"
    >
      <LoaderCircle
        size={28}
        aria-hidden="true"
        className="animate-spin text-accent motion-reduce:animate-none"
      />
      <span>Loading workout…</span>
    </div>
  );
}