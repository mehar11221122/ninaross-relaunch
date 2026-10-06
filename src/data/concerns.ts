import { claims } from "./trust";
import type { Concern, ConcernCategory } from "./types";

/**
 * All 18 conditions. Every detail page renders from this file.
 * Clinical copy only. No invented statistics, reviews, or outcome promises.
 */
export const concerns: Concern[] = [
  /* ---------------------------------------------------------------- CCCA */
  {
    slug: "ccca",
    title: "CCCA",
    metaTitle: "CCCA: Early Signs, Real Causes, and What Can Be Saved",
    metaDescription:
      "CCCA explained by Atlanta trichologists: early signs at the crown, what the research says about causes, and how trichoscopy at 200x shows which follicles are still active. Serving all of Metro Atlanta.",
    h1: "CCCA: Causes, Symptoms, and Treatment",
    shortDescription:
      "Central centrifugal cicatricial alopecia. Starts at the crown and spreads outward, quietly.",
    overview:
      "Central centrifugal cicatricial alopecia, or CCCA, is a scarring hair loss that begins at the crown and moves outward in a circular pattern. In the early stage the scalp often looks shiny or feels tender, and the hair at the center breaks or thins before any bald patch appears. Because it is scarring, follicles that have already been replaced by scar tissue will not grow hair again. Follicles at the active border frequently can be saved when the inflammation is calmed early. At Nina Ross Hair Therapy in Sandy Springs, we read the crown at 200x magnification to separate scarred areas from areas that still have living follicles, then treat the active edge. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My crown feels tender or itchy", clinical: "Scalp tenderness, pruritus, burning" },
      { herWords: "The center of my part looks shiny", clinical: "Loss of follicular openings, atrophic shine" },
      { herWords: "My crown keeps breaking off", clinical: "Hair shaft fragility over the vertex" },
      { herWords: "The thin spot is getting wider", clinical: "Centrifugal spread from the vertex" },
      { herWords: "My hair will not hold a style there", clinical: "Reduced density and caliber at the crown" },
    ],
    causes: [
      {
        title: "Inflammation around the follicle",
        body: "CCCA is driven by chronic inflammation at the upper follicle. Over time that inflammation replaces the follicular structure with fibrous tissue, which is why the surface starts to look smooth.",
      },
      {
        title: "Genetic and familial factors",
        body: "CCCA is reported to run in families, and research has looked at gene variants involved in hair shaft formation. A family history at the crown is worth telling us about.",
      },
      {
        title: "Grooming history",
        body: claims.cccaCausal,
      },
      {
        title: "Metabolic and systemic factors",
        body: "Associations have been described with conditions such as type 2 diabetes and thyroid disease. This is one reason your visit looks at more than the scalp surface.",
      },
    ],
    treatmentApproach:
      "We start by mapping the crown at 200x so you can see the difference between scarred zones and the active border. Care focuses on calming the inflammation at that border first, then supporting the follicles that are still producing. Where the center has scarred, we are honest with you: that area will not regrow, and the work is holding the line around it. Everything is handled in-house.",
    relatedTreatments: [],
    relatedConcerns: ["lichen-planopilaris", "traction-alopecia", "folliculitis"],
    faq: [
      {
        q: "Can CCCA be reversed?",
        a: "Scarred follicles do not regrow. That is the honest answer. What can change is the border, where follicles are inflamed but still alive. When we calm that inflammation early, we are protecting hair you still have and giving the compromised edge a chance to fill back in.",
      },
      {
        q: "How do you know it is CCCA and not something else?",
        a: "We look at the pattern and read your scalp at 200x. CCCA usually starts at the crown and spreads outward, with loss of the follicular openings in the center. Conditions like lichen planopilaris and traction alopecia look different under magnification.",
      },
      {
        q: "Do I need a biopsy?",
        a: "Not always. Trichoscopy shows us a great deal in the room, and it is not invasive. If a biopsy would change your care, we will say so plainly.",
      },
      {
        q: "Will my protective styles be a problem?",
        a: "Come as you are. We will talk about tension and heat honestly, without blame, and we will work around what your life actually looks like.",
      },
      {
        q: "How soon should I come in?",
        a: "The earlier the better. Every week that inflammation stays active is a week of follicles at risk. Same week appointments are usually available.",
      },
    ],
    keywords: ["ccca", "central centrifugal cicatricial alopecia", "ccca treatment atlanta", "crown hair loss"],
    category: "scarring",
    variant: "flagship",
    infoGain: {
      heading: "How We Diagnose CCCA: Trichoscopy Versus Biopsy",
      body: [
        "A biopsy tells you what the tissue looks like at one small point. Trichoscopy at 200x tells you what the whole crown is doing right now, and you watch it on screen with us.",
        "What we look for: peripilar white halos around the follicle, loss of follicular openings in the center, and a border where openings are still present but inflamed. That border is the part of your scalp still worth fighting for.",
        "We photograph the same points every visit, so change is measured rather than guessed at.",
      ],
    },
    culturalCompetencyAngle:
      "CCCA is diagnosed most often in Black women, and too many people are told it is just a styling problem and sent away. Your hair history, relaxers, braids, locs, weaves and heat included, is clinical information here, not a verdict on you.",
    toneNotes: "Direct, protective, no blame. Lead with what can still be saved.",
    citations: [{ label: "Central centrifugal cicatricial alopecia: a review", pmid: "29222097" }],
    extraSections: [
      {
        heading: "Why CCCA Disproportionately Affects Black Women",
        body: [
          "CCCA is reported far more often in Black women than in any other group. Research points to a mix of factors: inflammation at the upper follicle, familial patterns, gene variants involved in how the hair shaft forms, and associated metabolic conditions.",
          claims.cccaCausal,
          "What that means for you in practice: styling is part of the conversation, not the whole conversation. We look at the scalp, the pattern and the systems behind it before anyone tells you what caused this.",
        ],
      },
    ],
    relatedPages: [
      { label: "CCCA Treatment in Atlanta", href: "/ccca-treatment-atlanta" },
      { label: "Black Trichologist in Atlanta", href: "/black-trichologist-atlanta" },
    ],
    clinicallyReviewed: true,
  },

  /* -------------------------------------------------- LICHEN PLANOPILARIS */
  {
    slug: "lichen-planopilaris",
    title: "Lichen Planopilaris",
    metaTitle: "Lichen Planopilaris on the Scalp: Signs and Treatment",
    metaDescription:
      "Lichen planopilaris explained: burning, redness around the follicle, and patchy scarring loss. How we tell LPP from CCCA at 200x in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "Lichen Planopilaris: Signs, Causes, and Treatment",
    shortDescription: "An inflammatory scarring alopecia that often burns or stings before it shows.",
    overview:
      "Lichen planopilaris, or LPP, is an inflammatory condition that attacks the upper part of the hair follicle and replaces it with scar tissue. It often announces itself with burning, stinging or itching before there is any visible patch. On the scalp you may see redness and scale hugging the base of individual hairs, small irregular patches rather than one round area, and hairs that lift out easily at the edge of a patch. Like other scarring alopecias, follicles already lost to scar will not regrow, so the goal is stopping the active inflammation and protecting the hair around it. We read your scalp at 200x at Nina Ross Hair Therapy in Sandy Springs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My scalp burns or stings", clinical: "Trichodynia, burning sensation" },
      { herWords: "There is flaking wrapped around single hairs", clinical: "Perifollicular scale" },
      { herWords: "Red rings around the hairs", clinical: "Perifollicular erythema" },
      { herWords: "Patches with odd shapes, not circles", clinical: "Irregular, coalescing patches" },
      { herWords: "Hairs come out with a slight tug", clinical: "Positive pull test at the active margin" },
    ],
    causes: [
      {
        title: "Immune activity at the follicle",
        body: "The immune system targets the stem cell region of the follicle. Once that region is lost, the follicle cannot rebuild itself.",
      },
      {
        title: "Association with lichen planus",
        body: "Some people with LPP also have lichen planus on the skin, nails or inside the mouth. Tell us if you have noticed changes there.",
      },
      {
        title: "Hormonal and systemic triggers",
        body: "A frontal pattern of LPP is described more often around and after menopause. Thyroid conditions are also reported alongside it.",
      },
    ],
    treatmentApproach:
      "Our first job is finding the active margin and calming it. We use trichoscopy to mark where inflammation is still working, use light-based and restorative support to settle it, and re-photograph the same points so you can see whether the border has stopped moving.",
    relatedTreatments: [],
    relatedConcerns: ["ccca", "lichen-planus", "folliculitis"],
    faq: [
      {
        q: "Is lichen planopilaris the same as CCCA?",
        a: "No. Both scar, but they behave differently. CCCA usually starts at the crown and spreads outward in a circle. LPP tends to make irregular patches with scale and redness right at the base of the hairs, and it often burns.",
      },
      {
        q: "Will the hair grow back?",
        a: "Where the follicle has scarred, no. Where the follicle is inflamed but still open, there is real work to do, and that is where we focus.",
      },
      {
        q: "Why does my scalp hurt when nothing looks wrong?",
        a: "Burning and tenderness often come before any visible patch with LPP. That symptom is a reason to look at the scalp under magnification now rather than waiting.",
      },
      {
        q: "Can I still get my hair done?",
        a: "Yes. We will talk about which services keep the scalp settled and which ones tend to stir it up.",
      },
      {
        q: "How do you track whether it is working?",
        a: "Standardized photos at the same points every visit. We compare the border, not your memory of it.",
      },
    ],
    keywords: ["lichen planopilaris", "lpp scalp", "scarring alopecia atlanta", "frontal fibrosing alopecia"],
    category: "scarring",
    variant: "standard",
    infoGain: {
      heading: "How We Tell LPP From CCCA At 200x",
      body: [
        "At 200x the two conditions look different. CCCA shows white halos around the follicle at the crown and a smooth center where the openings are gone.",
        "LPP shows scale wrapped around the base of individual hairs, redness at the follicle, and patches with irregular borders that can appear anywhere on the scalp.",
        "That distinction changes what we treat first, which is why we look before anyone names it.",
      ],
    },
    culturalCompetencyAngle:
      "Redness reads differently on deeper skin tones and is regularly missed. We read your scalp under magnification instead of judging by surface color, and your styling history is welcome information, never a lecture.",
    toneNotes: "Calm, precise, urgency without alarm.",
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------------ ALOPECIA AREATA */
  {
    slug: "alopecia-areata",
    title: "Alopecia Areata",
    metaTitle: "Alopecia Areata: Why Patches Appear and What Stops Them",
    metaDescription:
      "Alopecia areata explained: smooth round patches, exclamation mark hairs, and why the follicle stays alive. Read at 200x in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "Alopecia Areata: Why Patches Appear And What Stops Them",
    shortDescription: "Smooth, round patches that appear quickly. The follicle usually survives.",
    overview:
      "Alopecia areata is an autoimmune condition where the immune system interrupts follicles that are in their growth phase. The result is usually a smooth, round patch that appears over days rather than months, with skin that looks normal rather than scarred. Because the follicle itself is not destroyed, regrowth is possible even after a long patch, and hair often returns fine and light before it returns fully pigmented. Patches can also appear in the beard or eyebrows. At Nina Ross Hair Therapy in Sandy Springs we confirm the pattern at 200x, look at the systems that keep the immune response stirred up, and track each patch with photographs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "A smooth bald circle appeared out of nowhere", clinical: "Well-circumscribed patch of non-scarring loss" },
      { herWords: "Short hairs that look like tiny commas", clinical: "Exclamation mark hairs at the patch margin" },
      { herWords: "The skin there looks totally normal", clinical: "Preserved follicular openings" },
      { herWords: "White or fine hairs coming back in", clinical: "Regrowth of unpigmented vellus hair" },
      { herWords: "Pitting or ridges in my nails", clinical: "Nail pitting associated with alopecia areata" },
    ],
    causes: [
      {
        title: "Autoimmune activity",
        body: "The immune system stops recognizing the growing follicle as its own and pushes it out of the growth phase early.",
      },
      {
        title: "Stress and illness as triggers",
        body: "A major stressor or illness often sits just before the first patch. Stress is a trigger in the picture, not the whole cause.",
      },
      {
        title: "Other autoimmune conditions",
        body: "Thyroid disease, vitiligo and other autoimmune conditions show up more often alongside alopecia areata, which is why we look beyond the scalp.",
      },
    ],
    treatmentApproach:
      "We confirm the pattern at 200x, then support the follicle while the immune activity settles. Growth signal therapies and light-based therapy are used where they fit, and the systemic picture is part of the plan. We photograph every patch at each visit so regrowth is measured rather than debated.",
    relatedTreatments: [],
    relatedConcerns: ["telogen-effluvium", "trichotillomania", "lichen-planus"],
    faq: [
      {
        q: "Will my hair grow back?",
        a: "The follicle is not scarred, so regrowth is possible. What we cannot tell you is the timeline, because it varies with how widespread the patches are and how long they have been active.",
      },
      {
        q: "Why did it happen so fast?",
        a: "Alopecia areata interrupts hairs that are actively growing, so the loss shows up over days. That speed is characteristic, and it is not a sign that something worse is happening.",
      },
      {
        q: "Can it come back after it fills in?",
        a: "It can. Many people have quiet periods and active periods. Tracking your scalp gives us early warning when a new patch starts.",
      },
      {
        q: "Is this caused by stress?",
        a: "Stress is often the trigger that starts an episode, but it is not the whole story. The immune response is the mechanism.",
      },
      {
        q: "Do you treat beard and eyebrow patches?",
        a: "Yes. We read those areas the same way and include them in your photographs.",
      },
    ],
    keywords: ["alopecia areata", "bald patch", "autoimmune hair loss", "alopecia areata atlanta"],
    category: "autoimmune",
    variant: "standard",
    infoGain: {
      heading: "What The Patch Border Tells Us At 200x",
      body: [
        "The edge of the patch is the most informative part. Short tapered hairs that narrow toward the scalp tell us the patch is still active.",
        "Fine unpigmented hairs coming up through the patch tell us the follicle has restarted, even when you cannot see it in the mirror yet.",
        "We photograph the same border every visit, so you know which of those two things is happening.",
      ],
    },
    culturalCompetencyAngle:
      "Patches read very differently against textured hair and deeper skin, and they get dismissed as breakage more often than they should. We look under magnification and take you at your word.",
    toneNotes: "Reassuring about the follicle, honest about timeline.",
    citations: [{ label: "Alopecia areata: an update", pmid: "32956487" }],
    clinicallyReviewed: true,
  },

  /* -------------------------------------------------------- LICHEN PLANUS */
  {
    slug: "lichen-planus",
    title: "Lichen Planus",
    metaTitle: "Lichen Planus: What It Is and How It Affects Hair",
    metaDescription:
      "Lichen planus explained and how it reaches the scalp. Signs on skin, nails and mouth, and what it means for your hair. Sandy Springs trichology, serving all of Metro Atlanta.",
    h1: "Lichen Planus: What It Is And How It Affects Your Hair",
    shortDescription: "An immune condition of skin, nails and mouth that can reach the follicle.",
    overview:
      "Lichen planus is an inflammatory condition where the immune system targets the skin, and sometimes the nails and the lining of the mouth. On the skin it shows up as flat-topped, itchy bumps. When the same process reaches the hair follicle on the scalp it is called lichen planopilaris, and that form can scar. Not everyone with lichen planus develops scalp involvement, but scalp symptoms such as burning, tenderness or scale around individual hairs are worth reading under magnification promptly, because early inflammation is the part we can still influence. At Nina Ross Hair Therapy in Sandy Springs we look at the scalp at 200x and coordinate care around what your skin is already telling us. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Itchy flat purple bumps on my skin", clinical: "Violaceous flat-topped papules" },
      { herWords: "White lacy lines inside my mouth", clinical: "Wickham striae, oral lichen planus" },
      { herWords: "My nails are ridged or splitting", clinical: "Longitudinal nail ridging or pterygium" },
      { herWords: "My scalp burns in one spot", clinical: "Localized trichodynia" },
      { herWords: "Scale right at the base of the hairs", clinical: "Perifollicular scale, follicular involvement" },
    ],
    causes: [
      {
        title: "Immune-mediated inflammation",
        body: "Immune cells target the basal layer of the skin. When the follicle is involved, the same process affects the region the follicle needs to rebuild itself.",
      },
      {
        title: "Medication and infection associations",
        body: "Some medications and infections have been described alongside lichen planus reactions. Bring your full medication list, and never stop a prescription on your own.",
      },
      {
        title: "Stress as an aggravator",
        body: "Flares are commonly reported during periods of high stress, which is part of why the systemic picture matters here.",
      },
    ],
    treatmentApproach:
      "On the scalp our work is calming the inflammation and protecting follicles that are still open, using light-based therapy and a restorative program. We coordinate with the care you are already receiving for skin, nail or oral involvement, and we track the scalp with photographs.",
    relatedTreatments: [],
    relatedConcerns: ["lichen-planopilaris", "ccca", "alopecia-areata"],
    faq: [
      {
        q: "Does lichen planus always cause hair loss?",
        a: "No. Many people have skin, nail or mouth involvement and never develop scalp symptoms. It is the follicular form, lichen planopilaris, that affects hair.",
      },
      {
        q: "How do I know if it has reached my scalp?",
        a: "Burning, tenderness, redness at the base of hairs or fine scale wrapped around individual hairs are the signs to have looked at under magnification.",
      },
      {
        q: "Can the hair come back?",
        a: "If the follicle has scarred, no. If it is inflamed and still open, protecting it is realistic work.",
      },
      {
        q: "Should I stop a medication that might be linked?",
        a: "Never stop a prescription on your own. Bring your list to your visit and talk with your prescriber. We will work with what your care team decides.",
      },
      {
        q: "Do you handle this in-house?",
        a: "The scalp side, yes. Everything we do for your hair and scalp happens here.",
      },
    ],
    keywords: ["lichen planus", "lichen planus hair loss", "scalp lichen planus"],
    category: "autoimmune",
    variant: "standard",
    infoGain: {
      heading: "Reading Follicular Involvement Before The Patch Appears",
      body: [
        "The useful window with lichen planus on the scalp is the period when symptoms exist and visible loss does not.",
        "At 200x we look for redness ringing the follicle and scale that travels up the hair shaft rather than sitting loose on the scalp, which is what separates this from ordinary flaking.",
        "Finding that early is the difference between protecting follicles and documenting their loss.",
      ],
    },
    culturalCompetencyAngle:
      "On deeper skin tones lichen planus often heals to dark marks rather than red ones, and that is regularly misread. We assess with magnification and we do not dismiss what you have been feeling.",
    toneNotes: "Educational, careful, coordinate rather than override.",
    clinicallyReviewed: true,
  },

  /* --------------------------------------------------- HORMONAL HAIR LOSS */
  {
    slug: "hormonal-hair-loss",
    title: "Hormonal Hair Loss",
    metaTitle: "Which Hormone Controls Hair Growth? A Clear Answer",
    metaDescription:
      "Estrogen, thyroid hormone, DHT and cortisol are the four that matter most for hair growth. What each one does, what happens when it shifts, and how we read it. Serving all of Metro Atlanta.",
    h1: "Which Hormones Control Hair Growth, And What Happens When They Shift",
    shortDescription: "Four hormones do most of the work. When they move, your hair reports it.",
    overview:
      "Four hormones do most of the work in hair growth: estrogen, thyroid hormone, DHT and cortisol. Estrogen holds hair in its growth phase, which is why hair often feels thickest in pregnancy and thinner after birth or through menopause. Thyroid hormone sets the pace of the growth cycle, so both an underactive and an overactive thyroid can cause shedding. DHT, a derivative of testosterone, shrinks sensitive follicles at the crown and temples over time. Cortisol, your stress hormone, pushes hairs out of growth and into shedding early. Hormonal hair loss usually looks like diffuse thinning through the top and a widening part rather than a bald patch. At Nina Ross Hair Therapy in Sandy Springs we read your scalp at 200x and look at the systems behind it. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My part keeps getting wider", clinical: "Diffuse central thinning" },
      { herWords: "My ponytail is half the size it was", clinical: "Reduced overall density and hair caliber" },
      { herWords: "I shed for months after something changed", clinical: "Telogen shift following hormonal change" },
      { herWords: "My hairline at the temples is receding", clinical: "Androgen-sensitive frontotemporal loss" },
      { herWords: "New hair on my chin or jaw", clinical: "Terminal facial hair with androgen excess" },
    ],
    causes: [
      {
        title: "Estrogen shifts",
        body: "Postpartum, perimenopause and menopause all lower estrogen support for the growth phase, so more hairs enter shedding at the same time.",
      },
      {
        title: "Thyroid function",
        body: "Both underactive and overactive thyroid disrupt the growth cycle. Thyroid-related shedding is diffuse rather than patchy.",
      },
      {
        title: "DHT sensitivity",
        body: "DHT miniaturizes sensitive follicles. It is inherited sensitivity, not the amount of hormone alone, that determines who thins.",
      },
      {
        title: "Cortisol and chronic stress",
        body: "Sustained cortisol pushes follicles out of growth early. It shows up as a shedding wave a few months after the stressful period.",
      },
    ],
    treatmentApproach:
      "We start by seeing which pattern your scalp actually shows at 200x, since diffuse thinning, miniaturization and shedding look different under magnification. From there care combines a restorative program, nutrient support where your labs point to it, and light-based therapy. Functional medicine work happens in-house alongside the scalp work.",
    relatedTreatments: [],
    relatedConcerns: ["pcos-hair-loss", "postpartum-hair-loss", "excess-dht", "female-hair-loss"],
    faq: [
      {
        q: "Which hormone is most responsible for hair loss?",
        a: "There is no single one. For thinning at the crown and temples, DHT sensitivity leads. For sudden shedding, thyroid, estrogen and cortisol are the usual suspects. Which one is driving yours is what we are looking for.",
      },
      {
        q: "Will it grow back if my hormones settle?",
        a: "Shedding driven by a hormonal shift often recovers once the shift passes. Miniaturization from DHT behaves differently and needs ongoing support to hold ground.",
      },
      {
        q: "Do I need labs?",
        a: "Often, yes. Your scalp tells us the pattern and your labs tell us the driver. We handle that work in-house.",
      },
      {
        q: "Is hormonal thinning different in Black women?",
        a: "The mechanism is the same. What differs is that hormonal thinning frequently sits on top of tension or inflammation from styling, and both need to be read together, not blamed on one another.",
      },
      {
        q: "How long before I can tell anything is changing?",
        a: "Hair grows slowly, so we measure with standardized photos at the same points rather than asking you to judge by feel.",
      },
    ],
    keywords: ["hormonal hair loss", "which hormone controls hair growth", "menopause hair loss", "thyroid hair loss"],
    category: "hormonal",
    variant: "ctr-capture",
    infoGain: {
      heading: "Reading Hormonal Thinning At 200x",
      body: [
        "Hormonal thinning has a signature under magnification: hairs of noticeably different thicknesses sitting side by side in the same area, which is called variability in shaft caliber.",
        "That single finding separates hormonal miniaturization from a plain shedding episode, where the hairs that remain are all still full thickness.",
        "We compare the crown against the back of your head, since the back is usually spared. That contrast is the fastest way to see what is happening.",
      ],
    },
    culturalCompetencyAngle:
      "Black women are frequently told a widening part is a styling problem. It can be both. We read tension patterns and hormonal patterns as separate findings, and we tell you which one your scalp is actually showing.",
    toneNotes: "Answer the literal search question in sentence one. Clear, practical, no hedging.",
    citations: [{ label: "Hormonal effects on hair follicles", pmid: "31608498" }],
    firstViewportLink: { label: "See how our functional medicine work fits in", href: "/functional-medicine" },
    clinicallyReviewed: true,
  },

  /* -------------------------------------------------------- PCOS HAIR LOSS */
  {
    slug: "pcos-hair-loss",
    title: "PCOS Hair Loss",
    metaTitle: "PCOS Hair Loss: Why It Thins on Top and Grows Elsewhere",
    metaDescription:
      "PCOS thins hair at the crown while adding it to the face and body. Why that happens, what to read at 200x, and how we approach it in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "PCOS Hair Loss: Why It Thins On Top And Grows Elsewhere",
    shortDescription: "Higher androgens thin the crown and thicken hair where you did not ask for it.",
    overview:
      "Polycystic ovary syndrome raises androgen activity, and androgens affect scalp hair and body hair in opposite directions. On the scalp, follicles at the crown and along the part are sensitive to DHT and gradually produce finer, shorter hairs. On the face, chin, chest and abdomen, the same androgens push soft hair to become coarse and pigmented. Insulin resistance frequently sits underneath the picture and raises androgen activity further, which is why PCOS hair loss rarely responds to scalp products alone. At Nina Ross Hair Therapy in Sandy Springs we read the crown at 200x for miniaturization and work the metabolic side in-house at the same time. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Thinning right down my part", clinical: "Central pattern miniaturization" },
      { herWords: "Coarse hair on my chin and jaw", clinical: "Hirsutism in androgen-dependent areas" },
      { herWords: "Irregular or missing periods", clinical: "Oligomenorrhea or amenorrhea" },
      { herWords: "Weight that will not move", clinical: "Insulin resistance features" },
      { herWords: "Breakouts along my jawline", clinical: "Androgen-pattern acne" },
    ],
    causes: [
      {
        title: "Androgen excess",
        body: "Higher circulating androgens convert to DHT, which shortens the growth phase of sensitive scalp follicles cycle after cycle.",
      },
      {
        title: "Insulin resistance",
        body: "Insulin resistance increases ovarian androgen production and lowers the protein that binds androgens, so more of them stay active.",
      },
      {
        title: "Chronic low-grade inflammation",
        body: "Inflammation associated with PCOS adds to the load on the follicle, which is one reason the scalp can feel irritated as well as thin.",
      },
    ],
    treatmentApproach:
      "Scalp work and metabolic work run together here. We document miniaturization at the crown at 200x, use a restorative program to support the follicles, and address nutrient status and insulin-related drivers in-house rather than sending you elsewhere.",
    relatedTreatments: [],
    relatedConcerns: ["hormonal-hair-loss", "excess-dht", "female-hair-loss"],
    faq: [
      {
        q: "Will treating my PCOS regrow my hair?",
        a: "Improving the driver gives the follicle a better environment, and that matters. Follicles that have already miniaturized need direct scalp support as well, which is why we do both.",
      },
      {
        q: "Why is hair growing on my face while it thins on my head?",
        a: "Androgens act in opposite directions depending on the follicle. Scalp follicles at the crown shrink under DHT. Facial follicles grow coarser under the same signal.",
      },
      {
        q: "Do I need bloodwork?",
        a: "It helps a great deal. Your scalp shows the pattern, your labs show the driver, and we handle that work in-house.",
      },
      {
        q: "Can I do anything about the shedding while I wait?",
        a: "Yes. Protecting the scalp from added tension and inflammation while the metabolic side is addressed is real, useful work.",
      },
      {
        q: "How is this different from regular female pattern loss?",
        a: "The scalp pattern can look similar. The difference is what is fueling it, and that changes the plan.",
      },
    ],
    keywords: ["pcos hair loss", "pcos thinning hair", "androgen hair loss", "insulin resistance hair"],
    category: "hormonal",
    variant: "standard",
    infoGain: {
      heading: "Crown Versus Back Of Head: The Comparison That Settles It",
      body: [
        "DHT-driven thinning is regional. The crown and part respond, the back and sides usually do not.",
        "We capture both at 200x in the same session. When the crown shows mixed hair thicknesses and the back shows uniform ones, that contrast is the finding.",
        "It also gives you a baseline that makes future visits measurable rather than subjective.",
      ],
    },
    culturalCompetencyAngle:
      "PCOS is underdiagnosed in Black women, and hair changes are often the first thing noticed and the last thing taken seriously. Bring what you have noticed. It counts as data here.",
    toneNotes: "Validating, systems-minded, avoid weight shaming entirely.",
    clinicallyReviewed: true,
  },

  /* ----------------------------------------------------------- EXCESS DHT */
  {
    slug: "excess-dht",
    title: "Excess DHT",
    metaTitle: "Excess DHT and Hair Loss: How to Tell If It's Yours",
    metaDescription:
      "DHT shrinks sensitive follicles at the crown and temples. How to tell if DHT is driving your thinning, and what we look for at 200x. Sandy Springs, serving all of Metro Atlanta.",
    h1: "Excess DHT And Hair Loss: How To Tell If It Is Yours",
    shortDescription: "The hormone behind pattern thinning, and how to tell if it is your driver.",
    overview:
      "DHT, or dihydrotestosterone, is made from testosterone by an enzyme called 5-alpha reductase. In follicles that are genetically sensitive to it, DHT shortens the growth phase a little more with every cycle. The hair those follicles produce gets finer, shorter and lighter until it stops surfacing. This is why DHT-driven loss follows a pattern at the crown, part and temples while the back and sides stay dense. Sensitivity matters more than the amount of hormone circulating, so normal lab values do not rule DHT out. The reliable read is what the follicles look like under magnification. We do that at 200x at Nina Ross Hair Therapy in Sandy Springs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "The hair on top is finer than the back", clinical: "Regional miniaturization" },
      { herWords: "My temples are moving back", clinical: "Frontotemporal recession" },
      { herWords: "Hairs are shorter and will not grow long", clinical: "Shortened anagen phase" },
      { herWords: "I can see scalp through the top in bright light", clinical: "Reduced density over the vertex" },
      { herWords: "It runs in my family", clinical: "Inherited androgen sensitivity" },
    ],
    causes: [
      {
        title: "Inherited follicle sensitivity",
        body: "The receptor sensitivity of your follicles is inherited. Two people with identical hormone levels can have entirely different outcomes.",
      },
      {
        title: "5-alpha reductase activity",
        body: "This enzyme converts testosterone to DHT locally in the scalp, so activity at the follicle matters more than the number on a blood panel.",
      },
      {
        title: "Conditions that raise androgen activity",
        body: "PCOS and insulin resistance increase androgen activity, which increases the DHT load reaching sensitive follicles.",
      },
    ],
    treatmentApproach:
      "We document miniaturization at 200x and compare the affected zone to the back of your head, which gives us your baseline. Care combines a restorative program with growth signal therapy for follicles that are still producing, plus attention to the systemic drivers that raise androgen activity.",
    relatedTreatments: [],
    relatedConcerns: ["male-pattern-baldness", "female-hair-loss", "pcos-hair-loss", "hormonal-hair-loss"],
    faq: [
      {
        q: "My testosterone came back normal. Can DHT still be my problem?",
        a: "Yes. Sensitivity at the follicle is the deciding factor, and that does not show up on a standard panel. The scalp read is what answers it.",
      },
      {
        q: "Can miniaturized follicles come back?",
        a: "A miniaturized follicle is still alive, so there is something to work with. A follicle that has stopped producing entirely for years is a much harder ask, and we will tell you honestly which you have.",
      },
      {
        q: "Is this the same thing as male pattern baldness?",
        a: "Same mechanism. Pattern baldness is what DHT sensitivity looks like when it follows the classic distribution.",
      },
      {
        q: "Will blocking DHT fix it?",
        a: "Reducing the driver helps hold ground. Follicles that have already shrunk usually need direct support as well.",
      },
      {
        q: "How do you measure progress?",
        a: "Standardized photos at the same points, comparing hair caliber over time rather than counting hairs in the sink.",
      },
    ],
    keywords: ["dht hair loss", "excess dht", "dht blocker", "androgenetic alopecia atlanta"],
    category: "hormonal",
    variant: "standard",
    infoGain: {
      heading: "Miniaturization Is Visible Before Thinning Is",
      body: [
        "Long before you see scalp, the follicles are already producing thinner hairs. That change is measurable at 200x.",
        "We look at how many hairs share a single follicular opening and how much their thicknesses vary within one small area. Both drop as DHT pressure continues.",
        "Catching that stage is the difference between holding density and trying to rebuild it.",
      ],
    },
    culturalCompetencyAngle:
      "Pattern thinning under textured hair hides behind volume until it is advanced. We look at the scalp itself rather than judging by how full your hair looks styled.",
    toneNotes: "Technical but plain. No product promises.",
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------------ FEMALE HAIR LOSS */
  {
    slug: "female-hair-loss",
    title: "Female Hair Loss",
    metaTitle: "Female Hair Loss: Why It's Thinning and What Reverses It",
    metaDescription:
      "Female pattern hair loss explained: the widening part, thinner ponytail, and what is still reversible. Read at 200x in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "Female Hair Loss: Why It Is Thinning And What Reverses It",
    shortDescription: "The widening part and the thinner ponytail, explained honestly.",
    overview:
      "Female pattern hair loss thins the top of the scalp while keeping the hairline mostly intact. The earliest sign is usually the part looking wider in the mirror, or a ponytail that wraps more times than it used to. Underneath, follicles are producing progressively finer hairs rather than disappearing, which is why this is often reversible in part when it is caught early. The picture is frequently mixed: hormonal miniaturization sitting alongside a shedding episode, nutrient depletion or tension from styling. Sorting which is which is the entire job, because each one needs different work. We read your scalp at 200x at Nina Ross Hair Therapy in Sandy Springs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My part looks wider than it used to", clinical: "Widening midline part, Christmas tree pattern" },
      { herWords: "My ponytail wraps an extra time", clinical: "Reduced bulk density" },
      { herWords: "The front feels see-through in the light", clinical: "Frontal accentuation of central thinning" },
      { herWords: "My hairline is still fine, it is the top", clinical: "Preserved frontal hairline" },
      { herWords: "I shed handfuls in the shower", clinical: "Concurrent telogen shedding" },
    ],
    causes: [
      {
        title: "Androgen sensitivity",
        body: "Sensitive follicles at the top of the scalp shrink over successive cycles, producing hair that is finer and shorter each time.",
      },
      {
        title: "Hormonal transitions",
        body: "Postpartum, perimenopause and menopause change how much support the growth phase gets, which frequently unmasks thinning that was already underway.",
      },
      {
        title: "Nutrient status",
        body: "Iron stores, vitamin D and protein intake all affect what the follicle can build. These are checkable and correctable.",
      },
      {
        title: "Tension and inflammation",
        body: "Styling tension and an irritated scalp add load on top of everything else. We read that as a separate finding rather than the automatic explanation.",
      },
    ],
    treatmentApproach:
      "We separate the layers first: miniaturization, shedding, tension and inflammation each look different at 200x. Then we treat in order, usually calming the scalp, supporting the systems your labs flag, and using growth signal therapy and microneedling for follicles that are still producing.",
    relatedTreatments: [],
    relatedConcerns: ["hormonal-hair-loss", "telogen-effluvium", "excess-dht", "traction-alopecia"],
    faq: [
      {
        q: "Is female hair loss reversible?",
        a: "Partly, and it depends on the stage. Follicles that are producing fine hair can often be pushed back toward thicker hair. Follicles that stopped producing years ago are a much harder ask, and we will tell you which you have.",
      },
      {
        q: "Why is my hairline fine but the top is thin?",
        a: "That distribution is characteristic of female pattern loss. The follicles at the top are more androgen-sensitive than the ones along your hairline.",
      },
      {
        q: "Could this just be stress?",
        a: "Stress shedding and pattern thinning look different under magnification and often occur together. That is exactly what the scalp read sorts out.",
      },
      {
        q: "Do I have to cut my hair or change my style?",
        a: "No. We will tell you what is adding tension, and then we work with the hair you actually want to wear.",
      },
      {
        q: "How long before anything changes?",
        a: "Hair grows on its own schedule, so we photograph the same points each visit and compare rather than guess.",
      },
    ],
    keywords: ["female hair loss", "female pattern hair loss", "women thinning hair atlanta", "widening part"],
    category: "hormonal",
    variant: "standard",
    infoGain: {
      heading: "Separating Shedding From Thinning At 200x",
      body: [
        "Shedding and thinning feel identical to you and look completely different to us.",
        "In shedding, the hairs still on your head are full thickness and there are simply fewer of them. In pattern thinning, the remaining hairs vary widely in thickness within the same square centimeter.",
        "When both are present, we treat the shedding driver first, because that is the part that moves fastest.",
      ],
    },
    culturalCompetencyAngle:
      "Black women are routinely told the problem is their styling before anyone has looked at the scalp. We look first. Relaxers, braids, locs, weaves and heat are welcome history, not a verdict.",
    toneNotes: "Warm, specific, no blame, no promises.",
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------ MALE PATTERN BALDNESS */
  {
    slug: "male-pattern-baldness",
    title: "Male Pattern Baldness",
    metaTitle: "Male Pattern Baldness: How Fast, and What Slows It",
    metaDescription:
      "Male pattern baldness explained: the timeline, why the back is spared, and what actually slows it. Read at 200x in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "Male Pattern Baldness: How Fast, And What Slows It",
    shortDescription: "Predictable pattern, variable speed. The earlier you read it, the more you keep.",
    overview:
      "Male pattern baldness is DHT-driven miniaturization following a predictable distribution: the temples recede, the crown thins, and the back and sides stay dense because those follicles are not androgen-sensitive. Speed varies widely. Some men lose noticeable density in two or three years, others hold a stable pattern for a decade. What determines your pace is inherited follicle sensitivity, which is why family history is useful information. The practical point is that follicles producing fine hair can still be supported, while follicles that stopped producing years ago cannot be argued back. Reading your crown at 200x tells us which stage you are in. Nina Ross Hair Therapy is in Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My hairline is going back at the corners", clinical: "Frontotemporal recession" },
      { herWords: "There is a thin spot at my crown", clinical: "Vertex miniaturization" },
      { herWords: "The back is still thick", clinical: "Androgen-insensitive occipital donor zone" },
      { herWords: "My hair will not grow past a certain length up top", clinical: "Shortened anagen phase" },
      { herWords: "My line is patchy when I get a fade", clinical: "Reduced density visible at short lengths" },
    ],
    causes: [
      {
        title: "Inherited DHT sensitivity",
        body: "The follicles you inherited determine which zones respond to DHT and how quickly they shrink.",
      },
      {
        title: "Age and cumulative exposure",
        body: "Each growth cycle under DHT pressure produces a slightly finer hair, so the pattern deepens over years rather than months.",
      },
      {
        title: "Metabolic and stress load",
        body: "Insulin resistance, poor sleep and sustained stress do not cause the pattern, but they can speed up how fast it shows.",
      },
    ],
    treatmentApproach:
      "We map the crown and hairline at 200x and set a baseline you can measure against. Care combines growth signal therapy and microneedling where follicles are still producing. Where a zone is no longer producing, we will say so plainly.",
    relatedTreatments: [],
    relatedConcerns: ["excess-dht", "seborrheic-dermatitis", "telogen-effluvium"],
    faq: [
      {
        q: "How fast will I lose it?",
        a: "Nobody can tell you a date. What we can do is measure your current stage at 200x and re-measure it, so your actual pace becomes visible instead of theoretical.",
      },
      {
        q: "Is it too late for me?",
        a: "If the area is producing fine hair, there is something to work with. If it has been smooth for years, honest options change. We will tell you which situation you are in.",
      },
      {
        q: "Why does the back never go?",
        a: "Those follicles are not sensitive to DHT. That is the same reason the back is used as the donor area in transplant surgery.",
      },
      {
        q: "Does wearing a cap or a durag cause this?",
        a: "No. Pattern baldness is inherited follicle sensitivity, not a headwear problem.",
      },
      {
        q: "Do you work with Black men specifically?",
        a: "Yes. Textured hair and Black clients are the center of this practice, and everything is handled in-house.",
      },
    ],
    keywords: ["male pattern baldness", "men hair loss atlanta", "receding hairline", "crown thinning men"],
    category: "hormonal",
    variant: "standard",
    infoGain: {
      heading: "Your Donor Zone Is The Control Group",
      body: [
        "We photograph the back of your head at 200x alongside the crown at every visit.",
        "The back is not androgen-sensitive, so it functions as your personal control. Comparing crown hair caliber against donor hair caliber quantifies how far the pattern has actually moved.",
        "That comparison also tells us when a treatment is holding ground, which raw density counts do not.",
      ],
    },
    culturalCompetencyAngle:
      "For Black men the first sign is often an uneven line at the fade or thinning at the crown that the barber notices first. Family pattern matters, and being told nothing can be done is not the same as nothing being possible. We look, then we tell you the truth.",
    toneNotes: "Straight talk, peer to peer, zero pressure.",
    citations: [{ label: "Androgenetic alopecia: an update", pmid: "32003879" }],
    clinicallyReviewed: true,
  },

  /* ---------------------------------------------------- POSTPARTUM SHEDDING */
  {
    slug: "postpartum-hair-loss",
    title: "Postpartum Hair Loss",
    metaTitle: "Postpartum Hair Loss: When It Stops and What Helps",
    metaDescription:
      "Postpartum shedding explained: why it starts around three months, when it settles, and what actually helps. Sandy Springs trichology, serving all of Metro Atlanta.",
    h1: "Postpartum Hair Loss: When It Stops And What Helps",
    shortDescription: "The shedding that starts around month three. It is real, and it does end.",
    overview:
      "During pregnancy, higher estrogen keeps more hairs than usual in their growth phase, so shedding slows and hair feels thicker. After birth, estrogen drops and all of those held hairs move into shedding together. That is why the loss typically begins around two to four months postpartum and can feel alarming. For most people it settles within six to twelve months, and the hairline regrows a fringe of short new hairs on the way back. What can keep it going longer is low iron, thyroid changes after birth, breastfeeding demands, or very little sleep. Those are checkable. We read your scalp at 200x at Nina Ross Hair Therapy in Sandy Springs and look at the systems behind it. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Handfuls come out in the shower", clinical: "Acute telogen shedding" },
      { herWords: "It started a few months after I gave birth", clinical: "Delayed onset, two to four months postpartum" },
      { herWords: "Short baby hairs all along my hairline", clinical: "Regrowth fringe of new anagen hairs" },
      { herWords: "My part looks thinner overall", clinical: "Diffuse reduction in density" },
      { herWords: "It has been more than a year", clinical: "Chronic telogen effluvium, needs investigation" },
    ],
    causes: [
      {
        title: "Estrogen drop after delivery",
        body: "The hairs pregnancy held in growth all shift into shedding at once. This is the main driver and it is self-limiting.",
      },
      {
        title: "Iron and nutrient depletion",
        body: "Pregnancy, blood loss at delivery and breastfeeding all draw down iron stores, and low ferritin keeps shedding going after the hormonal wave passes.",
      },
      {
        title: "Postpartum thyroid changes",
        body: "Thyroid function shifts after birth for some people. It is easy to test and worth ruling in or out when shedding runs long.",
      },
      {
        title: "Sleep and stress load",
        body: "Sustained cortisol from broken sleep keeps follicles cycling out early, which stretches the recovery.",
      },
    ],
    treatmentApproach:
      "If you are inside the normal window and your labs are clean, we will tell you that and save you money. When the shedding is running long, we look at iron, thyroid and nutrient status in-house, support the follicle with a restorative program, and photograph your hairline so the regrowth fringe is visible to you before it is obvious in the mirror.",
    relatedTreatments: [],
    relatedConcerns: ["telogen-effluvium", "hormonal-hair-loss", "traction-alopecia"],
    faq: [
      {
        q: "When does postpartum shedding stop?",
        a: "Most people see it settle between six and twelve months after birth. If you are past a year and still shedding heavily, that is worth investigating rather than waiting out.",
      },
      {
        q: "Will my hair come back the same?",
        a: "Usually density returns close to your baseline. The regrowth arrives as short fine hairs first, especially around the hairline.",
      },
      {
        q: "Should I take a hair vitamin?",
        a: "Only if it addresses something you are actually low in. Guessing wastes money and can mask what is really going on.",
      },
      {
        q: "Is it safe to come in while breastfeeding?",
        a: "Yes. The scalp read and your report involve nothing that interferes with feeding, and we plan around what is appropriate for you.",
      },
      {
        q: "Can I wear braids or a protective style through it?",
        a: "Yes, with light tension. Shedding hair is fragile, and we will show you where tension is landing on your scalp.",
      },
    ],
    keywords: ["postpartum hair loss", "hair shedding after baby", "postpartum shedding atlanta"],
    category: "hormonal",
    variant: "standard",
    infoGain: {
      heading: "The Regrowth Fringe Is The Signal To Look For",
      body: [
        "At 200x along the hairline we look for a band of short, tapered, fully pigmented hairs, all roughly the same length.",
        "That fringe means the follicles have already restarted, even while you are still finding hair in the shower drain. Shed hair on its way out and new hair on its way in happen at the same time.",
        "If that fringe is missing after a year, that is when we start looking at iron and thyroid rather than reassuring you.",
      ],
    },
    culturalCompetencyAngle:
      "New Black mothers are often handed advice to just stop styling. That is not care. We look at your scalp, we work with the styles that make your life manageable, and we tell you what your labs say.",
    toneNotes: "Gentle, practical, reassure honestly and never oversell.",
    clinicallyReviewed: true,
  },

  /* --------------------------------------------------------- FOLLICULITIS */
  {
    slug: "folliculitis",
    title: "Scalp Folliculitis",
    metaTitle: "Scalp Folliculitis: Why Those Bumps Hurt and What Clears Them",
    metaDescription:
      "Scalp folliculitis explained: tender bumps around the follicle, what keeps them coming back, and what clears them. Sandy Springs trichology, serving all of Metro Atlanta.",
    h1: "Scalp Folliculitis: Why Those Bumps Hurt And What Clears Them",
    shortDescription: "Tender, sometimes pus-filled bumps sitting right on the follicle.",
    overview:
      "Scalp folliculitis is inflammation of the hair follicle itself. It shows up as small tender bumps, sometimes with a white head, usually with a hair coming through the center. It can sting, itch or feel sore to the touch, and it often clusters at the back of the head, along the hairline, or wherever a style sits tight. Most cases involve bacteria, yeast or occlusion from product buildup, sweat and covered hair. It is not a hygiene failure. Left running for months, repeated inflammation around the same follicles can cost you hair, which is why persistent bumps deserve a proper look. We read your scalp at 200x at Nina Ross Hair Therapy in Sandy Springs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Sore bumps with a hair in the middle", clinical: "Follicular papules and pustules" },
      { herWords: "It stings when I brush", clinical: "Follicular tenderness" },
      { herWords: "They keep coming back in the same spots", clinical: "Recurrent folliculitis" },
      { herWords: "Crusting after they pop", clinical: "Pustular rupture with crust formation" },
      { herWords: "Firm bumps at my nape that will not go", clinical: "Keloidal papules at the occipital hairline" },
    ],
    causes: [
      {
        title: "Bacterial or yeast overgrowth",
        body: "Staph species and Malassezia yeast are both common. They behave differently and respond to different care, which is why guessing is expensive.",
      },
      {
        title: "Occlusion and buildup",
        body: "Heavy product, sweat under a style, and a scalp that stays covered create the warm, occluded environment the follicle reacts to.",
      },
      {
        title: "Friction and tension",
        body: "Tight styles, helmets and repeated friction irritate the follicle opening and make recurrence more likely.",
      },
      {
        title: "Ingrown hairs",
        body: "Curved hair re-entering the skin sets off the same inflammatory response, especially at the nape and along faded edges.",
      },
    ],
    treatmentApproach:
      "We look at the bumps at 200x to see what we are dealing with, since bacterial and yeast-driven folliculitis look different at the follicle. Care usually starts with deep scalp cleansing and steam to clear buildup, light-based therapy to settle inflammation, and a routine that fits your actual styling life. Then we re-check the same area rather than assuming it cleared.",
    relatedTreatments: [],
    relatedConcerns: ["scalp-bumps", "seborrheic-dermatitis", "ccca"],
    faq: [
      {
        q: "Is folliculitis caused by not washing enough?",
        a: "No. Buildup plays a role, but so do bacteria, yeast, friction and ingrown hairs. Plenty of people with meticulous routines get it.",
      },
      {
        q: "Can folliculitis cause permanent hair loss?",
        a: "Repeated inflammation in the same follicles over a long period can damage them. That is the reason to treat persistent bumps rather than live with them.",
      },
      {
        q: "Should I pop them?",
        a: "No. That spreads the inflammation and adds crusting. Let us look at them instead.",
      },
      {
        q: "Why does it come back after antibiotics?",
        a: "Because the thing keeping it going, whether that is occlusion, yeast or friction, is still there. Clearing the flare and changing the conditions are two different jobs.",
      },
      {
        q: "Can I keep my braids in?",
        a: "Sometimes. It depends on tension and how long they have been in. We will talk it through without lecturing you.",
      },
    ],
    keywords: ["scalp folliculitis", "bumps on scalp", "folliculitis treatment atlanta", "pimples on scalp"],
    category: "inflammatory",
    variant: "frozen",
    infoGain: {
      heading: "Bacterial Versus Yeast At The Follicle",
      body: [
        "Under magnification these separate cleanly. Bacterial folliculitis tends to show discrete pustules centered on a hair with surrounding redness.",
        "Yeast-driven folliculitis tends to show more uniform small papules across an oily area, often with fine greasy scale between them.",
        "Treating one as the other is the most common reason scalp bumps keep coming back, which is why we look before we act.",
      ],
    },
    culturalCompetencyAngle:
      "Bumps at the nape and hairline are extremely common with textured hair and fades, and they are too often written off as razor bumps or poor hygiene. Neither is a diagnosis. We look at the follicle and treat what is there.",
    toneNotes: "Plain, non-judgmental, practical. This body is a clinical draft pending the frozen version.",
    draft: true,
    clinicallyReviewed: false,
  },

  /* ------------------------------------------------- SEBORRHEIC DERMATITIS */
  {
    slug: "seborrheic-dermatitis",
    title: "Seborrheic Dermatitis",
    metaTitle: "Seborrheic Dermatitis and Hair Loss: The Real Link",
    metaDescription:
      "Seborrheic dermatitis explained: greasy scale, itch, and how ongoing inflammation affects hair. Sandy Springs trichology, serving all of Metro Atlanta.",
    h1: "Seborrheic Dermatitis And Hair Loss: The Real Link",
    shortDescription: "Greasy flaking and itch that keep the scalp inflamed.",
    overview:
      "Seborrheic dermatitis is a chronic inflammatory scalp condition involving Malassezia yeast, oil production and an individual immune response. It shows up as greasy yellowish scale, redness that can be hard to see on deeper skin, and an itch that comes and goes with stress, weather and washing frequency. It does not directly destroy follicles. What it does is keep the scalp inflamed, and an inflamed scalp sheds more and holds density less well, especially when another condition is already at work underneath. Clearing the flaking and settling the inflammation is often the first step that lets everything else respond. We read your scalp at 200x at Nina Ross Hair Therapy in Sandy Springs. Serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Greasy yellow flakes", clinical: "Greasy adherent scale" },
      { herWords: "My scalp itches constantly", clinical: "Pruritus" },
      { herWords: "Worse when I am stressed or it is cold", clinical: "Seasonal and stress-linked flares" },
      { herWords: "Flaking behind my ears and my eyebrows", clinical: "Involvement of sebaceous-rich areas" },
      { herWords: "I shed more when it flares", clinical: "Inflammation-associated shedding" },
    ],
    causes: [
      {
        title: "Malassezia yeast response",
        body: "Everyone carries this yeast. Some immune systems react to its byproducts, and that reaction is the inflammation you see.",
      },
      {
        title: "Oil production",
        body: "The yeast lives on scalp oils, so oil-rich areas flare hardest. Washing less does not calm it down.",
      },
      {
        title: "Stress, weather and washing patterns",
        body: "Cold, dry seasons and high stress periods are the classic triggers. Long gaps between washes with heavy product also feed it.",
      },
    ],
    treatmentApproach:
      "We start by clearing adherent scale so the scalp can actually be seen and treated, using steam-based deep cleansing. Light-based therapy helps settle the inflammatory response. Then we look at what is underneath, because seborrheic dermatitis often sits on top of another condition and masks it.",
    relatedTreatments: [],
    relatedConcerns: ["folliculitis", "scalp-bumps", "telogen-effluvium"],
    faq: [
      {
        q: "Does seborrheic dermatitis cause baldness?",
        a: "It does not destroy follicles. It does keep the scalp inflamed, and that inflammation can increase shedding and make other hair loss worse.",
      },
      {
        q: "Is it just dandruff?",
        a: "Dandruff is the mild end of the same spectrum. When there is redness, greasy scale and real itch, it is worth treating properly.",
      },
      {
        q: "Should I wash more or less?",
        a: "It depends on your scale, your oil and your styling schedule. We will build a routine around what your scalp shows, not a generic rule.",
      },
      {
        q: "Why does it keep coming back?",
        a: "It is chronic. The goal is long stretches of control, not a one-time cure, and we are honest with you about that.",
      },
      {
        q: "Can I treat it with braids in?",
        a: "Yes, and we will adjust the approach so you are not being told to take everything down.",
      },
    ],
    keywords: ["seborrheic dermatitis", "scalp dandruff hair loss", "itchy flaky scalp atlanta"],
    category: "inflammatory",
    variant: "standard",
    infoGain: {
      heading: "What Scale Hides At 200x",
      body: [
        "Heavy scale is a screen. Until it is cleared, you cannot assess what the follicles underneath are doing.",
        "We clear it and then read the same area again in the same visit. That second read is where we regularly find early miniaturization or perifollicular inflammation that had been written off as dandruff for years.",
        "Clearing first, reading second, is the sequence that changes plans.",
      ],
    },
    culturalCompetencyAngle:
      "Redness reads as darkening rather than pink on deeper skin, so seborrheic dermatitis gets underestimated. Wash frequency with textured hair is also different by necessity, and advice that ignores that is not usable advice.",
    toneNotes: "Practical, routine-focused, respect real-life wash schedules.",
    clinicallyReviewed: true,
  },

  /* ----------------------------------------------------------- SCALP BUMPS */
  {
    slug: "scalp-bumps",
    title: "Scalp Bumps",
    metaTitle: "Bumps on the Scalp: Causes, When to Worry, Treatment",
    metaDescription:
      "Bumps on your scalp: folliculitis, seborrheic dermatitis, acne keloidalis nuchae, ingrown hairs and cysts. How to tell them apart and when they signal hair loss. Serving all of Metro Atlanta.",
    h1: "Bumps On Your Scalp: What They Are And When They Matter",
    shortDescription: "Start here if you are feeling bumps and do not know what they are.",
    overview:
      "Bumps on the scalp are a symptom, not a diagnosis, and the five common explanations behave very differently. Small tender bumps centered on a hair are usually folliculitis. Greasy flaking with irritated skin points to seborrheic dermatitis. Firm bumps at the nape that harden over time suggest acne keloidalis nuchae. Bumps after a cut or a fade are frequently ingrown hairs. A soft, smooth, movable lump under the skin is most often a cyst. What matters for your hair is whether the same follicles are inflamed month after month, because sustained inflammation is what costs density. Start by identifying which one you have. We read scalp bumps at 200x at Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Little sore bumps with a hair in them", clinical: "Follicular pustules" },
      { herWords: "Flaky patches with bumps", clinical: "Inflammatory scale with papules" },
      { herWords: "Hard bumps at the back of my neck", clinical: "Firm papules at the occipital hairline" },
      { herWords: "Bumps right after a haircut", clinical: "Post-grooming ingrown hairs" },
      { herWords: "A soft lump under the skin that moves", clinical: "Epidermoid cyst" },
    ],
    causes: [
      {
        title: "Inflammation at the follicle",
        body: "Bacteria, yeast, friction or an ingrown hair all set off the same follicular inflammation, which is why the bumps look similar to you.",
      },
      {
        title: "Occlusion and buildup",
        body: "Product, sweat and covered hair create conditions the follicle reacts to, especially at the nape and hairline.",
      },
      {
        title: "Grooming trauma",
        body: "Close cuts, razors and repeated tension irritate the follicle opening. This is mechanical, and it is fixable.",
      },
    ],
    treatmentApproach:
      "Identification comes first, because folliculitis, seborrheic dermatitis and keloidal bumps need different care. We read the bumps at 200x, clear buildup with steam-based cleansing where it is contributing, settle the inflammation with light-based therapy, and re-check the same area. If the bumps have already cost you density, we say so and show you.",
    relatedTreatments: [],
    relatedConcerns: ["folliculitis", "seborrheic-dermatitis", "ccca"],
    triage: [
      {
        name: "Folliculitis",
        body: "Small tender bumps, sometimes with a white head, each centered on a hair. Often clusters where a style sits tight.",
        href: "/concerns/folliculitis",
      },
      {
        name: "Seborrheic dermatitis",
        body: "Bumps sitting in greasy flaking with itch. The scale is the giveaway.",
        href: "/concerns/seborrheic-dermatitis",
      },
      {
        name: "Acne keloidalis nuchae",
        body: "Firm bumps at the nape and occipital hairline that harden and can join together. This one costs hair if it runs unchecked.",
        href: "/concerns/folliculitis",
      },
      {
        name: "Ingrown hairs",
        body: "Bumps appearing after a cut, fade or razor, where curved hair re-enters the skin.",
        href: "/concerns/folliculitis",
      },
      {
        name: "Cysts",
        body: "Soft, smooth, movable lumps under the skin rather than at the follicle opening. Usually not tender unless irritated.",
        href: "/concerns/scalp-bumps",
      },
    ],
    faq: [
      {
        q: "Are scalp bumps serious?",
        a: "Most are treatable and not dangerous. What matters is how long they have been active, because months of inflammation around the same follicles is what puts hair at risk.",
      },
      {
        q: "How do I tell folliculitis from ingrown hairs?",
        a: "Ingrown hairs usually appear after a cut or razor and you can often see the trapped hair. Folliculitis appears without that trigger and tends to recur in clusters. Under magnification the difference is clear.",
      },
      {
        q: "Why do I get bumps only at my nape?",
        a: "The nape takes the most friction from collars, clippers and tight styles, and hairs there curve sharply. That combination is exactly what irritates the follicle.",
      },
      {
        q: "Can I pop them or use a scrub?",
        a: "No on both. Popping spreads the inflammation and scrubbing adds trauma to an already irritated follicle.",
      },
      {
        q: "When should I come in?",
        a: "When they keep coming back, when they hurt, or when you are seeing thinning in the same area. Those three are worth looking at now.",
      },
    ],
    keywords: ["bumps on scalp", "scalp bumps causes", "painful scalp bumps", "scalp pimples atlanta"],
    category: "inflammatory",
    variant: "symptom-entry",
    infoGain: {
      heading: "When Scalp Bumps Signal Hair Loss",
      body: [
        "The question is not whether a bump is present. It is whether the follicle opening is still there.",
        "At 200x we count follicular openings in the affected area and compare them to an unaffected area on the same scalp. When openings are missing where bumps have been recurring, inflammation has already cost you follicles.",
        "That finding changes the plan from comfort to preservation, and it is the reason recurring bumps get read rather than waited out.",
      ],
    },
    culturalCompetencyAngle:
      "Bumps along the nape and fade line are extremely common with textured hair and get dismissed as razor bumps or a hygiene issue. Neither is a diagnosis, and neither is true.",
    toneNotes: "Triage-first, symptom-entry. Send people to the right page fast.",
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------------ TRACTION ALOPECIA */
  {
    slug: "traction-alopecia",
    title: "Traction Alopecia",
    metaTitle: "Traction Alopecia: Can It Be Reversed? Here's How We Tell",
    metaDescription:
      "Traction alopecia is often reversible when caught early. How trichoscopy at 200x tells reversible from scarred, with no blame for protective styling. Serving all of Metro Atlanta.",
    h1: "Traction Alopecia: Can It Be Reversed, And How We Tell",
    shortDescription: "Tension-driven loss at the edges and part lines. Often reversible early.",
    overview:
      "Yes, traction alopecia is frequently reversible when it is caught early. Tension from styling pulls repeatedly on the same follicles, and in the early stage those follicles are irritated but intact, so relieving the tension and supporting the scalp can bring the hair back. The picture changes once scarring sets in. When follicular openings are gone, that hair will not fully return, although the area around it can often be protected and improved. The way we tell the difference is trichoscopy at 200x, where we count whether the openings are still present along the hairline and part. This is not about blaming protective styling. We look at your scalp at Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "My edges are thinning", clinical: "Marginal alopecia along the frontotemporal hairline" },
      { herWords: "Little bumps after I get my hair done", clinical: "Tension-related follicular papules" },
      { herWords: "My hairline moved back", clinical: "Recession with retained fringe hairs" },
      { herWords: "It is sore for days after braids", clinical: "Post-styling scalp tenderness" },
      { herWords: "Thin lines where the parts were", clinical: "Linear loss along part lines" },
    ],
    causes: [
      {
        title: "Sustained tension",
        body: "Repeated pulling on the same follicles, from braids, weaves, extensions, tight ponytails or locs, irritates the follicle and eventually damages it.",
      },
      {
        title: "Weight and duration",
        body: "How heavy the style is and how long it stays in matter as much as how tight it feels on day one.",
      },
      {
        title: "Chemical and heat load",
        body: "A follicle already stressed by relaxers or heat is less able to tolerate tension. The combination does more than either alone.",
      },
      {
        title: "The fringe sign",
        body: "Retained fine hairs at the very front edge with loss behind them is characteristic of traction, and it helps separate it from other patterns.",
      },
    ],
    treatmentApproach:
      "First we determine reversibility by counting follicular openings at 200x along the hairline. Where openings remain, we relieve tension and use growth signal therapy and microneedling to support regrowth. Where openings are gone, we protect the surrounding area. We work with your styling life rather than against it.",
    relatedTreatments: [],
    relatedConcerns: ["ccca", "folliculitis", "female-hair-loss"],
    faq: [
      {
        q: "Can traction alopecia grow back?",
        a: "Early, very often yes. Once follicular openings are lost to scarring, that hair does not fully return, although the surrounding area can usually be protected. Trichoscopy at 200x is how we tell which stage you are in.",
      },
      {
        q: "Do I have to stop wearing braids?",
        a: "No. We look at tension, weight and duration, and we work with the styles you actually wear. Nobody here is going to tell you to give up protective styling.",
      },
      {
        q: "How long does regrowth take?",
        a: "Follicles need full growth cycles, so meaningful change is measured over months. We photograph the same points so you can see it before you can feel it.",
      },
      {
        q: "Why does it hurt after a style?",
        a: "That soreness is tension at the follicle. It is a useful early warning sign, and it should not be normal for days at a time.",
      },
      {
        q: "Is this my fault?",
        a: "No. Styling is one factor among several, and plenty of people wear the same styles without this. We are here to read your scalp, not to assign blame.",
      },
    ],
    keywords: ["traction alopecia", "thinning edges", "traction alopecia reversible", "edges hair loss atlanta"],
    category: "traumatic",
    variant: "reversibility",
    infoGain: {
      heading: "Counting Follicular Openings Is How We Answer Reversibility",
      body: [
        "Reversibility is not a guess. At 200x we count how many follicular openings remain in the affected hairline and compare them to an unaffected area of your scalp.",
        "Openings present means living follicles and real regrowth potential. Openings absent means scarring in that zone, and we say so instead of selling you hope.",
        "We map the boundary between the two, because that boundary is where treatment does the most good.",
      ],
    },
    culturalCompetencyAngle:
      "Protective styles exist for good reasons, and being told to stop is not care. Your styling history is clinical information here. We read tension patterns, tell you what we see, and build around the hair you want to wear.",
    toneNotes: "Reversibility first. Zero blame for protective styling.",
    citations: [{ label: "Traction alopecia: the root of the problem", pmid: "30312484" }],
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------------- TRICHOTILLOMANIA */
  {
    slug: "trichotillomania",
    title: "Trichotillomania",
    metaTitle: "Trichotillomania: Hair Pulling, Regrowth, and Support",
    metaDescription:
      "Trichotillomania and the scalp: what pulling does to the follicle, what regrowth looks like, and how we support the scalp without judgment. Serving all of Metro Atlanta.",
    h1: "Trichotillomania: Hair Pulling, Regrowth, And Scalp Support",
    shortDescription: "We treat the scalp. No judgment, no behavioral advice.",
    overview:
      "Trichotillomania is a body-focused repetitive behavior involving pulling hair from the scalp, brows or lashes. On the scalp it creates areas with hairs at many different lengths, irregular borders, and skin that usually looks otherwise healthy. Follicles are often intact and capable of regrowing, particularly when the area has had time without pulling, though long-standing pulling in one spot can cause lasting damage. Our role here is limited and clear: we assess the scalp, document follicle status at 200x, and support recovery of the areas that can recover. Behavioral support is its own field and belongs with the people trained for it. You will not be judged in this room. Nina Ross Hair Therapy is in Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Hairs at all different lengths in one area", clinical: "Varied hair shaft lengths within a patch" },
      { herWords: "The patch has an odd shape", clinical: "Irregular, geometric patch borders" },
      { herWords: "Broken hairs rather than smooth bald skin", clinical: "Fractured shafts at varied heights" },
      { herWords: "One side more than the other", clinical: "Asymmetric distribution, often dominant hand side" },
      { herWords: "The skin itself looks fine", clinical: "Absence of scale, erythema or scarring" },
    ],
    causes: [
      {
        title: "A body-focused repetitive behavior",
        body: "This is a recognized behavior pattern, not a character flaw or a hygiene issue. It commonly begins in adolescence and comes and goes over time.",
      },
      {
        title: "Mechanical damage to the follicle",
        body: "Repeated pulling injures the follicle. Occasional pulling usually allows recovery. Years of pulling in one spot can leave lasting change.",
      },
      {
        title: "Secondary scalp irritation",
        body: "Broken hairs and repeated trauma can leave the area irritated or prone to bumps, and that part we can treat directly.",
      },
    ],
    treatmentApproach:
      "We assess follicle status at 200x so you know which areas are intact and which have been changed. From there we support the scalp with a restorative program and, where appropriate, microneedling to encourage recovery in areas that have had rest. We do not offer behavioral guidance, and we will never ask you to explain yourself.",
    relatedTreatments: [],
    relatedConcerns: ["alopecia-areata", "traction-alopecia", "anagen-effluvium"],
    faq: [
      {
        q: "Will my hair grow back?",
        a: "Where follicles are intact, regrowth is common once an area has rest. Long-standing pulling in one spot can cause lasting change, and the scalp read tells us which you have.",
      },
      {
        q: "Will you ask me about my pulling?",
        a: "Only what is needed to read your scalp accurately, such as which areas and roughly how long. Nothing more.",
      },
      {
        q: "How is this different from alopecia areata?",
        a: "Alopecia areata patches are smooth with skin at one level. Pulling leaves hairs at many different lengths with irregular borders. At 200x they are easy to tell apart.",
      },
      {
        q: "Should I be seeing someone else too?",
        a: "Behavioral support is a separate field with its own trained professionals, and many people find it valuable. We handle the scalp side here.",
      },
      {
        q: "Can I come in even if I am still pulling?",
        a: "Yes. Knowing your follicle status now is useful regardless of where you are.",
      },
    ],
    keywords: ["trichotillomania", "hair pulling", "trichotillomania regrowth", "hair pulling atlanta"],
    category: "traumatic",
    variant: "standard",
    infoGain: {
      heading: "Reading Follicle Status Without Reading You",
      body: [
        "At 200x we document three things: whether follicular openings remain, whether new hairs are emerging, and whether shafts are fracturing at the surface.",
        "Those three findings tell us how much recovery potential an area has, and they do it without any need to discuss the behavior itself.",
        "You get a clear picture of your scalp, photographed and repeatable, and that is the whole scope of what we do here.",
      ],
    },
    culturalCompetencyAngle:
      "Pulling is rarely talked about, and it is even less often talked about in Black communities where hair carries so much weight. There is no judgment in this room and no lecture waiting for you.",
    toneNotes: "Short, warm, zero judgment, no behavioral advice, minimal sales pressure.",
    clinicallyReviewed: true,
  },

  /* -------------------------------------------------------- ANAGEN EFFLUVIUM */
  {
    slug: "anagen-effluvium",
    title: "Anagen Effluvium",
    metaTitle: "Anagen Effluvium: Sudden Hair Loss During Treatment",
    metaDescription:
      "Anagen effluvium is rapid hair loss during chemotherapy or similar treatment. What to expect, when regrowth starts, and gentle scalp support. Serving all of Metro Atlanta.",
    h1: "Anagen Effluvium: Sudden Hair Loss During Treatment",
    shortDescription: "Rapid loss during treatment. The follicles usually survive.",
    overview:
      "Anagen effluvium is hair loss that happens while follicles are actively growing, most often during chemotherapy or after certain other treatments and exposures. Because the majority of your scalp hair is in the growth phase at any moment, the loss is rapid and widespread, usually beginning within one to three weeks of treatment starting. The follicle itself is generally not destroyed. Regrowth commonly begins within a few weeks to a few months after treatment ends, and the first hair back is often a different texture or color before settling closer to your own. If you would like your scalp looked after during or after this, we are here, gently and at your pace. Nina Ross Hair Therapy, Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "It came out fast, everywhere", clinical: "Rapid diffuse loss of anagen hairs" },
      { herWords: "It started right after treatment began", clinical: "Onset within one to three weeks" },
      { herWords: "My scalp is tender or sensitive", clinical: "Scalp sensitivity during treatment" },
      { herWords: "Eyebrows and lashes went too", clinical: "Loss across other anagen-dominant sites" },
      { herWords: "It grew back curly when it was straight", clinical: "Post-treatment texture change" },
    ],
    causes: [
      {
        title: "Interruption of rapidly dividing cells",
        body: "Treatments that target fast-dividing cells also reach the cells building your hair shaft, so growing hairs break at the scalp.",
      },
      {
        title: "Radiation to the scalp area",
        body: "Localized radiation affects follicles in the treated field, and recovery there depends on the dose and field.",
      },
      {
        title: "Certain toxic exposures",
        body: "Some exposures produce the same rapid interruption of the growth phase, though this is far less common.",
      },
    ],
    treatmentApproach:
      "During treatment the priority is comfort and protection: a gentle scalp routine and nothing that adds irritation. Afterward, when your care team says it is appropriate, a restorative program and light-based therapy can support the scalp while regrowth establishes. We move at whatever pace suits you and there is no pressure here.",
    relatedTreatments: [],
    relatedConcerns: ["telogen-effluvium", "medication-hair-loss", "alopecia-areata"],
    faq: [
      {
        q: "Will my hair grow back after chemotherapy?",
        a: "In most cases the follicle is not destroyed and regrowth begins within a few weeks to a few months after treatment ends. Your oncology team knows the specifics of your regimen.",
      },
      {
        q: "Why did it come back a different texture?",
        a: "Texture and color changes after treatment are commonly reported and often settle over the following year toward something closer to your own.",
      },
      {
        q: "Can I do anything while I am still in treatment?",
        a: "Keep the scalp comfortable and unirritated. That is genuinely the useful work during this phase.",
      },
      {
        q: "When should I come see you?",
        a: "Whenever you want to. Some people come during treatment for scalp comfort, others wait until regrowth starts. Both are fine.",
      },
      {
        q: "Should I change anything about my treatment?",
        a: "No. Never adjust a prescribed treatment on your own. Those decisions belong with your oncology team.",
      },
    ],
    keywords: ["anagen effluvium", "chemotherapy hair loss", "hair loss during treatment"],
    category: "traumatic",
    variant: "standard",
    infoGain: {
      heading: "Spotting Regrowth Before The Mirror Does",
      body: [
        "At 200x, the earliest regrowth appears as fine, evenly spaced new hairs emerging from open follicles across the whole scalp rather than in patches.",
        "Seeing that pattern confirms the follicles are working again, often weeks before there is anything visible to you.",
        "For a lot of people, that confirmation is the useful thing, and it takes one visit.",
      ],
    },
    culturalCompetencyAngle:
      "Regrowth after treatment often arrives with a different curl pattern, and finding someone who knows how to care for textured regrowth should not be difficult. It is not difficult here.",
    toneNotes: "Warm, brief, zero sales pressure. Discovery panel sits lower on this page.",
    clinicallyReviewed: true,
  },

  /* --------------------------------------------------------- TELOGEN EFFLUVIUM */
  {
    slug: "telogen-effluvium",
    title: "Telogen Effluvium",
    metaTitle: "Telogen Effluvium: Why You're Shedding, and When It Stops",
    metaDescription:
      "Telogen effluvium explained: the three month delay, the usual triggers, and when shedding should stop. Read at 200x in Sandy Springs. Serving all of Metro Atlanta.",
    h1: "Telogen Effluvium: Why You Are Shedding, And When It Stops",
    shortDescription: "Sudden diffuse shedding, usually about three months after a trigger.",
    overview:
      "Telogen effluvium is a shedding episode where an unusual number of follicles shift out of growth and into their resting phase at the same time. Those hairs release together roughly two to three months later, which is why the shedding rarely lines up with the event that caused it. Common triggers include illness or fever, surgery, rapid weight loss, low iron, thyroid changes, a new medication and periods of high stress. The shedding is diffuse across the whole scalp rather than patchy, and the follicles are not damaged. Most episodes settle within three to six months once the trigger is resolved. When shedding runs longer than six months, something is still active and worth finding. We read your scalp at 200x in Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "Hair everywhere, in the shower and on my pillow", clinical: "Increased daily telogen shedding" },
      { herWords: "It is thinner all over, not in one spot", clinical: "Diffuse loss without patches" },
      { herWords: "The hairs have a little white bulb", clinical: "Club-shaped telogen root" },
      { herWords: "Something big happened a few months ago", clinical: "Two to three month latency after trigger" },
      { herWords: "It has been shedding for over six months", clinical: "Chronic telogen effluvium" },
    ],
    causes: [
      {
        title: "Illness, fever or surgery",
        body: "A significant physical stress pushes a large group of follicles into resting phase at once. The shed arrives months later.",
      },
      {
        title: "Iron and nutrient depletion",
        body: "Low ferritin is one of the most common findings behind shedding that will not stop, and it is straightforward to test.",
      },
      {
        title: "Thyroid changes",
        body: "Both underactive and overactive thyroid disturb the cycle and produce diffuse shedding.",
      },
      {
        title: "Rapid weight loss or restriction",
        body: "Sharp calorie or protein restriction tells the body to deprioritize hair. The shed follows a couple of months behind.",
      },
      {
        title: "New medications",
        body: "Several common medications can trigger a shedding episode. Bring your list, and never stop a prescription on your own.",
      },
    ],
    treatmentApproach:
      "The work is finding the trigger, because the follicles themselves are healthy. We confirm the diffuse pattern at 200x, look at iron, thyroid and nutrient status in-house, and support the follicle with a restorative program while your body catches up. If the pattern shows something other than shedding, you will know that in the same visit.",
    relatedTreatments: [],
    relatedConcerns: ["postpartum-hair-loss", "medication-hair-loss", "hormonal-hair-loss", "female-hair-loss"],
    faq: [
      {
        q: "How long does telogen effluvium last?",
        a: "Most episodes settle within three to six months after the trigger resolves. Past six months of active shedding, something is still driving it and that is worth investigating.",
      },
      {
        q: "Why is it shedding now when nothing is wrong?",
        a: "Because of the delay. The trigger was usually two to three months back, so people rarely connect the two on their own.",
      },
      {
        q: "Will my density come back?",
        a: "The follicles are not damaged, so recovery is the usual course once the driver is handled. Regrowth takes months because hair grows slowly.",
      },
      {
        q: "Is losing 100 hairs a day normal?",
        a: "That range is often quoted. What is more useful is whether your shedding changed noticeably and how long it has been running.",
      },
      {
        q: "Could this be pattern thinning instead?",
        a: "It could be both, and they look different under magnification. Sorting that out is the point of the scalp read.",
      },
    ],
    keywords: ["telogen effluvium", "sudden hair shedding", "hair falling out atlanta", "stress hair loss"],
    category: "other",
    variant: "standard",
    infoGain: {
      heading: "The Shed Hair Root Tells Us Which Phase It Left",
      body: [
        "A hair that shed from resting phase has a small pale club-shaped bulb at the end. A hair that broke has a blunt or frayed tip and no bulb at all.",
        "That single distinction separates a true shedding episode from breakage, and the two need entirely different work.",
        "We also check whether the hairs remaining on your scalp are uniform in thickness. Uniform means shedding. Mixed means pattern thinning is present too.",
      ],
    },
    culturalCompetencyAngle:
      "With textured hair, shed hair collects in the style and arrives all at once on wash day, which makes a normal amount look alarming and real shedding look ordinary. We account for wash frequency instead of counting hairs in a sink.",
    toneNotes: "Calm, mechanism-first, honest about the recovery timeline.",
    citations: [{ label: "Telogen effluvium: a review", pmid: "33278891" }],
    clinicallyReviewed: true,
  },

  /* ------------------------------------------------------ MEDICATION HAIR LOSS */
  {
    slug: "medication-hair-loss",
    title: "Medication Hair Loss",
    metaTitle: "Medication and Hair Loss: Which Ones, and What to Do",
    metaDescription:
      "Medications associated with hair loss, how the timing works, and what to do next. Never stop a prescription on your own. Sandy Springs, serving all of Metro Atlanta.",
    h1: "Medication And Hair Loss: Which Ones, And What To Do",
    shortDescription: "Which medications are associated with shedding, and the right next step.",
    overview:
      "Several widely used medications are associated with hair shedding, including some blood thinners, beta blockers, retinoids, certain antidepressants, hormonal contraceptives, thyroid medications, anticonvulsants and weight loss medications. The mechanism is usually telogen effluvium, where a group of follicles shifts into resting phase and releases about two to three months later. That delay is why people rarely connect a new prescription to the shedding that follows. The single most important thing to know: never stop or change a prescription on your own. Talk with the prescriber who knows your full picture. Meanwhile, a scalp read at 200x can confirm whether what you are seeing is shedding at all or something else running alongside it. Nina Ross Hair Therapy, Sandy Springs, serving all of Metro Atlanta.",
    symptoms: [
      { herWords: "It started a couple months after a new prescription", clinical: "Latency consistent with telogen effluvium" },
      { herWords: "Shedding all over rather than a patch", clinical: "Diffuse non-patterned loss" },
      { herWords: "More hair on the pillow and in the comb", clinical: "Increased daily shed count" },
      { herWords: "My hair feels thinner but looks normal at the roots", clinical: "Reduced density with intact follicles" },
      { herWords: "It settled after my dose changed", clinical: "Improvement following medication adjustment" },
    ],
    causes: [
      {
        title: "Telogen effluvium from a medication",
        body: "The medication pushes follicles into resting phase. The shed appears two to three months later and usually settles once the driver is addressed.",
      },
      {
        title: "The condition being treated",
        body: "Thyroid disease, autoimmune conditions and depression can all affect hair themselves, so the medication is not automatically the cause.",
      },
      {
        title: "Nutrient effects",
        body: "Some medications affect absorption of iron, zinc or B vitamins, and that depletion can extend a shedding episode.",
      },
    ],
    treatmentApproach:
      "We confirm at 200x whether this is a shedding pattern, a pattern thinning, or both, then look at nutrient status in-house. Your report gives you something concrete to bring to your prescriber, which is far more useful in that conversation than a description of what you have been noticing. Nobody here will advise you to stop a medication.",
    relatedTreatments: [],
    relatedConcerns: ["telogen-effluvium", "hormonal-hair-loss", "anagen-effluvium"],
    faq: [
      {
        q: "Which medications cause hair loss?",
        a: "Associations have been described with some blood thinners, beta blockers, retinoids, certain antidepressants, hormonal contraceptives, thyroid medications, anticonvulsants and weight loss medications. Association is not certainty for your case.",
      },
      {
        q: "Should I stop taking it?",
        a: "No. Never stop or change a prescription on your own. Bring your list and your report to the prescriber who knows your full history.",
      },
      {
        q: "How long after stopping does hair come back?",
        a: "When a medication was the driver and your prescriber makes a change, shedding commonly settles over the following three to six months, with visible density taking longer.",
      },
      {
        q: "How do I know it is the medication and not something else?",
        a: "Timing is the first clue, and the scalp read is the second. Pattern thinning and shedding look different at 200x, and plenty of people have both.",
      },
      {
        q: "What is worth doing in the meantime?",
        a: "Check nutrient status, protect the scalp from added inflammation and tension, and get a baseline so change is measurable.",
      },
    ],
    keywords: ["medication hair loss", "drug induced hair loss", "does my medication cause hair loss"],
    category: "other",
    variant: "standard",
    infoGain: {
      heading: "A Baseline Makes The Prescriber Conversation Concrete",
      body: [
        "Medication-related shedding is judged largely on timing, and timing is hard to argue from memory.",
        "We photograph the same scalp points at 200x and record hair caliber and density, so if your prescriber adjusts something, the effect is measurable rather than anecdotal.",
        "That baseline is also what rules pattern thinning in or out, which changes what you should be asking about in the first place.",
      ],
    },
    culturalCompetencyAngle:
      "Being told hair loss is a normal side effect and left there happens often, and it happens more to Black patients. Your report is documentation you can take into that appointment.",
    toneNotes: "Never advise stopping a prescription. Empower the conversation instead.",
    clinicallyReviewed: true,
  },
];

