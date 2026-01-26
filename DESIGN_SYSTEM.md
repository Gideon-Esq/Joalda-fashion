# Joalda Fashion - Design System Specification

## 🎨 Design Philosophy

The Joalda Fashion design system embodies a **"New West/Sustainable"** aesthetic, combining minimalist editorial commerce with earthy, sustainable values. Inspired by premium brands like Tecovas, Tentree, and Rothy's.

---

## 1. Color Palette

### Primary Colors
```css
--primary: #8B4513     /* Rich Earthy Brown - Main brand color */
--secondary: #FFA500   /* Warm Orange - Accent & CTAs */
--accent: #2E8B57      /* Cultural Green - Success states */
```

### Neutrals
```css
--background: #FAFAFA  /* Clean Off-White - Page background */
--white: #FFFFFF       /* Pure White - Cards, forms */
--border: #E5E5E5      /* Light Gray - Borders, dividers */
--light-gray: #F4F4F4  /* Subtle Gray - Disabled states */
```

### Text Colors
```css
--text: #333333        /* Dark Gray - Primary text */
--text-light: #666666  /* Medium Gray - Secondary text */
--danger: #DC143C      /* Crimson Red - Errors, delete */
```

### Usage Guidelines
- **Primary**: Navigation highlights, primary buttons, brand elements
- **Secondary**: Call-to-action buttons, emphasis
- **Accent**: Success messages, eco-friendly badges
- **Text**: Body copy (--text), descriptions (--text-light)
- **Danger**: Error messages, delete buttons

---

## 2. Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Helvetica Neue', Arial, sans-serif;
```

**Rationale**: System fonts for optimal performance and native feel

### Type Scale

#### Headings
```css
h1: 2.5rem (40px)    font-weight: 300    letter-spacing: -0.02em
h2: 2rem (32px)      font-weight: 300    letter-spacing: -0.02em
h3: 1.25rem (20px)   font-weight: 500    letter-spacing: normal
```

#### Body
```css
p:   1rem (16px)     font-weight: 400    line-height: 1.6
small: 0.875rem (14px)                    color: var(--text-light)
```

#### UI Elements
```css
Button:  0.875rem    UPPERCASE    letter-spacing: 0.5px
Nav Link: 0.875rem   UPPERCASE    letter-spacing: 0.5px
Label:   0.875rem    font-weight: 500
```

### Guidelines
- Use **light weights (300)** for large headings (editorial feel)
- Use **medium weights (500)** for UI elements and small headings
- **UPPERCASE** all navigation and button text
- Add **letter spacing** to uppercase text for readability
- Maintain **1.6 line-height** for body text (readability)

---

## 3. Spacing System

### Scale
```css
--spacing-xs:   8px     /* Tight spacing, icon gaps */
--spacing-sm:   16px    /* Form fields, small gaps */
--spacing-md:   24px    /* Default section spacing */
--spacing-lg:   48px    /* Large section padding */
--spacing-xl:   80px    /* Major section spacing */
--spacing-xxl:  120px   /* Hero sections, page spacing */
```

### Application
```
Component padding:     var(--spacing-lg)    → 48px
Section margins:       var(--spacing-xl)    → 80px
Hero sections:         var(--spacing-xxl)   → 120px
Form field gaps:       var(--spacing-md)    → 24px
Button padding:        14px 32px (custom)
```

### White-Space First Approach
- Prioritize breathing room over density
- Use generous padding in sections (48px minimum)
- Large gaps between product cards (80px)
- Ample margin around hero elements

---

## 4. Button Design

### Primary Style (Sharp, Rectangular)
```css
border-radius: 0px              /* Sharp edges - New West aesthetic */
padding: 14px 32px
font-size: 0.875rem
text-transform: uppercase
letter-spacing: 0.5px
font-weight: 500
transition: all 0.3s ease
```

### Variants

#### Primary
```css
background: var(--primary)      /* #8B4513 */
color: var(--white)
hover: background: #6d3410 (darker)
hover: transform: translateY(-1px)
hover: box-shadow: 0 4px 12px rgba(0,0,0,0.15)
```

#### Secondary
```css
background: var(--secondary)    /* #FFA500 */
color: var(--white)
hover: background: #e69500
```

#### Outline
```css
background: transparent
border: 2px solid var(--primary)
color: var(--primary)
hover: background: var(--primary)
hover: color: var(--white)
```

#### Danger
```css
background: var(--danger)
color: var(--white)
hover: background: #b31030
```

### States
```css
:hover    → Transform up 1px, add shadow
:active   → Transform back to 0
:disabled → opacity: 0.5, cursor: not-allowed
:focus    → outline: 2px solid var(--primary)
```

---

## 5. Card Design

### Product Cards
```css
background: transparent         /* No background */
border: none                   /* No borders */
padding: 0                     /* Minimal padding */
transition: opacity 0.3s ease

