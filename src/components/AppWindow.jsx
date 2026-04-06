import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { AnimatePresence } from 'framer-motion';
import { Minus, X, Maximize2, Copy, Monitor } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';
import SnapLayouts from './SnapLayouts';

const WindowsMaximizeIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const AppWindow = ({ appId, title, icon: Icon, children }) => {
    const { 
        activeApp, minimizeApp, closeApp, focusApp, 
        maximizedApps, toggleMaximize, snappedApps, snapApp, openApps 
    } = useWindowManager();
    
    const isActive = activeApp === appId;
    const isMaximized = maximizedApps.includes(appId);
    const snapState = snappedApps[appId];
    
    const [currentPosition, setCurrentPosition] = useState({ x: 100, y: 50 });
    const [currentSize, setCurrentSize] = useState({ width: 900, height: 600 });
    
    const [showSnapLayouts, setShowSnapLayouts] = useState(false);
    const snapTimerRef = useRef(null);

    const handleMaximizeHover = () => {
        snapTimerRef.current = setTimeout(() => setShowSnapLayouts(true), 400);
    };

    const handleMaximizeLeave = () => {
        if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };

    const handleSnap = (layout) => {
        snapApp(appId, layout);
        setShowSnapLayouts(false);
    };

    // Calculate window styles based on maximize or snap state
    const getWindowStyle = () => {
        const taskbarHeight = 48;
        if (isMaximized) {
            return {
                width: '100vw',
                height: `calc(100vh - ${taskbarHeight}px)`,
                position: 'fixed',
                top: 0,
                left: 0,
                transform: 'none',
                borderRadius: '0', // No rounding when maximized like Windows 11
                border: 'none',
                boxShadow: 'none'
            };
        }
        
        if (snapState) {
            const margin = 0; // Seamless snapped windows
            const w = `50%`;
            const hFull = `calc(100vh - ${taskbarHeight}px)`;
            const hHalf = `calc(50vh - ${taskbarHeight / 2}px)`;

            switch (snapState) {
                case 'left': return { left: 0, top: 0, width: w, height: hFull, borderRadius: 0 };
                case 'right': return { right: 0, top: 0, width: w, height: hFull, borderRadius: 0 };
                case 'top-left': return { left: 0, top: 0, width: w, height: hHalf, borderRadius: 0 };
                case 'bottom-left': return { left: 0, top: `calc(50vh - ${taskbarHeight / 2}px)`, width: w, height: hHalf, borderRadius: 0 };
                default: break;
            }
        }
        return {
            borderRadius: '8px',
            boxShadow: isActive ? '0 30px 100px -20px rgba(0,0,0,0.6)' : '0 10px 40px -10px rgba(0,0,0,0.4)',
        };
    };

    return (
        <Rnd
            size={isMaximized ? { width: '100vw', height: 'calc(100vh - 48px)' } : snapState ? getWindowStyle() : currentSize}
            position={isMaximized ? { x: 0, y: 0 } : snapState ? getWindowStyle() : currentPosition}
            onDragStop={(e, d) => { setCurrentPosition({ x: d.x, y: d.y }); }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setCurrentSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                setCurrentPosition(position);
            }}
            disableDragging={isMaximized || !!snapState}
            enableResizing={!isMaximized && !snapState}
            minWidth={400}
            minHeight={300}
            dragHandleClassName="title-bar-handle"
            bounds="parent"
            className={`flex flex-col bg-[#1d1f27] border border-white/10 overflow-hidden pointer-events-auto transition-all ${isActive ? 'z-50' : 'z-10'}`}
            style={{ 
                ...getWindowStyle(), 
                transition: 'width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                display: isActive || openApps.includes(appId) ? 'flex' : 'none',
                opacity: 1
            }}
            onClick={() => focusApp(appId)}
        >
            {/* Header / Title Bar */}
            <div 
                className="h-11 flex items-center justify-between px-4 bg-white/5 backdrop-blur-3xl border-b border-white/10 select-none cursor-default title-bar-handle"
                onDoubleClick={() => toggleMaximize(appId)}
            >
                <div className="flex items-center gap-3">
                    <Icon size={16} className="text-accent" />
                    <span className="text-[11px] font-bold tracking-tight text-white/70 uppercase truncate max-w-[200px]">
                        {title}
                    </span>
                </div>

                <div className="flex items-center">
                    <button 
                        onClick={(e) => { e.stopPropagation(); minimizeApp(appId); }}
                        className="w-12 h-9 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 active:scale-90"
                        title="Minimize"
                    >
                        <Minus size={16} />
                    </button>
                    
                    <div className="relative h-full flex items-center" onMouseEnter={handleMaximizeHover} onMouseLeave={handleMaximizeLeave}>
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleMaximize(appId); }}
                            className="w-12 h-9 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 active:scale-90"
                            title="Maximize"
                        >
                            <WindowsMaximizeIcon />
                        </button>
                        
                        <AnimatePresence>
                            {showSnapLayouts && (
                                <div 
                                    className="absolute top-9 left-1/2 -translate-x-1/2 pt-2"
                                    onMouseLeave={() => setShowSnapLayouts(false)}
                                >
                                    <SnapLayouts onSnap={handleSnap} />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); closeApp(appId); }}
                        className="w-12 h-9 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-white/60 active:scale-90 group"
                        title="Close"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-auto bg-[#1b1b1b]/80 backdrop-blur-3xl relative custom-scrollbar`}>
                {children}
            </div>
        </Rnd>
    );
};

export default AppWindow;
