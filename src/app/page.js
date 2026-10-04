import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-accent">
          FITLOG
        </h1>
        <p className="mt-4 text-zinc-400">
          Train with intent. Log every set.
        </p>
      </main>
    </>
  );
}