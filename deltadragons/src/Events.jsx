import React, { useState, useEffect } from 'react';
import addEvents from './addEvents';

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

// The public page only reads; the database refuses writes from anyone who isn't on the team.
function formatDate(d) {
  // Add a time so the date isn't shifted by the visitor's timezone
  return new Date(d + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function Events() {
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)

    supabase.from('items').select('*').order('id')
      .then(({ data }) => setItems(data ?? []))

    // Only upcoming events, soonest first
    supabase.from('events').select('*').gte('event_date', today).order('event_date')
      .then(({ data }) => setEvents(data ?? []))
  }, [])

  return (
    <div>
      <h2>Upcoming events</h2>
      {events.length === 0 && <p>No upcoming events.</p>}
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <strong>{ev.title}</strong>
            <div>{formatDate(ev.event_date)}{ev.event_time && `, ${ev.event_time}`}</div>
            {ev.location && <div>{ev.location}</div>}
            {ev.description && <p>{ev.description}</p>}
          </li>
        ))}
      </ul>

      <h2>Items</h2>
      <ul>
        {items.map(i => <li key={i.id}><strong>{i.name}</strong>: {i.description}</li>)}
      </ul>
    </div>
  )
}