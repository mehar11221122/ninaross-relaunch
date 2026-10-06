# THE NINAROSS.CO MASTER STANDARD
## The SEO and Conversion System of Record for Nina Ross Hair Therapy

**Version 1.0 · September 2026**

**Supersedes:** `nrht-page-template-report.md` (the reference build report) and `ninaross-co-lovable-build-v3.md` (the Lovable prompt sequence). Both are retired. Where either disagrees with this document, this document wins.

**Derived from:** the live reference build at `/black-trichologist-atlanta`, the confirmed `/landing` offer, and 12 months of first-party Google Search Console data pulled September 2026.

**Who this is for:** every page brief, every Claude Design generation, every Lovable prompt, every React template, and every person who writes a line of copy for this domain.

---

## HOW TO USE THIS DOCUMENT

The two source documents were solving two different problems. The page template report solved **how a page converts**. The v3 build spec solved **how a site ranks and how it survives a migration**. Neither one alone ships the site.

This document merges them into one system with one order of operations:

```
SEARCH gets her to the page.
STRUCTURE keeps her reading.
OFFER books her.
TRUST keeps the ranking honest.
```

Read it in this order:

| If you are... | Read |
|---|---|
| Writing a new page | Parts 1, 2, 3, then that page's brief in Part 5 |
| Building in Lovable | Parts 3, 4, 6, then Part 5 for the page you are on |
| Running the migration | Parts 4, 7, 10 |
| Reporting on performance | Parts 8, 9 |
| Onboarding to the brand | Parts 1 and 2, nothing else, then come back |

**The one-line test for any page:** name the search filter and the dream outcome behind it in a single sentence before writing anything. If you cannot, you do not understand the page yet.

---

## PART 0: RECONCILIATION LOG

Every place the two source documents disagreed, and the ruling. This section exists so nobody relitigates a settled question six months from now.

### R1. The offer is the $99 Hair & Body Discovery. 30 minutes. RESOLVED.

The build spec called it a "$99 evaluation, 45 minutes, trichoscopy at 200x." The live flagship sells the "$99 Hair & Body Discovery, 30 minutes," including a 200x scalp read, a full-body biofeedback scan, and a Hair & Body Discovery Report delivered the next day.

**Ruling: the live offer wins.** The Hair & Body Discovery is the canonical offer name and the single conversion destination for the entire domain. The 45-minute scalp-only evaluation is retired as a public-facing product. Every schema block, every meta description, every CTA, and every data file reflects 30 minutes and the full three-part deliverable. See Part 1, "The Offer of Record."

*Consequence to execute:* the v3 spec's Content Rule 5 is void. `/book`, `/landing`, all 8 money pages, all 18 concern pages, all 9 treatment pages, and the footer CTA update to the Discovery language.

### R2. CTA language is benefit-led and offer-named. RESOLVED.

The build spec set the primary CTA as "Start With An Evaluation." The live flagship uses "Book My $99 Hair & Body Discovery."

**Ruling: the live language wins on conversion surfaces.** "Start With An Evaluation" describes a process. "Book My $99 Hair & Body Discovery" names an object with a price and a promise, and it is written in her voice. Full CTA ladder in Part 2, Rule 26.

### R3. Design direction is dark-led on conversion pages, light-led on informational pages. RESOLVED.

The build spec specified "light-mode-first, Warm Bone default." The flagship opens on a dark radial gradient and alternates surfaces.

**Ruling: both are correct for their page type.** Conversion pages (homepage, money, city) open dark and alternate dark to bone to alt to wine to bone. Informational pages (concern, treatment, blog) open on Warm Bone so the reading experience stays light and long-form legible. The palette, type, and component library are identical across both. See Part 3.6.

### R4. The credential line. RESOLVED, with one open item.

Canonical credential string: **Dr. Nina Ross, ND. Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director.**

The live page shortens this to "PhD in Functional Medicine." Both are acceptable; the long form is used on `/about`, in `Person` schema, and in bylines, and the short form is used in body copy where the full string would clutter.

The tenure claim is settled: **10 years of specialized care.** See R12.

### R5. The guarantee. RESOLVED.

The word "guaranteed" stays banned in all copy. One approved risk-reversal line exists and is used verbatim:

> "You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us."

Short form, where space is tight: **"You'll see it, or the $99 is on us."** No other guarantee, promise, or outcome commitment appears anywhere on the domain.

### R6. Cultural competency does not disappear on non-wedge pages. RESOLVED.

The build spec treats textured-hair expertise as a wedge-page feature. The page template report treats it as a universal block that adapts.

**Ruling: it adapts, it never disappears.** On wedge pages it is the Black-women block in full. On a treatment page it becomes "safe for textured hair, and here is what that actually changes about how we do this." On a men's or general page it becomes the relevant identity or experience block. A page with zero cultural-competency signal is off-brand.

### R7. Section count and depth vary by page type. The spine does not. RESOLVED.

`DESIRE → SELF-RECOGNITION → POSSIBILITY → EXPERTISE → OFFER → TRUST → ACTION` runs on every page type. What changes is proof-to-information ratio, where authority sits, and how hard the SEO layer works. See the variants table in Part 3.3.

### R8. Conditions named inline do not lose their king URL. RESOLVED.

The template report removed the standalone CCCA and traction alopecia cards from the flagship and folded those conditions into the expertise section. That is a page-layout decision. It has no effect on the query-ownership map. `/concerns/ccca`, `/ccca-treatment-atlanta`, `/concerns/traction-alopecia`, and `/traction-alopecia-treatment-atlanta` all still exist and still own their intents.

### R9. Static bundle versus React-from-data. RESOLVED.

Static HTML bundles for flagship marketing pages where pixel fidelity pays. React-from-data for the ~130 templated pages. Both read every offer, CTA label, credential, stat, and NAP from `src/data/trust.ts`. See Part 3.8.

### R10. Host survivor is www. UNCHANGED, and reaffirmed.

`www.ninaross.co` is the canonical host. All non-www 301s into www. This was already settled in v3 and nothing here changes it. See Part 4.1.

### R11. The biofeedback scan stays out of structured data, and stays undescribed. RESOLVED.

The scan is informational. Its job is to show where to look and to point toward the right blood labs. It does not diagnose, and it does not reveal exactly what is happening.

**Ruling:** structured data describes the trichoscopy-based scalp assessment only. The scan is never a `MedicalTherapy`, never a `Service`, never a `MedicalTest` in schema.

**And the part that matters more:** the scan is **named** in the Discovery includes list and it is never expanded on. The approved phrasing already exists and it already works. Generating new explanatory copy about what the scan detects, measures, or reveals is how an AI builder drifts into overclaiming, and overclaiming a biofeedback scan on a YMYL medical site is the single fastest way to undo the E-E-A-T the rest of this build exists to establish.

This becomes **Rule 29** in Part 2, because it is a standing instruction to every future prompt and every future page, not a one-time schema decision.

### R12. The two trust claims are substantiated and approved. RESOLVED, closing O2 and O3.

| Claim | Approved public wording | Internal substantiation basis |
|---|---|---|
| Tenure | **"10 years of specialized care"** | Confirmed. Use this exact figure in every instance sitewide. "7+ years" is retired |
| Volume | **"2,500+ clients seen"** | Confirmed real by the clinic, Oct 2026. The verb is *seen*, never *served*. Overrides the earlier "never publish as a figure" note |

Note the word: **seen**, not served. It is the more accurate verb for what a trichology practice does, and it is the one that ships.

Both go into `trust.ts` as real values. The `null` placeholders are removed.

### R13. Client releases are signed at intake. Permission is not a per-asset gate. RESOLVED, closing O7.

Every client signs a release when they start. Testimonials, photos, trichoscopy imagery, and before / during / after composites are already cleared for use.

**Ruling:** permission stops being a blocker and stops being a thing anyone checks per asset. The release file is the record if a use is ever questioned. What Rule 18 actually enforces from here is narrower and more important: **the person and the outcome are real.** No invented testimonial, no stock photo standing in for a client, no representative composite, no timeframe adjusted to look better. The results disclaimer still renders wherever a testimonial or a result appears.

Practical effect: the testimonial and imagery library is a selection problem, not a clearance problem. Pick the ones that carry the wedge, including at least two on CCCA or traction alopecia, and ship them.

### R14. The Sample Report does not need parity across pages. RESOLVED, closing O8.

**Ruling:** the flagship and `/landing` may show different sample reports. The two requirements are that each one is **accurate** and that each one **does the job**, which is showing her what she can expect to receive.

This is the better answer anyway. A sample report tuned to the page it sits on is more persuasive than one generic report stretched across both. The Discovery panel, the CTA, and the offer copy stay identical everywhere per Rule 30. The report preview inside the modal is content, and it flexes.

---

## OPEN ITEMS

**None.** Every item raised during reconciliation is closed. This document is fully locked and buildable.

| Was | Ruling |
|---|---|
| O1, scan in schema | R11. Out of schema, and undescribed beyond the includes line |
| O2, tenure claim | R12. 10 years of specialized care |
| O3, volume claim | R12. 2,500+ clients seen |
| O4, current live-page JSON-LD | Closed. This is a rebuild. What the current page emits does not matter. Build to the schema matrix in Part 6.2 |
| O5, GBP NAP and hours | Moved to the separate Google Business Profile document. The site side is still enforced here: the NAP renders from `trust.ts` and is on the migration freeze list |
| O6, review count and rating | Moved to the separate GBP document. `aggregateRating` ships on-site only when that document supplies real current data |
| O7, testimonial permissions | R13. Releases are signed at intake. The gate is that the person and the outcome are real |
| O8, Sample Report parity | R14. Parity not required. Accurate, and it does the job |

**The standing rule that replaces them:** any value not supplied by real first-party data is `null` or `needsData: true`, and the surface renders a qualitative badge or renders nothing. Never a placeholder number, never a filler testimonial. Rule 21.
---

# PART 1: THE STRATEGY

## 1.1 The governing idea

> **The keyword is the filter. Getting her hair back is the offer.**

"Black trichologist Atlanta" is how she finds you. Culturally competent care is why she trusts you enough to keep reading. It is not why she books. She books because she wants a fuller crown, edges she does not hide, a smaller part, less shedding on wash day, and the freedom to wear her hair however she wants.

This generalizes to every page on the domain. The keyword names the filter. The page sells the outcome behind it.

| Page | The filter | The dream outcome behind it |
|---|---|---|
| `/black-trichologist-atlanta` | Black trichologist Atlanta | Someone who already understands my hair, so I stop explaining and start fixing |
| `/concerns/ccca` | What is CCCA | Tell me whether the part of my crown I lost is coming back |
| `/concerns/scalp-bumps` | Bumps on my scalp | Tell me whether this is going to make me lose hair |
| `/blog/traction-alopecia-reversibility` | Is it too late | Tell me the truth, and tell me today |
| `/prp-hair-treatment-atlanta` | PRP Atlanta | I heard this works. Will it work on me |
| `/trichology` | What is a trichologist | Is this the right kind of person to see |

**Every brief in Part 5 opens with that one sentence.** No exceptions.

## 1.2 The two engines

The domain runs two engines that meet at one door.

**The Discovery Engine** answers her question. Concerns, treatments, blog, `/trichology`, `/functional-medicine`. It earns impressions, wins the click, and gets cited by AI engines. Its job is to be the most useful, most honest, hardest-to-replicate answer on the internet for its query, and to hand her to the conversion engine at exactly the moment she stops learning and starts wanting.

**The Conversion Engine** sells the outcome. Homepage, 8 money pages, `/book`, `/landing`. It runs the full emotional spine, carries the proof, and holds the offer. Its job is to make booking feel like the smallest reasonable next step.

**The one door:** the $99 Hair & Body Discovery. Every page on the domain, informational or commercial, terminates in that offer. There is no second conversion event competing for attention. No newsletter as the primary CTA, no lead magnet ahead of the offer, no "learn more" as a terminal action.

## 1.3 The offer of record

This is the canonical definition. Every data file, schema block, meta description, CTA, and page section renders from it.

**Name:** The $99 Hair & Body Discovery
**Price:** $99
**Duration:** 30 minutes
**Availability:** Monday to Saturday
**Location:** 8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350, inside the Nina Ross Functional Medicine building. Serving all of Metro Atlanta.
**Performed by:** certified trichologists. Dr. Nina Ross, ND oversees protocols as Founder and Clinical Director.

**What she gets, in this order:**

1. A one-on-one scalp health session with a certified trichologist
2. A 200x magnification read of her scalp, on screen, while she watches
3. A full-body biofeedback scan
4. The Hair & Body Discovery Report, delivered the next day

**The pills:** `NO PREP · ONE VISIT · SAME WEEK · NO JUDGMENT · SERVING ALL OF METRO ATLANTA`

**The meta line:** `$99 · 30 minutes · Serving Greater Atlanta`

**The risk reversal (verbatim, the only approved one):**
> "You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us."

**The framing that makes it convert:** the first step is tiny. She is not committing to months of treatment. She is finally understanding what is happening. Say it that way every time.

**What the offer is not:** it is not an appointment slot. Duration never appears in a headline. It lives in the meta line where it reassures instead of diminishing. "The $99 Hair & Body Discovery" reads as an event. "A 30-minute appointment" reads as a slot on a calendar.

**The scan line is fixed copy.** "A full-body biofeedback scan" is the whole description. It is named in the includes list and it is never expanded, explained, or elaborated on anywhere else. See Rule 29. The scan's real job is to show where to look and to point toward the right blood labs, and the copy that already works says exactly enough to convey that without claiming more. Every attempt to be more helpful about it makes it worse.

## 1.4 The emotional sequence (the spine)

```
DESIRE → SELF-RECOGNITION → POSSIBILITY → EXPERTISE → OFFER → TRUST → ACTION
```

| # | Stage | Job it does | Fails when |
|---|---|---|---|
| 1 | **Desire** | Names the outcome, never the credential | It opens with who we are instead of what she gets |
| 2 | **Self-Recognition** | She points at her own symptom, in her words | The language is clinical instead of hers |
| 3 | **Possibility** | Proof it can change, placed early and honestly | Proof is buried below the fold of the fold |
| 4 | **Expertise** | Why we can do this. One section, not five | It sprawls into five sections that all say the same thing |
| 5 | **Offer** | The $99 Hair & Body Discovery, in full | It is a button instead of a panel |
| 6 | **Trust** | Authority, reviews, local, after she wants it | Authority leads, so it reads as a resume |
| 7 | **Action** | Aspirational close. A tiny first step | It closes on fear or on urgency theater |

**The test:** read any section and say which stage it serves. No answer means it gets cut or rewritten. Sections may repeat a stage (two Desire sections is fine). No section may serve zero stages.

**On informational pages the spine compresses but survives.** A blog post runs Desire (her question, answered) → Possibility (the honest answer) → Expertise (the information-gain block) → Offer → Action. Self-Recognition and Trust shrink to a line each. The order never inverts.

## 1.5 The wedge

Black women experiencing hair loss are the center of this business and the center of the domain's search opportunity. The wedge is where cultural competency, clinical authority, and local intent all converge, and it is the only place where this practice is structurally hard to copy.

**The wedge cluster, in priority order:**

1. `black trichologist atlanta` and its variants (the flagship)
2. CCCA, the signature scarring alopecia affecting Black women
3. Traction alopecia and its reversibility question
4. Trichologist for Black hair, Black hair loss specialist Atlanta
5. Protective styling, relaxer history, and the grooming conversation, handled without blame

**Why the wedge and not the national nutrient traffic:** the magnesium, l-lysine, amino acid, potassium, and iodine posts pull enormous impressions and close to zero clicks, at roughly zero traffic value, and they do not book local Discoveries. They are preserved for domain authority and redirect equity, frozen where they earn clicks, and used as top-of-funnel feeders. They are never expanded. Coming out swinging means winning local, wedge, and high-intent clusters, and declining to chase national supplement traffic the business already exited.

## 1.6 The seven principles that make copy convert

1. **Positive framing over anxiety framing, wherever both are possible.** Describe the freedom she is gaining. "Pulling your hair back again," never "hiding your thinning edges." "Passing a mirror without checking your crown." "Letting the light hit your scalp without worry." "Choosing every hairstyle for how you want to look."

2. **Authority after the offer on conversion pages.** By the time she reaches Dr. Nina's bio she already wants this and is looking for permission to believe. Authority placed first reads as a resume. Authority placed after the offer reads as relief. This flips on informational pages, where the byline sits at the top for E-E-A-T.

3. **Self-recognition books on tap.** Symptom cards in her exact words, each one a tap straight to the calendar. This is the single highest-intent moment on the page. Remove every step between recognition and booking. No form, no scroll, no intermediate page.

4. **Reframe past failure without blame.** "You weren't treating it wrong. You were treating the wrong layer." Remove the shame, reframe the category, never the effort. She has tried things. Those attempts were reasonable.

5. **Honesty is the proof device.** Naming what cannot be fixed earns more trust than promising what can. Scarred follicles do not regrow. Say so. "We'd rather tell you honestly than promise what we can't deliver." This is also the mechanism that makes the reversibility content the highest-booking-intent content on the domain.

6. **The first step is tiny.** "Your first step isn't committing to months of treatment. It's finally understanding what's happening." Repeat a benefit-led CTA at every decision point on the page.

7. **Specific small moments over abstractions.** Wash day. The light hitting your scalp. The part in the mirror. Pulling your hair back. The photo you almost did not take. Abstractions are forgettable and small moments are hers.
---

# PART 2: THE NON-NEGOTIABLES

Thirty rules, merged from both source documents and deduplicated. Every page ships only after a line-by-line pass against this list. Group A is fact. Group B is craft. Group C is truth. Group D is search discipline. Group E is builder discipline, and it exists because an AI builds this site.

## Group A: Facts of record (never vary, never paraphrase)

**Rule 1. Dr. Nina Ross is ND.** Never MD. Never dermatologist. Never "doctor" in a context that implies either. Canonical long form: *Dr. Nina Ross, ND. Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director.* Short form in body copy: *Dr. Nina Ross, ND, Double Board Certified Trichologist.*

**Rule 2. Dr. Nina Ross does not perform scalp evaluations.** Certified trichologists perform all evaluations and all hands-on treatments. Dr. Nina oversees protocols as Clinical Director. Any copy implying she is in the room performing the read is wrong and gets corrected.

**Rule 3. The offer is the $99 Hair & Body Discovery, 30 minutes.** 200x scalp read, full-body biofeedback scan, Hair & Body Discovery Report delivered the next day. Never "evaluation" as the product name. Never 45 minutes. Never a duration in a headline.

**Rule 4. NAP renders from one source, character for character.**
> Nina Ross Hair Therapy
> 8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350
> (678) 561-4522
> Monday to Saturday, 10:00 AM to 3:30 PM

This exact string appears in the footer, on `/contact`, in every `LocalBusiness` block, and on the Google Business Profile. It is on the migration freeze list. A NAP mismatch at cutover silently damages local rankings and nobody notices for a month.

**Rule 5. Schema city is Sandy Springs.** Structured data always says Sandy Springs. Marketing copy may say Atlanta, Atlanta metro, Greater Atlanta, or Sandy Springs, GA (Atlanta metro). The two never contradict each other on the same page.

**Rule 6. "Serving all of Metro Atlanta" appears at least once on every page.** Traveling to Sandy Springs has to feel normal. Areas served: Sandy Springs, Atlanta, Dunwoody, Brookhaven, Roswell, Marietta, Decatur, Alpharetta.

**Rule 7. We never refer out.** No copy references coordinating with outside physicians, dermatologists, or specialists. Everything possible is handled in house. This is a brand position and a schema position.

## Group B: Copy craft

**Rule 8. Second person, always.** "Your crown," never "the patient's crown," never "women who experience."

**Rule 9. Benefit before mechanism.** Say what she gets, then say how it works. Trichoscopy at 200x is a mechanism. Seeing what is actually happening on your own scalp is the benefit. Lead with the second.

