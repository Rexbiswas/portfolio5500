import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
    // System Lifecycle States
    const [isLocked, setIsLocked] = useState(true); // Start locked for that "WOW" effect
    const [isLoginInProgress, setIsLoginInProgress] = useState(false);
    
    // Default to an empty desktop for that "clean" Windows experience
    const [openApps, setOpenApps] = useState([]); 
    const [minimizedApps, setMinimizedApps] = useState([]);
    const [maximizedApps, setMaximizedApps] = useState([]);
    const [snappedApps, setSnappedApps] = useState({}); 
    const [activeApp, setActiveApp] = useState(null); 
    
    const [wallpaper, setWallpaper] = useState('bloom');
    const [wallpaperType, setWallpaperType] = useState('id'); 
    const [customWallpaper, setCustomWallpaper] = useState(null);

    const openApp = useCallback((appId) => {
        if (!openApps.includes(appId)) {
            setOpenApps((prev) => [...prev, appId]);
            // Automatically maximize 'home' and 'about' for a premium initial experience
            if (appId === 'home' || appId === 'about') {
                setMaximizedApps((prev) => !prev.includes(appId) ? [...prev, appId] : prev);
            }
        }
        setMinimizedApps((prev) => prev.filter(id => id !== appId));
        setActiveApp(appId);
        
        // Ensure Terminal is showing when This PC is explicitly opened
        if (appId === 'home') {
            localStorage.setItem('terminal-hero-visible', "true");
            // Force a custom event or state update could go here, but localStorage is a start
        }
    }, [openApps]);

    const closeApp = useCallback((appId) => {
        setOpenApps((prev) => prev.filter(id => id !== appId));
        setMinimizedApps((prev) => prev.filter(id => id !== appId));
        setMaximizedApps((prev) => prev.filter(id => id !== appId));
        setSnappedApps((prev) => {
            const next = { ...prev };
            delete next[appId];
            return next;
        });
        if (activeApp === appId) {
            const remaining = openApps.filter(id => id !== appId);
            setActiveApp(remaining[remaining.length - 1] || null);
        }
    }, [activeApp, openApps]);

    const minimizeApp = useCallback((appId) => {
        setMinimizedApps((prev) => [...prev, appId]);
        if (activeApp === appId) {
            setActiveApp(null);
        }
    }, [activeApp]);

    const toggleMaximize = useCallback((appId) => {
        setMaximizedApps((prev) => 
            prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
        );
        setSnappedApps((prev) => {
            const next = { ...prev };
            delete next[appId];
            return next;
        });
    }, []);

    const snapApp = useCallback((appId, layout) => {
        setSnappedApps((prev) => ({ ...prev, [appId]: layout }));
        setMaximizedApps((prev) => prev.filter(id => id !== appId));
    }, []);

    const focusApp = useCallback((appId) => {
        setActiveApp(appId);
        setMinimizedApps((prev) => prev.filter(id => id !== appId));
    }, []);

    const lockSystem = useCallback(() => setIsLocked(true), []);
    
    const unlockSystem = useCallback(() => {
        setIsLoginInProgress(true);
        setTimeout(() => {
            setIsLocked(false);
            setIsLoginInProgress(false);
        }, 1200);
    }, []);

    return (
        <WindowManagerContext.Provider value={{ 
            isLocked,
            isLoginInProgress,
            openApps, 
            minimizedApps, 
            maximizedApps,
            snappedApps,
            activeApp, 
            wallpaper,
            wallpaperType,
            customWallpaper,
            openApp, 
            closeApp, 
            minimizeApp, 
            toggleMaximize,
            snapApp,
            focusApp,
            lockSystem,
            unlockSystem,
            setWallpaper,
            setWallpaperType,
            setCustomWallpaper 
        }}>
            {children}
        </WindowManagerContext.Provider>
    );
};

export const useWindowManager = () => {
    const context = useContext(WindowManagerContext);
    if (!context) throw new Error('useWindowManager must be used within a WindowManagerProvider');
    return context;
};
