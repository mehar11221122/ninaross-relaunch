import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function SocialProofBar({ className }: { className?: string }) {
  return (
    <div className={cn("bg-ink text-cream", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-[10px] font-extrabold tracking-[0.16em] uppercase lg:px-8">
        <span className="flex items-center gap-1.5 text-gold">
          <Star className="size-3 fill-current" />
          {trust.googleRating}/5
        </span>
        <span className="text-ash">·</span>
        <span>{trust.googleReviewCount} Google reviews</span>
        <span className="text-ash">·</span>
        <span>{trust.clientsSeen} clients seen</span>
        <span className="text-ash">·</span>
        <span>{trust.yearsInPractice} years in practice</span>
      </div>
    </div>
  );
}
