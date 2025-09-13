import type { Metadata } from 'next';
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
  title: 'FieldSense - AI-powered Insights for Indian Agriculture',
  description: 'From soil to yield, powered by KrishiMitra AI. Get real-time crop analysis, soil insights, and personalized farming recommendations.',
  keywords: [
    'agriculture',
    'AI',
    'farming',
    'India',
    'crop analysis',
    'soil health',
    'KrishiMitra',
    'precision agriculture',
    'satellite imagery',
    'NDVI',
    'crop monitoring',
    'farm management'
  ],
  authors: [{ name: 'FieldSense Team' }],
  creator: 'FieldSense',
  publisher: 'FieldSense',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fieldsense.ai',
    title: 'FieldSense - AI-powered Insights for Indian Agriculture',
    description: 'From soil to yield, powered by KrishiMitra AI',
    siteName: 'FieldSense',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FieldSense - AI-powered agriculture insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FieldSense - AI-powered Insights for Indian Agriculture',
    description: 'From soil to yield, powered by KrishiMitra AI',
    images: ['/images/twitter-image.jpg'],
    creator: '@fieldsense',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2F9D46' },
    { media: '(prefers-color-scheme: dark)', color: '#2F9D46' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-body antialiased bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Analytics & Performance Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Preload critical resources
              const criticalImages = [
                '/images/hero-farmland.jpg',
                '/images/krishimitra-demo.jpg'
              ];
              
              criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
