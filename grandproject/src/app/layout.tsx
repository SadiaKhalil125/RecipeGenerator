import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Recipe Generator - Create Amazing Recipes with AI',
  description: 'Generate personalized recipes using AI technology. Get step-by-step instructions, ingredients, and nutritional information for any dish.',
  keywords: 'recipe generator, AI recipes, cooking, food, meal planning, ingredients, instructions',
  authors: [{ name: 'Recipe Generator Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Recipe Generator',
    description: 'Create amazing recipes with AI technology',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Recipe Generator',
    description: 'Create amazing recipes with AI technology',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
} 