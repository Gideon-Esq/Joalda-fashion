import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';

export function OurStory() {
  return (
    <div className="our-story">
      {/* Hero Section */}
      <section className="story-hero">
        <div className="story-hero-content">
          <h1>Our Story</h1>
          <p className="story-subtitle">
            Where Heritage Meets Sustainability
          </p>
        </div>
      </section>

      {/* Story Content */}
      <div className="story-container">
        {/* Beginning Section */}
        <section className="story-section">
          <div className="story-grid">
            <div className="story-text">
              <h2>From Humble Beginnings</h2>
              <p>
                Founded in 2020, Joalda Fashion was born from a simple belief: that fashion should honor both people and planet. In a small workshop in Austin, Texas, we began crafting garments that told a different story—one of ethical production, sustainable materials, and timeless design.
              </p>
              <p>
                Our founder, inspired by the rugged beauty of the American West and the rich traditions of indigenous craftsmanship, set out to create a brand that bridges heritage and modernity. Every piece we create is a testament to this vision.
              </p>
            </div>
            <div className="story-image-placeholder">
              <div className="image-placeholder">
                <span>Founder Image</span>
                <p>Workshop photo or founder portrait</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="story-section reverse">
          <div className="story-grid">
            <div className="story-image-placeholder">
              <div className="image-placeholder">
                <span>Sustainable Materials</span>
                <p>Organic cotton, recycled fabrics</p>
              </div>
            </div>
            <div className="story-text">
              <h2>Our Values</h2>
              <h3>Sustainability First</h3>
              <p>
                We use only organic, recycled, and ethically sourced materials. From organic cotton to innovative recycled polyester, every fabric choice is made with the environment in mind. Our commitment extends beyond materials—we offset our carbon footprint and use plastic-free packaging.
              </p>
              <h3>Ethical Production</h3>
              <p>
                Every garment is crafted in fair-trade certified facilities where workers receive living wages and safe working conditions. We believe that the hands that make our clothes deserve respect, dignity, and fair compensation.
              </p>
              <h3>Timeless Design</h3>
              <p>
                We don't chase trends. Instead, we create pieces designed to last—in both quality and style. Our "New West" aesthetic combines classic silhouettes with modern functionality, resulting in wardrobe staples you'll love for years.
              </p>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="story-section">
          <div className="story-grid">
            <div className="story-text">
              <h2>The Craft Behind Every Piece</h2>
              <p>
                Each Joalda garment goes through a rigorous process—from initial design sketches to final quality inspection. Our small team of artisans brings decades of combined experience, ensuring that every stitch, seam, and detail meets our exacting standards.
              </p>
              <p>
                We embrace slow fashion. Instead of churning out dozens of collections each year, we release thoughtfully curated seasonal collections. This approach allows us to focus on perfecting each design and maintaining the highest quality standards.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <h3>100%</h3>
                  <p>Organic & Recycled Materials</p>
                </div>
                <div className="stat">
                  <h3>250+</h3>
                  <p>Artisans Supported</p>
                </div>
                <div className="stat">
                  <h3>Carbon</h3>
                  <p>Neutral Since 2022</p>
                </div>
              </div>
            </div>
            <div className="story-image-placeholder">
              <div className="image-placeholder">
                <span>Craftsmanship Image</span>
                <p>Artisan at work / production facility</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="story-section reverse">
          <div className="story-grid">
            <div className="story-image-placeholder">
              <div className="image-placeholder">
                <span>Community Image</span>
                <p>Team photo or community event</p>
              </div>
            </div>
            <div className="story-text">
              <h2>Growing Together</h2>
              <p>
                What started as a one-person operation has grown into a thriving community of makers, designers, and conscious consumers. But growth hasn't changed our core mission—if anything, it's strengthened our commitment to doing things the right way.
              </p>
              <p>
                Today, Joalda Fashion partners with local artisans across three continents, supports regenerative agriculture initiatives, and gives 2% of annual revenue to environmental conservation projects. We're proud of how far we've come, but we're even more excited about where we're going.
              </p>
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className="story-section full-width">
          <div className="story-text-center">
            <h2>Looking Forward</h2>
            <p>
              Our journey is just beginning. We're constantly exploring new sustainable materials, refining our production processes, and finding ways to reduce our environmental impact. We're committed to transparency—sharing both our successes and our challenges as we work toward a truly circular fashion model.
            </p>
            <p>
              Thank you for being part of our story. Every purchase you make supports ethical production, environmental conservation, and a vision of fashion that's better for everyone.
            </p>
            <div className="story-cta">
              <Link to="/shop">
                <Button variant="primary">
                  Shop Our Collection
                </Button>
              </Link>
              <Link to="/contact" style={{ marginLeft: '16px' }}>
                <Button variant="secondary">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Large Hero Image Placeholder */}
        <section className="story-hero-image">
          <div className="large-image-placeholder">
            <span>Large Hero Image</span>
            <p>Landscape / nature / production facility panoramic image</p>
          </div>
        </section>
      </div>

      <style>{`
        .our-story {
          background: var(--background);
        }

        .story-hero {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          padding: var(--spacing-xxl) var(--spacing-md);
          text-align: center;
        }

        .story-hero-content h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 300;
          margin: 0 0 var(--spacing-sm) 0;
          letter-spacing: 2px;
        }

        .story-subtitle {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          font-weight: 300;
          margin: 0;
          opacity: 0.95;
        }

        .story-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-lg) var(--spacing-md);
        }

        .story-section {
          margin-bottom: var(--spacing-xxl);
        }

        .story-section.full-width {
          margin-bottom: var(--spacing-lg);
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          align-items: center;
        }

        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .story-section.reverse .story-grid {
            direction: ltr;
          }

          .story-section.reverse .story-image-placeholder {
            order: 1;
          }

          .story-section.reverse .story-text {
            order: 2;
          }
        }

        .story-text h2 {
          font-size: clamp(2rem, 3vw, 2.5rem);
          font-weight: 300;
          margin: 0 0 var(--spacing-md) 0;
          color: var(--primary);
          letter-spacing: 1px;
        }

        .story-text h3 {
          font-size: 1.25rem;
          font-weight: 500;
          margin: var(--spacing-md) 0 var(--spacing-sm) 0;
          color: var(--text);
        }

        .story-text p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .story-text-center {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .story-text-center h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin: 0 0 var(--spacing-md) 0;
          color: var(--primary);
        }

        .story-text-center p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .story-cta {
          margin-top: var(--spacing-lg);
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .story-cta a {
          text-decoration: none;
        }

        .story-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        @media (max-width: 640px) {
          .story-stats {
            grid-template-columns: 1fr;
          }
        }

        .stat {
          text-align: center;
          padding: var(--spacing-md);
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .stat h3 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--secondary);
          margin: 0 0 var(--spacing-xs) 0;
        }

        .stat p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Image Placeholders */
        .story-image-placeholder,
        .story-hero-image {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder,
        .large-image-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          border: 2px dashed var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--spacing-md);
        }

        .large-image-placeholder {
          height: 500px;
        }

        .image-placeholder span,
        .large-image-placeholder span {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xs);
        }

        .image-placeholder p,
        .large-image-placeholder p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .story-hero {
            padding: var(--spacing-xl) var(--spacing-md);
          }

          .story-container {
            padding: var(--spacing-md);
          }

          .image-placeholder,
          .large-image-placeholder {
            height: 300px;
          }

          .story-cta {
            flex-direction: column;
            align-items: stretch;
          }

          .story-cta a {
            margin: 0 0 var(--spacing-sm) 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
