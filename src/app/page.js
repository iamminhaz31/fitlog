import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section
          id="library"
          className="mx-auto min-h-[60vh] max-w-7xl scroll-mt-6 px-4 py-12 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </section>
      </main>
    </>
  );
}