import { useState, useEffect } from 'react';
import { ShoppingBag, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(250,245,235,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,115,85,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display italic text-lg md:text-xl tracking-wide lang-transition"
          style={{ color: scrolled ? '#2C1810' : '#FAF5EB', textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)' }}
        >
          {t('窑火生活', 'Kilnfolk')}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'seasonal', label: t('当季精选', 'Seasonal') },
            { id: 'products', label: t('全部器物', 'All Products') },
            { id: 'philosophy', label: t('匠人故事', 'Story') },
            { id: 'process', label: t('制作过程', 'Process') },
            { id: 'gifts', label: t('礼盒定制', 'Gifts') },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm tracking-wider hover:opacity-70 transition-opacity lang-transition"
              style={{ color: scrolled ? '#2C1810' : '#FAF5EB', textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)' }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm tracking-wider hover:opacity-70 transition-opacity lang-transition"
            style={{ color: scrolled ? '#2C1810' : '#FAF5EB', textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)' }}
          >
            <Globe size={16} />
            <span>{lang === 'zh' ? 'EN' : '中'}</span>
          </button>

          <button
            onClick={openCart}
            className="relative hover:opacity-70 transition-opacity"
            style={{ color: scrolled ? '#2C1810' : '#FAF5EB', textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)' }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-medium" style={{ background: '#A0522D', color: '#FAF5EB' }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
