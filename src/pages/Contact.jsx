import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ExternalLink, Send, Inbox, Star, Trash2, Archive, Flag, ChevronRight, Search, Plus, Filter, Paperclip, Smile, MoreHorizontal, AtSign } from 'lucide-react';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState('email');
    const email = "rexbiswas1@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const channels = [
        {
            id: "email",
            title: "Direct Transmission",
            subject: "New Project Inquiry",
            preview: "Hello Rishi, I would like to discuss a potential collaboration...",
            icon: Mail,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            time: "10:24 AM",
            isNew: true
        },
        {
            id: "linkedin",
            title: "LinkedIn Networking",
            subject: "Professional Connect",
            preview: "Let's connect on LinkedIn to expand our professional network.",
            icon: Linkedin,
            color: "text-sky-500",
            bg: "bg-sky-500/10",
            time: "Yesterday"
        },
        {
            id: "github",
            title: "GitHub Repository",
            subject: "Code Collaboration",
            preview: "Interested in contributing to your open source projects.",
            icon: Github,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            time: "Mon"
        }
    ];

    const SidebarButton = ({ icon: Icon, label, count = 0, active = false }) => (
        <button className={`flex items-center justify-between w-full p-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
            active ? 'bg-white/10 text-accent border border-white/5 shadow-inner' : 'text-white/40 hover:bg-white/5 hover:text-white'
        }`}>
            <div className="flex items-center gap-3">
                <Icon size={14} className={active ? 'text-accent' : 'opacity-40'} />
                <span>{label}</span>
            </div>
            {count > 0 && <span className="bg-accent/20 text-accent px-1.5 py-0.5 rounded-full text-[8px] font-black">{count}</span>}
        </button>
    );

    return (
        <div className="h-full flex flex-col md:flex-row bg-transparent animate-in fade-in duration-700 select-none overflow-hidden">
            {/* Left Sidebar (Mail Folders) */}
            <aside className="w-full md:w-56 bg-white/5 backdrop-blur-3xl border-r border-white/5 flex flex-col p-4 gap-6 pt-6">
                <button className="flex items-center gap-3 p-3 bg-accent text-white rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest">New Message</span>
                </button>

                <div className="flex flex-col gap-1">
                    <SidebarButton icon={Inbox} label="Inbox" count={3} active={true} />
                    <SidebarButton icon={Star} label="Starred" />
                    <SidebarButton icon={Archive} label="Archive" />
                    <SidebarButton icon={Send} label="Sent" />
                    <SidebarButton icon={Trash2} label="Deleted" />
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-3 text-white/30">
                         <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent overflow-hidden border border-white/10">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1776902400&v=beta&t=haMQkDgDqKgyYz0Sw7n2My3VyGo5V5WquDXHhzqRF_8" className="w-full h-full object-cover" />
                        </div>
                         <div className="flex flex-col overflow-hidden">
                            <span className="text-[10px] font-black text-white truncate">Rishi Biswas</span>
                            <span className="text-[8px] font-bold text-white/20 truncate">rexbiswas1@gmail.com</span>
                         </div>
                    </div>
                </div>
            </aside>

            {/* Message List (Inboxes) */}
            <main className="w-full md:w-80 border-r border-white/5 flex flex-col bg-white/3">
                <div className="p-4 flex flex-col gap-4 border-b border-white/5">
                    <div className="relative group">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={12} />
                         <input 
                            type="text" 
                            placeholder="Search Mailbox"
                            className="w-full h-8 pl-9 pr-4 rounded-[4px] bg-white/5 border border-white/10 focus:bg-white/10 focus:border-accent/40 outline-none text-[10px] uppercase font-black text-white placeholder:text-white/10"
                        />
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/30 px-1">
                        <span>Sort: Newest First</span>
                        <Filter size={12} className="cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {channels.map((channel) => (
                        <div 
                            key={channel.id}
                            onClick={() => setSelectedChannel(channel.id)}
                            className={`p-4 border-b border-white/5 cursor-pointer transition-all relative group ${
                                selectedChannel === channel.id ? 'bg-accent/5 ring-inset ring-1 ring-accent/20' : 'hover:bg-white/5'
                            }`}
                        >
                            {channel.isNew && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-full" />}
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                     <div className={`w-6 h-6 rounded-md ${channel.bg} flex items-center justify-center ${channel.color}`}>
                                        <channel.icon size={14} />
                                     </div>
                                     <span className={`text-[11px] font-black uppercase tracking-tight ${channel.isNew ? 'text-white' : 'text-white/60'}`}>{channel.title}</span>
                                </div>
                                <span className="text-[9px] text-white/20 font-bold">{channel.time}</span>
                            </div>
                            <h4 className={`text-[11px] font-bold truncate mb-1 pr-6 ${channel.isNew ? 'text-accent' : 'text-white/40'}`}>{channel.subject}</h4>
                            <p className="text-[10px] text-white/20 line-clamp-2 leading-tight">{channel.preview}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Message Detail View (Communication Form) */}
            <section className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
                <header className="p-4 md:p-8 border-b border-white/5 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full glass-win11-mica border border-white/10 flex items-center justify-center text-accent shadow-xl overflow-hidden">
                                {selectedChannel === 'email' && <Mail size={24} />}
                                {selectedChannel === 'linkedin' && <Linkedin size={24} className="text-sky-500" />}
                                {selectedChannel === 'github' && <Github size={24} className="text-purple-400" />}
                             </div>
                             <div className="flex flex-col">
                                <h2 className="text-xl font-black tracking-tighter uppercase">{channels.find(c => c.id === selectedChannel).title}</h2>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{channels.find(c => c.id === selectedChannel).subject}</span>
                             </div>
                         </div>
                         <div className="flex items-center gap-2">
                             <button className="p-2 hover:bg-white/10 rounded transition-colors text-white/40"><Archive size={16} /></button>
                             <button className="p-2 hover:bg-white/10 rounded transition-colors text-white/40"><Flag size={16} /></button>
                             <button className="p-2 hover:bg-white/10 rounded transition-colors text-white/40"><Trash2 size={16} /></button>
                             <div className="w-px h-4 bg-white/10 mx-2" />
                             <button className="p-2 hover:bg-white/10 rounded transition-colors text-white/40"><MoreHorizontal size={16} /></button>
                         </div>
                    </div>
                </header>

                <div className="flex-1 p-4 md:p-10 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                    {/* Simulated Message Entry */}
                    <div className="glass-win11-mica border border-white/10 rounded-2xl p-8 shadow-2xl relative group overflow-hidden max-w-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 scale-150 text-accent group-hover:scale-125 transition-transform">
                            <AtSign size={100} />
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Action Required</h5>
                        <p className="text-lg font-bold text-white/90 leading-relaxed italic mb-8">
                            "Connecting with world-class engineers is just one signal away. Choose your frequency and let's build the future."
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5 hover:border-white/15 transition-all">
                                <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Mail size={20} /></div>
                                     <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Official Mail</span>
                                        <span className="text-xs font-bold text-white/80">{email}</span>
                                     </div>
                                </div>
                                <button 
                                    onClick={handleCopyEmail}
                                    className="p-2 px-4 glass border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all active:scale-95"
                                >
                                    {copied ? <Check size={14} className="text-emerald-400" /> : 'Copy'}
                                </button>
                            </div>

                            <a 
                                href="https://www.linkedin.com/in/rishi-biswas-0474a6258/" 
                                target="_blank"
                                className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5 hover:border-white/15 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500"><Linkedin size={20} /></div>
                                     <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Professional Channel</span>
                                        <span className="text-xs font-bold text-white/80">rishi-biswas</span>
                                     </div>
                                </div>
                                <ExternalLink size={14} className="text-white/20 group-hover:text-sky-500 transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Reply Form (Bottom Bar Style) */}
                <div className="p-4 md:p-6 bg-white/3 backdrop-blur-3xl border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-white/20 px-2">
                        <Paperclip size={16} className="cursor-pointer hover:text-white transition-colors" />
                        <Smile size={16} className="cursor-pointer hover:text-white transition-colors" />
                        <div className="h-4 w-px bg-white/10 mx-1" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Message Input...</span>
                    </div>
                    <div className="flex items-center gap-4">
                         <input 
                            type="text" 
                            placeholder="Type your message to Rishi..." 
                            className="flex-1 h-12 glass-win11-mica border border-white/10 rounded-xl px-6 text-sm font-medium outline-none focus:border-accent/40 transition-all placeholder:text-white/10"
                        />
                        <button className="h-12 w-12 flex items-center justify-center bg-accent text-white rounded-xl shadow-xl shadow-accent/20 hover:brightness-110 active:scale-95 transition-all">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
