import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageCol = imageRef.current;
    const textCol = textRef.current;
    if (!section || !imageCol || !textCol) return;

    const imgTween = gsap.to(imageCol, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    const textTween = gsap.to(textCol, {
      yPercent: -3,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      imgTween.kill();
      textTween.kill();
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-20 md:py-32"
      style={{ background: '#FAF5EB' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div ref={imageRef} className="relative overflow-hidden rounded" style={{ aspectRatio: '3/4' }}>
            <img
              src="/images/philosophy.jpg"
              alt="Tea set on linen"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div ref={textRef} className="md:py-12">
            <span
              className="text-[10px] tracking-[0.3em] uppercase block mb-4"
              style={{ color: '#8B7355' }}
            >
              {t('匠人故事', "Maker's Story")}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight"
              style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
            >
              {t('每一件器物，都是时间与泥土的对话。', 'Every piece is a dialogue between time and earth.')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#8B7355' }}>
              {t(
                '窑火生活诞生于对"不完美之美"的执着追求。我们相信，手工制作的器物承载着匠人的温度与专注，那些细微的瑕疵正是手作的灵魂所在。',
                'Kilnfolk was born from a devotion to the beauty of imperfection. We believe handmade vessels carry the warmth and focus of the maker — those subtle flaws are the soul of craft.'
              )}
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: '#8B7355' }}>
              {t(
                '在这个追求标准化的时代，我们坚持以传统手工技艺制作每一件器物。从选土到烧制，每一个环节都倾注了匠人的心血与智慧。',
                'In an age of standardization, we persist in crafting each piece by hand. From clay selection to firing, every step holds the maker\'s heart and wisdom.'
              )}
            </p>

            <blockquote
              className="border-l-2 pl-6 py-2"
              style={{ borderColor: '#A0522D' }}
            >
              <p
                className="text-lg md:text-xl italic leading-relaxed lang-transition"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
              >
                {t(
                  '每一件器物的不完美，都是手作的签名。',
                  'Every imperfection is the signature of the hand.'
                )}
              </p>
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              <img
                src="/images/founder.jpg"
                alt="Founder"
                className="w-14 h-14 rounded-full object-cover"
                style={{ border: '2px solid #D4A574' }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: '#2C1810' }}>
                  {t('林雨桐', 'Lin Yutong')}
                </p>
                <p className="text-xs" style={{ color: '#8B7355' }}>
                  {t('创始人 / 主理匠人', 'Founder / Master Artisan')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
