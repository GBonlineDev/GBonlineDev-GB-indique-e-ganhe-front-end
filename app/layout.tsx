import type React from 'react';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Formulário de Cadastro',
  description: 'Formulário de cadastro com validação',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0c0c] p-4">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-1/2 -top-1/2 h-full w-full rounded-full bg-gradient-to-br from-red-500/20 to-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full  bg-gradient-to-tl from-blue-950/10 to-blue-800/20 blur-3xl" />
            </div>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
