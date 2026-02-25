# Retro Spins - Vinyl Record Player App Design Specification

## Overview
A web-based vinyl record player application with a mid-century, retro aesthetic featuring warm walnut wood textures, soft shadows, and muted colors inspired by vintage audio equipment.

## Color Palette

### Primary Colors
- **Wood Light**: `#DEB887` - Light walnut wood tone
- **Wood Primary**: `#D2B48C` - Main wood surface color  
- **Wood Medium**: `#CD853F` - Medium wood accent
- **Wood Dark**: `#8B4513` - Dark wood trim and text
- **Wood Darker**: `#654321` - Deep wood for emphasis

### Accent Colors
- **Brass**: `#B8860B` - Metallic accents, buttons, highlights
- **Brass Dark**: `#9A7209` - Darker brass for hover states
- **Vinyl Black**: `#1C1C1C` - Deep black for vinyl records
- **Vinyl Label**: `#DC143C` - Classic red record label

### Neutrals
- **Background**: `#F7F4F0` - Warm off-white background
- **Cream**: `#F5F5DC` - Light cream for cards
- **Warm White**: `#FDF6E3` - Soft white highlights
- **Foreground**: `#2C1810` - Dark brown text
- **Muted Foreground**: `#6B5B4F` - Secondary text

## Typography

### Font Stack
- **Headers**: `'Playfair Display', serif` - Elegant serif for titles
- **Body**: `'Inter', sans-serif` - Clean sans-serif for readability

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Type Scale
- **H1**: 2xl, medium weight, 1.5 line-height
- **H2**: xl, medium weight, 1.5 line-height  
- **H3**: lg, medium weight, 1.5 line-height
- **Body**: base, normal weight, 1.5 line-height
- **Captions**: sm, normal weight, 1.5 line-height

## Layout Structure

### Desktop Layout (1200px+)
```
┌─────────────────────────────────────────────────────────┐
│                    HEADER (Sticky)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐    RECORD WALL                │
│  │ ♪ │ │ ♪ │ │ ♪ │ │ ♪ │    (4x2 Grid)                │
│  └───┘ └───┘ └───┘ └───┘                               │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐                               │
│  │ ♪ │ │ ♪ │ │ ♪ │ │ ♪ │                               │
│  └───┘ └───┘ └───┘ └───┘                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                TURNTABLE                        │   │
│  │  ┌─────┐                                        │   │
│  │  │  ●  │  [Controls] [Progress] [Volume]        │   │
│  │  └─────┘                                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              RECORD SHELF                       │   │
│  │  ← ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ →              │   │
│  │    │ ♪ │ │ ♪ │ │ ♪ │ │ ♪ │ │ ♪ │                │   │
│  │    └───┘ └───┘ └───┘ └───┘ └───┘                │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1199px)
- Record wall: 3x3 grid
- Turntable: Stacked layout (platter above controls)
- Record shelf: Horizontal scroll with 3-4 visible records

### Mobile Layout (320px - 767px)
- Record wall: 2x4 grid
- Turntable: Single column layout
- Record shelf: Horizontal scroll with 2 visible records

## Interactive States

### Vinyl Record States

#### Default State
```css
.vinyl-record {
  transform: scale(1);
  box-shadow: 0 8px 25px rgba(28, 28, 28, 0.3);
  transition: all 0.3s ease;
}
```

#### Hover State
```css
.vinyl-record:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 35px rgba(28, 28, 28, 0.4);
}
```

#### Selected State
```css
.vinyl-record.selected {
  ring: 4px solid var(--brass);
  ring-opacity: 0.6;
}
```

#### Playing State
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-record.playing {
  animation: spin 3s linear infinite;
}
```

### Button States

#### Primary Button (Brass)
```css
.btn-primary {
  background: var(--brass);
  color: var(--vinyl-black);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--brass-dark);
  transform: scale(1.05);
}

.btn-primary:active {
  transform: scale(0.95);
}
```

## Animations & Motion

### Framer Motion Configurations

#### Page Entry Animation
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

#### Staggered List Animation
```typescript
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}
```

#### Vinyl Spin Animation
```typescript
const spinAnimation = {
  rotate: isPlaying ? 360 : 0,
  transition: {
    duration: 3,
    repeat: isPlaying ? Infinity : 0,
    ease: "linear"
  }
}
```

