import type { Metadata } from 'next';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Kimi Agent Premium Website',
  description: 'A premium artisan commerce experience.',
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
