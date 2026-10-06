import {
  esc,
  tpCrumbs,
  tpEyebrow,
  tpH2,
  tpPhoneOutline,
  tpPrimary,
  tpSection,
  tpSticky,
  credentials,
  ctas,
  nap,
  offer,
  trust,
} from "@/lib/nr-text-parts";

function policyLinks(items: { href: string; label: string }[]): string {
  return `<ul class="tp-policy-links">${items.map((p) => `<li><a href="${esc(p.href)}">${esc(p.label)}</a></li>`).join("")}</ul>`;
}

export function renderEditorialPolicyBody(): string {
  return `<div class="text-page pb-sticky">
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("Editorial Policy")}
  <p class="tp-kicker">Editorial Standards</p>
  <h1 class="tp-h1-sm">Our Editorial Standards</h1>
  <p class="tp-lead">This site publishes clinical and educational content about hair loss and scalp health. Accuracy comes before marketing. Everything here is written so you can check it, not just read it.</p>
  <p class="tp-lead" style="margin-top:1rem;font-size:15px">For how clinical claims are reviewed before they go live, see our <a href="/medical-review-policy" style="font-weight:700;color:var(--tp-wine);text-underline-offset:4px">Medical Review Policy</a>.</p>
</div></header>

${tpSection("bone", `${tpEyebrow("Who Writes This")}${tpH2("Who Writes Our Content")}<div class="tp-prose">
  <p>Content is written by trichologists and health writers on the Nina Ross Hair Therapy team. Team-authored content is attributed as "Written by Nina Ross Hair Therapy."</p>
  <p>${esc(credentials.short)} may review clinical claims. When a page is clinically reviewed, the byline says so, and what that review means is defined on our <a href="/medical-review-policy">Medical Review Policy</a> page.</p>
  <p>${esc(credentials.short)} is a naturopathic doctor and Double Board Certified Trichologist. Her credentials are shown clearly so you always know who you are reading.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("How We Source")}${tpH2("How We Source Claims")}<div class="tp-prose">
  <p>We prefer PubMed, NIH, and peer-reviewed literature. When a clinical claim cites a study, the citation must resolve to a real, verifiable source before the page is published.</p>
  <p>We do not fabricate studies, PMIDs, or statistics. Where we reference external data, we link to the source. We do not invent metrics that we cannot point to.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Hype And Claims")}${tpH2("Accuracy Over Marketing")}<div class="tp-prose">
  <p>We do not use hype words: miracle, quick fix, guaranteed, instant, secret, breakthrough, forever. We do not make unsubstantiated claims about outcomes.</p>
  <p>When we use a public claim, it comes from our approved set: "${esc(String(trust.yearsInPractice))} years of specialized care" and "${esc(trust.clientsSeen)} clients seen." We do not invent figures like 10K clients, 98% success, or 100% regrowth.</p>
  <p>Where something cannot be fixed, we say so. Scarred follicles will not regrow hair, and we write that plainly when it is clinically relevant. Honesty about limits is part of accuracy.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Review And Updates")}${tpH2("Review And Updates")}<div class="tp-prose">
  <p>Clinical claims follow the medical review process described on our <a href="/medical-review-policy">Medical Review Policy</a> page.</p>
  <p>Non-clinical pages still get editorial checks for tone, facts of record (the offer, our NAP, and credentials), and link integrity. When a page gets a substantive update, its last-modified date is refreshed honestly.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Corrections")}${tpH2("How We Handle Corrections")}<div class="tp-prose">
  <p>If you see an error on this site, tell us. Use our <a href="/contact">contact page</a> to report it.</p>
  <p>We review reported errors and fix factual mistakes promptly. When a correction changes the meaning of a claim, the page is updated and the change is reflected in its last-modified date.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Conflicts And Commercial Intent")}${tpH2("Conflicts And Commercial Intent")}<div class="tp-prose">
  <p>This site converts to ${esc(offer.name)}. Editorial content may include that offer. It must not invent outcomes to sell it.</p>
  <p>The fixed offer copy comes from a single source of truth in our codebase and is rendered verbatim. When the offer is quoted, it is never paraphrased.</p>
