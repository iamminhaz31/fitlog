"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "Workout", href: "/" },
    { label: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="border-b border-white/10 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex items-center gap-2 justify-self-start"
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-extrabold tracking-tight">
            FITLOG
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-3 col-span-2 flex justify-center gap-6 md:order-none md:col-span-1"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 px-1 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-2 text-xs font-bold text-black sm:text-sm"
          >
            Plan <span className="ml-1">0</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/25 px-3 py-2 text-xs font-bold text-white transition-colors hover:border-accent sm:text-sm"
          >
            Saved <span className="ml-1">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}