export function OpenEnvelope({
  state = "closed",
  capture = false,
}: {
  state?: "closed" | "sliding" | "open";
  capture?: boolean;
}) {
  return (
    <button
      type="button"
      id="open-envelope"
      className="paper-envelope"
      data-state={state}
      data-capture={capture ? "slid" : undefined}
      aria-label="Open the envelope"
      suppressHydrationWarning
    >
      <span className="env-scene" aria-hidden="true">
        <img
          className="env-scene-img"
          src="/images/lakeside-villa.jpg"
          alt=""
          draggable={false}
        />
      </span>
      <span className="env-body" aria-hidden="true" />
      <span className="env-collar env-collar-right" aria-hidden="true">
        <span className="env-sheet" />
      </span>
      <span className="env-collar env-collar-left" aria-hidden="true">
        <span className="env-sheet" />
      </span>
      <span className="env-seal-shade" aria-hidden="true" />
      <span className="env-copy">
        <span className="env-flourish" aria-hidden="true">
          <svg viewBox="0 0 120 18" fill="none">
            <path d="M8 9h40" stroke="#c4a35a" strokeWidth="1" />
            <path d="M72 9h40" stroke="#c4a35a" strokeWidth="1" />
            <path d="M60 2.2 63.6 9 60 15.8 56.4 9Z" fill="#c4a35a" />
          </svg>
        </span>
        <span className="env-kicker">Our forever begins</span>
        <span className="env-script">together</span>
      </span>
      <span className="env-seal" aria-hidden="true">
        <span className="env-seal-face" />
      </span>
    </button>
  );
}
