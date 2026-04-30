import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { giftSets } from '@/data/products';
import { ShoppingBag, Tag } from 'lucide-react';

export default function GiftSets() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddGift = (gift: typeof giftSets[0]) => {
    addToCart({
      id: gift.id,
      nameCn: gift.nameCn,
      nameEn: gift.nameEn,
      category: 'gift',
      categoryEn: 'Gift Set',
      glaze: '-',
      glazeEn: '-',
      glazeColor: '#D4A574',
      dimensions: '-',
      price: gift.price,
      image: gift.image,
      descriptionCn: `礼盒: ${gift.contentsCn.join(', ')}`,
      descriptionEn: `Gift set: ${gift.contentsEn.join(', ')}`,
    });
  };

  return (
    <section id="gifts" className="py-20 md:py-32" style={{ background: '#FAF5EB' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#8B7355' }}>
            {t('礼盒定制', 'Gift Sets')}
          </span>
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
          >
            {t('用心之选', 'Curated with Care')}
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#8B7355' }}>
            {t('为特别的人准备特别的礼物，每一件都经过精心挑选与搭配。', 'Carefully selected and paired for someone special.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {giftSets.map((gift, i) => (
            <div
              key={gift.id}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#FAF5EB',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(44,24,16,0.08)',
                border: '1px solid rgba(139,115,85,0.12)',
                marginTop: i === 1 ? '2rem' : 0,
              }}
            >
              <div className="relative overflow-hidden rounded-t" style={{ aspectRatio: '4/3' }}>
                <img
                  src={gift.image}
                  alt={lang === 'zh' ? gift.nameCn : gift.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(250,245,235,0.9)', color: '#2C1810' }}
                >
                  <Tag size={12} />
                  {lang === 'zh' ? gift.occasionCn : gift.occasionEn}
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-xl mb-2 lang-transition"
                  style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
                >
                  {lang === 'zh' ? gift.nameCn : gift.nameEn}
                </h3>

                <ul className="space-y-1.5 mb-6">
                  {(lang === 'zh' ? gift.contentsCn : gift.contentsEn).map((item, j) => (
                    <li key={j} className="text-sm flex items-center gap-2" style={{ color: '#8B7355' }}>
                      <span className="w-1 h-1 rounded-full" style={{ background: '#D4A574' }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="font-display italic text-xl" style={{ color: '#A0522D' }}>
                    ¥{gift.price}
                  </span>
                  <button
                    onClick={() => handleAddGift(gift)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-colors hover:opacity-90"
                    style={{ background: '#A0522D', color: '#FAF5EB' }}
                  >
                    <ShoppingBag size={14} />
                    {t('加入购物车', 'Add to Cart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
