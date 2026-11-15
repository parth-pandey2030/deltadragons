import React, { useMemo } from 'react';

const EVENTS = [
    // No events are currently scheduled. Add events here in the format below.
]

function EventItem({ event }) {
    const d = new Date(event.date + "T00:00:00");
    const month = d.toLocaleString("en-US", { month: "short" });
    const full = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return (
      <li className="ev">
        <div className="date" aria-hidden="true">
          <small>{month}</small>
          <strong>{d.getDate()}</strong>
        </div>
        <div>
          <h3>{event.title}</h3>
          <p>{full} · {event.place}</p>
        </div>
        <span className={"tag" + (event.type === "Competition" ? " comp" : "")}>{event.type}</span>
      </li>
    );
  }

export default function Events() {
    const upcoming = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return EVENTS.filter((e) => new Date(e.date + "T00:00:00") >= today).sort((a, b) =>
        a.date.localeCompare(b.date)
      );
    }, []);
  
    return (
      <section id="events" className="no-top">
        <div className="wrap">
          <h2>Upcoming events</h2>
          <p className="lede">
            Come watch a match, say hello, or help us out. Events that have passed disappear on their own.
          </p>
          <ul className="events">
            {upcoming.length ? (
              upcoming.map((e) => <EventItem key={e.date + e.title} event={e} />)
            ) : (
              <li className="empty">No events are scheduled right now. Check back soon.</li>
            )}
          </ul>
        </div>
      </section>
    );
  }