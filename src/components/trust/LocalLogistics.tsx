import { MapPin, Phone, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function LocalLogistics({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const body = tone === "dark" ? "text-ash" : "text-stone-warm";
  const strong = tone === "dark" ? "text-cream" : "text-ink";

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      <div>
        <p className="text-[9px] font-extrabold tracking-[0.22em] text-gold uppercase">
          Visit The Clinic
        </p>
        <p className={cn("mt-3 text-sm font-semibold", strong)}>{trust.nap.name}</p>
        <p className={cn("mt-2 flex items-start gap-2 text-[13px] leading-relaxed", body)}>
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" />
          {trust.nap.address}
        </p>
        <p className={cn("mt-1.5 flex items-center gap-2 text-[13px]", body)}>
          <Phone className="size-3.5 shrink-0 text-gold" />
          <a href={trust.nap.phoneHref} className="hover:text-gold">
            {trust.nap.phone}
          </a>
        </p>
        <p className={cn("mt-1.5 flex items-center gap-2 text-[13px]", body)}>
          <Clock className="size-3.5 shrink-0 text-gold" />
          {trust.nap.hours}
        </p>
      </div>
      <ul className="space-y-2">
        {trust.logistics.map((l) => (
          <li key={l} className={cn("flex items-start gap-2 text-[13px] leading-relaxed", body)}>
            <Check className="mt-0.5 size-3.5 shrink-0 text-gold" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
