import { useState } from 'react';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Fest 2026', date: '2026-03-15', time: '10:00 AM', location: 'Main Auditorium', description: 'Annual technology festival with coding competitions, workshops, and tech talks.', type: 'Technical' },
    { id: 2, title: 'Cultural Night', date: '2026-02-20', time: '6:00 PM', location: 'Open Air Theater', description: 'Celebrate diversity with music, dance, and drama performances.', type: 'Cultural' },
    { id: 3, title: 'Guest Lecture on AI', date: '2026-02-25', time: '2:00 PM', location: 'Seminar Hall', description: 'Industry expert shares insights on Artificial Intelligence trends.', type: 'Academic' },
  ]);

  const [newEvent, setNewEvent] = useState({ 
    title: '', date: '', time: '', location: '', description: '', type: 'Technical' 
  });

  const addEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '', type: 'Technical' });
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <section className="section events-section">
      <div className="section-header">
        <h2>📅 Upcoming Events</h2>
        <p>Stay updated with the latest campus activities</p>
      </div>
      
      <div className="content-grid">
        {/* Add Event Form */}
        <div className="add-card">
          <h3>Add New Event</h3>
          <form onSubmit={addEvent} className="add-form">
            <input 
              type="text" 
              placeholder="Event Title" 
              value={newEvent.title} 
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
              required 
            />
            <input 
              type="date" 
              value={newEvent.date} 
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} 
              required 
            />
            <input 
              type="time" 
              value={newEvent.time} 
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Location" 
              value={newEvent.location} 
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} 
            />
            <select 
              value={newEvent.type} 
              onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
            >
              <option>Technical</option>
              <option>Cultural</option>
              <option>Academic</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
            <textarea 
              placeholder="Description" 
              value={newEvent.description} 
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            ></textarea>
            <button type="submit" className="submit-btn">Add Event</button>
          </form>
        </div>

        {/* Event Cards */}
        <div className="events-list">
          {events.length === 0 ? (
            <div className="empty-state">
              <p>No events yet. Add your first event!</p>
            </div>
          ) : (
            events.map(event => (
              <div key={event.id} className={`event-card ${event.type.toLowerCase()}`}>
                <div className="event-header">
                  <span className="event-type">{event.type}</span>
                  <button className="delete-btn" onClick={() => deleteEvent(event.id)}>×</button>
                </div>
                <h3>{event.title}</h3>
                <div className="event-details">
                  <span>📅 {event.date}</span>
                  <span>🕐 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
                <p>{event.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Events;
