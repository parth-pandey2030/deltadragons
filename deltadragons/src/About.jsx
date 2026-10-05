import React, { Fragment } from "react";

export default function About(team) {
    const TEAM = team.TEAM;
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
            Meet the Delta Dragons! We are a rookie FIRST Tech Challenge (FTC) robotics team based in Dunloggin Middle School, composed of 12 passionate student innovators. 
            Building on our successful foundation in FIRST Lego League (FLL) last year, we are moving up to FTC to start actually building robots ourselves. 
            Through our community outreach, we connect with local businesses to form mutually beneficial sponsorships. 
            </p>
            <br />
            <p>
              Along the way we learn CAD, machining, programming in Java, and just as much about outreach, fundraising,
              and working together. Everyone on the team has a role, and every member gets hands-on time with the robot.
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