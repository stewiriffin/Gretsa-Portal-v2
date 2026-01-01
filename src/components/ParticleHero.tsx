import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';
import { Sparkles, TrendingUp } from 'lucide-react';

export const ParticleHero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl shadow-2xl"
      style={{ minHeight: '400px' }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ['#B91C1C', '#E91E63', '#15803D'],
            },
            links: {
              color: '#E91E63',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: ['circle', 'triangle'],
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-kenya-red via-kenya-pink to-kenya-green opacity-90" />

      {/* Tribal Pattern Overlay */}
      <div className="tribal-pattern absolute inset-0" />

      {/* Decorative Corner Squares */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="absolute top-0 left-0 w-16 h-16 bg-white/20 border-4 border-white rounded-br-3xl"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="absolute top-0 right-0 w-16 h-16 bg-white/20 border-4 border-white rounded-bl-3xl"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 border-4 border-white rounded-tr-3xl"
      />
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute bottom-0 right-0 w-16 h-16 bg-white/20 border-4 border-white rounded-tl-3xl"
      />

      {/* Content */}
      <div className="relative z-10 text-white p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              >
                <Sparkles size={24} />
              </motion.div>
              <span className="text-white/90 font-medium">Welcome back!</span>
            </motion.div>

            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold mb-3"
            >
              Ready to Excel Today?
            </motion.h1>

            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg max-w-2xl"
            >
              You have 3 assignments due this week and 2 upcoming exams. Let's make it count!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-kenya-red font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                View Schedule
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white hover:bg-white/30 transition-all"
              >
                Check Grades
              </motion.button>
            </motion.div>
          </div>

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 min-w-[280px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-white/70 text-sm">Current GPA</p>
                <p className="text-3xl font-bold">3.85</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Semester Progress</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear', delay: 1 }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
};
