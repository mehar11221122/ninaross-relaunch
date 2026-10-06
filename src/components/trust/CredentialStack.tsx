import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

export function CredentialStack({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-xl", className)}>
      <p className="text-[9px] font-extrabold tracking-[0.22em] text-gold uppercase">
        Who Delivers The Care
      </p>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed font-semibold",
          tone === "dark" ? "text-cream" : "text-ink",
        )}
      >
        {trust.credentials}
      </p>
      <p
        className={cn(
          "mt-2 text-[12px] leading-relaxed",
          tone === "dark" ? "text-ash" : "text-stone-warm",
        )}
      >
        {trust.credentialByline}
      </p>
    </div>
  );
}
