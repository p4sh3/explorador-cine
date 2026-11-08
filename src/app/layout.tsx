import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Explorador de Cine",
  description: "Descubre películas y series para tu próxima sesión.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-white/10 bg-zinc-950">
          <nav
            aria-label="Navegación principal"
            className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-6 sm:px-10 lg:px-12"
          >
            <Link
              className="shrink-0 text-sm font-bold tracking-tight text-white sm:text-base"
              href="/"
            >
              <span className="text-amber-400">CINE</span> EXPLORADOR
            </Link>
            <div className="flex items-center gap-4 text-sm sm:gap-7">
              <Link
                className="text-zinc-300 transition hover:text-white"
                href="/buscar"
              >
                Buscar
              </Link>
              <Link
                className="text-zinc-300 transition hover:text-white"
                href="/favoritos"
              >
                Favoritos
              </Link>
            </div>
          </nav>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-white/10 px-6 py-6 text-center text-xs text-zinc-500">
          Explorador de Cine
        </footer>
      </body>
    </html>
  );
}
