import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function PaymentTrust({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-4 border border-ink/10 bg-card p-6 sm:p-8", className)}>
      <CreditCard className="mt-0.5 size-6 shrink-0 text-maroon" />
      <div className="min-w-0">
        <p className="text-[9px] font-extrabold tracking-[0.22em] text-maroon uppercase">
          Paying For Care
        </p>
        <p className="mt-2 text-sm font-semibold text-ink">{trust.payment}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-warm">
          {trust.costTransparency}
        </p>
      </div>
    </div>
  );
}
