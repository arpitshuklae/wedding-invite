"use client";

import { useCallback, useEffect } from "react";

type EnvelopeState = "closed" | "sliding" | "open";

declare global {
  interface Window {
    __INVITE_OPEN?: boolean;
  }
}

export function PaperEnvelope({
  state,
  capture,
  onOpen,
}: {
  state: EnvelopeState;
  capture?: boolean;
  onOpen: () => void;
}) {
  const open = useCallback(() => {
    if (state !== "closed" || capture) return;
    if (typeof window !== "undefined") window.__INVITE_OPEN = true;
    onOpen();
  }, [capture, onOpen, state]);

  const press = useCallback(
    (event: { preventDefault?: () => void; currentTarget: HTMLElement }) => {
      if (state !== "closed") return;
      event.currentTarget.classList.add("is-pressed");
      open();
    },
    [open, state],
  );

  useEffect(() => {
    const el = document.getElementById("envelope-open");
    if (!el) return;
    const native = (event: Event) => {
      if (state !== "closed") return;
      event.preventDefault?.();
      el.classList.add("is-pressed");
      open();
    };
    el.addEventListener("pointerdown", native, { passive: false });
    el.addEventListener("touchstart", native, { passive: false });
    el.addEventListener("click", native);
    el.addEventListener("invite-open", native);
    return () => {
      el.removeEventListener("pointerdown", native);
      el.removeEventListener("touchstart", native);
      el.removeEventListener("click", native);
      el.removeEventListener("invite-open", native);
    };
  }, [open, state]);

  return (
    <button
      type="button"
      id="envelope-open"
      className="paper-envelope"
      data-state={state}
      data-capture={capture ? "slid" : undefined}
      aria-label="Open the envelope"
      aria-hidden={state === "open"}
      disabled={state !== "closed"}
      onPointerDown={(event) => {
        event.preventDefault();
        press(event);
      }}
      onTouchStart={(event) => {
        event.preventDefault();
        press(event);
      }}
      onClick={(event) => {
        event.preventDefault();
        press(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          press(event);
        }
      }}
    >
      <div className="env-body" aria-hidden="true" />

      <div className="env-collar env-collar-right" aria-hidden="true">
        <span className="env-sheet" />
      </div>
      <div className="env-collar env-collar-left" aria-hidden="true">
        <span className="env-sheet" />
      </div>
      <div className="env-seal-shade" aria-hidden="true" />

      <div className="env-copy">
        <span className="env-flourish" aria-hidden="true">
          <svg viewBox="0 0 120 18" fill="none">
            <path d="M8 9h40" stroke="#c4a35a" strokeWidth="1" />
            <path d="M72 9h40" stroke="#c4a35a" strokeWidth="1" />
            <path d="M60 2.2 63.6 9 60 15.8 56.4 9Z" fill="#c4a35a" />
          </svg>
        </span>
        <p className="env-kicker">Our forever begins</p>
        <p className="env-script">together</p>
      </div>

      <span className="env-hit" aria-hidden="true" />
      <span className="env-seal" aria-hidden="true">
        <span className="env-seal-face" />
      </span>
    </button>
  );
}
