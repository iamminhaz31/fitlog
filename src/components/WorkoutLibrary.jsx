"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return a.duration - b.duration;
  });

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      for (const url of API_URLS) {
        if (ignore) return;

        try {
          const response = await fetch(url, {
            signal: AbortSignal.timeout(12000),
          });

          if (!response.ok) {
            throw new Error("Could not fetch workouts.");
          }

          const data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("Unexpected API response.");
          }

          if (!ignore) {
            setWorkouts(data);
            setError("");
            setLoading(false);
          }

          return;
        } catch {
          // If this API fails, try the next URL.
        }
      }

      if (!ignore) {
        setError(
          "Could not load workouts. Check your connection and try again."
        );
        setLoading(false);
      }
    }

    loadWorkouts();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setError("");
    setLoading(true);
    setAttempt((previous) => previous + 1);
  }

  return (
    <section
      id="library"
      className="mx-auto min-h-[60vh] max-w-7xl scroll-mt-6 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">THE LIBRARY</h2>

          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="workout-sort"
            className="shrink-0 text-sm text-zinc-400"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="workout-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-lg border border-white/20 bg-[#181818] py-2.5 pr-10 pl-4 text-sm text-white focus:border-accent focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div
          role="status"
          className="flex items-center justify-center gap-3 py-24 text-zinc-400"
        >
          <LoaderCircle
            size={24}
            className="animate-spin text-accent motion-reduce:animate-none"
            aria-hidden="true"
          />
          <span>Loading workouts…</span>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-red-400/30 p-8 text-center"
        >
          <p className="text-red-300">{error}</p>

          <button
            type="button"
            onClick={retry}
            className="mt-5 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-black"
          >
            Try again
          </button>
        </div>
      ) : workouts.length === 0 ? (
        <p className="py-20 text-center text-zinc-400">
          No workouts available right now.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}