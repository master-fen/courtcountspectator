import { ArrowLeft } from "lucide-react";

export function TournamentTitle({ title }: { title: string }) {
  return (
    <div className="px-4 pt-4 pb-2 flex items-start gap-3">
      <button
        type="button"
        aria-label="Назад"
        className="mt-1 text-foreground"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold leading-tight text-foreground">
        {title}
      </h1>
    </div>
  );
}
