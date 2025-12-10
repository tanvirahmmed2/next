'use client';

import React, { useEffect, useState } from 'react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.users || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleMakeAdmin = async (id) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin' }),
    });
    if (res.ok) loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) loadUsers();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Email</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Role</th>
            <th style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }}>{u.name}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }}>{u.email}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }}>{u.role}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }}>
                {u.role !== 'admin' && (
                  <button
                    onClick={() => handleMakeAdmin(u._id)}
                    style={{ marginRight: '0.5rem', border: 'none', background: '#111', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Make admin
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '0.5rem' }}>
                No users yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
