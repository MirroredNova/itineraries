# Itineraries App

A flexible vacation itinerary management application built with Next.js, Material UI, and Supabase.

## Features

- Create and manage date-independent travel itineraries
- Share itineraries with others
- Browse and adopt itineraries from a catalog
- Flexible item types: hotels, restaurants, activities, transport, and custom items
- Tag-based organization system
- Real-time collaboration

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Material UI (MUI) with custom theme
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **Authentication**: NextAuth.js with Supabase Auth
- **Styling**: Tailwind CSS (minimal usage)

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials and other required environment variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/server/` - Server-side utilities and database schemas
- `src/types/` - TypeScript type definitions
- `src/theme.ts` - MUI theme configuration

## Database

The application uses Drizzle ORM with PostgreSQL (via Supabase). Run migrations with:

```bash
npx drizzle-kit push
```
