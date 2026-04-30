import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { lang, t } = useLanguage();
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-xl"
              style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
            >
              {t('购物车', 'Shopping Cart')}
            </h2>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(44,24,16,0.08)', color: '#2C1810' }}
            >
              <X size={16} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ShoppingBag size={48} style={{ color: '#D4A574', opacity: 0.5 }} />
              <p className="mt-4 text-sm" style={{ color: '#8B7355' }}>
                {t('购物车是空的', 'Your cart is empty')}
              </p>
              <p className="text-xs mt-1" style={{ color: '#8B7355', opacity: 0.7 }}>
                {t('去挑选心仪的器物吧', 'Go find something you love')}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded"
                    style={{ background: 'rgba(139,115,85,0.06)' }}
                  >
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={lang === 'zh' ? item.product.nameCn : item.product.nameEn}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-medium truncate lang-transition"
                        style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
                      >
                        {lang === 'zh' ? item.product.nameCn : item.product.nameEn}
                      </h4>
                      <p className="text-xs mt-0.5" style={{ color: '#8B7355' }}>
                        {lang === 'zh' ? item.product.glaze : item.product.glazeEn}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ border: '1px solid #8B7355', color: '#8B7355' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-6 text-center" style={{ color: '#2C1810' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ border: '1px solid #8B7355', color: '#8B7355' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display italic text-sm" style={{ color: '#A0522D' }}>
                            ¥{item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            style={{ color: '#8B7355' }}
                            className="hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6" style={{ borderColor: 'rgba(139,115,85,0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm" style={{ color: '#8B7355' }}>
                    {t('合计', 'Total')}
                  </span>
                  <span className="font-display italic text-2xl" style={{ color: '#A0522D' }}>
                    ¥{totalPrice}
                  </span>
                </div>
                <button
                  className="w-full py-3.5 rounded text-sm font-medium transition-colors hover:opacity-90"
                  style={{ background: '#A0522D', color: '#FAF5EB' }}
                  onClick={() => alert(t('结算功能即将上线', 'Checkout coming soon'))}
                >
                  {t('结算', 'Checkout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
