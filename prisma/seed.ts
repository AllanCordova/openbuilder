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
        className:
          "max-w-canvas w-full mx-auto p-spacing-lg flex flex-col gap-spacing-md",
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

const extraComponentData: Prisma.ComponentLibraryCreateInput[] = [
  // --- LAYOUT & NAVIGATION ---
  {
    name: "Header Navbar",
    default_schema_json: {
      type: "Card",
      props: {
        tag: "header",
        className:
          "w-full px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h1",
            className: "text-xl font-bold text-gray-900",
            content: "LogoMarca",
          },
          children: [],
        },
        {
          type: "Card",
          props: { tag: "nav", className: "flex gap-6" },
          children: [
            {
              type: "Text",
              props: {
                tag: "a",
                href: "#",
                className: "text-gray-600 hover:text-primary",
                content: "Home",
              },
              children: [],
            },
            {
              type: "Text",
              props: {
                tag: "a",
                href: "#",
                className: "text-gray-600 hover:text-primary",
                content: "Sobre",
              },
              children: [],
            },
            {
              type: "Text",
              props: {
                tag: "a",
                href: "#",
                className: "text-gray-600 hover:text-primary",
                content: "Contato",
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: "Footer Simple",
    default_schema_json: {
      type: "Card",
      props: {
        tag: "footer",
        className:
          "w-full p-8 bg-gray-50 border-t border-gray-200 flex flex-col items-center justify-center gap-4",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-sm text-gray-500",
            content: "© 2026 Sua Empresa. Todos os direitos reservados.",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Sidebar (Aside)",
    default_schema_json: {
      type: "Card",
      props: {
        tag: "aside",
        className:
          "w-64 h-full min-h-screen bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-4",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h3",
            className:
              "text-xs font-bold uppercase text-gray-400 tracking-wider mb-2",
            content: "Menu Principal",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "block py-2 text-gray-700 hover:text-primary",
            content: "Dashboard",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "block py-2 text-gray-700 hover:text-primary",
            content: "Configurações",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Grid 2 Columns",
    default_schema_json: {
      type: "Card",
      props: { className: "w-full grid grid-cols-1 md:grid-cols-2 gap-6" },
      children: [
        {
          type: "Card",
          props: { className: "p-4 bg-gray-100 rounded-lg min-h-[100px]" },
          children: [],
        },
        {
          type: "Card",
          props: { className: "p-4 bg-gray-100 rounded-lg min-h-[100px]" },
          children: [],
        },
      ],
    },
  },
  {
    name: "Grid 3 Columns",
    default_schema_json: {
      type: "Card",
      props: { className: "w-full grid grid-cols-1 md:grid-cols-3 gap-6" },
      children: [
        {
          type: "Card",
          props: { className: "p-4 bg-gray-100 rounded-lg min-h-[100px]" },
          children: [],
        },
        {
          type: "Card",
          props: { className: "p-4 bg-gray-100 rounded-lg min-h-[100px]" },
          children: [],
        },
        {
          type: "Card",
          props: { className: "p-4 bg-gray-100 rounded-lg min-h-[100px]" },
          children: [],
        },
      ],
    },
  },
  {
    name: "Section Wrapper",
    default_schema_json: {
      type: "Card",
      props: {
        tag: "section",
        className:
          "w-full py-16 px-8 flex flex-col items-center justify-center bg-white",
      },
      children: [],
    },
  },

  // --- CARDS & CONTENT ---
  {
    name: "Card With Image",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-100",
      },
      children: [
        {
          type: "Image",
          props: {
            src: "https://via.placeholder.com/400x200",
            alt: "Capa do Card",
            className: "w-full h-48 object-cover",
          },
          children: [],
        },
        {
          type: "Card",
          props: { className: "p-6 flex flex-col gap-3" },
          children: [
            {
              type: "Text",
              props: {
                tag: "h3",
                className: "text-xl font-bold text-gray-900",
                content: "Título do Card",
              },
              children: [],
            },
            {
              type: "Text",
              props: {
                tag: "p",
                className: "text-gray-500",
                content:
                  "Uma breve descrição sobre o conteúdo deste card com imagem.",
              },
              children: [],
            },
            {
              type: "Button",
              props: {
                className:
                  "mt-2 px-4 py-2 bg-primary text-background rounded-md w-fit",
                content: "Leia mais",
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: "Profile Card",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-64 p-6 bg-white rounded-xl shadow border border-gray-100 flex flex-col items-center text-center gap-3",
      },
      children: [
        {
          type: "Image",
          props: {
            src: "https://via.placeholder.com/100",
            alt: "Avatar",
            className: "w-24 h-24 rounded-full object-cover mb-2",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "h4",
            className: "text-lg font-bold text-gray-900",
            content: "João Silva",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-sm text-primary font-medium",
            content: "Engenheiro de Software",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Testimonial Card",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "p-6 bg-gray-50 rounded-xl border border-gray-200 flex flex-col gap-4",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "p",
            className: "italic text-gray-600",
            content:
              '"Este produto mudou completamente a forma como trabalhamos. Recomendo muito!"',
          },
          children: [],
        },
        {
          type: "Card",
          props: { className: "flex items-center gap-3 mt-2" },
          children: [
            {
              type: "Image",
              props: {
                src: "https://via.placeholder.com/40",
                className: "w-10 h-10 rounded-full",
              },
              children: [],
            },
            {
              type: "Text",
              props: {
                tag: "span",
                className: "font-semibold text-gray-900",
                content: "Maria Oliveira",
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: "Pricing Card",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center gap-4 max-w-sm",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h3",
            className: "text-2xl font-bold text-gray-900",
            content: "Plano Pro",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-4xl font-extrabold text-primary",
            content: "R$ 99/mês",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-gray-500 mb-4",
            content: "Ideal para times em crescimento.",
          },
          children: [],
        },
        {
          type: "Button",
          props: {
            className:
              "w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90",
            content: "Assinar Agora",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Stat Card",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-1",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "span",
            className: "text-sm text-gray-500 uppercase font-semibold",
            content: "Total de Vendas",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "h4",
            className: "text-3xl font-bold text-gray-900",
            content: "R$ 45.000",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "span",
            className: "text-xs text-green-500 font-medium mt-2",
            content: "+12% este mês",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Hero Section",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full px-8 py-20 bg-blue-50 text-center flex flex-col items-center justify-center gap-6",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h1",
            className: "text-5xl font-extrabold text-gray-900 max-w-2xl",
            content: "Construa o futuro da web hoje.",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-xl text-gray-600 max-w-xl",
            content:
              "Crie interfaces modernas de forma rápida e intuitiva com o nosso construtor.",
          },
          children: [],
        },
        {
          type: "Button",
          props: {
            className:
              "px-8 py-4 bg-primary text-background text-lg font-bold rounded-full",
            content: "Começar Gratuitamente",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Feature Item",
    default_schema_json: {
      type: "Card",
      props: { className: "flex flex-col gap-2 p-4" },
      children: [
        {
          type: "Text",
          props: {
            tag: "div",
            className:
              "w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center text-2xl mb-2",
            content: "🚀",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "h4",
            className: "text-lg font-bold text-gray-900",
            content: "Alta Performance",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-sm text-gray-500",
            content: "Otimizado para carregar rápido em qualquer dispositivo.",
          },
          children: [],
        },
      ],
    },
  },

  // --- TYPOGRAPHY & ALERTS ---
  {
    name: "Badge / Tag",
    default_schema_json: {
      type: "Text",
      props: {
        tag: "span",
        className:
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
        content: "Novo",
      },
      children: [],
    },
  },
  {
    name: "Alert Success",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "p",
            className: "font-medium",
            content: "Sucesso! Sua ação foi concluída.",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Alert Danger",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "p",
            className: "font-medium",
            content: "Erro! Algo deu errado, tente novamente.",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Alert Info",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 border border-blue-200",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "p",
            className: "font-medium",
            content: "Info: Aqui está uma informação importante para você.",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Blockquote",
    default_schema_json: {
      type: "Text",
      props: {
        tag: "blockquote",
        className:
          "p-4 my-4 border-l-4 border-primary bg-gray-50 italic text-gray-700 text-lg",
        content:
          "O design não é apenas o que parece e o que se sente. O design é como funciona.",
      },
      children: [],
    },
  },
  {
    name: "Divider",
    default_schema_json: {
      type: "Card",
      props: { tag: "hr", className: "my-8 border-t border-gray-200 w-full" },
      children: [],
    },
  },

  // --- BUTTONS ---
  {
    name: "Outline Button",
    default_schema_json: {
      type: "Button",
      props: {
        className:
          "px-5 py-2.5 border-2 border-primary text-primary bg-transparent font-medium rounded-default hover:bg-primary hover:text-white transition-colors",
        content: "Outline Button",
      },
      children: [],
    },
  },
  {
    name: "Ghost Button",
    default_schema_json: {
      type: "Button",
      props: {
        className:
          "px-5 py-2.5 text-gray-600 bg-transparent font-medium rounded-default hover:bg-gray-100 transition-colors",
        content: "Ghost Button",
      },
      children: [],
    },
  },

  // --- FORMS & INPUTS ---
  {
    name: "Input Field",
    default_schema_json: {
      type: "Card",
      props: { className: "flex flex-col gap-1 w-full" },
      children: [
        {
          type: "Text",
          props: {
            tag: "label",
            className: "text-sm font-medium text-gray-700",
            content: "Nome Completo",
          },
          children: [],
        },
        {
          type: "Input",
          props: {
            tag: "input",
            type: "text",
            placeholder: "Digite seu nome...",
            className:
              "px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Textarea Field",
    default_schema_json: {
      type: "Card",
      props: { className: "flex flex-col gap-1 w-full" },
      children: [
        {
          type: "Text",
          props: {
            tag: "label",
            className: "text-sm font-medium text-gray-700",
            content: "Mensagem",
          },
          children: [],
        },
        {
          type: "Input",
          props: {
            tag: "textarea",
            rows: 4,
            placeholder: "Escreva sua mensagem aqui...",
            className:
              "px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none resize-y",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Search Bar",
    default_schema_json: {
      type: "Card",
      props: { className: "flex w-full max-w-md" },
      children: [
        {
          type: "Input",
          props: {
            tag: "input",
            type: "search",
            placeholder: "Buscar...",
            className:
              "flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary",
          },
          children: [],
        },
        {
          type: "Button",
          props: {
            className:
              "px-4 py-2 bg-primary text-white font-medium rounded-r-md hover:bg-blue-700",
            content: "Buscar",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Newsletter Form",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "p-8 bg-gray-900 rounded-xl text-center flex flex-col items-center gap-4 w-full",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "h3",
            className: "text-2xl font-bold text-white",
            content: "Assine nossa Newsletter",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "p",
            className: "text-gray-400 mb-2",
            content: "Receba as melhores dicas diretamente no seu email.",
          },
          children: [],
        },
        {
          type: "Card",
          props: { className: "flex w-full max-w-md gap-2" },
          children: [
            {
              type: "Input",
              props: {
                tag: "input",
                type: "email",
                placeholder: "Seu melhor email...",
                className: "flex-1 px-4 py-3 rounded-md outline-none",
              },
              children: [],
            },
            {
              type: "Button",
              props: {
                className:
                  "px-6 py-3 bg-primary text-white font-bold rounded-md",
                content: "Assinar",
              },
              children: [],
            },
          ],
        },
      ],
    },
  },

  // --- MEDIA & MISCELLANEOUS ---
  {
    name: "Image Basic",
    default_schema_json: {
      type: "Image",
      props: {
        src: "https://via.placeholder.com/800x400",
        alt: "Imagem Placeholder",
        className: "w-full h-auto rounded-lg shadow-sm",
      },
      children: [],
    },
  },
  {
    name: "Avatar",
    default_schema_json: {
      type: "Image",
      props: {
        src: "https://via.placeholder.com/150",
        alt: "User Avatar",
        className: "w-12 h-12 rounded-full border-2 border-white shadow-sm",
      },
      children: [],
    },
  },
  {
    name: "Breadcrumbs",
    default_schema_json: {
      type: "Card",
      props: {
        tag: "nav",
        className: "flex items-center gap-2 text-sm text-gray-500",
      },
      children: [
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "hover:text-primary",
            content: "Home",
          },
          children: [],
        },
        { type: "Text", props: { tag: "span", content: "/" }, children: [] },
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "hover:text-primary",
            content: "Produtos",
          },
          children: [],
        },
        { type: "Text", props: { tag: "span", content: "/" }, children: [] },
        {
          type: "Text",
          props: {
            tag: "span",
            className: "text-gray-900 font-medium",
            content: "Software",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "CTA Banner",
    default_schema_json: {
      type: "Card",
      props: {
        className:
          "w-full bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6",
      },
      children: [
        {
          type: "Card",
          props: { className: "flex flex-col gap-2" },
          children: [
            {
              type: "Text",
              props: {
                tag: "h3",
                className: "text-2xl font-bold",
                content: "Pronto para começar?",
              },
              children: [],
            },
            {
              type: "Text",
              props: {
                tag: "p",
                className: "text-blue-100",
                content: "Crie sua conta agora e ganhe 14 dias grátis.",
              },
              children: [],
            },
          ],
        },
        {
          type: "Button",
          props: {
            className:
              "px-6 py-3 bg-white text-primary font-bold rounded-lg whitespace-nowrap hover:bg-gray-50",
            content: "Criar Conta",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Social Links",
    default_schema_json: {
      type: "Card",
      props: { className: "flex items-center gap-4" },
      children: [
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "text-gray-500 hover:text-blue-600 transition-colors",
            content: "Twitter",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "text-gray-500 hover:text-blue-800 transition-colors",
            content: "LinkedIn",
          },
          children: [],
        },
        {
          type: "Text",
          props: {
            tag: "a",
            href: "#",
            className: "text-gray-500 hover:text-pink-600 transition-colors",
            content: "Instagram",
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
  for (const component of extraComponentData) {
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
