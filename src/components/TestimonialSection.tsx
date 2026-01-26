import React, { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonial-section" style={{
      padding: 'var(--spacing-xxl) 0',
      backgroundColor: '#F5F5F5',
      marginTop: 'var(--spacing-xxl)'
    }}>
      <div className="container">
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '300',
          textAlign: 'center',
          marginBottom: 'var(--spacing-xl)'
        }}>
          What Our Customers Say
        </h2>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Testimonial Card */}
          <div style={{
            backgroundColor: 'var(--white)',
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Star Rating */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: 'var(--spacing-md)'
            }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < currentTestimonial.rating ? '#FFA500' : '#E5E5E5',
                    fontSize: '1.5rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--text)',
              margin: '0 0 var(--spacing-lg)',
              fontStyle: 'italic'
            }}>
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author Info */}
            <div>
              <p style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--text)',
                margin: '0 0 var(--spacing-xs)'
              }}>
                {currentTestimonial.name}
              </p>
              {currentTestimonial.location && (
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-light)',
                  margin: '0'
                }}>
                  {currentTestimonial.location}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={previousTestimonial}
                style={{
                  position: 'absolute',
                  left: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--white)',
                  border: '2px solid var(--border)',
                  width: '48px',
                  height: '48px',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = 'var(--primary)';
                  btn.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = 'var(--border)';
                  btn.style.color = 'var(--text)';
                }}
              >
                ‹
              </button>
              <button
                onClick={nextTestimonial}
                style={{
                  position: 'absolute',
                  right: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--white)',
                  border: '2px solid var(--border)',
                  width: '48px',
                  height: '48px',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = 'var(--primary)';
                  btn.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = 'var(--border)';
                  btn.style.color = 'var(--text)';
                }}
              >
                ›
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-xs)',
              marginTop: 'var(--spacing-lg)'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentIndex ? 'var(--primary)' : 'var(--border)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.3s ease'
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation (visible on small screens) */}
        {testimonials.length > 1 && (
          <div style={{
            display: 'none',
            gap: 'var(--spacing-sm)',
            justifyContent: 'center',
            marginTop: 'var(--spacing-lg)'
          }}
          className="mobile-nav"
          >
            <button
              onClick={previousTestimonial}
              className="btn btn-outline"
              style={{ padding: '12px 24px' }}
            >
              Previous
            </button>
            <button
              onClick={nextTestimonial}
              className="btn btn-outline"
              style={{ padding: '12px 24px' }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 968px) {
          .testimonial-section button[style*="position: absolute"] {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
