import React, { useState, useEffect } from 'react';
import { motion, useSpring, animate } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const progressValue = useSpring(0, {
        stiffness: 25,
        damping: 15,
    });

    useEffect(() => {
        const controls = animate(progressValue, 100, {
            duration: 3.5,
            ease: [0.65, 0, 0.35, 1],
            onComplete: () => {
                onComplete();
            }
        });
        return () => controls.stop();
    }, [progressValue, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                transition: { duration: 0.6, delay: 0.1 } 
            }}
            className="fixed inset-0 z-[1000] bg-[#66ad69] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Bold Minimalist Logo Centerpiece */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                    scale: 50, // Massive clean zoom
                    opacity: 0,
                    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                }}
            >
                <svg width="240" height="140" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    {/* Bold "R" */}
                    <motion.path 
                        d="M30 130V10H80C105 10 120 25 120 45C120 65 105 80 80 80H30M75 80L120 130" 
                        stroke="#ffffff" 
                        strokeWidth="24" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                    {/* Bold "B" */}
                    <motion.path 
                        d="M150 130V10H200C220 10 230 25 230 40C230 55 220 60 200 60H150M150 60H210C230 60 240 75 240 95C240 115 230 130 210 130H150" 
                        stroke="#ffffff" 
                        strokeWidth="24" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>

            {/* Bottom Footer Text */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-16 text-center"
            >
                <span className="text-[12px] font-[1000] uppercase tracking-[0.4em] text-white/90">
                    RISHI BISWAS
                </span>
            </motion.div>

            {/* Subtle Grain Polish */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grain-y.com/assets/grain.png')]" />
        </motion.div>
    );
};

export default Loader;
