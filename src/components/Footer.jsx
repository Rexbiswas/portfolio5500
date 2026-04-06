import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronRight, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, url: 'https://github.com/Rexbiswas', label: 'Github' },
        { icon: Linkedin, url: 'https://www.linkedin.com/in/rishi-biswas-0474a6258/', label: 'LinkedIn' },
        { icon: Mail, url: 'mailto:rexbiswas1@gmail.com', label: 'Email' },
    ];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Skills', path: '/skills' },
        { name: 'Projects', path: '/projects' },
        { name: 'Resume', path: '/resume' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <footer className="relative pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
            
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6">
                             <div className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent border border-white/10 group-hover:scale-110 transition-transform">
                                    <span className="font-black text-xl">R</span>
                                </div>
                                <span className="font-bold text-2xl">
                                    Rishi<span className="text-accent">.</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-text-secondary leading-relaxed mb-8 max-w-xs">
                            Architecting modern digital experiences with a focus on performance, aesthetics, and user-centric design.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 relative inline-block">
                            Navigation
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
                        </h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path}
                                        className="text-text-secondary hover:text-accent flex items-center gap-2 group transition-colors"
                                    >
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services/Status */}
                    <div>
                         <h3 className="text-lg font-bold mb-8 relative inline-block">
                            Current Status
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
                        </h3>
                        <div className="space-y-6">
                            <div className="glass p-4 rounded-2xl border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                    <span className="text-sm font-semibold">Available for Work</span>
                                </div>
                                <p className="text-xs text-text-secondary">Open for freelance and full-time opportunities.</p>
                            </div>
                            
                            <div className="text-text-secondary text-sm space-y-2">
                                <p className="flex items-center gap-2 font-mono">
                                    <span className="w-1 h-1 rounded-full bg-accent" />
                                    Based in India
                                </p>
                                <p className="flex items-center gap-2 font-mono">
                                    <span className="w-1 h-1 rounded-full bg-accent" />
                                    GMT +5:30
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter/CTA */}
                    <div>
                         <h3 className="text-lg font-bold mb-8 relative inline-block">
                            Latest Transmission
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
                        </h3>
                        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                            Interesed in collaborating or just want to say hi? Drops a message.
                        </p>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/contact')}
                            className="w-full py-4 rounded-2xl bg-accent text-bg-primary font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all flex items-center justify-center gap-2"
                        >
                            Initiate Contact
                        </motion.button>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-text-secondary font-mono">
                        &copy; {currentYear} <span className="text-text-primary font-bold">Rishi Biswas</span>. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span>Crafted with</span>
                        <Heart size={14} className="text-red-500 animate-pulse fill-red-500/20" />
                        <span>using <span className="text-text-primary font-medium hover:text-accent cursor-default transition-colors">React & Tailwind</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

