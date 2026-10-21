"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

export function StoryCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>(".story-card")];
    const onScroll = () => {
      const mid = root.scrollLeft + root.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  const go = (next: number) => {
    const root = scroller.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>(".story-card");
    const clamped = Math.max(0, Math.min(wedding.events.length - 1, next));
    cards[clamped]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="story-carousel">
      <div className="story-track" ref={scroller}>
        {wedding.events.map((event, i) => (
          <figure className="story-card" key={event.id}>
            <img
              src={event.photo}
              alt={`${wedding.groom} and ${wedding.bride} — ${event.name}`}
              width={640}
              height={640}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <figcaption>{event.memory}</figcaption>
          </figure>
        ))}
      </div>
      <div className="story-nav">
        <button type="button" className="story-arrow" aria-label="Previous memory" onClick={() => go(index - 1)}>
          ‹
        </button>
        <div className="story-dots" role="tablist" aria-label="Our story">
          {wedding.events.map((event, i) => (
            <button
              key={event.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={i === index ? "is-active" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className="story-arrow" aria-label="Next memory" onClick={() => go(index + 1)}>
          ›
        </button>
      </div>
    </div>
  );
}
