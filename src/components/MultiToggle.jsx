import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, ArrowUp } from 'lucide-react';
import { useTheme } from './ThemeContext';

const MultiToggle = () => {
    const { theme, toggleTheme } = useTheme();
    
    // Theme Icon Selection
    const getIcon = () => {
        if (theme === 'light') return <Sun size={20} />;
        if (theme === 'dark') return <Moon size={20} />;
        return <Zap size={20} />; // Pure black mode uses Zap
    };

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
            {/* Theme Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent shadow-lg border border-white/10 hover:border-accent/40 transition-all duration-300 relative group overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {getIcon()}
                    </motion.div>
                </AnimatePresence>
                
                {/* Tooltip */}
                <div className="absolute right-14 bg-bg-secondary text-text-primary px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/5 pointer-events-none capitalize">
                    {theme} mode
                </div>
            </motion.button>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 shadow-lg transition-all"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MultiToggle;
