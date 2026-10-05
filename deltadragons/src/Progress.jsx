import React from 'react';

export const money = (n) => "$" + Number(n).toLocaleString("en-US");

export default function Progress(team_config) {
    const CONFIG = team_config.CONFIG;
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