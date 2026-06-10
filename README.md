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

## Project Structure

```
src/
└── components/
    └── QuantHub.jsx   # Research source directory component
```
