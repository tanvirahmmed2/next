import React from 'react';

export const metadata = {
  title: 'Fashion Shop',
  description: 'Modern fashion shop built with Next.js',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: '#111' }}>
            Fashion Shop
          </a>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Shop</a>
            <a href="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</a>
            <a href="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</a>
            <a href="/admin" style={{ textDecoration: 'none', color: '#333' }}>Admin</a>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
