"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CoverHero } from "@/components/cover-hero";
import { InviteCard } from "@/components/invite-card";

const VIEW_TARGETS: Record<string, string> = {
  families: "families",
  family: "families",
  story: "story",
  event: "event-haldi",
  events: "schedule",
  schedule: "schedule",
  countdown: "countdown",
  rsvp: "rsvp",
  venue: "venue",
};

type EnvelopeState = "closed" | "sliding" | "open";

declare global {
  interface Window {
    __INVITE_OPEN?: boolean;
  }
}

export function InvitationExperience() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "";
  const envelopeQuery = searchParams.get("envelope") || searchParams.get("gate");
  const startRevealed =
    searchParams.get("revealed") === "1" || Boolean(VIEW_TARGETS[view]);
  const capturing = envelopeQuery === "slid" || envelopeQuery === "opening";
  const [revealed, setRevealed] = useState(startRevealed);
  const [envelope, setEnvelope] = useState<EnvelopeState>(() =>
    capturing ? "sliding" : "closed",
  );
  const frameRef = useRef<HTMLElement>(null);

  const unlock = useCallback(() => setRevealed(true), []);

  useEffect(() => {
    const sync = () => {
      const button = document.getElementById("open-envelope");
      const state = button?.getAttribute("data-state");
      if (window.__INVITE_OPEN || state === "sliding") {
        setEnvelope((current) => (current === "open" ? current : "sliding"));
      }
      if (state === "open" || button?.hidden) {
        setEnvelope("open");
      }
    };
    sync();
    window.addEventListener("invite-open", sync);
    return () => window.removeEventListener("invite-open", sync);
  }, []);

  useEffect(() => {
    if (envelope !== "sliding" || capturing) return;
    const id = window.setTimeout(() => setEnvelope("open"), 1100);
    return () => window.clearTimeout(id);
  }, [capturing, envelope]);

  const canScroll = envelope === "open";

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (canScroll) {
      html.classList.add("invite-ready");
      html.classList.remove("h-full");
      html.style.setProperty("overflow", "auto", "important");
      html.style.setProperty("height", "auto", "important");
      html.style.setProperty("max-height", "none", "important");
      body.classList.add("invite-ready");
      body.style.setProperty("overflow", "auto", "important");
      body.style.setProperty("height", "auto", "important");
      body.style.setProperty("max-height", "none", "important");
    }
  }, [canScroll]);

  useEffect(() => {
    if (!canScroll) return;
    const id = VIEW_TARGETS[view];
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const jump = () => {
      target.scrollIntoView({ block: "start" });
    };
    jump();
    const t = window.setTimeout(jump, 80);
    return () => window.clearTimeout(t);
  }, [canScroll, view]);

  return (
    <main className="invite-shell">
      <div className="invite-phone">
        <section
          ref={frameRef}
          data-locked={canScroll ? "false" : "true"}
          data-view={view || "cover"}
          data-envelope={envelope}
          data-scratched={revealed ? "true" : "false"}
          className="invite-frame"
          aria-label="Wedding invitation for Kartik and Srashti"
        >
          <CoverHero startRevealed={startRevealed} onReveal={unlock} />
          <InviteCard />
        </section>
      </div>
    </main>
  );
}
