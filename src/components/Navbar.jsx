import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-[100] px-10 py-10 flex items-center justify-between pointer-events-none"
        >
            {/* Left: Branding - Lando Norris Style (Stacked) */}
            <div className="flex flex-col pointer-events-auto cursor-pointer select-none leading-[0.8] group">
                <span className="text-[24px] font-serif font-medium tracking-tight text-black italic uppercase">RISHI</span>
                <span className="text-[32px] font-[1000] tracking-tighter text-black uppercase">BISWAS</span>
            </div>

            {/* Right Group: Action Bar */}
            <div className="flex items-center gap-3 pointer-events-auto">
                {/* primary Action: MENU (Staggered Character Roller) */}
                <motion.div 
                    whileHover="hover"
                    initial="initial"
                    className="h-[52px] px-8 bg-[#66ad69] rounded-[12px] flex items-center justify-center cursor-pointer group active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(102,173,105,0.2)] hover:shadow-[0_6px_25px_rgba(102,173,105,0.3)] overflow-hidden relative"
                >
                    <div className="flex items-center justify-center overflow-hidden pointer-events-none">
                        {"MENU".split("").map((char, index) => (
                            <div key={index} className="relative h-[20px] overflow-hidden">
                                <motion.div 
                                    variants={{
                                        initial: { y: 0 },
                                        hover: { y: -20 }
                                    }}
                                    transition={{ 
                                        duration: 0.5, 
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: index * 0.03
                                    }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <span className="h-[20px] text-[14px] font-black tracking-[0.1em] text-white uppercase flex items-center justify-center">{char}</span>
                                    <span className="h-[20px] text-[14px] font-black tracking-[0.1em] text-white uppercase flex items-center justify-center">{char}</span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