**Rule 10. Specific small moments, not abstractions.** Wash day. The light hitting your scalp. Pulling your hair back. The part in the mirror.

**Rule 11. Positive framing over anxiety framing wherever both are possible.** Describe the freedom, not the fear.

**Rule 12. Reframe past failure without blame.** "You weren't treating it wrong. You were treating the wrong layer."

**Rule 13. No em dashes. Anywhere.** Commas, periods, colons, or "to." This applies to page copy, meta descriptions, schema strings, data files, alt text, and email.

**Rule 14. No "not X, but Y" constructions.** Rewrite as two sentences or as a direct positive statement.

**Rule 15. Banned words in all copy:** miracle, quick fix, guaranteed, instant, one-size-fits-all, cheap, magic, secret, breakthrough, forever.

**Rule 16. Voice is warm, honest, confident, never salesy.** Design tone is Whole-Body Modern: bold, urban, expert-led, editorial, premium. Deliberate confidence is allowed and encouraged ("And we're pretty good at it"). Hype is not.

## Group C: Truth and trust (YMYL)

**Rule 17. Trust-claim substantiation.** No statistic or superlative appears on the site unless real records back it. Permanently banned: "10K+ Transformations," "98% Satisfaction," "100% Science-Backed," and any invented percentage. An unsubstantiated stat on a medical site undercuts the exact E-E-A-T the PubMed citation system exists to build.

**The approved claim register.** These are substantiated and cleared for use anywhere on the domain, in this exact wording:

| Approved wording | Type |
|---|---|
| **10 years of specialized care** | Substantiated tenure claim. "7+ years" is retired and never appears |
| **2,500+ clients seen** | Substantiated volume claim, confirmed real by the clinic. The verb is *seen*, never *served* |
| Double Board Certified Trichologist | Credential |
| Board-Certified Trichologists | Credential, team |
| Trichoscopy-guided | Method |
| Science-backed protocols | Method |
| Whole-Body Approach | Method |
| Doctor Formulated · Clinically Informed · Safe For Textured Hair · Privacy Protected | Qualitative badges |

Anything outside this register needs substantiation before it ships. Adding to the register is a decision, not a writing choice.

**Rule 18. No fabricated stats, photos, reviews, testimonials, or timeframes.** The person is real, the outcome is real, and the timeframe is the one that actually happened.

Clients sign a release at intake, so **permission is already handled and is not checked per asset.** What this rule catches is invention: a written testimonial nobody said, a stock photo standing in for a client, a composite presented as one person, a timeframe shortened because it reads better.

Testimonials render with first name and last initial, condition, treatment received, timeframe, and the disclaimer "Results not typical. Individual results will vary." Placeholders are labeled as placeholders in the code and never ship to production.

**Rule 19. One approved risk-reversal line, used verbatim.** See Part 1.3. No other guarantee anywhere.

**Rule 20. Honesty is the proof device.** Name what cannot be fixed. Scarred follicles do not regrow. Advanced traction alopecia is manageable and may not fully regrow. Saying so is the highest-converting sentence on those pages.

**Rule 21. External data rule: never fabricate metrics.** Never invent SEO metrics, rankings, impressions, clicks, referring domains, Domain Rating, backlinks, GBP metrics, GA4 metrics, clinical sample sizes, or research statistics. Use supplied first-party or authenticated data only. When a value is unavailable, store `null` or mark `needsData: true`. This applies to `seo-baseline.ts`, `seo-tracking.ts`, `outreach-targets.ts`, `citations.ts`, `testimonials.ts`, `clinical-insights.ts`, and every rendered stat. A number on this site is real and traceable or it does not ship. A TypeScript field expecting a number is never a reason to invent one.

**Rule 22. Authorship is accurate.** "Clinically reviewed by Dr. Nina Ross, ND" appears only where she actually reviewed it. Team-authored content is "Written by Nina Ross Hair Therapy." Do not attribute everything to Dr. Nina by default. Author and reviewer render in `author` and `reviewedBy` schema on clinical pages.

**Rule 23. CCCA causal language is scientifically defensible.** Standard phrasing everywhere CCCA causes appear, verbatim:

> "Certain grooming practices have been associated with CCCA in some studies, although CCCA is multifactorial and these practices have not been established as the sole cause."

Relaxers, heat, and tension are never stated as proven causes. This is better science, and it avoids implying blame toward the exact women the page serves. The same defensive posture applies to traction alopecia causation on pages that name protective styling.

**Rule 24. Every clinical citation resolves.** PMIDs are verified before publishing. A citation that does not resolve is a fabricated source.

## Group D: Search discipline

**Rule 25. Information gain.** Every clinical article and content page contains at least one thing that would be hard to produce without this practice's actual expertise: an original clinical observation, a trichoscopy insight, a practitioner explanation, an observed client pattern, an internal framework, or a first-party data point. Never publish content that only summarizes what is already widely available. This is the durable moat against national commodity content and the reason AI engines cite this domain instead of the aggregators.

**Rule 26. Titles and metas are written to earn the click.** Every indexable page's `<title>` and meta description is conversion copy. Lead with her actual question or the benefit, include the primary keyword, and on local pages include the city.

**The diagnosis protocol (no universal CTR benchmark exists):** CTR is crushed independently by AI Overviews, local packs, featured snippets, image blocks, brand-dominated results, and query intent. There is no grading scale. When a page shows unusually low CTR at a strong position, trigger a SERP inspection first. Check (a) intent match, (b) SERP features present, (c) competing titles. Then decide:

- Title or intent-match problem → rewrite title and meta, monitor for 30 days.
- SERP is national-informational or AIO/PAA dominated, and the query would not book a local Discovery anyway → **deprioritize it.** Do not burn cycles testing titles on a query that structurally cannot convert for this business.

**Rule 27. One king URL per intent.** Never build two pages targeting the same query family. The query-ownership map in Part 4.3 is authoritative. Supporting pages link **up** to their king. Related pages cross-link freely; only one owns each intent. "What is CCCA" and "CCCA treatment Atlanta" are different intents with different kings.

**Rule 28. The CTA ladder.** Primary CTA on every conversion surface: **"Book My $99 Hair & Body Discovery."** Approved variants, by context:

| Context | Label |
|---|---|
| Primary button, hero and offer panel | Book My $99 Hair & Body Discovery |
| First-person start variant | Start My $99 Hair & Body Discovery |
| Proof section | See What Progress Looks Like |
| Offer panel secondary | Preview A Sample Report |
| Informational page inline | Find Out What's Actually Happening |
| Sticky mobile | Book My $99 Discovery |
| Phone, always adjacent | (678) 561-4522 |

Every page links to the booking action within the first viewport and again in the closing CTA. Buttons center their label and arrow at ≤1000px.

## Group E: Builder discipline

These two exist because the tool building this site is an AI, and an AI's default instinct is to be more helpful by explaining more. On a YMYL medical site, that instinct is the risk.

**Rule 29. The biofeedback scan is named and never explained.** "A full-body biofeedback scan" is the entire approved description. It appears in the Discovery includes list. It appears nowhere else, in no expanded form, on any page, in any meta description, in any FAQ answer, in any Quick Answer block, and in no schema of any kind.

Specifically forbidden, in copy and in structured data:
- Any claim that the scan diagnoses, detects, identifies, or reveals a condition
- Any claim that it shows "exactly what is happening" or "the full picture"
- Any list of what it measures, scans, reads, or analyzes
- Any framing of it as a test, a medical test, a diagnostic, or a service in its own right
- `MedicalTherapy`, `MedicalTest`, or `Service` schema describing it

What the scan actually does, for internal understanding and never as page copy: it shows where to look, and it points toward the right blood labs. The existing approved phrasing already conveys that. Every attempt to improve on it overclaims.

**When a prompt or a brief asks for more detail about the scan, the correct output is the existing line, unchanged.**

**Rule 30. Fixed copy blocks are fixed.** The offer name, the includes list, the risk-reversal line, the CCCA causal sentence, the results disclaimer, and the credential strings are canonical text in `trust.ts`. They are rendered, never rewritten, never paraphrased, never "improved for flow," and never regenerated to fit a new page's tone. A builder that produces a variant of one of these has produced a bug. When a page needs different language around a fixed block, change the language around it.
---

# PART 3: THE PAGE SYSTEM

## 3.1 The reference build, generalized

`/black-trichologist-atlanta` is the reference. Its section order is the canonical money-page order:

| # | Section | Stage | Job |
|---|---|---|---|
| 1 | Hero | Desire | Names the outcome, not the credential |
| 2 | `#imagine` | Desire | Daily-life freedom in positive framing |
| 3 | `#results` | Possibility | Real before / during / after proof, early |
| 4 | `#noticing` | Self-Recognition | She points at her symptom and books on tap |
| 5 | `#why` | Expertise | Trichology versus dermatology, keyword-bearing |
| 6 | `#expertise` | Expertise | One consolidated textured-hair section |
| 7 | `#evaluation` | Offer | The $99 Hair & Body Discovery panel |
| 8 | `#drnina` | Trust | Authority placed after the offer |
| 9 | `#reviews` | Trust | Real clients only. Releases are on file, so selection is the only question |
| 10 | `#areas` | Trust / local | Metro Atlanta reach, naturally worded |
| 11 | `#faq` | Objection handling | Conversational, never corporate |
| 12 | `#book` | Action | Aspirational close on the wine gradient |

## 3.2 The universal section library

Every section that may appear on any page, what it does, and where it is allowed. Build from this library. Do not invent a section without assigning it a stage.

| Section | Stage | Allowed on | Notes |
|---|---|---|---|
| **Hero, outcome-led** | Desire | All | H1 names the outcome. One supporting paragraph, never three. CTA above the fold on mobile. Gold accent on the promise clause |
| **Transformation triptych** | Desire | Money, homepage | Desktop only, hidden ≤1000px so mobile gets headline and CTA above the fold |
| **Dream-outcome cards** | Desire | Money, homepage, city | Positive framing only. Real photo flush-connected to the top of each white card |
| **Quick Answer box** | Desire | Concern, treatment, blog, hub | 75 to 200 words, complete, AI-citable. Sits directly under H1. This is the passage AI engines quote |
| **Results, before / during / after** | Possibility | All conversion pages | Three panels, never two. The "during" panel proves a process instead of a lucky photo |
| **Self-recognition cards** | Self-Recognition | Money, homepage, concern | Her exact words. Raised-hand indicator. Tap opens the calendar. No form in between |
| **Symptom triage grid** | Self-Recognition | Symptom-entry concern pages | Each cause links to its own concern page. Used on `/concerns/scalp-bumps` |
| **Trichology versus dermatology** | Expertise | Money, `/trichology`, hair-doctor pages | Answers the unasked question. Carries the keyword |
| **Six causes with info tips** | Expertise | Money, concern | JS-only open state, one at a time, tap to close. No CSS `:hover` |
| **Consolidated cultural competency** | Expertise | All, adapted per audience | One section. Never five. See Part 0, R6 |
| **Information-gain block** | Expertise | Every clinical page | Rule 25. Trichoscopy insight, observed pattern, or internal framework |
| **Shaped video window** | Expertise | Money, `/trichology` | 16:9 inside the asymmetric rounded frame. Enlarged on mobile |
| **The 200x macro + overlay card** | Offer | Offer sections | The magnification card overlays the lower edge of the image, never floats near the headline |
| **The Discovery panel** | Offer | All | Light scheme. Four checkmark features, wine ribbon block, Sample Report button, pills, Our Promise box, meta line |
| **Sample Report modal** | Offer | All | Anonymized preview, signal bars, "where we'd look next," disclaimer, booking CTA. May differ by page as long as it is accurate and shows what she will receive |
| **Dr. Nina authority block** | Trust | All | After the offer on conversion pages. Byline at top on informational pages |
| **Reviews** | Trust | All | Real clients only. Disclaimer rendered |
| **Areas we serve** | Trust / local | Money, city, homepage | Natural sentences. Never a keyword list |
| **FAQ accordion** | Objection | All | Written the way she would actually ask. Emits `FAQPage` JSON-LD |
| **References / Citations** | Trust | Clinical pages | Medical citation style, links to PubMed |
| **Related conditions and treatments** | Trust | Concern, treatment, blog | Internal link graph, Part 4.4 |
| **Aspirational close** | Action | All | Wine gradient. Closes on possibility. Never on fear or urgency theater |
| **Sticky mobile CTA** | Action | Global | Appears after scroll. Hides whenever a real CTA is ≥35% visible |

## 3.3 Page-type variants

The spine is constant. Proof-to-information ratio, authority placement, and SEO weight change. **This table is what every brief in Part 5 is built from.**

| Page type | Leads with | Proof : Info | Authority position | Surface | Schema | SEO weight |
|---|---|---|---|---|---|---|
| **Homepage** | Brand plus desire ("Stronger Hair. Stronger You.") | Proof-heavy | Mid, after the approach | Dark hero, alternating | `Organization` + `LocalBusiness` + `MedicalBusiness` | Brand plus "hair loss treatment atlanta" |
| **Money / City** | The desire behind the keyword | Proof-heavy, info-light | After the offer | Dark hero, alternating | `Service` + `LocalBusiness` + `FAQPage` | Local-intent king URL |
| **Concern (standard)** | Quick Answer plus the desire | Balanced, info-forward | Byline near the top (E-E-A-T) | Warm Bone hero | `MedicalCondition` + `MedicalWebPage` + `FAQPage` | Condition king URL, AI-citable blocks |
| **Concern (flagship)** | Quick Answer plus the wedge story | Balanced, proof-forward | Byline top, Dr. Nina block mid | Warm Bone hero, wine expertise band | Same, plus `ImageObject` on trichoscopy | Wedge king, feeds a money page |
| **Concern (symptom-entry)** | Direct answer to her literal question | Info-heavy, triage-forward | Byline top | Warm Bone hero | `MedicalCondition` + `FAQPage` | Impression-pool capture |
| **Treatment** | What it does for her, never the procedure name | Balanced | Mid | Warm Bone hero | `MedicalTherapy` + `FAQPage` | Treatment intent |
| **Blog post** | Her question, answered directly | Info-heavy, proof-light | Byline top plus "Clinically reviewed by Dr. Nina Ross, ND" | Warm Bone | `Article` (+ `MedicalWebPage` where clinical) + `FAQPage` | Long-tail, feeds a king |
| **Blog category hub** | The category promise | Info-only | None | Warm Bone | `CollectionPage` + `BreadcrumbList` | Category intent, internal link distribution |
| **Supporting hub** | The honest answer to a scared question | Info plus proof | Byline top | Warm Bone hero, wine CTA band | `Article` + `FAQPage` | High booking intent, links up to its money king |
| **Utility / trust** | Clarity | Info-only | Named where relevant | Warm Bone | Page-appropriate | Low, `noindex` on legal |

**Two constants across every variant:**

1. The page ends on **Offer → Action**: the $99 Hair & Body Discovery and a tiny first step.
2. The cultural-competency block is present and adapts to the page's audience. It never disappears.

## 3.4 Mobile rules

- Hero headline and CTA above the fold. The transformation triptych hides at ≤1000px to make room.
- Logo and nav shrink on mobile to protect the fold.
- All display headlines and `.lp-h2` center at mobile widths.
- `.nr-btn` centers label and arrow at ≤1000px instead of spreading edge to edge.
- Eyebrow labels center on mobile.
- Touch targets 44x44px minimum. Body text 16px minimum. No horizontal scroll. No tap delay.
- The shaped video window enlarges on mobile.
- Sticky CTA appears after scroll and yields to any real CTA that is ≥35% visible.

## 3.5 Photography direction

Real clients, real scalps, natural light, no stock. Before / during / after, always three panels. Crops come from real client composites with label bands removed. Images that head a card are flush-connected to it with no gap, so the image and the promise read as one object. Every image is WebP with explicit width and height or aspect-ratio set to prevent CLS. Alt text is descriptive and written for a person, not for a crawler.

## 3.6 Design system

**Palette**

| Token | Hex | Role | Share |
|---|---|---|---|
| Nina Black (ink) | `#101112` | Primary text, logos, headers | 60% |
| Deep | `#080909` | Hero gradient floor | n/a |
| Warm Bone | `#F5F1E9` | Backgrounds, section fills | 25% |
| Alt | `#EFE9DF` | Alternating section surface | n/a |
| Cocoa | `#5B463B` | Supporting text, warm neutrals | 5% |
| Champagne | `#CFB078` | Accents, CTA hover, premium touches | 5% |
| Deep Olive | `#666B57` | Grounding accents, badges, tags | 3% |
| Clay Wine | `#764D4B` | Emotional warmth, sparse highlights | 2% |

**Gradients**
- Hero: `radial-gradient(circle at 76% 28%, #2A231F, #151717 37%, #080909 74%)`
- Final CTA: `linear-gradient(120deg,#563331,#764D4B)`

**Type**
Montserrat, three weights. H1 ExtraBold 800, uppercase for hero and impact, tight negative letter-spacing on display sizes. H2 and subheads Medium 500. Body and UI Regular 400. Eyebrow label above most headlines, centered on mobile.

**Surface rhythm**
Conversion pages alternate dark → bone → alt → wine → bone so nothing reads as one long scroll. Informational pages start on Warm Bone and alternate bone → alt → wine (once, for the expertise band) → bone.

**The offer panel is always the light scheme**, on every page type, on every surface. Warm Bone outer, white feature cards, ink headline, wine accents, cocoa body, champagne borders. This consistency is what makes the offer recognizable across 130 pages.

**UI specs**
8px base grid. Radius 8px on inputs and buttons, 12px on cards. Shadow only `0 4px 16px rgba(0,0,0,0.06)`. Primary button filled dark with Warm Bone text. Secondary outlined. Tertiary text link with arrow. Champagne fill on the nav CTA.

**Accessibility**
WCAG AA. Contrast 4.5:1 minimum, and specifically verify Champagne-on-Warm-Bone and Cocoa-on-Warm-Bone combinations pass before shipping. Keyboard navigation, visible focus states, skip-to-content, ARIA labels on icon buttons.

**Dark mode**
Light-mode-first with Warm Bone default on informational pages. Dark mode supported via CSS custom properties: invert Nina Black and Warm Bone, keep accents constant.

## 3.7 Interaction inventory

| Pattern | Where | Notes |
|---|---|---|
| **Booking lightbox** | Every CTA, sitewide | `public/shared/booking-lightbox.js`. Intercepts booking links, `#book`, `/book`. Full-height on mobile, 92vh centered on desktop, scrollable iframe, Escape and backdrop close, new-tab fallback |
| **Tap-to-book cards** | Self-recognition | Each symptom card calls `window.__nrOpenBooking()`. No form in between |
| **Info tips** | Six-causes cards | JS-only open state, one at a time, tap again to close. CSS `:hover` visibility removed so mobile and desktop never disagree |
| **Sample Report modal** | Offer section | Document-level delegated click so it survives runtime re-render. Focus trap and scroll lock. Closes on ✕, backdrop, Escape |
| **Sticky mobile CTA** | Global | Appears after scroll, hides whenever a real CTA is ≥35% visible |
| **Shaped video window** | Method section | 16:9 inside the asymmetric rounded frame, no black edges, enlarged on mobile |
| **FAQ accordion** | All | Emits `FAQPage` JSON-LD from the same data that renders the UI |
| **Breadcrumbs** | All non-home pages | Emits `BreadcrumbList` JSON-LD |

## 3.8 Build architecture

The reference page is a hand-built static HTML bundle with values hard-coded. That is correct for a flagship and wrong for 130 pages. The rule that keeps both true:

- **Static bundles → flagship marketing.** Money and city pages, where pixel perfection pays. Accept the trade-off: manual refresh, no hot reload, images hard-wired as local WebP in the page's own `img/` folder.
- **React-from-data → everything scaled.** 18 concerns, 9 treatments, ~95 blog posts, and the hubs render this exact sequence and design from TypeScript data files.

