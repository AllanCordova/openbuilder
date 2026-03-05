set -e

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  POSTGRES_USER="${POSTGRES_USER:-postgres}"
  POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-postgres}"
  POSTGRES_DB="${POSTGRES_DB:-openbuilder}"
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

  cat > .env << EOF
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}

DATABASE_URL=${DATABASE_URL}

TOKEN_SECRET=replace-with-a-secret-key-in-production
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
EOF
  echo ".env created with default values."
else
  echo ".env already exists; skipping."
fi

docker-compose up -d
echo "PostgreSQL container started. Next: npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run dev"
