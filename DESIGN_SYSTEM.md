# Credit Application Design System

## Overview

This document outlines the comprehensive design system implemented for the Credit Application project. The design system provides a cohesive, modern, and accessible user interface that enhances the user experience across all components.

## Design Principles

### 1. **Consistency**
- Unified color palette and typography
- Consistent spacing and layout patterns
- Standardized component behaviors

### 2. **Accessibility**
- WCAG 2.1 AA compliance
- Proper focus management
- Screen reader support
- Keyboard navigation

### 3. **Performance**
- Optimized animations and transitions
- Efficient component rendering
- Minimal bundle size impact

### 4. **Scalability**
- Modular component architecture
- Design tokens for easy theming
- Responsive design patterns

## Color System

### Primary Colors
- **Primary 50**: `#f0f9ff` - Light backgrounds
- **Primary 500**: `#0ea5e9` - Main brand color
- **Primary 600**: `#0284c7` - Interactive elements
- **Primary 700**: `#0369a1` - Hover states

### Secondary Colors
- **Secondary 500**: `#f37316` - Accent color
- **Secondary 600**: `#e4570c` - Secondary actions

### Neutral Colors
- **Neutral 50**: `#fafafa` - Page backgrounds
- **Neutral 900**: `#171717` - Text color

### Status Colors
- **Success**: `#10b981` - Success states
- **Warning**: `#f59e0b` - Warning states
- **Error**: `#ef4444` - Error states
- **Info**: `#3b82f6` - Information states

## Typography

### Font Families
- **Sans**: Inter - Primary text font
- **Display**: Poppins - Headings and display text
- **Mono**: JetBrains Mono - Code and monospace text

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

## Components

### Button
A versatile button component with multiple variants and states.

**Variants:**
- `primary` - Main call-to-action buttons
- `secondary` - Secondary actions
- `outline` - Outlined buttons
- `ghost` - Minimal buttons
- `danger` - Destructive actions
- `success` - Positive actions
- `warning` - Warning actions
- `link` - Text-only buttons

**Sizes:**
- `xs`, `sm`, `md`, `lg`, `xl`, `icon`

**Features:**
- Loading states with spinner
- Icon support (left/right)
- Full width option
- Ripple effect animation
- Shimmer effect on hover

### Input
Enhanced input component with built-in validation and styling.

**Variants:**
- `default` - Underlined input
- `filled` - Filled background
- `outlined` - Bordered input

**Features:**
- Password visibility toggle
- Icon support (left/right)
- Error and helper text
- Label support
- Full width option

### Card
Flexible card component for content organization.

**Variants:**
- `default` - Standard card
- `elevated` - Elevated shadow
- `outlined` - Bordered card
- `filled` - Filled background

**Sub-components:**
- `CardHeader` - Card header with title/subtitle
- `CardContent` - Main content area
- `CardFooter` - Footer with actions

### Table
Advanced table component with sorting and pagination.

**Features:**
- Column sorting
- Pagination
- Custom cell rendering
- Row selection
- Loading states
- Empty states
- Responsive design

### Modal
Accessible modal component with backdrop and focus management.

**Features:**
- Backdrop blur effect
- Escape key handling
- Focus trap
- Multiple sizes
- Custom footer
- Smooth animations

## Animations

### Keyframes
- `fadeIn` - Fade in animation
- `fadeInUp` - Fade in from bottom
- `slideUp` - Slide up animation
- `scaleIn` - Scale in animation
- `blob` - Organic blob animation
- `shimmer` - Shimmer effect
- `gradient` - Gradient animation

### Transitions
- **Fast**: 150ms ease-in-out
- **Normal**: 300ms ease-in-out
- **Slow**: 500ms ease-in-out

## Shadows

- **Soft**: Subtle shadow for cards
- **Medium**: Medium elevation
- **Hard**: Strong shadow for modals
- **Glow**: Colored glow effect

## Usage

### Importing Components

```typescript
import { Button, Input, Card, Table, Modal } from '../design-system';
```

### Using Design Tokens

```typescript
import { designTokens } from '../design-system/tokens';

const primaryColor = designTokens.colors.primary[500];
```

### Example Usage

```tsx
// Button with loading state
<Button 
  variant="primary" 
  size="lg" 
  loading={isLoading}
  leftIcon={<Icon />}
>
  Submit
</Button>

// Input with validation
<Input
  label="Email"
  type="email"
  error={errors.email}
  leftIcon={<EmailIcon />}
  fullWidth
/>

// Card with header and footer
<Card variant="elevated">
  <CardHeader title="User Profile" />
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

## Best Practices

1. **Use semantic HTML** - Ensure proper accessibility
2. **Follow spacing patterns** - Use consistent spacing tokens
3. **Implement proper focus management** - Ensure keyboard navigation
4. **Use appropriate color contrast** - Meet WCAG guidelines
5. **Test responsive behavior** - Ensure mobile compatibility
6. **Optimize animations** - Use `transform` and `opacity` for performance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When adding new components:
1. Follow existing patterns and conventions
2. Include proper TypeScript types
3. Add accessibility features
4. Document usage examples
5. Test across different screen sizes
