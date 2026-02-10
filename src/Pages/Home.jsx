import Hero from '../Components/Hero';
import './Home.css';

function Home({ onShowLogin }) {
  const handleBrowseEvents = () => {
    onShowLogin();
  };

  const handleViewNotices = () => {
    onShowLogin();
  };

  return (
    <div className="home">
      <Hero 
        eventsCount={3}
        noticesCount={3}
        onBrowseEvents={handleBrowseEvents}
        onViewNotices={handleViewNotices}
      />
      
      {/* Quick Preview Sections */}
      <section className="quick-preview">
        <div className="preview-container">
          <div className="preview-card">
            <div className="preview-icon">📅</div>
            <h3>Upcoming Events</h3>
            <p>Stay updated with the latest campus activities, workshops, and competitions.</p>
            <button className="preview-btn" onClick={handleBrowseEvents}>View All Events →</button>
          </div>
          
          <div className="preview-card">
            <div className="preview-icon">📢</div>
            <h3>Important Notices</h3>
            <p>Never miss an important announcement from the college administration.</p>
            <button className="preview-btn" onClick={handleViewNotices}>Check Notices →</button>
          </div>
          
          <div className="preview-card">
            <div className="preview-icon">🎯</div>
            <h3>Easy Management</h3>
            <p>Add and manage events and notices with just a few clicks.</p>
            <button className="preview-btn login-btn" onClick={onShowLogin}>
              Login →
            </button>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-section-content">
          <h2>Ready to Get Started?</h2>
          <p>Login to access your dashboard and manage campus activities.</p>
          <button className="hero-btn primary" onClick={onShowLogin}>
            Login Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
