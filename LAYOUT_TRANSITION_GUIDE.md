# Layout Transition Hook Guide

## Overview

The `useLayoutTransition` hook provides a comprehensive solution for smooth page transitions and layout animations in your Next.js application using Framer Motion. It works seamlessly with your existing `ScrollToTop` component and provides additional features for enhanced user experience.

## Features

- 🎯 **Automatic route transition detection**
- 🎨 **Multiple animation types** (fade, slide, slideUp, scale, custom)
- 📱 **Smooth scroll to top** on route changes
- 🎭 **Staggered animations** for child elements
- 🎪 **Pre-built animation presets**
- 🎛️ **Highly configurable** with custom variants
- 🔧 **Utility functions** for scrolling and element targeting

## Installation

The hook is ready to use with your existing Framer Motion setup. No additional dependencies required.

## Basic Usage

### 1. Simple Page Transition

```jsx
import useLayoutTransition from '../hooks/useLayoutTransition';

function MyPage() {
  const { PageTransition } = useLayoutTransition({
    type: 'fade',
    duration: 0.3,
  });

  return (
    <PageTransition>
      <h1>Page Content</h1>
      <p>This will fade in on route changes.</p>
    </PageTransition>
  );
}
```

### 2. Layout Transition with AnimatePresence

```jsx
function MyLayout({ children }) {
  const { LayoutTransition } = useLayoutTransition({
    type: 'slideUp',
    duration: 0.4,
  });

  return <LayoutTransition>{children}</LayoutTransition>;
}
```

### 3. Enhanced ScrollToTop Component

```jsx
import ScrollToTop from '../components/ScrollToTop';

function RootLayout({ children }) {
  return (
    <ScrollToTop enableTransition={true} transitionType="fade" duration={0.3} scrollBehavior="smooth">
      {children}
    </ScrollToTop>
  );
}
```

## Configuration Options

| Option                  | Type    | Default  | Description                                                    |
| ----------------------- | ------- | -------- | -------------------------------------------------------------- |
| `duration`              | number  | 0.3      | Animation duration in seconds                                  |
| `type`                  | string  | 'fade'   | Animation type ('fade', 'slide', 'slideUp', 'scale', 'custom') |
| `customVariants`        | object  | null     | Custom Framer Motion variants                                  |
| `enableRouteTransition` | boolean | true     | Enable route change transitions                                |
| `enableScrollToTop`     | boolean | true     | Enable scroll to top on route change                           |
| `scrollBehavior`        | string  | 'smooth' | Scroll behavior ('smooth', 'auto')                             |

## Animation Types

### Built-in Types

1. **fade** - Simple opacity transition
2. **slide** - Horizontal slide transition
3. **slideUp** - Vertical slide transition
4. **scale** - Scale transition with opacity
5. **custom** - Use your own variants

### Custom Variants Example

```jsx
const customVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.8, rotate: 10 },
};

const { PageTransition } = useLayoutTransition({
  type: 'custom',
  customVariants,
});
```

## Advanced Usage

### Staggered Animations

```jsx
function StaggeredList({ items }) {
  const { getStaggerProps, getContainerProps } = useLayoutTransition();

  return (
    <motion.div {...getContainerProps()}>
      {items.map((item, index) => (
        <motion.div key={item.id} {...getStaggerProps(index * 0.1)} className="list-item">
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Animation Presets

```jsx
function AnimatedComponents() {
  const { fadeIn, slideInUp, scaleIn } = useLayoutTransition();

  return (
    <div>
      <motion.div {...fadeIn}>Fade In</motion.div>
      <motion.div {...slideInUp}>Slide In Up</motion.div>
      <motion.div {...scaleIn}>Scale In</motion.div>
    </div>
  );
}
```

### Utility Functions

```jsx
function Navigation() {
  const { scrollToTop, scrollToElement, isTransitioning } = useLayoutTransition();

  return (
    <nav>
      <button onClick={() => scrollToTop()}>Back to Top</button>
      <button onClick={() => scrollToElement('section-1', 100)}>Go to Section 1</button>
      {isTransitioning && <div>Transitioning...</div>}
    </nav>
  );
}
```

## Integration with Existing Components

### Replace ScrollToTop Usage

**Before:**

```jsx
<ScrollToTop>
  <YourPageContent />
</ScrollToTop>
```

**After (with transitions):**

```jsx
<ScrollToTop enableTransition={true} transitionType="slideUp" duration={0.4}>
  <YourPageContent />
</ScrollToTop>
```

### In Layout Components

```jsx
// app/[locale]/layout.js
import useLayoutTransition from '../hooks/useLayoutTransition';

export default function RootLayout({ children }) {
  const { LayoutTransition } = useLayoutTransition({
    type: 'fade',
    duration: 0.3,
    enableScrollToTop: true,
  });

  return (
    <html>
      <body>
        <Navbar />
        <LayoutTransition>{children}</LayoutTransition>
        <Footer />
      </body>
    </html>
  );
}
```

## Performance Considerations

- The hook uses `useCallback` to prevent unnecessary re-renders
- Transitions are optimized with `layout` prop for better performance
- Use `AnimatePresence` mode="wait" for page transitions to avoid layout shifts

## Best Practices

1. **Use consistent animation types** across your application
2. **Keep durations reasonable** (0.2-0.5 seconds)
3. **Test on mobile devices** for smooth performance
4. **Consider accessibility** - some users prefer reduced motion
5. **Use staggered animations sparingly** to avoid overwhelming users

## Troubleshooting

### Common Issues

1. **Animations not working**: Ensure Framer Motion is properly installed
2. **Layout shifts**: Use `layout` prop and consistent container heights
3. **Performance issues**: Reduce animation complexity and duration
4. **ScrollToTop not working**: Check if `enableScrollToTop` is set to true

### Debug Mode

```jsx
const { isTransitioning, pathname, previousPath } = useLayoutTransition();

console.log({ isTransitioning, pathname, previousPath });
```

## Examples

Check out `components/LayoutTransitionExample.jsx` for comprehensive examples of all features.

## API Reference

### Hook Return Values

```jsx
const {
  // State
  isTransitioning, // boolean - Current transition state
  pathname, // string - Current pathname
  previousPath, // string - Previous pathname

  // Variants and config
  variants, // object - Current animation variants
  transition, // object - Transition configuration

  // Utility functions
  scrollToElement, // function - Scroll to element by ID
  scrollToTop, // function - Scroll to top
  getTransitionProps, // function - Get props for motion components
  getStaggerProps, // function - Get props for staggered animations
  getContainerProps, // function - Get props for stagger containers

  // Components
  PageTransition, // component - Page transition wrapper
  LayoutTransition, // component - Layout transition with AnimatePresence

  // Animation presets
  fadeIn, // object - Fade in animation props
  slideInUp, // object - Slide in up animation props
  slideInLeft, // object - Slide in left animation props
  scaleIn, // object - Scale in animation props
} = useLayoutTransition(options);
```

## License

This hook is part of your project and follows the same license terms.
