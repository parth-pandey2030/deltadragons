import React, { useState, useEffect } from 'react';
import './App.css';

export default function addEvents() {
  const [events, setEvents] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent reload
    console.log('Submitted events:', events);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2> Add Upcoming Events </h2>
      
      {/* Attach the submit handler to onSubmit */}
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="events" style={{ display: 'block', fontWeight: 'bold' }}>Your Message</label>
          <textarea 
            id="events" 
            rows="5" 
            required 
            placeholder="Type events here..."
            value={events} // Bind the textarea value to React state
            onChange={(e) => setEvents(e.target.value)} // Update state as user types
            style={{ width: '100%', maxWidth: '400px', padding: '8px' }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
