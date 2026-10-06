import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function RiskReversal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 border border-gold/50 bg-ink p-6 text-cream sm:p-8",
        className,
      )}
    >
      <ShieldCheck className="mt-0.5 size-6 shrink-0 text-gold" />
      <div className="min-w-0">
        <p className="text-[9px] font-extrabold tracking-[0.22em] text-gold uppercase">
          Our Guarantee
        </p>
        <p className="mt-2 text-sm leading-relaxed">{trust.guarantee}</p>
      </div>
    </div>
  );
}
