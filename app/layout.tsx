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
    default: 'Hotel Sonam — Pokhara, Nepal',
    template: '%s | Hotel Sonam',
  },
  description:
    'Hotel Sonam is a welcoming hotel in Simalchaur, Pokhara — a short walk from Phewa Lake, with an on-site restaurant, comfortable rooms with balconies, and warm Nepali hospitality.',
  keywords: [
    'Hotel Sonam',
    'Pokhara hotel',
    'Simalchaur hotel',
    'Phewa Lake accommodation',
    'Nepal hotel',
    'Pokhara restaurant',
    'family rooms Pokhara',
    'budget hotel Pokhara',
  ],
  authors: [{ name: 'Hotel Sonam' }],
  creator: 'Hotel Sonam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hotelsonam.example',
    siteName: 'Hotel Sonam',
    title: 'Hotel Sonam — Pokhara, Nepal',
    description:
      'A welcoming hotel in Simalchaur, Pokhara — a short walk from Phewa Lake, with an on-site restaurant and comfortable rooms with balconies.',
    images: [
      {
        url: '/images/hotel-sonam-rooftop.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Sonam, Pokhara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Sonam — Pokhara, Nepal',
    description: 'A welcoming hotel in Simalchaur, Pokhara, near Phewa Lake.',
    images: ['/images/hotel-sonam-rooftop.jpg'],
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
