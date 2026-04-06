import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, RefreshCcw, Minus, Square, X } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';

const TerminalHero = () => {
    const { minimizeApp, closeApp } = useWindowManager();
    const roles = ["Full Stack Developer", "Creative Engineer", "UI/UX Designer", "Three.js Enthusiast"];
    const [currentRole, setCurrentRole] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    
    const [isVisible, setIsVisible] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentFullRole = roles[roleIndex % roles.length];
            
            if (isDeleting) {
                setCurrentRole(prev => prev.substring(0, prev.length - 1));
                setTypingSpeed(40);
            } else {
                setCurrentRole(prev => currentFullRole.substring(0, prev.length + 1));
                setTypingSpeed(100);
            }

            if (!isDeleting && currentRole === currentFullRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentRole === "") {
                setIsDeleting(false);
                setRoleIndex(prev => prev + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentRole, isDeleting, roleIndex, typingSpeed]);

    const WindowsMaximizeIcon = () => (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" strokeWidth="1" />
        </svg>
    );

    // Synchronize local visibility with System Minimization
    const handleMinimize = () => {
        // If this is running inside the 'home' app window, minimize the whole window too
        minimizeApp('home');
        setIsVisible(false);
    };

    const handleClose = () => {
        closeApp('home');
        setIsVisible(false);
    };

    return (
        <section className="relative min-h-[500px] h-full flex items-center justify-center py-10 px-4 overflow-hidden bg-transparent">
            {/* Windows 11 Desktop Background Simulation Layer */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-color)_0%,transparent_70%)] blur-3xl opacity-20" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full z-10 transition-all duration-700 ease-in-out ${isMaximized ? 'max-w-6xl' : 'max-w-4xl'}`}
            >
                <AnimatePresence mode="wait">
                    {isVisible ? (
                        <motion.div 
                            key="window-main"
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 100, filter: 'blur(20px)' }}
                            className="glass-win11-mica rounded-lg overflow-hidden shadow-[0_45px_110px_-30px_rgba(0,0,0,0.6)] border border-white/20"
                        >
                            {/* Windows 11 Style Header */}
                            <div className="bg-white/5 backdrop-blur-3xl px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 flex items-center justify-center bg-blue-500/20 rounded shadow-inner border border-white/10">
                                        <Terminal size={14} className="text-blue-400" />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-tight text-white/70 uppercase">Code - developer.config.js</span>
                                </div>
                                
                                <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={handleMinimize}
                                        className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 active:scale-90"
                                        title="Minimize"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <button 
                                        onClick={() => setIsMaximized(!isMaximized)}
                                        className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 active:scale-90"
                                        title="Maximize"
                                    >
                                        <WindowsMaximizeIcon />
                                    </button>
                                    <button 
                                        onClick={handleClose}
                                        className="w-10 h-8 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-white/60 active:scale-90 group"
                                        title="Close"
                                    >
                                        <X size={16} className="group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Window Content */}
                            <div className={`p-8 md:p-12 font-mono text-base md:text-xl leading-relaxed antialiased transition-all overflow-hidden ${isMaximized ? 'h-[600px]' : 'h-[auto]'}`}>
                                <div className="space-y-1.5">
                                    <p>
                                        <span className="text-syntax-purple italic">const</span>{' '}
                                        <span className="text-syntax-yellow font-bold">Rishi_Biswas</span>{' '}
                                        <span className="text-white/60">=</span>{' '}
                                        <span className="text-syntax-blue">{'{'}</span>
                                    </p>
                                    
                                    <div className="pl-6 md:pl-12 space-y-1.5 border-l-2 border-white/10 ml-2 py-3">
                                        <p>
                                            <span className="text-white/40 font-mono italic">// Current Designation</span>
                                        </p>
                                        <p>
                                            <span className="text-white/80">status:</span>{' '}
                                            <span className="text-syntax-green">'</span>
                                            <span className="text-accent font-black drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                                                {currentRole}
                                                <span className="inline-block w-3 h-6 bg-accent ml-1 -mb-1 animate-pulse" />
                                            </span>
                                            <span className="text-syntax-green">'</span>,
                                        </p>
                                        <p>
                                            <span className="text-white/80">location:</span>{' '}
                                            <span className="text-syntax-green">'India, West Bengal'</span>,
                                        </p>
                                        <p>
                                            <span className="text-white/80">ready_to_work:</span>{' '}
                                            <span className="text-syntax-red font-bold underline decoration-syntax-red/30 underline-offset-4">true</span>,
                                        </p>
                                        <p>
                                            <span className="text-white/80">skillset:</span>{' '}
                                            <span className="text-syntax-blue">[</span>
                                            <span className="text-syntax-green">'MERN'</span>,{' '}
                                            <span className="text-syntax-green">'Next.js'</span>,{' '}
                                            <span className="text-syntax-green">'Three.js'</span>
                                            <span className="text-syntax-blue">]</span>
                                        </p>
                                    </div>

                                    <p><span className="text-syntax-blue font-bold">{'}'}</span></p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button 
                            key="window-restore"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(56,189,248,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsVisible(true)}
                            className="bg-accent/10 hover:bg-accent/20 backdrop-blur-2xl border border-accent/20 px-10 py-5 rounded-2xl flex items-center gap-4 mx-auto shadow-2xl transition-all group"
                        >
                             <div className="p-3 bg-accent rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                                <Terminal size={24} className="text-white" />
                             </div>
                             <div className="flex flex-col items-start">
                                <span className="text-xs font-black uppercase tracking-widest text-accent">Terminal Offline</span>
                                <span className="text-[10px] font-bold text-white/40">Click to reactivate profile shell</span>
                             </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Windows 11 Styled CTA Area */}
                <motion.div 
                    initial={{ opacity: 1, y: 0 }}
                    className={`text-center space-y-8 transition-all duration-700 ${isVisible && !isMaximized ? 'mt-10' : 'mt-10'}`}
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                        Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent drop-shadow-sm">Digital Mastery</span>
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-5">
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsVisible(true)}
                            className="px-12 py-4 rounded-[6px] bg-accent text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_15px_30px_rgba(56,189,248,0.4)] border border-white/20 transition-all hover:brightness-110 active:brightness-90"
                        >
                            Open Portfolio
                        </motion.button>
                        
                        {!isVisible && (
                             <motion.button 
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsVisible(true)}
                                className="px-12 py-4 rounded-[6px] glass-win11-mica border border-white/10 font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all text-white/50 hover:text-white"
                            >
                                <RefreshCcw size={12} className="inline mr-2 animate-spin-slow" />
                                Reboot System
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TerminalHero;
