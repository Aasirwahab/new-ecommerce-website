import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';

export default function Hero() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );
    }
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      );
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ background: '#2C1810' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.85 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(44,24,16,0.5) 0%, rgba(44,24,16,0.15) 40%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12">
        <div ref={titleRef} className="max-w-[1440px] mx-auto w-full">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide mb-3"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              color: '#FAF5EB',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {t('窑火生活', 'Kilnfolk')}
          </h1>
          <p
            className="font-display italic text-lg md:text-2xl tracking-wide mb-6"
            style={{ color: '#D4A574', textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            {t('手作器物，日常之美', 'Handcrafted objects for everyday beauty')}
          </p>
          <p
            className="text-sm md:text-base tracking-widest opacity-70 max-w-md"
            style={{ color: '#FAF5EB' }}
          >
            {t(
              '每一件器物，都是时间与泥土的对话。在窑火中诞生的不只是容器，更是生活的温度。',
              'Each piece is a dialogue between time and earth. Born in fire, they carry the warmth of living.'
            )}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-50" style={{ color: '#FAF5EB' }}>
          {t('向下滚动', 'Scroll')}
        </span>
        <div
          className="w-[1px] h-8 rounded-full"
          style={{
            background: '#D4A574',
            animation: 'pulse-scroll 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
