import Image from "next/image";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <p className="mb-5 text-xs font-bold tracking-[0.25em] text-accent">
            WORKOUT LIBRARY
          </p>

          <h1
            className={`${oswald.className} text-5xl leading-tight font-bold uppercase sm:text-6xl lg:text-7xl`}
          >
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a
            lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-lime-300"
          >
            BROWSE WORKOUTS

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m5 12 7 7 7-7" />
            </svg>
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/banner.png"
            alt="Anatomical illustration of a seated preacher curl exercise"
            width={330}
            height={330}
            sizes="(max-width: 767px) 85vw, 440px"
            className="h-auto w-full max-w-[440px] object-contain"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}