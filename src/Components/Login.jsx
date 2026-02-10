import { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Demo credentials
  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    student: { username: 'student', password: 'student123' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      // Check admin credentials
      if (username === credentials.admin.username && password === credentials.admin.password) {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', username);
        onLogin('admin');
      } 
      // Check student credentials
      else if (username === credentials.student.username && password === credentials.student.password) {
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('username', username);
        onLogin('student');
      } 
      else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = (role) => {
    setUsername(credentials[role].username);
    setPassword(credentials[role].password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">🎓</div>
          <h1>CampusHub</h1>
          <p>Smart College Event & Notice Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <div className="demo-buttons">
            <button 
              className="demo-btn admin"
              onClick={() => handleDemoLogin('admin')}
            >
              Admin (admin/admin123)
            </button>
            <button 
              className="demo-btn student"
              onClick={() => handleDemoLogin('student')}
            >
              Student (student/student123)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
