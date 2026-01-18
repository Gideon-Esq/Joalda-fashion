import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Joalda Fashion</Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart ({cartCount})</Link>

          {user ? (
            <>
              {user.is_admin && <Link to="/admin">Admin Panel</Link>}
              <span style={{ fontSize: '0.9rem' }}>Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
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
