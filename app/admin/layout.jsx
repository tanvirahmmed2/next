import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <section>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Admin Panel</h1>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <a href="/admin" style={{ textDecoration: 'none', color: '#333' }}>Overview</a>
        <a href="/admin/products" style={{ textDecoration: 'none', color: '#333' }}>Products</a>
        <a href="/admin/users" style={{ textDecoration: 'none', color: '#333' }}>Users</a>
        <a href="/admin/messages" style={{ textDecoration: 'none', color: '#333' }}>Messages</a>
      </nav>
      {children}
    </section>
  );
};

export default AdminLayout;
