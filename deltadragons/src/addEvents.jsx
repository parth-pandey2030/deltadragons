import React, { useState } from 'react';
import './addEvents.css';

export default function addEvents() {
  const [events, setEvents] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent reload

    // send data

    setEvents('');
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
            onChange={(e) => setMessage(e.target.value)} // Update state as user types
            style={{ width: '100%', maxWidth: '400px', padding: '8px' }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



function SimpleForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    // event.target.value extracts what the user typed
    setName(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the browser from reloading the page
    alert(`Submitted Name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
