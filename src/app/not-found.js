import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <Dumbbell
          size={48}
          aria-hidden="true"
          className="text-accent"
        />

        <p className="mt-6 text-8xl font-extrabold text-accent">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold uppercase">
          Page not found
        </h1>

        <p className="mt-4 max-w-md leading-7 text-zinc-400">
          This page or workout could not be found. Head back to
          the library and pick your next lift.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-lime-300"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Go to workouts
        </Link>
      </main>
    </>
  );
}