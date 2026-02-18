# Animation Code Reference

A comprehensive guide to all animations and how to use them in your components.

## Available Animations

### 1. **Fade In Animation**
```jsx
// In your component
className="animate-fadeIn"

// Duration: 0.8s
// Use case: Text content, subtle entrances
```

### 2. **Slide Up Animation**
```jsx
// Basic usage
className="animate-slideUp"

// With staggered delay
style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}

// Duration: 0.6s
// Delay: Incremented by 0.1s for each item
// Use case: Cards, sections, list items
```

### 3. **Slide Down Animation**
```jsx
className="animate-slideDown"

// Duration: 0.6s
// Use case: Mobile menus, dropdowns
```

### 4. **Slide Left/Right**
```jsx
// Slide from left
className="animate-slideLeft"

// Slide from right
className="animate-slideRight"

// Duration: 0.8s
// Use case: Side panel reveal, alternating columns
```

### 5. **Scale In Animation**
```jsx
className="animate-scaleIn"

// With delay
style={{ animationDelay: `${index * 0.1}s` }}

// Duration: 0.5s
// Use case: Featured items, stat counters, badges
```

### 6. **Float Animation**
```jsx
// Creates up/down floating effect
className="animate-float"

// With different timing
style={{ animationDelay: '2s' }}

// Duration: 3s (infinite loop)
// Use case: Background decorations, floating elements
```

### 7. **Glow Animation**
```jsx
className="animate-glow"

// Duration: 2s (infinite)
// Use case: Featured cards, call-to-action buttons
```

### 8. **Bounce Animation**
```jsx
className="animate-bounce"

// Duration: 2s (infinite)
// Use case: Attention-grabbing elements
```

### 9. **Pulse Animation**
```jsx
className="animate-pulse"

// Duration: 2s (infinite)
// Use case: Loading states, skeleton screens
```

## Custom Utility Classes

### Button Classes
```jsx
// Primary button with all effects
className="btn-primary"

// Gradient button (recommended)
className="btn-gradient"

// Outline button
className="btn-outline"
```

### Card Class
```jsx
// Enhanced card with hover effects
className="card-hover"
// Includes: glow shadow, scale, elevation
```

### Text Classes
```jsx
// Gradient text effect
className="gradient-text"

// Section title styling
className="section-title"
```

## Staggered Animation Pattern

### For Lists/Grids
```jsx
{items.map((item, idx) => (
  <div 
    key={idx}
    style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}
  >
    {/* Content */}
  </div>
))}

// Each item delays by 0.1s
// First item: 0s (immediate)
// Second item: 0.1s delay
// Third item: 0.2s delay
// etc.
```

### Animation Timing Algorithm
```javascript
stagger = itemIndex * delayIncrement
// delayIncrement usually 0.1s (100ms)
// Create smooth cascading effect
```

## Combined Effects

### Slide Up + Fade In (Common)
```jsx
className="animate-slideUp"
// Already has fade-in baked in

// Custom: Element moves AND fades simultaneously
```

### Scale In + Float
```jsx
// For featured cards
<div className="animate-scaleIn animate-float">
  {/* Creates zoom entrance + floating motion */}
</div>
```

### Multiple on Hover
```jsx
className="hover:scale-105 hover:shadow-glow-lg transition-all"
// On hover: scales up, adds glow, smooth 300ms transition
```

## Duration Reference

```javascript
const animationDurations = {
  'fast': '0.3s',      // Quick feedback
  'quick': '0.4s',     // Loading states
  'standard': '0.6s',  // Most animations
  'medium': '0.8s',    // Hero sections
  'slow': '1s',        // Emphasis
  'slow-more': '1.5s', // Dramatic entrance
  'loop': '2s',        // Continuous (infinite)
  'float': '3s',       // Gentle floating
}
```

## Box Shadow Glow Effects

```jsx
// Subtle glow
className="shadow-glow"
// box-shadow: 0 0 20px rgba(59, 130, 246, 0.5)

// Medium glow
className="shadow-glow-lg"
// box-shadow: 0 0 30px rgba(59, 130, 246, 0.7)

// Strong glow
className="shadow-glow-xl"
// box-shadow: 0 0 40px rgba(59, 130, 246, 0.9)
```

## Common Patterns

### Hero Section
```jsx
<section className="animate-slideDown">
  <h1 className="animate-slideUp">
    Main Heading
  </h1>
  <p className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
    Subtitle
  </p>
  <button className="btn-gradient animate-slideUp" style={{ animationDelay: '0.4s' }}>
    CTA Button
  </button>
</section>
```

### Card Grid
```jsx
<div className="grid gap-6">
  {courses.map((course, idx) => (
    <div
      key={course.id}
      className="card-hover"
      style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}
    >
      {/* Card content */}
    </div>
  ))}
</div>
```

### Loading State
```jsx
{loading && (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
  </div>
)}
```

### Success Message
```jsx
{submitted && (
  <div className="bg-green-100 text-green-700 p-4 rounded animate-slideUp">
    Success! Your submission was received.
  </div>
)}
```

## Responsive Animation Adjustments

```jsx
// Different timing for mobile vs desktop
<div className={`
  animate-slideUp 
  md:animate-slideLeft 
  lg:animate-fadeIn
`}>
  {/* Mobile: slides up, Tablet: slides left, Desktop: fades in */}
</div>
```

## Performance Tips

### ✅ Good Animations
- Using CSS transforms (translate, scale, rotate)
- Using opacity changes
- Short duration (0.3s - 1s)
- Smooth easing functions

### ❌ Avoid
- Animating width, height, padding
- Animating left, right, top, bottom
- Too many simultaneous animations
- Long, slow animations
- Jarring movements

### Optimization
```css
/* GPU acceleration */
transform: translateZ(0);
will-change: transform;

/* Smooth frame rate */
backface-visibility: hidden;
perspective: 1000px;
```

## Browser Compatibility

All animations use standard CSS3 features:
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

## Testing Animations

```javascript
// Test on different devices
// Check smooth 60fps performance
// Verify on slower devices
// Test with "prefers-reduced-motion"
```

## Accessibility

All animations can be disabled by user preference:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Copy-Paste Examples

### Basic Page Load
```jsx
<div className="animate-fadeIn">
  {/* Page content */}
</div>
```

### Cascading Cards
```jsx
{items.map((item, i) => (
  <Card style={{ animation: `slideUp 0.6s ease-out ${i*0.1}s both` }} />
))}
```

### CTA Button
```jsx
<button className="btn-gradient animate-float">
  Take Action Now
</button>
```

### Loading Spinner
```jsx
<div className="animate-spin w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full" />
```

---

Use these animations strategically to enhance user experience without overwhelming! 🎬
