'use client';

import { useEffect } from 'react';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import SeasonalGallery from '@/sections/SeasonalGallery';
import Philosophy from '@/sections/Philosophy';
import ProductShelf from '@/sections/ProductShelf';
import AllProducts from '@/sections/AllProducts';
import ProcessCarousel from '@/sections/ProcessCarousel';
import GiftSets from '@/sections/GiftSets';
import CartDrawer from '@/sections/CartDrawer';
import Footer from '@/sections/Footer';
import EasterEgg from '@/sections/EasterEgg';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <SeasonalGallery />
        <Philosophy />
        <ProductShelf />
        <AllProducts />
        <ProcessCarousel />
        <GiftSets />
      </main>
      <Footer />
      <CartDrawer />
      <EasterEgg />
    </div>
  );
}