**Stack:** TanStack Start with SSR (mandatory for SEO), TanStack Router file-based routing, Tailwind, shadcn/ui, TypeScript throughout. No product, collection, cart, or checkout functionality, ever.

**The five rules that keep static and templated pages in sync:**

1. **One source of truth.** Every offer, CTA label, credential, stat, price, duration, and NAP renders from `src/data/trust.ts`. Never hard-coded. A static flagship and a templated page can never disagree about the price of the Discovery.
2. **Shared components are inserted by page type.** The Discovery explainer, the Sample Report modal, the booking lightbox, the NAP block, and the trust badges are one implementation each. Static flagships pull the same copy so nothing drifts. The Sample Report modal is the one component whose *content* is a prop: the shell, the behavior, and the CTA are shared, and the report shown inside it may differ by page per R14.
3. **The SEO layer holds everywhere.** Canonical www host, schema, segmented sitemap, and the redirect map run across static and templated pages identically.
4. **Inline does not mean deleted.** Naming a condition inside a money page does not remove its dedicated king URL.
5. **Fixed blocks render, they do not regenerate.** Rule 30. The strings in `trust.ts` marked FIXED are output verbatim by every surface. A component that paraphrases one has a bug.

### `src/data/trust.ts` (the contract)

```ts
export const trust = {
  offer: {
    name: "The $99 Hair & Body Discovery",
    price: 99,
    priceDisplay: "$99",
    durationMinutes: 30,
    metaLine: "$99 · 30 minutes · Serving Greater Atlanta",
    includes: [
      "One-on-one scalp health session with a certified trichologist",
      "200x magnification read of your scalp, on screen, while you watch",
      "Full-body biofeedback scan",   // FIXED. Rule 29. Named, never expanded, never in schema.
      "Your Hair & Body Discovery Report, delivered the next day",
    ],
    pills: ["NO PREP","ONE VISIT","SAME WEEK","NO JUDGMENT","SERVING ALL OF METRO ATLANTA"],
    riskReversal:
      "You'll leave actually seeing what's happening, your scalp at 200x, the systems behind it, with your report the next day. If you don't, the $99 is on us.",
    riskReversalShort: "You'll see it, or the $99 is on us.",
  },
  cta: {
    primary: "Book My $99 Hair & Body Discovery",
    primaryStart: "Start My $99 Hair & Body Discovery",
    proof: "See What Progress Looks Like",
    sampleReport: "Preview A Sample Report",
    informational: "Find Out What's Actually Happening",
    stickyMobile: "Book My $99 Discovery",
  },
  nap: {
    name: "Nina Ross Hair Therapy",
    street: "8735 Dunwoody Place, Suite 290",
    city: "Sandy Springs",
    state: "GA",
    zip: "30350",
    phone: "(678) 561-4522",
    phoneHref: "tel:+16785614522",
    hours: "Monday to Saturday, 10:00 AM to 3:30 PM",
    building: "Inside the Nina Ross Functional Medicine building",
    geo: { lat: 33.9321, lng: -84.3348 },
    areaServed: ["Sandy Springs","Atlanta","Dunwoody","Brookhaven",
                 "Roswell","Marietta","Decatur","Alpharetta"],
  },
  credentials: {
    longForm: "Dr. Nina Ross, ND. Double Board Certified Trichologist. PhD in Functional Drugless Medicine. Master Cosmetologist. Founder and Clinical Director.",
    shortForm: "Dr. Nina Ross, ND, Double Board Certified Trichologist",
    reviewerByline: "Clinically reviewed by Dr. Nina Ross, ND",
    teamByline: "Written by Nina Ross Hair Therapy",
    evaluationPerformedBy: "Evaluations performed by certified trichologists",
  },
  claims: {
    yearsOfCare: "10 years of specialized care",   // substantiated. "7+ years" is retired.
    clientsSeen: "2,500+ clients seen",             // confirmed real by the clinic, Oct 2026. the verb is "seen", never "served".
    badges: ["Whole-Body Approach","Expert Led","Science Backed","Real Results"],
    qualitative: ["Board-Certified Trichologists","Trichoscopy-Guided",
                  "Doctor Formulated","Safe For Textured Hair"],
  },
  disclaimers: {
    results: "Results not typical. Individual results will vary.",
    ccca: "Certain grooming practices have been associated with CCCA in some studies, although CCCA is multifactorial and these practices have not been established as the sole cause.",
  },
  host: "https://www.ninaross.co",
} as const;
```

Any component rendering a price, a duration, a credential, a phone number, or a claim imports from here. A hard-coded `$99` found in a component is a bug.
---

# PART 4: SITE ARCHITECTURE AND QUERY OWNERSHIP

## 4.1 Canonical host: www.ninaross.co

GSC shows Google indexing `www.ninaross.co` (1,086 clicks, position 4.2) and `ninaross.co` (378 clicks, position 12.8) as two separate homepages serving the same content. That split dilutes the single strongest asset on the domain.

**Direction matters.** The dominant host is www. The migration-safe move is to keep www and 301 non-www into it. Redirecting the strong host into the weak one adds risk for no ranking benefit during a migration that already changes platform, paths, templates, and architecture.

`www.ninaross.co` is canonical in **redirects, canonicals, sitemap, schema `url`, `llms.txt`, internal links, GBP website field, and every absolute URL in a data file.** No page ever canonicalizes to a non-www URL. Override only for a deliberate branding decision, knowingly accepting an extra migration dimension.

## 4.2 Route map

```
/                                        Homepage
/about                                   Story, team, entity anchor
/trichology                              Main service overview + "what is a trichologist"
/functional-medicine                     Whole-body bridge, hormone and nutrient destination
/concerns                                Browse all conditions
/concerns/[slug]                         18 condition pages
/treatments                              Browse all treatments
/treatments/[slug]                       9 treatment pages
/blog                                    Index
/blog/[segment]                          Single resolver: category hub or post slug
/videos                                  Video library
/contact                                 NAP, map, form
/book                                    The conversion destination
/faq                                     All FAQs by category
/editorial-policy                        E-E-A-T
/medical-review-policy                   E-E-A-T
/privacy-policy                          noindex, follow
/policies                                noindex, follow

Money pages (top level, local intent, no /pages/ prefix):
/hair-loss-treatment-atlanta
/black-trichologist-atlanta              FLAGSHIP
/ccca-treatment-atlanta
/traction-alopecia-treatment-atlanta
/alopecia-areata-doctor-atlanta
/prp-hair-treatment-atlanta
/hair-doctor-atlanta
/hair-restoration-sandy-springs

Supporting hub:
/blog/traction-alopecia-reversibility
```

**Concern slugs (18):** alopecia-areata, anagen-effluvium, ccca, excess-dht, female-hair-loss, folliculitis, hormonal-hair-loss, lichen-planopilaris, lichen-planus, male-pattern-baldness, medication-hair-loss, pcos-hair-loss, postpartum-hair-loss, scalp-bumps, seborrheic-dermatitis, telogen-effluvium, traction-alopecia, trichotillomania.

**Treatment slugs (9):** restorative-therapy, prp-therapy, exosome-therapy, fusion-mesotherapy, scalp-micropigmentation, red-light-therapy, iv-nutrient-therapy, steam-therapy, microneedling.

**Blog category slugs (5):** hair-loss, health-wellness, treatment-methods, scalp-concerns, hair-care.

### Blog routing (resolve the collision deliberately)

Use **one** dynamic resolver at `blog.$segment.tsx`. On load, check the segment against the five known category slugs first. Match renders the category hub. No match treats the segment as a post slug and renders the post. Neither returns 404.

The equivalent alternative is `blog.$category` with `params.parse` restricted to the five known slugs and `blog.$slug` as the route-priority fallback. Pick one explicitly and implement it. Never ship two competing dynamic routes on the same pattern.

## 4.3 The query-ownership map

One intent, one king. Supporting pages link up. Never build a new page for a family that already has a king.

| Intent | King URL | Supporting pages link up from |
|---|---|---|
| black trichologist atlanta / near me / trichologist for black hair / black hair loss specialist atlanta | `/black-trichologist-atlanta` | `/blog/trichologist-for-black-hair`, `/blog/hair-loss-epidemic-among-black-women`, `/concerns/ccca`, `/concerns/traction-alopecia` |
| trichologist near me / what is a trichologist | `/trichology` | `/blog/choosing-a-trichologist-near-me` |
| hair loss treatment atlanta | `/hair-loss-treatment-atlanta` | Homepage, general hair-loss blog set |
| what is CCCA / CCCA symptoms | `/concerns/ccca` | CCCA blog set |
| CCCA treatment / CCCA specialist atlanta | `/ccca-treatment-atlanta` | `/concerns/ccca`, `/black-trichologist-atlanta` |
| traction alopecia treatment atlanta | `/traction-alopecia-treatment-atlanta` | `/concerns/traction-alopecia`, reversibility hub |
| is traction alopecia reversible / too late | `/blog/traction-alopecia-reversibility` | Traction alopecia blog set |
| bumps on scalp / itchy bumps on scalp | `/concerns/scalp-bumps` | `/concerns/folliculitis`, `/concerns/seborrheic-dermatitis` |
| scalp folliculitis / folliculitis scalp | `/concerns/folliculitis` | `/concerns/scalp-bumps` |
| prp hair loss atlanta | `/prp-hair-treatment-atlanta` | `/treatments/prp-therapy` |
| PRP procedure detail | `/treatments/prp-therapy` | Concern pages that list PRP |
| hair doctor atlanta / hair loss doctor near me | `/hair-doctor-atlanta` | `/trichology` |
| alopecia areata doctor / treatment atlanta | `/alopecia-areata-doctor-atlanta` | `/concerns/alopecia-areata` |
| what is alopecia areata / stop it spreading | `/concerns/alopecia-areata` | Areata blog set |
| pcos hair loss | `/concerns/pcos-hair-loss` | `/functional-medicine` |
| which hormone / hair growth hormone | `/concerns/hormonal-hair-loss` | `/blog/hair-growth-hormones`, `/functional-medicine` |
| iron deficiency / anemia hair loss | `/blog/iron-deficiency-and-hair-loss` | `/functional-medicine` |
| female hair loss treatment | `/concerns/female-hair-loss` | Female-pattern blog set |
| male pattern baldness | `/concerns/male-pattern-baldness` | DHT blog set |
| telogen effluvium | `/concerns/telogen-effluvium` | Shedding blog set |
| postpartum hair loss | `/concerns/postpartum-hair-loss` | n/a |
| lichen planopilaris scalp | `/concerns/lichen-planopilaris` | `/concerns/lichen-planus`, `/concerns/ccca` |
| lichen planus (non-scalp-specific) | `/concerns/lichen-planus` | n/a |
| seborrheic dermatitis hair loss | `/concerns/seborrheic-dermatitis` | `/blog/oily-scalp-and-hair-loss` |
| oily scalp thinning hair | `/blog/oily-scalp-and-hair-loss` | `/concerns/seborrheic-dermatitis` |
| hair restoration sandy springs | `/hair-restoration-sandy-springs` | n/a |
| functional medicine atlanta | `/functional-medicine` | Nutrient and hormone blog set |
| trichotillomania | `/concerns/trichotillomania` | n/a |
| medication hair loss | `/concerns/medication-hair-loss` | n/a |
| excess DHT | `/concerns/excess-dht` | `/blog/stop-hair-loss-with-dht-blockers` |
| anagen effluvium | `/concerns/anagen-effluvium` | n/a |
| booking / book appointment | `/book` | Everything |

**Cannibalization check, monthly:** any keyword where two URLs both rank is a violation. Fix by consolidating, differentiating intent, or 301ing the loser into the king.

## 4.4 The internal link graph

**Rule: money pages link down. Supporting pages link up. Every page links to `/book` twice.**

```
/black-trichologist-atlanta  (flagship hub of the wedge)
  ↓ links down to
  /ccca-treatment-atlanta, /traction-alopecia-treatment-atlanta,
  /concerns/ccca, /concerns/traction-alopecia, /trichology
  ↑ links up from
  /blog/trichologist-for-black-hair, /blog/hair-loss-epidemic-among-black-women,
  /concerns/ccca, /concerns/traction-alopecia

/ccca-treatment-atlanta  ↔  /concerns/ccca, /black-trichologist-atlanta,
                            /concerns/lichen-planopilaris

/traction-alopecia-treatment-atlanta  ↔  /concerns/traction-alopecia,
                                          /blog/traction-alopecia-reversibility

/functional-medicine  ↔  /concerns/hormonal-hair-loss, /concerns/pcos-hair-loss,
                          /blog/iron-deficiency-and-hair-loss,
                          /blog/hair-growth-hormones, the nutrient cluster

/concerns/scalp-bumps  ↔  /concerns/folliculitis, /concerns/seborrheic-dermatitis

/trichology  ↔  /hair-doctor-atlanta, /concerns (index), /treatments (index)
```

**Concern to treatment map (`src/data/concern-treatment-map.ts`):**

| Concern | Treatments |
|---|---|
| alopecia-areata | prp-therapy, exosome-therapy, red-light-therapy |
| traction-alopecia | prp-therapy, microneedling, scalp-micropigmentation |
| ccca | prp-therapy, red-light-therapy, restorative-therapy |
| telogen-effluvium | restorative-therapy, iv-nutrient-therapy |
| hormonal-hair-loss | restorative-therapy, iv-nutrient-therapy, red-light-therapy |
| pcos-hair-loss | restorative-therapy, iv-nutrient-therapy |
| female-hair-loss | prp-therapy, microneedling, restorative-therapy |
| male-pattern-baldness | prp-therapy, microneedling, scalp-micropigmentation |
| excess-dht | restorative-therapy, prp-therapy |
| seborrheic-dermatitis | steam-therapy, red-light-therapy |
| folliculitis | steam-therapy, red-light-therapy |
| scalp-bumps | routes to folliculitis and seborrheic-dermatitis concern pages first |
| lichen-planopilaris | red-light-therapy, restorative-therapy |
| lichen-planus | red-light-therapy, restorative-therapy |
| postpartum-hair-loss | restorative-therapy, iv-nutrient-therapy |
| medication-hair-loss | restorative-therapy, iv-nutrient-therapy |
| anagen-effluvium | restorative-therapy, red-light-therapy |
| trichotillomania | restorative-therapy, microneedling |

Every treatment page links back to the concerns that list it. Breadcrumbs on every non-home page with `BreadcrumbList` JSON-LD.

## 4.5 Nav and footer

**Nav:** logo left. Links: Trichology, Treatments, Concerns, About, Blog, Contact. Mobile hamburger. CTA button "Book My $99 Hair & Body Discovery" to `/book`, Champagne fill. Sticky on scroll with subtle shadow. Logo and nav shrink on mobile.

**Footer:** four-column grid. Quick Links, Conditions We Treat, Company, Connect. Full NAP from `trust.ts`. Hours. Socials: Facebook, Instagram, YouTube, all `@ninarossatl`. Copyright. Serving all of Metro Atlanta line.
---

# PART 5: THE PAGE BRIEF LIBRARY

## 5.0 The brief format

Every page on the domain has a brief in this format. Nothing gets built without one.

```
PAGE            the URL
FILTER → OUTCOME  one sentence, written first, always
TYPE            page-type variant from Part 3.3
OWNS            the king intent(s) from Part 4.3
TITLE           written to earn the click, ~55 to 60 characters
META            ~150 to 160 characters, conversion copy
H1              on-page, may differ from title
QUICK ANSWER    the angle, for informational variants (75 to 200 words when written)
SECTIONS        in order, each mapped to a spine stage
INFO GAIN       the specific hard-to-replicate thing on this page (Rule 25)
LINKS DOWN      what this page points to
LINKS UP        what points at this page
SCHEMA          JSON-LD types emitted
STATUS          new / frozen winner / improve / migrate-and-sharpen
```

**Titles and metas below are written and ready to ship.** They follow Rule 26. Adjust only with a reason.

---

## 5.1 Homepage

```
PAGE            /
FILTER → OUTCOME  "Nina Ross" and "hair loss treatment atlanta" are the filters.
                Believing this is the place that can actually fix it is the outcome.
TYPE            Homepage
OWNS            brand, hair loss treatment atlanta (shared with the money king)
STATUS          FROZEN WINNER at migration. 1,086 clicks, position 4.2, consolidated to one host.
                Change URL, template, and design only. No content change for 90 days.
```

**TITLE:** `Nina Ross Hair Therapy | Hair Loss Treatment Atlanta, GA`

**META:** `Certified trichologists restoring every type of hair loss with trichoscopy at 200x and whole-body testing. Sandy Springs, GA. $99 Hair & Body Discovery.`

**H1:** `STRONGER HAIR. STRONGER YOU.` followed immediately by a keyword-bearing subheading containing "hair loss treatment Atlanta."

**SECTIONS**

| # | Section | Stage |
|---|---|---|
| 1 | Hero. H1, subheading "Certified trichologists using advanced diagnostics and functional medicine to restore every type of hair loss." Primary CTA to `/book`, secondary to `/treatments`. Full-width editorial photography | Desire |
| 2 | Trust bar. Whole-Body Approach · Expert Led · Science Backed · Real Results. Clean line icons, Champagne detail, light bottom border | Trust |
| 3 | Dream outcome band. Three positive-framing cards with real photos | Desire |
| 4 | Results. Before / during / after, testimonial grid with condition, treatment, timeframe, results disclaimer | Possibility |
| 5 | Self-recognition strip. Five symptom cards, tap to book | Self-Recognition |
| 6 | Programs. H2 "Specialists in Every Type of Hair Loss." Grid of all 18 concerns. Feature CCCA, traction alopecia, and scalp bumps prominently. "Explore Treatments" link at the bottom | Expertise |
| 7 | Science. H2 "The Whole-Body Approach to Hair Restoration." Three blocks: Advanced Diagnostics (trichoscopy at 200x, hormone panels, mineral analysis, inflammation markers), Root Cause Treatment, Personalized Protocols. Qualitative badges only per Rule 17 | Expertise |
| 8 | The Discovery panel. Light scheme, full offer, Sample Report button | Offer |
| 9 | About. H2 "Founded by a Pioneer in Holistic Trichology." Dr. Nina bio in 3 to 4 sentences, credentials, link to `/about`. Badges: Doctor Formulated · Clinically Informed · Safe For Textured Hair · Privacy Protected | Trust |
| 10 | Areas we serve. Metro Atlanta in natural sentences | Trust / local |
| 11 | CTA strip. Full-width Nina Black. H2 "Ready to Take the First Step?" Warm Bone text, Discovery paragraph, Champagne button, phone. Confident close, no pressure language | Action |

**INFO GAIN:** the whole-body framing itself, stated as a diagnostic sequence rather than a slogan. Name the specific systems checked.
**LINKS DOWN:** all 18 concerns, `/treatments`, `/trichology`, `/functional-medicine`, `/about`, `/book`, all 8 money pages via the conditions grid and areas module.
**SCHEMA:** `Organization` + `LocalBusiness` + `MedicalBusiness` with full NAP, geo 33.9321 / -84.3348, `openingHoursSpecification` Mo-Fr 10:00 to 15:30, `priceRange "$$"`, `medicalSpecialty "Trichology"`, `areaServed` array, `sameAs` socials and GBP. Plus `Person` for Dr. Nina Ross.

---

## 5.2 The eight money pages

All eight use the shared `MoneyPage` component: hero, content sections, proof, self-recognition, expertise, Discovery panel, authority, testimonial, FAQ accordion with schema, areas served, final CTA. All eight run 800+ words of unique locally-relevant content. All eight emit `Service` + `LocalBusiness` + `FAQPage`.

### 5.2.1 `/black-trichologist-atlanta`: THE FLAGSHIP