</div>`)}

${tpSection(
  "bone",
  `${tpEyebrow("Related Policies")}${tpH2("Related Policies")}${policyLinks([
    { href: "/medical-review-policy", label: "Medical Review Policy" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/policies", label: "Policies" },
    { href: "/about", label: "About Nina Ross Hair Therapy" },
  ])}`,
)}

${tpSection(
  "wine",
  `${tpEyebrow("Your Next Step", "gold")}${tpH2("If This Is The Trust You Were Looking For", true)}
  <p class="tp-wine-p">Come see the work for yourself. ${esc(offer.name)}. ${esc(nap.serviceArea)}.</p>
  <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary, true)}${tpPhoneOutline(true)}</div>
  <p class="tp-wine-fine">${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.hours)}.</p>`,
)}
${tpSticky()}
</div>`;
}

export function renderMedicalReviewPolicyBody(): string {
  return `<div class="text-page pb-sticky">
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("Medical Review Policy")}
  <p class="tp-kicker">Clinical Review</p>
  <h1 class="tp-h1-sm">How We Review Clinical Content</h1>
  <p class="tp-lead">Clinical claims on this site are reviewed for accuracy before they publish. This page explains who reviews them, what gets reviewed, and what the byline means.</p>
  <p class="tp-lead" style="margin-top:1rem;font-size:15px">For how content is written and sourced, see our <a href="/editorial-policy" style="font-weight:700;color:var(--tp-wine);text-underline-offset:4px">Editorial Policy</a>.</p>
</div></header>

${tpSection("bone", `${tpEyebrow("The Byline")}${tpH2('What "Clinically Reviewed" Means')}<div class="tp-prose">
  <p>The byline "${esc(credentials.reviewerByline)}" appears only where ${esc(credentials.short)} actually reviewed the clinical claims on that page. It is not a default stamp on every page.</p>
  <p>Team-authored content that did not receive her review is attributed as "Written by Nina Ross Hair Therapy." Misuse of the reviewed-byline is a policy violation.</p>
  <p>When a page carries the reviewed-byline, it means the clinical claims on it were checked for accuracy against the sources cited, before the page went live.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Who Reviews")}${tpH2("Reviewer Qualifications")}<div class="tp-prose">
  <p>The clinical reviewer is ${esc(credentials.short)}. Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director.</p>
  <p>Her naturopathic and functional medicine training informs the whole-person lens used when she reviews clinical content.</p>
  <p>She oversees the clinical protocols used at the clinic. Certified trichologists perform the evaluations and hands-on treatments. For the full clinic story, see our <a href="/about">About</a> page.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Scope Of Review")}${tpH2("What Gets Reviewed")}<div class="tp-prose">
  <p>Clinical claims on these page types are reviewed before they publish:</p>
  <ul><li>Condition (concern) pages</li><li>Treatment pages</li><li>Clinical blog posts</li><li>Quick Answer blocks on clinical pages</li><li>Any medical-sounding statistics or causal language anywhere on the site</li></ul>
  <p>Citations must resolve to a real source at PubMed, the NIH, or a peer-reviewed journal before the page goes live. We do not publish a citation we cannot verify.</p>
  <p>When causes are discussed on a CCCA page, the approved causal sentence is used verbatim. Information-gain claims, where we add practice knowledge not found elsewhere, must be practice-true. We do not invent unpublished data.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Limits Of The Byline")}${tpH2("What Does Not Get The Badge")}<div class="tp-prose">
  <p>The reviewed-byline does not appear on marketing chrome, pure NAP and contact pages, or content she did not review.</p>
  <p>Commercial offer copy must still match our source of record exactly when it is quoted. That is editorial control over facts of record. It is not the same as clinical review, and we do not present it as such.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("How It Works")}${tpH2("The Review Process")}<div class="tp-prose">
  <p>The high-level flow for clinical content is:</p>
  <ol><li>A draft is written by a trichologist or health writer on the team.</li><li>Clinical claims in the draft are checked against the cited sources.</li><li>Sources are checked for accuracy and for resolving to a real record.</li><li>The page is approved, or sent back for revision.</li><li>On publish, the author and reviewedBy fields in the page schema reflect who actually wrote and reviewed the content.</li></ol>
  <p>We do not publish invented turnaround times, committee names, or software tools. The process is the process, described honestly.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Corrections")}${tpH2("Corrections And Re-Review")}<div class="tp-prose">
  <p>Factual clinical errors are corrected promptly. When a correction changes the clinical meaning of a claim, that change is reflected in the page's last-modified date.</p>
  <p>Significant clinical updates may be re-reviewed before the updated content goes live.</p>
  <p>If you see a clinical error on this site, tell us. Use our <a href="/contact">contact page</a> to report it. We do not publish a dedicated medical email address that does not exist.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Honesty About Limits")}${tpH2("Limits And Honesty")}<div class="tp-prose">
  <p>Clinical content on this site may name what cannot be fixed. For example, scarred follicles do not regrow hair, and we say so plainly when it is clinically relevant.</p>
  <p>We do not guarantee outcomes. We do not fabricate studies, sample sizes, or success rates. Where a claim is a practice observation rather than a published finding, we label it as such.</p>
