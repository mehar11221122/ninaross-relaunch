import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trust } from "@/data/trust";

/**
 * The one booking CTA used across the whole site.
 * Label and destination always come from src/data/trust.ts so they never drift.
 */
export function BookCta({
  className,
  iconClassName,
  showIcon = true,
  onClick,
  children,
}: {
  className?: string | undefined;
  iconClassName?: string | undefined;
  showIcon?: boolean | undefined;
  onClick?: (() => void) | undefined;
  children?: ReactNode | undefined;
}) {
  return (
    <a
      href={trust.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...(onClick ? { onClick } : {})}
      className={cn(className)}
    >
      {children ?? (
        <>
          {trust.ctaLabel}
          {showIcon ? <ArrowRight className={cn("size-3.5", iconClassName)} /> : null}
        </>
      )}
    </a>
  );
}
