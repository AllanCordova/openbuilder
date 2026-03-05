import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import componentsData from "./components.json";
import PageData from "./page.json";
import PageFilmesData from "./page-filmes.json";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
} as any);

const prisma = new PrismaClient({
  adapter,
});

const ADMIN_PASSWORD_HASH =
  "$2a$10$placeholder.hash.for.seed.user.replace.in.production";

export async function main() {
  console.log("Start seeding Component Library...");

  console.log("Start seeding...");

  console.log("Seeding Admin User...");
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@openbuilder.dev" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@openbuilder.dev",
      password_hash: ADMIN_PASSWORD_HASH,
    },
  });
  console.log(`User created/found: ${adminUser.email}`);

  console.log("Seeding Example Project...");
  const exampleProject = await prisma.project.upsert({
    where: {
      id: "d8019008-3ec0-4678-9772-50a1482c6e33",
    },
    update: {},
    create: {
      id: "d8019008-3ec0-4678-9772-50a1482c6e33",
      name: "Netflix",
      userId: adminUser.id,
      build_status: "success",
      isPublic: true,
    },
  });
  console.log(`Project created/found: ${exampleProject.name}`);

  console.log("Seeding Example Page Netflix");
  await prisma.page.upsert({
    where: {
      id: "aacab015-4b64-4ad3-bc8f-60e54142d2c4",
    },
    update: {
      schema_json: PageData as Prisma.InputJsonValue,
    },
    create: {
      id: "aacab015-4b64-4ad3-bc8f-60e54142d2c4",
      projectId: exampleProject.id,
      name: "Home",
      slug: "/home",
      schema_json: PageData as Prisma.InputJsonValue,
    },
  });
  console.log("Netflix Clone page seeded.");

  console.log("Seeding Filmes page...");
  await prisma.page.upsert({
    where: {
      id: "b2bcb015-4b64-4ad3-bc8f-60e54142d2c5",
    },
    update: {
      schema_json: PageFilmesData as Prisma.InputJsonValue,
    },
    create: {
      id: "b2bcb015-4b64-4ad3-bc8f-60e54142d2c5",
      projectId: exampleProject.id,
      name: "Filmes",
      slug: "/filmes",
      schema_json: PageFilmesData as Prisma.InputJsonValue,
    },
  });
  console.log("Filmes page seeded.");

  for (const component of componentsData) {
    await prisma.componentLibrary.upsert({
      where: {
        name: component.name,
      },
      update: {
        tag: component.tag,
        default_schema_json: component.default_schema_json,
      },
      create: {
        name: component.name,
        tag: component.tag,
        default_schema_json:
          component.default_schema_json as Prisma.InputJsonValue,
      },
    });
  }

  const count = await prisma.componentLibrary.count();
  console.log(`Component Library: ${count} components.`);

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
