"use client";

import { createContext, useContext, useState } from "react";
import { Toaster, toast } from "sonner";

const WorkoutContext = createContext(null);

export default function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const activeCount = plan.filter((item) => !item.done).length;

  function addToPlan(workout) {
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
    setPlan((previous) => previous.filter((item) => item.id !== id));
    toast.success("Removed from today's plan.");
  }

  function removeFromSaved(id) {
    setSaved((previous) => previous.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts.");
  }

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
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