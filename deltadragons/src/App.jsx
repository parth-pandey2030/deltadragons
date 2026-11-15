import "./App.css";
import DeltaLogo from "./DeltaLogo";
import About from "./About";
import Events from "./Events";
import FIRST from "./assets/FIRSTLogo.svg";
import Fundraiser from "./Fundraiser";
import CONFIG from "./CONFIG";

const TEAM = {
  name: "Delta Dragons",
  number: "#37705",
  city: "Ellicott City, MD",
  founded: "2026",
  members: "12 students",
  email: "deltadragonsdms@gmail.com",
  instagram: "www.instagram.com/deltadragonsdms",
};

const AMOUNTS = [10, 25, 50, 100]; // Edit

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
        <img src={FIRST} alt="FIRST" />
      </div>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About TEAM={TEAM}/>
        <Events />
        <Fundraiser CONFIG={CONFIG} AMOUNTS={AMOUNTS}/>
      </main>
      <footer>
        <div className="wrap">
          {TEAM.name} · FTC Team {TEAM.number} · Contact: {TEAM.email}
        </div>
      </footer>
    </>
  );
}
