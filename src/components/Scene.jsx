import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from './WindowManagerContext';

const Scene = () => {
    const { wallpaper, wallpaperType, customWallpaper } = useWindowManager();

    const getBackgroundComponent = () => {
        if (wallpaperType === 'custom' && customWallpaper) {
            return (
                <motion.div 
                    key="custom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-black"
                >
                     <img 
                        src={customWallpaper} 
                        className="w-full h-full object-cover fixed top-0 left-0" 
                        alt="Background"
                        onError={(e) => { e.target.style.display = 'none'; }} 
                     />
                     <div className="absolute inset-0 bg-black/10" />
                </motion.div>
            );
        }

        if (wallpaperType === 'color') {
            return (
                <motion.div 
                    key={`color-${wallpaper}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                    style={{ backgroundColor: wallpaper || '#000000' }} 
                />
            );
        }

        switch(wallpaper) {
            case 'aurora':
                return (
                    <motion.div 
                        key="aurora"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-slate-900 overflow-hidden"
                    >
                        <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,#10b981_0%,transparent_50%)] blur-[120px] opacity-20 animate-pulse" />
                        <div className="absolute bottom-[-30%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,#3b82f6_0%,transparent_60%)] blur-[100px] opacity-30" />
                    </motion.div>
                );
            case 'minimal':
                return (
                    <motion.div 
                        key="minimal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-[#0f172a]" 
                    />
                );
            default: // Bloom
                return (
                    <motion.div 
                        key="bloom"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-[#3b82f6] dark:bg-[#1a365d]" />
                        <div className="absolute inset-0 opacity-60 mix-blend-screen">
                            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,#60a5fa_0%,transparent_60%)] blur-[100px]" />
                            <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,#3b82f6_0%,transparent_50%)] blur-[120px]" />
                            <div className="absolute top-[20%] right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,#8b5cf6_0%,transparent_40%)] blur-[80px]" />
                        </div>
                    </motion.div>
                )
        }
    }

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden select-none pointer-events-none transition-all duration-700">
            <AnimatePresence mode="wait">
                {getBackgroundComponent()}
            </AnimatePresence>
            
            {/* Fine grain overlay for premium glass look */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        </div>
    );
};

export default Scene;
