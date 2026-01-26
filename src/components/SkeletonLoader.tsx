import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '0', style = {} }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card" style={{ border: '1px solid var(--border)' }}>
      <Skeleton height="300px" />
      <div style={{ padding: 'var(--spacing-md)' }}>
        <Skeleton width="70%" height="24px" style={{ marginBottom: 'var(--spacing-sm)' }} />
        <Skeleton width="90%" height="16px" style={{ marginBottom: 'var(--spacing-sm)' }} />
        <Skeleton width="90%" height="16px" style={{ marginBottom: 'var(--spacing-md)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-md)' }}>
          <Skeleton width="60px" height="24px" />
          <Skeleton width="100px" height="40px" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="product-detail-skeleton" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
        {/* Image Skeleton */}
        <div>
          <Skeleton height="600px" style={{ marginBottom: 'var(--spacing-md)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-sm)' }}>
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
          </div>
        </div>
        
        {/* Details Skeleton */}
        <div>
          <Skeleton width="40%" height="16px" style={{ marginBottom: 'var(--spacing-sm)' }} />
          <Skeleton width="80%" height="36px" style={{ marginBottom: 'var(--spacing-md)' }} />
          <Skeleton width="30%" height="32px" style={{ marginBottom: 'var(--spacing-lg)' }} />
          
          <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--spacing-xs)' }} />
          <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--spacing-xs)' }} />
          <Skeleton width="90%" height="16px" style={{ marginBottom: 'var(--spacing-lg)' }} />
          
          <Skeleton width="100px" height="20px" style={{ marginBottom: 'var(--spacing-sm)' }} />
          <Skeleton width="100%" height="48px" style={{ marginBottom: 'var(--spacing-lg)' }} />
          
          <Skeleton width="100%" height="48px" style={{ marginBottom: 'var(--spacing-md)' }} />
          <Skeleton width="100%" height="48px" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="testimonial-card" style={{ background: 'white', padding: 'var(--spacing-lg)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
        <Skeleton width="20px" height="20px" />
        <Skeleton width="20px" height="20px" />
        <Skeleton width="20px" height="20px" />
        <Skeleton width="20px" height="20px" />
        <Skeleton width="20px" height="20px" />
      </div>
      <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--spacing-xs)' }} />
      <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--spacing-xs)' }} />
      <Skeleton width="80%" height="16px" style={{ marginBottom: 'var(--spacing-lg)' }} />
      <Skeleton width="150px" height="20px" style={{ marginTop: 'var(--spacing-md)' }} />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div style={{ 
      height: '70vh', 
      minHeight: '500px', 
      background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', padding: 'var(--spacing-md)' }}>
        <Skeleton width="60%" height="60px" style={{ margin: '0 auto var(--spacing-md) auto' }} />
        <Skeleton width="80%" height="24px" style={{ margin: '0 auto var(--spacing-lg) auto' }} />
        <Skeleton width="150px" height="48px" style={{ margin: '0 auto' }} />
      </div>
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div style={{ 
      padding: 'var(--spacing-md) var(--spacing-lg)',
      borderBottom: '1px solid var(--border)',
      background: 'white'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Skeleton width="150px" height="32px" />
        <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
          <Skeleton width="60px" height="24px" />
          <Skeleton width="60px" height="24px" />
          <Skeleton width="60px" height="24px" />
          <Skeleton width="60px" height="24px" />
        </div>
        <Skeleton width="40px" height="40px" />
      </div>
    </div>
  );
}

// CSS for skeleton shimmer animation
export const skeletonStyles = `
  .skeleton {
    background: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #e0e0e0 20%,
      #f0f0f0 40%,
      #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    display: block;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
      background: #f0f0f0;
    }
  }

  @media (max-width: 768px) {
    .product-detail-skeleton > div {
      grid-template-columns: 1fr !important;
    }
  }
`;
