import type { Metadata } from 'next';
import '@/index.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://new-ecommerce-website.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kilnfolk | Premium Handmade Ceramic Ecommerce',
    template: '%s | Kilnfolk',
  },
  description:
    'Shop handcrafted ceramic tea ware, tableware, vases, incense objects, and curated artisan gift sets.',
  applicationName: 'Kilnfolk',
  keywords: [
    'premium ecommerce website',
    'handmade ceramics',
    'tea ware',
    'artisan tableware',
    'ceramic gift sets',
    'craft objects',
  ],
  authors: [{ name: 'Kilnfolk' }],
  creator: 'Kilnfolk',
  publisher: 'Kilnfolk',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Kilnfolk',
    title: 'Kilnfolk | Premium Handmade Ceramic Ecommerce',
    description:
      'A refined ecommerce experience for handcrafted ceramic objects and curated gift sets.',
    images: [
      {
        url: '/images/3_Zens_Lifestyle_Cobblestone_Outdoor.png',
        width: 1200,
        height: 630,
        alt: 'Handcrafted ceramic tea ware arranged outdoors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kilnfolk | Premium Handmade Ceramic Ecommerce',
    description:
      'Shop handcrafted ceramic tea ware, tableware, vases, incense objects, and curated artisan gift sets.',
    images: ['/images/3_Zens_Lifestyle_Cobblestone_Outdoor.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
