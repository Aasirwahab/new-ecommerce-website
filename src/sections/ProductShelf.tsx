import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Plus } from 'lucide-react';

const categories = [
  { key: 'tea', labelCn: '茶器', labelEn: 'Tea Ware' },
  { key: 'tableware', labelCn: '餐具', labelEn: 'Tableware' },
  { key: 'vases', labelCn: '花器', labelEn: 'Vases' },
  { key: 'incense', labelCn: '香器', labelEn: 'Incense' },
  { key: 'desk', labelCn: '文房', labelEn: 'Desk' },
];

export default function ProductShelf() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const shelfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shelfSection = shelfRef.current;
    if (!shelfSection) return;
    const bands = shelfSection.querySelectorAll('.shelf-band');

    let cleanup: (() => void) | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const st = ScrollTrigger.create({
          trigger: shelfSection,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            gsap.fromTo(
              bands,
              { x: (i: number) => (i % 2 === 0 ? -80 : 80), opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
            );
          },
        });

        cleanup = () => st.kill();
      }
    );

    return () => cleanup?.();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section ref={shelfRef} className="shelf-section">
      <div className="absolute top-6 left-6 md:left-12 z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase block mb-1" style={{ color: 'rgba(250,245,235,0.5)' }}>
          {t('全部器物', 'All Products')}
        </span>
      </div>

      {categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat.key);
        return (
          <div key={cat.key} className="shelf-band">
            <h3 className="shelf-title">
              {lang === 'zh' ? cat.labelCn : cat.labelEn}
            </h3>
            <div className="shelf-carousel">
              {catProducts.map(product => (
                <div key={product.id} className="product-card group">
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <Image
                      src={product.image}
                      alt={lang === 'zh' ? product.nameCn : product.nameEn}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div
                        className="glaze-swatch"
                        style={{ background: product.glazeColor }}
                        title={lang === 'zh' ? product.glaze : product.glazeEn}
                      />
                    </div>
                  </div>
                  <div className="product-info" style={{ padding: '1rem' }}>
                    <h4
                      className="text-sm font-medium mb-1 truncate lang-transition"
                      style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
                    >
                      {lang === 'zh' ? product.nameCn : product.nameEn}
                    </h4>
                    <p className="text-xs mb-2" style={{ color: '#8B7355' }}>
                      {product.dimensions}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-display italic text-base"
                        style={{ color: '#A0522D' }}
                      >
                        ¥{product.price}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        style={{ background: '#A0522D', color: '#FAF5EB' }}
                        title={t('加入购物车', 'Add to Cart')}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
