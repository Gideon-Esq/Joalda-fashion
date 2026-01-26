import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../context/CartContext';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Admin() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json() as Product[];
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setSuccessMessage('Product deleted successfully');
        fetchProducts();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('An error occurred while deleting the product');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Product description is required');
      return false;
    }
    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    if (formData.stockQuantity < 0) {
      setError('Stock quantity cannot be negative');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError('Image URL is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage(editingProduct ? 'Product updated successfully' : 'Product created successfully');
        fetchProducts();
        setEditingProduct(null);
        setIsAdding(false);
        resetForm();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error || 'Failed to save product. You might be unauthorized.');
      }
    } catch (err) {
      setError('An error occurred while saving the product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'standard',
      imageUrl: '',
      stockQuantity: 0
    });
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
    setError(null);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingProduct(null);
    resetForm();
    setError(null);
  };

  if (!user?.is_admin) return null;

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '300' }}>Admin Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => {
            setIsAdding(true);
            setEditingProduct(null);
            resetForm();
            setError(null);
          }}
        >
          Add New Product
        </Button>
      </div>

      {successMessage && (
        <div style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--white)',
          padding: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-md)',
          textAlign: 'center'
        }}>
          {successMessage}
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: 'var(--danger)',
          padding: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-md)',
          border: '1px solid var(--danger)'
        }}>
          {error}
        </div>
      )}

      {isAdding && (
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '400', marginBottom: 'var(--spacing-md)' }}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                Product Name *
              </label>
              <input
                placeholder="Enter product name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                Description *
              </label>
              <textarea
                placeholder="Enter product description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price || ''}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.stockQuantity || ''}
                  onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="standard">Standard</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem', fontWeight: '500' }}>
                Image URL *
              </label>
              <input
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
              <Button type="submit" variant="primary">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '400', marginBottom: 'var(--spacing-sm)' }}>
          Products ({products.length})
        </h2>
        {products.map(product => (
          <div key={product.id} className="card" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--spacing-md)',
            gap: 'var(--spacing-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flex: 1 }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '80px', height: '100px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '500', margin: '0 0 var(--spacing-xs) 0' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', margin: '0 0 var(--spacing-xs) 0' }}>
                  {product.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', fontSize: '0.875rem' }}>
                  <span><strong>Price:</strong> ${product.price.toFixed(2)}</span>
                  <span><strong>Stock:</strong> {product.stockQuantity}</span>
                  <span><strong>Category:</strong> {product.category}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
              <Button onClick={() => startEdit(product)} variant="outline">
                Edit
              </Button>
              <Button onClick={() => handleDelete(product.id)} variant="danger">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
