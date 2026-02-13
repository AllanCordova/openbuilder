import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
} as any);

const prisma = new PrismaClient({
  adapter,
});

/** Placeholder password hash (change in production). Use a real hash for a real user. */
const SEED_USER_PASSWORD_HASH =
  "$2a$10$placeholder.hash.for.seed.user.replace.in.production";

const componentData: Prisma.ComponentLibraryCreateInput[] = [
  {
    name: "SimpleButton",
    default_schema_json: {
      type: "Button",
      props: {
        className:
          "px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors",
        content: "Click Me",
      },
      children: [],
    },
  },
  {
    name: "Primary Button",
    default_schema_json: {
      type: "Button",
      props: {
        className:
          "px-5 py-2.5 bg-primary text-background font-medium rounded-default hover:opacity-90 transition-opacity",
        content: "Primary",
      },
      children: [],
    },
  },
  {
    name: "Heading",
    default_schema_json: {
      type: "Text",
      props: {
        tag: "h2",
        className: "text-typography-heading font-bold text-foreground",
        content: "Heading",
      },
      children: [],
    },
  },
  {
    name: "Paragraph",
    default_schema_json: {
      type: "Text",
      props: {
        tag: "p",
        className: "text-typography-body text-muted",
        content: "Paragraph text. Edit in the builder.",
      },
      children: [],
    },
  },
  {
    name: "SimpleCard",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col gap-2",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h3",
            className: "text-lg font-bold text-gray-900",
            content: "Card Title",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-sm text-gray-500",
            content:
              "This is a simple card description. You can edit this text later in the builder.",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Container",
    default_schema_json: {
      type: "Card",
      props: {
        className: "max-w-canvas w-full mx-auto p-spacing-lg flex flex-col gap-spacing-md",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h1",
            className: "text-typography-display font-bold text-foreground",
            content: "Section title",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-typography-body text-muted",
            content: "Section content goes here.",
          },
          children: [],
        },
      ],
    },
  },
];

export async function main() {
  console.log("Start seeding...");

  const user = await prisma.user.upsert({
    where: { email: "seed@openbuilder.dev" },
    update: {},
    create: {
      name: "Seed User",
      email: "seed@openbuilder.dev",
      password_hash: SEED_USER_PASSWORD_HASH,
    },
  });
  console.log("User:", user.email);

  let project = await prisma.project.findFirst({ where: { userId: user.id } });
  if (!project) {
    project = await prisma.project.create({
      data: { name: "Default Project", userId: user.id },
    });
  }
  console.log("Project:", project.name);

  console.log("Seeding Component Library...");
  for (const component of componentData) {
    const exists = await prisma.componentLibrary.findFirst({
      where: { name: component.name },
    });
    if (!exists) {
      await prisma.componentLibrary.create({ data: component });
      console.log(`  Created: ${component.name}`);
    }
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
