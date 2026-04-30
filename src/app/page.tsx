import Providers from '@/app/providers';
import Home from '@/screens/Home';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://new-ecommerce-website.vercel.app';

const ecommerceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Kilnfolk',
  description: 'Handcrafted ceramic tea ware, tableware, vases, incense objects, and curated gift sets.',
  url: siteUrl,
  image: `${siteUrl}/images/3_Zens_Lifestyle_Cobblestone_Outdoor.png`,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecommerceJsonLd) }}
      />
      <Providers>
        <Home />
      </Providers>
    </>
  );
}
