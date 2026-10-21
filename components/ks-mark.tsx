export function KsMark({ className = "" }: { className?: string }) {
  return (
    <div className={`ks-mark ${className}`.trim()} aria-hidden="true">
      <svg className="ks-wreath" viewBox="0 0 120 120">
        <g fill="#c4a35a">
          <ellipse cx="106.0" cy="60.0" rx="3.1" ry="6.6" transform="rotate(90 106 60)" />
          <ellipse cx="102.4" cy="77.8" rx="3.1" ry="6.6" transform="rotate(105 102.4 77.8)" />
          <ellipse cx="92.5" cy="92.5" rx="3.1" ry="6.6" transform="rotate(135 92.5 92.5)" />
          <ellipse cx="77.8" cy="102.4" rx="3.1" ry="6.6" transform="rotate(165 77.8 102.4)" />
          <ellipse cx="42.2" cy="102.4" rx="3.1" ry="6.6" transform="rotate(195 42.2 102.4)" />
          <ellipse cx="27.5" cy="92.5" rx="3.1" ry="6.6" transform="rotate(225 27.5 92.5)" />
          <ellipse cx="17.6" cy="77.8" rx="3.1" ry="6.6" transform="rotate(255 17.6 77.8)" />
          <ellipse cx="14.0" cy="60.0" rx="3.1" ry="6.6" transform="rotate(270 14 60)" />
          <ellipse cx="17.6" cy="42.2" rx="3.1" ry="6.6" transform="rotate(285 17.6 42.2)" />
          <ellipse cx="27.5" cy="27.5" rx="3.1" ry="6.6" transform="rotate(315 27.5 27.5)" />
          <ellipse cx="42.2" cy="17.6" rx="3.1" ry="6.6" transform="rotate(345 42.2 17.6)" />
          <ellipse cx="60.0" cy="14.0" rx="3.1" ry="6.6" transform="rotate(0 60 14)" />
          <ellipse cx="77.8" cy="17.6" rx="3.1" ry="6.6" transform="rotate(15 77.8 17.6)" />
          <ellipse cx="92.5" cy="27.5" rx="3.1" ry="6.6" transform="rotate(45 92.5 27.5)" />
          <ellipse cx="102.4" cy="42.2" rx="3.1" ry="6.6" transform="rotate(75 102.4 42.2)" />
        </g>
        <path
          d="M60 99c-1.4-1.3-8.6-6.6-8.6-11.4 0-3.1 2.4-5.2 5.2-5.2 1.8 0 2.9.9 3.4 1.8.5-.9 1.6-1.8 3.4-1.8 2.8 0 5.2 2.1 5.2 5.2 0 4.8-7.2 10.1-8.6 11.4z"
          fill="#c4a35a"
        />
      </svg>
      <p className="ks-letters">
        <span>K</span>
        <i>|</i>
        <span>S</span>
      </p>
    </div>
  );
}
