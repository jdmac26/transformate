import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProviders from "@/components/ClientProviders";

import "./globals.css";
import StarsCanvas from "@/components/shared/StarBackground";

const OrbitronVar = Orbitron({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: "Transformate",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={cn("font-orbitron antialiased", OrbitronVar.variable)}>
          <StarsCanvas />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
              
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
