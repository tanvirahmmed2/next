'use client';

import React, { useState } from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setSuccess('Registered successfully. You can now login.');
        setName('');
        setEmail('');
        setPassword('');
        setRole('user');
      }
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', fontSize: '0.9rem' }}>{success}</p>}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