</div>`)}

${tpSection(
  "alt",
  `${tpEyebrow("Related Policies")}${tpH2("Related Policies")}${policyLinks([
    { href: "/editorial-policy", label: "Editorial Policy" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/policies", label: "Policies" },
    { href: "/about", label: "About Nina Ross Hair Therapy" },
  ])}`,
)}

${tpSection(
  "wine",
  `${tpEyebrow("Your Next Step", "gold")}${tpH2("If This Is The Trust You Were Looking For", true)}
  <p class="tp-wine-p">Come see the work for yourself. ${esc(offer.name)}. ${esc(nap.serviceArea)}.</p>
  <div class="tp-actions">${tpPrimary(ctas.href, ctas.primary, true)}${tpPhoneOutline(true)}</div>
  <p class="tp-wine-fine">${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.hours)}.</p>`,
)}
${tpSticky()}
</div>`;
}

const LAST_UPDATED = "LAST UPDATED DATE NEEDED";
const CANCELLATION_POLICY = "CANCELLATION POLICY COPY NEEDED FROM PRACTICE";

export function renderPrivacyPolicyBody(): string {
  return `<div class="text-page pb-sticky">
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("Privacy Policy")}
  <p class="tp-kicker">Clinic Privacy Notice</p>
  <h1 class="tp-h1-sm">Privacy Policy</h1>
  <p class="tp-lead">Nina Ross Hair Therapy, ${esc(nap.full)}. Phone ${esc(nap.phone)}. Website https://www.ninaross.co. For privacy questions, use our <a href="/contact" style="font-weight:700;color:var(--tp-wine);text-underline-offset:4px">contact page</a> or call the clinic. ${esc(nap.building)}</p>
  <p class="tp-meta">${esc(LAST_UPDATED)}</p>
</div></header>

${tpSection("bone", `${tpEyebrow("What This Covers")}${tpH2("Scope")}<div class="tp-prose">
  <p>This policy covers this website and the common online contact and booking pathways you use to reach the clinic. It describes what information we collect through the site and how we use it.</p>
  <p>Clinical medical records may also be governed by applicable health privacy rules. This page is not a full legal opinion on those rules. If the practice publishes a separate Notice of Privacy Practices for clinical records, it will be linked from our <a href="/policies">Policies</a> page or available on request through <a href="/contact">contact</a>.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("What We Collect")}${tpH2("Information We Collect")}<div class="tp-prose">
  <p>Typical categories of information collected through the site include:</p>
  <ul><li>Contact details you submit, such as your name, email, phone number, and message.</li><li>Booking-related details you provide when scheduling a visit.</li><li>Basic technical data, such as IP address, browser, device, and pages viewed, collected via analytics if analytics is in use.</li><li>Communications you send us through forms, email, or phone.</li></ul>
  <p>We do not collect data types the site is not built to collect. If the site's collection changes, this page is updated.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("How We Use It")}${tpH2("How We Use Information")}<div class="tp-prose">
  <p>We use the information collected to:</p>
  <ul><li>Respond to your inquiries and schedule visits.</li><li>Operate and improve the site.</li><li>Measure site performance, for example through analytics if present.</li><li>Protect security and meet legal obligations.</li><li>Carry out booking and service activities, such as booking the $99 Hair &amp; Body Discovery.</li></ul>
  <p>We do not sell your personal information. We do not use your information for marketing in ways that do not match our actual practice.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Cookies And Analytics")}${tpH2("Cookies And Analytics")}<div class="tp-prose">
  <p>The site may use cookies or local browser storage for analytics and for session features such as the admin image editing tools. We do not maintain an exhaustive cookie list here.</p>
  <p>You can control cookies through your browser settings. Most browsers let you view, block, or delete cookies. Blocking cookies may affect some site features.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Sharing")}${tpH2("How We Share Information")}<div class="tp-prose">
  <p>We share information only as needed to run the site and the clinic:</p>
  <ul><li>Service providers that help run the site, such as hosting, analytics, and booking tools, under appropriate agreements.</li><li>Where required by law.</li><li>In connection with a business transfer, if one occurs.</li></ul>
  <p>Where the site uses hosting, authentication, or storage infrastructure, those providers are described here generically as hosting and infrastructure providers. We do not publish a fabricated list of third-party brands.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Retention And Security")}${tpH2("Retention And Security")}<div class="tp-prose">
  <p>We keep information as long as needed for the purposes collected, or as required by law. We use reasonable safeguards appropriate to the type of information.</p>
  <p>We do not claim certifications we have not earned. No security measure is perfect, and we do not imply otherwise.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Your Choices")}${tpH2("Your Choices")}<div class="tp-prose">
  <p>You can request access to or correction of your information through our <a href="/contact">contact page</a>. If email marketing exists, you can unsubscribe using the link in those messages.</p>
  <p>This is a Georgia, United States clinic. This page is a short standard framing, not an exhaustive state-by-state rights module. If counsel provides specific rights language, it will be added here.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Children")}${tpH2("Children")}<div class="tp-prose">
  <p>This site is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us information, contact us through the <a href="/contact">contact page</a> and we will remove it.</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Changes")}${tpH2("Changes To This Policy")}<div class="tp-prose">
  <p>This policy may update. When it does, the last-updated date at the top of this page will change. Continued use of the site after an update means you accept the revised policy.</p>