```
FILTER → OUTCOME  "Black trichologist Atlanta" is the filter. Never having to explain
                her own hair to the person treating it, and getting it back, is the outcome.
TYPE            Money / City, flagship
OWNS            black trichologist atlanta, black trichologist near me,
                trichologist for black hair, black hair loss specialist atlanta
STATUS          IMPROVE. 177 clicks/yr at position 18. The highest-upside page on the domain:
                a page-2 page out-clicking nearly everything else. Freeze content at cutover,
                upgrade after the 30-day stability window. Goal: position 18 to page 1.
```

**TITLE:** `Black Trichologist in Atlanta | You Want Your Hair Back`
**META:** `Textured hair specialists in Metro Atlanta. CCCA, traction alopecia, thinning crowns and edges. See your scalp at 200x. $99 Hair & Body Discovery.`
**H1:** `You Want Your Hair Back. Let's Start There.` (outcome in the gold accent, on the radial dark gradient)

**SECTIONS:** the canonical 12-section order in Part 3.1, exactly as built.

Key implementation notes carried forward from the reference build:
- Hero supporting copy is **one** paragraph naming the three most common triggers (crown, edges, wash-day shedding) then pivoting to the promise. The closing "And we're pretty good at it" is deliberate confidence, allowed under Rule 16.
- `#imagine` cards use the three approved positive-framing lines. Real outcome photo flush-connected to the top of each white card.
- `#results` runs four cases, each with before / during / after: Crown Coverage Returning (14 weeks), Edges Filling Back In (10 weeks), Shedding Slowed and Density Returned (8 weeks, nutrient and hormone support), Stress-Related Loss Reversed (24 weeks, stress load plus scalp inflammation plus nutrient gaps together).
- `#noticing` runs seven symptom cards on dark ink with the raised-hand indicator: *My crown is getting thinner · My edges won't grow back · My part keeps getting wider · I'm shedding everywhere · My scalp stays irritated · I've been told I have CCCA · My hair just doesn't grow anymore.* Each taps to the calendar.
- `#why` carries the trichology-versus-dermatology argument and the keyword. Six cause cards with info tips: lack of vitamins, stress, unhealthy habits, hormone imbalance, medication side effect, autoimmune conditions.
- `#expertise` on wine: full-bleed heritage collage flush to the top with no padding above, three flush-connected image-headed cards, closing "We're Well-Versed In Us" strip with the five-item grid including Men's Hair Line.
- `#evaluation`: 200x macro with the magnification card overlaid on the lower edge of the image, then the headline, then the "If you've been Googling..." paragraph, then the light-scheme Discovery panel.
- Authority, reviews, areas, FAQ, aspirational close on the wine gradient.

**INFO GAIN:** what trichoscopy at 200x actually shows on textured hair specifically, and how the practice distinguishes early CCCA from traction alopecia from telogen effluvium when the visible pattern looks the same. This is the sentence no aggregator can write.

**THE UPGRADE PLAN (executes after the 30-day stability window):**

1. Add a CCCA-specific proof case with real trichoscopy imagery and the defensible causal language from Rule 23.
2. Add a "how we tell these three apart" section with side-by-side trichoscopy description. This is the single strongest information-gain block available to the domain.
3. Expand `#areas` into genuine locality copy naming the neighborhoods clients actually travel from.
4. Add four to five local FAQs written the way she asks them, with `FAQPage` schema.
5. Strengthen internal links down to `/ccca-treatment-atlanta`, `/traction-alopecia-treatment-atlanta`, `/concerns/ccca`, `/concerns/traction-alopecia`.
6. Rewrite the title and meta to the versions above and monitor for 30 days.

**LINKS DOWN:** `/ccca-treatment-atlanta`, `/traction-alopecia-treatment-atlanta`, `/concerns/ccca`, `/concerns/traction-alopecia`, `/trichology`, `/book`.
**LINKS UP FROM:** `/blog/trichologist-for-black-hair`, `/blog/hair-loss-epidemic-among-black-women`, three redirected Black-dermatologist posts, homepage.

---

### 5.2.2 `/hair-loss-treatment-atlanta`

```
FILTER → OUTCOME  "Hair loss treatment Atlanta" is the filter. Finding out what is
                actually causing it, so the treatment finally matches the cause, is the outcome.
TYPE            Money / City
OWNS            hair loss treatment atlanta, hair loss treatment near me
STATUS          NEW top-level URL, receives redirects from /blogs/hair-loss/hair-loss-atlanta
                and /blogs/hair-loss/hair-loss-treatment-near-me
```

**TITLE:** `Hair Loss Treatment in Atlanta: Start By Finding the Cause`
**META:** `Certified trichologists in Sandy Springs treating every type of hair loss. See your scalp at 200x and get a real answer in one visit. $99 Discovery.`
**H1:** `Hair Loss Treatment In Atlanta That Starts With An Answer`

**SECTIONS:** Hero (Desire) → Dream outcome cards (Desire) → Results with during panel (Possibility) → Self-recognition, seven cards, tap to book (Self-Recognition) → "Same Thinning. Different Causes." six-cause section with info tips (Expertise) → The full treatment suite, linking to all 9 treatment pages (Expertise) → Conditions we treat grid, linking to all 18 concerns (Expertise) → Discovery panel (Offer) → Dr. Nina (Trust) → Reviews (Trust) → Areas we serve (Trust) → Local FAQ, 5 questions (Objection) → Aspirational close (Action).

**INFO GAIN:** the internal evaluation sequence. Name the order the practice actually works in: scalp read first, systems second, history third, and why that order changes the answer.
**LINKS DOWN:** all 9 treatments, top 6 concerns, `/trichology`, `/functional-medicine`, `/book`.

---

### 5.2.3 `/ccca-treatment-atlanta`: NEW, wedge flagship

```
FILTER → OUTCOME  "CCCA treatment Atlanta" is the filter. Keeping the follicles that are
                still alive, and knowing honestly which ones are, is the outcome.
TYPE            Money / City, wedge flagship
OWNS            ccca treatment atlanta, ccca specialist atlanta,
                central centrifugal cicatricial alopecia treatment
STATUS          NEW
```

**TITLE:** `CCCA Treatment in Atlanta: Catch It Early, Keep What's There`
**META:** `CCCA specialists in Sandy Springs. Trichoscopy-guided diagnosis shows which follicles are still active. Serving all of Metro Atlanta. $99 Discovery.`
**H1:** `CCCA Treatment In Atlanta, Starting With What's Still There`

**SECTIONS:** Hero (Desire) → "What early CCCA looks like before it looks like anything" (Possibility) → Results, CCCA cases with real trichoscopy imagery (Possibility) → Self-recognition cards in CCCA language: *the center of my crown is going · my part is spreading outward · my scalp feels tender when I part it · I was told it's CCCA and nothing else* (Self-Recognition) → "Why CCCA Affects Black Women Disproportionately," with Rule 23 language verbatim (Expertise) → "How We Diagnose CCCA: Trichoscopy Versus Biopsy" (Expertise, information gain) → Discovery panel (Offer) → Dr. Nina (Trust) → Reviews (Trust) → Areas (Trust) → FAQ, 5 local and clinical (Objection) → Aspirational close (Action).

**HONESTY REQUIREMENT:** this page states plainly that scarred follicles do not regrow and that the goal of early intervention is protecting what is still active. That sentence is the reason this page converts. Rule 20.

**INFO GAIN:** how trichoscopy at 200x distinguishes early CCCA from traction alopecia and from lichen planopilaris before scarring is visible to the eye, described specifically enough that no aggregator could have written it.
**LINKS DOWN:** `/concerns/ccca`, `/black-trichologist-atlanta`, `/concerns/lichen-planopilaris`, `/treatments/prp-therapy`, `/treatments/red-light-therapy`, `/book`.
**LINKS UP FROM:** `/concerns/ccca`, `/black-trichologist-atlanta`, homepage conditions grid.

---

### 5.2.4 `/traction-alopecia-treatment-atlanta`

```
FILTER → OUTCOME  "Traction alopecia treatment Atlanta" is the filter. Hearing the
                truth about whether her edges are coming back is the outcome.
TYPE            Money / City
OWNS            traction alopecia treatment atlanta, traction alopecia treatment near me
STATUS          NEW top-level URL, replaces /pages/best-traction-alopecia-treatment-in-atlanta
```

**TITLE:** `Traction Alopecia Treatment Atlanta: Is It Too Late?`
**META:** `Early traction alopecia is often reversible. Trichoscopy at 200x tells us which stage you're in, honestly. Sandy Springs, GA. $99 Hair & Body Discovery.`
**H1:** `Traction Alopecia Treatment In Atlanta, And An Honest Answer First`

**SECTIONS:** Hero leading with the reversibility question (Desire) → The staged honest answer: early is often reversible, advanced with scarring is manageable and may not fully regrow, trichoscopy tells us which (Possibility) → Results, edges cases with during panels (Possibility) → Self-recognition cards: *my edges won't grow back · my hairline moved · it hurts when I take my braids out · there's a thin fuzzy line where my edges used to be* (Self-Recognition) → "What tension actually does to a follicle" (Expertise) → Discovery panel (Offer) → Dr. Nina (Trust) → Reviews (Trust) → Areas (Trust) → FAQ (Objection) → Aspirational close (Action).

**BLAME RULE:** protective styling is discussed without blame. Rule 12 and Rule 23 posture. She styled her hair the way she was taught. The page reframes the category, never the effort.

**INFO GAIN:** the practice's own staging framework for traction alopecia reversibility, described by what is visible at 200x at each stage.
**LINKS DOWN:** `/blog/traction-alopecia-reversibility`, `/concerns/traction-alopecia`, `/black-trichologist-atlanta`, `/treatments/prp-therapy`, `/treatments/microneedling`, `/book`.

---

### 5.2.5 `/alopecia-areata-doctor-atlanta`

```
FILTER → OUTCOME  "Alopecia areata doctor Atlanta" is the filter. Understanding why her
                immune system is doing this, and what can be done about it, is the outcome.
TYPE            Money / City
OWNS            alopecia areata doctor atlanta, alopecia areata treatment atlanta,
                alopecia areata doctor near me
STATUS          NEW top-level URL, replaces /pages/best-alopecia-areata-doctor-in-atlanta
```

**TITLE:** `Alopecia Areata Specialist in Atlanta, GA | Nina Ross`
**META:** `Whole-body alopecia areata care in Sandy Springs. We look at the immune and internal drivers behind the patches. $99 Hair & Body Discovery.`
**H1:** `Alopecia Areata Care In Atlanta That Looks At The Whole System`

**SECTIONS:** Hero (Desire) → Dream outcome cards (Desire) → Results (Possibility) → Self-recognition: *a round patch appeared overnight · it's spreading · it came back after it grew in · my eyebrows are thinning too* (Self-Recognition) → "Autoimmune means the answer is rarely only on the scalp," the functional-medicine angle (Expertise) → Discovery panel (Offer) → Trust block → Areas → FAQ → Close.

**INFO GAIN:** what the practice looks for systemically alongside the patch, stated as a checklist of systems, and what a 200x read shows in an active patch versus a resolving one.
**LINKS DOWN:** `/concerns/alopecia-areata`, `/functional-medicine`, `/treatments/prp-therapy`, `/treatments/exosome-therapy`, `/treatments/red-light-therapy`, `/book`.

---

### 5.2.6 `/prp-hair-treatment-atlanta`

```
FILTER → OUTCOME  "PRP Atlanta" is the filter. Knowing whether PRP will work on her
                specifically, before she pays for it, is the outcome.
TYPE            Money / City
OWNS            prp hair treatment atlanta, prp for hair loss atlanta
STATUS          NEW top-level URL, replaces /pages/best-prp-hair-loss-treatment-in-atlanta
```

**TITLE:** `PRP Hair Treatment in Atlanta: Will It Work for You?`
**META:** `PRP with microneedling in Sandy Springs, GA. We check whether your follicles can respond before you spend a dollar on it. $99 Hair & Body Discovery.`
**H1:** `PRP Hair Treatment In Atlanta, After We Know It's The Right Call`

**SECTIONS:** Hero (Desire) → "PRP works on follicles that are still alive. Here's how we check yours first." (Possibility, and the honest hook that separates this page from every clinic selling PRP) → Results (Possibility) → What PRP actually does, benefit before mechanism (Expertise) → PRP plus microneedling protocol (Expertise) → Discovery panel (Offer) → Trust → Areas → FAQ → Close.

**INFO GAIN:** the practice's own screening criteria for PRP candidacy, described by what disqualifies a candidate. Declining to sell is the proof device.
**LINKS DOWN:** `/treatments/prp-therapy`, `/treatments/microneedling`, `/concerns/female-hair-loss`, `/concerns/male-pattern-baldness`, `/book`.

---

### 5.2.7 `/hair-doctor-atlanta`

```
FILTER → OUTCOME  "Hair doctor Atlanta" is the filter. Knowing which kind of professional
                to see, and stopping the loop of appointments that go nowhere, is the outcome.
TYPE            Money / City
OWNS            hair doctor atlanta, hair loss doctor near me
STATUS          REBUILD FROM WEAK. Existing page sits at position 33. High headroom.
                Receives /blogs/hair-loss/how-to-choose-the-best-atlanta-hair-doctor...
```

**TITLE:** `Hair Doctor in Atlanta: Who to See for Hair Loss`
**META:** `A trichologist reads the strand, the follicle, and the systems behind them. Sandy Springs, GA, serving all of Metro Atlanta. $99 Hair & Body Discovery.`
**H1:** `Looking For A Hair Doctor In Atlanta? Here's Who Actually Reads Your Hair`

**SECTIONS:** Hero (Desire) → "You weren't treating it wrong. You were treating the wrong layer." Rule 12 in full (Self-Recognition) → Trichology versus dermatology, the long version, keyword-bearing (Expertise) → What happens in the room (Expertise) → Results (Possibility) → Discovery panel (Offer) → Dr. Nina, credentials in full since this page is explicitly about credentials (Trust) → Reviews → Areas → FAQ → Close.

**CREDENTIAL CARE:** this page attracts people searching for a physician. Rule 1 matters most here. State ND plainly, state what a trichologist does, and state that everything is handled in house. Never imply MD or dermatologist, and never disparage dermatology as a field.

**INFO GAIN:** what a 200x read reveals that a naked-eye scalp exam cannot, described concretely.
**LINKS DOWN:** `/trichology`, `/concerns` index, `/treatments` index, `/functional-medicine`, `/book`.

---

### 5.2.8 `/hair-restoration-sandy-springs`

```
FILTER → OUTCOME  "Hair restoration Sandy Springs" is the filter. Finding real care close
                enough to actually keep the appointments is the outcome.
TYPE            Money / City, location-specific
OWNS            hair restoration sandy springs, hair loss treatment sandy springs
STATUS          NEW
```

**TITLE:** `Hair Restoration in Sandy Springs, GA | Nina Ross`
**META:** `Hair restoration on Dunwoody Place in Sandy Springs. Trichoscopy at 200x, whole-body testing, and your report the next day. $99 Hair & Body Discovery.`
**H1:** `Hair Restoration In Sandy Springs, On Dunwoody Place`

**SECTIONS:** Hero (Desire) → The clinic itself: the building, the room, parking, what walking in is like (Possibility, and the genuine local signal) → Results (Possibility) → Self-recognition (Self-Recognition) → Treatments offered here (Expertise) → Discovery panel (Offer) → Trust → Genuine locality section naming real Sandy Springs and north-metro context, never a keyword list (Trust / local) → FAQ, including parking, timing, and travel from surrounding areas (Objection) → Close.

**INFO GAIN:** the physical clinic described honestly. It sits inside the Nina Ross Functional Medicine building, which is why whole-body testing happens in the same visit. That building fact is the local differentiator and it is real.
**LINKS DOWN:** `/contact`, `/treatments` index, `/functional-medicine`, `/book`.

---

### 5.2.9 The city-page expansion rule (future)

Additional city pages (Marietta, Decatur, Roswell, Alpharetta, Brookhaven, Dunwoody) are built **only** when there is real locality substance to write: a genuine reason clients travel from there, a real drive-time or landmark reference, or real client density. A city page built from a find-and-replace of the Sandy Springs page is doorway content and it will be treated as such. Until there is substance, those cities live inside the "Areas We Serve" module on the existing money pages.
---

## 5.3 The eighteen concern pages

### Shared template (applies to all 18 unless a brief overrides)

**Route:** `/concerns/[slug]` via `concerns.$slug.tsx`. 404 on unmatched slug.

**Section order:**

| # | Section | Stage |
|---|---|---|
| 1 | Hero. H1, breadcrumbs Home > Conditions > {Condition}, byline and "Clinically reviewed by Dr. Nina Ross, ND" where true | Desire |
| 2 | **Quick Answer box.** 75 to 200 words, complete, AI-citable. The passage AI engines will quote | Desire |
| 3 | Symptoms. Bulleted from data, written in her words alongside the clinical term | Self-Recognition |
| 4 | What causes it | Expertise |
| 5 | **Information-gain block.** What trichoscopy at 200x shows for this condition, or an observed clinical pattern. Rule 25. Non-negotiable | Expertise |
| 6 | How we treat it. Links to the mapped treatment pages | Expertise |
| 7 | The Discovery panel, light scheme | Offer |
| 8 | Cultural competency, adapted. Rule R6 | Trust |
| 9 | Related conditions | Trust |
| 10 | FAQ accordion, emits `FAQPage` | Objection |
| 11 | References. PubMed citations, verified PMIDs | Trust |
| 12 | CTA. "Find Out What's Actually Happening," booking link plus phone | Action |

**Surface:** Warm Bone hero. Byline at top for E-E-A-T. Wine band on section 8.
**Schema:** `MedicalCondition` (name, description, `possibleTreatment` linked to treatment pages, `signOrSymptom[]`) + `MedicalWebPage` + `FAQPage` + `BreadcrumbList`, with `author` and `reviewedBy`.
**Data:** `src/data/concerns.ts`. Fields: slug, title, metaTitle, metaDescription, shortDescription, overview (75 to 200 words), symptoms[], causes[], treatmentApproach (2 paragraphs), relatedTreatments[], relatedConcerns[], faq[], keywords[].
**Length rule:** each overview answers the question in the shortest text that does it well. Do not pad or truncate to hit a number.

---

### `/concerns/ccca`: FLAGSHIP VARIANT

```
FILTER → OUTCOME  "What is CCCA" is the filter. Finding out whether the crown she lost
                is coming back, and how much of it, is the outcome.
OWNS            what is ccca, ccca alopecia, ccca symptoms, ccca hair loss
STATUS          NEW at depth. Receives 301s from two old CCCA posts.
```
**TITLE:** `CCCA: Early Signs, Real Causes, and What Can Be Saved`
**META:** `Central centrifugal cicatricial alopecia starts at the crown and spreads outward. Catching it early is what protects the follicles you still have.`
**H1:** `CCCA: Causes, Symptoms, and Treatment`

**QUICK ANSWER ANGLE:** define CCCA plainly, say it starts centrally at the crown and spreads outward, say it is a scarring alopecia and what that means for regrowth, and say early identification is what determines the outcome. Honest, complete, quotable.

**FLAGSHIP ADDITIONS (beyond the shared template):**
- Expanded overview, longer than a standard concern page.
- **"Why CCCA Disproportionately Affects Black Women"** section.
- **"How We Diagnose CCCA: Trichoscopy Versus Biopsy"** section. This is the information-gain block and it is the strongest one on the domain.
- Real trichoscopy imagery, with `ImageObject` schema.
- Prominent links to `/ccca-treatment-atlanta` and `/black-trichologist-atlanta`.

**CAUSAL LANGUAGE, MANDATORY, VERBATIM (Rule 23):**
> "Certain grooming practices have been associated with CCCA in some studies, although CCCA is multifactorial and these practices have not been established as the sole cause."

Relaxers, heat, and tension are never phrased as proven causes. This is better science and it avoids implying blame toward the women this page serves.

