import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Cpu, Palette, Database, Smartphone, Server, Activity, Zap, Info, ChevronRight, Menu, Play, Square, Settings, HardDrive, Share2, Search, ArrowUp, ArrowDown } from 'lucide-react';

const Skills = () => {
    const [activeTab, setActiveTab] = useState('Frontend');
    
    const skillGroups = {
        Frontend: {
            title: "Frontend Engine",
            icon: Globe,
            usage: "85%",
            status: "High Efficiency",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            skills: [
                { name: "React / Next.js", level: 95, speed: "Fast" },
                { name: "TypeScript", level: 90, speed: "Stable" },
                { name: "Tailwind CSS", level: 98, speed: "Rapid" },
                { name: "Framer Motion", level: 85, speed: "Fluid" }
            ]
        },
        Backend: {
            title: "Logic Core",
            icon: Server,
            usage: "60%",
            status: "Balanced",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            skills: [
                { name: "Node.js / Express", level: 80, speed: "Scalable" },
                { name: "PostgreSQL", level: 75, speed: "Consistent" },
                { name: "MongoDB", level: 85, speed: "Dynamic" },
                { name: "Python / Django", level: 70, speed: "Standard" }
            ]
        },
        Design: {
            title: "Visual Processing Unit",
            icon: Palette,
            usage: "72%",
            status: "Optimized",
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            skills: [
                { name: "Figma (UI/UX)", level: 90, speed: "Precise" },
                { name: "Three.js / WebGL", level: 65, speed: "Intensive" },
                { name: "Adobe Suite", level: 80, speed: "Professional" },
                { name: "Design Systems", level: 95, speed: "Atomic" }
            ]
        }
    };

    // Simulated "Performance Graph" data
    const [graphData, setGraphData] = useState(Array(20).fill(20));
    useEffect(() => {
        const interval = setInterval(() => {
            setGraphData(prev => {
                const next = [...prev.slice(1), Math.floor(Math.random() * 40) + 30];
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const activeGroup = skillGroups[activeTab];

    return (
        <div className="h-full flex flex-col md:flex-row bg-transparent animate-in fade-in duration-700 select-none overflow-hidden">
            {/* Sidebar (Task Manager Style) */}
            <aside className="w-full md:w-64 bg-white/5 backdrop-blur-3xl border-r border-white/5 flex flex-col p-4 gap-2 overflow-y-auto">
                <div className="flex items-center gap-2 mb-6 px-2 opacity-60">
                    <Activity size={16} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">System Performance</span>
                </div>

                {Object.entries(skillGroups).map(([id, group]) => (
                    <button 
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex flex-col gap-1 p-3 rounded-lg transition-all border ${
                            activeTab === id 
                            ? 'bg-accent/10 border-accent/30 ring-1 ring-accent/10' 
                            : 'hover:bg-white/5 border-transparent opacity-50 hover:opacity-100'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <group.icon size={16} className={group.color} />
                                <span className="text-[11px] font-bold text-white uppercase">{id}</span>
                            </div>
                            <span className={`text-[10px] font-mono ${group.color}`}>{group.usage}</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                            <motion.div 
                                animate={{ width: group.usage }}
                                className={`h-full ${group.bg.replace('/10', '')}`}
                            />
                        </div>
                    </button>
                ))}

                <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-3 text-white/40">
                         <Settings size={14} />
                         <span className="text-[10px] font-black uppercase tracking-widest leading-none">Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col overflow-auto p-4 md:p-10 custom-scrollbar gap-8">
                <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-[1.5rem] ${activeGroup.bg} flex items-center justify-center ${activeGroup.color} shadow-2xl border border-white/10`}>
                            <activeGroup.icon size={40} />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-black tracking-tighter uppercase">{activeGroup.title}</h2>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Version 5.5.00 / Build Stable</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Process Affinity</span>
                            <span className={`text-xl font-mono font-black ${activeGroup.color}`}>{activeGroup.status}</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Performance Graph Area */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Utilization History</span>
                             <div className="flex items-center gap-4 text-[9px] font-mono text-white/20">
                                <span className="flex items-center gap-1"><ArrowUp size={10} className="text-emerald-400" /> 124ms</span>
                                <span className="flex items-center gap-1"><ArrowDown size={10} className="text-blue-400" /> 12ms</span>
                             </div>
                        </div>
                        <div className="aspect-[2/1] glass-win11-mica border border-white/5 rounded-xl p-4 flex items-end gap-1 relative overflow-hidden group">
                             {/* Grid Lines */}
                             <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none p-4">
                                {[...Array(30)].map((_, i) => <div key={i} className="border-[0.5px] border-white/[0.03]" />)}
                             </div>
                             
                             {graphData.map((val, i) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    className={`flex-1 rounded-sm ${activeGroup.bg.replace('/10', '/30')} group-hover:${activeGroup.bg.replace('/10', '/60')} transition-all duration-300 border-t border-white/10`}
                                 />
                             ))}
                        </div>
                    </div>

                    {/* Detailed Specs Area */}
                    <div className="grid grid-cols-1 gap-3 h-fit">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-1 ml-2">Logical Components</span>
                        {activeGroup.skills.map((skill, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 glass-win11-mica border border-white/10 rounded-lg flex items-center justify-between group hover:bg-white/5 transition-all"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black uppercase tracking-tight text-white/80 group-hover:text-accent transition-colors">{skill.name}</span>
                                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{skill.speed} Priority</span>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-[10px] font-black font-mono ${activeGroup.color}`}>{skill.level}%</span>
                                    <div className="h-0.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            className={`h-full ${activeGroup.color.replace('text-', 'bg-')}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {[
                        { label: 'Uptime', val: '99.9%', icon: Activity },
                        { label: 'Kernels', val: 'Node-22', icon: HardDrive },
                        { label: 'Threads', val: 'Concurrent', icon: Zap },
                    ].map((s, i) => (
                        <div key={i} className="p-5 glass-win11-mica border border-white/5 rounded-xl flex items-center gap-5 group hover:border-white/20 transition-all cursor-default">
                             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
                                <s.icon size={18} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{s.label}</span>
                                <span className="text-sm font-black tracking-tight text-white/80">{s.val}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="absolute bottom-0 left-0 right-0 h-1 hidden md:block bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default Skills;
