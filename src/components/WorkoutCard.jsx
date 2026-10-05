import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#222222]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-accent uppercase"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold uppercase transition-colors group-hover:text-accent">
          {workout.name}
        </h3>

        <p className="mt-2 mb-5 text-sm text-zinc-400">
          {workout.equipment}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-zinc-300">
          <span className="inline-flex items-center gap-1.5">
            <Clock3
              size={15}
              className="text-accent"
              aria-hidden="true"
            />
            {workout.duration} min
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Flame
              size={15}
              className="text-orange-400"
              aria-hidden="true"
            />
            {workout.caloriesBurned} kcal
          </span>

          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`Rating: ${workout.rating} out of 5`}
          >
            <Star
              size={15}
              className="text-yellow-400"
              aria-hidden="true"
            />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}