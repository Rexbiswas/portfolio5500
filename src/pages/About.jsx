import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Globe, Zap, Sparkles, Shield, Monitor, HardDrive, Key, Smartphone, Info, ExternalLink, ChevronRight, Copy } from 'lucide-react';

const About = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    const SectionHeader = ({ title, icon: Icon }) => (
        <div className="flex items-center gap-2 mb-4 mt-8 opacity-60">
            <Icon size={14} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{title}</span>
        </div>
    );

    const SettingsCard = ({ icon: Icon, title, desc, action = "Copy", color = "text-accent" }) => (
        <motion.div 
            variants={item}
            className="group flex items-center justify-between p-4 glass-win11-mica border border-white/5 rounded-lg hover:bg-white/5 hover:border-white/10 transition-all cursor-default"
        >
            <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${color} shadow-inner border border-white/5 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-white group-hover:text-accent transition-colors">{title}</span>
                    <span className="text-[11px] text-white/40 font-medium leading-tight">{desc}</span>
                </div>
            </div>
            <button className="px-5 py-1.5 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all active:scale-95">
                {action}
            </button>
        </motion.div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-12 h-full overflow-y-auto custom-scrollbar select-none animate-in fade-in duration-700">
            {/* Windows 11 Header Style */}
            <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-white/5 pb-10">
                <div className="w-28 h-28 rounded-[2.5rem] glass-win11-mica flex items-center justify-center text-accent shadow-2xl border border-white/10 ring-4 ring-white/5 relative group overflow-hidden">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1776902400&v=beta&t=haMQkDgDqKgyYz0Sw7n2My3VyGo5V5WquDXHhzqRF_8" 
                        alt="Rishi Biswas"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-center md:text-left pt-2">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <h1 className="text-4xl font-black tracking-tighter">Rishi Biswas</h1>
                        <div className="px-2 py-0.5 rounded-[4px] bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase text-emerald-400 tracking-widest">PRO</div>
                    </div>
                    <p className="text-base text-text-secondary font-bold opacity-60">Full-Stack Creative Engineer</p>
                    <div className="flex items-center gap-4 mt-6">
                        <button className="px-8 py-2.5 rounded-full bg-accent text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-[0_10px_30px_rgba(56,189,248,0.3)] transition-all active:scale-95 border border-white/10">
                            Rename PC
                        </button>
                        <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1">
                             System Information <ExternalLink size={12} />
                        </button>
                    </div>
                </div>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-1"
            >
                <SectionHeader title="Device Specifications" icon={Monitor} />
                
                <SettingsCard 
                    icon={User} 
                    title="User Profile" 
                    desc="Rishi Biswas — Owner & Lead Developer" 
                    action="Manage" 
                    color="text-blue-400"
                />
                
                <SettingsCard 
                    icon={Cpu} 
                    title="Processor Intelligence" 
                    desc="Hybrid MERN Engine with Next.js Overdrive" 
                    color="text-amber-400"
                />
                
                <SettingsCard 
                    icon={HardDrive} 
                    title="Core Architecture" 
                    desc="10+ Digital Products deployed across global networks" 
                    color="text-emerald-400"
                />

                <SectionHeader title="System Capabilities" icon={Zap} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <motion.div 
                        variants={item}
                        className="p-6 glass-win11-mica border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 hover:border-accent/30 transition-all cursor-default group"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 transition-transform">
                            <Shield size={32} />
                        </div>
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest">High Security</h3>
                            <p className="text-[11px] text-white/40 mt-1">Clean, maintainable, and enterprise-grade architecture.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={item}
                        className="p-6 glass-win11-mica border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 hover:border-amber-500/30 transition-all cursor-default group"
                    >
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                            <Sparkles size={32} />
                        </div>
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest">Visual Excellence</h3>
                            <p className="text-[11px] text-white/40 mt-1">Stunning UI/UX that blends art with technical precision.</p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 p-8 rounded-3xl glass-win11-mica border border-white/5 text-center relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12 group-hover:opacity-10 transition-opacity">
                        <Globe size={180} />
                     </div>
                     <p className="text-xl font-bold tracking-tight text-white/90 leading-tight italic">
                        "Great design is invisible. It’s the seamless intersection of function and delight."
                     </p>
                     <div className="mt-4 flex items-center justify-center gap-2 text-accent text-[9px] font-black uppercase tracking-widest">
                        <span>——</span> System Hash: RISHI-BIOS-5500
                     </div>
                </div>
            </motion.div>

            <footer className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between opacity-30">
                <div className="flex items-center gap-2">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Windows Core 11 / Build 22H2</span>
                </div>
                <span className="text-[9px] font-bold">© 2026 Rishi Biswas Developer Services</span>
            </footer>
        </div>
    );
};

export default About;
