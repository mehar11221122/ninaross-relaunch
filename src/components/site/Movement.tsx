import { Heart } from "lucide-react";
import { EditableImage } from "@/components/site/EditableImage";

const clientsGroup = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291428/ninaross/lovable/three-black-women-smiling-together-nina-ross-atlanta.png";
const maleClient = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291426/ninaross/lovable/man-with-full-short-hair-nina-ross-atlanta.png";

export function Movement() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">More Than Hair.</p>
          <h2 className="headline mt-5 text-4xl text-cream sm:text-5xl">
            It's Not Vanity.
            <span className="block text-gold">It's Health.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ash">
            Shedding, thinning and breakage can be your body raising a hand. Stress, hormones,
            inflammation, nutrient status — your hair often speaks first. Listening to it isn't
            cosmetic. It's care.
          </p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6">
            <p className="font-serif text-lg leading-relaxed text-cream italic">
              &ldquo;The day I stopped blaming my hair and started asking my body questions —
              everything changed.&rdquo;
            </p>
            <cite className="mt-3 block text-[9px] font-bold tracking-[0.25em] text-ash uppercase not-italic">
              NRHT Client (Sample Quote)
            </cite>
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="icon-ring size-11 shrink-0">
              <Heart className="size-4" />
            </span>
            <p className="text-[10px] font-extrabold tracking-[0.22em] text-cream uppercase">
              Centered On Black Folks • Men Welcome
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <EditableImage
            slot="movement-clients"
            src={clientsGroup}
            alt="Clients of Nina Ross Hair Therapy"
            className="arch-img h-[300px] w-full lg:h-[360px]"
          />
          <EditableImage
            slot="movement-male"
            src={maleClient}
            alt="Male client of Nina Ross Hair Therapy"
            className="arch-img mt-10 h-[300px] w-full lg:h-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