**INFO GAIN:** the trichoscopic findings that separate early CCCA from traction alopecia and lichen planopilaris before scarring is visible to the naked eye.
**LINKS:** down to `/ccca-treatment-atlanta`, `/concerns/lichen-planopilaris`, `/treatments/prp-therapy`, `/treatments/red-light-therapy`, `/treatments/restorative-therapy`. Up to `/black-trichologist-atlanta`.
**CITATION:** CCCA in African American women, PMID 29222097.

---

### `/concerns/scalp-bumps`: SYMPTOM-ENTRY VARIANT, NEW (OPP 1)

```
FILTER → OUTCOME  "Bumps on my scalp" is the filter. Finding out whether this is going
                to cost her hair is the outcome.
OWNS            bumps on scalp, small bumps on scalp, itchy bumps on scalp,
                bumps on scalp under hair, bumps on hairline, hair bump on scalp
STATUS          NEW. Additive, no redirect. Built to capture the largest impression pool
                on the domain, which currently dead-ends on the folliculitis page.
```
**TITLE:** `Bumps on the Scalp: Causes, When to Worry, Treatment`
**META:** `Small, itchy, or painful bumps on the scalp have several different causes. Here's how to tell them apart, and which ones actually threaten your hair.`
**H1:** `Bumps On Your Scalp: What They Are And When They Matter`

**QUICK ANSWER ANGLE:** answer "why do I have bumps on my scalp" directly and immediately, in plain language, before any triage. This is a symptom, not a diagnosis, and the answer names the realistic range.

**SYMPTOM-ENTRY ADDITIONS:**
- After the Quick Answer, a **"Common Causes of Scalp Bumps" triage grid**: folliculitis, seborrheic dermatitis, acne keloidalis nuchae, ingrown hairs, cysts. Each with a one-line description and a link to the relevant concern page.
- A **"When Scalp Bumps Signal Hair Loss"** section. This is the information-gain block: what trichoscopy reveals about whether a given bump pattern is threatening the follicle.
- Strong links to `/concerns/folliculitis` and `/book`.

**WHY THIS PAGE EXISTS:** the folliculitis page pulls 72,146 impressions per year across 2,877 keywords and ranks position 1.7 to 12.8 for a symptom-first cluster, at 0.15% CTR. That is a national informational giant with a scalp-symptom intent distinct from the clinical term "folliculitis." This page owns the symptom. The folliculitis page keeps the clinical term. One intent, one king, per Rule 27.
**LINKS:** `/concerns/folliculitis`, `/concerns/seborrheic-dermatitis`, `/book`.

---

### `/concerns/folliculitis`: FROZEN WINNER

```
FILTER → OUTCOME  "Scalp folliculitis" is the filter. Getting the bumps to stop
                without losing hair over them is the outcome.
OWNS            scalp folliculitis, folliculitis scalp, folliculitis treatment
STATUS          FROZEN WINNER. 106 clicks, 72,146 impressions, position 13.1.
                Receives 301 from /blogs/hair-loss/what-is-folliculitis.
```
**TITLE (deploy at day 30, see the freeze exception below):** `Scalp Folliculitis: Why Those Bumps Hurt and What Clears Them`
**META:** `Inflamed follicles cause tender, pimple-like bumps on the scalp. What causes them, when they threaten hair, and how we treat them. Atlanta trichologists.`
**H1:** `Scalp Folliculitis: Causes, Symptoms, and Treatment`

**THE FREEZE EXCEPTION, ruled here once for the whole domain:** body content on a frozen winner does not change for 90 days. Title and meta are the single exception, and they change at **day 30**, after the migration stability window confirms the URL held its position. The reason is that the entire opportunity on this page is a CTR problem at a strong position, and holding a known-bad title for 90 days costs more than the small risk of testing it. Test one winner's title at a time and monitor for 30 days before touching the next.

**INFO GAIN:** how the practice distinguishes bacterial folliculitis from fungal folliculitis from acne keloidalis at 200x, and what each looks like on textured hair.
**LINKS:** `/concerns/scalp-bumps`, `/concerns/seborrheic-dermatitis`, `/treatments/steam-therapy`, `/treatments/red-light-therapy`.

---

### `/concerns/hormonal-hair-loss`: CTR-CAPTURE VARIANT (OPP 5)

```
FILTER → OUTCOME  "Which hormone is responsible for hair growth" is the filter.
                Finding out which of hers is off, and whether fixing it brings hair back,
                is the outcome.
OWNS            which hormone / hair growth hormone, hormonal hair loss
STATUS          MIGRATE AND SHARPEN. Receives 301 from /blogs/hair-loss/hormonal-imbalance.
                The cluster earns 4,415 + 1,713 impressions at positions 8 and 11 with
                effectively zero clicks. This is a title and intent-match problem.
```
**TITLE:** `Which Hormone Controls Hair Growth? A Clear Answer`
**META:** `Estrogen, thyroid, DHT, and cortisol each move hair growth in a different direction. Here's which one is likely driving your shedding, and how we test it.`
**H1:** `Which Hormones Control Hair Growth, And What Happens When They Shift`

**QUICK ANSWER ANGLE:** answer the literal question first, naming the hormones and what each one does to the growth cycle. Do not open with a definition of hormonal hair loss. She asked which hormone. Answer that in sentence one.

**INFO GAIN:** which hormone panels the practice actually runs and in what order, and what a hormonally driven pattern looks like at 200x compared to a nutrient-driven one.
**LINKS:** `/functional-medicine` (prominent, first viewport), `/concerns/pcos-hair-loss`, `/concerns/excess-dht`, `/blog/hair-growth-hormones`, `/treatments/restorative-therapy`.
**CITATION:** PCOS and hair loss, PMID 31608498.

---

### `/concerns/traction-alopecia`: REVERSIBILITY-FORWARD VARIANT

```
FILTER → OUTCOME  "Traction alopecia" is the filter. Hearing honestly whether her
                edges are coming back is the outcome.
OWNS            traction alopecia (informational), traction alopecia symptoms
STATUS          MIGRATE. Receives 301 from /blogs/hair-loss/traction-alopecia-reversal.
```
**TITLE:** `Traction Alopecia: Can It Be Reversed? Here's How We Tell`
**META:** `Early traction alopecia is often reversible. Advanced traction alopecia is manageable. Trichoscopy at 200x is how we tell which one you have.`
**H1:** `Traction Alopecia: Causes, Symptoms, and Whether It Reverses`

**QUICK ANSWER ANGLE:** the overview must directly answer reversibility, because that is the highest-intent query in the cluster. Staged and honest: early is often reversible, advanced with follicular scarring is manageable and may not fully regrow, and trichoscopy is how the difference is determined.
**INFO GAIN:** the practice's staging framework, described by what is visible at 200x at each stage.
**LINKS:** up to `/traction-alopecia-treatment-atlanta`, across to `/blog/traction-alopecia-reversibility`, `/concerns/ccca`, `/black-trichologist-atlanta`.
**CITATION:** traction alopecia prevalence, PMID 30312484.
**BLAME RULE:** Rule 12 and Rule 23 posture. Protective styling is discussed without blame.

---

### `/concerns/lichen-planopilaris`: NEW (OPP 6)

```
FILTER → OUTCOME  "Lichen planopilaris scalp" is the filter. Finding out whether the
                burning along her part means permanent loss is the outcome.
OWNS            lichen planopilaris scalp, lichen planopilaris treatment
STATUS          NEW. 2,153 impressions at position 14 currently buried inside a generic
                lichen planus post.
```
**TITLE:** `Lichen Planopilaris on the Scalp: Signs and Treatment`
**META:** `A scarring alopecia that burns along the hairline and part. How it differs from CCCA at 200x, and why early treatment protects what's still there.`
**H1:** `Lichen Planopilaris: Scalp Signs, Causes, and Treatment`

**INFO GAIN:** the trichoscopic differentiation between lichen planopilaris and CCCA. Both are scarring alopecias and telling them apart early is genuine clinical information gain that no aggregator can produce.
**LINKS:** `/concerns/ccca` (prominent, both scarring), `/concerns/lichen-planus`, `/treatments/red-light-therapy`, `/treatments/restorative-therapy`.

---

### The remaining twelve concern pages

All follow the shared template. Titles and metas below are ready to ship.

**`/concerns/alopecia-areata`**
`FILTER → OUTCOME` "Alopecia areata" is the filter. Understanding why her immune system did this, and whether it stops, is the outcome.
**TITLE:** `Alopecia Areata: Why Patches Appear and What Stops Them`
**META:** `Round patches of sudden loss are an immune response. What triggers it, what makes it spread, and what we check beyond the scalp. Atlanta trichologists.`
**INFO GAIN:** what an active patch looks like at 200x compared to one that is resolving. Exclamation-mark hairs and regrowth signals described specifically.
**LINKS:** up to `/alopecia-areata-doctor-atlanta`. Across to `/functional-medicine`, `/treatments/prp-therapy`, `/treatments/exosome-therapy`, `/treatments/red-light-therapy`. **CITATION:** PMID 32956487.
**NOTE:** owns the "how to stop alopecia areata from spreading" intent, which sits at position 8 with 0.03% CTR. The consolidated blog post links up to this page.

**`/concerns/telogen-effluvium`**
`FILTER → OUTCOME` "Telogen effluvium" is the filter. Knowing when the shedding stops is the outcome.
**TITLE:** `Telogen Effluvium: Why You're Shedding, and When It Stops`
**META:** `Sudden diffuse shedding two to three months after a trigger. How to identify your trigger, and what recovery usually looks like month by month.`
**INFO GAIN:** the practice's observed pattern on trigger-to-shed timing, and what a recovering scalp shows at 200x. **CITATION:** PMID 33278891.
**LINKS:** `/treatments/restorative-therapy`, `/treatments/iv-nutrient-therapy`, `/functional-medicine`.

**`/concerns/female-hair-loss`**
`FILTER → OUTCOME` "Female hair loss" is the filter. A part that stops widening is the outcome.
**TITLE:** `Female Hair Loss: Why It's Thinning and What Reverses It`
**META:** `Widening parts, less volume, more scalp showing in photos. The most common causes in women, and how we find yours in a single visit. Atlanta.`
**INFO GAIN:** how the practice separates androgenetic thinning from telogen effluvium from nutrient-driven thinning when the visible pattern is identical.
**LINKS:** `/concerns/hormonal-hair-loss`, `/concerns/pcos-hair-loss`, `/treatments/prp-therapy`, `/treatments/microneedling`, `/hair-loss-treatment-atlanta`.

**`/concerns/male-pattern-baldness`**
`FILTER → OUTCOME` "Male pattern baldness" is the filter. Knowing how fast it is moving and what still works at his stage is the outcome.
**TITLE:** `Male Pattern Baldness: How Fast, and What Slows It`
**META:** `Receding hairline, thinning crown, family pattern. What DHT is doing, how we measure where you are, and which options still work at your stage.`
**INFO GAIN:** miniaturization measured at 200x as a staging tool, described by what the practice looks for. **CITATION:** DHT in AGA, PMID 32003879.
**LINKS:** `/concerns/excess-dht`, `/treatments/prp-therapy`, `/treatments/scalp-micropigmentation`.
**NOTE:** carries the Men's Hair Line audience. Cultural competency block adapts to receding hairlines, thinning crowns, and family patterns in Black men.

**`/concerns/pcos-hair-loss`**
`FILTER → OUTCOME` "PCOS hair loss" is the filter. Getting the thinning on top to stop while the rest is managed is the outcome.
**TITLE:** `PCOS Hair Loss: Why It Thins on Top and Grows Elsewhere`
**META:** `PCOS raises androgens, which thins the crown while coarsening hair elsewhere. What we test, and what changes when the driver is addressed.`
**INFO GAIN:** the panel order the practice runs for suspected PCOS-driven thinning. **CITATION:** PMID 31608498.
**LINKS:** `/concerns/hormonal-hair-loss`, `/functional-medicine`, `/treatments/restorative-therapy`.

**`/concerns/postpartum-hair-loss`**
`FILTER → OUTCOME` "Postpartum hair loss" is the filter. Knowing this ends, and when, is the outcome.
**TITLE:** `Postpartum Hair Loss: When It Stops and What Helps`
**META:** `Heavy shedding months after birth is usually telogen effluvium. When it typically resolves, and when the shedding means something else is going on.`
**INFO GAIN:** what the practice sees when postpartum shedding is masking a second driver such as iron or thyroid.
**LINKS:** `/concerns/telogen-effluvium`, `/blog/iron-deficiency-and-hair-loss`, `/treatments/iv-nutrient-therapy`.

**`/concerns/seborrheic-dermatitis`**
`FILTER → OUTCOME` "Seborrheic dermatitis" is the filter. A calm scalp that stops shedding is the outcome.
**TITLE:** `Seborrheic Dermatitis and Hair Loss: The Real Link`
**META:** `Flaking, oiliness, and an irritated scalp can push hair into shedding. What causes it, and how we calm the scalp so growth restarts.`
**INFO GAIN:** what an inflamed follicular opening looks like at 200x and how the practice tracks resolution visually.
**LINKS:** `/concerns/scalp-bumps`, `/blog/oily-scalp-and-hair-loss`, `/treatments/steam-therapy`, `/treatments/red-light-therapy`.

**`/concerns/excess-dht`**
`FILTER → OUTCOME` "Excess DHT" is the filter. Knowing whether DHT is actually her driver, before treating for it, is the outcome.
**TITLE:** `Excess DHT and Hair Loss: How to Tell If It's Yours`
**META:** `DHT shrinks follicles gradually, and plenty of hair loss has nothing to do with it. How we check, and what changes when DHT is the real driver.`
**INFO GAIN:** miniaturization patterns at 200x that indicate a DHT driver versus a diffuse systemic one. **CITATION:** PMID 32003879.
**LINKS:** `/concerns/male-pattern-baldness`, `/concerns/hormonal-hair-loss`, `/blog/stop-hair-loss-with-dht-blockers`.

**`/concerns/lichen-planus`**
`FILTER → OUTCOME` "Lichen planus" is the filter. Knowing whether it will reach her scalp is the outcome.
**TITLE:** `Lichen Planus: What It Is and How It Affects Hair`
**META:** `An inflammatory condition that can reach the scalp. What it looks like, how it relates to lichen planopilaris, and when hair is genuinely at risk.`
**INFO GAIN:** the scalp presentation and when the practice escalates to the lichen planopilaris workup.
**LINKS:** `/concerns/lichen-planopilaris` (prominent), `/concerns/ccca`.

**`/concerns/medication-hair-loss`**
`FILTER → OUTCOME` "Medication hair loss" is the filter. Knowing whether her prescription is the cause, and what happens next, is the outcome.
**TITLE:** `Medication and Hair Loss: Which Ones, and What to Do`
**META:** `Some medications shift hair into shedding within weeks or months. How to tell if yours is the cause, and what recovery usually looks like.`
**INFO GAIN:** the practice's timeline framework for correlating a medication start date to a shed onset.
**LINKS:** `/concerns/telogen-effluvium`, `/functional-medicine`, `/treatments/restorative-therapy`.
**CARE:** never advise stopping or changing a prescription. State plainly that medication decisions stay with her prescriber, and that the practice's role is identifying the pattern.

**`/concerns/anagen-effluvium`**
`FILTER → OUTCOME` "Anagen effluvium" is the filter. Knowing what regrowth looks like afterward is the outcome.
**TITLE:** `Anagen Effluvium: Sudden Hair Loss During Treatment`
**META:** `Rapid shedding that starts within days or weeks, usually after chemotherapy or a toxic exposure. What to expect, and what regrowth usually looks like.`
**INFO GAIN:** what the practice observes about regrowth texture and timing, and how scalp support is sequenced.
**LINKS:** `/treatments/red-light-therapy`, `/treatments/restorative-therapy`.
**TONE:** the most careful page on the domain. She may be in active treatment for something serious. Warm, brief, zero sales pressure, and the Discovery panel sits lower on this page than on any other.

**`/concerns/trichotillomania`**
`FILTER → OUTCOME` "Trichotillomania" is the filter. Knowing the follicles can still recover is the outcome.
**TITLE:** `Trichotillomania: Hair Pulling, Regrowth, and Support`
**META:** `Repeated pulling damages follicles over time. What regrowth looks like when pulling stops, and how we support the scalp in the meantime.`
**INFO GAIN:** what repeated trauma looks like at 200x and how the practice assesses whether follicles remain viable.
**LINKS:** `/treatments/restorative-therapy`, `/treatments/microneedling`.
**TONE:** no judgment language anywhere, and no behavioral advice. The practice treats the scalp. Say that plainly and warmly.

---

### `/concerns` (index)

**TITLE:** `Hair Loss Conditions We Treat | Nina Ross Hair Therapy`
**META:** `Eighteen conditions, from CCCA and traction alopecia to telogen effluvium and scalp folliculitis. Find yours, then find out what's actually driving it.`
**H1:** `Hair Loss Conditions We Specialize In`

Grid of all 18, grouped. A concern appears under one group only.

| Group | Concerns |
|---|---|
| Scarring | ccca, lichen-planopilaris |
| Autoimmune | alopecia-areata, lichen-planus |
| Hormonal | hormonal-hair-loss, pcos-hair-loss, excess-dht, female-hair-loss, male-pattern-baldness, postpartum-hair-loss |
| Inflammatory | folliculitis, seborrheic-dermatitis, scalp-bumps |
| Traumatic | traction-alopecia, trichotillomania, anagen-effluvium |
| Other | telogen-effluvium, medication-hair-loss |

Breadcrumbs Home > Conditions. `CollectionPage` + `BreadcrumbList`. Discovery CTA at the bottom.
---

## 5.4 The nine treatment pages

### Shared template

**Route:** `/treatments/[slug]` via `treatments.$slug.tsx`. 404 on unmatched slug.

**Section order:** Hero, H1 "{Treatment} for Hair Loss" plus breadcrumbs (Desire) → Quick Answer, AI-citable (Desire) → What it does for you, benefit before mechanism, Rule 9 (Desire) → How it works (Expertise) → What to expect, numbered steps (Expertise) → Results and realistic timeline (Possibility) → Ideal for, linking to the concerns that map to it (Expertise) → Safe for textured hair, and what that changes about how we do it (Trust, adapted cultural competency per R6) → Discovery panel (Offer) → FAQ accordion (Objection) → References (Trust) → CTA (Action).

**Every treatment page reinforces:** certified trichologists perform all hands-on treatments, Dr. Nina Ross, ND oversees protocols as Clinical Director.
**Schema:** `MedicalTherapy` (name, description, procedureType, howPerformed, preparation, followup) + `FAQPage` + `BreadcrumbList`.
**Surface:** Warm Bone hero, authority mid-page.
**Data:** `src/data/treatments.ts`. Fields: slug, title, metaTitle, metaDescription, shortDescription, overview, howItWorks, whatToExpect, results, idealFor[], relatedConcerns[], faq[], keywords[].

**The rule that keeps treatment pages honest:** every one of them says who it is not right for. Rule 20. A treatment page that only sells reads as a brochure. A treatment page that screens reads as a clinic.

---

**`/treatments/restorative-therapy`** (the flagship program)
`FILTER → OUTCOME` "Hair regrowth program" is the filter. A plan that actually adjusts as she progresses is the outcome.
**TITLE:** `Restorative Therapy: The 10-Visit Hair Regrowth Program`
**META:** `Growth factors, microneedling, red and blue lasers, LED infrared, and targeted supplementation across ten visits, built around what your scalp showed us.`
**IDEAL FOR:** telogen-effluvium, hormonal-hair-loss, pcos-hair-loss, female-hair-loss, ccca, postpartum-hair-loss, medication-hair-loss, anagen-effluvium, trichotillomania.
**INFO GAIN:** the sequencing logic. Why the ten visits run in this order and what gets adjusted at which visit based on what the scalp shows.

