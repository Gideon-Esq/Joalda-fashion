import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h4>Joalda Fashion</h4>
            <p>Sustainable fashion crafted with care and inspired by culture.</p>
          </div>
          
          <div>
            <h4>Shop</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=cultural">Cultural Collection</Link></li>
              <li><Link to="/shop?category=standard">Standard Collection</Link></li>
            </ul>
          </div>
          
          <div>
            <h4>Customer Service</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4>About</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <li><Link to="/our-story">Our Story</Link></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Ethics & Values</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: 'var(--spacing-md)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.75rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Joalda Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
