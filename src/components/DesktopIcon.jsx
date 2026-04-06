import React from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from './WindowManagerContext';

const DesktopIcon = ({ appId, title, icon: Icon, delay = 0 }) => {
    const { openApp } = useWindowManager();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            drag
            dragConstraints={{ left: -50, right: window.innerWidth - 100, top: -50, bottom: window.innerHeight - 100 }}
            dragElastic={0.05}
            dragMomentum={false}
            whileDrag={{ 
                scale: 1.1, 
                zIndex: 100, 
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                opacity: 0.7
            }}
            onDoubleClick={() => openApp(appId)}
            className="flex flex-col items-center gap-2 w-24 p-4 rounded-xl transition-all select-none active:cursor-grabbing cursor-grab relative group z-10"
        >
            {/* Selection/Hover Halo for Glass feel */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 group-hover:border group-hover:border-white/10 rounded-xl transition-all duration-300 -z-10" />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden backdrop-blur-3xl border border-white/10 ${
                title === 'This PC' 
                ? 'bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                : 'bg-white/5'
            } group-hover:bg-white/15 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <Icon size={30} className={title === 'This PC' ? "text-blue-400" : "text-white/80"} strokeWidth={1.5} />
            </div>
            
            <span className="text-[10px] font-black tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase w-full px-1 text-center line-clamp-2 h-8 flex items-center justify-center leading-none transition-all group-hover:text-cyan-300">
                {title}
            </span>
        </motion.button>
    );
};

export default DesktopIcon;
