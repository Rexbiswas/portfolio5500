import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Folder, Zap, Mail, FileText, Monitor, Settings as SettingsIcon } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';

import DesktopIcon from './DesktopIcon';
import AppWindow from './AppWindow';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Scene from './Scene';
import ContextMenu from './ContextMenu';

// Business Components (Windows)
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import Resume from '../pages/Resume';
import Home from '../pages/Home';
import SettingsApp from '../pages/Settings';

const DesktopShell = () => {
    const { openApps, minimizedApps, activeApp, openApp, closeApp, focusApp, minimizeApp } = useWindowManager();
    const [isStartMenuOpen, setStartMenuOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }

    const closeContextMenu = () => setContextMenu({ ...contextMenu, visible: false });

    const desktopIcons = [
        { appId: 'home', title: 'This PC', icon: Monitor },
        { appId: 'about', title: 'About', icon: User },
        { appId: 'projects', title: 'Projects', icon: Folder },
        { appId: 'skills', title: 'Skills', icon: Zap },
        { appId: 'contact', title: 'Contact', icon: Mail },
        { appId: 'resume', title: 'Resume', icon: FileText },
        { appId: 'settings', title: 'Settings', icon: SettingsIcon },
    ];

    const appRegistry = {
        home: <Home />,
        about: <About />,
        projects: <Projects />,
        skills: <Skills />,
        contact: <Contact />,
        resume: <Resume />,
        settings: <SettingsApp />
    };

    return (
        <div 
            className="fixed inset-0 overflow-hidden select-none bg-bg-primary"
            onClick={() => { setStartMenuOpen(false); closeContextMenu(); }}
            onContextMenu={handleContextMenu}
        >
            {/* Background / Wallpaper */}
            <Scene />

            {/* Context Menu Component */}
            <AnimatePresence>
                {contextMenu.visible && (
                    <ContextMenu 
                        {...contextMenu} 
                        onClose={closeContextMenu} 
                        onPersonalize={() => { openApp('settings'); closeContextMenu(); }} 
                    />
                )}
            </AnimatePresence>

            {/* Desktop Icons - Lower Z-Index to stay behind windows */}
            <div className="absolute inset-y-0 left-0 p-4 pt-16 flex flex-col flex-wrap gap-2 pointer-events-none w-fit z-0">
                {desktopIcons.map((icon, idx) => (
                    <div key={icon.appId} className="pointer-events-auto">
                        <DesktopIcon {...icon} delay={idx * 0.1} />
                    </div>
                ))}
            </div>

            {/* Window Manager Layer - Higher Z-Index (50+) to overlap icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden pb-12 z-50">
                <AnimatePresence>
                    {openApps.map((appId) => {
                        const isMinimized = minimizedApps.includes(appId);
                        const iconData = desktopIcons.find(i => i.appId === appId);
                        
                        return (
                            <AnimatePresence key={appId}>
                                {!isMinimized && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ 
                                            opacity: 0, 
                                            scale: 0.7, 
                                            y: 500,
                                            filter: 'blur(20px)',
                                            transition: { duration: 0.3, ease: 'backIn' }
                                        }}
                                        transition={{ 
                                            type: 'spring', 
                                            damping: 25, 
                                            stiffness: 250,
                                            mass: 1
                                        }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="pointer-events-auto w-full h-full">
                                            <AppWindow 
                                                appId={appId} 
                                                title={iconData?.title || 'System App'}
                                                icon={iconData?.icon || Monitor}
                                            >
                                                {appRegistry[appId]}
                                            </AppWindow>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Taskbar & Start Menu - Always on top */}
            <div className="relative z-[100000]">
                <Taskbar onToggleStart={(e) => { e.stopPropagation(); setStartMenuOpen(!isStartMenuOpen); }} />
                <StartMenu isOpen={isStartMenuOpen} onClose={() => setStartMenuOpen(false)} />
            </div>

            {/* Floating Context Notification / Toast System could go here */}
        </div>
    );
};

export default DesktopShell;
