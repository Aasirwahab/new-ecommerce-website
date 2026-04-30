import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Search, SlidersHorizontal, X, ShoppingBag } from 'lucide-react';

const categories = [
  { key: 'all', labelCn: '全部', labelEn: 'All' },
  { key: 'tea', labelCn: '茶器', labelEn: 'Tea Ware' },
  { key: 'tableware', labelCn: '餐具', labelEn: 'Tableware' },
  { key: 'vases', labelCn: '花器', labelEn: 'Vases' },
  { key: 'incense', labelCn: '香器', labelEn: 'Incense' },
  { key: 'desk', labelCn: '文房', labelEn: 'Desk' },
];

const sortOptions = [
  { key: 'default', labelCn: '默认排序', labelEn: 'Default' },
  { key: 'price-asc', labelCn: '价格由低到高', labelEn: 'Price: Low to High' },
  { key: 'price-desc', labelCn: '价格由高到低', labelEn: 'Price: High to Low' },
  { key: 'name', labelCn: '名称', labelEn: 'Name' },
];

export default function AllProducts() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickView, setQuickView] = useState<typeof products[0] | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.nameCn.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.glaze.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => (lang === 'zh' ? a.nameCn.localeCompare(b.nameCn) : a.nameEn.localeCompare(b.nameEn)));
    return result;
  }, [activeCategory, sortBy, searchQuery, lang]);

  return (
    <section id="products" className="py-20 md:py-32" style={{ background: '#FAF5EB' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#8B7355' }}>
              {t('全部器物', 'All Products')}
            </span>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
            >
              {t('器物有灵', 'Objects Have Soul')}
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50"
              style={{ border: '1px solid #8B7355', color: '#2C1810' }}
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('搜索器物...', 'Search products...')}
              className="flex-1 px-4 py-3 text-sm rounded bg-white/60 border focus:outline-none focus:border-[#A0522D]"
              style={{ borderColor: '#D4A574', color: '#2C1810' }}
              autoFocus
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ color: '#8B7355' }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 text-sm rounded-full transition-all duration-300 lang-transition"
              style={{
                background: activeCategory === cat.key ? '#2C1810' : 'transparent',
                color: activeCategory === cat.key ? '#FAF5EB' : '#8B7355',
                border: '1px solid #8B7355',
              }}
            >
              {lang === 'zh' ? cat.labelCn : cat.labelEn}
            </button>
          ))}

          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal size={14} style={{ color: '#8B7355' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent focus:outline-none cursor-pointer"
              style={{ color: '#8B7355' }}
            >
              {sortOptions.map(opt => (
                <option key={opt.key} value={opt.key}>
                  {lang === 'zh' ? opt.labelCn : opt.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setQuickView(product)}
            >
              <div
                className="relative overflow-hidden rounded mb-3 transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  aspectRatio: '3/4',
                  boxShadow: '0 2px 8px rgba(44,24,16,0.08)',
                  border: '1px solid rgba(139,115,85,0.15)',
                }}
              >
                <Image
                  src={product.image}
                  alt={lang === 'zh' ? product.nameCn : product.nameEn}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3">
                  <div
                    className="glaze-swatch"
                    style={{ background: product.glazeColor }}
                    title={lang === 'zh' ? product.glaze : product.glazeEn}
                  />
                </div>
              </div>
              <h4
                className="text-sm font-medium mb-1 lang-transition"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
              >
                {lang === 'zh' ? product.nameCn : product.nameEn}
              </h4>
              <p className="text-xs mb-1" style={{ color: '#8B7355' }}>
                {lang === 'zh' ? product.glaze : product.glazeEn} · {product.dimensions}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display italic text-sm" style={{ color: '#A0522D' }}>
                  ¥{product.price}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors hover:bg-[#A0522D] hover:text-[#FAF5EB]"
                  style={{ color: '#A0522D', border: '1px solid #A0522D' }}
                >
                  <ShoppingBag size={12} />
                  {t('加入', 'Add')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: '#8B7355' }}>{t('没有找到匹配的器物', 'No products found')}</p>
          </div>
        )}
      </div>

      {quickView && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onClick={() => setQuickView(null)}
        >
          <div className="absolute inset-0 bg-[#2C1810]/40 backdrop-blur-sm" />
          <div
            className="relative bg-[#FAF5EB] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(44,24,16,0.08)', color: '#2C1810' }}
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={quickView.image}
                  alt={lang === 'zh' ? quickView.nameCn : quickView.nameEn}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="glaze-swatch" style={{ background: quickView.glazeColor }} />
                  <span className="text-xs" style={{ color: '#8B7355' }}>
                    {lang === 'zh' ? quickView.glaze : quickView.glazeEn}
                  </span>
                </div>
                <h3
                  className="text-2xl mb-2 lang-transition"
                  style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
                >
                  {lang === 'zh' ? quickView.nameCn : quickView.nameEn}
                </h3>
                <p className="text-sm mb-4 leading-relaxed lang-transition" style={{ color: '#8B7355' }}>
                  {lang === 'zh' ? quickView.descriptionCn : quickView.descriptionEn}
                </p>
                <p className="text-xs mb-6" style={{ color: '#8B7355' }}>
                  {quickView.dimensions}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-display italic text-2xl" style={{ color: '#A0522D' }}>
                    ¥{quickView.price}
                  </span>
                  <button
                    onClick={() => { addToCart(quickView); setQuickView(null); }}
                    className="flex-1 px-6 py-3 rounded text-sm font-medium transition-colors hover:opacity-90"
                    style={{ background: '#A0522D', color: '#FAF5EB' }}
                  >
                    {t('加入购物车', 'Add to Cart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