export const concernsBySlug: Record<string, Concern> = Object.fromEntries(
  concerns.map((c) => [c.slug, c]),
);

export function getConcern(slug: string): Concern | undefined {
  return concernsBySlug[slug];
}

export const concernGroups: { key: ConcernCategory; label: string; blurb: string; slugs: string[] }[] = [
  {
    key: "scarring",
    label: "Scarring",
    blurb: "Inflammation replaces the follicle with scar tissue. Early reading protects what is still alive.",
    slugs: ["ccca", "lichen-planopilaris"],
  },
  {
    key: "autoimmune",
    label: "Autoimmune",
    blurb: "The immune system interrupts the follicle. The follicle itself often survives.",
    slugs: ["alopecia-areata", "lichen-planus"],
  },
  {
    key: "hormonal",
    label: "Hormonal",
    blurb: "Estrogen, thyroid, DHT and cortisol shifts show up as thinning through the top.",
    slugs: [
      "hormonal-hair-loss",
      "pcos-hair-loss",
      "excess-dht",
      "female-hair-loss",
      "male-pattern-baldness",
      "postpartum-hair-loss",
    ],
  },
  {
    key: "inflammatory",
    label: "Inflammatory",
    blurb: "Bumps, scale and irritation that keep the scalp inflamed and the density falling.",
    slugs: ["folliculitis", "seborrheic-dermatitis", "scalp-bumps"],
  },
  {
    key: "traumatic",
    label: "Traumatic",
    blurb: "Tension, pulling or treatment interrupts follicles that were otherwise healthy.",
    slugs: ["traction-alopecia", "trichotillomania", "anagen-effluvium"],
  },
  {
    key: "other",
    label: "Other",
    blurb: "Systemic drivers that show up as shedding across the whole scalp.",
    slugs: ["telogen-effluvium", "medication-hair-loss"],
  },
];
