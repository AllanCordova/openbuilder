# Open Builder

Visual page builder with drag-and-drop. Create and edit pages from a component library, with a Netflix-style demo (landing and browse with carousels). Built with Next.js, Prisma, PostgreSQL, and Tailwind.

**Educational use only.** This project and its license are the property of Allan Roberto Cordova.

---

## Requirements

- Node.js 18+
- Docker and Docker Compose (for PostgreSQL)
- npm or pnpm

## Quick start

### 1. Env and database container

From the project root, run the setup script to create a default `.env` (if missing) and start the PostgreSQL container:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

On Windows, use Git Bash or WSL to run the script.

If you prefer to do it manually:

- Copy `.env.example` to `.env` and set `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `DATABASE_URL` (e.g. `postgresql://USER:PASSWORD@localhost:5432/DATABASE`).
- Start the stack: `docker-compose up -d`.

### 2. Prisma

Generate the client, run migrations, and seed the database:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

For development with migration files: `npx prisma migrate dev` instead of `migrate deploy`.

### 3. App

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|--------|-------------|
| `./scripts/setup.sh` | Create default `.env` (if missing) and start PostgreSQL container |
| `docker-compose up -d` | Start PostgreSQL in the background |
| `docker-compose down` | Stop and remove the container |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate deploy` | Apply migrations (production-style) |
| `npx prisma migrate dev` | Create/apply migrations in development |
| `npx prisma db seed` | Run seed (admin user, demo project, pages, component library) |
| `npm install` | Install dependencies |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

## License

Proprietary. For educational purposes only. All rights reserved — Allan Cordova!
