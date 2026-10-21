"use client";

import { useCallback, useRef } from "react";

type GateState = "closed" | "opening" | "open";

export function FloralGate({
  state,
  capture,
  onOpen,
}: {
  state: GateState;
  capture?: boolean;
  onOpen: () => void;
}) {
  const startX = useRef<number | null>(null);

  const open = useCallback(() => {
    if (state !== "closed") return;
    onOpen();
  }, [onOpen, state]);

  return (
    <div
      className="floral-gate"
      data-state={state}
      data-capture={capture ? "opening" : undefined}
      aria-hidden={state === "open"}
      onClick={open}
    >
      <div className="gate-panel gate-left">
        <img src="/images/lily-door-left.svg?v=5" alt="" draggable={false} />
      </div>
      <div className="gate-panel gate-right">
        <img src="/images/lily-door-right.svg?v=5" alt="" draggable={false} />
        <p className="gate-hint">Tap To Reveal</p>
      </div>

      <button
        type="button"
        className="gate-seal"
        aria-label="Tap to reveal the invitation"
        disabled={state !== "closed"}
        onClick={open}
        onPointerDown={(event) => {
          startX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (startX.current == null) return;
          if (Math.abs(event.clientX - startX.current) > 22) open();
        }}
        onPointerUp={() => {
          startX.current = null;
        }}
        onPointerCancel={() => {
          startX.current = null;
        }}
      >
        <span>K&amp;S</span>
      </button>
    </div>
  );
}
