import React from 'react';
import { motion } from 'framer-motion';

const SnapLayouts = ({ onSnap, onClose }) => {
    // 6 Common Windows 11 Snap Layouts
    const layouts = [
        // 50/50 Split
        { id: 'half', grid: 'grid-cols-2', segments: [{ w: '50%', x: '0' }, { w: '50%', x: '50%' }] },
        // 2/3 and 1/3 Split
        { id: 'two-thirds', grid: 'grid-cols-[2fr_1fr]', segments: [{ w: '66.6%', x: '0' }, { w: '33.3%', x: '66.6%' }] },
        // 3 Equal Columns
        { id: 'three-cols', grid: 'grid-cols-3', segments: [{ w: '33.3%', x: '0' }, { w: '33.3%', x: '33.3%' }, { w: '33.3%', x: '66.6%' }] },
        // Left Half, Right Quarters
        { id: 'left-quarters', grid: 'grid-cols-2 grid-rows-2', segments: [
            { w: '50%', h: '100%', x: '0', y: '0', rowSpan: 'row-span-2' },
            { w: '50%', h: '50%', x: '50%', y: '0' },
            { w: '50%', h: '50%', x: '50%', y: '50%' }
        ]},
        // 4 Quarters
        { id: 'four-quarters', grid: 'grid-cols-2 grid-rows-2', segments: [
            { w: '50%', h: '50%', x: '0', y: '0' },
            { w: '50%', h: '50%', x: '50%', y: '0' },
            { w: '50%', h: '50%', x: '0', y: '50%' },
            { w: '50%', h: '50%', x: '50%', y: '50%' }
        ]},
        // 3-Way Split (Wide Center)
        { id: 'wide-center', grid: 'grid-cols-[1fr_2fr_1fr]', segments: [
            { w: '25%', x: '0' },
            { w: '50%', x: '25%' },
            { w: '25%', x: '75%' }
        ]}
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 p-3 glass-win11-mica rounded-lg shadow-2xl border border-white/20 z-[9999] w-[300px]"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={onClose}
        >
            <div className="grid grid-cols-3 gap-3">
                {layouts.map((layout, lIdx) => (
                    <div key={lIdx} className={`grid gap-1 h-14 p-1 bg-white/5 rounded-sm border border-white/10 hover:border-accent/40 transition-colors cursor-pointer group ${layout.grid}`}>
                        {layout.segments.map((seg, sIdx) => (
                            <div 
                                key={sIdx}
                                onClick={() => onSnap({ 
                                    width: seg.w, 
                                    height: seg.h || '100%', 
                                    x: seg.x, 
                                    y: seg.y || '0' 
                                })}
                                className={`${seg.rowSpan || ''} bg-white/10 hover:bg-blue-500/80 rounded-[2px] transition-all border border-white/5 hover:border-white/20 active:scale-95`}
                                title="Snap to this area"
                            />
                        ))}
                    </div>
                ))}
            </div>
            
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-black tracking-widest text-white/20 uppercase">
                 <span>Snap Layouts</span>
                 <span className="text-blue-400/50">Fluent 2.0</span>
            </div>
        </motion.div>
    );
};

export default SnapLayouts;
