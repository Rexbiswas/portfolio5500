import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Plane, Moon, Battery, Volume2, Sun, Settings, User, BatteryLow, Zap, WifiOff, Monitor, Cpu } from 'lucide-react';
import { useWindowManager } from './WindowManagerContext';

const QuickSettings = ({ isOpen, onClose }) => {
    const { openApp } = useWindowManager();
    
    // Fully Synced States
    const [states, setStates] = useState({
        wifi: navigator.onLine,
        bluetooth: false,
        airplane: false,
        nightLight: false,
        batterySaver: true,
        focusAssist: true
    });

    const [sysInfo, setSysInfo] = useState({ 
        battery: 82, 
        charging: false,
        platform: navigator.platform,
        memory: navigator.deviceMemory || '8GB+'
    });

    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(85);

    // Sync Battery & Memory with System
    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(batt => {
                const updateBattery = () => {
                    setSysInfo(prev => ({ 
                        ...prev, 
                        battery: Math.round(batt.level * 100),
                        charging: batt.charging
                    }));
                };
                updateBattery();
                batt.addEventListener('levelchange', updateBattery);
                batt.addEventListener('chargingchange', updateBattery);
            });
        }
    }, []);

    // Sync Wi-Fi with Line 
    useEffect(() => {
        const handleStatus = () => setStates(prev => ({ ...prev, wifi: navigator.onLine }));
        window.addEventListener('online', handleStatus);
        window.addEventListener('offline', handleStatus);
        return () => {
            window.removeEventListener('online', handleStatus);
            window.removeEventListener('offline', handleStatus);
        };
    }, []);

    // Apply Filters for Night Light and Brightness
    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            let filter = `brightness(${brightness}%)`;
            if (states.nightLight) filter += ` sepia(25%) saturate(140%)`;
            root.style.filter = filter;
        }
    }, [brightness, states.nightLight]);

    const toggleStates = (key) => {
        setStates(prev => {
            const next = { ...prev, [key]: !prev[key] };
            // Airplane logic
            if (key === 'airplane' && next.airplane) {
                next.wifi = false;
                next.bluetooth = false;
            } else if (key === 'airplane' && !next.airplane) {
                next.wifi = navigator.onLine;
            }
            return next;
        });
    };

    const toggles = [
        { id: 'wifi', icon: states.wifi ? Wifi : WifiOff, label: 'Wi-Fi', active: states.wifi },
        { id: 'bluetooth', icon: Bluetooth, label: 'Bluetooth', active: states.bluetooth },
        { id: 'airplane', icon: Plane, label: 'Airplane mode', active: states.airplane },
        { id: 'nightLight', icon: Moon, label: 'Night light', active: states.nightLight },
        { id: 'batterySaver', icon: Battery, label: 'Battery saver', active: states.batterySaver },
        { id: 'focusAssist', icon: Zap, label: 'Focus assist', active: states.focusAssist },
    ];

    return (
        <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 200, opacity: 0, scale: 0.9 }}
            className="fixed bottom-14 right-2 w-[340px] glass-win11-mica rounded-2xl z-[50001] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Quick Toggle Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                {toggles.map((item) => (
                    <div key={item.id} className="flex flex-col items-center gap-1.5 py-1">
                        <button 
                            onClick={() => toggleStates(item.id)}
                            className={`w-full aspect-4/3 rounded-lg flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                                item.active 
                                ? 'bg-blue-500 text-white hover:bg-blue-400 shadow-blue-500/20 ring-1 ring-white/10' 
                                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/5'
                            }`}
                        >
                            <item.icon size={18} strokeWidth={item.active ? 2.5 : 1.5} />
                        </button>
                        <span className={`text-[10px] font-bold text-center tracking-tight transition-colors ${
                            item.active ? 'text-white' : 'text-white/40'
                        }`}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Sliders Section */}
            <div className="space-y-4 px-1 py-4 border-t border-white/10">
                <div className="flex items-center gap-4 group">
                    <Volume2 size={16} className="text-white/40 group-hover:text-blue-400 transition-colors" />
                    <div className="flex-1 relative flex items-center h-6 cursor-pointer group">
                        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)}
                               className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
                        <div className="absolute left-0 h-1 bg-blue-500 rounded-full pointer-events-none" style={{ width: `${volume}%` }} />
                    </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                    <Sun size={16} className="text-white/40 group-hover:text-amber-400 transition-colors" />
                    <div className="flex-1 relative flex items-center h-6 cursor-pointer group">
                        <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)}
                               className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
                        <div className="absolute left-0 h-1 bg-blue-500 rounded-full pointer-events-none" style={{ width: `${brightness}%` }} />
                    </div>
                </div>
            </div>

            {/* Bottom Bar Settings/User Info Sync */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 group transition-colors">
                        <BatteryLow size={14} className={sysInfo.charging ? "text-blue-400" : "text-emerald-400"} />
                        <span className="text-[10px] font-black text-white/90">{sysInfo.battery}%</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
                        <Cpu size={14} className="text-purple-400" />
                        <span className="text-[10px] font-black text-white/90">{sysInfo.memory}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <button onClick={() => { openApp('settings'); onClose(); }}
                        className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group"
                        title="Settings"
                    >
                        <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                    <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-90" title="User Account">
                        <User size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default QuickSettings;
