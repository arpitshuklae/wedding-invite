"use client";

import { useMemo, useState } from "react";
import { wedding } from "@/lib/wedding";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [events, setEvents] = useState<string[]>(() => wedding.events.map((event) => event.name));
  const [message, setMessage] = useState("");

  const href = useMemo(() => {
    const lines = [
      `Namaste! RSVP for ${wedding.groom} & ${wedding.bride}'s wedding`,
      "",
      `Name: ${name.trim() || "—"}`,
      `Attendance: ${attend === "yes" ? "Joyfully accept" : "Regretfully decline"}`,
      `Guests: ${guests}`,
      `Events: ${events.length ? events.join(", ") : "None selected"}`,
      message.trim() ? `Message: ${message.trim()}` : "",
    ]
      .filter((line, i, all) => line !== "" || i === 1 || all[i - 1] !== "")
      .join("\n")
      .trim();
    return `https://wa.me/?text=${encodeURIComponent(lines)}`;
  }, [attend, events, guests, message, name]);

  const toggleEvent = (label: string) => {
    setEvents((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

  return (
    <form
      className="rsvp-form"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <label className="rsvp-label" htmlFor="rsvp-name">
        Your name
      </label>
      <input
        id="rsvp-name"
        className="rsvp-input"
        placeholder="Full name"
        value={name}
        autoComplete="name"
        onChange={(event) => setName(event.target.value)}
      />

      <p className="rsvp-label">Will you attend?</p>
      <div className="rsvp-row">
        <button
          type="button"
          className={attend === "yes" ? "pill is-on" : "pill"}
          onClick={() => setAttend("yes")}
        >
          Joyfully accept
        </button>
        <button
          type="button"
          className={attend === "no" ? "pill is-on" : "pill"}
          onClick={() => setAttend("no")}
        >
          Regretfully decline
        </button>
      </div>

      <p className="rsvp-label">Guests</p>
      <div className="guest-stepper">
        <button
          type="button"
          aria-label="Fewer guests"
          onClick={() => setGuests((n) => Math.max(1, n - 1))}
        >
          −
        </button>
        <span>{guests}</span>
        <button
          type="button"
          aria-label="More guests"
          onClick={() => setGuests((n) => Math.min(9, n + 1))}
        >
          +
        </button>
      </div>

      <p className="rsvp-label">Events you will join</p>
      <div className="event-pills">
        {wedding.events.map((event) => (
          <button
            key={event.id}
            type="button"
            className={events.includes(event.name) ? "pill is-on" : "pill"}
            onClick={() => toggleEvent(event.name)}
          >
            {event.name}
          </button>
        ))}
      </div>

      <label className="rsvp-label" htmlFor="rsvp-note">
        A message for us
      </label>
      <textarea
        id="rsvp-note"
        className="rsvp-input rsvp-note"
        placeholder="Your wishes"
        rows={3}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <a className="whatsapp-btn" href={href} target="_blank" rel="noreferrer">
        Send RSVP on WhatsApp
      </a>
    </form>
  );
}
