import './globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const jost = Jost({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: 'Perfummerce - Premium Fragrances & Perfumes',
  description: 'Perfummerce is a premium fragrance store that offers a wide range of fragrances for men and women.',
  keywords: 'perfume, fragrance, cologne, eau de parfum, luxury, premium, authentic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}