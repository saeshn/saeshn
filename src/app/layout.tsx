import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { SocialLinks } from "@/components/ui/social-links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAESHN",
  description: "Electronic Music Producer & Artist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-end p-6">
            <ModeToggle />
          </header>

          {children}

          <footer className="w-full py-6">
            <SocialLinks />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