**`/treatments/prp-therapy`**
`FILTER → OUTCOME` "PRP for hair loss" is the filter. Knowing whether her follicles can still respond is the outcome.
**TITLE:** `PRP for Hair Loss: How It Works and Who It Works For`
**META:** `Platelet-rich plasma wakes up follicles that are still viable. What the sessions feel like, what results look like, and how we screen candidates first.`
**IDEAL FOR:** alopecia-areata, traction-alopecia, ccca, female-hair-loss, male-pattern-baldness, excess-dht. **CITATION:** PRP for AGA, PMID 31021437.
**INFO GAIN:** the screening criteria, stated as what disqualifies a candidate.
**LINKS UP:** `/prp-hair-treatment-atlanta`.

**`/treatments/exosome-therapy`**
`FILTER → OUTCOME` "Exosome therapy hair" is the filter. Knowing whether the newest option is the right one for her is the outcome.
**TITLE:** `Exosome Therapy for Hair: What It Does for Follicles`
**META:** `Exosomes deliver growth signals straight to the follicle. What the treatment involves, who it suits, and how we decide whether it fits your case.`
**IDEAL FOR:** alopecia-areata, female-hair-loss, telogen-effluvium. **CITATION:** PMID 33946614.
**INFO GAIN:** how the practice decides between exosomes and PRP for a given presentation.

**`/treatments/fusion-mesotherapy`**
`FILTER → OUTCOME` "Mesotherapy for hair" is the filter. Getting nutrients where they can actually be used is the outcome.
**TITLE:** `Fusion Mesotherapy for Hair: Nutrients to the Follicle`
**META:** `Micro-injections deliver nutrients directly into the scalp where follicles can use them. What to expect, and which conditions tend to respond.`
**IDEAL FOR:** telogen-effluvium, female-hair-loss, hormonal-hair-loss.
**INFO GAIN:** why delivery route matters when absorption is the limiting factor, tied to what labs actually showed.

**`/treatments/scalp-micropigmentation`**
`FILTER → OUTCOME` "Scalp micropigmentation" is the filter. Looking like she has density again, now, is the outcome.
**TITLE:** `Scalp Micropigmentation: Density Without the Wait`
**META:** `A cosmetic option that restores the look of density immediately. How it works on textured hair, what it can do, and what it cannot do.`
**IDEAL FOR:** male-pattern-baldness, traction-alopecia, ccca (advanced, scarred areas).
**INFO GAIN:** how pigment placement is adapted for textured hair and for scarred scalp, which is where most providers get it wrong.
**HONESTY:** this page states plainly that micropigmentation is cosmetic and does not regrow hair. That sentence belongs above the fold.

**`/treatments/red-light-therapy`**
`FILTER → OUTCOME` "Red light therapy hair growth" is the filter. Knowing whether it is worth her time is the outcome.
**TITLE:** `Red Light Therapy for Hair Growth: Does It Work?`
**META:** `Low-level light stimulates follicle activity and calms inflammation. What the research supports, and where it fits inside a full protocol.`
**IDEAL FOR:** alopecia-areata, ccca, lichen-planopilaris, seborrheic-dermatitis, folliculitis, anagen-effluvium. **CITATION:** PMID 24078483.
**INFO GAIN:** where it helps most in this practice's experience, and where it does very little on its own.

**`/treatments/iv-nutrient-therapy`**
`FILTER → OUTCOME` "IV therapy for hair" is the filter. Fixing a deficiency that oral supplements have failed to move is the outcome.
**TITLE:** `IV Nutrient Therapy for Hair: When Oral Isn't Enough`
**META:** `When absorption is the limiting factor, oral supplements stall. How IV delivery fits into a whole-body hair restoration protocol. Sandy Springs, GA.`
**IDEAL FOR:** telogen-effluvium, postpartum-hair-loss, medication-hair-loss, hormonal-hair-loss, pcos-hair-loss. **CITATION:** iron deficiency, PMID 17951030.
**INFO GAIN:** the lab findings that move the practice from oral to IV, named specifically.
**LINKS:** `/functional-medicine` prominently.

**`/treatments/steam-therapy`**
`FILTER → OUTCOME` "Scalp steam treatment" is the filter. A scalp that stops being irritated is the outcome.
**TITLE:** `Steam Therapy for the Scalp: Calm It, Then Grow It`
**META:** `Steam opens the scalp, lifts buildup, and helps treatments reach the follicle. Where it fits for irritated, flaky, or congested scalps.`
**IDEAL FOR:** seborrheic-dermatitis, folliculitis, scalp-bumps.
**INFO GAIN:** what the practice sees at 200x before and after, and why buildup changes what a treatment can reach.

**`/treatments/microneedling`**
`FILTER → OUTCOME` "Microneedling for hair growth" is the filter. Getting more out of everything else she is doing is the outcome.
**TITLE:** `Microneedling for Hair Growth: Why It Amplifies Results`
**META:** `Controlled micro-injury triggers repair and helps topicals absorb. How we pair it with PRP and growth factors, and what recovery looks like.`
**IDEAL FOR:** traction-alopecia, female-hair-loss, male-pattern-baldness, trichotillomania. **CITATION:** PMID 29028377.
**INFO GAIN:** depth and spacing decisions on textured hair and near scarred margins.

---

### `/treatments` (index)

**TITLE:** `Hair Loss Treatments | Nina Ross Hair Therapy Atlanta`
**META:** `Nine treatments, from PRP and exosomes to red light and IV nutrients. Which one is right depends entirely on what your scalp and your systems show.`
**H1:** `Advanced Hair Restoration Treatments`
Grid of all 9. Breadcrumbs Home > Treatments. `CollectionPage` + `BreadcrumbList`. The framing above the grid does the work: treatment selection follows diagnosis, and diagnosis starts with the Discovery.

---

## 5.5 The blog system

### `/blog` (index)

**TITLE:** `Hair Loss & Scalp Health Blog | Nina Ross Hair Therapy`
**META:** `Straight answers on shedding, scalp conditions, hormones, and nutrients, written by trichologists and clinically reviewed. Atlanta, GA.`
**H1:** `Hair Loss & Scalp Health Insights`
Paginated, newest first, category filter. Each card: title, category, excerpt, read time, and the "Clinically reviewed by Dr. Nina Ross, ND" badge where applicable. Breadcrumbs Home > Blog.

### The five category hubs

Rendered by `blog.$segment.tsx` when the segment matches a known category. Real routes, never query params. Each gets its own H1, intro copy, and meta, plus links to its posts and up to the relevant concern and money pages.

| Route | H1 | Links up to |
|---|---|---|
| `/blog/hair-loss` | Understanding Hair Loss | `/hair-loss-treatment-atlanta`, `/concerns` |
| `/blog/health-wellness` | Nutrition, Hormones, and Hair | `/functional-medicine` |
| `/blog/treatment-methods` | How Hair Loss Treatments Work | `/treatments` |
| `/blog/scalp-concerns` | Scalp Health | `/concerns/scalp-bumps`, `/concerns/folliculitis` |
| `/blog/hair-care` | Caring for Textured Hair | `/black-trichologist-atlanta` |

### Post template

H1 is question-led per Rule 26. Byline plus "Clinically reviewed by Dr. Nina Ross, ND" where true, at the top. Quick Answer box directly under H1. Body. Information-gain block. References. Related concerns and treatments. Discovery CTA. `Article` schema, plus `MedicalWebPage` where clinical, plus `FAQPage` where the post has real FAQs, plus `author` and `reviewedBy`.

---

### `/blog/traction-alopecia-reversibility`: THE SUPPORTING HUB, NEW (OPP 2)

```
FILTER → OUTCOME  "Is it too late" is the filter. Being told the truth today,
                by someone who can actually see, is the outcome.
OWNS            can traction alopecia be reversed, is traction alopecia reversible,
                traction alopecia when is it too late
STATUS          NEW hub. Consolidates 4,609 + 3,103 + 2,137 impressions currently sitting
                at page-1-bottom with near-zero CTR. This is the highest booking-intent
                informational cluster on the domain.
```
**TITLE:** `Can Traction Alopecia Be Reversed? When It's Too Late`
**META:** `Early traction alopecia is often reversible. Advanced traction alopecia is manageable. Here's how trichoscopy at 200x tells the difference, honestly.`
**H1:** `Can Traction Alopecia Be Reversed? When It's Treatable And When It's Too Late`

**QUICK ANSWER ANGLE:** the honest staged answer, in the first 60 words. Early traction alopecia is often reversible. Advanced traction alopecia with follicular scarring is manageable and may not fully regrow. Trichoscopy at 200x is how the difference is determined. That paragraph is the AI-citable block and it is also the reason this page books.

**SECTIONS:** Quick Answer → Early signs, in her words → The point of no return, what follicular scarring actually means → What our Discovery determines → Treatment options by stage → Discovery panel → FAQ → Close.

**INFO GAIN:** the practice's staging framework, written out. What is visible at 200x at each stage and what that means for realistic expectations.
**CTA FRAMING (the strongest on the domain):** "The $99 Discovery tells you if it's reversible." Someone searching "is it too late" is scared and ready to act. Give her a same-week answer and a tiny first step.
**LINKS UP:** `/traction-alopecia-treatment-atlanta` (the king), `/concerns/traction-alopecia`, `/black-trichologist-atlanta`.
**REDIRECTS IN:** `/blogs/hair-loss/traction-alopecia-when-is-it-too-late`. Keep whichever body holds the impressions as the canonical text.

---

### The frozen winner posts

Migrate with content **frozen**. Their new URLs carry the impressions. Add one Discovery CTA and one internal link up to a money or concern page. That is the only change permitted at cutover. Title and meta rewrites follow the day-30 freeze exception ruled in 5.3.

| New URL | Old URL | GSC | Links up to |
|---|---|---|---|
| `/blog/l-lysine-benefits-for-skin` | `/blogs/health-wellness-posts/unlocking-the-secret-to-radiance-l-lysine-benefits-for-skin-before-and-after` | 103 clicks, pos 21.2 | `/functional-medicine` |
| `/blog/magnesium-for-hair-growth` | `/blogs/health-wellness-posts/magnesium-hair-growth` (canonical, holds 50,928 impr) | 53 clicks, pos 10.5 | `/functional-medicine` |
| `/blog/hair-loss-and-potassium-deficiency` | `/blogs/hair-loss/hair-loss-and-potassium-deficiency-what-s-the-relationship` | 53 clicks, pos 7.5 | `/concerns/telogen-effluvium` |
| `/blog/amino-acids-for-hair-regrowth` | `/blogs/health-wellness-posts/7-amazing-amino-acids-for-hair-regrowth-you-should-know` | 51 clicks, pos 12.8 | `/functional-medicine` |
| `/blog/trichologist-for-black-hair` | `/blogs/hair-loss/trichologist-for-black-hair` | 56 clicks, pos 14.8 | `/black-trichologist-atlanta` (wedge, prominent) |
| `/blog/minoxidil-itchy-scalp` | `/blogs/hair-loss/minoxidil-itchy-scalp-know-the-surprising-facts` | 49 clicks, pos 11.6 | `/concerns/seborrheic-dermatitis` |

### The CTR-rewrite set (free clicks, no new content)

Ranking well, converting the click badly. Each gets a SERP inspection first per Rule 26, then a rewritten title and meta, then 30 days of monitoring. Cheapest wins on the domain.

| Page | The problem | New title |
|---|---|---|
| `/blog/iron-deficiency-and-hair-loss` (from `anemia-can-make-your-hair-fall-out`) | "iron deficiency symptoms" 2,574 impr at pos 4.25, zero clicks. OPP 4 | `Iron Deficiency & Hair Loss: Signs Your Shedding Is Internal` |
| `/blog/hair-growth-hormones` | "hair growth hormone" 4,415 impr at pos 8, zero clicks. OPP 5 | `Which Hormone Makes Hair Grow? The Four That Matter` |
| `/blog/how-to-stop-alopecia-areata-from-spreading` | pos 8, 0.03% CTR. Consolidated canonical of the areata pair | `How to Stop Alopecia Areata From Spreading: What Works` |
| `/blog/oily-scalp-and-hair-loss` | "oily scalp thinning hair" 2,820 impr at pos 7.7, zero clicks. OPP 7 | `Oily Scalp and Thinning Hair: How the Two Are Connected` |
| `/concerns/folliculitis` | 0.15% CTR on the largest impression pool. OPP 1 | See 5.3 |
| `/trichology` | "trichologist" generic at pos 11, 1.25% CTR | See 5.6 |

**`/blog/iron-deficiency-and-hair-loss` additions:** the functional-medicine framing is the differentiator. Ferritin, not only hemoglobin. Explain why a "normal" iron panel can still leave hair short of what it needs. Link prominently to `/functional-medicine`. This is free traffic sitting at position 4.

### The national nutrient cluster (policy, not a brief)

Magnesium, l-lysine, amino acids, potassium, iodine, vitamin D, vitamin deficiency. Enormous impressions, near-zero clicks, roughly zero traffic value, and they do not book local Discoveries.

**Policy:** migrate all of them. Freeze the click-earners. Add one Discovery CTA and one internal link up to a relevant concern or money page on each. **Do not expand this cluster with new posts post-launch.** Enforced by the content pipeline rule in Part 9.3. Coming out swinging means winning local, wedge, and high-intent clusters, and declining to chase national supplement traffic the business already exited.

---

## 5.6 Utility and trust pages

### `/trichology`: main service page, dual intent

```
FILTER → OUTCOME  "Trichologist near me" and "what is a trichologist" are the filters.
                Knowing this is the right kind of professional to see is the outcome.
STATUS          FROZEN WINNER. 43 clicks, pos 7.9. Migrated from
                /pages/trichology-hair-growth-treatment-atlanta. Also absorbs the generic
                educational "trichologist" intent currently stranded on the homepage at pos 11.
```
**TITLE:** `Trichology Hair Growth Treatment Atlanta | Nina Ross`
**META:** `A trichologist reads the strand, the follicle, and the systems behind them. What that means, what it changes, and how to start. Sandy Springs, GA.`
**H1:** `Trichology Hair Growth That Works`
**Required section:** "What Is a Trichologist?" with an AI-citable Quick Answer. This is the page that owns that intent. Then: how the clinic differs from dermatologists and from stylist-trichologists, the Discovery process, treatment overview, conditions grid, success stories, CTA.
**Freeze note:** body content frozen 90 days. The "What Is a Trichologist?" section is **additive** and may be added at cutover, since adding a new section is not a change to the content that earns the clicks.

### `/functional-medicine`
**TITLE:** `Functional Medicine Atlanta | Nina Ross Hair Therapy`
**META:** `Hormones, thyroid, nutrients, gut, inflammation. The internal systems that decide whether hair grows, and how we test them. Sandy Springs, GA.`
**H1:** `Functional Medicine and Holistic Wellness`
Dr. Nina's approach. Testing: hormones, thyroid, nutrients, metabolism, gut, toxicity, inflammation, food allergies, neurotransmitters. The internal health to hair loss connection. Conditions addressed beyond hair. CTA.
**Role in the graph:** this is the destination for the hormone and nutrient bridge. Linked from `/concerns/hormonal-hair-loss`, `/concerns/pcos-hair-loss`, `/blog/iron-deficiency-and-hair-loss`, `/blog/hair-growth-hormones`, and every nutrient post. It is what makes the whole-body story legible to both Google and AI engines.

### `/about`
**TITLE:** `About Nina Ross Hair Therapy | Trichology + Functional Medicine`
**META:** `Founded on one finding: most hair loss has internal root causes. Meet Dr. Nina Ross, ND, and the certified trichology team. Sandy Springs, GA.`
**H1:** `Whole-Body Trichology, Led by Dr. Nina Ross`
Clinic story and founding insight. Dr. Nina bio with full credentials and `Person` schema (name, jobTitle, worksFor, knowsAbout: trichology, functional medicine, CCCA, traction alopecia). The certified trichology team, who performs evaluations and treatments. The whole-body methodology. The physical clinic inside the Nina Ross Functional Medicine building. Jamaal Lassiter, Co-Founder and Chief Operating Officer, one paragraph on service excellence and operations. CTA to `/book`.
**Entity role:** this page anchors the entity. Dr. Nina Ross as a citable authority on hair loss because she understands the body systems behind it. `Organization` schema with `sameAs` to real Facebook, Instagram, YouTube (`@ninarossatl`) and the Google Business Profile URL.

### `/book`: the conversion destination
**TITLE:** `Book Your $99 Hair & Body Discovery | Nina Ross Hair Therapy`
**META:** `30 minutes. Your scalp at 200x, a full-body scan, and your written report the next day. Monday to Saturday in Sandy Springs, GA. Serving all of Metro Atlanta.`
**H1:** `Book Your $99 Hair & Body Discovery`
The offer stated explicitly and concretely: what she gets, how long, the price anchor, availability Monday to Saturday. Booking widget. Styled "Call to Book" with the phone number. The risk-reversal line. The Sample Report button. Every page on the domain terminates here.

### `/contact`
**TITLE:** `Contact Nina Ross Hair Therapy | Sandy Springs, GA`
**META:** `8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350. Call (678) 561-4522. Monday to Saturday, 10:00 AM to 3:30 PM. Serving all of Metro Atlanta.`
Full NAP, clickable `tel:`, hours, embedded Google Map, contact form, "inside the Nina Ross Functional Medicine building." `LocalBusiness` JSON-LD with geo and `openingHoursSpecification`.

### `/faq`
**TITLE:** `Frequently Asked Questions | Nina Ross Hair Therapy`
**META:** `What the Discovery includes, what treatments cost, how long results take, and whether insurance applies. Straight answers, in plain language.`
Categories: Getting Started (5), Hair Loss Conditions (5), Treatments (5), Results and Expectations (4), Insurance and Payment (3). `FAQPage` covering all. Breadcrumbs.

### `/videos`
**TITLE:** `Hair Loss Treatment Videos | Nina Ross Hair Therapy`
**META:** `Client results, treatment demonstrations, and straight-talk education from certified trichologists in Sandy Springs, GA.`
**H1:** `Watch and Learn`
Grid of embedded YouTube, categorized Client Results / Treatment Demos / Educational. `VideoObject` JSON-LD per video. Responsive grid.

### `/editorial-policy` and `/medical-review-policy`
**H1s:** "Our Editorial Standards" and "How We Review Clinical Content." Who writes content (trichologists and health writers), the clinical review process (Dr. Nina Ross, ND reviews clinical claims), sourcing (PubMed, NIH, peer-reviewed), corrections process, accuracy over marketing, editorial contact, reviewer qualifications, and what "clinically reviewed" means. These two pages are cheap and they are load-bearing for YMYL E-E-A-T.

### `/privacy-policy` and `/policies`
Standard clinic content. `noindex, follow`.
---

# PART 6: THE SEO LAYER

## 6.1 Technical foundation

**`public/robots.txt`**
Allow all. Disallow `/api/`, `/admin/`. Explicitly allow AI crawlers: GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, OAI-SearchBot, Applebot-Extended. `Sitemap: https://www.ninaross.co/sitemap.xml`.

**`llms.txt`** (server route, custom, never platform auto-generated)
Clinic summary, About, Location and NAP, the Discovery offer, Services, the 18 conditions treated, and links to `/concerns`, `/treatments`, `/book`, `/about`, `/blog`, `/faq`. All URLs use the www host.

**`sitemap.xml`** (dynamic)
Each `<url>` entry uses **only** `<loc>` (absolute www URL) and `<lastmod>` (accurate, updated only when substantive content actually changes, never auto-bumped on every build). **Do not emit `<priority>` or `<changefreq>` at all.** Google ignores both. Include image sitemap extensions for pages with meaningful imagery (concern, treatment, results) and video extensions for `/videos`. Cover: homepage, `/trichology`, `/about`, `/contact`, `/book`, all 8 money pages, `/concerns` plus all 18, `/treatments` plus all 9, `/functional-medicine`, `/faq`, `/videos`, all blog posts and category hubs, `/llms.txt`.

