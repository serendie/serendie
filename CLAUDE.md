# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Serendie UI (`@serendie/ui`) is a React-based UI component library that's part of the Serendie Design System by Mitsubishi Electric. It provides adaptive UI components using Ark UI as the headless foundation and Panda CSS for styling.

## Development Commands

### Core Development

- `npm run dev` - Start Storybook development server (port 6006)
- `npm run build` - Full build (Panda CSS + components)
- `npm run build:panda` - Generate Panda CSS system only
- `npm run build:components` - Build components only

### Quality Assurance

- `npm run lint` - ESLint check
- `npm run lint:fix` - ESLint auto-fix
- `npm run format` - Prettier formatting
- `npm run test` - Run Storybook tests with test-runner

### Storybook

- `npm run storybook` - Start Storybook dev server
- `npm run build:storybook` - Build static Storybook

### Figma Integration

- `npm run connect:publish` - Publish Code Connect to Figma
- `npm run connect:unpublish` - Remove Code Connect from Figma

## Architecture

### Styling System

- **Panda CSS**: CSS-in-JS framework with design tokens
- **SerendiePreset**: Panda preset containing design tokens, themes, and recipes
- **Design Tokens**: From `@serendie/design-token` package
- **Themes**: 5 color themes (`konjo`, `asagi`, `sumire`, `tsutsuji`, `kurikawa`)

### Component Structure

- All components are based on **Ark UI** for headless functionality
- Located in `src/components/[ComponentName]/`
- Each component exports through `index.ts`
- Styling uses `cva()` (class variance authority) for variant management
- Components use design tokens via `sd.system.*` namespace

### Key Dependencies

- **Ark UI** (`@ark-ui/react`): Headless UI primitives
- **Panda CSS** (`@pandacss/dev`): Styling system
- **Serendie Symbols** (`@serendie/symbols`): Icon library

### Export Structure

The library exports:

- Individual components from `src/components/*/index.ts`
- `SerendiePreset` for Panda CSS integration
- CSS utilities and design tokens via styled-system

### Development Patterns

- Components use `React.forwardRef` for ref forwarding
- Props extend `ComponentProps<"element">` + `RecipeVariantProps`
- Styling tokens follow `sd.system.category.subcategory.property` pattern
- CSS-in-JS styles use Panda's `css()`, `cva()`, and `cx()` utilities

### Theme Integration

Theme switching uses `data-panda-theme` attribute on HTML elements. Components automatically adapt to active theme through design token system.
