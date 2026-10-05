import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WorkoutLibrary />
      </main>
    </>
  );
}