import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ArrowUpDown, RefreshCw, Palette, ExternalLink } from 'lucide-react';

const ContextMenu = ({ x, y, visible, onClose, onPersonalize }) => {
    if (!visible) return null;

    const items = [
        { icon: LayoutGrid, label: 'View', submenu: true },
        { icon: ArrowUpDown, label: 'Sort by', submenu: true },
        { icon: RefreshCw, label: 'Refresh', action: () => { window.location.reload(); } },
        { divider: true },
        { icon: Palette, label: 'Personalize', action: onPersonalize },
        { icon: ExternalLink, label: 'Open Terminal', action: () => { window.open('https://github.com/Rexbiswas', '_blank'); } },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ top: y, left: x }}
            className="fixed z-9999 w-64 glass-win11 p-1.5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-3xl"
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div className="flex flex-col gap-0.5">
                {items.map((item, idx) => (
                    item.divider ? (
                        <div key={idx} className="h-px bg-white/5 my-1 mx-2" />
                    ) : (
                        <button
                            key={idx}
                            onClick={() => { item.action?.(); onClose(); }}
                            className="flex items-center justify-between w-full p-2 h-9 rounded-lg hover:bg-white/10 transition-colors group text-left"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
                                <span className="text-[12px] font-medium text-text-primary/90">{item.label}</span>
                            </div>
                            {item.submenu && <div className="w-1.5 h-1.5 border-t border-r border-white/40 rotate-45 mr-1" />}
                        </button>
                    )
                ))}
            </div>
        </motion.div>
    );
};

export default ContextMenu;
