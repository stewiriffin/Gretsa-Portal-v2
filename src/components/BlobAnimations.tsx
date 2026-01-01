import { motion } from 'framer-motion';

export const BlobAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Red Blob */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-kenya-red/30 dark:bg-kenya-red/40 blob blob-glow"
      />

      {/* Pink Blob */}
      <motion.div
        animate={{
          x: [0, -80, 100, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-kenya-pink/30 dark:bg-kenya-pink/40 blob blob-glow"
      />

      {/* Green Blob */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/2 left-1/4 w-80 h-80 bg-kenya-green/30 dark:bg-kenya-green/40 blob blob-glow"
      />

      {/* Blue Blob */}
      <motion.div
        animate={{
          x: [0, -70, 70, 0],
          y: [0, 70, -70, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'easeInOut',
          delay: 6,
        }}
        className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/30 dark:bg-blue-500/40 blob blob-glow"
      />
    </div>
  );
};