hover: opacity: 0.85           /* Subtle fade on hover */
```

### Image Specifications
```css
aspect-ratio: 3/4              /* Portrait orientation */
object-fit: cover
margin-bottom: var(--spacing-sm)
```

### Information Layout
```css
text-align: center             /* Center-aligned */
font-weight: 500 (name)
font-size: 0.875rem (description)
color: var(--text-light) (description)
```

### Standard Cards (Forms, Containers)
```css
background: var(--white)
border-radius: 0px             /* Sharp edges */
border: none
padding: var(--spacing-lg)     /* 48px */
```

---

## 6. Grid Layouts

### Product Grid
```css
display: grid
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
gap: var(--spacing-xl)         /* 80px - generous spacing */
```

### Feature Grid
```css
display: grid
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
gap: var(--spacing-lg)         /* 48px */
```

### Responsive Behavior
```css
Desktop (>768px):  3-4 columns, full spacing
Mobile (≤768px):   1-2 columns, reduced spacing
```

---

## 7. Navigation

### Navbar Design
```css
position: sticky
top: 0
background: rgba(255, 255, 255, 0.98)
backdrop-filter: blur(10px)
border-bottom: 1px solid var(--border)
padding: var(--spacing-md) 0
```

### Scroll Behavior
```css
Default (top):     Semi-transparent, subtle
Scrolled (>20px):  Solid white, add shadow
Transition:        all 0.3s ease
```

### Link Styling
```css
font-size: 0.875rem
text-transform: uppercase
letter-spacing: 0.5px
font-weight: 500
gap: var(--spacing-lg)          /* 48px between links */

hover: color: var(--secondary)
```

---

## 8. Form Elements

### Input Fields
```css
width: 100%
padding: var(--spacing-sm)      /* 16px */
border: 1px solid var(--border)
border-radius: 0px              /* Sharp edges */
font-family: inherit
font-size: 0.875rem
transition: border-color 0.2s ease

focus: border-color: var(--primary)
focus: outline: none
```

### Labels
```css
display: block
margin-bottom: var(--spacing-xs)
font-size: 0.875rem
font-weight: 500
```

### Error Messages
```css
background: #fee                /* Light red background */
color: var(--danger)
padding: var(--spacing-sm)
border: 1px solid var(--danger)
font-size: 0.875rem
```

### Success Messages
```css
background: var(--accent)
color: var(--white)
padding: var(--spacing-sm)
text-align: center
```

---

## 9. Hero Sections

### Styling
```css
text-align: center
padding: var(--spacing-xxl) var(--spacing-md)  /* 120px vertical */
background: #F5F5F5
margin-bottom: var(--spacing-xl)
```

### Typography
```css
h1: clamp(2rem, 5vw, 3.5rem)    /* Responsive sizing */
    font-weight: 300
    letter-spacing: -0.03em

