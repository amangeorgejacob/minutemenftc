# Total Chaos FTC Team Website

## Overview

This is a website for Total Chaos, FTC (FIRST Tech Challenge) robotics team #24621. The application showcases team members, sponsors, community impact, and provides a contact form for inquiries. It's built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and scroll effects
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a standard React SPA pattern with pages in `client/src/pages/` and reusable components in `client/src/components/`. Custom hooks in `client/src/hooks/` handle data fetching and form submissions.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response handling

The server uses a storage abstraction pattern (`server/storage.ts`) that wraps database operations, making it easy to swap implementations if needed.

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions and Zod schemas for validation
- `routes.ts`: API contract definitions with paths, methods, and response schemas

### Data Models
Three main entities:
- **Members**: Team member profiles (name, role, bio, image)
- **Sponsors**: Sponsor information with tier levels (Gold, Silver, Bronze)
- **Messages**: Contact form submissions

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### UI Component Library
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless UI primitives for dialogs, dropdowns, tabs, etc.

### Fonts
- Google Fonts: Orbitron (display headings), Inter (body text)

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling