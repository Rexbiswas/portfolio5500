import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FileText, Code, Github, Linkedin, Zap, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'About', icon: User, path: '/about' },
        { name: 'Skills', icon: Zap, path: '/skills' },
        { name: 'Projects', icon: Code, path: '/projects' },
        { name: 'Resume', icon: FileText, path: '/resume' },
    ];

    const socialItems = [
        { name: 'Github', icon: Github, url: 'https://github.com/Rexbiswas' },
        { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/rishi-biswas-0474a6258/' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
                    scrolled ? 'bg-bg-primary/20 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg overflow-hidden border border-white/10">
                             <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_800_800/B56ZbxSlyxHUAk-/0/1747804906029?e=1770854400&v=beta&t=MoqHomppPlOsXYEIgvgzTjpqWW_BVKCFywDVcmIaOM"
                                alt="Rishi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">
                            Rishi<span className="text-accent underline decoration-accent/30 underline-offset-4">Biswas</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 glass p-1 rounded-full border-white/5">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all hover:text-white ${
                                    location.pathname === item.path ? 'text-white' : 'text-text-secondary'
                                }`}
                            >
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Socials & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-3">
                            {socialItems.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all shadow-sm"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                        
                        <button 
                            className="md:hidden w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center text-text-secondary"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm glass-card z-[70] p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-xl font-bold">Menu</span>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
                                {navItems.map((item, idx) => (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => {
                                            navigate(item.path);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-4 text-2xl font-semibold transition-all ${
                                            location.pathname === item.path ? 'text-accent' : 'text-text-secondary'
                                        }`}
                                    >
                                        <item.icon size={24} />
                                        {item.name}
                                    </motion.button>
                                ))}
                            </nav>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <div className="flex gap-4">
                                    {socialItems.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center text-text-secondary"
                                        >
                                            <social.icon size={22} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

