import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function NotFound() {
  return (
    <div className="not-found-page" style={{ 
      paddingTop: 'var(--spacing-xxl)', 
      paddingBottom: 'var(--spacing-xxl)',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(4rem, 10vw, 8rem)', 
        fontWeight: '300', 
        color: 'var(--text-light)',
        margin: '0',
        lineHeight: '1'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
        fontWeight: '300',
        margin: 'var(--spacing-md) 0'
      }}>
        Page Not Found
      </h2>
      
      <p style={{ 
        fontSize: '1.125rem', 
        color: 'var(--text-light)',
        maxWidth: '500px',
        margin: '0 auto var(--spacing-lg)',
        lineHeight: '1.6'
      }}>
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back on track.
      </p>
      
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline">Browse Shop</Button>
        </Link>
      </div>
      
      <div style={{ 
        marginTop: 'var(--spacing-xl)',
        padding: 'var(--spacing-lg)',
        backgroundColor: '#F5F5F5',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: 'var(--spacing-sm)' }}>
          Popular Pages
        </h3>
        <ul style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--spacing-xs)',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li><Link to="/shop" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Shop All Products</Link></li>
          <li><Link to="/cart" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>View Your Cart</Link></li>
          <li><Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Create Account</Link></li>
        </ul>
      </div>
    </div>
  );
}
