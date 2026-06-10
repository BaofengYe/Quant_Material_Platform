# Quant Material Platform

A collection of front-end components and resources for quantitative finance research and learning.

## Components

### QuantHub (`src/components/QuantHub.jsx`)

A React component that renders a searchable, filterable directory of curated quant finance research sources.

**Features**
- Browse 25+ research sources across five categories: Academic, Buyside, Aggregator, Blog, and ML/AltData
- Filter by category and access level (Free, Freemium, Paid)
- Full-text search across source names, descriptions, categories, and tags
- Responsive grid layout with category-coded cards, access badges, and topic tags
- Self-contained styling (no external CSS dependencies beyond Google Fonts)

**Usage**

```jsx
import QuantHub from "./src/components/QuantHub";

export default function App() {
  return <QuantHub />;
}
```

The component requires React with hooks support (`useState`) and renders its own styles via an injected `<style>` tag.

### Standalone web page (`quanthub.html`)

A self-contained, single-file version of QuantHub that runs directly in any
modern browser — no build step, server, or install required. It loads React
via CDN and includes the same data, search, filtering, and styling as the
component above, with extra tweaks for mobile (iOS/Android) and desktop
browsers:

- Responsive layout tuned for phones, tablets, and laptops
- Mobile viewport/safe-area handling and "Add to Home Screen" support for iOS/Android
- Larger touch targets and inputs sized to avoid iOS auto-zoom

**Usage**

Open `quanthub.html` directly in a browser (double-click the file, or host it
anywhere static files are served — e.g. GitHub Pages). On a phone, you can
also use the browser's "Add to Home Screen" option to launch it like an app.

## Project Structure

```
src/
└── components/
    └── QuantHub.jsx   # Research source directory React component
quanthub.html          # Standalone, browser-ready version (mobile + desktop)
```
