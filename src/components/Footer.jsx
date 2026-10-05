import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0c0c0c]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 sm:px-6 md:flex-row lg:px-8">
        <Link
          href="/"
          aria-label="FitLog home"
          className="inline-flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-sm leading-6 text-zinc-400 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}