p:  clamp(1rem, 2vw, 1.25rem)
    max-width: 600px
    margin: 0 auto
```

---

## 10. Footer

### Layout
```css
background: var(--text)         /* Dark background */
color: var(--white)
padding: var(--spacing-xl) 0 var(--spacing-md)
margin-top: var(--spacing-xxl)
```

### Grid Structure
```css
display: grid
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
gap: var(--spacing-lg)
```

### Typography
```css
h4: 0.875rem, UPPERCASE, letter-spacing: 1px
p/a: 0.875rem, color: rgba(255,255,255,0.7)
hover: color: rgba(255,255,255,1)
```

---

## 11. Responsive Breakpoints

### Desktop (Default)
```css
Container: max-width 1400px
Padding: var(--spacing-lg) (48px)
Grid: 3-4 columns
```

### Tablet/Mobile (≤768px)
```css
Container: padding var(--spacing-md) (24px)
Grid: 1-2 columns
Navigation: Reduced gap, smaller font
Buttons: Smaller padding (12px 24px)
Typography: Responsive clamp()
```

---

## 12. Design Principles

### 1. White-Space First
- Generous spacing takes priority over density
- Products need room to "breathe"
- Use maximum allowed spacing before reducing

### 2. Sharp, Clean Lines
- Zero border-radius on all UI elements
- Creates modern, premium, rugged feel
- Aligns with New West aesthetic

### 3. Editorial Commerce
- Content-first approach
- High-quality imagery with minimal decoration
- Typography hierarchy guides attention

### 4. Sustainable Aesthetic
- Earthy color palette
- Natural, organic feel
- Clean, uncluttered interface

### 5. Performance
- System fonts (no web font loading)
- Lazy loading images
- CSS custom properties for theming
- Hardware-accelerated transforms

### 6. Accessibility
- High contrast ratios (WCAG compliant)
- Clear focus states (2px outline)
- Readable typography (1.6 line-height)
- Touch-friendly targets (minimum 44px)

---

## 13. Component Patterns

### Loading State
```
- Center-aligned
- Minimal animation
- Clear messaging
- Consistent spacing
```

### Empty State
```
- Friendly messaging
- Clear call-to-action
- Centered layout
- Helpful navigation
```

### Error State
```
- Red color scheme
- Clear error message
- Actionable next steps
- Non-blocking design
```

---

## 14. Animation & Transitions

### Duration
```css
Fast:    0.2s (hover, focus)
Medium:  0.3s (default - buttons, cards)
Slow:    0.5s (page transitions)
```

### Easing
```css
ease:        Default for most transitions
ease-in-out: For transforms
ease-out:    For entrances
```

### Common Animations
```css
Button hover:  transform: translateY(-1px)
Card hover:    opacity: 0.85
Nav scroll:    background-color, box-shadow
Focus:         outline appearance
```

---

## 15. Imagery Guidelines

### Product Images
- **Aspect Ratio**: 3:4 (portrait)
- **Quality**: High-resolution, sharp
- **Background**: Clean, minimal, or lifestyle
- **Consistency**: Similar lighting and style across products

### Loading Strategy
- Use `loading="lazy"` for below-fold images
- `object-fit: cover` for consistent sizing
- Alt text for accessibility

---

## Summary Checklist

When implementing new components, ensure:

- ✅ **Sharp edges** (border-radius: 0)
- ✅ **Generous spacing** (use spacing scale)
- ✅ **System fonts** (no custom web fonts)
- ✅ **Uppercase UI text** (nav, buttons)
- ✅ **Light headings** (font-weight: 300)
- ✅ **High contrast** (text on background)
- ✅ **Focus states** (2px outline)
- ✅ **Responsive** (mobile-first approach)
- ✅ **Transitions** (0.3s ease default)
- ✅ **White space** (breathing room priority)

---

*This design system ensures consistency, scalability, and alignment with the Joalda Fashion brand identity.*
