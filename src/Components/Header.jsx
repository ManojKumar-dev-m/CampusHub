import './Header.css';

function Header({ onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">CampusHub</span>
        </div>
        <div className="header-actions">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
