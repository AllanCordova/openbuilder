"use client";

import {
  HeroSection,
  HeroBanner,
  FeatureSection,
  ExploreSection,
  SpotlightSection,
  FinalCTA,
  AmbientOrbs,
} from "@/components/landing";
import {
  Code,
  LayoutTemplate,
  Zap,
  MousePointer2,
  FolderKanban,
  Share2,
} from "lucide-react";

const coreFeatures = [
  {
    icon: LayoutTemplate,
    title: "Visual canvas",
    description:
      "Drag and drop components onto the canvas to build your interface visually. No code required to get started.",
  },
  {
    icon: Code,
    title: "Component library",
    description:
      "Use a rich library of pre-built components. Customize props, layout, and styling from the properties panel.",
  },
  {
    icon: Zap,
    title: "Fast development",
    description:
      "Ship faster with live preview, sections, and pages. Iterate in minutes instead of hours.",
  },
  {
    icon: FolderKanban,
    title: "Projects & pages",
    description:
      "Organize work in projects. Add multiple sections and pages per project and switch between them easily.",
  },
  {
    icon: MousePointer2,
    title: "Full control",
    description:
      "Adjust spacing, colors, and layout for each component. Export your project when you're done.",
  },
  {
    icon: Share2,
    title: "Share publicly",
    description:
      "Make projects public and share them via the Explore gallery so others can discover and get inspired.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AmbientOrbs />
      <main className="relative z-10 flex-1 w-full">
        <HeroSection />
        <HeroBanner />
        <FeatureSection
          title="Everything you need to build"
          subtitle="From idea to interface—Cadre gives you the tools to create pages visually and ship quickly."
          features={coreFeatures}
        />
        <SpotlightSection />
        <ExploreSection />
        <FinalCTA />
      </main>
    </div>
  );
}
