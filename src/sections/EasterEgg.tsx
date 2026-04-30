import { useEffect, useRef, useState } from 'react';

interface RainDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  height: number;
}

const seededValue = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const drops: RainDrop[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: seededValue(i + 1) * 100,
  delay: seededValue(i + 31) * 3,
  duration: 1.5 + seededValue(i + 61) * 2,
  opacity: 0.2 + seededValue(i + 91) * 0.3,
  height: 15 + seededValue(i + 121) * 25,
}));

export default function EasterEgg() {
  const [rainActive, setRainActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setRainActive(true);
              setTimeout(() => setRainActive(false), 8000);
            }, 5000);
          } else {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(footer);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!rainActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-[1px] rounded-full"
          style={{
            left: `${drop.left}%`,
            top: '-20px',
            height: `${drop.height}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(160,82,45,0.4))',
            opacity: drop.opacity,
            animation: `rain-drop ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(160,82,45,0.05), transparent)',
        }}
      />
    </div>
  );
}
