"use client";

import { useEffect, useState } from "react";
import { KsMark } from "@/components/ks-mark";
import { RsvpForm } from "@/components/rsvp-form";
import { StoryCarousel } from "@/components/story-carousel";
import { calendarUrl, wedding } from "@/lib/wedding";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function CountdownClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = new Date(wedding.countdownTo).getTime();
  const diff = now == null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <div className="count-grid" aria-label="Countdown to 18 January 2027">
      {[
        [pad(days), "Days"],
        [pad(hours), "Hours"],
        [pad(minutes), "Minutes"],
        [pad(seconds), "Seconds"],
      ].map(([value, label]) => (
        <div className="count-cell" key={label}>
          <strong suppressHydrationWarning>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function InviteCard() {
  return (
    <div className="invite-pages">
      <section className="fam-page" id="families" aria-label="The families">
        <div className="ganesha-wrap">
          <img
            className="ganesha"
            src="/images/pdf/ganesha.jpg"
            alt=""
            width={220}
            height={220}
            decoding="async"
          />
        </div>
        <p className="section-kicker">Introducing</p>
        <h2 className="section-script gold">the families</h2>
        <p className="honour-copy">
          {wedding.hosts} {wedding.honour}
        </p>
        <h3 className="person-name">{wedding.groom}</h3>
        <p className="relation-kicker">Son of</p>
        <p className="parents-copy">
          Smt. Darshna &amp;
          <br />
          Shri Narendra Tiwari
        </p>
        <KsMark className="ks-mark-foot" />
      </section>

      <section className="bride-page" id="bride" aria-label={`${wedding.bride}'s family`}>
        <h3 className="person-name">{wedding.bride}</h3>
        <p className="relation-kicker">Daughter of</p>
        <p className="parents-copy">
          Smt. Shyamli &amp;
          <br />
          Shri Sanjay Sharma
        </p>
      </section>

      <section className="story-page" id="story" aria-label="Our story">
        <p className="section-kicker">Our story</p>
        <p className="story-lede">
          Little moments we will always hold
          <br />
          close
        </p>
        <StoryCarousel />
      </section>

      <section className="schedule-head" id="schedule">
        <p className="section-kicker">Schedule of events</p>
        <p className="story-lede">
          A celebration of love, family &amp;
          <br />
          togetherness
        </p>
      </section>

      {wedding.events.map((event, index) => {
        const prev = wedding.events[index - 1];
        const showBanner = event.dayBanner !== prev?.dayBanner;
        return (
          <div key={event.id}>
            {showBanner ? <p className="day-banner">{event.dayBanner}</p> : null}
            <section className="event-sheet" id={`event-${event.id}`} aria-label={event.name}>
              <h2 className="event-title">
                {event.title}
                {event.subtitle ? (
                  <>
                    <br />
                    {event.subtitle}
                  </>
                ) : null}
              </h2>
              <p className="event-tagline">{event.tagline}</p>
              <div className="event-art">
                <img
                  src={event.photo}
                  alt={`${wedding.groom} and ${wedding.bride} — ${event.name}`}
                  width={720}
                  height={720}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <p className="event-when">{event.weekday}</p>
              <p className="event-time">{event.time}</p>
              <p className="event-venue">{event.venue}</p>
              <a className="cal-btn" href={calendarUrl(event)} target="_blank" rel="noreferrer">
                Add to calendar
              </a>
            </section>
          </div>
        );
      })}

      <section className="count-page" id="countdown" aria-label="Countdown">
        <p className="section-kicker">Countdown</p>
        <CountdownClock />
      </section>

      <section className="rsvp-page" id="rsvp" aria-label="RSVP">
        <div className="rsvp-sheet">
          <p className="section-kicker">R . S . V . P</p>
          <p className="story-lede">
            We would be delighted to celebrate
            <br />
            with you
          </p>
          <RsvpForm />
        </div>
      </section>

      <section className="venue-page" id="venue" aria-label="See you there">
        <h2 className="section-script navy venue-title">See you there</h2>
        <p className="venue-name">{wedding.venueName}</p>
        <p className="venue-city">{wedding.venueCity}</p>
        <a className="cal-btn" href={wedding.mapsUrl} target="_blank" rel="noreferrer">
          Get directions
        </a>
        <a className="ghost-btn" href={wedding.mapsUrl} target="_blank" rel="noreferrer">
          Full screen
        </a>
        <p className="love-line">
          With love, {wedding.groom} &amp; {wedding.bride}
        </p>
        <p className="credit-line">
          Photo of Hallstatt by{" "}
          <a href={wedding.unsplashCredit.href} target="_blank" rel="noreferrer">
            {wedding.unsplashCredit.label}
          </a>{" "}
          on Unsplash
        </p>
      </section>
    </div>
  );
}
