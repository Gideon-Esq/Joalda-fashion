import React, { useEffect, useState } from 'react';
import { useCart, Product } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { ProductCardSkeleton } from '../components/SkeletonLoader';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xxl)' }}>
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '300', textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>
            Our Collection
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto var(--spacing-lg)' }}>
            Sustainable fashion crafted with care and inspired by culture.
          </p>
        </div>
        <div className="products-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 'var(--spacing-lg)',
          padding: '0 var(--spacing-lg)'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <EmptyState
        title="Unable to load products"
        message="Please try again later or contact support."
        actionText="Go Home"
        actionLink="/"
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        message="Check back soon for new arrivals."
        actionText="Go Home"
        actionLink="/"
      />
    );
  }

  return (
    <div style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '300', textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>
          Our Collection
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto var(--spacing-lg)' }}>
          Sustainable fashion crafted with care and inspired by culture.
        </p>
        
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} placeholder="Search by name, description, or category..." />
        
        {/* Search Results Info */}
        {searchQuery && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            {filteredProducts.length === 0 
              ? `No products found for "${searchQuery}"`
              : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
            }
          </p>
        )}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <h3 style={{ fontWeight: '300', color: 'var(--text-light)' }}>
            No products match your search
          </h3>
          <p style={{ color: 'var(--text-light)', marginBottom: 'var(--spacing-md)' }}>
            Try adjusting your search terms or browse all products
          </p>
          <button 
            onClick={() => handleSearch('')}
            className="btn btn-primary"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
