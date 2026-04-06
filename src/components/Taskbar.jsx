import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Search, Square, ShoppingBag, Folder, Globe, MessageSquare, Wifi, Volume2, Battery, Calendar, User, Mail, FileText, Zap, Settings, Monitor } from 'lucide-react';
import dayjs from 'dayjs';
import { useWindowManager } from './WindowManagerContext';
import { useTheme } from './ThemeContext';
import QuickSettings from './QuickSettings';

const Taskbar = ({ onToggleStart }) => {
    const { openApps, activeApp, minimizeApp, focusApp, openApp, minimizedApps } = useWindowManager();
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    const systemIcons = [
        { id: 'start', icon: LayoutGrid, action: (e) => onToggleStart(e), color: 'text-accent' },
        { id: 'search', icon: Search, action: (e) => onToggleStart(e) },
    ];

    const apps = [
        { id: 'home', icon: Monitor, color: 'text-blue-400' },
        { id: 'about', icon: User, color: 'text-blue-300' },
        { id: 'projects', icon: Folder, color: 'text-yellow-400' },
        { id: 'skills', icon: Zap, color: 'text-orange-400' },
        { id: 'contact', icon: Mail, color: 'text-green-400' },
        { id: 'resume', icon: FileText, color: 'text-indigo-400' },
        { id: 'settings', icon: Settings, color: 'text-slate-400' },
    ];

    return (
        <div 
            className="fixed bottom-0 left-0 right-0 z-[100000] h-12 glass-win11-taskbar transition-all flex items-center px-4"
            onClick={(e) => { e.stopPropagation(); setQuickSettingsOpen(false); }}
        >
            <div className="flex items-center justify-between w-full h-full">
                {/* Left: Widgets (Win 11 Style) */}
                <div className="flex-1 flex items-center">
                    <button className="h-10 px-3 flex items-center gap-2 hover:bg-white/10 rounded-lg transition-all group group-active:scale-95">
                         <div className="grid grid-cols-2 gap-0.5 p-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-1.5 h-1.5 rounded-sm bg-blue-400/80 shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
                            <div className="w-1.5 h-1.5 rounded-sm bg-yellow-400/80" />
                            <div className="w-1.5 h-1.5 rounded-sm bg-green-400/80" />
                            <div className="w-1.5 h-1.5 rounded-sm bg-red-400/80" />
                         </div>
                         <span className="text-[10px] font-black text-white/50 group-hover:text-white uppercase tracking-widest hidden xl:inline">Feed</span>
                    </button>
                    <div className="h-4 w-px bg-white/10 ml-2" />
                </div>

                {/* Center: System & App Icons */}
                <div className="flex items-center gap-1.5">
                    {/* Start & Search */}
                    <div className="flex items-center gap-1">
                        {systemIcons.map((sys) => (
                            <motion.button
                                key={sys.id}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.stopPropagation(); sys.action?.(e); }}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${sys.color || 'text-white/60'} hover:text-white`}
                            >
                                <sys.icon size={22} strokeWidth={1.5} />
                            </motion.button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Apps */}
                    <div className="flex items-center gap-1">
                        {apps.map((app) => {
                            const isOpen = openApps.includes(app.id);
                            const isActive = activeApp === app.id;
                            const isMinimized = minimizedApps.includes(app.id);
                            
                            return (
                                <motion.button
                                    key={app.id}
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isOpen) {
                                            if (isActive) minimizeApp(app.id);
                                            else focusApp(app.id);
                                        } else {
                                            openApp(app.id);
                                        }
                                    }}
                                    className={`relative w-10 h-10 rounded-lg flex items-center justify-center group transition-all ${
                                        isActive ? 'bg-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]' : ''
                                    } ${isOpen && isMinimized ? 'opacity-50' : 'opacity-100'}`}
                                >
                                    <app.icon size={22} className={`${app.color} transition-all ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : ''}`} strokeWidth={1.5} />
                                    
                                    {isOpen && (
                                        <motion.div 
                                            layoutId={`taskbar-indicator-${app.id}`}
                                            className={`absolute bottom-1 rounded-full transition-all duration-300 ${
                                                isActive 
                                                ? 'bg-blue-400 w-4 h-[3px] shadow-[0_0_12px_#60a5fa]' 
                                                : isMinimized 
                                                    ? 'bg-white/10 w-1.5 h-[2px]' 
                                                    : 'bg-white/40 w-1.5 h-[2px]'
                                            }`}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Right: System Tray */}
                <div className="flex-1 flex items-center justify-end gap-1">
                    <div 
                        className="flex items-center gap-2.5 px-3 h-10 hover:bg-white/10 rounded-lg transition-colors cursor-pointer group"
                        onClick={(e) => { e.stopPropagation(); setQuickSettingsOpen(!isQuickSettingsOpen); }}
                    >
                        <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                            <Wifi size={14} />
                            <Volume2 size={14} />
                            <Battery size={14} />
                        </div>
                        <div className="flex flex-col items-end justify-center text-[10px] font-bold leading-tight select-none border-l border-white/10 pl-2.5">
                            <span className="text-white">{currentTime.format('HH:mm')}</span>
                            <span className="text-white/40 font-semibold text-[9px]">{currentTime.format('DD-MM-YY')}</span>
                        </div>
                    </div>

                    <div 
                        className="w-1.5 h-full opacity-0 hover:opacity-100 hover:bg-white/10 transition-all border-l border-white/10 cursor-pointer" 
                        title="Show Desktop"
                        onClick={() => openApps.forEach(app => minimizeApp(app))}
                    />
                </div>
            </div>

            <AnimatePresence>
                {isQuickSettingsOpen && (
                    <QuickSettings 
                        isOpen={isQuickSettingsOpen} 
                        onClose={() => setQuickSettingsOpen(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Taskbar;
