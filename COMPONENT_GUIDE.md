# Component Usage Guide

## Reusable Components

### Button
```tsx
import { Button } from '../components/Button';

// Primary button
<Button variant="primary">Click Me</Button>

// Secondary button
<Button variant="secondary">Secondary Action</Button>

// Outline button
<Button variant="outline">Outline Style</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Full width
<Button variant="primary" fullWidth>Full Width Button</Button>

// With loading state
<Button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

### ProductCard
```tsx
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const { addToCart } = useCart();

<ProductCard 
  product={productData} 
  onAddToCart={addToCart}
/>
```

### ProtectedRoute
```tsx
import { ProtectedRoute } from '../components/ProtectedRoute';

// Protect any route
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin>
      <Admin />
    </ProtectedRoute>
  } 
/>

// Just require authentication
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

### LoadingSpinner
```tsx
import { LoadingSpinner } from '../components/LoadingSpinner';

if (loading) return <LoadingSpinner />;
```

### EmptyState
```tsx
import { EmptyState } from '../components/EmptyState';

<EmptyState
  title="No products found"
  message="Check back soon for new arrivals"
  actionText="Browse Shop"
  actionLink="/shop"
/>
```

## Context Usage

### AuthContext
```tsx
import { useAuth } from '../context/AuthContext';

const { user, token, login, logout } = useAuth();

// Login
await login(userData, tokenData);

// Logout
logout();

// Check if admin
if (user?.is_admin) {
  // Show admin features
}
```

### CartContext
```tsx
import { useCart } from '../context/CartContext';

const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();

// Add to cart (with validation)
addToCart(product);

// Update quantity (enforces stock limits)
updateQuantity(productId, newQuantity);

// Remove item
removeFromCart(productId);

// Clear entire cart
clearCart();

// Get total price
console.log('Total:', total);

// Get cart count
const count = cart.reduce((acc, item) => acc + item.quantity, 0);
```

## CSS Classes

### Utility Classes
```html
<!-- Text alignment -->
<div class="text-center">Centered text</div>

<!-- Spacing -->
<div class="mb-10">Margin bottom 10px</div>
<div class="mb-20">Margin bottom 24px</div>
<div class="mt-20">Margin top 24px</div>
<div class="mt-40">Margin top 48px</div>

<!-- Full width -->
<button class="w-full">Full Width</button>
```

### Product Grid
```html
<div class="product-grid">
  <!-- Automatically creates responsive grid -->
</div>
```

### Feature Grid
```html
<div class="features-grid">
  <div class="feature-card">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

### Hero Section
```html
<div class="hero">
  <h1>Main Heading</h1>
  <p>Subheading</p>
  <Button>Call to Action</Button>
</div>
```

## CSS Custom Properties

### Colors
```css
var(--primary)     /* #8B4513 - Rich earthy brown */
var(--secondary)   /* #FFA500 - Warm orange */
var(--accent)      /* #2E8B57 - Cultural green */
var(--background)  /* #FAFAFA - Clean off-white */
var(--text)        /* #333333 - Main text */
var(--text-light)  /* #666666 - Secondary text */
var(--danger)      /* #DC143C - Error/Delete */
var(--white)       /* #FFFFFF */
var(--border)      /* #E5E5E5 */
```

### Spacing
```css
var(--spacing-xs)   /* 8px */
var(--spacing-sm)   /* 16px */
var(--spacing-md)   /* 24px */
var(--spacing-lg)   /* 48px */
var(--spacing-xl)   /* 80px */
var(--spacing-xxl)  /* 120px */
```

## Form Styling

### Standard Input
```html
<input 
  type="text" 
  placeholder="Enter text"
/>
<!-- Automatically styled with border, padding, focus states -->
```

### Select
```html
<select>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Textarea
```html
<textarea rows="4" placeholder="Enter description"></textarea>
```

## Best Practices

1. **Always use the Button component** instead of raw `<button>` tags for consistency
2. **Use ProductCard** for all product displays to maintain design consistency
3. **Wrap protected routes** with ProtectedRoute component
4. **Show loading states** using LoadingSpinner during async operations
5. **Handle empty states** with EmptyState component
6. **Use CSS custom properties** for colors and spacing to maintain design system
7. **Follow the spacing scale** (xs, sm, md, lg, xl, xxl) for consistency
8. **Apply sharp edges** (border-radius: 0) to maintain New West aesthetic

## Example: Complete Product Page

```tsx
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <EmptyState
        title="Unable to load products"
        message={error}
        actionText="Go Home"
        actionLink="/"
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        actionText="Go Home"
        actionLink="/"
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}
```
