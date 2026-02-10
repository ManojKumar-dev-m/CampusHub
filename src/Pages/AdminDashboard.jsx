import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import './Dashboard.css';

// Initialize localStorage data
const initializeData = () => {
  if (!localStorage.getItem('events')) {
    const initialEvents = [
      { id: 1, title: 'Tech Fest 2026', date: '2026-03-15', time: '10:00 AM', location: 'Main Auditorium', description: 'Annual technology festival with coding competitions.', type: 'Technical', status: 'Approved', submittedBy: 'Admin' },
      { id: 2, title: 'Cultural Night', date: '2026-02-20', time: '6:00 PM', location: 'Open Air Theater', description: 'Celebrate diversity with music and dance.', type: 'Cultural', status: 'Approved', submittedBy: 'Admin' },
      { id: 3, title: 'Guest Lecture on AI', date: '2026-02-25', time: '2:00 PM', location: 'Seminar Hall', description: 'Industry expert shares AI insights.', type: 'Academic', status: 'Approved', submittedBy: 'Admin' },
    ];
    localStorage.setItem('events', JSON.stringify(initialEvents));
  }

  if (!localStorage.getItem('notices')) {
    const initialNotices = [
      { id: 1, title: 'Exam Schedule Released', date: '2026-02-10', priority: 'High', content: 'Final semester exam schedule published.', postedBy: 'Examination Cell' },
      { id: 2, title: 'Library Timings Change', date: '2026-02-08', priority: 'Medium', content: 'Library open until 10 PM during exam week.', postedBy: 'Library Administration' },
      { id: 3, title: 'Placement Drive Alert', date: '2026-02-12', priority: 'High', content: 'TechCorp campus recruitment on Feb 28.', postedBy: 'Training & Placement' },
    ];
    localStorage.setItem('notices', JSON.stringify(initialNotices));
  }
};

function AdminDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  // Form states
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '', type: 'Technical' });
  const [newNotice, setNewNotice] = useState({ title: '', priority: 'Medium', content: '', postedBy: '' });

  useEffect(() => {
    initializeData();
    loadData();
  }, []);

  const loadData = () => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
    setEvents(storedEvents);
    setNotices(storedNotices);
  };

  // Admin: Create event directly
  const addEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      const event = { ...newEvent, id: Date.now(), status: 'Approved', submittedBy: 'Admin' };
      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setNewEvent({ title: '', date: '', time: '', location: '', description: '', type: 'Technical' });
    }
  };

  // Admin: Approve/Reject events
  const updateEventStatus = (id, status) => {
    const updatedEvents = events.map(e => e.id === id ? { ...e, status } : e);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Admin: Delete event
  const deleteEvent = (id) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Admin: Create notice
  const addNotice = (e) => {
    e.preventDefault();
    if (newNotice.title && newNotice.content) {
      const notice = { ...newNotice, id: Date.now(), date: new Date().toISOString().split('T')[0] };
      const updatedNotices = [...notices, notice];
      setNotices(updatedNotices);
      localStorage.setItem('notices', JSON.stringify(updatedNotices));
      setNewNotice({ title: '', priority: 'Medium', content: '', postedBy: '' });
    }
  };

  // Admin: Delete notice
  const deleteNotice = (id) => {
    const updatedNotices = notices.filter(n => n.id !== id);
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
  };

  const pendingEvents = events.filter(e => e.status === 'Pending');
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
            className={`dash-nav-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending ({pendingEvents.length})
          </button>
          <button 
            className={`dash-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            📢 Notices
          </button>
        </nav>

        {/* Events Management */}
        {activeTab === 'events' && (
          <section className="dash-section">
            <h2>Manage Events</h2>
            
            <div className="dash-grid">
              {/* Add Event Form */}
              <div className="dash-card">
                <h3>Create New Event</h3>
                <form onSubmit={addEvent} className="dash-form">
                  <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required />
                  <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} required />
                  <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} />
                  <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} />
                  <select value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}>
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Academic</option>
                    <option>Sports</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}></textarea>
                  <button type="submit" className="dash-btn primary">Create Event</button>
                </form>
              </div>

              {/* Approved Events List */}
              <div className="dash-list">
                <h3>Approved Events ({approvedEvents.length})</h3>
                {approvedEvents.length === 0 ? (
                  <div className="empty-state">No approved events yet.</div>
                ) : (
                  approvedEvents.map(event => (
                    <div key={event.id} className={`dash-card-item ${event.type.toLowerCase()}`}>
                      <div className="item-header">
                        <span className="event-type">{event.type}</span>
                        <span className="status-badge approved">Approved</span>
                      </div>
                      <h4>{event.title}</h4>
                      <div className="item-details">
                        <span>📅 {event.date}</span>
                        <span>📍 {event.location}</span>
                      </div>
                      <p>{event.description}</p>
                      <div className="item-actions">
                        <button className="action-btn delete" onClick={() => deleteEvent(event.id)}>Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Pending Requests */}
        {activeTab === 'pending' && (
          <section className="dash-section">
            <h2>Pending Event Requests ({pendingEvents.length})</h2>
            
            {pendingEvents.length === 0 ? (
              <div className="empty-state">
                <p>🎉 No pending requests!</p>
                <p>All student event requests have been processed.</p>
              </div>
            ) : (
              <div className="pending-list">
                {pendingEvents.map(event => (
                  <div key={event.id} className="pending-card">
                    <div className="pending-header">
                      <span className={`event-type ${event.type.toLowerCase()}`}>{event.type}</span>
                      <span className="submitted-by">Submitted by: {event.submittedBy}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <div className="pending-details">
                      <span>📅 {event.date}</span>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p>{event.description}</p>
                    <div className="pending-actions">
                      <button className="action-btn approve" onClick={() => updateEventStatus(event.id, 'Approved')}>
                        ✓ Approve
                      </button>
                      <button className="action-btn reject" onClick={() => updateEventStatus(event.id, 'Rejected')}>
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Notices Management */}
        {activeTab === 'notices' && (
          <section className="dash-section">
            <h2>Manage Notices</h2>
            
            <div className="dash-grid">
              {/* Add Notice Form */}
              <div className="dash-card">
                <h3>Post New Notice</h3>
                <form onSubmit={addNotice} className="dash-form">
                  <input type="text" placeholder="Notice Title" value={newNotice.title} onChange={(e) => setNewNotice({...newNotice, title: e.target.value})} required />
                  <select value={newNotice.priority} onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <input type="text" placeholder="Posted By" value={newNotice.postedBy} onChange={(e) => setNewNotice({...newNotice, postedBy: e.target.value})} />
                  <textarea placeholder="Notice Content" value={newNotice.content} onChange={(e) => setNewNotice({...newNotice, content: e.target.value})} required></textarea>
                  <button type="submit" className="dash-btn primary">Post Notice</button>
                </form>
              </div>

              {/* Notices List */}
              <div className="dash-list">
                <h3>All Notices ({notices.length})</h3>
                {notices.length === 0 ? (
                  <div className="empty-state">No notices posted yet.</div>
                ) : (
                  notices.map(notice => (
                    <div key={notice.id} className={`dash-card-item ${notice.priority.toLowerCase()}`}>
                      <div className="item-header">
                        <span className={`priority-badge ${notice.priority.toLowerCase()}`}>{notice.priority}</span>
                      </div>
                      <h4>{notice.title}</h4>
                      <p>{notice.content}</p>
                      <div className="item-footer">
                        <span>📅 {notice.date}</span>
                        <span>👤 {notice.postedBy}</span>
                      </div>
                      <div className="item-actions">
                        <button className="action-btn delete" onClick={() => deleteNotice(notice.id)}>Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
