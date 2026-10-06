/**
 * Long-form content for treatment detail pages (/treatments/:slug).
 * Route metadata for every treatment lives in concern-treatment-map.ts.
 * Offer, CTA, credential, NAP and claim text always come from trust.ts.
 */

export type TreatmentFaq = { q: string; a: string };
export type TreatmentBlock = { heading: string; body: string[] };
export type TreatmentStep = { title: string; body: string };
export type TreatmentCitation = { label: string; href?: string };

export type TreatmentPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroParagraph: string;
  heroOutcome: string;
  clinicallyReviewed: boolean;
  quickAnswer: string;
  /** Benefit first, mechanism second. */
  benefits: { title: string; body: string }[];
  toolLine: string;
  howItWorks: { title: string; body: string }[];
  infoGain: TreatmentBlock;
  steps: TreatmentStep[];
  timeline: { heading: string; body: string[] };
  idealFor: string[];
  notRightFor: string[];
  texturedHair: string[];
  faq: TreatmentFaq[];
  citations?: TreatmentCitation[];
  /** Optional per-page section headings. Falls back to the program wording. */
  sectionTitles?: {
    benefits?: string;
    howItWorks?: string;
    steps?: string;
    idealFor?: string;
    notRightFor?: string;
    close?: string;
  };
  closeParagraph?: string;
  /** Schema fields for MedicalTherapy. */
  schema: {
    procedureType: string;
    howPerformed: string;
    preparation: string;
    followup: string;
  };
};

