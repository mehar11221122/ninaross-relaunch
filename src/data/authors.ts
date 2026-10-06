/**
 * Real people only. Never invent an author, credential, or byline.
 * Dr. Nina Ross is a naturopathic doctor (ND). Never MD, never dermatologist.
 */

export type Author = {
  id: string;
  name: string;
  role: string;
  /** true only when this person can serve as clinical reviewer of record */
  clinicalReviewer: boolean;
};

export const authors: Author[] = [
  {
    id: "nina-ross",
    name: "Dr. Nina Ross, ND",
    role: "Naturopathic Doctor, PhD in Functional Medicine, Double Board Certified Trichologist",
    clinicalReviewer: true,
  },
  {
    id: "nrht-trichology-team",
    name: "Nina Ross Hair Therapy Trichology Team",
    role: "Certified trichologists",
    clinicalReviewer: false,
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
