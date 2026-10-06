import { HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function CulturalWelcome({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 border border-ink/10 bg-cream-deep p-6 sm:p-8",
        className,
      )}
    >
      <HeartHandshake className="mt-0.5 size-6 shrink-0 text-maroon" />
      <div className="min-w-0">
        <p className="text-[9px] font-extrabold tracking-[0.22em] text-maroon uppercase">
          You Are Welcome Here
        </p>
        <p className="mt-2 text-sm font-semibold text-ink">{trust.culturalWelcome}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-warm">
          Relaxers, braids, locs, weaves, heat. Share your full hair history. It is welcomed,
          never judged.
        </p>
      </div>
    </div>
  );
}