export const treatmentPages: Record<string, TreatmentPage> = {
  "restorative-therapy": {
    slug: "restorative-therapy",
    name: "Restorative Therapy",
    metaTitle: "Restorative Therapy: The 10-Visit Hair Regrowth Program",
    metaDescription:
      "Growth factors, microneedling, red and blue lasers, LED infrared, and targeted supplementation across ten visits, built around what your scalp showed us.",
    h1: "Restorative Therapy for Hair Loss",
    heroParagraph:
      "A ten-visit program built around what your scalp showed at 200x, rather than one protocol handed to everyone who walks in. What happens at visit four depends on what visits one through three revealed.",
    heroOutcome: "A plan that adjusts as your scalp does.",
    clinicallyReviewed: true,
    quickAnswer:
      "Restorative Therapy is a sequenced ten-visit hair regrowth program at Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta. It combines growth factors, microneedling, red and blue laser therapy, LED infrared, and targeted supplementation, and the combination is adjusted visit by visit based on what trichoscopy shows at 200x magnification. Early visits are about settling the scalp environment so later work has something stable to build on. Mid-program visits respond to what the magnified images show has changed, and later visits protect and consolidate the gains. Certified trichologists perform every hands-on treatment, and Dr. Nina Ross, ND oversees the protocols as Clinical Director. Whether the program is a fit is decided from your Hair & Body Discovery findings, not assumed.",
    benefits: [
      {
        title: "A plan that changes when your scalp changes",
        body: "Your scalp is photographed at magnification through the program, and what those images show decides what the next visit does. If inflammation settles faster than expected, the plan moves on. If it does not, we stay with it.",
      },
      {
        title: "Progress you can actually see, tracked honestly",
        body: "Standardised images from the same angles let you compare where you started with where you are, so progress is something you look at rather than something you are told about.",
      },
      {
        title: "Modalities stacked in an order that matches you",
        body: "The same five tools in a different order produce a different result. The order is chosen for your presentation, and it is explained to you before the program starts.",
      },
      {
        title: "One place, one team, start to finish",
        body: "Everything is handled in-house. The people reading your scalp are the people treating it, so nothing gets lost between the finding and the work.",
      },
    ],
    toolLine:
      "The tools themselves: growth factors, microneedling, red and blue laser therapy, LED infrared, and targeted supplementation.",
    howItWorks: [
      {
        title: "Growth factors",
        body: "Concentrated signalling proteins applied into the scalp to support follicles that are still active. They give a viable follicle a reason to move back toward its growing phase.",
      },
      {
        title: "Microneedling",
        body: "Controlled micro-channels created at a set depth in the scalp. This opens a path for what is applied afterwards to reach the layer where the follicle actually sits, instead of resting on the surface.",
      },
      {
        title: "Red and blue laser therapy",
        body: "Red wavelengths support circulation and the growing phase at the follicle. Blue wavelengths address the surface bacterial picture on scalps where that is part of the problem.",
      },
      {
        title: "LED infrared",
        body: "Gentle warmth and light used to support blood flow through the scalp and to help the tissue settle after hands-on work in the same visit.",
      },
      {
        title: "Targeted supplementation",
        body: "Support chosen for what your own findings pointed to, not a generic hair vitamin. If nothing internal is indicated, we say so rather than add something for the sake of it.",
      },
    ],
    infoGain: {
      heading: "Why The Ten Visits Run In This Order",
      body: [
        "The order is the part most people never hear explained, and it matters more than any single modality on the list. Doing the right thing at the wrong point in the sequence wastes the visit.",
        "The first visits are environment work. If trichoscopy shows redness around the follicle openings, scaling, or buildup at the base of the shaft, growth work is held back until that settles. Stimulating a follicle sitting in an inflamed environment asks it to grow in conditions it is already struggling in, so calming comes first. On a scalp that is already quiet, these early visits move faster and the growth work starts sooner.",
        "The middle visits are where the plan earns its keep. By this point there are magnified images from the same locations to compare. What we are reading is variation in shaft calibre within a small area, how many follicle openings are empty against how many are occupied, and whether the redness has changed. If miniaturisation is the dominant picture, the growth factor and microneedling side gets the emphasis. If the scalp reads as recovering, the emphasis shifts toward keeping hairs in their growing phase rather than pushing harder. If inflammation reappeared, we go back to settling it, and we tell you that we did.",
        "The later visits protect what returned. New hairs coming through are fine and easily lost again if the conditions that caused the original loss are still in play. These visits spread out, lean more on light-based and supportive work, and focus on the habits and internal factors that decide whether the gain holds after the program ends.",
        "Two things change the sequence outright. Trichoscopy showing smooth areas with no follicle openings left means that tissue has scarred, and no amount of stimulation returns hair there, so effort is redirected to the border where follicles are still present. Trichoscopy showing an even, whole-head shed rather than a patterned one means the driver is more likely internal, and the internal side is addressed alongside the scalp work rather than after it.",
      ],
    },
    steps: [
      {
        title: "Before visit one: your Discovery findings",
        body: "The program is built from what your Hair & Body Discovery showed. That is where your scalp is read at 200x and where we decide together whether this program is the right fit.",
      },
      {
        title: "Visit one: baseline and first treatment",
        body: "Standardised images are captured from set positions so every later visit compares against the same starting point. The first treatment is performed and you are shown what we are watching for.",
      },
      {
        title: "Visits two and three: settling the environment",
        body: "Work focused on the scalp surface and any inflammation present, so later growth work has stable ground. On a quiet scalp these move quickly.",
      },
      {
        title: "In the chair",
        body: "Sessions are performed by a certified trichologist. Microneedling is done at a set depth with the area prepared first. Light-based work is comfortable and warm. You can ask what is being done and why at any point.",
      },
      {
        title: "Spacing between visits",
        body: "Visits are spaced to match how scalp tissue recovers rather than to fill a calendar. Early visits sit closer together and later ones spread out.",
      },
      {
        title: "Mid-program review",
        body: "New magnified images are compared against your baseline and the remaining visits are adjusted from what they show. If something is not working, that gets said plainly and the plan changes.",
      },
      {
        title: "Visits eight to ten: consolidation",
        body: "Emphasis moves to protecting new growth and to the internal and daily factors that decide whether it holds.",
      },
      {
        title: "After the tenth visit",
        body: "You get a clear picture of what changed, what did not, and what maintenance looks like. If further work makes sense, you see what it involves and what it costs before deciding.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "Hair grows on its own schedule and no program changes that. A follicle pushed back toward its growing phase still needs months before the hair it produces is long enough to see in the mirror.",
        "The typical pattern is that shedding settles before anything looks fuller. Many people notice less hair in the brush and on wash day first, then early regrowth visible under magnification well before it is visible to the eye, then a change in how the hair looks and feels later in or after the program.",
        "Some scalps respond faster and some slower, and severity, how long the loss has been running, and what is driving it all move the timeline. Where follicles have scarred, that area does not regrow at any point, and we say so at the start rather than let you wait for something that is not coming.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: [
      "telogen-effluvium",
      "hormonal-hair-loss",
      "pcos-hair-loss",
      "female-hair-loss",
      "ccca",
      "postpartum-hair-loss",
      "medication-hair-loss",
      "anagen-effluvium",
      "trichotillomania",
    ],
    notRightFor: [
      "Advanced scarring where the follicle openings are gone. Stimulation cannot bring back a follicle that is no longer there, and we will show you on screen where that line falls on your own scalp.",
      "Presentations that need a different first step. An active scalp infection, an untreated inflammatory condition, or a clear internal driver usually needs addressing before a ten-visit program is the right use of your money.",
      "Anyone hoping for overnight density. This program works with the growth cycle, and the cycle takes months. If that timeline does not work for you, we would rather say so now.",
      "Anyone who cannot commit to the spacing. Visits landing far apart from their intended schedule changes what the program can do, and we would rather plan around your reality than watch it drift.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work itself, not just the language on the page. Microneedling depth and spacing are set with your scalp and your styling history in mind, and areas already under tension are treated with that in view rather than worked harder.",
      "We plan around protective styles instead of asking you to take them down without reason, and aftercare is written for wash days that may be weekly rather than daily.",
      "Reading a textured scalp at 200x is its own skill. Curl pattern, product history and previous chemical service all change what the magnified image looks like, and reading those images correctly is what the whole plan rests on.",
      "Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "How long does the program run?",
        a: "Ten visits, spaced to match how scalp tissue recovers rather than to a fixed calendar. Early visits sit closer together and later ones spread out, so the program usually runs across several months. You get the intended spacing in writing before you start.",
      },
      {
        q: "What happens if my scalp is not responding?",
        a: "We tell you. Magnified images from the same positions make that visible rather than a matter of opinion, and the mid-program review exists for exactly this. Sometimes the answer is adjusting the modalities, and sometimes it is that something internal needs addressing first. Either way you hear it plainly.",
      },
      {
        q: "Does every visit use every modality?",
        a: "No, and a program that did would be a schedule rather than a plan. Each visit uses what your scalp needs at that point. Early visits often skip growth work entirely if the environment needs settling first.",
      },
      {
        q: "How is this different from buying single treatments a la carte?",
        a: "Sequence and review. A single session gives you one input with nothing deciding what comes next. The program gives you a baseline, a set of images to compare against, and a plan that changes based on those comparisons. That is the part that does the work.",
      },
      {
        q: "How do I know whether I am a candidate?",
        a: "The Hair & Body Discovery decides it. Your scalp at 200x shows whether the follicles are still viable and what is holding them back, and your report puts it in writing. If the program is not the right fit, we say so and tell you what is.",
      },
    ],
    schema: {
      procedureType: "Noninvasive",
      howPerformed:
        "A sequenced ten-visit program performed by certified trichologists, combining growth factors, microneedling, red and blue laser therapy, LED infrared, and targeted supplementation, adjusted at each visit based on trichoscopy findings at 200x magnification.",
      preparation:
        "Candidacy and the starting plan are determined from a prior scalp assessment including trichoscopy at 200x magnification. No special preparation is required before treatment visits.",
      followup:
        "Visits are spaced according to scalp recovery, with standardised magnified images reviewed mid-program and at completion to guide adjustments and maintenance.",
    },
  },

  "prp-therapy": {
    slug: "prp-therapy",
    name: "PRP Therapy",
    metaTitle: "PRP for Hair Loss: How It Works and Who It Works For",
    metaDescription:
      "Platelet-rich plasma wakes up follicles that are still viable. What the sessions feel like, what results look like, and how we screen candidates first.",
    h1: "PRP Therapy for Hair Loss",
    heroParagraph:
      "PRP uses your own platelets to support follicles that can still respond. The first question is never how many sessions you need. It is whether your follicles are still in a position to answer, and that is something we look at under magnification before anyone books a series.",
    heroOutcome: "Knowing whether your follicles can still respond.",
    clinicallyReviewed: true,
    quickAnswer:
      "PRP therapy for hair loss uses platelet-rich plasma prepared from a small sample of your own blood and delivered into the scalp to support follicles that are still viable. A session involves a routine blood draw, processing the sample to concentrate the platelet fraction, and delivering that concentrate across the areas of thinning. At Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta, candidacy is screened before any series is booked, because PRP supports follicles that are still alive and does nothing for follicles that are gone. Trichoscopy at 200x magnification is what shows the difference. Certified trichologists perform every hands-on treatment, and Dr. Nina Ross, ND oversees the protocols as Clinical Director. If PRP is not the right first step for what your scalp shows, we say so.",
    benefits: [
      {
        title: "A real chance for follicles that are miniaturising",
        body: "Hairs that are getting finer visit after visit are usually still alive. PRP gives those follicles concentrated signalling from your own blood, which is the kind of support a struggling follicle can act on.",
      },
      {
        title: "Clarity on candidacy before you commit",
        body: "You find out whether your follicles can still respond before you pay for a series. That answer comes from your scalp on screen at 200x, not from an assumption about your age or your pattern.",
      },
      {
        title: "Nothing foreign introduced",
        body: "The material delivered into your scalp is prepared from your own blood, drawn the same visit and processed on site.",
      },
      {
        title: "Progress you can compare",
        body: "Images from the same positions each time let you see what changed between sessions rather than rely on memory in the bathroom mirror.",
      },
    ],
    toolLine:
      "The parts of a session: a routine blood draw, processing to concentrate the platelet fraction, and delivery into the scalp where the thinning is.",
    howItWorks: [
      {
        title: "The draw",
        body: "A small sample of blood is taken from your arm the same way it would be for routine bloodwork. It takes a couple of minutes and most people find it unremarkable.",
      },
      {
        title: "The processing",
        body: "The sample is spun so the platelet-rich fraction separates from the rest. That concentrate is what carries the signalling proteins used in the treatment.",
      },
      {
        title: "The delivery",
        body: "The concentrate is delivered into the scalp across the thinning areas at a set depth, so it reaches the layer where the follicle actually sits rather than resting on the surface.",
      },
      {
        title: "What the chair feels like",
        body: "The scalp is prepared first and comfort measures are used. Most people describe brief pressure and short stinging as each area is treated, with the scalp feeling tender and warm for the rest of the day. You can ask us to pause at any point.",
      },
    ],
    infoGain: {
      heading: "Who We Screen Out First",
      body: [
        "Most pages about PRP explain the science. Very few tell you who should not be paying for it, and that is the part that decides whether your money does anything.",
        "The first thing that rules PRP out is follicle viability. Under trichoscopy at 200x we are counting how many follicle openings still hold hair against how many sit empty, and how much the shaft calibre varies within a small area. Wide variation with openings still occupied reads as miniaturisation, and that is the picture PRP is for. Smooth areas where the openings themselves are gone read as scarred, and no amount of platelet signalling brings back a follicle that is no longer there. We show you that line on your own scalp rather than describe it.",
        "The second is an unsettled scalp. Redness around the follicle openings, scaling, pustules, or an active infection all mean the follicle is being asked to grow in conditions it is already losing in. Delivering PRP into that environment spends your session on a scalp that cannot use it, so calming comes first and PRP comes after, if it is still indicated.",
        "The third is a driver that sits outside the scalp entirely. When the shed is even across the whole head rather than patterned, the more likely cause is internal, which means thyroid, iron, hormonal shift, medication, or recovery from a stress event. Treating the scalp while that continues is spending money against a moving target. The internal side is addressed first or alongside, and we handle that in-house.",
        "The fourth is a mismatch of expectation. PRP supports a growth cycle that runs in months. If what you need is coverage for an event in a few weeks, PRP is the wrong tool and we would rather tell you that than sell you a series.",
      ],
    },
    steps: [
      {
        title: "Before anything: your Discovery findings",
        body: "Candidacy is decided from your Hair & Body Discovery. Your scalp is read at 200x on screen while you watch, and your written report follows the next day.",
      },
      {
        title: "Baseline images",
        body: "Standardised images are captured from set positions so every later session compares against the same starting point.",
      },
      {
        title: "The blood draw",
        body: "A small sample is taken from your arm at the start of the session. No fasting or special preparation is needed.",
      },
      {
        title: "Processing",
        body: "The sample is processed on site while you wait, which takes a few minutes.",
      },
      {
        title: "Scalp delivery",
        body: "The concentrate is delivered across the mapped thinning areas by a certified trichologist, working in a pattern set from your own images rather than a generic grid.",
      },
      {
        title: "Immediately after",
        body: "The scalp is usually tender, warm and a little pink for the rest of the day. You are given plain aftercare for washing, styling and heat, written for your hair rather than a generic sheet.",
      },
      {
        title: "Spacing of sessions",
        body: "Sessions are spaced to match how scalp tissue recovers and how the growth cycle moves. You get the intended spacing in writing before you start.",
      },
      {
        title: "How progress is reviewed",
        body: "New magnified images from the same positions are compared against your baseline, and what they show decides whether we continue, adjust, or stop.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "PRP works through the growth cycle, and the growth cycle does not hurry. A follicle nudged back toward its growing phase still needs months before the hair it produces is long enough to notice in the mirror.",
        "The usual pattern is that shedding settles first, then early regrowth shows under magnification well before it shows to the eye, then density and texture change later in the series or after it.",
        "How much changes depends on how much viability was there at the start, how long the loss has been running, and whether anything internal is still driving it. Where follicles have scarred, that area does not regrow at any point, and we tell you that before you start rather than let you wait for it.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: [
      "alopecia-areata",
      "traction-alopecia",
      "ccca",
      "female-hair-loss",
      "male-pattern-baldness",
      "excess-dht",
    ],
    notRightFor: [
      "Scarred areas where the follicle openings are gone. Platelet signalling needs a follicle to act on, and we will show you on screen where that line falls on your own scalp.",
      "An active scalp infection or an inflamed, scaling scalp. That environment needs calming first, and delivering PRP into it wastes the session.",
      "A whole-head shed pointing to an internal driver. Thyroid, iron, hormonal shift or medication needs addressing alongside the scalp work, and we handle that in-house.",
      "Anyone looking for the appearance of density without viability underneath. If the follicles are not there, we will say so and talk through what actually applies.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work, not the wording. Loss patterns on textured hair are mapped from your own magnified images, because tension loss along the edges and a hormonal pattern at the crown can sit on the same head and need different treatment density.",
      "Delivery near the hairline and edges is approached with the tension history of that area in mind, and areas already under strain are treated with care rather than worked harder.",
      "Aftercare is written for wash days that may be weekly rather than daily, and we plan sessions around protective styles instead of asking you to take them down without a reason.",
      "Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "Does PRP hurt?",
        a: "There is some discomfort and we will not pretend otherwise. The scalp is prepared first and comfort measures are used. Most people describe brief pressure and a short stinging as each area is treated, then tenderness and warmth for the rest of the day. Tell us as we go and we will adjust or pause.",
      },
      {
        q: "How many sessions will I need?",
        a: "That depends on what your scalp shows at 200x, how long the loss has been running and how your images change between sessions. You get the intended spacing and number in writing before you start, and we revisit it against your own images rather than push through a fixed package.",
      },
      {
        q: "Can PRP work on a shiny scarred crown?",
        a: "No. Where the scalp has gone smooth and the follicle openings are gone, the follicle is no longer there and nothing regrows it. What can be worth treating is the border, where follicles are still present and still worth protecting. We show you exactly where that line sits on your own scalp.",
      },
      {
        q: "How do you decide between PRP and exosomes?",
        a: "From your findings, not a preference. What we are weighing is how much viability the trichoscopy shows, how the scalp environment reads, your history, and what your body is doing internally. The recommendation and the reasoning are both explained to you before anything is booked.",
      },
      {
        q: "What does the Discovery show before you recommend PRP?",
        a: "Whether your follicles can still respond. Your scalp is read at 200x on screen while you watch, so you see the follicle openings, the variation in shaft thickness and the state of the surface for yourself, and your written report follows the next day. If PRP is not the right first step, that is in the report too.",
      },
    ],
    citations: [
      {
        label:
          "Gupta AK, Carviel JL. Meta-analysis of efficacy of platelet-rich plasma therapy for androgenetic alopecia. J Dermatolog Treat. 2019. PMID: 31021437.",
        href: "https://pubmed.ncbi.nlm.nih.gov/31021437/",
      },
    ],
    sectionTitles: {
      benefits: "What PRP Actually Does For You",
      howItWorks: "Draw, Process, Deliver",
      steps: "From Screening To Session To Review",
      idealFor: "Conditions PRP Is Often Considered For",
      notRightFor: "Who PRP Is Not Right For",
      close: "Find Out If Your Follicles Can Still Respond",
    },
    closeParagraph:
      "You are not committing to a series today. The first step is smaller: finding out whether your follicles can still answer, and leaving with that in writing either way.",
    schema: {
      procedureType: "Percutaneous",
      howPerformed:
        "A small sample of the client's own blood is drawn and processed to concentrate the platelet-rich fraction, which is then delivered into the scalp across mapped areas of thinning by a certified trichologist. Candidacy and treatment mapping are guided by trichoscopy at 200x magnification.",
      preparation:
        "Candidacy is determined from a prior scalp assessment including trichoscopy at 200x magnification. No fasting or special preparation is required before a session.",
      followup:
        "Sessions are spaced according to scalp recovery and the hair growth cycle, with standardised magnified images from the same positions compared against baseline to guide continuation or adjustment.",
    },
  },


  "exosome-therapy": {
    slug: "exosome-therapy",
    name: "Exosome Therapy",
    metaTitle: "Exosome Therapy for Hair: What It Does for Follicles",
    metaDescription:
      "Exosomes deliver growth signals straight to the follicle. What the treatment involves, who it suits, and how we decide whether it fits your case.",
    h1: "Exosome Therapy for Hair Loss",
    heroParagraph:
      "Exosomes carry growth signals directly to the follicle, and they are the option most people have heard about most recently. The question worth answering is not whether it is the newest thing available. It is whether your scalp is in a position to use it, and that is something we look at under magnification before anyone books a session.",
    heroOutcome: "Knowing whether the newest option is the right one for you.",
    clinicallyReviewed: true,
    quickAnswer:
      "Exosome therapy for hair loss delivers concentrated growth signalling material into the scalp to support follicles that are still viable. Exosomes are tiny vesicles that cells use to send signals to one another, and in a hair treatment they are used to deliver that signalling directly to the follicle environment. A visit involves preparing the scalp, delivering the material across mapped areas of thinning, and short aftercare, with the whole appointment usually running under an hour. It tends to be considered for diffuse thinning, patchy loss that has settled, and cases where a stronger signal is wanted than other options have delivered. At Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta, candidacy is decided after seeing your scalp at 200x magnification, because signalling only helps a follicle that is still there. Certified trichologists perform every hands-on treatment and Dr. Nina Ross, ND oversees protocols as Clinical Director.",
    benefits: [
      {
        title: "A targeted signal for follicles that can still respond",
        body: "Where follicles are miniaturising rather than gone, the limiting factor is often the signalling environment around them. Exosome therapy is aimed squarely at that environment.",
      },
      {
        title: "An answer on whether this is actually your tool",
        body: "You find out before you pay for a series whether exosomes fit your presentation or whether PRP, or something else entirely, is the better use of your money. That answer comes from your own scalp on screen, not from what is trending.",
      },
      {
        title: "A short visit with no draw",
        body: "There is no blood draw and no waiting for processing, so the appointment is short and the aftercare is simple.",
      },
      {
        title: "How it works, in one line",
        body: "The material is delivered into the scalp across the mapped thinning areas at a depth that reaches the follicle layer. It supports follicles that are still alive. It does nothing for follicles that are gone, and we will tell you which is which.",
      },
    ],
    toolLine:
      "The parts of a visit: assessment context from your own images, scalp preparation, delivery across mapped areas, and short aftercare.",
    howItWorks: [
      {
        title: "The assessment context",
        body: "Nothing is delivered before we have looked at your scalp at 200x and know where the follicles are still producing. That read sets the map for where the material goes and how densely.",
      },
      {
        title: "Preparation",
        body: "The scalp is cleaned and prepared, and comfort measures are used. Microchannelling is often used alongside delivery so the material reaches the follicle layer rather than resting on the surface.",
      },
      {
        title: "Delivery",
        body: "The material is delivered across the mapped areas by a certified trichologist, working from your own images rather than a generic grid.",
      },
      {
        title: "What the chair feels like",
        body: "Most people describe brief stinging and pressure as each area is worked, and warmth or tenderness for the rest of the day. You can ask us to pause at any point.",
      },
      {
        title: "Immediate aftercare",
        body: "The scalp stays untouched for the rest of the day, then normal washing resumes on the schedule we give you. Aftercare is written for your hair, not printed from a generic sheet.",
      },
      {
        title: "Who does the work",
        body: "Certified trichologists perform every hands-on treatment. Dr. Nina Ross, ND oversees the protocols as Clinical Director. Everything is handled in-house.",
      },
    ],
    infoGain: {
      heading: "How We Choose Exosomes Versus PRP",
      body: [
        "Both deliver signalling into the scalp, and both need a living follicle to act on. The choice between them is made from what your scalp shows, not from which one is newer.",
        "What the trichoscopy shows. When the openings are still occupied and shaft calibre varies widely within a small area, that is active miniaturisation and either option is on the table. When the surrounding scalp also reads inflamed, with redness around the openings or persistent scaling, we favour calming first and then a signalling approach, because delivering into an unsettled scalp spends the session on tissue that cannot use it. Where the openings are gone and the surface has gone smooth, neither option applies and we say so.",
        "Pattern of loss. Diffuse thinning across the whole head, where a large area needs even coverage, usually points toward exosomes, because the material is consistent in concentration across the map. A defined patterned area, such as a crown or a receding front, is well served by PRP, where the concentrate can be worked more heavily into the specific zone.",
        "Prior response. If someone has already run a PRP series and their own comparison images show little change while the follicles still read viable, we do not repeat the same input and expect a different answer. That is a common reason to move to exosomes. The reverse also happens: someone who responded to PRP and simply stopped usually restarts what already worked.",
        "Blood and health context. PRP depends on the quality of your own platelet fraction, so anaemia, certain medications and some blood conditions change what a draw can deliver. Where that is a factor, exosomes avoid the dependency entirely. Anyone who does not want a blood draw is also a straightforward case for exosomes.",
        "Cost against likely benefit. Exosomes cost more per session. Where the trichoscopy suggests a case that would respond to either, we say that plainly and let you choose, rather than steering you to the higher-priced option by default.",
        "Both recommendations, and the reasoning behind them, are explained before anything is booked. You can read more about the other option on our PRP page.",
      ],
    },
    steps: [
      {
        title: "Before anything: your Discovery findings",
        body: "Candidacy is decided from your Hair & Body Discovery. Your scalp is read at 200x on screen while you watch, and your written report follows the next day.",
      },
      {
        title: "Baseline images",
        body: "Standardised images are captured from set positions so every later review compares against the same starting point.",
      },
      {
        title: "The treatment visit",
        body: "The scalp is prepared, the material is delivered across the mapped areas by a certified trichologist, and you are out inside the hour.",
      },
      {
        title: "The rest of that day",
        body: "The scalp is usually warm and a little tender. You leave with plain aftercare covering washing, styling and heat, written for your hair.",
      },
      {
        title: "Spacing if a series is used",
        body: "Where more than one session is indicated, spacing is set to match how scalp tissue recovers and how the growth cycle moves. You get the intended spacing in writing before you start.",
      },
      {
        title: "How progress is reviewed",
        body: "New magnified images from the same positions are compared against your baseline at 200x, and what they show decides whether we continue, adjust, or stop.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "Exosome therapy works through the growth cycle, and the growth cycle sets the pace. Nothing visible happens in the first weeks, and anyone telling you otherwise is selling.",
        "The usual pattern is that shedding settles first, then early regrowth appears under magnification well before it is visible in the mirror, then density and texture change later.",
        "How much changes depends on how much viability was there at the start, how long the loss has been running, and whether anything internal is still driving it. Where follicles have scarred, that area does not regrow at any point, and we tell you that before you start rather than let you wait for it.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: ["alopecia-areata", "female-hair-loss", "telogen-effluvium"],
    notRightFor: [
      "Scarred areas where the follicle openings are gone. Signalling needs a follicle to act on, and we will show you on screen where that line falls on your own scalp.",
      "An inflamed, scaling or infected scalp. That environment needs calming first, and delivering into it wastes the session.",
      "A whole-head shed pointing to an internal driver. Thyroid, iron, hormonal shift or medication needs addressing alongside the scalp work, and we handle that in-house.",
      "Anyone choosing exosomes only because they are the newest option. Newer is not the same as better suited, and if your findings point to PRP or to something simpler, that is what we will recommend.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work, not the wording. Loss patterns on textured hair are mapped from your own magnified images, because tension loss along the edges and a hormonal pattern at the crown can sit on the same head and need different treatment density.",
      "Delivery near the hairline and edges is approached with the tension history of that area in mind, and areas already under strain are treated with care rather than worked harder. At the crown, delivery accounts for how the hair sits and parts so the whole area is reached rather than only the visible scalp.",
      "Aftercare is written for wash days that may be weekly rather than daily, for oils and butters, for wraps and bonnets. We plan sessions around protective styles instead of asking you to take them down without a reason.",
      "Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "How is this different from PRP?",
        a: "PRP is prepared from your own blood in the room, so what it delivers depends on your platelet fraction that day. Exosome therapy uses prepared signalling material, so there is no draw and no waiting. Both need a living follicle to act on. Which one we recommend comes from what your trichoscopy shows, your pattern of loss, and how you have responded to anything you have already tried.",
      },
      {
        q: "Newer usually means better, right?",
        a: "Not automatically. Newer means less long-term data, and it means a higher price per session. There are presentations where exosomes are the better fit, and there are plenty where PRP or a simpler approach does the same job for less. We will tell you which one your scalp points to, including when the answer costs us the bigger sale.",
      },
      {
        q: "How many sessions will I need?",
        a: "That depends on what your scalp shows at 200x, how long the loss has been running, and how your images change between visits. You get the intended spacing and number in writing before you start, and we revisit it against your own images rather than push through a fixed package.",
      },
      {
        q: "Who is not a candidate?",
        a: "Anyone whose follicle openings are gone in the area they want treated, because there is nothing left to signal to. Also anyone with an active scalp infection or an inflamed, scaling scalp, which needs calming first. And where an even whole-head shed points to something internal, we address that alongside rather than treating the scalp against a moving target.",
      },
      {
        q: "What does the Discovery show before you recommend exosomes?",
        a: "Whether your follicles can still respond, and which signalling option suits your pattern. Your scalp is read at 200x on screen while you watch, so you see the follicle openings, the variation in shaft thickness and the state of the surface for yourself, and your written report follows the next day. If exosomes are not the right first step, that is in the report too.",
      },
    ],
    sectionTitles: {
      benefits: "What Exosome Therapy Actually Does For You",
      howItWorks: "What A Visit Involves",
      steps: "From Findings To Session To Review",
      idealFor: "Conditions Exosome Therapy Is Often Considered For",
      notRightFor: "Who Exosome Therapy Is Not Right For",
      close: "Find Out Whether Exosomes Fit Your Case",
    },
    closeParagraph:
      "You are not committing to a series today, and you do not have to work out on your own which option is right. The first step is smaller: finding out what your scalp can still do, and leaving with that in writing.",
    schema: {
      procedureType: "Percutaneous",
      howPerformed:
        "Concentrated exosome signalling material is delivered into the scalp across mapped areas of thinning by a certified trichologist, typically alongside microchannelling so the material reaches the follicle layer. Candidacy and treatment mapping are guided by trichoscopy at 200x magnification.",
      preparation:
        "Candidacy is determined from a prior scalp assessment including trichoscopy at 200x magnification. The scalp is cleaned and prepared at the start of the visit. No fasting or special preparation is required.",
      followup:
        "Where a series is indicated, sessions are spaced according to scalp recovery and the hair growth cycle, with standardised magnified images from the same positions compared against baseline to guide continuation or adjustment.",
    },
  },

  "fusion-mesotherapy": {
    slug: "fusion-mesotherapy",
    name: "Fusion Mesotherapy",
    metaTitle: "Fusion Mesotherapy for Hair: Nutrients to the Follicle",
    metaDescription:
      "Micro-injections deliver nutrients directly into the scalp where follicles can use them. What to expect, and which conditions tend to respond.",
    h1: "Fusion Mesotherapy for Hair Loss",
    heroParagraph:
      "You can swallow the right nutrient and still have very little of it reach the follicle. When absorption or delivery is the thing holding you back, adding another bottle to the shelf does not fix it. Fusion mesotherapy places a tailored blend just under the surface of the scalp, where the follicle actually sits.",
    heroOutcome: "Getting nutrients where they can actually be used.",
    clinicallyReviewed: true,
    quickAnswer:
      "Fusion mesotherapy for hair loss uses a series of shallow micro-injections to place a tailored blend of nutrients, amino acids and supporting compounds directly into the scalp at the depth where the follicle sits. It tends to help people whose thinning is linked to nutrient status or to a scalp environment that is under-supplied, and people who have taken oral supplements for months without their images changing. A session involves mapping the areas to treat, preparing the scalp, delivering a grid of micro-injections across those areas, and short aftercare, usually inside the hour. At Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta, the blend and the candidacy follow what your scalp shows at 200x magnification and what your systems review indicates. Certified trichologists perform every hands-on treatment and Dr. Nina Ross, ND oversees protocols as Clinical Director.",
    benefits: [
      {
        title: "Nutrients arrive where the follicle can use them",
        body: "Placing the blend into the scalp removes the digestive step entirely. What is delivered is at the follicle, in the tissue, rather than depending on how much of a capsule your gut released into your bloodstream that week.",
      },
      {
        title: "A path when more pills have stopped moving anything",
        body: "If you have been consistent with supplements for months and your magnified images look the same, the problem may be delivery rather than the ingredients. This is the option built for that situation.",
      },
      {
        title: "A blend built from your findings",
        body: "The mix is chosen from what your scalp and your systems review actually showed, so you are not paying for a standard cocktail that includes things you do not need.",
      },
      {
        title: "How it works, in one line",
        body: "Shallow micro-injections deposit the blend across a mapped grid at follicle depth. It supports the environment around follicles that are still alive. It does nothing for follicles that are gone, and we will tell you which is which.",
      },
    ],
    toolLine:
      "The parts of a visit: mapping the scalp from your own images, preparation, a grid of shallow micro-injections, and short aftercare.",
    howItWorks: [
      {
        title: "Mapping the scalp",
        body: "Nothing is delivered before we know where the follicles are still producing. Your magnified images set the map: which zones get treated, how densely, and which are left alone.",
      },
      {
        title: "Preparation",
        body: "The scalp is cleaned and prepared and comfort measures are used. The blend is drawn up for your session rather than pulled from a premixed batch.",
      },
      {
        title: "The micro-injections",
        body: "A series of shallow deposits is placed across the mapped grid at a set depth so the blend sits in the layer where the follicle lives instead of resting on the surface. A certified trichologist works through the map in a consistent pattern.",
      },
      {
        title: "What the chair feels like",
        body: "Most people describe brief pinpricks and a light stinging as each area is worked, then warmth or tenderness for the rest of the day. You can ask us to pause at any point.",
      },
      {
        title: "Immediate aftercare",
        body: "The scalp is left alone for the rest of the day, then normal washing resumes on the schedule we give you. Aftercare is written for your hair rather than printed from a generic sheet.",
      },
      {
        title: "Who does the work",
        body: "Certified trichologists perform every hands-on treatment. Dr. Nina Ross, ND oversees the protocols as Clinical Director. Everything is handled in-house.",
      },
    ],
    infoGain: {
      heading: "Why Delivery Route Matters When Absorption Is The Limit",
      body: [
        "There is a gap between what you swallow and what reaches a follicle, and for some people that gap is the whole problem. Understanding where it opens is what tells us whether mesotherapy is worth your money.",
        "The first place it opens is the gut. An oral nutrient has to survive stomach acid, be released from its form, and be absorbed across the gut wall. Low stomach acid, inflammation in the gut lining, coeliac or other malabsorption, and a history of gastric surgery all reduce how much crosses. So do common medications: acid reducers taken long term change how minerals are absorbed. None of that shows up as a symptom you would connect to your hair.",
        "The second is competition and form. Minerals compete for the same transport routes, so a high dose of one taken alongside another reduces uptake of both. Form matters as much as dose, since some versions of a nutrient are absorbed far better than others, and a supplement label that looks generous can deliver very little.",
        "The third is priority once it is in the bloodstream. The body distributes nutrients by need, and hair sits low on that list. Organs that keep you alive are served before a follicle. So a level that reads as adequate in the blood can still mean the follicle is running short, which is a common and frustrating experience for people whose bloodwork keeps coming back described as normal.",
        "Placing the blend directly into the scalp skips all three. There is no digestive step, no competition for absorption, and no distribution decision that puts hair last. That is the entire argument for the delivery route.",
        "It is only an argument worth making when the follicles are still viable and when the nutrient story is genuinely part of the picture. That is why the whole-body side is reviewed first. If your systems review points to thyroid, iron handling, a hormonal shift or gut absorption as the driver, that is addressed in your whole-body plan on our functional medicine page, and mesotherapy supports it locally rather than substituting for it. Where the scalp is fine and the driver is entirely internal, we say so and start there instead.",
      ],
    },
    steps: [
      {
        title: "Before anything: your Discovery findings",
        body: "Candidacy and the blend are decided from your Hair & Body Discovery. Your scalp is read at 200x on screen while you watch, and your written report follows the next day.",
      },
      {
        title: "The whole-body context",
        body: "What your systems review points to shapes both the blend and whether anything internal needs addressing alongside the scalp work. We handle that side in-house.",
      },
      {
        title: "Baseline images",
        body: "Standardised images are captured from set positions so every later review compares against the same starting point.",
      },
      {
        title: "The treatment visit",
        body: "The scalp is mapped and prepared, the blend is delivered across the grid by a certified trichologist, and you are usually out inside the hour.",
      },
      {
        title: "The rest of that day",
        body: "The scalp is often warm, tender and a little pink. You leave with plain aftercare covering washing, styling and heat.",
      },
      {
        title: "Spacing if a series is used",
        body: "Where more than one session is indicated, spacing is set to match how scalp tissue recovers and how the growth cycle moves. You get the intended spacing in writing before you start.",
      },
      {
        title: "How progress is reviewed",
        body: "New magnified images from the same positions are compared against your baseline at 200x, and what they show decides whether we continue, adjust, or stop.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "Nutrient support works through the growth cycle, and the growth cycle sets the pace. Nothing visible happens in the first weeks.",
        "The usual pattern is that shedding settles first, then the hair coming through starts to read thicker under magnification before anything is obvious in the mirror, then overall density and texture change later.",
        "How much changes depends on how much viability was there at the start, how long the loss has been running, and whether an internal driver is still active. Where an internal driver is still running, the scalp work is working against a moving target, which is why the whole-body side is handled alongside.",
        "Where follicles have scarred, that area does not regrow at any point, and we tell you that before you start rather than let you wait for it.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: ["telogen-effluvium", "female-hair-loss", "hormonal-hair-loss"],
    notRightFor: [
      "Scarred areas where the follicle openings are gone. Nutrients need a follicle to feed, and we will show you on screen where that line falls on your own scalp.",
      "An active scalp infection or a severely irritated, scaling scalp. That has to be calmed before anything is injected into it, and delivering into inflamed tissue wastes the session.",
      "Anyone hoping this replaces addressing a systemic driver. If thyroid, iron handling, a hormonal shift or gut absorption is what is driving the shed, that needs labs and a whole-body plan. Mesotherapy supports the scalp locally while that is dealt with.",
      "Anyone who has not yet had their scalp and systems looked at. The blend is built from findings, and without them it is guesswork.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work, not the wording. The treatment map is drawn from your own magnified images, because tension loss along the edges and a hormonal pattern at the crown can sit on the same head and need different treatment density.",
      "Delivery near the hairline and edges accounts for the tension history of that area, and skin that is already under strain is treated with care rather than worked harder. At the crown, the grid follows how your hair sits and parts so the whole area is reached.",
      "Comfort is discussed before we start, not after. Tell us how the scalp is feeling as we go and we will adjust or pause.",
      "Aftercare is written for wash days that may be weekly rather than daily, for oils and butters, for wraps and bonnets. We plan sessions around protective styles instead of asking you to take them down without a reason. Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "How is this different from just taking the supplements?",
        a: "A capsule has to get through your stomach, be absorbed across the gut wall, then be distributed by a body that serves your organs before your hair. Any of those steps can be where it stalls. Placing the blend into the scalp skips all of them, so what is delivered is already at the follicle. It is worth doing when delivery is the limit, and it is not worth doing when the real driver is something internal that still needs treating.",
      },
      {
        q: "Does it hurt?",
        a: "There is some discomfort and we will not pretend otherwise. Most people describe brief pinpricks and a light stinging as each area is worked, then tenderness and warmth for the rest of the day. The scalp is prepared first and comfort measures are used. Tell us as we go and we will adjust or pause.",
      },
      {
        q: "How many sessions will I need?",
        a: "That depends on what your scalp shows at 200x, what your systems review points to, and how your images change between visits. You get the intended spacing and number in writing before you start, and we revisit it against your own images rather than push through a fixed package.",
      },
      {
        q: "When would you choose IV nutrients instead?",
        a: "When the shortfall is whole-body rather than local. If the picture is an even shed across your whole head with a systemic driver behind it, getting your levels up matters more than what is happening in one patch of scalp. Where both apply, the two work together. The recommendation comes from your findings and we explain the reasoning before anything is booked.",
      },
      {
        q: "What does the Discovery show before you recommend mesotherapy?",
        a: "Whether your follicles can still respond and whether delivery is genuinely your limit. Your scalp is read at 200x on screen while you watch, and the systems side is reviewed the same visit, so the blend is built from what was actually found. Your written report follows the next day, and if mesotherapy is not the right first step, that is in the report too.",
      },
    ],
    sectionTitles: {
      benefits: "What Fusion Mesotherapy Actually Does For You",
      howItWorks: "What A Visit Involves",
      steps: "From Findings To Session To Review",
      idealFor: "Conditions Fusion Mesotherapy Is Often Considered For",
      notRightFor: "Who Fusion Mesotherapy Is Not Right For",
      close: "Find Out Whether Delivery Is Your Real Limit",
    },
    closeParagraph:
      "Before you add another bottle to the shelf, it is worth knowing whether absorption and delivery are what has been holding you back. The first step is smaller than a treatment plan: seeing what your scalp and your systems are actually doing, and leaving with that in writing.",
    schema: {
      procedureType: "Percutaneous",
      howPerformed:
        "A tailored blend of nutrients, amino acids and supporting compounds is delivered into the scalp through a series of shallow micro-injections placed across a mapped grid at follicle depth by a certified trichologist. The blend and treatment map are guided by trichoscopy at 200x magnification and a whole-body systems review.",
      preparation:
        "Candidacy and blend composition are determined from a prior scalp assessment including trichoscopy at 200x magnification alongside a systems review. Active scalp infection or severe irritation must be resolved before treatment. No fasting or special preparation is required.",
      followup:
        "Where a series is indicated, sessions are spaced according to scalp recovery and the hair growth cycle, with standardised magnified images from the same positions compared against baseline to guide continuation or adjustment.",
    },
  },

  "red-light-therapy": {
    slug: "red-light-therapy",
    name: "Red Light Therapy",
    metaTitle: "Red Light Therapy for Hair Growth: Does It Work?",
    metaDescription:
      "Low-level light stimulates follicle activity and calms inflammation. What the research supports, and where it fits inside a full protocol.",
    h1: "Red Light Therapy for Hair Loss",
    heroParagraph:
      "You want to know whether red light does anything for your kind of loss, or whether it is one more device that quietly costs you six months. The honest answer is that low-level light can support follicle activity and calm an irritated scalp, and it is useful in the right place inside a full protocol. On its own, for most presentations, it is weak.",
    heroOutcome: "Knowing whether it is worth your time.",
    clinicallyReviewed: true,
    quickAnswer:
      "Red light therapy, also called low-level light therapy, uses red and near-infrared wavelengths at low power to support activity in follicles that are still alive and to calm inflammation in the scalp around them. Randomised trials in pattern hair loss have shown modest increases in hair counts against sham devices, which is why it is an accepted adjunct rather than a primary treatment. It does not diagnose anything, it does not reverse scarring, and it does not address a hormonal, thyroid or nutrient driver that is still running. At Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta, whether red light belongs in your plan is decided from what your scalp shows at 200x magnification and what your systems review indicates, and it is usually paired with other work rather than used alone. Certified trichologists perform every hands-on treatment and Dr. Nina Ross, ND oversees protocols as Clinical Director.",
    benefits: [
      {
        title: "A calmer scalp for follicles to grow in",
        body: "Where the scalp is inflamed, tender or reactive, that environment works against every other thing you are doing. Low-level light is one of the gentler ways to settle it, and a settled scalp is what the rest of a protocol needs.",
      },
      {
        title: "Support for follicles that can still respond",
        body: "Light supports activity in follicles that are still producing, including miniaturising ones. It cannot restart a follicle that has closed, and your magnified images tell us which of yours are which before you spend anything.",
      },
      {
        title: "Clarity on whether it is worth your time",
        body: "The main thing this gives you is a straight answer. If light is a reasonable part of your plan, we will say where it fits. If your presentation needs a different first step, we will say that instead and save you the months.",
      },
      {
        title: "How it works, in one line",
        body: "Red and near-infrared wavelengths at low power are absorbed by tissue at the follicle level, supporting cellular activity and reducing local inflammation. It supports. It does not replace addressing the cause.",
      },
    ],
    toolLine:
      "The parts of a session: positioning under the light panel, a set exposure time, and pairing with whatever else your plan calls for that visit.",
    howItWorks: [
      {
        title: "Positioning",
        body: "You sit under a panel or hood positioned at a set distance from the scalp so the treated areas receive an even exposure. Hair is parted or sectioned where needed so the light reaches skin rather than sitting on top of the hair.",
      },
      {
        title: "What the visit feels like",
        body: "It is quiet and undramatic. There is mild warmth and nothing sharp. Most people read, sit with their phone, or close their eyes for the exposure time and then carry on with their day with no downtime.",
      },
      {
        title: "How long and how often",
        body: "Sessions run for a set exposure time and are repeated on a rhythm, because light works through consistency across the growth cycle rather than through any single session. Your intended rhythm is set from your findings and given to you in writing.",
      },
      {
        title: "How it is paired",
        body: "Inside Restorative Therapy, light sits alongside growth factors, microchannelling and targeted supplementation across the visit series. As a standalone it is generally used where inflammation is the main thing to settle, and even then we tell you what it will and will not move.",
      },
      {
        title: "How progress is judged",
        body: "New magnified images from the same positions are compared against your baseline. If the images are not changing, we say so and change the plan rather than keep booking sessions.",
      },
      {
        title: "Who does the work",
        body: "Certified trichologists perform every hands-on treatment. Dr. Nina Ross, ND oversees the protocols as Clinical Director. Everything is handled in-house.",
      },
    ],
    infoGain: {
      heading: "Where It Helps Most, And Where It Does Little Alone",
      body: [
        "Red light is one of the most oversold devices in hair loss and one of the more useful supporting tools, depending entirely on what is wrong. Here is where we see it earn its place and where we see people waste months.",
        "It helps most where inflammation is part of the picture. In inflammatory and autoimmune-adjacent presentations, alopecia areata, the calmer edges of lichen planopilaris, scalps flaring with seborrheic dermatitis or folliculitis, the tissue around the follicle is hostile before anything else can work. Light is gentle enough to use on a scalp that will not tolerate much, and settling that environment is often what lets the rest of the protocol start doing something.",
        "It helps as an adjunct after a procedure. Following microchannelling, growth factor work or PRP, light is used to support the recovering scalp during the window when the follicle is responding to what was just delivered. Its value there is in the pairing, not in itself.",
        "It helps where a scalp needs support and cannot take an intervention yet. A reactive scalp, a client who is not ready for injections, an area still recovering. Light is something we can do now while the plan builds.",
        "It does very little alone in three situations, and these are where the months go. First, where the driver is systemic. A thyroid problem, iron handling, a hormonal shift or a nutrient shortfall keeps shedding hair no matter how much light reaches the scalp, because the light never touches the reason. Second, where the follicle openings are already scarred and closed. There is nothing there to stimulate, and any device promising otherwise is selling you the wrong thing. Third, where tension is still being applied. Light does not undo a style that is still pulling on the edges every day.",
        "The pattern we see in the chair is people who bought a cap, used it faithfully for six to twelve months, and arrive with images that look the same as when they started, because nobody had told them what was actually driving their loss. The device was not the problem. Using it as a substitute for a diagnosis was.",
      ],
    },
    steps: [
      {
        title: "Before anything: your Discovery findings",
        body: "Whether light belongs in your plan is decided from your Hair & Body Discovery. Your scalp is read at 200x on screen while you watch, and your written report follows the next day.",
      },
      {
        title: "Deciding where it sits",
        body: "We tell you plainly whether light is a supporting part of your plan, the main thing we are doing while a scalp calms, or not worth your money at all in your case.",
      },
      {
        title: "Baseline images",
        body: "Standardised magnified images are captured from set positions so every later review compares against the same starting point.",
      },
      {
        title: "A session",
        body: "You are positioned under the panel at a set distance for a set exposure time. There is mild warmth and nothing sharp, and you leave and carry on with your day.",
      },
      {
        title: "The rhythm",
        body: "Sessions repeat on a set rhythm because consistency across the growth cycle is where any effect comes from. You get the intended spacing in writing before you start.",
      },
      {
        title: "How it nests in the wider plan",
        body: "Where light is one part of a program, the other parts run alongside it, and the whole-body side is handled in-house at the same time rather than left for you to chase.",
      },
      {
        title: "How progress is checked",
        body: "New images from the same positions are compared against baseline at 200x, and what they show decides whether we continue, adjust, or stop.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "Light works through the growth cycle and through repetition, so nothing is visible early. The first weeks look like nothing, and that is expected rather than a sign it is failing.",
        "Where a scalp was inflamed, the comfort side usually settles first: less itching, less tenderness, less flaring. That is often the first honest change people notice.",
        "Any density change comes later and is modest. Under magnification, hair coming through may read thicker before anything shows in the mirror. Where light is part of a broader protocol, what you see is the protocol working, and separating out light's own share of that is not something anyone can honestly do for you.",
        "Where follicles have scarred, those areas do not regrow at any point, with light or without it, and we show you where that line falls on your own scalp before you start.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: [
      "alopecia-areata",
      "ccca",
      "lichen-planopilaris",
      "seborrheic-dermatitis",
      "folliculitis",
      "anagen-effluvium",
    ],
    notRightFor: [
      "Anyone expecting light alone to reverse advanced scarring. Where the follicle openings have closed, there is nothing left to stimulate, and no device changes that.",
      "Anyone whose presentation needs a different first step. If a systemic driver, an active infection or ongoing tension is what is running the loss, that gets addressed first and light is added later if it is useful at all.",
      "Anyone treating it as a substitute for diagnosis. Buying a device before knowing what is wrong is the most common way people lose a year, and we would rather tell you that than sell you sessions.",
      "Anyone photosensitive or taking medication that increases light sensitivity. Tell us what you are taking and we will assess it before booking anything.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work, not the wording. Light has to reach the scalp, so sectioning and positioning are planned around dense, coiled or protective-styled hair rather than assuming the light will simply pass through.",
      "Session setup accounts for how your hair sits. We part and position so the treated zones are actually exposed, and we plan around braids, locs and weaves instead of asking you to take them down without a reason.",
      "Where there is buildup, irritation or scaling, light is paired with steam or other calming steps first so we are treating skin rather than product sitting on top of it.",
      "Aftercare is written for wash days that may be weekly rather than daily, for oils and butters, for wraps and bonnets. Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "Does red light therapy actually work for hair growth?",
        a: "Modestly, in the right situation. Randomised trials in pattern hair loss have shown small increases in hair counts against sham devices, which is real but limited. For many presentations it is weak as a standalone, and it does nothing at all for a systemic driver or for scarred areas. It earns its place as part of a protocol where inflammation needs settling or where it supports other treatment, and we will tell you honestly which of those applies to you.",
      },
      {
        q: "How often would I need to come in?",
        a: "On a set rhythm rather than occasionally, because consistency across the growth cycle is where any effect comes from. The exact spacing and number is set from what your scalp shows at 200x and given to you in writing before you start, then revisited against your own images instead of run as a fixed package.",
      },
      {
        q: "Can I just buy a cap and do it at home?",
        a: "You can, and some people reasonably do. What a home device cannot do is tell you whether light is the right thing for your loss, whether your follicles are still viable, or whether something systemic is driving the shed. The people we see with home caps have usually used one faithfully for months with images that look unchanged, because nothing had been diagnosed. Get the diagnosis first, then a cap may be a sensible part of your plan.",
      },
      {
        q: "Is it used with PRP or Restorative Therapy?",
        a: "Often, yes. Inside Restorative Therapy light sits alongside growth factors, microchannelling and targeted supplementation across the visit series. After PRP or microchannelling it is used to support the scalp while the follicle responds to what was delivered. That pairing is where we see it do the most.",
      },
      {
        q: "How does the Discovery decide whether I need it?",
        a: "Your scalp is read at 200x on screen while you watch, so you can see whether follicles are still viable and whether inflammation is part of your picture, and the systems side is reviewed the same visit. Those two things decide whether light belongs in your plan, where it sits, and what it will not do. Your written report follows the next day and includes that either way.",
      },
    ],
    citations: [
      {
        label:
          "Lanzafame RJ, Blanche RR, Bodian AB, et al. The growth of human scalp hair mediated by visible red light laser and LED sources in males. Lasers Surg Med. 2013;45(8):487-95. PMID: 24078483.",
        href: "https://pubmed.ncbi.nlm.nih.gov/24078483/",
      },
    ],
    sectionTitles: {
      benefits: "What Red Light Therapy Actually Does For You",
      howItWorks: "What A Session Involves",
      steps: "From Findings To Session To Review",
      idealFor: "Conditions Red Light Therapy Is Often Used Alongside",
      notRightFor: "Who Red Light Therapy Is Not Right For",
      close: "Find Out Whether Light Belongs In Your Protocol",
    },
    closeParagraph:
      "Before you spend months on light alone, it is worth an hour finding out whether it belongs in your plan at all. The first step is smaller than a treatment series: seeing what your scalp is actually doing, and leaving with that in writing.",
    schema: {
      procedureType: "Noninvasive",
      howPerformed:
        "Low-level red and near-infrared light is delivered to the scalp from a panel or hood positioned at a set distance for a set exposure time by a certified trichologist, usually alongside other modalities within a wider protocol. Candidacy and treated zones are guided by trichoscopy at 200x magnification.",
      preparation:
        "Candidacy is determined from a prior scalp assessment including trichoscopy at 200x magnification. Hair is sectioned so light reaches the scalp. Photosensitising medication is reviewed beforehand. No fasting or special preparation is required.",
      followup:
        "Sessions are repeated on a set rhythm across the hair growth cycle, with standardised magnified images from the same positions compared against baseline to guide continuation or adjustment.",
    },
  },

  "iv-nutrient-therapy": {
    slug: "iv-nutrient-therapy",
    name: "IV Nutrient Therapy",
    metaTitle: "IV Nutrient Therapy for Hair: When Oral Isn't Enough",
    metaDescription:
      "When absorption is the limiting factor, oral supplements stall. How IV delivery fits into a whole-body hair restoration protocol. Sandy Springs, GA.",
    h1: "IV Nutrient Therapy for Hair Loss",
    heroParagraph:
      "You have taken the pills, some of them for a year, and the shedding has not settled. Before you buy another bottle, the question worth answering is whether absorption is the real limit. IV nutrient therapy places what your labs say you are short of straight into circulation, chosen from what your bloodwork and your scalp actually show. Explore how the whole-body side works on our functional medicine page.",
    heroOutcome: "Fixing a deficiency that oral supplements have failed to move.",
    clinicallyReviewed: true,
    quickAnswer:
      "IV nutrient therapy is used for hair loss when the oral route is failing because absorption, not intake, is the limiting factor. Nutrients are delivered directly into circulation, which removes the digestive step entirely, and the choice of what to deliver comes from laboratory findings rather than from a standard menu. It sits inside a whole-body protocol alongside scalp work: correcting a systemic shortfall gives follicles the raw material to recover, while what happens on the scalp is guided separately by trichoscopy at 200x magnification. It is not a standalone answer, it does not diagnose anything, and it does nothing for follicles that have already scarred. At Nina Ross Hair Therapy in Sandy Springs, serving all of Metro Atlanta, functional medicine and trichology are handled in-house. Certified trichologists perform hands-on scalp care and Dr. Nina Ross, ND oversees protocols as Clinical Director.",
    benefits: [
      {
        title: "Move a deficiency that oral supplements have not corrected",
        body: "If a marker has stayed flat across months of consistent oral repletion, more of the same is unlikely to change it. Delivering into circulation is how that pattern gets broken.",
      },
      {
        title: "Support recovery when your body cannot use what you swallow",
        body: "Gut inflammation, low stomach acid, malabsorption and long-term acid reducers all cut how much of a capsule ever crosses. When that is your situation, the shelf of bottles was never going to work.",
      },
      {
        title: "A whole-body plan, not a drip menu",
        body: "What goes in is chosen from your labs and your systems review, and it runs alongside the scalp side of your plan rather than instead of it. The whole-body story is set out on our functional medicine page.",
      },
      {
        title: "How it works, in one line",
        body: "Nutrients are delivered intravenously so they reach circulation without passing through the gut. It supports follicles that can still respond. It does not regrow scarred areas, and we will show you where that line falls on your own scalp.",
      },
    ],
    toolLine:
      "The parts of a visit: a lab-informed plan, the infusion itself in a chair, monitoring throughout, and a review that looks at your markers and your scalp together.",
    howItWorks: [
      {
        title: "The plan comes from labs",
        body: "Nothing is chosen from a menu on the wall. Your bloodwork and systems review set what is indicated, at what strength, and how often it is worth repeating.",
      },
      {
        title: "The visit itself",
        body: "You sit in a chair with a line placed in the arm and the infusion runs over a set period. Most people read or work through it. There is nothing to do afterwards beyond drinking water and eating normally.",
      },
      {
        title: "Monitoring",
        body: "You are monitored through the session and told what to expect before it starts, including how the arm may feel and what to report if anything feels off.",
      },
      {
        title: "How it pairs with scalp care",
        body: "The systemic side runs alongside the scalp side. Certified trichologists carry out the hands-on scalp work, and what they do is guided by your magnified images rather than by your bloodwork alone.",
      },
      {
        title: "Repeat spacing and review",
        body: "Whether anything repeats depends on how your markers move. Spacing is set from findings and revisited, not sold as a fixed package.",
      },
      {
        title: "Who does the work",
        body: "Dr. Nina Ross, ND oversees protocols as Clinical Director and certified trichologists perform hands-on scalp treatment. Everything is handled in-house. We never refer out.",
      },
    ],
    infoGain: {
      heading: "The Lab Findings That Move Us From Oral To IV",
      body: [
        "Most people who ask about IV do not need it. What decides it is a specific set of patterns in the labs, and naming them is the fairest way to tell you whether this conversation applies to you at all.",
        "The first is an iron picture that will not lift. Iron status for hair is read across more than one marker, and the one that matters most is stored iron rather than a single value read as normal. When stored iron sits low while oral iron has been taken consistently, and inflammatory markers suggest the reading is not simply being masked, that is a pattern where the oral route has already had its chance.",
        "The second is a documented absorption limit. Coeliac disease, inflammatory bowel disease, a history of gastric or bariatric surgery, and long-term acid suppression all reduce what crosses the gut wall. Where that history exists, we do not spend six months confirming what the history already tells us.",
        "The third is oral intolerance. Some people cannot keep iron or high-dose oral protocols down at the doses that would matter. A plan you cannot take is not a plan.",
        "The fourth is markers that stay flat on a protocol you actually followed. When intake was consistent and repeat labs have not moved, the limit is delivery. That is the cleanest signal there is.",
        "Two things this does not include. A single value described as low-normal with no symptoms and no repeat is not a reason for an infusion. Neither is wanting to feel better generally. If your labs do not show a pattern like the ones above, we will tell you IV is not indicated, and that costs you nothing to hear.",
        "One boundary worth stating plainly: where a prescription medication is part of the picture, that decision belongs with your prescriber. We do not advise stopping or changing anything you have been prescribed.",
        "Delivery route is a separate question from location. IV raises what is available to your whole body. Where the need is local and the scalp itself is under-supplied, a different route makes more sense, which is what fusion mesotherapy does. Where a systemic driver is running the loss, that is the whole-body work described on our functional medicine page, and the infusion is one tool inside it.",
      ],
    },
    steps: [
      {
        title: "Before anything: your Discovery findings",
        body: "Your scalp is read at 200x on screen while you watch, the systems side is reviewed the same visit, and your written report follows the next day.",
      },
      {
        title: "The lab context",
        body: "Where the picture points to a nutrient or absorption story, the relevant labs are reviewed so the decision rests on findings rather than on how you feel that week.",
      },
      {
        title: "Candidacy",
        body: "We tell you plainly whether IV is indicated, whether oral repletion is still the sensible first step, or whether the driver is something else entirely.",
      },
      {
        title: "Baseline images",
        body: "Standardised magnified images are captured from set positions so every later review compares against the same starting point.",
      },
      {
        title: "The infusion visit",
        body: "A line is placed, the infusion runs over a set period, and you are monitored throughout. You leave and carry on with your day.",
      },
      {
        title: "Aftercare",
        body: "Water, a normal meal, and a note of anything unusual to report. The arm may be tender for a short while.",
      },
      {
        title: "How response is reviewed",
        body: "Repeat markers are read alongside new magnified images from the same positions at 200x. Both together decide whether we continue, adjust, or stop.",
      },
    ],
    timeline: {
      heading: "Results And A Realistic Timeline",
      body: [
        "Correcting a shortfall and seeing it in your hair are two different clocks. The marker can move well before anything visible does, because hair only changes at the speed of the growth cycle.",
        "The usual pattern is that shedding settles first, then hair coming through reads thicker under magnification, then overall density changes later. Nothing meaningful happens in the first weeks.",
        "How much changes depends on how long the shortfall has been running, how much follicle viability is still there, and whether anything else is still driving the loss. Where a hormonal or thyroid driver is also active, that has to be addressed alongside or the scalp work is fighting a moving target.",
        "Where follicles have scarred, no amount of nutrient support brings those areas back, and we tell you that before you start rather than let you wait for it.",
        "Results not typical. Individual results will vary.",
      ],
    },
    idealFor: [
      "telogen-effluvium",
      "postpartum-hair-loss",
      "medication-hair-loss",
      "hormonal-hair-loss",
      "pcos-hair-loss",
    ],
    notRightFor: [
      "Anyone whose labs show no absorption problem and no deficiency signal. If intake and status are fine, an infusion adds cost and changes nothing, and we will say so.",
      "Anyone expecting IV to reverse scarring alopecia. Where the follicle openings have closed, nutrients have nothing to feed, and that is visible on your own images at 200x.",
      "Anyone looking for IV as a shortcut past diagnosis. What is delivered depends entirely on what was found, so without findings it is guesswork with a needle in it.",
      "Anyone hoping we will adjust a prescription. If a medication is part of your hair loss picture, that conversation belongs with your prescriber. We work around it and tell you what we are seeing.",
    ],
    texturedHair: [
      "Safe for textured hair changes the work, not the wording. Whole-body nutrient work never replaces textured-hair scalp care, it runs beside it, and the scalp side is guided by your own magnified images rather than by your bloodwork.",
      "While the systemic side is being corrected, trichoscopy decides what happens on the scalp: which zones are treated, how tension along the edges is handled, and what is left alone to recover.",
      "We plan around protective styles instead of asking you to take them down without a reason, and infusion visits are scheduled so they do not collide with wash day or a fresh install.",
      "Aftercare is written for wash days that may be weekly rather than daily, for oils and butters, for wraps and bonnets. Relaxers, braids, locs, weaves and heat. Share your full history. It is welcomed, never judged.",
    ],
    faq: [
      {
        q: "Why did the oral supplements not work for me?",
        a: "Usually because something between the capsule and your bloodstream is limiting how much crosses. Low stomach acid, gut inflammation, coeliac or other malabsorption, a history of gastric surgery, and long-term acid reducers all cut absorption. Minerals also compete with each other for the same routes, and the form on the label matters as much as the dose. If your markers stayed flat while you took it consistently, delivery is the likely limit.",
      },
      {
        q: "What actually gets infused?",
        a: "What your labs indicate you are short of, at the strength that finding supports. There is no fixed menu here. If your bloodwork does not point to a shortfall, nothing gets infused and we tell you that instead.",
      },
      {
        q: "How often would I need it?",
        a: "That depends on how your markers move between reviews. Some situations need a short course and then a recheck. Others need one and no more. You get the intended plan in writing and we revisit it against repeat labs and your own magnified images rather than book a set number up front.",
      },
      {
        q: "How is this different from mesotherapy?",
        a: "Location. IV raises what is available to your whole body, which is what you want when the shortfall is systemic. Fusion mesotherapy places a blend into the scalp itself, which is what you want when the follicle environment is the under-supplied part. Where both apply, they work together, and the reasoning is explained before anything is booked.",
      },
      {
        q: "How do the Discovery and the labs decide?",
        a: "The Discovery shows whether your follicles can still respond and whether the picture looks systemic, since your scalp is read at 200x on screen while you watch and the systems side is reviewed the same visit. Where it points to a nutrient or absorption story, the labs settle it. Your written report follows the next day, and if IV is not indicated that is in the report too.",
      },
    ],
    sectionTitles: {
      benefits: "What IV Nutrient Therapy Actually Does For You",
      howItWorks: "What A Visit Involves",
      steps: "From Findings To Infusion To Review",
      idealFor: "Conditions IV Nutrient Therapy Is Often Considered For",
      notRightFor: "Who IV Nutrient Therapy Is Not Right For",
      close: "Find Out Whether Absorption Is Your Real Limit",
    },
    closeParagraph:
      "Before you buy another bottle, it is worth knowing whether your body can use what you are already taking. The first step is smaller than an infusion: seeing what your scalp and your systems are actually doing, and leaving with that in writing.",
    schema: {
      procedureType: "Intravenous",
      howPerformed:
        "Nutrients indicated by laboratory findings are delivered intravenously over a set period under monitoring, bypassing gastrointestinal absorption. The infusion runs alongside scalp treatment guided by trichoscopy at 200x magnification, under the clinical direction of a naturopathic doctor.",
      preparation:
        "Candidacy is determined from a prior scalp assessment including trichoscopy at 200x magnification alongside a systems review and relevant laboratory findings. Clients are advised to eat and hydrate normally beforehand. No fasting is required.",
      followup:
        "Repeat laboratory markers are reviewed alongside standardised magnified images taken from the same positions to determine whether further sessions are indicated, adjusted, or stopped.",
    },
  },

  microneedling: {
    slug: "microneedling",
    name: "Microneedling",
    metaTitle: "Microneedling for Hair Growth: Why It Amplifies Results",
    metaDescription:
      "Controlled micro-injury triggers repair and helps topicals absorb. How we pair it with PRP and growth factors, and what recovery looks like.",
    h1: "Microneedling for Hair Loss",
    heroParagraph:
      "You are already doing the work. The serum every night, the appointments, the changes to how you wash and style. Microneedling is how more of that work actually reaches the follicle, and how the scalp's own repair signaling gets switched on in a controlled, measured way.",
    heroOutcome: "Getting more out of everything else you are already doing.",
    clinicallyReviewed: true,
    quickAnswer:
      "Scalp microneedling for hair uses fine needles at a controlled depth to create precise micro-injury in the scalp. The body responds to that injury with its normal repair process, which brings growth signaling and blood flow to the treated area. The same channels also let topicals and paired therapies such as PRP or growth factors move past the skin surface instead of sitting on top of it. Most people describe the session as pressure with brief stinging in thinner areas, and the scalp usually looks pink and feels warm for a short period afterward. Sessions are spaced so the scalp fully settles in between. Candidacy, depth, and spacing are decided from what trichoscopy at 200x shows about follicle viability, inflammation, and scarring, not from a standard setting applied to everyone.",
    benefits: [
      {
        title: "Your Current Plan Works Harder",
        body: "If a topical is only partly absorbing, some of what you are paying for never reaches the follicle. Microneedling opens temporary channels so more of what you apply goes where it is meant to go.",
      },
      {
        title: "PRP And Growth Factors Land Better",
        body: "When microneedling is paired with PRP or growth factor application in the same visit, the delivery route is already open. That pairing is the main reason we use microneedling here.",
      },
      {
        title: "Repair Signaling Where Follicles Are Still Viable",
        body: "Controlled micro-injury calls the body's own repair response into the treated area. Where follicles are miniaturised but alive, that support can matter. Where they are gone, it cannot bring them back.",
      },
      {
        title: "Settings Chosen From What We See",
        body: "Depth and spacing come from your 200x read, not from a default. That is what keeps the treatment useful on thin edges and cautious near scarred margins.",
      },
    ],
    toolLine:
      "Microneedling is an amplifier. It is used alongside PRP, growth factor therapy, and the Restorative Therapy program, and it is not offered as a standalone answer to hair loss.",
    howItWorks: [
      {
        title: "Mapping The Scalp",
        body: "Before any needle touches the scalp, the treatment area is mapped against your magnified images. Active areas, thin edges, and any scarred or previously inflamed margins are marked so they are treated differently or avoided.",
      },
      {
        title: "Depth Selection",
        body: "Depth is set by region. Skin thickness, tension history, and how close an area sits to a scarred margin all change the setting. The same scalp can call for more than one depth in a single visit.",
      },
      {
        title: "The Pass",
        body: "Your trichologist works in a consistent pattern across each mapped zone, keeping coverage even and spacing controlled. Pinpoint bleeding in some areas is an expected part of the process rather than a sign something went wrong.",
      },
      {
        title: "Immediate Aftercare",
        body: "The scalp is cleaned and any paired serum, PRP, or growth factor preparation is applied while the channels are open. You leave with instructions on what to avoid and for how long.",
      },
      {
        title: "Pairing With PRP And Growth Factors",
        body: "Where PRP or growth factors are part of your plan, microneedling is scheduled in the same visit so the delivery is combined. See PRP therapy and the Restorative Therapy program for how those pieces fit together.",
      },
    ],
    infoGain: {
      heading: "Depth And Spacing On Textured Hair And Near Scarred Margins",
      body: [
        "Most microneedling guidance assumes a straight scalp with an even skin surface and no history of tension. Textured hair changes several of those assumptions at once, and the settings have to change with them.",
        "Along a traction edge, the skin is often thinner and has been under repeated pull for years. Depth that is appropriate at the crown can be too much at the hairline, so those areas are treated at a reduced depth with wider spacing and fewer passes. Going deeper there does not recruit more repair. It tends to inflame skin that is already sensitised.",
        "Near CCCA margins the decision is different again. The centre of a scarred patch has no follicles left to support, so treating it aggressively adds trauma with nothing to gain. The area of interest is the transitional border where miniaturised follicles are still present. That border is treated conservatively and only once inflammation is settled, because active inflammation plus micro-injury is a poor combination.",
        "Spacing between sessions is also read from the scalp rather than a calendar. If magnified images at the next visit still show redness or surface irritation from the previous session, the interval was too short for that scalp and it gets lengthened.",
        "Aggressive settings fail in three recognisable places: thinned traction edges, skin that is still inflamed from folliculitis or seborrheic dermatitis, and fully scarred zones. In each case the correct answer is a lower depth, a longer interval, or not treating that zone at all until something else is addressed first.",
      ],
    },
    steps: [
      {
        title: "Candidacy Is Decided At Discovery",
        body: "Your scalp is read at 200x. That read shows whether follicles in the areas that concern you are still viable, whether inflammation needs calming first, and where scarring rules an area out.",
      },
      {
        title: "Your Plan Is Mapped",
        body: "If microneedling belongs in your protocol, the zones, depths, and any pairing with PRP or growth factors are written down before the first treatment visit.",
      },
      {
        title: "The Treatment Visit",
        body: "The scalp is cleaned and prepared, the mapped passes are performed, and any paired preparation is applied straight afterward. Most of the visit is preparation and aftercare rather than the passes themselves.",
      },
      {
        title: "Recovery",
        body: "Expect pinkness and warmth, and in some areas small points of dried blood. Your trichologist tells you what to keep off the scalp and for how long, and when it is safe to wash and restyle.",
      },
      {
        title: "Spacing Between Sessions",
        body: "Sessions are spaced so the scalp is fully settled before the next one. The interval is set from how your scalp responded, not from a fixed schedule.",
      },
      {
        title: "Progress Is Reviewed At 200x",
        body: "Magnified images are taken from the same positions each time and compared against your baseline. That comparison decides whether to continue, change depth, or stop.",
      },
    ],
    timeline: {
      heading: "What Is Realistic With Microneedling",
      body: [
        "Microneedling supports a plan. It does not replace one. When people see change from it, that change usually shows up as the paired therapy working better than it was before, not as a separate result you can point to on its own.",
        "The first thing that tends to shift is scalp condition and how topicals feel going on. Changes visible in magnified images take longer, because a follicle cycle takes months regardless of what is applied to it.",
        "Advanced scarring alopecia does not reverse with microneedling. In those cases the honest goal is protecting the follicles at the border that are still alive.",
        "Everyone's scalp responds on its own schedule. Anyone offering a date is guessing.",
      ],
    },
    idealFor: ["traction-alopecia", "female-hair-loss", "male-pattern-baldness", "trichotillomania"],
    notRightFor: [
      "Anyone with active infection or uncontrolled inflammation on the scalp. Micro-injury on an inflamed scalp makes the inflammation worse. That has to be calmed first, and then microneedling can be reconsidered.",
      "Fully scarred zones with no viable follicles. There is nothing left in that tissue to signal, so treating it adds trauma without any possible return.",
      "Anyone expecting microneedling on its own to reverse advanced scarring alopecia. It will not, and we would rather say that now than take your money for a series of sessions.",
      "Anyone with a bleeding disorder or on medication affecting clotting, without clearance from the prescribing clinician first.",
    ],
    texturedHair: [
      "Safe for textured hair is not a phrase we use loosely here. On microneedling specifically it changes the depth at the edges, the spacing between passes, and how close we are willing to work to a scarred margin.",
      "Tension history matters. A hairline that has carried braids, sew-ins, or locs for years has skin that behaves differently under a needle than skin that never has. We treat those areas at a lower depth and we treat them less often.",
      "Aftercare is written to work with how you actually care for your hair. That means guidance you can follow with a protective style in place, and washing instructions that fit your wash day rather than fighting it.",
      "Everything is handled in-house by certified trichologists who work with textured hair every day. You are not explaining your hair to someone learning it for the first time.",
    ],
    faq: [
      {
        q: "Does microneedling on the scalp hurt?",
        a: "Most people describe it as firm pressure with brief stinging in thinner areas, especially along the hairline. Depth is adjusted by region partly for that reason. Tell your trichologist during the session if an area is uncomfortable, because the setting can be changed while you are in the chair.",
      },
      {
        q: "How much downtime is there?",
        a: "The scalp is usually pink and warm for a short period afterward, and some areas may show tiny points of dried blood. You are given specific instructions on what to keep off the scalp and when you can wash and restyle. Plan the session for a day when you do not need your hair styled a particular way that evening.",
      },
      {
        q: "Can it be done with PRP in the same visit?",
        a: "Yes, and that is how we most often use it. Microneedling opens the delivery route and the PRP or growth factor preparation is applied while those channels are open. Whether that pairing is right for you is decided from your 200x read.",
      },
      {
        q: "How is this different from a roller I can buy online?",
        a: "The main differences are depth control, sterility, mapping, and knowing where not to treat. An at-home roller applies one depth everywhere, including over inflamed skin and scarred zones where micro-injury does harm. In clinic, depth changes by region and some areas are deliberately left alone.",
      },
      {
        q: "How does the Discovery decide my depth and whether I am a candidate?",
        a: "The 200x read shows follicle viability, inflammation, and where scarring begins and ends. Those three things determine whether microneedling belongs in your protocol at all, which zones are treated, and at what depth. Without that read, any setting is a guess.",
      },
    ],
    citations: [
      {
        label:
          "Bao L, Gong L, Guo M, et al. Randomized trial of electrodynamic microneedle combined with 5% minoxidil topical solution for the treatment of Chinese male androgenetic alopecia. J Cosmet Laser Ther. 2020. PMID: 29028377.",
        href: "https://pubmed.ncbi.nlm.nih.gov/29028377/",
      },
    ],
    sectionTitles: {
      benefits: "What Microneedling Adds To What You Are Already Doing",
      howItWorks: "What A Microneedling Session Involves",
      steps: "From Discovery To Your Second Session",
      idealFor: "Conditions Microneedling Is Often Considered For",
      notRightFor: "Who Microneedling Is Not Right For",
      close: "Find Out If It Belongs In Your Protocol First",
    },
    closeParagraph:
      "Before you buy another device or add another product, the smaller first step is finding out whether microneedling belongs in your protocol at all, and where on your scalp it would be safe to use. You leave with that in writing either way.",
    schema: {
      procedureType: "Percutaneous",
      howPerformed:
        "A certified trichologist maps the scalp against magnified images, selects needle depth by region based on skin thickness, tension history, and proximity to scarred margins, then performs controlled passes to create precise micro-injury. Topical preparations, platelet-rich plasma, or growth factor preparations are applied immediately afterward while the channels remain open.",
      preparation:
        "Candidacy, treatment zones, and depth are determined from a prior scalp assessment including trichoscopy at 200x magnification. Active scalp infection or uncontrolled inflammation is treated first. Clients on medication affecting clotting obtain clearance from the prescribing clinician before treatment.",
      followup:
        "Sessions are spaced so the scalp is fully settled before the next treatment, with the interval set from the observed response rather than a fixed schedule. Standardised magnified images taken from the same positions are compared against baseline to guide continuation, depth adjustment, or discontinuation.",
    },
  },
};



export function getTreatmentPage(slug: string): TreatmentPage | undefined {
  return treatmentPages[slug];
}
