import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fieldsense.ai'),
  title: 'FieldSense - AI-powered Insights for Indian Agriculture',
  description: 'From soil to yield, powered by KrishiMitra AI. Get real-time crop analysis, soil insights, and personalized farming recommendations.',
  keywords: [
    'agriculture',
    'AI',
    'farming',
    'India',
    'crop analysis',
    'soil health',
    'KrishiMitra'
  ],
  authors: [{ name: 'FieldSense Team' }],
  creator: 'FieldSense',
  publisher: 'FieldSense',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fieldsense.ai',
    title: 'FieldSense - AI-powered Insights for Indian Agriculture',
    description: 'From soil to yield, powered by KrishiMitra AI',
    siteName: 'FieldSense',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FieldSense - AI-powered Insights for Indian Agriculture',
    description: 'From soil to yield, powered by KrishiMitra AI',
    creator: '@fieldsense',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2F9D46' },
    { media: '(prefers-color-scheme: dark)', color: '#2F9D46' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body bg-white text-gray-900">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
