'use client';

import React, { useEffect, useState } from 'react';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });
  const [error, setError] = useState('');

  const loadProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        imageUrl: form.imageUrl,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to create product');
    } else {
      setForm({ name: '', description: '', price: '', category: '', imageUrl: '' });
      loadProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) loadProducts();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Existing products</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {products.map((p) => (
            <li
              key={p._id}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}
            >
              <span>
                <strong>{p.name}</strong>  {p.category}  {`$${p.price}`}
              </span>
              <button onClick={() => handleDelete(p._id)} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
          {products.length === 0 && <li>No products yet.</li>}
        </ul>
      </div>
      <div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Add product</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input name="category" placeholder="Category (e.g. men, women, accessories)" value={form.category} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: '0.6rem',
              borderRadius: 4,
              border: 'none',
              backgroundColor: '#111',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductsPage;
