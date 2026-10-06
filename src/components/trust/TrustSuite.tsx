import { ProofGallery } from "@/components/trust/ProofGallery";
import { VerifiedTestimonials } from "@/components/trust/VerifiedTestimonials";
import { RiskReversal } from "@/components/trust/RiskReversal";
import { PaymentTrust } from "@/components/trust/PaymentTrust";
import { CulturalWelcome } from "@/components/trust/CulturalWelcome";
import type { ProofCase } from "@/data/trust";

/**
 * Money-page trust suite: full proof gallery, verified testimonials,
 * guarantee, payment transparency, and cultural welcome.
 */
export function TrustSuite({
  cases,
  includePayment = true,
}: {
  cases?: ProofCase[] | undefined;
  includePayment?: boolean;
}) {
  return (
    <>
      <ProofGallery cases={cases} />
      <VerifiedTestimonials />
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-16 lg:grid-cols-3 lg:px-8">
          <RiskReversal />
          {includePayment ? <PaymentTrust /> : null}
          <CulturalWelcome />
        </div>
      </section>
    </>
  );
}
