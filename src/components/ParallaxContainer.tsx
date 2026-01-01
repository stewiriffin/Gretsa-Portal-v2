import { useRef, useEffect, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxContainer = ({ children, speed = 0.5, className = '' }: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const offset = containerRef.current.offsetTop;
      const distance = scrollY - offset;

      containerRef.current.style.transform = `translateY(${distance * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
};

interface ParallaxLayersProps {
  children: ReactNode;
}

export const ParallaxLayers = ({ children }: ParallaxLayersProps) => {
  return <div className="relative">{children}</div>;
};
