"use client";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faCalendarAlt, faStar, faArrowRight, faFutbol, faVolleyballBall, faBasketballBall, faRunning, faTableTennisPaddleBall, faBaseballBall, faHockeyPuck, faDumbbell, faMedal } from '@fortawesome/free-solid-svg-icons';
import Layout from './components/Layout';

const WelcomePage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGuestLogin = () => {
    localStorage.setItem('loggedInUser', JSON.stringify({
      username: 'guest',
      role: 'guest'
    }));
    router.push('/sportTab');
  };

  const features = [
    { icon: faTrophy, text: "Track Live Scores", description: "Real-time updates and match statistics" },
    { icon: faCalendarAlt, text: "Schedule Updates", description: "Stay informed with upcoming matches" }
  ];

  const floatingIcons = [
    { icon: faFutbol, delay: 0, duration: 6, size: 'text-4xl', position: 'top-1/4 left-1/4' },
    { icon: faVolleyballBall, delay: 1, duration: 7, size: 'text-3xl', position: 'top-1/3 right-1/4' },
    { icon: faBasketballBall, delay: 2, duration: 8, size: 'text-5xl', position: 'bottom-1/4 left-1/3' },
    { icon: faRunning, delay: 3, duration: 9, size: 'text-4xl', position: 'bottom-1/3 right-1/3' },
    { icon: faTableTennisPaddleBall, delay: 4, duration: 5, size: 'text-3xl', position: 'top-1/2 left-1/2' },
  ];

  const sideIcons = [
    { icon: faBaseballBall, position: 'left-1/3 top-1/4', delay: 0, duration: 7 },
    { icon: faHockeyPuck, position: 'right-1/4 top-1/3', delay: 1, duration: 8 },
    { icon: faDumbbell, position: 'left-1/4 bottom-1/3', delay: 2, duration: 6 },
    { icon: faMedal, position: 'right-1/3 bottom-1/4', delay: 3, duration: 9 },
  ];

  return (
    <Layout>
      <div className="hero-section text-center relative overflow-hidden -mt-24">
        {/* Side floating sport icons */}
        {sideIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-white/15`}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0.15, 0.3, 0.15],
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon icon={item.icon} className="text-4xl" />
          </motion.div>
        ))}

        {/* Left side animation */}
        <motion.div
          className="absolute left-0 top-1/4 w-32 h-32"
          initial={{ opacity: 0, x: -100 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full border-4 border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/20 rounded-full" />
        </motion.div>

        {/* Right side animation */}
        <motion.div
          className="absolute right-0 top-1/3 w-32 h-32"
          initial={{ opacity: 0, x: 100 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            x: [0, -20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full border-4 border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/20 rounded-full" />
        </motion.div>

        {/* Bottom left animation */}
        <motion.div
          className="absolute left-0 bottom-1/4 w-24 h-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full border-4 border-white/20 transform rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/20 transform rotate-45" />
        </motion.div>

        {/* Bottom right animation */}
        <motion.div
          className="absolute right-0 bottom-1/3 w-24 h-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full border-4 border-white/20 transform -rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/20 transform -rotate-45" />
        </motion.div>

        <div className="container position-relative pt-0 mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="relative p-2 rounded-3xl text-center max-w-4xl w-full mx-4 mt-0"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="mb-2"
            >
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-7xl font-extrabold mb-2 text-white drop-shadow-lg mt-0"
              >
                Welcome to CST Sports
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-xl text-white font-light italic drop-shadow mb-2"
              >
                Your Gateway to Campus Sports
              </motion.p>

              <div className="space-y-4 mb-4">
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredButton('guest')}
                  onHoverEnd={() => setHoveredButton(null)}
                  onClick={handleGuestLogin}
                  className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-pink-400/30 group"
                >
                  <span className="flex items-center justify-center text-lg font-semibold">
                    <FontAwesomeIcon icon={faUsers} className="mr-3 group-hover:rotate-12 transition-transform" />
                    View Fixtures
                    <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
                <motion.button
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredButton('admin')}
                  onHoverEnd={() => setHoveredButton(null)}
                  onClick={() => router.push('/login')}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-violet-400/30 group"
                >
                  <span className="flex items-center justify-center text-lg font-semibold">
                    <FontAwesomeIcon icon={faTrophy} className="mr-3 group-hover:rotate-12 transition-transform" />
                    Admin Login
                    <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </div>

              {/* Enhanced feature highlights */}
              <div className="grid grid-cols-2 gap-0 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                    className="p-4 rounded-none border border-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={feature.icon} className="text-3xl text-white mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.text}</h3>
                    <p className="text-sm text-white/90">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-white/90 text-sm font-light"
            >
              © 2024 CST Sports Management System
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
