"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScratchFoilProps = {
  startRevealed?: boolean;
  onReveal?: () => void;
  label?: string;
  children: React.ReactNode;
};

export function ScratchFoil({
  startRevealed = false,
  onReveal,
  label = "SCRATCH TO REVEAL",
  children,
}: ScratchFoilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealedRef = useRef(startRevealed);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(startRevealed);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#6ea0f2");
    sky.addColorStop(0.42, "#3b73e4");
    sky.addColorStop(1, "#1e4db8");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 90; i += 1) {
      const x = ((i * 97) % width) + ((i * 13) % 17);
      const y = ((i * 53) % height) + ((i * 7) % 11);
      const r = i % 9 === 0 ? 1.8 : i % 4 === 0 ? 1.15 : 0.7;
      ctx.fillStyle = `rgba(255,255,255,${i % 5 === 0 ? 0.95 : 0.55})`;
      ctx.beginPath();
      ctx.arc(x, y, r * (width / 280), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = `600 ${Math.round(width * 0.048)}px Cinzel, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`✦  ${label}`, width / 2, height / 2);
  }, [label]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    paintFoil();
  }, [paintFoil]);

  const finish = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setRevealed(true);
    onReveal?.();
  }, [onReveal]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || revealedRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;
      const prev = last.current;
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 46 * dpr;
      ctx.beginPath();
      if (prev) {
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 0.1, y);
      }
      ctx.stroke();
      last.current = { x, y };

      const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < sample.length; i += 32) {
        if (sample[i] < 40) clear += 1;
      }
      if (clear / (sample.length / 32) > 0.42) finish();
    },
    [finish],
  );

  useEffect(() => {
    if (startRevealed) {
      revealedRef.current = true;
      setRevealed(true);
      onReveal?.();
      return;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [onReveal, resize, startRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const fromTouch = (event: TouchEvent) => {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return null;
      return { x: touch.clientX, y: touch.clientY };
    };

    const onStart = (event: TouchEvent) => {
      event.preventDefault();
      drawing.current = true;
      last.current = null;
      const point = fromTouch(event);
      if (point) scratchAt(point.x, point.y);
    };
    const onMove = (event: TouchEvent) => {
      if (!drawing.current) return;
      event.preventDefault();
      const point = fromTouch(event);
      if (point) scratchAt(point.x, point.y);
    };
    const onEnd = (event: TouchEvent) => {
      event.preventDefault();
      drawing.current = false;
      last.current = null;
    };

    canvas.addEventListener("touchstart", onStart, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onEnd, { passive: false });
    canvas.addEventListener("touchcancel", onEnd, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", onStart);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onEnd);
      canvas.removeEventListener("touchcancel", onEnd);
    };
  }, [revealed, scratchAt]);

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "touch") return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* iOS may reject capture */
    }
    drawing.current = true;
    last.current = null;
    scratchAt(event.clientX, event.clientY);
  };

  return (
    <div className="scratch-sky">
      <div className="scratch-prize">{children}</div>
      {!revealed ? (
        <canvas
          ref={canvasRef}
          className="scratch-foil"
          aria-label={label}
          onPointerDown={onPointerDown}
          onPointerMove={(event) => {
            if (event.pointerType === "touch" || !drawing.current) return;
            scratchAt(event.clientX, event.clientY);
          }}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
          }}
          onPointerCancel={() => {
            drawing.current = false;
            last.current = null;
          }}
        />
      ) : null}
    </div>
  );
}
