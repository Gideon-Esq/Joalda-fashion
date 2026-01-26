import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: '500', letterSpacing: '0.5px' }}>
          JOALDA FASHION
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          {user ? (
            <>
              {user.is_admin && <Link to="/admin">Admin</Link>}
              <span style={{ fontSize: '0.875rem', fontWeight: '400', textTransform: 'none' }}>
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '2px solid var(--text)',
                  color: 'var(--text)',
                  padding: '8px 16px',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--text)';
                  e.currentTarget.style.color = 'var(--white)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text)';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
