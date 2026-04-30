import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const seasonalItems = [
  {
    image: '/images/seasonal-1.jpg',
    nameCn: '春茶初盏',
    nameEn: 'First Spring Tea',
    descCn: '一壶两杯，静候春茶初沸',
    descEn: 'A pot and two cups, waiting for the first spring brew',
    price: '¥480 - ¥880',
  },
  {
    image: '/images/seasonal-2.jpg',
    nameCn: '食光慢味',
    nameEn: 'Slow Dining',
    descCn: '一餐一器，品味时光的温度',
    descEn: 'One meal, one vessel — tasting the warmth of time',
    price: '¥120 - ¥520',
  },
  {
    image: '/images/seasonal-3.jpg',
    nameCn: '花间集',
    nameEn: 'Flora Collection',
    descCn: '一瓶一花，居室即园林',
    descEn: 'One vase, one bloom — your room becomes a garden',
    price: '¥150 - ¥520',
  },
  {
    image: '/images/seasonal-4.jpg',
    nameCn: '香道静思',
    nameEn: 'Incense Meditation',
    descCn: '一缕清香，半日闲暇',
    descEn: 'A wisp of fragrance, an afternoon of leisure',
    price: '¥90 - ¥320',
  },
];

export default function SeasonalGallery() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const items = track.querySelectorAll('.gallery-item');
    const totalWidth = Array.from(items).reduce((acc, item) => {
      return acc + (item as HTMLElement).offsetWidth + 64;
    }, 0) - section.offsetWidth;

    if (totalWidth <= 0) return;

    let cleanup: (() => void) | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const tween = gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => '+=' + totalWidth,
            invalidateOnRefresh: true,
          },
        });

        cleanup = () => {
          tween.kill();
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger === section) st.kill();
          });
        };
      }
    );

    return () => cleanup?.();
  }, []);

  return (
    <section id="seasonal" className="gallery-section" ref={sectionRef}>
      <div className="absolute top-8 left-6 md:left-12 z-10">
        <span
          className="text-[10px] tracking-[0.3em] uppercase block mb-2"
          style={{ color: '#8B7355' }}
        >
          {t('当季精选', 'Seasonal Collection')}
        </span>
        <h2
          className="text-2xl md:text-3xl"
          style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
        >
          {t('春日茶席', 'Spring Tea Table')}
        </h2>
      </div>

      <div className="gallery-track" ref={trackRef}>
        {seasonalItems.map((item, i) => (
          <div key={i} className="gallery-item">
            <Image
              src={item.image}
              alt={lang === 'zh' ? item.nameCn : item.nameEn}
              fill
              sizes="65vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(44,24,16,0.6) 0%, transparent 50%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3
                className="text-xl md:text-2xl mb-2 lang-transition"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#FAF5EB' }}
              >
                {lang === 'zh' ? item.nameCn : item.nameEn}
              </h3>
              <p
                className="text-sm opacity-80 mb-3 lang-transition"
                style={{ color: '#FAF5EB' }}
              >
                {lang === 'zh' ? item.descCn : item.descEn}
              </p>
              <span
                className="font-display italic text-lg"
                style={{ color: '#D4A574' }}
              >
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
