import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { loginAdmin } from '../mockDb';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page flex-center section-padding">
      <div className="admin-card glass animate-scale-in">
        <div className="admin-card-header">
          <div className="admin-icon">
            <Shield size={20} strokeWidth={1.5} />
          </div>
          <h2 className="h3">Admin Portal</h2>
          <p className="admin-card-desc">Secure access to inventory management</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin} className="admin-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="admin@brak.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-submit-btn" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Access Dashboard'}
          </button>

          <div className="demo-credentials">
            <p className="demo-label">Admin Access Only</p>
            <p>Please enter your registered Supabase credentials</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
