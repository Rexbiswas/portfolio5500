import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Wifi, Battery, RotateCw, Settings } from 'lucide-react';
import dayjs from 'dayjs';
import { useWindowManager } from './WindowManagerContext';

const LockScreen = () => {
    const { unlockSystem, isLoginInProgress } = useWindowManager();
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [view, setView] = useState('lock'); // 'lock' | 'login'
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleUnlock = () => {
        if (view === 'lock') setView('login');
    };

    const profileImage = "https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1776902400&v=beta&t=haMQkDgDqKgyYz0Sw7n2My3VyGo5V5WquDXHhzqRF_8";

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[1000000] overflow-hidden select-none bg-black"
            onClick={handleUnlock}
        >
            {/* Background Wallpaper with extra blur for login */}
            <motion.div 
                animate={{ scale: view === 'login' ? 1.1 : 1.05, filter: view === 'login' ? 'blur(30px) brightness(0.6)' : 'blur(0px) brightness(0.8)' }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-cover bg-center bg-[#004275]"
                style={{ 
                    backgroundImage: `url('/wallpapers/bloom-light.jpg'), linear-gradient(135deg, #001f3f 0%, #0074d9 100%)`, 
                    backgroundAttachment: 'fixed' 
                }}
            />

            <AnimatePresence mode="wait">
                {view === 'lock' ? (
                    <motion.div 
                        key="lock-view"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-full flex flex-col items-center justify-start pt-[15vh] px-10 text-white"
                    >
                        <motion.div 
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <h1 className="text-[120px] font-black leading-none tracking-tighter drop-shadow-2xl">
                                {currentTime.format('HH:mm')}
                            </h1>
                            <p className="text-[28px] font-bold tracking-wide drop-shadow-lg opacity-90">
                                {currentTime.format('dddd, D MMMM')}
                            </p>
                        </motion.div>
                        
                        <div className="mt-auto pb-20 flex flex-col items-center gap-3 animate-pulse opacity-50">
                             <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center">
                                <Lock size={18} />
                             </div>
                             <span className="text-[10px] uppercase font-black tracking-[0.2em]">Click to unlock</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="login-view"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="relative h-full flex flex-col items-center justify-center text-white"
                    >
                        <div className="flex flex-col items-center gap-8 w-[320px]">
                            {/* Profile Card */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full glass-win11-mica flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-2xl">
                                     <img src={profileImage} alt="Rishi Biswas" className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight drop-shadow-md">Rishi Biswas</h2>
                            </div>

                            {/* Sign In Button / PIN */}
                            <div className="w-full flex flex-col gap-3">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); unlockSystem(); }}
                                    disabled={isLoginInProgress}
                                    className="w-full h-10 glass-win11-mica hover:bg-white/10 rounded-md border border-white/15 text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                                >
                                    {isLoginInProgress ? (
                                        <RotateCw size={14} className="animate-spin" />
                                    ) : (
                                        <>Sign in <Lock size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" /></>
                                    )}
                                </button>
                                <span className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest cursor-pointer hover:text-white mt-4">Sign-in options</span>
                            </div>
                        </div>

                        {/* System Tray Sync info */}
                        <div className="absolute bottom-10 right-10 flex items-center gap-6 opacity-60">
                             <Wifi size={18} />
                             <Battery size={18} />
                             <Settings size={18} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LockScreen;
