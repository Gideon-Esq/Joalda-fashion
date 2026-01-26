# Joalda Fashion - Premium E-Commerce Platform

A production-ready, sustainable fashion e-commerce application with a modern "New West/Sustainable" aesthetic. Inspired by industry leaders like Tecovas, Tentree, and Rothy's.

## 🌟 Features

### Customer Experience
- **Shop**: Browse products with clean, editorial-style cards
- **Cart**: Dynamic shopping cart with stock validation and quantity management
- **Authentication**: Secure signup and login with comprehensive validation
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Professional loading and empty state handling

### Admin Dashboard
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Stock Management**: Real-time inventory tracking
- **Category Management**: Organize products by category
- **Validation**: Multi-layer form validation for data integrity
- **Protected Routes**: Admin-only access with automatic redirects

### Technical Excellence
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Reusable component library
- **State Management**: React Context with localStorage persistence
- **Performance**: Optimized images, lazy loading, efficient re-renders
- **Accessibility**: WCAG-compliant focus states and keyboard navigation

## 🎨 Design System

### "New West/Sustainable" Aesthetic
- **Sharp, Rectangular Design**: 0px border-radius for modern, premium feel
- **White-Space First**: Generous spacing for breathing room
- **Editorial Commerce**: Content-first approach with high-quality imagery
- **Earthy Color Palette**: Sustainable, natural feel
- **Clean Typography**: Modern sans-serif with excellent readability

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete design specifications.

## 🛠️ Tech Stack

- **Runtime**: Bun.js 1.3.6
- **Frontend**: React 18.2 + TypeScript
- **Router**: React Router DOM 6.22
- **Backend**: Bun.serve + SQLite
- **Styling**: CSS3 (Custom Properties, Grid, Flexbox)
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Bun.js installed ([Installation Guide](https://bun.sh/docs/installation))

### Steps

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Build the frontend**:
   ```bash
   bun run build
   ```

3. **Start the server**:
   ```bash
   bun start
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

## 🚀 Quick Start

### For Customers
1. Visit http://localhost:3000
2. Browse products in the Shop
3. Add items to your cart
4. Sign up for an account
5. Proceed to checkout (coming soon)

### For Admins
1. Create an account via signup
2. Manually set `is_admin=true` in the database
3. Access the Admin Dashboard at `/admin`
4. Manage products (Create, Edit, Delete)

## 📁 Project Structure

```
/workspaces/Joalda-fashion/
├── public/
│   ├── styles.css              # Complete design system
│   ├── client.js               # Built bundle
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── ProductCard.tsx     # Product display component
│   │   ├── ProtectedRoute.tsx  # Route protection
│   │   ├── LoadingSpinner.tsx  # Loading state
│   │   ├── EmptyState.tsx      # Empty state handler
│   │   ├── Navbar.tsx          # Enhanced navigation
│   │   ├── Footer.tsx          # Enhanced footer
│   │   └── index.tsx           # Component exports
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── Shop.tsx            # Product catalog
│   │   ├── Cart.tsx            # Shopping cart
│   │   ├── Admin.tsx           # Admin dashboard
│   │   ├── Login.tsx           # Login page
│   │   ├── Signup.tsx          # Signup page
│   │   └── ProductDetails.tsx  # Product details
│   ├── App.tsx                 # Main app component
│   └── client.tsx              # Entry point
├── server.tsx                  # Backend server
├── package.json
├── tsconfig.json
├── IMPLEMENTATION_SUMMARY.md   # Detailed implementation guide
├── DESIGN_SYSTEM.md            # Design specifications
└── COMPONENT_GUIDE.md          # Component usage guide
```

## 📚 Documentation

- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**: Complete implementation details and achievements
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**: Comprehensive design specifications
- **[COMPONENT_GUIDE.md](COMPONENT_GUIDE.md)**: Component usage examples and best practices

## 🎯 Key Features Implementation

### ✅ Cart System
- Add to cart with stock validation
- Quantity updates with max stock enforcement
- Remove items and clear cart
- Real-time price calculations
- Session persistence via localStorage

### ✅ Authentication
- Secure signup with password confirmation
- Login with error handling
- Session management with JWT tokens
- Protected routes for admin access
- Automatic redirects based on user role

### ✅ Admin Dashboard
- Create new products with validation
- Edit existing products
- Delete products with confirmation
- Stock management
- Category organization
- Success/error messaging

### ✅ Product Catalog
- Clean, editorial-style product grid
- Stock availability display
- Loading and empty states
- Error handling
- Responsive layout

## 🔧 Development

### Available Scripts

```bash
# Build the frontend
bun run build

# Start the development server
bun start
```

### Adding New Components

All reusable components follow a consistent pattern. See [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md) for examples.

### Styling Guidelines

- Use CSS custom properties for colors and spacing
- Follow the spacing scale (xs, sm, md, lg, xl, xxl)
- Maintain sharp edges (border-radius: 0px)
- Apply white-space first principles

## 🎨 Design Tokens

### Colors
```css
--primary: #8B4513      /* Rich earthy brown */
--secondary: #FFA500    /* Warm orange */
--accent: #2E8B57       /* Cultural green */
--background: #FAFAFA   /* Clean off-white */
```

### Spacing
```css
--spacing-xs: 8px
--spacing-sm: 16px
--spacing-md: 24px
--spacing-lg: 48px
--spacing-xl: 80px
--spacing-xxl: 120px
```

## 📱 Responsive Design

- **Desktop**: > 768px (3-4 column grid)
- **Mobile/Tablet**: ≤ 768px (1-2 column grid)
- Responsive typography using clamp()
- Touch-friendly buttons and inputs

## ♿ Accessibility

- WCAG-compliant color contrast
- Keyboard navigation support
- Focus states on all interactive elements
- Semantic HTML structure
- ARIA labels where appropriate

## 🚧 Roadmap

### Planned Features
- [ ] Checkout flow implementation
- [ ] Payment gateway integration
- [ ] Order history and tracking
- [ ] User profile management
- [ ] Product search and filtering
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications

## 🤝 Contributing

This is a private project for Joalda Fashion. For questions or suggestions, please contact the development team.

## 📄 License

All rights reserved © 2025 Joalda Fashion

---

**Built with ❤️ for sustainable fashion**
