import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText, Shield, Zap, Search, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Printer, Share2, MoreHorizontal, Layout, Info, Grid, List, Layers, FileDown, BookOpen, AtSign } from 'lucide-react';
import resumeFile from '../assets/Rishi_Frontend_CV.pdf';

const Resume = () => {
    const [zoom, setZoom] = useState(100);
    const [page, setPage] = useState(1);
    
    const ToolbarButton = ({ icon: Icon, label, onClick, disabled = false }) => (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 p-2 px-3 rounded-md transition-all text-white/40 hover:bg-white/10 hover:text-white disabled:opacity-10 group active:scale-95`}
            title={label}
        >
            <Icon size={16} className="group-hover:scale-110 transition-transform" />
            {label && <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">{label}</span>}
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-transparent animate-in fade-in duration-700 select-none overflow-hidden">
            {/* Edge-Style PDF Toolbar */}
            <header className="p-3 bg-[#1e1e1e] border-b border-white/5 flex items-center justify-between shadow-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 pl-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                            <FileText size={18} />
                        </div>
                        <div className="flex flex-col">
                             <h2 className="text-[11px] font-black uppercase tracking-tight text-white/80">Rishi_CV.pdf</h2>
                             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Portable Document Format</span>
                        </div>
                    </div>
                </div>

                {/* Center Controls (Pagination & Zoom) */}
                <div className="hidden md:flex items-center gap-1.5 p-1 glass-win11-mica border border-white/10 rounded-lg shadow-inner">
                    <ToolbarButton icon={ChevronLeft} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <div className="flex items-center gap-2 px-2">
                        <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Page</span>
                        <span className="px-3 py-1 bg-white/5 rounded text-[11px] font-black text-accent">{page}</span>
                        <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">of 2</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <ToolbarButton icon={ChevronRight} onClick={() => setPage(p => Math.min(page + 1, 2))} disabled={page === 2} />
                    <div className="w-px h-4 bg-white/10 mx-4" />
                    <ToolbarButton icon={ZoomOut} onClick={() => setZoom(z => Math.max(50, z - 10))} />
                    <span className="text-[10px] font-mono font-black text-white/60 min-w-[50px] text-center">{zoom}%</span>
                    <ToolbarButton icon={ZoomIn} onClick={() => setZoom(z => Math.min(200, z + 10))} />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 pr-2">
                    <a href={resumeFile} download="Rishi_Biswas_CV.pdf">
                        <ToolbarButton icon={Download} label="Download" />
                    </a>
                    <ToolbarButton icon={Printer} onClick={() => window.print()} label="Print" />
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <ToolbarButton icon={MoreHorizontal} />
                </div>
            </header>

            {/* Viewer Stage */}
            <div className="flex-1 flex bg-[#1a1a1a] overflow-hidden relative">
                {/* Navigation Thumbnails (Left) */}
                <aside className="hidden lg:flex w-48 border-r border-white/5 flex-col p-4 gap-6 bg-[#252528]/30">
                    <div className="flex items-center gap-3 px-2 opacity-40">
                        <Layers size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Outline</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[1, 2].map(p => (
                            <div 
                                key={p}
                                onClick={() => setPage(p)}
                                className={`flex flex-col gap-2 cursor-pointer group ${page === p ? 'scale-100' : 'scale-90 opacity-40 hover:opacity-100 hover:scale-95 transition-all'}`}
                            >
                                <div className={`aspect-[1/1.4] w-full rounded-md border-2 transition-all shadow-xl flex items-center justify-center ${page === p ? 'border-accent bg-accent/5 ring-4 ring-accent/10' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}>
                                    <span className="text-[10px] font-mono font-black text-white/20">{p}</span>
                                </div>
                                <span className={`text-center text-[9px] font-black uppercase tracking-widest ${page === p ? 'text-accent' : 'text-white/20'}`}>A4 - PAGE {p}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Document Canvas */}
                <main className="flex-1 overflow-auto p-12 custom-scrollbar bg-black/40 flex flex-col items-center">
                    {/* Simulated A4 Page */}
                    <motion.div 
                        key={page}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: zoom / 100 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="p-16 mb-20 bg-white border border-black/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative group cursor-text origin-top"
                        style={{ width: '800px', minHeight: '1131px' }}
                    >
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] select-none">
                             <h3 className="text-9xl font-black uppercase tracking-[0.5em] text-black">CONFIDENTIAL</h3>
                        </div>

                        {/* Page Content Simulation - HIGH CONTRAST PRINT STYLE */}
                        <div className="space-y-12 relative z-10 text-black">
                            <header className="flex justify-between items-start border-b-2 border-black/5 pb-8">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-5xl font-black tracking-tight text-black">Rishi Biswas</h1>
                                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">Full-Stack Creative Engineer</p>
                                </div>
                                <div className="flex flex-col items-end gap-1 opacity-40">
                                    <span className="text-[10px] font-mono uppercase">Version 5.5.00</span>
                                    <span className="text-[10px] font-mono uppercase">Released: 2024</span>
                                </div>
                            </header>

                            <section className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/30 border-l-4 border-blue-600 pl-4">Professional Overview</h3>
                                <p className="text-base font-medium text-black/70 leading-relaxed italic">
                                    Creative engineer with expertise in building high-performance 3D web experiences using React, Three.js, and Framer Motion. specialized in bridging the gap between artistic design and technical precision.
                                </p>
                            </section>

                            <section className="grid grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Logical Cores</h3>
                                    <ul className="space-y-3 text-sm font-bold text-black/80">
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> React Ecosystem
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Next.js 14+
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> High-End Animations
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">System Stats</h3>
                                    <div className="space-y-4">
                                        {[
                                            { l: 'Experience', v: '2+ Years' },
                                            { l: 'Projects', v: '15+ Deployed' },
                                            { l: 'Efficiency', v: '98%' }
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between border-b border-black/[0.03] pb-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-black/20">{s.l}</span>
                                                <span className="text-sm font-black text-blue-600">{s.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                             <section className="space-y-6 pt-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/30 border-l-4 border-blue-600 pl-4">Signature Project</h3>
                                <div className="p-6 bg-black/[0.02] border border-black/5 rounded-xl">
                                    <h4 className="text-lg font-black uppercase tracking-tighter mb-2">Windows 11 OS Portfolio</h4>
                                    <p className="text-xs font-medium text-black/50 leading-relaxed mb-4">
                                        A high-fidelity system-level web environment that simulates an operating system's desktop and application management.
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-white border border-black/5 rounded font-mono text-[9px]">#MERN</span>
                                        <span className="px-3 py-1 bg-white border border-black/5 rounded font-mono text-[9px]">#FramerMotion</span>
                                        <span className="px-3 py-1 bg-white border border-black/5 rounded font-mono text-[9px]">#Three.js</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Floating Action Button inside Document */}
                        <div className="absolute bottom-10 right-10 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <a 
                                href={resumeFile} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border border-white/20"
                                title="Open Full PDF"
                            >
                                <BookOpen size={20} />
                            </a>
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* Footer / Status Bar */}
            <footer className="px-6 py-1.5 bg-[#1e1e1e] border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/20">
                <div className="flex items-center gap-6">
                    <span className="text-emerald-400">● Source Connected</span>
                    <span>A4 Optimized</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Build 5.5.00</span>
                </div>
            </footer>
        </div>
    );
};

export default Resume;
