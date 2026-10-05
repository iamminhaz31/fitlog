"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Toaster, toast } from "sonner";

const WorkoutContext = createContext(null);
const STORAGE_KEY = "fitlog-workouts-v1";

function validateWorkouts(items) {
  if (!Array.isArray(items)) {
    throw new Error("Invalid workout list.");
  }

  const ids = new Set();

  return items.map((item) => {
    if (
      !item ||
      !Number.isInteger(item.id) ||
      typeof item.name !== "string" ||
      typeof item.image !== "string" ||
      typeof item.equipment !== "string" ||
      !Number.isFinite(item.duration) ||
      !Number.isFinite(item.caloriesBurned) ||
      !Number.isFinite(item.rating) ||
      ids.has(item.id)
    ) {
      throw new Error("Invalid saved workout.");
    }

    ids.add(item.id);

    return { ...item, done: item.done === true };
  });
}

export default function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const activeCount = plan.filter((item) => !item.done).length;

  // Read stored data after the component mounts in the browser.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (stored) {
          const data = JSON.parse(stored);
          const storedPlan = validateWorkouts(data.plan);
          const storedSaved = validateWorkouts(data.saved);

          setPlan(storedPlan);
          setSaved(storedSaved);
        }
      } catch {
        toast.error("Could not restore your previous workout lists.");
      } finally {
        setIsLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Only save after the previous data has been read.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved })
      );
    } catch {
      toast.error(
        "Could not save changes on this device. They may be lost on refresh.",
        { id: "fitlog-storage-error" }
      );
    }
  }, [plan, saved, isLoaded]);

  function addToPlan(workout) {
    if (!isLoaded) return;

    if (plan.some((item) => item.id === workout.id)) {
      toast.info("This workout is already in your plan.");
      return;
    }

    if (activeCount >= 5) {
      toast.error("Finish or remove a lift before adding more.");
      return;
    }

    setPlan((previous) => {
      const alreadyAdded = previous.some(
        (item) => item.id === workout.id
      );

      const unfinished = previous.filter((item) => !item.done);

      if (alreadyAdded || unfinished.length >= 5) {
        return previous;
      }

      return [...previous, { ...workout, done: false }];
    });

    toast.success("Added to today's plan.");
  }

  function saveWorkout(workout) {
    if (!isLoaded) return;

    if (saved.some((item) => item.id === workout.id)) {
      toast.info("This workout is already saved.");
      return;
    }

    setSaved((previous) => {
      if (previous.some((item) => item.id === workout.id)) {
        return previous;
      }

      return [...previous, workout];
    });

    toast.success("Saved for later.");
  }

  function markAsDone(id) {
    if (!isLoaded) return;

    const workout = plan.find((item) => item.id === id);

    if (!workout || workout.done) return;

    setPlan((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );

    toast.success("Workout marked as done.");
  }

  function removeFromPlan(id) {
    if (!isLoaded) return;
    if (!plan.some((item) => item.id === id)) return;

    setPlan((previous) =>
      previous.filter((item) => item.id !== id)
    );

    toast.success("Removed from today's plan.");
  }

  function removeFromSaved(id) {
    if (!isLoaded) return;
    if (!saved.some((item) => item.id === id)) return;

    setSaved((previous) =>
      previous.filter((item) => item.id !== id)
    );

    toast.success("Removed from saved workouts.");
  }

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        activeCount,
        addToPlan,
        saveWorkout,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      <Toaster
        position="top-right"
        theme="dark"
        richColors
        closeButton
      />
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkouts must be used inside WorkoutProvider."
    );
  }

  return context;
}