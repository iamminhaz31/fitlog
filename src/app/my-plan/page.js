"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Star,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useWorkouts } from "@/components/WorkoutProvider";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");

    const {
    plan,
    saved,
    isLoaded,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useWorkouts();

  if (!isLoaded) {
    return (
      <>
        <Navbar />

        <main
          role="status"
          className="flex min-h-[60vh] items-center justify-center gap-3 text-zinc-400"
        >
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-accent motion-reduce:animate-none"
          />
          <span>Loading workouts…</span>
        </main>
      </>
    );
  }

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const metrics = [
    { label: "Exercises", value: plan.length, icon: Dumbbell },
    { label: "Minutes", value: totalMinutes, icon: Clock3 },
    { label: "Calories", value: totalCalories, icon: Flame },
  ];

  const tabs = [
    { id: "plan", label: "Today's Plan", count: plan.length },
    { id: "saved", label: "Saved", count: saved.length },
  ];

  const workouts = activeTab === "plan" ? plan : saved;

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">MY PLAN</h1>

        <p className="mt-3 text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-[#181818] p-6"
            >
              <div className="flex items-center gap-2 text-zinc-400">
                <Icon
                  size={18}
                  aria-hidden="true"
                  className="text-accent"
                />
                <span className="text-sm">{label}</span>
              </div>

              <p className="mt-3 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div
          aria-label="Workout lists"
          className="mt-10 flex gap-2 border-b border-white/10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
              <span className="ml-2">{tab.count}</span>
            </button>
          ))}
        </div>

        {workouts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-white/15 px-6 py-16 text-center">
            <Dumbbell
              size={36}
              aria-hidden="true"
              className="mx-auto text-accent"
            />

            <h2 className="mt-5 text-2xl font-bold">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 text-zinc-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-lime-300"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {workouts.map((workout) => {
              const isDone = activeTab === "plan" && workout.done;

              return (
                <article
                  key={workout.id}
                  className={`flex flex-col gap-5 rounded-xl border bg-[#181818] p-4 sm:flex-row sm:items-center ${
                    isDone
                      ? "border-accent/30"
                      : "border-white/10"
                  }`}
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-zinc-800 sm:aspect-square sm:w-28">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 100vw, 112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold uppercase">
                        {workout.name}
                      </h2>

                      {isDone && (
                        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                          DONE
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-zinc-400">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3
                          size={15}
                          aria-hidden="true"
                          className="text-accent"
                        />
                        {workout.duration} min
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Flame
                          size={15}
                          aria-hidden="true"
                          className="text-orange-400"
                        />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span
                        aria-label={`Rating ${workout.rating} out of 5`}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Star
                          size={15}
                          aria-hidden="true"
                          className="text-yellow-400"
                        />
                        {workout.rating}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/workouts/${workout.id}`}
                        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          type="button"
                          onClick={() => markAsDone(workout.id)}
                          disabled={isDone}
                          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Check size={16} aria-hidden="true" />
                          {isDone ? "Completed" : "Mark as Done"}
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label={`Remove ${workout.name} from ${
                          activeTab === "plan" ? "plan" : "saved"
                        }`}
                        onClick={() => {
                          if (activeTab === "plan") {
                            removeFromPlan(workout.id);
                          } else {
                            removeFromSaved(workout.id);
                          }
                        }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-zinc-400 transition-colors hover:border-red-400 hover:text-red-400"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}