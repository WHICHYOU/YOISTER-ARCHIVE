import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientShell } from '@/components/ClientShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yoister',
  description: 'You are what you choose.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {/* client-only stuff lives inside ClientShell */}
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
