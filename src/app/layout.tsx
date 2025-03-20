import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import meta, { title } from '@/data/meta';
import type { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='sticky top-0 z-10  shadow'>
          <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold'>{title}</h1>
          </div>
        </header>
        <main className='container mx-auto px-4 mt-4'>{children}</main>
      </body>
    </html>
  );
}
