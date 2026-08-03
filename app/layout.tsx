import type { Metadata } from 'next';
import { Newsreader, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../src/context/AuthContext';

const newsreader = Newsreader({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-newsreader' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-plex-mono' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'WAAW — Founder registration',
  description: 'Register your startup with WAAW and raise capital from Black diaspora investors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-tx antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
