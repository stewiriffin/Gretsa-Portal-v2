import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';
import { Sparkles, TrendingUp } from 'lucide-react';

export const EnhancedParticleHero = () => {
  const [burstParticles, setBurstParticles] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setBurstParticles(true);
    setTimeout(() => setBurstParticles(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
      className="relative overflow-hidden rounded-3xl shadow-3d-strong cursor-pointer"
      style={{ minHeight: '400px' }}
    >
      {/* Particle Background with Enhanced Interactivity */}
      <Particles
        id="enhanced-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: 'transparent' },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: burstParticles ? 'repulse' : 'push',
              },
              onHover: {
                enable: true,
                mode: 'grab',
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10,
                },
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              push: {
                quantity: 10,
              },
              repulse: {
                distance: 300,
                duration: 0.4,
                speed: 3,
              },
              grab: {
                distance: 200,
                links: {
                  opacity: 0.8,
                  color: '#E91E63',
                },
              },
            },
          },
          particles: {
            color: {
              value: ['#B91C1C', '#E91E63', '#15803D', '#3B82F6'],
            },
            links: {
              color: '#E91E63',
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 2,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 3,
              straight: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
              },
              value: 100,
            },
            opacity: {
              value: { min: 0.3, max: 0.7 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            shape: {
              type: ['circle', 'triangle', 'square'],
            },
            size: {
              value: { min: 2, max: 6 },
              animation: {
                enable: true,
                speed: 3,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient opacity-70" />

      {/* Tribal Pattern Overlay */}
      <div className="absolute inset-0 tribal-maasai opacity-20" />

      {/* Decorative Corner Squares with Glassmorphism */}
      {[
        { position: 'top-0 left-0', rotation: '-45deg', delay: 0.2 },
        { position: 'top-0 right-0', rotation: '45deg', delay: 0.3 },
        { position: 'bottom-0 left-0', rotation: '45deg', delay: 0.4 },
        { position: 'bottom-0 right-0', rotation: '-45deg', delay: 0.5 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: corner.rotation }}
          animate={{ scale: 1, rotate: '0deg' }}
          transition={{ delay: corner.delay, type: 'spring', stiffness: 200 }}
          className={`absolute ${corner.position} w-20 h-20 glass-card-strong backdrop-blur-xl`}
          style={{
            borderRadius: i % 2 === 0 ? '0 0 50% 0' : '0 0 0 50%',
          }}
        />
      ))}

      {/* Content with Glassmorphism */}
      <div className="relative z-10 text-white p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="glow-pink"
              >
                <Sparkles size={24} />
              </motion.div>
              <span className="font-medium text-white">Welcome back!</span>
            </motion.div>

            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg"
            >
              Ready to Excel Today?
            </motion.h1>

            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg max-w-2xl glass-card px-6 py-4 rounded-2xl backdrop-blur-xl"
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
                className="glass-card-strong px-6 py-3 bg-white/20 text-white font-semibold rounded-xl shadow-3d backdrop-blur-xl glow-pink gradient-border-animated"
              >
                View Schedule
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card-strong px-6 py-3 text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/60 backdrop-blur-xl shadow-3d transition-all"
              >
                Check Grades
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/60 text-sm mt-4 italic"
            >
              💡 Click anywhere for a particle burst effect
            </motion.p>
          </div>

          {/* Achievement Card with Glassmorphism */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, rotate: 2, y: -10 }}
            className="glass-card-strong backdrop-blur-2xl rounded-2xl p-6 border border-white/30 min-w-[280px] shadow-3d-strong glow-pink"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-4 glass-card rounded-xl glow-green backdrop-blur-xl"
              >
                <TrendingUp size={32} className="text-white" />
              </motion.div>
              <div>
                <p className="text-white/70 text-sm">Current GPA</p>
                <p className="text-4xl font-bold drop-shadow-lg">3.85</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Semester Progress</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-gradient-to-r from-kenya-green to-emerald-400 rounded-full shadow-3d glow-green relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating particles indicator */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 flex items-center gap-2 text-xs text-white/60"
            >
              <div className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
              <span>Live tracking</span>
            </motion.div>
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

      {/* Burst Effect Overlay */}
      {burstParticles && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-radial from-white/50 to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
};
