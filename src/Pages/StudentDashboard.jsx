import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import './Dashboard.css';

function StudentDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  // Form state
  const [newEvent, setNewEvent] = useState({ 
    title: '', date: '', time: '', location: '', description: '', type: 'Technical' 
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
    setEvents(storedEvents);
    setNotices(storedNotices);
  };

  // Student: Submit event request
  const submitEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      const event = { 
        ...newEvent, 
        id: Date.now(), 
        status: 'Pending', 
        submittedBy: localStorage.getItem('username') || 'Student'
      };
      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setNewEvent({ title: '', date: '', time: '', location: '', description: '', type: 'Technical' });
      alert('Event submitted for approval! Pending admin review.');
    }
  };

  // Student: View their pending events
  const myPendingEvents = events.filter(e => e.submittedBy === (localStorage.getItem('username') || 'Student') && e.status === 'Pending');
  const approvedEvents = events.filter(e => e.status === 'Approved');

  return (
    <div className="dashboard">
      <Header onLogout={onLogout} />

      <main className="dashboard-content">
        {/* Navigation Tabs */}
        <nav className="dashboard-nav">
          <button 
            className={`dash-nav-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 Events
          </button>
          <button 
            className={`dash-nav-btn ${activeTab === 'my-events' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-events')}
          >
            📝 My Requests
          </button>
          <button 
            className={`dash-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            📢 Notices
          </button>
        </nav>

        {/* Browse Events */}
        {activeTab === 'events' && (
          <section className="dash-section">
            <h2>Upcoming Events</h2>
            <p className="section-desc">Browse all approved campus events</p>
            
            {approvedEvents.length === 0 ? (
              <div className="empty-state">
                <p>📅 No events available yet.</p>
                <p>Check back later for upcoming events!</p>
              </div>
            ) : (
              <div className="events-grid">
                {approvedEvents.map(event => (
                  <div key={event.id} className={`event-card ${event.type.toLowerCase()}`}>
                    <div className="event-header">
                      <span className="event-type">{event.type}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <div className="event-details">
                      <span>📅 {event.date}</span>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* My Event Requests */}
        {activeTab === 'my-events' && (
          <section className="dash-section">
            <h2>Submit New Event Request</h2>
            
            {/* Submit Form */}
            <div className="dash-card submit-card">
              <h3>Request New Event</h3>
              <form onSubmit={submitEvent} className="dash-form">
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
                  placeholder="Venue" 
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
                  placeholder="Describe your event..." 
                  value={newEvent.description} 
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                ></textarea>
                <button type="submit" className="dash-btn primary">Submit for Approval</button>
              </form>
            </div>

            {/* My Pending Events */}
            <h3 className="sub-section-title">My Pending Requests ({myPendingEvents.length})</h3>
            
            {myPendingEvents.length === 0 ? (
              <div className="empty-state small">
                <p>No pending requests.</p>
                <p>Submit an event request above!</p>
              </div>
            ) : (
              <div className="pending-list">
                {myPendingEvents.map(event => (
                  <div key={event.id} className="pending-card student-card">
                    <div className="pending-header">
                      <span className={`event-type ${event.type.toLowerCase()}`}>{event.type}</span>
                      <span className="status-badge pending">Pending Approval</span>
                    </div>
                    <h3>{event.title}</h3>
                    <div className="pending-details">
                      <span>📅 {event.date}</span>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p>{event.description}</p>
                    <div className="pending-info">
                      <small>Submitted on: {new Date().toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Notices */}
        {activeTab === 'notices' && (
          <section className="dash-section">
            <h2>Important Notices</h2>
            <p className="section-desc">Stay updated with the latest announcements</p>
            
            {notices.length === 0 ? (
              <div className="empty-state">
                <p>📢 No notices available.</p>
              </div>
            ) : (
              <div className="notices-list">
                {notices.map(notice => (
                  <div key={notice.id} className={`notice-card ${notice.priority.toLowerCase()}`}>
                    <div className="notice-header">
                      <span className={`priority-badge ${notice.priority.toLowerCase()}`}>{notice.priority}</span>
                    </div>
                    <h3>{notice.title}</h3>
                    <p>{notice.content}</p>
                    <div className="notice-footer">
                      <span>📅 {notice.date}</span>
                      <span>👤 {notice.postedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
