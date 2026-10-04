import React, { Fragment } from "react";

export default function About(TEAM) {
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