**Canonical**
`SEOHead` sets `<link rel="canonical" href="https://www.ninaross.co{path}"/>` on every page. Always www. No exceptions.

**Meta robots**
Content pages `index, follow`. `/privacy-policy` and `/policies` `noindex, follow`.

**Host canonicalization at the edge**
Every non-www request 301s to the www equivalent, preserving path and query. `http` forces to `https` plus www in a single hop. Verify no canonical, sitemap entry, schema `url`, or internal link ever points to non-www.

**`SEOHead` props:** `title`, `description`, `canonicalUrl`, `ogImage`, `schema`. Plus OG tags and Twitter card on every page.

## 6.2 Schema matrix

| Page type | JSON-LD emitted |
|---|---|
| Homepage | `Organization` + `LocalBusiness` + `MedicalBusiness` + `Person` (Dr. Nina) |
| Money / City | `Service` + `LocalBusiness` + `FAQPage` + `BreadcrumbList` |
| Concern | `MedicalCondition` + `MedicalWebPage` + `FAQPage` + `BreadcrumbList`, with `author` and `reviewedBy` |
| Concern (CCCA) | Above plus `ImageObject` on real trichoscopy imagery |
| Treatment | `MedicalTherapy` + `FAQPage` + `BreadcrumbList` |
| Blog post | `Article` (+ `MedicalWebPage` where clinical) + `FAQPage` where real + `BreadcrumbList`, with `author` and `reviewedBy` |
| Category hub | `CollectionPage` + `BreadcrumbList` |
| Index pages | `CollectionPage` + `BreadcrumbList` |
| `/contact` | `LocalBusiness` with `geo` and `openingHoursSpecification` |
| `/videos` | `VideoObject` per video |
| `/about` | `Organization` + `Person` |
| `/faq` | `FAQPage` covering all questions |
| Legal | none |

**`LocalBusiness` block, canonical values:** name Nina Ross Hair Therapy; street 8735 Dunwoody Place, Suite 290; city **Sandy Springs**; state GA; postal 30350; phone (678) 561-4522; `openingHoursSpecification` Mo-Fr 10:00 to 15:30; geo 33.9321 / -84.3348; `priceRange "$$"`; `medicalSpecialty "Trichology"`; `areaServed` [Sandy Springs, Atlanta, Dunwoody, Brookhaven, Roswell, Marietta, Decatur, Alpharetta]; `sameAs` real socials and the GBP URL; `hasMap`.

**`aggregateRating`** ships only when the separate Google Business Profile document supplies real, current review data. Never fabricate a rating or a review count.

**`Service` on money pages** describes the $99 Hair & Body Discovery as a trichoscopy-based scalp assessment. **The full-body biofeedback scan does not appear in structured data at all.** Not as `MedicalTherapy`, not as `MedicalTest`, not as a nested `Service`, not in a `description` string. Rule 29 and R11. Marketing copy names it in the includes list and stops there.

**FAQ schema:** keep `FAQPage` data wherever it is genuinely useful for AI citability and UX, even though Google now renders FAQ rich results mainly for authoritative government and health sites. The schema still helps machines parse the page.

## 6.3 GEO: getting cited by AI engines

**`src/data/ai-citable.ts`** holds authoritative blocks, 75 to 200 words each, complete and self-contained:

`what-is-trichology` · `trichoscopy-explained` · `functional-medicine-hair-loss` · `pcos-hair-loss-mechanism` · `ccca-explained` · `traction-alopecia-reversibility` · `scalp-bumps-causes` · `traction-alopecia-prevention` · `prp-for-hair-loss` · `exosome-therapy-hair` · `telogen-effluvium-recovery` · `dht-and-hair-loss` · `hormones-and-hair-growth` · `iron-deficiency-and-hair-loss` · `scalp-evaluation-process` · `holistic-hair-restoration`

Each: `id`, `topic`, `content`, `keywords`, `sourcePages`.

**The `QuickAnswer` component** renders one of these as a styled card directly under the H1 on every concern page, every treatment page, and every high-intent blog page. Structured for clean extraction: one idea per sentence, no pronouns referring outside the block, no "as mentioned above," no dependency on surrounding page context. If the block cannot stand alone when copied into a chat window, it is not finished.

**What actually gets cited:** completeness, specificity, and a stated point of view. The blocks that will win citations are the honest ones. "Early traction alopecia is often reversible. Advanced traction alopecia with follicular scarring is manageable and may not fully regrow." An aggregator will not write that sentence, which is exactly why an AI engine will quote it.

## 6.4 Citations and E-E-A-T

**`src/data/citations.ts`** holds real PubMed references: `id`, `title`, `authors`, `journal`, `year`, `pmid`, `doi`, `url`.

| Topic | PMID |
|---|---|
| Alopecia areata | 32956487 |
| CCCA in African American women | 29222097 |
| PRP for AGA | 31021437 |
| Telogen effluvium | 33278891 |
| Traction alopecia prevalence | 30312484 |
| Exosomes | 33946614 |
| Vitamin D and hair loss | 30077877 |
| Microneedling | 29028377 |
| PCOS and hair loss | 31608498 |
| Iron deficiency | 17951030 |
| DHT in AGA | 32003879 |
| Minoxidil | 30974011 |
| Red light therapy | 24078483 |

**Every PMID resolves before publishing.** Rule 24. A citation that does not resolve is a fabricated source and it is worse than no citation.

**The `Citations` component** renders a "References" section on all concern pages, all treatment pages, and every clinical blog post. Medical citation style, links to PubMed.

**`src/data/authors.ts`:** Author objects with `slug`, `name`, `title`, `credentials`, `bio`, `image`, `expertise[]`. At minimum Dr. Nina Ross, ND as reviewer, and a Nina Ross Hair Therapy team entity as author. Bylines render accurately per Rule 22, with `author` and `reviewedBy` schema on clinical pages.

**The two policy pages** (`/editorial-policy`, `/medical-review-policy`) are cheap to build and load-bearing for YMYL. They exist so a quality rater can find the answer to "who writes this and who checks it" in one click.

## 6.5 The information-gain engine

**`src/data/clinical-insights.ts`** holds reusable first-party insight blocks, each tagged to the concern or treatment it strengthens:

- Trichoscopy observations: what a given condition looks like at 200x on textured hair specifically
- Observed client patterns: staging traction alopecia reversibility, trigger-to-shed timing in telogen effluvium, regrowth texture after anagen effluvium
- Internal frameworks: the whole-body evaluation sequence, the PRP screening criteria, the oral-to-IV escalation threshold

**At least one insight block appears on every clinical concern page, every treatment page, and the reversibility hub.** No page is a pure summary. Rule 25.

**Planned first-party research posts**, published as real data supports them and never before:
1. CCCA presentation patterns observed in this clinic's population
2. Traction alopecia reversibility by stage
3. Nutrient-deficiency correlations seen across Discovery evaluations

These reinforce the wedge and they feed GEO citability at the same time. They are the durable moat. National commodity content can be replicated by anyone with a keyword tool. A trichoscopy observation from ten years of textured-hair practice cannot.

## 6.6 Core Web Vitals and accessibility

**Targets:** LCP under 2.5s, INP under 200ms, CLS under 0.1, verified on the homepage, one money page, one concern page, one blog post, and `/book`.

**Images:** next-gen formats, responsive `srcset`, lazy-load below the fold, explicit width and height or `aspect-ratio` on every image to prevent CLS.
**Fonts:** Montserrat with `font-display: swap` and a size-matched fallback.
**JS:** defer non-essential, none render-blocking in head, tree-shaken.
**Mobile:** 44x44px touch targets, no horizontal scroll, 16px minimum body, no tap delay.
**Accessibility:** WCAG AA. Alt text on every image. Contrast 4.5:1, with Champagne-on-Warm-Bone and Cocoa combinations explicitly verified. Keyboard navigation, visible focus, skip-to-content, ARIA on icon buttons.
**Polish:** helpful 404 with search and nav, route-transition loading states, smooth scroll, print stylesheet, favicon and apple-touch-icon from the circular NR monogram.
---

# PART 7: MIGRATION PROTECTION

The site currently runs on Shopify, a leftover from the ecommerce era the business exited. That history is why the domain carries national informational rankings it no longer wants and product-era URLs it no longer needs. The migration has to keep the equity and drop the rest, in one move, without losing the pages that actually earn clicks.

## 7.1 The real baseline

**Domain:** DR 28, 571 referring domains, roughly 830 organic visits per month, 223 keywords with 65 in the top 3.

**Top pages by actual GSC clicks, last 12 months.** This is the real winner list. Modeled traffic estimates are not used anywhere in this document, because protecting the wrong pages during a migration is how you lose rankings you meant to keep.

| # | Page | Clicks | Position | Note |
|---|---|---|---|---|
| 1 | `www.ninaross.co/` | 1,086 | 4.2 | Brand plus local |
| 2 | `ninaross.co/` | 378 | 12.8 | Non-www duplicate, consolidate |
| 3 | `/pages/black-trichologist-atlanta` | 177 | 18.2 | Flagship, improve |
| 4 | `/blogs/hair-loss/what-is-folliculitis` | 106 | 13.1 | 72,146 impressions |
| 5 | `/blogs/.../l-lysine-benefits-for-skin` | 103 | 21.2 | National feeder |
| 6 | `/blogs/hair-loss/trichologist-for-black-hair` | 56 | 14.8 | Wedge |
| 7 | `/blogs/.../magnesium-hair-growth` | 53 | 10.5 | National feeder |
| 8 | `/blogs/hair-loss/hair-loss-and-potassium-deficiency` | 53 | 7.5 | National feeder |
| 9 | `/blogs/.../7-amazing-amino-acids-for-hair-regrowth` | 51 | 12.8 | National feeder |
| 10 | `/blogs/hair-loss/minoxidil-itchy-scalp` | 49 | 11.6 | n/a |
| 11 | `/pages/trichology-hair-growth-treatment-atlanta` | 43 | 7.9 | Main service page |

**`src/data/seo-baseline.ts`** records per high-value page: `oldUrl`, `newUrl`, `currentClicks`, `currentPosition`, `primaryKeyword`, `impressions`, `referringDomains`, `title`, `h1`, `metaDescription`, `status` (`winner` | `improve` | `stable` | `low-value`).

**Rule 21 applies hardest here.** Populate these fields only from supplied first-party GSC or Ahrefs data. Any value not supplied is `null` or `needsData: true`. Never estimate, interpolate, or invent a click count to satisfy a TypeScript field. A fabricated baseline defeats the entire purpose of having one.

## 7.2 The freeze protocol

| Status | Rule |
|---|---|
| **Winner** | No content change for 90 days. URL, template, and design change only. One Discovery CTA and one internal link may be added, since neither touches the body that earns the clicks. Title and meta change at **day 30** under the freeze exception, one page at a time, monitored 30 days each |
| **Improve** (`/black-trichologist-atlanta` only) | Frozen at cutover. Upgraded after the 30-day stability window per the upgrade plan in 5.2.1. This is the one winner deliberately upgraded instead of left alone |
| **Stable** | Minor edits permitted after 30 days |
| **Low-value** | Full rewrite immediately |

**Winners to freeze:** homepage (consolidated host), `/concerns/folliculitis`, `/blog/l-lysine-benefits-for-skin`, `/blog/magnesium-for-hair-growth`, `/blog/hair-loss-and-potassium-deficiency`, `/blog/amino-acids-for-hair-regrowth`, `/blog/trichologist-for-black-hair`, `/trichology`.

**Track all winners plus the improve page weekly in GSC for 90 days.** If any winner drops more than 20% from baseline, investigate the redirect and the index status. Do not rewrite the page.

## 7.3 Redirect rules

All redirects are **301, single hop, no chains**, to the most relevant destination. Built as an ordered rule set in `src/lib/redirects.ts`, evaluated at the edge or in SSR before routing.

**RULE 0, host canonicalization, runs first:**
```
https://ninaross.co/*  →  https://www.ninaross.co/*   (301, preserve path and query)
http://*               →  https://www.ninaross.co/*   (force TLS and www)
```
This resolves the indexed homepage split into one asset, keeping the dominant host.

**The deletion rule.** 301 only when a genuinely relevant replacement or consolidated page exists, meaning a real topical match. When there is no genuine replacement, return **404 or 410**. Do not mass-redirect irrelevant URLs to a king page. Google treats irrelevant redirects as soft 404s, which wastes crawl budget and can dilute the target. "Relevant replacement or 404/410" is the rule. "Always redirect" is not.

**The collision rule.** When two old URLs target one destination, designate one canonical (the URL holding the impressions per GSC) and 301 the other into it. Never leave both live and competing. Verify the surviving body content is the higher-impression version.

Resolved collisions:

| Collision | Canonical (keeps the body) | Secondary (301s in) |
|---|---|---|
| Magnesium | `/blogs/health-wellness-posts/magnesium-hair-growth`, holds 50,928 impressions | `/blogs/health-wellness-posts/magnesium-for-hair-growth` |
| Alopecia areata | `/blogs/hair-loss/how-to-stop-alopecia-areata-from-spreading`, holds 47k impressions | `/blogs/hair-loss/how-to-stop-alopecia-areata-from-getting-worse` |
| CCCA | Whichever of the two CCCA posts holds the impressions | The other, into `/concerns/ccca` |
| Traction alopecia | `traction-alopecia-reversal` → `/concerns/traction-alopecia` | `traction-alopecia-when-is-it-too-late` → `/blog/traction-alopecia-reversibility` |

**Root-level URLs with real backlink equity (must redirect):**

| Old | New | Refdomains |
|---|---|---|
| `/hair-extensions-salons-atlanta-ga` | `/trichology` | 49 |
| `/microlink-extensions-atlanta` | `/trichology` | 35 |
| `/pages/hair-extensions-salons-atlanta-ga` | `/trichology` | 29 |
| `/pages/shop` | `/trichology` | 14 |
| `/pages/appointment-calendar` | `/book` | 10 |
| `/pages/at-home-therapy` | `/treatments` | 9 |
| `/book-now` | `/book` | 12 |
| `/collections/all` | `/treatments` | n/a |

**Static page migrations:**
```
/pages/trichology-hair-growth-treatment-atlanta  → /trichology
/pages/black-trichologist-atlanta                → /black-trichologist-atlanta
/pages/about-us                                  → /about
/pages/nina-ross                                 → /about
/pages/functional-medicine-atlanta               → /functional-medicine
/pages/atlanta-hair-doctor                       → /hair-doctor-atlanta
/pages/atlanta-hair-treatments                   → /treatments
/pages/best-alopecia-areata-doctor-in-atlanta    → /alopecia-areata-doctor-atlanta
/pages/hair-fall-treatment-in-atlanta            → /hair-loss-treatment-atlanta
/pages/best-traction-alopecia-treatment-in-atlanta → /traction-alopecia-treatment-atlanta
/pages/best-prp-hair-loss-treatment-in-atlanta   → /prp-hair-treatment-atlanta
/pages/videos                                    → /videos
/pages/blogs                                     → /blog
/pages/contact-us                                → /contact
/pages/policies-procedures                       → /policies
/pages/privacypolicy                             → /privacy-policy
```

**Blog category indexes:**
```
/blogs/hair-loss                       → /blog/hair-loss
/blogs/health-wellness-posts           → /blog/health-wellness
/blogs/treatment-methods-posts         → /blog/treatment-methods
/blogs/scalp-concerns                  → /blog/scalp-concerns
/blogs/taking-care-of-your-hair-posts  → /blog/hair-care
```

**Blog post classification.** Every one of the ~95 Shopify posts gets classified before a single redirect is written:

- **A. Becomes a concern page** → 301 to `/concerns/[slug]`. 16 mappings.
- **B. Becomes a treatment page** → 301 to `/treatments/[slug]`. Mesotherapy, exosome, micropigmentation, steam.
- **C. Stays a flat post** → 301 to `/blog/[slug]`, category path removed.
- **D. Low-value or duplicate** → 301 only if a genuinely relevant replacement exists. Otherwise 404 or 410.

Representative mappings, apply the same pattern to the rest:
```
/blogs/hair-loss/alopecia-areata                    → /concerns/alopecia-areata
/blogs/hair-loss/what-is-folliculitis               → /concerns/folliculitis   [FROZEN, 72k impr]
/blogs/hair-loss/hormonal-imbalance                 → /concerns/hormonal-hair-loss
/blogs/hair-loss/telogen-effluvium                  → /concerns/telogen-effluvium
/blogs/hair-loss/anemia-can-make-your-hair-fall-out → /blog/iron-deficiency-and-hair-loss   [OPP 4]
/blogs/hair-loss/oily-scalp-and-hair-loss-how-are-they-related → /blog/oily-scalp-and-hair-loss  [OPP 7]
/blogs/health-wellness-posts/hair-growth-hormones-impacting-your-hair-health → /blog/hair-growth-hormones  [OPP 5]
/blogs/hair-loss/hair-loss-atlanta                  → /hair-loss-treatment-atlanta
/blogs/hair-loss/hair-loss-treatment-near-me        → /hair-loss-treatment-atlanta
/blogs/hair-loss/black-dermatologists-near-me-significance-relevance → /black-trichologist-atlanta
/blogs/hair-loss/black-female-trichologist-dermatologist-atlanta    → /black-trichologist-atlanta
/blogs/hair-loss/why-do-you-need-to-consult-a-black-dermatologist-atlanta → /black-trichologist-atlanta
/blogs/hair-loss/things-to-do-before-you-google-trichologist-near-me → /blog/choosing-a-trichologist-near-me
```

**Shopify system URLs, 410 Gone, never fake redirects:**
```
/collections/*             → 410
/cart, /checkout, /account* → 410
/products/*                → 410, after verifying none retain valuable backlinks.
                             If one does, 301 it to the closest relevant concern or treatment page.
```

**No ecommerce is rebuilt.** No products, no cart, no checkout, ever.

## 7.4 Validation

**The redirect validation script** runs post-launch and asserts, for every rule in `redirects.ts`:
- Status is 301, never 302, never chained
- Destination matches the map exactly
- No 404 among mapped sources
- No surviving non-www URL anywhere

Outputs pass or fail per rule. Runs weekly for the first 30 days.

**`/dev/migration-status`** (dev only) shows all redirects with status, winner pages current versus baseline clicks, any page down more than 20% from baseline, and the host-split check asserting zero non-www URLs indexed.

**`src/data/outreach-targets.ts`** lists the highest-value sites linking to old URLs, especially the 49, 35, 29, and 14 refdomain pages. After launch, contact DR>30 dofollow linkers to update to the new destinations. Fields: site domain, linking page, old destination, new destination, link type, anchor. Populate only from real backlink data. Rule 21.
---

# PART 8: THE OPPORTUNITY LAYER

Seven query families where the domain already earns impressions and under-converts. All GSC-verified. Each becomes a page or a page treatment instead of a guess. Ordered by booking value multiplied by fixability.

### OPP 1: The "bumps on scalp" symptom cluster
**The situation:** the folliculitis page pulls 72,146 impressions per year across 2,877 keywords and ranks position 1.7 to 12.8 for a symptom-first cluster: hair bump on scalp (1.7), bumps in scalp (4), small bumps on scalp (6), bumps on scalp under hair (5.5), itchy bumps on scalp (5.5), pimple-like bumps on scalp that hurt (12.8), bumps on hairline (6.9). CTR is 0.15%.
**The read:** this is a national informational giant with a scalp-symptom intent distinct from the clinical term "folliculitis." One page is trying to own two intents.
**The build:** keep `/concerns/folliculitis` authoritative and frozen at migration. Build `/concerns/scalp-bumps` as the symptom-entry king. Rewrite the folliculitis title and meta at day 30. Brief in 5.3.
**The size:** this is the biggest impression pool on the domain. Even 1% CTR is roughly 700 clicks a year from near zero today.

