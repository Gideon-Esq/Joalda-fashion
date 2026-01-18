import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, useCart } from '../context/CartContext';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.id === Number(id));
        setProduct(found || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{product.name}</h2>
        <p style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
        <p style={{ margin: '20px 0', lineHeight: '1.8' }}>{product.description}</p>
        <div style={{ marginBottom: '20px' }}>
            <strong>Category:</strong> {product.category} <br />
            <strong>Stock:</strong> {product.stockQuantity}
        </div>
        <button onClick={() => addToCart(product)} className="btn btn-secondary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Add to Cart</button>
        <div style={{ marginTop: '20px' }}>
            <Link to="/shop" style={{ textDecoration: 'underline' }}>&larr; Back to Shop</Link>
        </div>
      </div>
    </div>
  );
}
