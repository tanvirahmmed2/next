'use client';

import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.6rem',
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#111',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
