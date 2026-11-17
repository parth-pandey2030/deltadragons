import React, { useState } from 'react';
import Progress, { money } from "./Progress";
  
export default function Fundraiser({CONFIG, AMOUNTS = []}) {
    let Give = () => {
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
    };

    return (
      <section id="donate" className="fund">
        <div className="wrap">
          <h2>Help fund our season</h2>
          <p className="lede">
            Registration fees, parts, tools, travel and tournament costs add up. Every gift goes straight to the robot
            and the team.
          </p>
          <div className="fgrid">
            <Progress CONFIG={CONFIG} />
            <Give />
          </div>
        </div>
      </section>
    );
}