import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  return (
    <div>
      <h2>Team login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
             onChange={e => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign in</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  )
}

function ItemsEditor() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  async function load() {
    const { data, error } = await supabase.from('items').select('*').order('id')
    if (error) setError(error.message)
    else setItems(data)
  }
  useEffect(() => { load() }, [])

  // Update the row in local state as the person types
  function edit(id, field, value) {
    setItems(items.map(i => (i.id === id ? { ...i, [field]: value } : i)))
  }

  async function save(item) {
    const { error } = await supabase
      .from('items')
      .update({ name: item.name, description: item.description })
      .eq('id', item.id)
    setError(error ? `Could not save: ${error.message}` : '')
  }

  async function add() {
    const { error } = await supabase.from('items').insert({ name: 'New item' })
    if (error) setError(error.message)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete this item?')) return
    const { error } = await supabase.from('items').delete().eq('id', id)
    if (error) setError(error.message)
    load()
  }

  return (
    <div>
      <button onClick={add}>Add item</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <table>
        <thead>
          <tr><th>Name</th><th>Description</th><th></th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <input value={item.name}
                       onChange={e => edit(item.id, 'name', e.target.value)} />
              </td>
              <td>
                <input value={item.description ?? ''}
                       onChange={e => edit(item.id, 'description', e.target.value)} />
              </td>
              <td>
                <button onClick={() => save(item)}>Save</button>
                <button onClick={() => remove(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EventsEditor() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  async function load() {
    const { data, error } = await supabase.from('events').select('*').order('event_date')
    if (error) setError(error.message)
    else setEvents(data)
  }
  useEffect(() => { load() }, [])

  function edit(id, field, value) {
    setEvents(events.map(e => (e.id === id ? { ...e, [field]: value } : e)))
  }

  async function save(ev) {
    const { error } = await supabase.from('events').update({
      title: ev.title,
      event_date: ev.event_date,
      event_time: ev.event_time,
      location: ev.location,
      description: ev.description,
    }).eq('id', ev.id)
    setError(error ? `Could not save: ${error.message}` : '')
  }

  async function add() {
    const today = new Date().toISOString().slice(0, 10)
    const { error } = await supabase.from('events').insert({ title: 'New event', event_date: today })
    if (error) setError(error.message)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete this event?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) setError(error.message)
    load()
  }

  return (
    <div>
      <button onClick={add}>Add event</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <table>
        <thead>
          <tr><th>Title</th><th>Date</th><th>Time</th><th>Location</th><th>Description</th><th></th></tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td><input value={ev.title} onChange={e => edit(ev.id, 'title', e.target.value)} /></td>
              <td><input type="date" value={ev.event_date} onChange={e => edit(ev.id, 'event_date', e.target.value)} /></td>
              <td><input value={ev.event_time ?? ''} placeholder="6:00 PM" onChange={e => edit(ev.id, 'event_time', e.target.value)} /></td>
              <td><input value={ev.location ?? ''} onChange={e => edit(ev.id, 'location', e.target.value)} /></td>
              <td><input value={ev.description ?? ''} onChange={e => edit(ev.id, 'description', e.target.value)} /></td>
              <td>
                <button onClick={() => save(ev)}>Save</button>
                <button onClick={() => remove(ev.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = still loading
  const [tab, setTab] = useState('events')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <p>Loading…</p>
  if (!session) return <Login />

  return (
    <div>
      <p>
        Signed in as {session.user.email}{' '}
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </p>
      <p>
        <button onClick={() => setTab('events')} disabled={tab === 'events'}>Events</button>
        <button onClick={() => setTab('items')} disabled={tab === 'items'}>Items</button>
      </p>
      {tab === 'events' ? <EventsEditor /> : <ItemsEditor />}
    </div>
  )
}
