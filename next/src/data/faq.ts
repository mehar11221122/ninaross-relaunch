import { credentials, nap, offer } from "./trust";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  blurb: string;
  items: FaqItem[];
}

/** Sitewide FAQ hub. Same array renders the accordions and the FAQPage JSON-LD. */
export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    blurb: "What the first visit is, who you see, and how to book it.",
    items: [
      {
        q: "What is the $99 Hair & Body Discovery?",
        a: `${offer.name} is the first visit at Nina Ross Hair Therapy. It is ${offer.price} and takes about ${offer.duration}. It includes ${offer.includes[0].toLowerCase()}, ${offer.includes[1].toLowerCase()}, ${offer.includes[2].toLowerCase()}, and ${offer.includes[3].toLowerCase()}. You leave knowing what your scalp actually looks like up close, and the written report arrives the next day so you have it in writing.`,
      },
      {
        q: "What actually happens during the visit?",
        a: "You sit down one-on-one with a certified trichologist and talk through your hair history, your health history, and what changed. Your scalp is then read at 200x magnification on a screen while you watch, section by section, so you see the same thing we see. Nothing is cut, and no prep is needed. The visit ends with what we found and what the options are, and your written report is delivered the next day.",
      },
      {
        q: "Who performs the evaluation?",
        a: `${credentials.delivery} ${credentials.long} As Clinical Director, she sets the clinical protocols the trichologists follow. If your case needs her direct input, she reviews it.`,
      },
      {
        q: "How do I book, and how soon can I get in?",
        a: `You can book online in about a minute, or call ${nap.phone} during clinic hours. Same-week appointments are usually available. If you have a question first, call the clinic and we will answer during clinic hours.`,
      },
      {
        q: "Where are you and what are your hours?",
        a: `We are at ${nap.full}. ${nap.building} Hours are ${nap.hours}, and the phone is ${nap.phone}. Parking at the building is free and we are just off GA-400 near the Perimeter. ${nap.serviceArea}.`,
      },
    ],
  },
  {
    id: "conditions",
    title: "Hair Loss Conditions",
    blurb: "What we treat, what we cannot change, and how causes are told apart.",
    items: [
      {
        q: "Do you treat every type of hair loss?",
        a: "We work with most of the common patterns: traction alopecia, CCCA and other scarring conditions, alopecia areata, telogen effluvium, postpartum shedding, hormonal thinning, male and female pattern loss, and scalp conditions like seborrheic dermatitis and folliculitis. What differs is what is realistic in each case. Some conditions respond well, some are about protecting what is still there, and we tell you which one you are in before you spend anything on treatment. You can see the full list on the conditions page.",
      },
      {
        q: "If I have CCCA, can my hair come back?",
        a: "It depends on how much of the follicle is still alive. CCCA is a scarring condition, and follicles that have already scarred over do not regrow. What can change is the inflammation around the follicles that are still active, so the loss slows and the living follicles keep producing. At 200x we can see which areas still have openings and which are smooth, and that read is what sets your expectations honestly rather than hopefully.",
      },
      {
        q: "Is traction alopecia reversible?",
        a: "Early traction alopecia often improves once the tension stops and the scalp calms down. Later stage traction alopecia, where the edge has been bare for years and the skin looks smooth under magnification, is usually about holding the ground you still have. Most people are somewhere between the two, with some areas that can recover and some that cannot. The 200x read is how we sort your scalp into those zones instead of guessing.",
      },
      {
        q: "How do you tell one cause apart from another?",
        a: "Two things: what your scalp shows at 200x, and what your history and body systems show. Shedding from a thyroid issue, iron levels, a medication, or postpartum hormones looks different at the follicle than tension loss or a scarring condition. We look at pattern, follicle openings, inflammation, and the timeline of when it started. Where the picture points to something whole-body, functional medicine is part of the plan rather than an afterthought.",
      },
      {
        q: "What if I do not know what I have?",
        a: "That is the most common reason people come in. You do not need a diagnosis before the visit and you do not need to arrive with a theory. Naming it accurately is the job of the Discovery, and the written report puts that in plain language you can keep, read again, and share with anyone else involved in your care.",
      },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    blurb: "How a plan gets chosen, what fits, and how many visits it takes.",
    items: [
      {
        q: "How do you decide which treatment I need?",
        a: "The plan comes after the diagnosis, never before it. Once we know what the scalp shows and what the body systems point to, we match the treatment to that cause. Inflammation and buildup call for a different route than a nutrient deficiency, and cosmetic density is a different conversation again. You see the reasoning and the numbers before anything starts. The treatments page lists every option we offer.",
      },
      {
        q: "How do I know if I am a candidate for PRP?",
        a: "PRP works when there are living follicles to stimulate, so we screen before we offer it. We look at what the 200x read shows, your bloodwork picture, medications and conditions that affect platelets or healing, and whether the area still has active follicles. If PRP is not right for you, we say so and point you to what fits instead. Screening is part of the Discovery, not a separate hurdle.",
      },
      {
        q: "Is one treatment enough?",
        a: "Usually no. Hair grows on a cycle, so a single session is a starting point rather than a course. Most plans run as a series of visits over several months, often combining an in-clinic treatment with what you do at home and, where labs support it, whole-body work. We tell you the expected number of visits up front so you can decide with real numbers in front of you.",
      },
      {
        q: "Are your treatments safe for textured hair?",
        a: "Yes. Relaxers, braids, locs, weaves, wigs and heat are all part of the histories we see every week, and our protocols were built around textured hair rather than adapted to it late. Come as you are, in whatever style you are wearing. Protective styles are welcome and your hair history is information, not something you have to defend.",
      },
      {
        q: "Do I have to take my braids or wig out before coming in?",
        a: `No prep is needed for the ${offer.name}. We can read most scalps at 200x with a style in place, though the more scalp we can reach, the more we can show you. If a style has to come down for a specific treatment later, we tell you in advance so you can plan around it.`,
      },
    ],
  },
  {
    id: "results",
    title: "Results and Expectations",
    blurb: "Timelines, what progress looks like, and what we will not promise.",
    items: [
      {
        q: "How long before I see results?",
        a: "Hair moves on a slow cycle. Shedding often settles first, usually within a couple of months when the cause has been addressed, and visible density takes longer because new hair has to grow out to a length you can see. Most people are looking at several months of consistent work before a change is obvious in the mirror. Individual results vary and we will not put a date on your regrowth.",
      },
      {
        q: "Can you promise my hair will grow back?",
        a: "No, and anyone who does is selling you something. What we can do is tell you what your scalp actually shows, what is still alive, what is scarred, and what the realistic ceiling is for your case. Some people regain real density. Some people hold onto what they have, which in a progressive condition is a genuine win. You will know which conversation you are in before you spend money on treatment.",
      },
      {
        q: "What does progress look like along the way?",
        a: "Before the length shows up, progress looks like less shedding in the shower, less irritation and tenderness, and at 200x, new fine hairs coming through openings that were empty. That is why we photograph and re-read the scalp at intervals rather than relying on memory. Progress you can see on screen is more honest than progress you think you remember.",
      },
      {
        q: "What if the treatment does not work for me?",
        a: "We reassess. If the scalp is not responding the way the plan expected, that is information about the cause, and it usually means something in the body picture was missed or has changed. We would rather change direction than keep selling you the same thing. Individual results vary, and your report gives you a documented baseline to measure against.",
      },
    ],
  },
  {
    id: "payment",
    title: "Insurance and Payment",
    blurb: "What the Discovery costs and how payment works.",
    items: [
      {
        q: "Do you take insurance?",
        a: "We are a private clinic and hair loss care here is generally not billed to insurance. Some clients use HSA or FSA funds for care. Whether your specific plan or account covers any of it is between you and your plan administrator, so please check with them directly rather than take our word for it. We will not tell you it is covered when we cannot confirm that.",
      },
      {
        q: "How much is the first visit?",
        a: `${offer.name} is ${offer.price} for ${offer.duration}, and that includes the 200x scalp read and your written report the next day. ${offer.riskReversal}`,
      },
      {
        q: "How does payment work for treatment after the Discovery?",
        a: "Treatment pricing depends entirely on what the Discovery finds, so we quote your plan after we know what you need, and you get the numbers before anything starts. Payment is taken at the clinic. There is no obligation to continue past the first visit, and you keep your report either way.",
      },
    ],
  },
];

export const faqItems: FaqItem[] = faqCategories.flatMap((c) => c.items);
