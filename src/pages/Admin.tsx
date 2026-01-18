import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../context/CartContext';

export function Admin() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'standard',
    imageUrl: '',
    stockQuantity: 0
  });

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      fetchProducts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchProducts();
      setEditingProduct(null);
      setIsAdding(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'standard',
        imageUrl: '',
        stockQuantity: 0
      });
    } else {
        alert('Failed to save product. You might be unauthorized.');
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stockQuantity: product.stockQuantity
    });
    setIsAdding(true);
  };

  if (!user?.is_admin) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsAdding(true);
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: 0,
                category: 'standard',
                imageUrl: '',
                stockQuantity: 0
            });
          }}
        >
          Add New Product
        </button>
      </div>

      {isAdding && (
        <div className="card mb-20">
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
              style={{ padding: '8px' }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
              style={{ padding: '8px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                required
                style={{ padding: '8px', flex: 1 }}
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stockQuantity}
                onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                required
                style={{ padding: '8px', flex: 1 }}
              />
            </div>
            <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                style={{ padding: '8px' }}
            >
                <option value="standard">Standard</option>
                <option value="cultural">Cultural</option>
            </select>
            <input
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              required
              style={{ padding: '8px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-secondary">Save</button>
              <button type="button" onClick={() => setIsAdding(false)} className="btn btn-danger">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: 0 }}>{product.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>${product.price} - Stock: {product.stockQuantity}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startEdit(product)} className="btn btn-secondary">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
