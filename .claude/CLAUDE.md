# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack
- Next.js 16.0 (App Router)
- TypeScript 5.9
- Prisma (ORM)
- shadcn/ui (UI components)
- Neon (PostgreSQL database)
- Vercel (deployment platform)

## Project Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database (Prisma)
```bash
npx prisma generate          # Generate Prisma Client
npx prisma db push           # Push schema changes to database
npx prisma db pull           # Pull schema from database
npx prisma studio            # Open Prisma Studio (database GUI)
npx prisma migrate dev       # Create and apply migration in development
npx prisma migrate deploy    # Apply migrations in production
```

## Architecture Guidelines

### Component Structure
- Use React function components only (no class components)
- State management with React hooks (useState, useEffect, useContext, etc.)
- Server Components by default in Next.js App Router
- Use 'use client' directive only when client-side interactivity is required

### Async Patterns
- Always use async/await for asynchronous operations
- Never use .then()/.catch() chains
- Error handling is mandatory for all async operations

### Database Access
- All database operations go through Prisma Client
- Use server-side API routes or Server Actions for database queries
- Never expose Prisma Client to client-side code

### UI Components
- Use shadcn/ui components for consistent design
- Components should be in the components directory
- Follow shadcn/ui installation pattern for adding new components

## File Organization (Expected)
```
/app              # Next.js App Router pages and layouts
/components       # Reusable UI components
  /ui             # shadcn/ui components
/lib              # Utility functions and shared logic
/prisma           # Prisma schema and migrations
  schema.prisma   # Database schema
/public           # Static assets
```

## Environment Variables
Required environment variables (in .env):
- `DATABASE_URL` - Neon PostgreSQL connection string
- `DIRECT_URL` - Direct database connection (for migrations)

## Coding Standards
- TypeScript strict mode enabled
- All async functions must include error handling (try/catch)
- Component props must be typed with TypeScript interfaces
- Use meaningful variable and function names
- Database queries should include error handling and validation
