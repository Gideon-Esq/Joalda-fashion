import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h2 className="text-center mb-20">Sign Up</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
          <div className="mb-20">
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
        </form>
        <p className="text-center mt-20">
          Already have an account? <Link to="/login" style={{ color: 'var(--secondary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
