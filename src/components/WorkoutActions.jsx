"use client";

import { Plus, Bookmark, Check } from "lucide-react";
import { useWorkouts } from "@/components/WorkoutProvider";

export default function WorkoutActions({ workout }) {
  const {
    plan,
    saved,
    activeCount,
    addToPlan,
    saveWorkout,
  } = useWorkouts();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const isPlanFull = activeCount >= 5;

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => addToPlan(workout)}
          disabled={isInPlan || isPlanFull}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isInPlan ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Plus size={18} aria-hidden="true" />
          )}

          {isInPlan
            ? "Added to plan"
            : isPlanFull
              ? "Plan is full"
              : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={() => saveWorkout(workout)}
          disabled={isSaved}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3.5 text-sm font-bold transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaved ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Bookmark size={18} aria-hidden="true" />
          )}

          {isSaved ? "Saved" : "Save for later"}
        </button>
      </div>

      {isPlanFull && !isInPlan && (
        <p className="mt-3 text-sm text-zinc-400">
          Your plan has five unfinished lifts. Finish or remove one
          to add another.
        </p>
      )}
    </div>
  );
}