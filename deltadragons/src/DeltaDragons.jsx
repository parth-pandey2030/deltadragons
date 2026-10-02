import { Fragment, useMemo, useState } from "react";
import "./DeltaDragons.css";
import DeltaLogo from "./DeltaLogo";

/* ===== TEAM: edit this section ===== */
const CONFIG = {
  paypal: "deltadragons", // paypal.me/YourPayPalName
  venmo: "Your-Venmo-Name", // venmo.com/u/Your-Venmo-Name
  cashapp: "YourCashtag", // cash.app/$YourCashtag (no $)
  goal: 5000,
  raised: 1250,
};

const TEAM = {
  name: "Delta Dragons",
  number: "#00000",
  city: "Ellicott City, MD",
  founded: "2026",
  members: "12 students",
  email: "deltadragonsdms@gmail.com",
  instagram: "www.instagram.com/deltadragonsdms",
};

const EVENTS = [
  { date: "2026-10-24", title: "Preseason scrimmage", place: "Local high school gym", type: "Scrimmage" },
  { date: "2026-11-14", title: "League meet 1", place: "Host school, your city", type: "Competition" },
  { date: "2026-12-05", title: "League meet 2", place: "Host school, your city", type: "Competition" },
  { date: "2026-12-12", title: "Robot demo day at the library", place: "Public library", type: "Outreach" },
  { date: "2027-01-23", title: "League tournament", place: "Regional venue", type: "Competition" },
  { date: "2027-02-27", title: "State championship", place: "State venue", type: "Competition" },
];

const AMOUNTS = [10, 25, 50, 100];
/* ==================================== */

const money = (n) => "$" + Number(n).toLocaleString("en-US");

function Nav() {
  const links = [
    ["about", "About"],
    ["events", "Events"],
    ["donate", "Donate"],
  ];
  return (
    <nav aria-label="Main">
      <div className="wrap">
        <b>{TEAM.name}</b>
        <ul>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div>
          <h1>
            Delta<span>Dragons</span>
          </h1>
          <p>
            A student-run FIRST Tech Challenge team that designs, builds and programs robots, and learns to work as a
            team.
          </p>
          <div className="btns">
            <a className="btn gold" href="#donate">Support our season</a>
            <a className="btn line" href="#events">See upcoming events</a>
          </div>
        </div>
        <DeltaLogo />
      </div>
    </header>
  );
}

function About() {
  const facts = [
    ["Team", TEAM.name],
    ["FTC number", TEAM.number],
    ["Based in", TEAM.city],
    ["Founded", TEAM.founded],
    ["Members", TEAM.members],
    ["Subteams", "Build, Code, Design, Outreach"],
  ];
  return (
    <section id="about">
      <div className="wrap about">
        <div>
          <h2>About us</h2>
          <p>
            We are the Delta Dragons, a group of students who build robots for the FIRST Tech Challenge (FTC). Each
            season a new game is announced, and we have a few months to design, build, program and drive a robot that
            can play it.
          </p>
          <p>
            Along the way we learn CAD, machining, programming in Java, and just as much about outreach, fundraising,
            and working together. Everyone on the team has a role, and every member gets hands-on time with the robot.
          </p>
          <p>
            We also share what we know. We run demos for younger students and mentor newer teams, because FIRST is
            about helping each other do well.
          </p>
        </div>
        <aside className="facts" aria-label="Team facts">
          <dl>
            {facts.map(([k, v]) => (
              <Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

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

function Events() {
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

function Progress() {
  const pct = Math.min(100, Math.round((CONFIG.raised / CONFIG.goal) * 100));
  return (
    <div className="card">
      <h3>Our goal</h3>
      <div
        className="bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={pct + "% of fundraising goal"}
      >
        <i style={{ width: pct + "%" }} />
      </div>
      <div className="raised">
        <span>{money(CONFIG.raised)} raised</span>
        <span>Goal {money(CONFIG.goal)}</span>
      </div>
      <ul className="uses">
        <li>$25 buys a set of motor mounts and hardware</li>
        <li>$50 helps cover a competition fee</li>
        <li>$100 buys a new sensor or a drivetrain part</li>
      </ul>
    </div>
  );
}

function Give() {
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");

  const note = encodeURIComponent("Delta Dragons FTC donation");
  const pay = [
    ["pp", "PayPal", `https://www.paypal.me/${CONFIG.paypal}/${amount}`],
    ["vm", "Venmo", `https://venmo.com/u/${CONFIG.venmo}?txn=pay&amount=${amount}&note=${note}`],
    ["ca", "Cash App", `https://cash.app/$${CONFIG.cashapp}/${amount}`],
  ];
  const needsSetup = [CONFIG.paypal, CONFIG.venmo, CONFIG.cashapp].some((v) => /^Your/i.test(v));

  const onCustom = (e) => {
    setCustom(e.target.value);
    const v = Math.floor(Number(e.target.value));
    if (v >= 1) setAmount(v);
  };

  return (
    <div className="card">
      <h3>Give now</h3>
      <div className="amts" role="group" aria-label="Donation amount">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={a === amount && custom === ""}
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
          >
            {money(a)}
          </button>
        ))}
      </div>

      <label htmlFor="custom">Other amount ($)</label>
      <input
        id="custom"
        className="cust"
        type="number"
        min={1}
        step={1}
        inputMode="numeric"
        placeholder="Enter amount"
        value={custom}
        onChange={onCustom}
      />

      <div className="pay">
        {pay.map(([cls, name, href]) => (
          <a key={cls} className={cls} href={href} target="_blank" rel="noopener noreferrer">
            <span>Pay with {name}</span>
            <span>{money(amount)}</span>
          </a>
        ))}
      </div>

      <p className="note">
        Payments open in the payment app with the amount filled in. Tell us your name in the note if you'd like a
        thank-you.
      </p>
      {needsSetup && (
        <p className="warn">
          Team: add your real PayPal, Venmo and Cash App usernames in CONFIG at the top of this file to turn these
          buttons on.
        </p>
      )}
    </div>
  );
}

function Fundraising() {
  return (
    <section id="donate" className="fund">
      <div className="wrap">
        <h2>Help fund our season</h2>
        <p className="lede">
          Registration fees, parts, tools, travel and tournament costs add up. Every gift goes straight to the robot
          and the team.
        </p>
        <div className="fgrid">
          <Progress />
          <Give />
        </div>
      </div>
    </section>
  );
}

export default function DeltaDragons() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Events />
        <Fundraising />
      </main>
      <footer>
        <div className="wrap">
          {TEAM.name} · FTC Team {TEAM.number} · Contact: {TEAM.email}
        </div>
      </footer>
    </>
  );
}
