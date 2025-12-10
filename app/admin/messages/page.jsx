'use client';

import React, { useEffect, useState } from 'react';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data.messages || []);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markRead = async (id) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
    });
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadMessages();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Messages</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((m) => (
          <li
            key={m._id}
            style={{
              padding: '0.75rem',
              borderRadius: 6,
              border: '1px solid #eee',
              backgroundColor: m.read ? '#fafafa' : '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <strong>{m.subject}</strong>
              <span style={{ fontSize: '0.8rem', color: '#777' }}>{m.email}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{m.body}</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              {!m.read && (
                <button
                  onClick={() => markRead(m._id)}
                  style={{ border: 'none', background: '#111', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 4, cursor: 'pointer' }}
                >
                  Mark as read
                </button>
              )}
              <button
                onClick={() => handleDelete(m._id)}
                style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {messages.length === 0 && <li>No messages yet.</li>}
      </ul>
    </div>
  );
};

export default AdminMessagesPage;
