import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Discover our sustainable fashion collection."
        actionText="Start Shopping"
        actionLink="/shop"
      />
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xxl)', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: 'var(--spacing-xl)' }}>
        Shopping Cart
      </h1>
      
      <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
        {cart.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr auto',
              gap: 'var(--spacing-md)',
              alignItems: 'center',
              borderBottom: index < cart.length - 1 ? '1px solid var(--border)' : 'none',
              paddingBottom: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)'
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: '100px',
                height: '130px',
                objectFit: 'cover'
              }}
            />
            
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: 'var(--spacing-xs)' }}>
                {item.name}
              </h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: 'var(--spacing-xs)' }}>
                ${item.price.toFixed(2)} each
              </p>
              {item.quantity >= item.stockQuantity && (
                <p style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>
                  Maximum stock reached
                </p>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--spacing-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--white)',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '500' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stockQuantity}
                  style={{
                    border: '1px solid var(--border)',
                    background: item.quantity >= item.stockQuantity ? 'var(--light-gray)' : 'var(--white)',
                    width: '32px',
                    height: '32px',
                    cursor: item.quantity >= item.stockQuantity ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  +
                </button>
              </div>
              
              <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: 'var(--spacing-xs)' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  padding: '0'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '2px solid var(--text)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '400' }}>Total</h2>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '500' }}>${total.toFixed(2)}</h2>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
