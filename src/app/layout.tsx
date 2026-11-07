import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusHub – Developer & Creator Ecosystem Dashboard",
  description: "All-in-one platform for creators and developers to manage projects, track analytics, organize tasks, and connect with the community.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
