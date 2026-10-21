"use client";

import { KsMark } from "@/components/ks-mark";
import { ScratchFoil } from "@/components/scratch-foil";
import { wedding } from "@/lib/wedding";

export function CoverHero({
  startRevealed = false,
  onReveal,
}: {
  startRevealed?: boolean;
  onReveal: () => void;
}) {
  return (
    <section className="cover-hero" aria-label="Wedding invitation cover">
      <img
        className="cover-art"
        src="/images/invite-arch.jpg"
        alt=""
        width={1024}
        height={1365}
        decoding="async"
        fetchPriority="high"
      />
      <div className="cover-copy">
        <KsMark />
        <h1 className="cover-names">
          <span>{wedding.groom}</span>
          <em>weds</em>
          <span>{wedding.bride}</span>
        </h1>
        <p className="cover-heart" aria-hidden="true">
          ♡
        </p>
        <p className="cover-kicker">
          <i />
          We are getting married
          <i />
        </p>
        <ScratchFoil startRevealed={startRevealed} onReveal={onReveal}>
          <p className="scratch-date-line">{wedding.dateReveal}</p>
          <p className="scratch-venue-line">{wedding.venue}</p>
        </ScratchFoil>
      </div>
    </section>
  );
}
