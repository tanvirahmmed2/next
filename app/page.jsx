import React from 'react';
import { connectToDatabase } from '../lib/mongodb';
import Product from '../models/Product';

async function getProductsByCategory() {
  await connectToDatabase();
  const products = await Product.find().lean();

  const byCategory = {};
  for (const p of products) {
    const cat = p.category || 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
    });
  }
  return byCategory;
}

const HomePage = async () => {
  const productsByCategory = await getProductsByCategory();

  const categories = Object.keys(productsByCategory);

  if (categories.length === 0) {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fashion Shop</h1>
        <p>No products yet. Login as admin or seller to add products.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Shop</h1>
      {categories.map((cat) => (
        <section key={cat} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'capitalize' }}>{cat}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {productsByCategory[cat].map((p) => (
              <article
                key={p.id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '0.5rem' }}
                  />
                )}
                <h3 style={{ fontSize: '1.1rem' }}>{p.name}</h3>
                {p.description && (
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>
                    {p.description.length > 80 ? `${p.description.slice(0, 80)}...` : p.description}
                  </p>
                )}
                <strong>{`$${p.price.toFixed(2)}`}</strong>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
