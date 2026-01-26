import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  height?: 'small' | 'medium' | 'large';
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  height = 'large'
}: HeroSectionProps) {
  const heightMap = {
    small: '400px',
    medium: '500px',
    large: '600px'
  };

  return (
    <div className="hero-section" style={{
      position: 'relative',
      height: heightMap[height],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginBottom: 'var(--spacing-xl)'
    }}>
      {/* Background Video */}
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }} />
      )}

      {/* Overlay */}
      {overlay && (backgroundImage || backgroundVideo) && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }} />
      )}

      {/* Content */}
      <div className="hero-content" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: (backgroundImage || backgroundVideo) ? 'var(--white)' : 'var(--text)',
        padding: '0 var(--spacing-md)',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '300',
          marginBottom: 'var(--spacing-md)',
          letterSpacing: '-0.03em',
          textShadow: (backgroundImage || backgroundVideo) ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            marginBottom: 'var(--spacing-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-lg)',
            textShadow: (backgroundImage || backgroundVideo) ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
          }}>
            {subtitle}
          </p>
        )}

        {ctaText && ctaLink && (
          <Link to={ctaLink}>
            <Button variant="primary">{ctaText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
