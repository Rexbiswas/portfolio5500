import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, User, Folder, Zap, Mail, ArrowLeft, Menu, Settings, X } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';
import { useTheme } from './ThemeContext';

// App content
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import Resume from '../pages/Resume';

const MobileShell = () => {
    const { openApp, activeApp, closeApp } = useWindowManager();
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const apps = [
        { id: 'about', name: 'About.exe', icon: User, color: 'text-blue-400' },
        { id: 'projects', name: 'Projects.exe', icon: Folder, color: 'text-orange-400' },
        { id: 'skills', name: 'Skills.exe', icon: Zap, color: 'text-yellow-400' },
        { id: 'contact', name: 'Contact.exe', icon: Mail, color: 'text-green-400' },
    ];

    const currentAppContent = {
        about: <About />,
        projects: <Projects />,
        skills: <Skills />,
        contact: <Contact />,
        resume: <Resume />
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-primary overflow-hidden">
            
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 glass z-[200] border-b border-white/5 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-accent border border-white/10">
                        <span className="font-black text-sm">R</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Rishi<span className="text-accent underline underline-offset-4 decoration-2">.</span></span>
                </div>
                <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 glass border border-white/10 rounded-full text-accent shadow-sm">
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Main Content Area / App Grid */}
            <main className="flex-1 pt-20 px-6 pb-24 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                    {apps.map((app, idx) => (
                        <motion.button
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openApp(app.id)}
                            className="glass-card aspect-square rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center gap-4 group active:bg-white/5 active:border-accent/40"
                        >
                            <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${app.color} shadow-lg transition-transform group-active:scale-110 shadow-black/20`}>
                                <app.icon size={30} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-text-primary/80">{app.name}</span>
                        </motion.button>
                    ))}
                    
                    {/* Resume Special Card (Wide) */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openApp('resume')}
                        className="col-span-2 glass-card rounded-3xl border border-white/10 p-8 flex items-center justify-between group active:bg-accent/10"
                    >
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-accent border border-white/10 shadow-lg">
                                <Layout size={24} />
                            </div>
                            <div className="flex flex-col items-start translate-y-0.5">
                                <span className="text-sm font-bold uppercase tracking-tight text-text-primary">Resume.exe</span>
                                <span className="text-[10px] font-mono text-text-secondary uppercase">View Curriculum Vitae</span>
                            </div>
                         </div>
                         <ArrowLeft className="rotate-180 text-accent group-active:translate-x-2 transition-transform" size={20} />
                    </motion.button>
                </div>
            </main>

            {/* App Overlay System (Window alternatives) */}
            <AnimatePresence>
                {activeApp && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className="fixed inset-0 z-[500] bg-bg-primary pt-20 flex flex-col"
                    >
                        {/* Internal Header */}
                        <div className="fixed top-0 left-0 right-0 h-16 glass z-[600] border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-3xl">
                             <button onClick={() => closeApp(activeApp)} className="flex items-center gap-2 text-accent group">
                                <ArrowLeft size={20} className="group-active:-translate-x-1 transition-transform" />
                                <span className="text-sm font-bold uppercase tracking-wider">Back to OS</span>
                             </button>
                             <div className="flex flex-col items-end">
                                <span className="text-xs font-black text-text-primary/95 uppercase">{activeApp}.exe</span>
                                <span className="text-[8px] font-mono text-accent uppercase">Administrator</span>
                             </div>
                        </div>

                        {/* App Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-10 custom-scrollbar overscroll-contain">
                             <div className="max-w-2xl mx-auto">
                                {currentAppContent[activeApp]}
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-md flex items-end"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: 200 }}
                            animate={{ y: 0 }}
                            exit={{ y: 200 }}
                            className="w-full glass rounded-t-[40px] p-10 border-t border-white/10 flex flex-col gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-accent">
                                    <User size={30} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black tracking-tight text-text-primary">Rishi Biswas</span>
                                    <span className="text-xs font-mono text-text-secondary uppercase">Master Switch</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h4 className="text-[10px] font-black uppercase text-accent tracking-[5px] mb-2 px-2">Theme Control</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {['dark', 'light', 'pure-black'].map((t) => (
                                        <button 
                                            key={t}
                                            onClick={() => setTheme(t)}
                                            className={`py-3 rounded-2xl glass-card text-[10px] uppercase font-black transition-all border ${
                                                theme === t ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/5 opacity-50'
                                            }`}
                                        >
                                            {t.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Navigation (Taskbar Alternative) */}
            <footer className="fixed bottom-0 left-0 right-0 h-20 glass z-[200] border-t border-white/5 flex items-center justify-center px-10 gap-16 backdrop-blur-xl bg-white/5">
                <button onClick={() => setMenuOpen(true)} className="p-3 text-accent active:scale-95 transition-all">
                    <Layout size={28} strokeWidth={2} />
                </button>
                <div className="w-px h-8 bg-white/10" />
                <button className="p-3 text-text-secondary/60 active:scale-95 transition-all">
                    <Settings size={28} strokeWidth={2} />
                </button>
            </footer>
        </div>
    );
};

export default MobileShell;
