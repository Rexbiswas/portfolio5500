import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Power, Search, ChevronRight, FileText, Image as ImageIcon, Video, Folder, Globe, Code, Edit3, Monitor, Zap, Mail, Settings as SettingsIcon, Lock } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';
import { useTheme } from './ThemeContext';

const StartMenu = ({ isOpen, onClose }) => {
    const { openApp, lockSystem } = useWindowManager();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAllApps, setIsAllApps] = useState(false);

    const pinnedApps = [
        { id: 'about', name: 'About', icon: User, color: 'text-blue-400' },
        { id: 'projects', name: 'Projects', icon: Folder, color: 'text-yellow-400' },
        { id: 'skills', name: 'Arsenal', icon: Zap, color: 'text-orange-400' },
        { id: 'contact', name: 'Contact', icon: Mail, color: 'text-green-400' },
        { id: 'resume', name: 'Resume', icon: FileText, color: 'text-indigo-400' },
        { id: 'home', name: 'Terminal', icon: Code, color: 'text-emerald-400' },
        { id: 'photos', name: 'Photos', icon: ImageIcon, color: 'text-purple-400' },
        { id: 'videos', name: 'Videos', icon: Video, color: 'text-red-400' },
        { id: 'settings', name: 'Settings', icon: SettingsIcon, color: 'text-slate-400' },
    ];

    const recommended = [
        { name: 'Portfolio_Design.fig', type: 'Figma', time: 'Recently added', icon: Edit3 },
        { name: 'Project_Assets.zip', type: 'Archive', time: '2h ago', icon: Folder },
        { name: 'CV_Rishi_Biswas.pdf', type: 'PDF', time: 'Yesterday at 4:24 PM', icon: FileText },
        { name: 'Inspiration.png', type: 'Image', time: '12m ago', icon: ImageIcon },
        { name: 'Dev_Logs.txt', type: 'Text', time: '3h ago', icon: FileText },
        { name: 'Demo_Video.mp4', type: 'Video', time: 'Yesterday at 1:15 PM', icon: Video }
    ];

    const filteredApps = pinnedApps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const profileImage = "https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1776902400&v=beta&t=haMQkDgDqKgyYz0Sw7n2My3VyGo5V5WquDXHhzqRF_8";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ y: 500, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 500, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[560px] max-w-[95vw] h-[640px] max-h-[85vh] z-[99999] glass-win11-mica rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/20 flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Bar Segment */}
                    <div className="p-6 pb-2">
                        <div className="relative group">
                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={14} />
                             <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for apps, settings, and documents"
                                className="w-full h-9 pl-10 pr-4 rounded-md bg-white/5 border border-white/10 focus:bg-white/10 focus:border-accent/40 outline-none transition-all text-xs font-semibold text-white placeholder:text-white/20 shadow-inner"
                             />
                        </div>
                    </div>

                    {/* Pinned Section */}
                    <div className="px-8 py-5 flex-1 overflow-y-auto custom-scrollbar bg-transparent">
                        <div className="flex items-center justify-between mb-4 sticky top-0 bg-transparent py-1 pointer-events-none z-10">
                            <span className="text-[12px] font-bold text-white tracking-wide opacity-90">Pinned</span>
                            <button 
                                onClick={() => setIsAllApps(!isAllApps)}
                                className="text-[11px] font-medium bg-white/[0.08] px-2.5 py-1 rounded-[4px] hover:bg-white/[0.15] border border-white/[0.05] transition-all flex items-center gap-1.5 group text-white pointer-events-auto active:scale-95"
                            >
                                {isAllApps ? 'Back' : 'All apps'} <ChevronRight size={12} className={isAllApps ? 'rotate-180' : 'group-hover:translate-x-0.5 transition-transform'} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-6 gap-x-2 gap-y-6 px-1">
                            {(searchQuery ? filteredApps : (isAllApps ? pinnedApps : pinnedApps.slice(0, 18))).map((app, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { openApp(app.id); onClose(); }}
                                    className="flex flex-col items-center gap-2 p-2 rounded-lg transition-all group relative"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                        <app.icon className={`${app.color || 'text-white'} transition-colors`} size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] text-white font-medium truncate w-full text-center px-0.5">
                                        {app.name}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                        
                        {filteredApps.length === 0 && searchQuery && (
                            <div className="py-20 text-center text-white/40 text-[11px] font-medium uppercase tracking-widest">
                                No apps found for "{searchQuery}"
                            </div>
                        )}

                        {/* Recommended Section */}
                        {!searchQuery && !isAllApps && (
                            <div className="mt-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[12px] font-bold text-white tracking-wide opacity-90">Recommended</span>
                                    <button className="text-[11px] font-medium bg-white/[0.08] px-2.5 py-1 rounded-[4px] hover:bg-white/[0.15] border border-white/[0.05] transition-all flex items-center gap-1.5 group text-white active:scale-95">
                                        More <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 px-1">
                                    {recommended.map((item, idx) => (
                                        <button key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.08] transition-all group text-left border border-transparent hover:border-white/[0.05]">
                                            <div className="w-9 h-9 rounded-[4px] flex items-center justify-center text-white/60 group-hover:text-accent border border-white/10 transition-colors bg-white/5 shadow-inner backdrop-blur-md">
                                                <item.icon size={18} />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-[11px] font-bold text-white leading-tight truncate">{item.name}</span>
                                                <span className="text-[10px] text-white/40 font-medium">{item.time}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom User Profile Segment */}
                    <div className="bg-white/5 backdrop-blur-3xl px-8 py-3.5 flex items-center justify-between border-t border-white/10">
                        <div 
                            onClick={lockSystem}
                            className="flex items-center gap-3 p-1.5 pr-5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                            title="Click to Lock System"
                        >
                             <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden shadow-lg shadow-black/20 group-hover:scale-105 transition-transform bg-white/5">
                                <img src={profileImage} alt="Rishi Biswas" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-white leading-none group-hover:text-cyan-400 transition-colors">Rishi Biswas</span>
                                <span className="text-[9px] text-emerald-400 font-black mt-1 tracking-widest uppercase">Available</span>
                             </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={() => { lockSystem(); onClose(); }}
                                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 transition-all active:scale-90"
                                title="Lock System"
                            >
                                <Lock size={17} />
                            </button>
                            <button 
                                onClick={onClose}
                                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-red-400 transition-all active:scale-90"
                                title="Power"
                            >
                                <Power size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StartMenu;