### OPP 2: Traction alopecia reversibility
**The situation:** "can traction alopecia be reversed" (4,609 impressions, position 9), "is traction alopecia reversible" (3,103, position 10), "traction alopecia when is it too late" (2,137, position 9). Near-zero CTR at page-1-bottom.
**The read:** someone Googling whether her traction alopecia is "too late" is scared and ready to act. This is the highest booking-intent informational cluster on the domain, and it sits dead center in the wedge.
**The build:** `/blog/traction-alopecia-reversibility` as a dedicated hub, leading with the honest staged answer, feeding `/traction-alopecia-treatment-atlanta`. Brief in 5.5.
**The conversion mechanism:** "The $99 Discovery tells you if it's reversible." Honesty is the offer.

### OPP 3: CCCA deserves flagship status
**The situation:** "ccca alopecia" pulls 1,031 impressions at position 6, and CCCA is the signature scarring alopecia affecting Black women. The original plan built `/concerns/ccca` as an equal peer to fifteen other conditions.
**The read:** CCCA is where cultural competency, clinical authority, and the wedge all converge. It is the single most defensible topic on the domain.
**The build:** flagship concern page with money-page depth plus a matching money page at `/ccca-treatment-atlanta`. First-party trichoscopy imagery. Defensible causal language per Rule 23. Strong internal link position from the flagship money page and the homepage conditions grid. Briefs in 5.2.3 and 5.3.

### OPP 4: Iron and anemia, a CTR emergency
**The situation:** "iron deficiency symptoms" pulls 2,574 impressions at position 4.25 with zero clicks. "Does anemia cause hair loss" pulls 1,390 at position 9.
**The read:** position 4 with zero clicks is a title and intent-match failure, not a ranking problem. Run the SERP inspection first per Rule 26, then fix the title.
**The build:** migrate to `/blog/iron-deficiency-and-hair-loss`, retitle to "Iron Deficiency & Hair Loss: Signs Your Shedding Is Internal," add the functional-medicine framing (ferritin, not only hemoglobin, which is the whole-body differentiator), and route to the Discovery. Free clicks sitting at position 4.

### OPP 5: The hormone cluster
**The situation:** "hair growth hormone" pulls 4,415 impressions at position 8 with zero clicks. "Which hormone is responsible for hair growth" pulls 1,713 at position 11.
**The read:** big impressions, no clicks, and it is the exact bridge between hair and Dr. Nina's functional-medicine positioning. The page is answering a different question than the one being asked.
**The build:** `/concerns/hormonal-hair-loss` retitled to answer the literal question, with an AI-citable Quick Answer that names the hormones in sentence one and an explicit link to `/functional-medicine`. Supporting post at `/blog/hair-growth-hormones`. Briefs in 5.3 and 5.5.
**Why it matters beyond clicks:** this is the content that makes the whole-body story legible to both Google and AI engines.

### OPP 6: Lichen planopilaris
**The situation:** "lichen planopilaris scalp" pulls 2,153 impressions at position 14, currently buried inside a generic lichen planus post.
**The read:** another scarring alopecia disproportionately relevant to the wedge, with no page of its own.
**The build:** `/concerns/lichen-planopilaris` as its own king, optimized for the scalp-specific query, with trichoscopy differentiation from CCCA. Both are scarring, and the practice's ability to tell them apart early is genuine information gain. Brief in 5.3.

### OPP 7: Oily scalp and seborrheic thinning
**The situation:** "oily scalp thinning hair" pulls 2,820 impressions at position 7.7 with zero clicks. "Oily scalp hair loss" pulls 2,158 at position 18.
**The read:** decent positions, no clicks. Title and intent-match problem.
**The build:** migrate to `/blog/oily-scalp-and-hair-loss`, sharpen the title, connect seborrheic dermatitis to thinning to the Discovery. Lower priority than 1 through 5, and free once the template exists.

### Cross-cutting: the CTR rewrite pass
Multiple pages rank position 4 to 11 with sub-1% CTR purely because of weak titles: how to stop alopecia areata from spreading (position 8, 0.03%), hair growth hormone (position 8, 0%), iron deficiency symptoms (position 4, 0%), trichologist generic (position 11, 1.25%), hair therapy (position 15, 0.04%). Every migrated page gets a title and meta written to earn the click. This is the cheapest win in the entire build and it is now a standing rule.

---

## The priority cheat sheet

If you only do things in one order, do them in this one. Booking value multiplied by fixability, all GSC-verified.

| # | Move | Why it is here |
|---|---|---|
| 1 | **Host consolidation**, non-www into www | Free recovery of a split number-one asset. Costs nothing, risks nothing when done in the right direction |
| 2 | **Black-trichologist flagship upgrade** | Position 18 to page 1 on the best wedge money term, on a page that already out-clicks nearly everything at page 2 |
| 3 | **Title and meta CTR rewrites** on position 4 to 11 zero-click pages | Free clicks, no new content, no ranking risk after the stability window |
| 4 | **`/concerns/scalp-bumps`** | Captures the 72k-per-year impression pool that dead-ends today |
| 5 | **Traction alopecia reversibility hub** | Highest booking-intent informational cluster on the domain |
| 6 | **CCCA flagship**, concern plus money page | The exact center of the wedge, and the most defensible content available |
| 7 | **GBP category and review engine** | Handled in the separate GBP document. The biggest map-pack lever of all |
---

# PART 9: MEASUREMENT AND THE OPERATING SYSTEM

Both source documents measured search well and conversion barely at all. A page that ranks and does not book is a failure that shows up as a success in a rankings report. This part fixes that.

## 9.1 The conversion instrument

**The one number that matters:** Discoveries booked per month from organic. Everything else is a diagnostic for it.

**GA4 conversion events, configured before cutover:**

| Event | Fires on | Why |
|---|---|---|
| `booking_open` | Booking lightbox opens | The real intent signal, since booking happens in an iframe |
| `booking_source` | Parameter on `booking_open` | Which section triggered it: hero, symptom card, offer panel, sticky, footer |
| `symptom_card_tap` | Any self-recognition card | The highest-intent micro-conversion on the domain |
| `sample_report_open` | Sample Report modal | Consideration depth. Correlate against booking rate |
| `phone_click` | Any `tel:` link | Older and higher-intent segment, often invisible otherwise |
| `offer_panel_view` | Discovery panel 50% visible | The denominator for offer-panel conversion rate |
| `form_submit` | Contact form | Secondary |

**The page-level scorecard**, reviewed monthly for every money page, the flagship, and the top ten organic landing pages:

| Metric | What it tells you | Action threshold |
|---|---|---|
| Organic sessions | Did search work | Down 20% versus 90-day average, investigate |
| Offer panel view rate | Did she get far enough to see the offer | Under 40%, the page is too long above the offer or the proof is weak |
| `booking_open` rate | Did the page sell | Under 2% of sessions, rewrite the hero and the proof section |
| Symptom card tap rate | Is the self-recognition language hers | Near zero, the card copy is clinical instead of hers |
| Booking source mix | Which section actually converts | If the hero carries everything, the body is not working |
| Scroll depth to offer | Where she leaves | Cliff before the offer panel, cut what is above it |

**Read the funnel in this order when a page underperforms:** impressions (is it found), CTR (is the title working), sessions, offer panel view rate (does she get there), booking rate (does it sell). Fix the earliest broken step. Fixing a booking rate on a page nobody reaches is wasted work.

## 9.2 The search instrument

**`src/data/seo-tracking.ts`** holds the query-ownership map from Part 4.3 and the decay triggers.

**Content decay triggers.** Any one of these opens an investigation:
- Traffic down 20% versus the 90-day average
- Position down 3 or more for the primary keyword
- Impressions down 30% versus the prior period
- CTR below category average for 30 or more days

**The monthly report template:**

| Block | Contents |
|---|---|
| Winners | Pages moving 4-15 into 1-3 |
| Striking distance | Positions 4 to 10, highest ROI, work these before writing anything new |
| CTR opportunities | High impressions, low CTR. Run the SERP inspection, then test titles |
| Cannibalization alerts | Any keyword where two URLs both rank. Check against the ownership map |
| Decay alerts | Anything hitting a trigger above |
| Indexation | Submitted versus indexed |
| Links | New and lost referring domains |
| Local | GBP calls, bookings, directions, reviews, from the separate GBP document |
| AI referrals | `chatgpt.com`, `perplexity.ai`, and similar sources in GA4 |
| **Conversion** | Discoveries booked from organic, booking rate by page, booking source mix |

**AI search monitoring, monthly:** check ChatGPT, Perplexity, and Gemini for the brand and the top keywords. Track whether Dr. Nina and the practice get cited by name. Track AI referral traffic in GA4. Adjust the Quick Answer blocks toward what actually gets cited.

## 9.3 The content pipeline rules

Before anyone writes a new page, in this order:

1. **Check GSC striking distance.** Anything at position 4 to 10 gets improved before anything new gets written. Improving an existing page beats publishing a new one nearly every time.
2. **Check for impression-without-a-page queries.** If the domain earns impressions for a query family with no page that owns it, build that page. That is how `/concerns/scalp-bumps` and `/concerns/lichen-planopilaris` were found.
3. **Check the ownership map.** If the family already has a king, improve the king. Never build a second page for it.
4. **Pass the information-gain test.** If the draft contains nothing that required this practice's actual expertise, it does not publish. Rule 25.
5. **Do not expand the national nutrient cluster.** Standing rule, no exceptions without a written reason.
6. **Run the copy rules line by line.** Part 2, all 30.

**Monthly cannibalization review** against the ownership map. Two URLs ranking for one keyword is a defect, and it gets fixed by consolidating, differentiating intent, or 301ing the loser into the king.

## 9.4 The local layer

Google Business Profile is handled in a separate document. On-site, the local scaffolding is:

1. **NAP consistency component.** One source of truth, rendered identically in the footer, on `/contact`, in schema, and in every `LocalBusiness` block. This exact string matches the GBP character for character. It is on the migration freeze list, because a NAP mismatch at cutover damages local rankings silently.
2. **Location schema depth.** `LocalBusiness` plus `MedicalBusiness` with `geo`, `openingHoursSpecification`, `areaServed`, `sameAs` (socials plus GBP URL), and `hasMap`.
3. **Local content signals.** The "Areas We Serve" module on money pages, plus a genuine Sandy Springs and Atlanta metro locality section written as real sentences.
4. **Review display.** Structured space to surface real Google reviews, built and left empty until the GBP document supplies real data. `aggregateRating` schema ships only then. Never fabricate a rating or a count to fill the component.
5. **Digital PR targets** (`src/data/pr-targets.ts`): local Atlanta health and beauty press, Black women's health outlets, podcast and interview opportunities for Dr. Nina. These lift domain authority and the entity at the same time. Coordinate anchor text toward wedge terms without over-optimizing.

## 9.5 Video SEO (post-launch)

Per-video indexable pages with transcript, summary, chapters, `VideoObject` schema, and links to the related concern and treatment pages. Videos already exist and they are currently doing nothing for search. This is a later phase and it is a real one.
---

# PART 10: EXECUTION

## 10.1 Build order

| Week | Work | Gate to pass before moving on |
|---|---|---|
| **1** | Project foundation, design system, layout components, `trust.ts`, data architecture, homepage | `trust.ts` renders every price, credential, and NAP. No hard-coded `$99` anywhere |
| **2** | 18 concern pages including scalp-bumps and lichen-planopilaris, 9 treatment pages, `/about` and the E-E-A-T foundation | Every concern page has a Quick Answer and an information-gain block |
| **3** | Blog engine with the single `blog.$segment` resolver, content migration classification, the reversibility hub | Every one of ~95 posts is classified A, B, C, or D. No unclassified post |
| **4** | 8 money pages including `/ccca-treatment-atlanta` and the flagship, plus `/trichology`, `/functional-medicine`, `/book`, `/contact`, `/faq`, `/videos`, legal | Every money page runs the full spine and ends on Offer then Action |
| **5** | Technical SEO, GEO blocks, citations with verified PMIDs, internal linking | Every PMID resolves. Every page links to `/book` twice |
| **6** | Redirect map with Rule 0 and the collision fixes, PageSpeed and CWV, migration protection with the GSC-based freeze list | Redirect validation script passes 100%. `seo-baseline.ts` has zero invented numbers |
| **7** | Editorial and medical review policies, first-party research engine, `clinical-insights.ts` | Every clinical page carries an insight block |
| **8** | On-site local scaffolding, measurement, ownership map, GA4 conversion events | All seven GA4 events fire correctly in preview |
| **9** | QA, redirect validation, host-split verification, schema validation, DNS cutover, go-live | Every item in 10.2 checked |
| **10+** | Monitor migration. Execute the opportunity plays in priority order. Begin research posts. GBP campaign runs in parallel | Winners holding within 20% of baseline |

## 10.2 Launch checklist

**DNS and hosting**
- [ ] `ninaross.co` DNS pointed to the new host
- [ ] SSL verified
- [ ] Non-www to www 301 live and tested with `curl -I`
- [ ] Every old URL returns a single-hop 301, or a 410 for system URLs

**Google Search Console**
- [ ] Primary GSC property matches the chosen canonical host (www). Reconcile before cutover if it is currently non-www or a Domain property
- [ ] New sitemap submitted on the www host
- [ ] Indexing requested: homepage, all 8 money pages, `/concerns/ccca`, `/concerns/scalp-bumps`, the reversibility hub, all frozen winners
- [ ] Crawl errors and 404 spikes monitored daily for week one

**Google Analytics**
- [ ] GA4 verified (`G-J072YME2JZ`)
- [ ] All seven conversion events firing, with `booking_source` populated
- [ ] Data flowing before cutover, not after

**Google Business Profile** (owned by the separate GBP document, listed here only for the cutover handshake)
- [ ] Website URL points to the www host
- [ ] NAP matches `trust.ts` character for character
- [ ] Hours match Monday to Saturday, 10:00 AM to 3:30 PM
- [ ] Confirm with the GBP document whether real review data exists yet. If not, `aggregateRating` does not ship

**Technical**
- [ ] PageSpeed run on homepage, a money page, a concern page, a blog post, and `/book`
- [ ] Redirect validation script passes: single hop, correct destination, zero chains
- [ ] JSON-LD validated with the Rich Results Test on one page of every type
- [ ] `robots.txt`, `sitemap.xml`, and `llms.txt` all load, all www
- [ ] Mobile tested on iOS Safari and Android Chrome
- [ ] Zero broken internal links
- [ ] Zero non-www URLs indexed

**Content**
- [ ] All 30 rules run line by line on every page
- [ ] Zero em dashes anywhere, including meta descriptions and schema strings
- [ ] Zero unsubstantiated stats. No "10K," no "98%," no "100%". Every claim on the page appears in the Rule 17 approved register
- [ ] Tenure reads "10 years of specialized care" everywhere. Zero "7+ years" survivors
- [x] Volume reads "2,500+ clients seen" everywhere (confirmed real by the clinic, Oct 2026). Zero instances of "served"
- [ ] **Rule 29 sweep:** grep the whole build for "biofeedback." Every hit is either the exact includes line or it gets deleted. Zero occurrences in schema, meta descriptions, FAQ answers, or Quick Answer blocks
- [ ] Every clinical page passes the information-gain test
- [ ] Every title and meta written to earn the click, spot-checked on the position 4 to 11 pages
- [ ] Schema city is Sandy Springs on every `LocalBusiness` block
- [ ] Offer reads $99, 30 minutes, everywhere, with no 45-minute survivors
- [ ] Every CTA uses an approved label from Rule 28
- [ ] Every rendered testimonial and image is a real client with a real outcome and the actual timeframe. No invented quotes, no stock standing in for a client, no composites presented as one person
- [ ] At least two testimonials describe CCCA or traction alopecia outcomes
- [ ] Each Sample Report preview is accurate and shows what she will actually receive. Parity across pages is not required
- [ ] Contact info correct on every page

**First 90 days**
- [ ] Redirect validation weekly for 30 days
- [ ] Winners tracked weekly against baseline in GSC
- [ ] The improve page tracked weekly, upgraded only after the 30-day stability window
- [ ] No content changes on winners for 90 days
- [ ] DR>30 linkers contacted to update to the new URLs
- [ ] Any winner down more than 20%, investigate the redirect and the index status. Do not rewrite the page
- [ ] Title and meta rewrites on winners begin at day 30, one page at a time
- [ ] AI visibility checked monthly
- [ ] Opportunity plays executed in the Part 8 priority order
- [ ] Monthly cannibalization review against the ownership map

## 10.3 The next-page checklist

Every new page, forever, after launch:

1. **Name the filter and the dream outcome behind it in one sentence.** Before writing anything else.
2. **Check the ownership map.** If the intent has a king, improve the king instead of building a peer.
3. **Outcome-led hero.** One supporting paragraph, CTA above the fold on mobile.
4. **Dream-outcome cards** in positive framing, each with a real photo.
5. **Real proof with a "during" panel,** placed early.
6. **Self-recognition cards** in her words, booking on tap.
7. **One expertise section,** not five. Cultural competency adapted to the audience.
8. **One information-gain block.** If it could have been written by someone without this practice, it fails.
9. **The Discovery panel** in the light scheme, with the Sample Report button.
10. **Authority, reviews, Metro Atlanta, FAQs** in the order the page-type variant specifies. Aspirational close.
11. **Run all 30 copy rules line by line.** Including the Rule 29 sweep: every mention of the biofeedback scan is the exact includes line or it goes.
12. **Every value from `trust.ts`.** Images as WebP with dimensions set. SEO layer wired. Schema emitted per the matrix.

---

## APPENDIX A: Data files

| File | Holds | Rule 21 applies |
|---|---|---|
| `src/data/trust.ts` | Offer, CTA labels, NAP, credentials, claims, disclaimers, host | Yes, on claims |
| `src/data/types.ts` | Concern, Treatment, TeamMember, Testimonial, FAQ, BlogPost, BlogCategory, Author, Citation | n/a |
| `src/data/concerns.ts` | 18 concern objects | n/a |
| `src/data/treatments.ts` | 9 treatment objects | n/a |
| `src/data/team.ts` | Dr. Nina Ross, Jamaal Lassiter | n/a |
| `src/data/testimonials.ts` | 6 to 8 real testimonials, at least two on CCCA or traction alopecia | Yes |
| `src/data/faq.ts` | FAQ by category | n/a |
| `src/data/authors.ts` | Author and reviewer entities | n/a |
| `src/data/citations.ts` | Verified PubMed references | Yes |
| `src/data/ai-citable.ts` | 16 AI-citable blocks | n/a |
| `src/data/clinical-insights.ts` | First-party insight blocks | Yes |
| `src/data/concern-treatment-map.ts` | The link graph | n/a |
| `src/data/seo-baseline.ts` | Migration baseline from real GSC | Yes |
| `src/data/seo-tracking.ts` | Ownership map, decay triggers | Yes |
| `src/data/outreach-targets.ts` | Backlink outreach list | Yes |
| `src/data/pr-targets.ts` | Digital PR targets | n/a |
| `src/lib/redirects.ts` | The ordered redirect rule set | n/a |

## APPENDIX B: The four questions that settle any argument

**1. Which stage of the spine does this serve?**
No answer means it gets cut or rewritten.

**2. Who owns this intent?**
Check the ownership map. If it already has a king, improve the king.

**3. Could someone without this practice have written this?**
If yes, it does not publish.

**4. Does this sentence claim more than we can defend?**
Every claim on the page appears in the Rule 17 register, or it comes out. Being more helpful about what the Discovery reveals is the most expensive mistake available on this domain.

---

*Nina Ross Hair Therapy · Nina Ross Health Group*
*8735 Dunwoody Place, Suite 290, Sandy Springs, GA 30350 · (678) 561-4522*
*Serving all of Metro Atlanta*
