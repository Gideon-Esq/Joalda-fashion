import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, Product } from '../context/CartContext';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2 className="mb-20" style={{ color: 'var(--primary)' }}>Shop Our Collection</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        {products.map(product => (
          <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '10px 0' }}>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', flex: 1 }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)} className="btn btn-secondary">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
