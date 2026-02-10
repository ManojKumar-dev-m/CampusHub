import { useState } from 'react';
import './Notices.css';

function Notices() {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Exam Schedule Released', date: '2026-02-10', priority: 'High', content: 'Final semester exam schedule has been published. Check your department notice board.', postedBy: 'Examination Cell' },
    { id: 2, title: 'Library Timings Change', date: '2026-02-08', priority: 'Medium', content: 'Library will remain open until 10 PM during exam week.', postedBy: 'Library Administration' },
    { id: 3, title: 'Placement Drive Alert', date: '2026-02-12', priority: 'High', content: 'TechCorp is conducting campus recruitment on Feb 28. Register by Feb 20.', postedBy: 'Training & Placement' },
  ]);

  const [newNotice, setNewNotice] = useState({ 
    title: '', priority: 'Medium', content: '', postedBy: '' 
  });

  const addNotice = (e) => {
    e.preventDefault();
    if (newNotice.title && newNotice.content) {
      setNotices([...notices, { ...newNotice, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
      setNewNotice({ title: '', priority: 'Medium', content: '', postedBy: '' });
    }
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <section className="section notices-section">
      <div className="section-header">
        <h2>📢 Important Notices</h2>
        <p>Stay informed with the latest announcements</p>
      </div>
      
      <div className="content-grid">
        {/* Add Notice Form */}
        <div className="add-card">
          <h3>Post New Notice</h3>
          <form onSubmit={addNotice} className="add-form">
            <input 
              type="text" 
              placeholder="Notice Title" 
              value={newNotice.title} 
              onChange={(e) => setNewNotice({...newNotice, title: e.target.value})} 
              required 
            />
            <select 
              value={newNotice.priority} 
              onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input 
              type="text" 
              placeholder="Posted By" 
              value={newNotice.postedBy} 
              onChange={(e) => setNewNotice({...newNotice, postedBy: e.target.value})} 
            />
            <textarea 
              placeholder="Notice Content" 
              value={newNotice.content} 
              onChange={(e) => setNewNotice({...newNotice, content: e.target.value})} 
              required
            ></textarea>
            <button type="submit" className="submit-btn">Post Notice</button>
          </form>
        </div>

        {/* Notice List */}
        <div className="notices-list">
          {notices.length === 0 ? (
            <div className="empty-state">
              <p>No notices yet. Post your first notice!</p>
            </div>
          ) : (
            notices.map(notice => (
              <div key={notice.id} className={`notice-card ${notice.priority.toLowerCase()}`}>
                <div className="notice-header">
                  <span className={`priority-badge ${notice.priority.toLowerCase()}`}>{notice.priority}</span>
                  <button className="delete-btn" onClick={() => deleteNotice(notice.id)}>×</button>
                </div>
                <h3>{notice.title}</h3>
                <p className="notice-content">{notice.content}</p>
                <div className="notice-footer">
                  <span>📅 {notice.date}</span>
                  <span>👤 {notice.postedBy}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Notices;
