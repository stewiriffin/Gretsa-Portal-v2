import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, .magnetic');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 w-3 h-3 bg-kenya-pink rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Trailing cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-kenya-pink/50 rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
};
