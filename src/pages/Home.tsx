import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="home-page">
      <div className="hero" style={{
          textAlign: 'center',
          padding: '100px 20px',
          backgroundColor: '#e6ccb2',
          borderRadius: '8px',
          marginBottom: '40px'
        }}>
        <h1 style={{ fontSize: '3rem', color: '#8B4513' }}>Sustainable Fashion for Everyone</h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Crafted with care, inspired by culture.</p>
        <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1.2rem' }}>Shop Now</Link>
      </div>

      <div className="features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="card text-center">
            <h3>Eco-Friendly</h3>
            <p>We use 100% organic and recycled materials.</p>
        </div>
        <div className="card text-center">
            <h3>Cultural Roots</h3>
            <p>Designs inspired by diverse traditions and stories.</p>
        </div>
        <div className="card text-center">
            <h3>Ethical Labor</h3>
            <p>Fair wages and safe working conditions for all.</p>
        </div>
      </div>
    </div>
  );
}
