set -e

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo ".env created from .env.example."
  else
    echo "Error: .env.example not found. Cannot create .env."
    exit 1
  fi
else
  echo ".env already exists; skipping."
fi

docker-compose up -d
echo "PostgreSQL container started. Next: npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run dev"