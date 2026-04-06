import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Globe, Layout, Code as CodeIcon, Folder, FileCode, Search, Grid, List, ChevronRight, MoreHorizontal, Download, Share2, Info, ArrowLeft, ArrowRight, Home } from 'lucide-react';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    const projects = [
        {
            id: 1,
            title: "SneakerHead",
            category: "Web App",
            description: "A modern Sneakerhead web application with 3D sneaker Visualizations.",
            tags: ["React", "Three.js", "Tailwind"],
            imageSrc: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
            githubUrl: "https://github.com/Rexbiswas/sneakerhead",
            projectUrl: "https://sneakerhead-khaki.vercel.app/",
            size: "12.4 MB",
            date: "24-03-2024"
        },
        {
            id: 2,
            title: "VisualConcept",
            category: "Web Design",
            description: "Futuristic concept car interaction prototype.",
            tags: ["React", "GSAP", "Three.js"],
            imageSrc: "https://images.unsplash.com/photo-1549333349-598dc88ec4ca?q=80&w=800&auto=format&fit=crop",
            githubUrl: "https://github.com/Rexbiswas/visual_concept",
            projectUrl: "https://visual-concept.vercel.app/",
            size: "8.1 MB",
            date: "15-02-2024"
        },
        {
            id: 3,
            title: "Rockerz",
            category: "Web App",
            description: "Premium headphone showcase with cinematic animations.",
            tags: ["React", "Tailwind", "Framer"],
            imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
            githubUrl: "https://github.com/Rexbiswas/rockerz",
            projectUrl: "https://rockerz-kappa.vercel.app/",
            size: "15.2 MB",
            date: "10-01-2024"
        }
    ];

    const filteredProjects = projects.filter(p => 
        (filter === 'All' || p.category === filter) &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const ToolbarButton = ({ icon: Icon, label, active = false, onClick }) => (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] transition-all text-[11px] font-bold uppercase tracking-widest ${
                active ? 'bg-white/10 text-accent border border-white/10' : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
        >
            <Icon size={14} />
            <span className="hidden md:inline">{label}</span>
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-transparent animate-in fade-in duration-700 select-none">
            {/* Header / Toolbar (File Explorer Style) */}
            <header className="p-3 bg-white/5 backdrop-blur-3xl border-b border-white/5 flex flex-col gap-3">
                {/* Navigation Bar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <button className="p-1 px-3 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white active:scale-90"><ArrowLeft size={16} /></button>
                            <button className="p-1 px-3 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white opacity-20"><ArrowRight size={16} /></button>
                            <button className="p-1 px-3 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"><Home size={16} /></button>
                        </div>
                        
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-1.5 h-8 px-3 glass-win11-mica border border-white/10 rounded-[4px] text-[10px] font-bold text-white/40 uppercase tracking-widest min-w-[200px] max-w-[400px]">
                            <span>This PC</span>
                            <ChevronRight size={10} />
                            <span className="text-white/60">Projects</span>
                            {filter !== 'All' && (
                                <>
                                    <ChevronRight size={10} />
                                    <span className="text-accent">{filter}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Search Search */}
                    <div className="relative w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={14} />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Repositories"
                            className="w-full h-8 pl-10 pr-4 rounded-[4px] bg-white/5 border border-white/10 focus:bg-white/10 focus:border-accent/40 outline-none text-[10px] uppercase font-black text-white placeholder:text-white/10"
                        />
                    </div>
                </div>

                {/* Main Actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <div className="flex items-center gap-1">
                        <ToolbarButton 
                            icon={Grid} 
                            label="All" 
                            active={filter === 'All'} 
                            onClick={() => setFilter('All')} 
                        />
                        <ToolbarButton 
                            icon={Layout} 
                            label="Web Apps" 
                            active={filter === 'Web App'} 
                            onClick={() => setFilter('Web App')} 
                        />
                        <ToolbarButton 
                            icon={Grid} 
                            label="Design" 
                            active={filter === 'Web Design'} 
                            onClick={() => setFilter('Web Design')} 
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-px bg-white/10 mx-2" />
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded hover:bg-white/10 transition-colors ${viewMode === 'grid' ? 'text-accent' : 'text-white/40'}`}
                        >
                            <Grid size={16} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded hover:bg-white/10 transition-colors ${viewMode === 'list' ? 'text-accent' : 'text-white/40'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="group flex flex-col glass-win11-mica rounded-lg border border-white/5 overflow-hidden hover:border-accent/40 transition-all cursor-pointer shadow-xl"
                                >
                                    <div className="relative aspect-video overflow-hidden border-b border-white/5">
                                        <img src={project.imageSrc} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                            {project.tags.map(t => (
                                                <span key={t} className="text-[8px] font-black uppercase tracking-tighter bg-accent/20 text-accent px-1.5 py-0.5 rounded backdrop-blur-md border border-accent/20">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Folder size={16} className="text-yellow-400" />
                                            <h3 className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white">{project.title}</h3>
                                        </div>
                                        <p className="text-[10px] text-white/30 font-medium leading-tight h-8 line-clamp-2">{project.description}</p>
                                        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                                            <div className="flex items-center gap-3">
                                                <a href={project.githubUrl} target="_blank" className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"><Github size={14} /></a>
                                                <a href={project.projectUrl} target="_blank" className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-accent"><ExternalLink size={14} /></a>
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/10">{project.size}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        {/* List Headers */}
                        <div className="flex items-center px-4 py-2 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                            <div className="flex-[4] flex items-center gap-2"><Folder size={12} /> Name</div>
                            <div className="flex-[2]">Date Modified</div>
                            <div className="flex-[2]">Type</div>
                            <div className="flex-[1] text-right">Size</div>
                        </div>
                        {filteredProjects.map((project) => (
                             <motion.div
                                key={project.id}
                                className="flex items-center px-4 py-3 rounded-md hover:bg-white/5 group border border-transparent hover:border-white/5 transition-all cursor-pointer"
                             >
                                <div className="flex-[4] flex items-center gap-3">
                                    <FileCode size={20} className="text-blue-400 opacity-60 group-hover:opacity-100" />
                                    <span className="text-xs font-bold text-white/70 group-hover:text-accent">{project.title}</span>
                                </div>
                                <div className="flex-[2] text-[10px] text-white/30 font-mono">{project.date}</div>
                                <div className="flex-[2] text-[10px] text-white/30 truncate uppercase tracking-tighter">{project.category} Project</div>
                                <div className="flex-[1] text-[10px] text-white/20 font-mono text-right">{project.size}</div>
                             </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer / Status Bar */}
            <footer className="px-6 py-2 bg-white/5 backdrop-blur-3xl border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/30">
                <div className="flex items-center gap-4">
                    <span>{filteredProjects.length} items</span>
                    <span className="text-white/10">|</span>
                    <span>{filteredProjects.length} selected</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Share2 size={12} /> Share
                    </div>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Info size={12} /> Properties
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Projects;
