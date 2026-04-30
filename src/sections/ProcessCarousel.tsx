import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { processSteps } from '@/data/products';

export default function ProcessCarousel() {
  const { lang } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rows = wrapper.querySelectorAll<HTMLElement>('.carousel-row');
    const baseVelocity = 50;
    let cleanup: (() => void) | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const tweens = Array.from(rows).map((row) => {
          const direction = row.dataset.direction === 'right' ? 1 : -1;
          const totalWidth = row.scrollWidth / 2;

          return gsap.to(row, {
            x: direction * totalWidth,
            duration: totalWidth / baseVelocity,
            ease: 'none',
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize((x) => {
                const v = parseFloat(x);
                return ((v % totalWidth) + totalWidth) % totalWidth * (direction < 0 && v < 0 ? -1 : 1);
              }),
            },
          });
        });

        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => tweens.forEach(t => t.play()),
          onLeave: () => tweens.forEach(t => t.pause()),
          onEnterBack: () => tweens.forEach(t => t.play()),
          onLeaveBack: () => tweens.forEach(t => t.pause()),
        });

        cleanup = () => {
          tweens.forEach(t => t.kill());
          st.kill();
        };
      }
    );

    return () => cleanup?.();
  }, []);

  const steps = [...processSteps, ...processSteps];

  return (
    <section id="process" className="py-20 md:py-32" style={{ background: '#FAF5EB' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#8B7355' }}>
          {lang === 'zh' ? '制作过程' : 'The Process'}
        </span>
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontFamily: "'Noto Serif SC', serif", color: '#2C1810' }}
        >
          {lang === 'zh' ? '从泥土到器物' : 'From Earth to Object'}
        </h2>
      </div>

      <div ref={wrapperRef} className="carousel-wrapper">
        <div className="carousel-row" data-direction="left">
          {steps.map((step, i) => (
            <div key={`left-${i}`} className="carousel-card">
              <Image
                src={step.image}
                alt={lang === 'zh' ? step.titleCn : step.titleEn}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.7) 0%, transparent 50%)' }}
              />
              <span className="carousel-number">{step.number}</span>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-xl mb-1 lang-transition"
                  style={{ fontFamily: "'Noto Serif SC', serif", color: '#FAF5EB' }}
                >
                  {lang === 'zh' ? step.titleCn : step.titleEn}
                </h3>
                <p className="text-xs opacity-80 leading-relaxed lang-transition" style={{ color: '#FAF5EB' }}>
                  {lang === 'zh' ? step.descCn : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
