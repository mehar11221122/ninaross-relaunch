import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { claims, credentials, ctas, nap, offer, trust } from "@/data/trust";
import type { Concern, ConcernBlock, ConcernFaq, TriageItem } from "@/data/types";
import { concernsBySlug } from "@/data/concerns";
import { treatmentsFor } from "@/data/concern-treatment-map";

/* --------------------------------------------------------------- primitives */

export function Section({
  id,
  tone = "bone",
  className,
  children,
}: {
  id?: string;
  tone?: "bone" | "alt" | "wine" | "ink";
  className?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "wine"
      ? "bg-[#764D4B] text-white"
      : tone === "ink"
        ? "bg-[#101112] text-white"
        : tone === "alt"
          ? "bg-[#EFE9DF] text-[#101112]"
          : "bg-[#F5F1E9] text-[#101112]";
  return (
    <section id={id} className={cn(bg, "px-5 py-16 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "wine" }: { children: ReactNode; tone?: "wine" | "gold" }) {
  return (
    <p
      className={cn(
        "text-[11px] font-extrabold tracking-[0.18em] uppercase",
        tone === "gold" ? "text-[#CFB078]" : "text-[#764D4B]",
      )}
    >
      {children}
    </p>
  );
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "mt-3 text-[26px] leading-[1.08] font-extrabold tracking-[-0.02em] uppercase sm:text-[34px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#101112] px-6 text-center text-[13px] font-extrabold tracking-[0.05em] text-white uppercase transition-colors hover:bg-[#764D4B]",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 shrink-0" />
    </a>
  );
}

/* ------------------------------------------------------------- breadcrumbs */

export function Breadcrumbs({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] font-semibold text-[#5B463B]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-[#764D4B]">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {current ? (
            <Link to="/concerns" className="hover:text-[#764D4B]">
              Conditions
            </Link>
          ) : (
            <span className="text-[#101112]">Conditions</span>
          )}
        </li>
        {current ? (
          <>
            <li aria-hidden="true">/</li>
            <li className="text-[#101112]">{current}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}

/* --------------------------------------------------------------------- hero */

export function ConcernHero({ concern }: { concern: Concern }) {
  return (
    <header className="bg-[#F5F1E9] px-5 pt-8 pb-10 text-[#101112] sm:pt-10 sm:pb-14">
      <div className="mx-auto w-full max-w-[1120px]">
        <Breadcrumbs current={concern.title} />
        <h1 className="mt-5 text-[30px] leading-[1.04] font-extrabold tracking-[-0.03em] uppercase sm:text-[46px]">
          {concern.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#5B463B]">
          {concern.shortDescription}
        </p>
        <p className="mt-4 text-[12px] font-semibold tracking-[0.04em] text-[#6F6A64]">
          {concern.clinicallyReviewed ? credentials.reviewerByline : credentials.delivery}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryButton href={ctas.href}>{ctas.primary}</PrimaryButton>
          <a
            href={nap.phoneHref}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#101112]/20 px-6 text-[13px] font-bold text-[#101112]"
          >
            <Phone className="size-4" />
            {nap.phone}
          </a>
        </div>
        {concern.firstViewportLink ? (
          <p className="mt-4 text-[14px]">
            <a
              href={concern.firstViewportLink.href}
              className="font-bold text-[#764D4B] underline underline-offset-4"
            >
              {concern.firstViewportLink.label}
            </a>
          </p>
        ) : null}
        <p className="mt-4 text-[12px] font-semibold tracking-[0.12em] text-[#6F6A64] uppercase">
          {nap.serviceArea}
        </p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------- quick answer */

export function QuickAnswer({ text }: { text: string }) {
  return (
    <div className="bg-[#F5F1E9] px-5 pb-14">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="rounded-xl border border-[#CFB078] bg-white p-6 shadow-[0_2px_18px_rgba(16,17,18,.06)] sm:p-8">
          <Eyebrow>Quick Answer</Eyebrow>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#101112]">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- symptoms */

export function SymptomList({ concern }: { concern: Concern }) {
  return (
    <Section tone="alt">
      <Eyebrow>What You Might Be Noticing</Eyebrow>
      <H2>Symptoms In Your Words, And Ours</H2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {concern.symptoms.map((s) => (
          <li key={s.clinical} className="rounded-xl border border-[#101112]/10 bg-white p-5">
            <p className="text-[16px] leading-snug font-bold text-[#101112]">"{s.herWords}"</p>
            <p className="mt-2 text-[13px] text-[#6F6A64]">{s.clinical}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------- causes */

export function CausesSection({ concern }: { concern: Concern }) {
  return (
    <Section>
      <Eyebrow>What Causes It</Eyebrow>
      <H2>What Is Actually Driving It</H2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {concern.causes.map((c) => (
          <div key={c.title} className="rounded-xl border border-[#101112]/10 bg-white p-6">
            <h3 className="text-[15px] font-extrabold tracking-[0.02em] text-[#101112] uppercase">
              {c.title}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5B463B]">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function LongBlock({ block, tone = "alt" }: { block: ConcernBlock; tone?: "bone" | "alt" }) {
  return (
    <Section tone={tone}>
      <Eyebrow>More Detail</Eyebrow>
      <H2>{block.heading}</H2>
      <div className="mt-6 max-w-3xl space-y-4">
        {block.body.map((p) => (
          <p key={p} className="text-[16px] leading-relaxed text-[#5B463B]">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- info gain */

export function InfoGainBlock({ block }: { block: ConcernBlock }) {
  return (
    <Section tone="ink">
      <Eyebrow tone="gold">What We See That Others Miss</Eyebrow>
      <H2 className="text-white">{block.heading}</H2>
      <div className="mt-6 max-w-3xl space-y-4">
        {block.body.map((p) => (
          <p key={p} className="text-[16px] leading-relaxed text-[#EADFDB]">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ triage grid */

export function SymptomTriageGrid({ items }: { items: TriageItem[] }) {
  return (
    <Section tone="alt">
      <Eyebrow>Start Here</Eyebrow>
      <H2>Which Bump Is It</H2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <a
            key={t.name}
            href={t.href}
            className="flex min-h-[44px] flex-col rounded-xl border border-[#101112]/10 bg-white p-6 transition-colors hover:border-[#CFB078]"
          >
            <h3 className="text-[15px] font-extrabold text-[#101112] uppercase">{t.name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5B463B]">{t.body}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.14em] text-[#764D4B] uppercase">
              Read more <ArrowRight className="size-3.5" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- treatment approach */

export function TreatmentApproach({ concern }: { concern: Concern }) {
  const list = treatmentsFor(concern.slug);
  return (
    <Section>
      <Eyebrow>How We Treat It</Eyebrow>
      <H2>What Care Looks Like Here</H2>
      <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-[#5B463B]">
        {concern.treatmentApproach}
      </p>
      {list.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {list.map((t) => (
            <a
              key={t.slug}
              href={t.href}
              className="rounded-xl border border-[#101112]/10 bg-white p-6 transition-colors hover:border-[#CFB078]"
            >
              <h3 className="text-[15px] font-extrabold text-[#101112] uppercase">{t.name}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#5B463B]">{t.blurb}</p>
            </a>
          ))}
        </div>
      ) : null}
      {concern.relatedPages?.length ? (
        <ul className="mt-8 flex flex-wrap gap-4">
          {concern.relatedPages.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="inline-flex min-h-[44px] items-center text-[14px] font-bold text-[#764D4B] underline underline-offset-4"
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

/* --------------------------------------------------------- discovery panel */

export function SampleReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sample Hair & Body Discovery Report"
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-[560px] overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Eyebrow>Sample Report</Eyebrow>
        <h3 className="mt-3 text-[22px] font-extrabold uppercase">What Lands In Your Inbox</h3>
        <ul className="mt-5 space-y-3 text-[15px] text-[#5B463B]">
          <li>Your scalp at 200x, with the areas we read marked.</li>
          <li>What the pattern looks like, in plain language.</li>
          <li>Which follicles look active and which areas need protecting.</li>
          <li>The suggested next steps, with no obligation attached.</li>
        </ul>
        <p className="mt-5 text-[12px] text-[#6F6A64]">
          Sample content is anonymized. {claims.resultsDisclaimer}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <PrimaryButton href={ctas.href}>{ctas.primary}</PrimaryButton>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] text-[13px] font-bold text-[#764D4B] uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function DiscoveryPanel() {
  const [open, setOpen] = useState(false);
  return (
    <Section tone="bone" id="discovery">
      <div className="rounded-2xl border border-[#CFB078]/60 bg-[#EFE9DF] p-6 sm:p-10">
        <Eyebrow>{offer.name}</Eyebrow>
        <H2>First We See. Then We Treat.</H2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {offer.includes.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-5">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#CFB078]/25 text-[#764D4B]">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="text-[16px] leading-snug text-[#101112]">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {offer.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[#101112]/10 bg-white px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] text-[#5B463B] uppercase"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-[#764D4B]/35 p-5">
          <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#764D4B] uppercase">
            Our Promise
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-[#101112]">{offer.riskReversal}</p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryButton href={ctas.href}>{ctas.primary}</PrimaryButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#101112]/25 px-6 text-[13px] font-bold tracking-[0.05em] text-[#101112] uppercase"
          >
            {ctas.sample}
          </button>
        </div>
        <p className="mt-5 text-[12px] font-semibold tracking-[0.08em] text-[#5B463B] uppercase">
          {offer.metaLine}
        </p>
        <p className="mt-2 text-[12px] text-[#6F6A64]">{trust.payment}</p>
      </div>
      <SampleReportModal open={open} onClose={() => setOpen(false)} />
    </Section>
  );
}

/* ------------------------------------------------------ cultural competency */

export function CulturalCompetency({ text }: { text: string }) {
  return (
    <Section tone="wine">
      <Eyebrow tone="gold">You Are Welcome Here</Eyebrow>
      <H2 className="text-white">We Are Well-Versed In Us</H2>
      <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-[#EADFDB]">{text}</p>
      <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#EADFDB]">
        Relaxers, braids, locs, weaves and heat. Share your full hair history. It is welcomed, never
        judged. {claims.years}. {claims.clients}.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------- related conditions */

export function RelatedConditions({ slugs }: { slugs: string[] }) {
  const items = slugs.map((s) => concernsBySlug[s]).filter(Boolean);
  if (!items.length) return null;
  return (
    <Section tone="alt">
      <Eyebrow>Related Conditions</Eyebrow>
      <H2>Often Confused With This</H2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c!.slug}
            to="/concerns/$slug"
            params={{ slug: c!.slug }}
            className="rounded-xl border border-[#101112]/10 bg-white p-6 transition-colors hover:border-[#CFB078]"
          >
            <h3 className="text-[15px] font-extrabold text-[#101112] uppercase">{c!.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5B463B]">{c!.shortDescription}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------------- faq */

export function FAQAccordion({ items }: { items: ConcernFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <Section>
      <Eyebrow>Questions, Answered</Eyebrow>
      <H2>Honest Answers Before You Commit</H2>
      <div className="mt-8 max-w-3xl">
        {items.map((f, i) => {
          const open = openIndex === i;
          return (
            <div key={f.q} className="border-t border-[#101112]/12 last:border-b">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-[52px] w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="text-[16px] font-bold text-[#101112]">{f.q}</span>
                <ChevronDown
                  className={cn("size-4 shrink-0 text-[#764D4B] transition-transform", open && "rotate-180")}
                />
              </button>
              {open ? (
                <p className="pb-5 text-[16px] leading-relaxed text-[#5B463B]">{f.a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- citations */

export function Citations({ concern }: { concern: Concern }) {
  if (!concern.citations?.length) return null;
  return (
    <Section tone="alt">
      <Eyebrow>References</Eyebrow>
      <ul className="mt-5 space-y-2">
        {concern.citations.map((c) => (
          <li key={c.pmid} className="text-[14px] text-[#5B463B]">
            {c.label}.{" "}
            <a
              className="font-bold text-[#764D4B] underline underline-offset-4"
              href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              PubMed {c.pmid}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12px] text-[#6F6A64]">{claims.resultsDisclaimer}</p>
    </Section>
  );
}

/* ------------------------------------------------------------- closing cta */

export function ClosingCTA() {
  return (
    <Section tone="ink">
      <Eyebrow tone="gold">Your Next Step</Eyebrow>
      <H2 className="text-white">Let's Find Out What Your Hair Is Trying To Tell You</H2>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#EADFDB]">
        {offer.riskReversalShort} {nap.serviceArea}.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryButton
          href={ctas.href}
          className="bg-[#CFB078] text-[#101112] hover:bg-[#DCC38D]"
        >
          {ctas.informational}
        </PrimaryButton>
        <a
          href={nap.phoneHref}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-[14px] font-bold text-white"
        >
          <Phone className="size-4" /> {nap.phone}
        </a>
      </div>
      <p className="mt-6 text-[13px] text-[#C3C1BE]">
        {nap.name}, {nap.full}. {nap.hours}.
      </p>
    </Section>
  );
}

/* --------------------------------------------------------- sticky mobile cta */

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#CFB078]/40 bg-[#101112]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={ctas.href}
        className="flex min-h-[48px] items-center justify-center rounded-full bg-[#CFB078] px-5 text-center text-[13px] font-extrabold tracking-[0.05em] text-[#101112] uppercase"
      >
        {ctas.sticky}
      </a>
    </div>
  );
}