</div>`)}

${tpSection("alt", `${tpEyebrow("Contact")}${tpH2("Contact")}<div class="tp-prose">
  <p>${esc(nap.name)}<br>${esc(nap.full)}<br>${esc(nap.phone)}<br>Website: https://www.ninaross.co</p>
  <p>For privacy questions, use our <a href="/contact">contact page</a> or call the clinic. ${esc(nap.building)}</p>
</div>`)}

${tpSection(
  "bone",
  `${tpEyebrow("Related")}${tpH2("Related")}${policyLinks([
    { href: "/policies", label: "Policies" },
    { href: "/editorial-policy", label: "Editorial Policy" },
    { href: "/medical-review-policy", label: "Medical Review Policy" },
    { href: "/contact", label: "Contact" },
  ])}`,
)}

${tpSection(
  "wine",
  `${tpEyebrow("Questions", "gold")}${tpH2("If You Have A Privacy Question", true)}
  <p class="tp-wine-p">Call the clinic or use the contact page. We answer plainly.</p>
  <div class="tp-actions">${tpPhoneOutline(true)}${tpPrimary(ctas.href, ctas.primary, true)}</div>
  <p class="tp-wine-fine">${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.hours)}.</p>`,
)}
${tpSticky()}
</div>`;
}

export function renderPoliciesBody(): string {
  const cards = [
    {
      href: "/privacy-policy",
      label: "Privacy Policy",
      desc: "How we collect, use, and protect information when you use our website or contact the clinic.",
    },
    {
      href: "/editorial-policy",
      label: "Editorial Standards",
      desc: "Who writes our content, how we source claims, and how we handle corrections.",
    },
    {
      href: "/medical-review-policy",
      label: "Medical Review Policy",
      desc: "What clinically reviewed means, who reviews clinical claims, and reviewer qualifications.",
    },
    {
      href: "/contact",
      label: "Questions About A Policy",
      desc: "Call or message the clinic with any policy question.",
    },
  ]
    .map(
      (p) =>
        `<li><a class="tp-dir-card" href="${esc(p.href)}"><span class="t">${esc(p.label)}</span><span class="d">${esc(p.desc)}</span><span class="go">Read →</span></a></li>`,
    )
    .join("");

  return `<div class="text-page pb-sticky">
<header class="tp-hero"><div class="tp-wrap">
  ${tpCrumbs("Policies")}
  <p class="tp-kicker">Clinic Policy Index</p>
  <h1 class="tp-h1-sm">Clinic Policies</h1>
  <p class="tp-lead">Policies for using this website and visiting Nina Ross Hair Therapy in Sandy Springs. ${esc(nap.full)}. ${esc(nap.phone)}.</p>
</div></header>

${tpSection("bone", `${tpEyebrow("Policy Directory")}${tpH2("Policy Directory")}<ul class="tp-grid-2" style="list-style:none;padding:0;margin-top:2rem">${cards}</ul>`)}

${tpSection("alt", `${tpEyebrow("Visit And Booking")}${tpH2("Visit And Booking Guidelines")}<div class="tp-prose">
  <p><span style="font-weight:700;color:var(--tp-ink)">Booking.</span> The ${esc(offer.name)} is ${esc(offer.price)} and takes ${esc(offer.duration)}. Book at <a href="/book">/book</a>.</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Arrival.</span> Arrive on time for your visit. If you are running late, call the clinic. Late arrival may shorten the time available for your visit.</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Cancellation and reschedule.</span> Please contact us to reschedule if you cannot make your appointment.</p>
  <p class="tp-meta">${esc(CANCELLATION_POLICY)}</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Who performs visits.</span> Sessions are performed by certified trichologists. Clinical direction is by ${esc(credentials.short)}, who sets the protocols the team follows.</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Results honesty.</span> Results vary. Scarred follicles do not regrow hair where that is clinically relevant. ${esc(trust.guarantee)}</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Media and testimonials.</span> Client releases are signed at intake before any photo or testimonial is used. We do not fabricate reviews.</p>
  <p><span style="font-weight:700;color:var(--tp-ink)">Conduct.</span> This is a respectful, no judgment care environment. ${esc(trust.culturalWelcome)}</p>
</div>`)}

${tpSection("bone", `${tpEyebrow("Health Information")}${tpH2("Health Information On This Site")}<div class="tp-prose">
  <p>Content on this website is educational. It is not a personal diagnosis. Personal recommendations follow an in-person evaluation.</p>
  <p>To learn how we evaluate hair and scalp concerns, see <a href="/trichology">our trichology page</a>. To book an evaluation, go to <a href="/book">/book</a>.</p>
</div>`)}

${tpSection(
  "alt",
  `${tpEyebrow("Related")}${tpH2("Related Trust Pages")}${policyLinks([
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/editorial-policy", label: "Editorial Standards" },
    { href: "/medical-review-policy", label: "Medical Review Policy" },
    { href: "/about", label: "About Nina Ross Hair Therapy" },
    { href: "/faq", label: "Frequently Asked Questions" },
    { href: "/contact", label: "Contact" },
  ])}`,
)}

${tpSection("bone", `${tpEyebrow("Contact")}${tpH2("Contact")}<div class="tp-prose">
  <p>To ask a policy question, use our <a href="/contact">contact page</a> or call ${esc(nap.phone)}.</p>
  <p>${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.hours)}. ${esc(nap.serviceArea)}.</p>
</div>`)}

${tpSection(
  "wine",
  `${tpEyebrow("Questions", "gold")}${tpH2("If You Have A Policy Question", true)}
  <p class="tp-wine-p">Call the clinic or use the contact page. We answer plainly.</p>
  <div class="tp-actions">${tpPhoneOutline(true)}${tpPrimary(ctas.href, ctas.primary, true)}</div>
  <p class="tp-wine-fine">${esc(nap.name)}, ${esc(nap.full)}. ${esc(nap.hours)}.</p>`,
)}
${tpSticky()}
</div>`;
}
