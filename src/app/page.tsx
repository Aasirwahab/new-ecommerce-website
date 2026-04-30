'use client';

import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Home from '@/screens/Home';

export default function Page() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </LanguageProvider>
  );
}
