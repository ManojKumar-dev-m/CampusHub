import { useState, useEffect } from 'react';
import Login from './Components/Login';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import Home from './Pages/Home';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
    setLoading(false);
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setUserRole(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render login modal
  if (showLogin) {
    return (
      <div className="login-page-wrapper">
        <button className="close-modal" onClick={() => setShowLogin(false)}>×</button>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // Route protection based on user role
  const renderContent = () => {
    // Admin dashboard
    if (userRole === 'admin') {
      return <AdminDashboard onLogout={handleLogout} />;
    }

    // Student dashboard
    if (userRole === 'student') {
      return <StudentDashboard onLogout={handleLogout} />;
    }

    // Public home page (no auth required)
    return <Home onShowLogin={() => setShowLogin(true)} />;
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;
