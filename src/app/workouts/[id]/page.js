import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import WorkoutActions from "@/components/WorkoutActions";
import Navbar from "@/components/Navbar";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function getWorkout(id) {
  let missingCount = 0;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });

      if (response.status === 404) {
        missingCount += 1;
        continue;
      }

      if (!response.ok) {
        throw new Error("Could not fetch workout.");
      }

      const data = await response.json();

      if (
        !data ||
        String(data.id) !== id ||
        typeof data.name !== "string" ||
        !Array.isArray(data.muscleGroups) ||
        !Array.isArray(data.instructions)
      ) {
        throw new Error("Unexpected API response.");
      }

      return { workout: data, unavailable: false };
    } catch {
      // If this API fails, try the next URL.
    }
  }

  if (missingCount === API_URLS.length) {
    return { workout: null, unavailable: false };
  }

  return { workout: null, unavailable: true };
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const { workout, unavailable } = await getWorkout(id);

  if (unavailable) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-3xl font-bold">
            COULD NOT LOAD WORKOUT
          </h1>

          <p className="mt-4 text-zinc-400">
            Please check your connection and refresh this page.
          </p>

          <Link
            href="/#library"
            className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3 font-bold text-black"
          >
            Back to workouts
          </Link>
        </main>
      </>
    );
  }

  if (!workout) {
    notFound();
  }

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", `${workout.rating} / 5`],
  ];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/#library"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to workouts
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl leading-tight font-extrabold uppercase sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 leading-7 text-zinc-400">
              {workout.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent uppercase"
                >
                  {group}
                </span>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-bold">KEY SPECS</h2>

              <dl className="mt-4 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#181818]">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3.5"
                  >
                    <dt className="text-xs font-semibold text-zinc-400 uppercase">
                      {label}
                    </dt>

                    <dd className="text-right text-sm font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-bold">INSTRUCTIONS</h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-zinc-300">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </main>
    </>
  );
}