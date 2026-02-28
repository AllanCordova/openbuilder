import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { SidebarClient } from "@/components/ui/SidebarClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cadre",
  description: "Build pages visually with drag-and-drop components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SidebarClient>
            <Toaster richColors closeButton />
            {children}
            <ConfirmModal />
          </SidebarClient>
        </QueryProvider>
      </body>
    </html>
  );
}