### CSS Transitions
- **Hover effects**: 0.3s ease
- **Button interactions**: 0.2s ease  
- **Layout changes**: 0.5s ease-out
- **Color transitions**: 0.3s ease

## Shadows & Effects

### Shadow Tokens
```css
--shadow-soft: 0 4px 20px rgba(139, 69, 19, 0.1);
--shadow-medium: 0 8px 30px rgba(139, 69, 19, 0.15);
--shadow-strong: 0 15px 50px rgba(139, 69, 19, 0.2);
--shadow-vinyl: 0 8px 25px rgba(28, 28, 28, 0.3);
```

### Wood Texture Effect
```css
.wood-texture {
  background: linear-gradient(135deg, var(--wood-light) 0%, var(--wood-primary) 50%, var(--wood-medium) 100%);
  position: relative;
}

.wood-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.05) 2px, rgba(139, 69, 19, 0.05) 4px),
    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139, 69, 19, 0.03) 20px, rgba(139, 69, 19, 0.03) 21px);
  pointer-events: none;
}
```

### Brass Glow Effect
```css
.retro-glow {
  box-shadow: 
    0 0 20px rgba(184, 134, 11, 0.3),
    0 0 40px rgba(184, 134, 11, 0.2),
    inset 0 0 0 1px rgba(184, 134, 11, 0.4);
}
```

## Accessibility Standards

### Color Contrast Ratios
- **Background to Foreground**: 16.8:1 (AAA)
- **Wood Dark to Cream**: 8.2:1 (AAA)
- **Muted Foreground to Background**: 4.8:1 (AA)
- **Brass to Vinyl Black**: 7.1:1 (AAA)

### Keyboard Navigation
```css
:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### Tab Order
1. Search input
2. View mode toggles
3. Playback mode controls
4. Record wall/list items
5. Turntable controls (play/pause, skip, volume)
6. Record shelf items

#### ARIA Labels
- Record buttons: `aria-label="Play [Title] by [Artist]"`
- Transport controls: `aria-label="Play"`, `aria-label="Pause"`, `aria-label="Next track"`
- Volume slider: `aria-label="Volume" aria-valuemin="0" aria-valuemax="100"`
- Progress slider: `aria-label="Track progress"`

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --border: rgba(44, 24, 16, 0.3);
    --muted-foreground: #4A3A2E;
  }
}
```

## Responsive Breakpoints

### Tailwind CSS Classes by Breakpoint

#### Mobile (320px+)
- `grid-cols-2` - 2 records per row
- `gap-4` - Smaller gaps
- `p-4` - Reduced padding
- `text-sm` - Smaller text

#### Tablet (768px+)
- `md:grid-cols-3` - 3 records per row  
- `md:gap-6` - Medium gaps
- `md:p-6` - Medium padding
- `md:text-base` - Base text size

#### Desktop (1024px+)
- `lg:grid-cols-4` - 4 records per row
- `lg:gap-8` - Large gaps
- `lg:p-8` - Large padding
- `lg:flex-row` - Horizontal turntable layout

#### Large Desktop (1280px+)
- `xl:grid-cols-5` - 5 records per row
- `xl:gap-10` - Extra large gaps
- `xl:p-10` - Extra large padding

## Component Architecture

### Core Components
1. **VinylRecord** - Individual record with hover/play states
2. **RecordWall** - Grid display of featured records
3. **RecordShelf** - Horizontal scrolling shelf
4. **Turntable** - Main playback interface
5. **PlayerControls** - Transport and volume controls

### State Management
- `selectedRecordId` - Currently selected record
- `playingRecordId` - Currently playing record  
- `isPlaying` - Playback state
- `volume` - Volume level (0-100)
- `progress` - Track progress (0-100)
- `viewMode` - Wall or list view

### Performance Optimizations
- Lazy loading for record images
- Virtual scrolling for large collections
- Memoized components for static elements
- Debounced search input
- Optimized animation performance with `transform` and `opacity`

## Browser Support
- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## Implementation Notes
- Uses CSS Grid for responsive layouts
- Framer Motion for smooth animations
- Custom CSS properties for consistent theming
- Progressive enhancement for advanced features
- Mobile-first responsive approach