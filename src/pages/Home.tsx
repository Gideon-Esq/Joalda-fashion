import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { HeroSection } from '../components/HeroSection';
import { TestimonialSection } from '../components/TestimonialSection';

// Sample testimonials - these would typically come from an API or database
const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Austin, TX',
    rating: 5,
    text: 'Absolutely love the quality and fit! The sustainable materials feel amazing and I can tell these pieces will last for years. Joalda Fashion has become my go-to for ethical clothing.',
    date: '2025-01-15'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'Portland, OR',
    rating: 5,
    text: 'Finally, a brand that aligns with my values! The cultural designs are beautiful and authentic. Every piece tells a story and the craftsmanship is exceptional.',
    date: '2025-01-10'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    location: 'Denver, CO',
    rating: 5,
    text: 'The customer service is outstanding and the shipping was super fast. I appreciate the transparency about their production process and the fair trade practices.',
    date: '2025-01-05'
  },
  {
    id: 4,
    name: 'James Wilson',
    location: 'Seattle, WA',
    rating: 5,
    text: 'Best sustainable fashion brand I\'ve found. The attention to detail is incredible, and knowing that workers are paid fairly makes me feel good about every purchase.',
    date: '2024-12-28'
  }
];

export function Home() {
  return (
    <div className="home-page">
      {/* Hero Section with support for background image/video */}
      <HeroSection
        title="Sustainable Fashion for Everyone"
        subtitle="Crafted with care, inspired by culture. Discover our collection of ethically made clothing."
        ctaText="Explore Collection"
        ctaLink="/shop"
        // Uncomment and add your hero image/video URL:
        // backgroundImage="https://your-image-url.com/hero.jpg"
        // backgroundVideo="https://your-video-url.com/hero.mp4"
        overlay={true}
        height="large"
      />

      {/* Features Section */}
      <div className="features-grid">
        <div className="feature-card">
          <h3>Eco-Friendly Materials</h3>
          <p>
            We use 100% organic cotton, recycled fabrics, and sustainable materials 
            that are gentle on the planet.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>Cultural Heritage</h3>
          <p>
            Each design tells a story, drawing inspiration from diverse traditions 
            and celebrating cultural artistry.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>Ethical Production</h3>
          <p>
            Fair wages, safe working conditions, and transparent supply chains 
            for everyone in our production process.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      {/* About Section */}
      <div style={{ 
        marginTop: 'var(--spacing-xxl)', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: 'var(--spacing-xxl) auto 0'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '300', marginBottom: 'var(--spacing-md)' }}>
          Our Commitment
        </h2>
        <p style={{ 
          fontSize: '1rem', 
          lineHeight: '1.8', 
          color: 'var(--text-light)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Joalda Fashion is more than a clothing brand—it's a movement toward sustainable, 
          ethical fashion. We believe that what you wear should reflect your values. 
          Every garment is thoughtfully designed, ethically produced, and built to last.
        </p>
        <Link to="/shop">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>

      {/* Call to Action */}
      <div style={{
        marginTop: 'var(--spacing-xxl)',
        padding: 'var(--spacing-xl)',
        backgroundColor: '#F5F5F5',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '300', marginBottom: 'var(--spacing-sm)' }}>
          Join Our Community
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: 'var(--spacing-md)' }}>
          Be part of the sustainable fashion movement
        </p>
        <Link to="/signup">
          <Button variant="primary">Create Account</Button>
        </Link>
      </div>
    </div>
  );
}
