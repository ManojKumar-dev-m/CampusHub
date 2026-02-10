import './Hero.css';

function Hero({ eventsCount, noticesCount, onBrowseEvents, onViewNotices }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Smart College Event & Notice Hub</h1>
        <p className="hero-subtitle">Your one-stop platform for all campus events and important notices</p>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">{eventsCount}</span>
            <span className="stat-label">Upcoming Events</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{noticesCount}</span>
            <span className="stat-label">Active Notices</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Access</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="hero-btn primary" onClick={onBrowseEvents}>Browse Events</button>
          <button className="hero-btn secondary" onClick={onViewNotices}>View Notices</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
