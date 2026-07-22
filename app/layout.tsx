import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Velour & Co. — Luxury Boutique Hotel',
    template: '%s | Velour & Co.',
  },
  description:
    'Experience unrivalled luxury at Velour & Co. — an intimate boutique hotel where every detail has been curated for the discerning traveller.',
  keywords: [
    'luxury hotel',
    'boutique resort',
    'premium accommodation',
    'Velour hotel',
    'five-star hotel',
    'spa retreat',
    'fine dining',
    'exclusive experiences',
  ],
  authors: [{ name: 'Velour & Co.' }],
  creator: 'Velour & Co.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://velour.co',
    siteName: 'Velour & Co.',
    title: 'Velour & Co. — Luxury Boutique Hotel',
    description:
      'Experience unrivalled luxury at Velour & Co. — an intimate boutique hotel where every detail has been curated for the discerning traveller.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Velour & Co. Luxury Hotel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velour & Co. — Luxury Boutique Hotel',
    description: 'Experience unrivalled luxury at Velour & Co.',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0f1e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-midnight`}>
      <body className="antialiased bg-midnight text-ivory font-sans">
        {children}
      </body>
    </html>
  )
}
