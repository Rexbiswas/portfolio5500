import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FileText, Code, Github, Linkedin, Twitter, Zap } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Home');
    const [hoveredTab, setHoveredTab] = useState(null);

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = navItems.find(item => item.path === currentPath);
        if (activeItem) {
            setActiveTab(activeItem.name);
        }
    }, [location]);

    const handleNavigation = (path, name) => {
        setActiveTab(name);
        navigate(path);
    };

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'About', icon: User, path: '/about' },
        { name: 'Skills', icon: Zap, path: '/skills' },
        { name: 'Projects', icon: Code, path: '/projects' },
        { name: 'Show CV', icon: FileText, path: '/resume' },
    ];

    const socialItems = [
        { name: 'Github', icon: Github, url: 'https://github.com/Rexbiswas' },
        { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/rishi-biswas-0474a6258/' },
    ];

    return (
        <div className="fixed top-8 left-0 right-0 flex justify-center z-50 px-6 navbar-container">
            <nav className="flex items-center justify-between px-3 md:px-6 py-3 rounded-full bg-(--bg-primary) shadow-[15px_15px_30px_var(--shadow-color-dark),-15px_-15px_30px_var(--shadow-color-light)] border border-gray-800/20 max-w-6xl w-full gap-2 md:gap-6 transition-colors duration-300">


                <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-(--bg-primary) shadow-[5px_5px_10px_var(--shadow-small-dark),-5px_-5px_10px_var(--shadow-small-light)] flex items-center justify-center p-1 border border-gray-800/10 hover:shadow-[inset_5px_5px_10px_var(--shadow-small-dark),inset_-5px_-5px_10px_var(--shadow-small-light)] transition-all duration-300 cursor-pointer">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_800_800/B56ZbxSlyxHUAk-/0/1747804906029?e=1770854400&v=beta&t=MoqHomppPlAOsXYEIgvgzTjpqWW_BVKCFywDVcmIaOM"
                            alt="Profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://ui-avatars.com/api/?name=Rex+Biswas&background=00ebff&color=212121";
                            }}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <span className="text-(--text-secondary) font-bold text-lg hidden md:block tracking-wide">
                        Rishi <span className="text-(--accent-color)">Biswas</span>
                    </span>
                </div>

                {/* Center: Navigation Items */}
                <div className="flex items-center gap-1 md:gap-6">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => handleNavigation(item.path, item.name)}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 ease-out
                                    ${isActive
                                        ? 'shadow-[inset_5px_5px_10px_var(--shadow-small-dark),inset_-5px_-5px_10px_var(--shadow-small-light)] text-(--accent-color)'
                                        : 'shadow-[5px_5px_10px_var(--shadow-small-dark),-5px_-5px_10px_var(--shadow-small-light)] text-(--text-secondary) hover:text-(--text-primary)'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                                {/* Glowing Dot for Active State */}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeDot"
                                        className="absolute -bottom-2 w-1.5 h-1.5 bg-(--accent-color) rounded-full shadow-[0_0_10px_var(--accent-color)]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Neumorphic Tooltip */}
                                <AnimatePresence>
                                    {hoveredTab === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            className="hidden md:flex absolute top-16 px-3 py-1.5 rounded-xl bg-(--bg-primary) text-(--accent-color) text-xs font-bold tracking-wider shadow-[5px_5px_10px_var(--shadow-small-dark),-5px_-5px_10px_var(--shadow-small-light)] border border-gray-800/20 whitespace-nowrap pointer-events-none z-50 items-center justify-center"
                                        >
                                            {item.name}
                                            <div className="absolute -top-1 w-2 h-2 bg-(--bg-primary) rotate-45 border-l border-t border-gray-800/20"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right: Social Icons */}
                <div className="hidden lg:flex items-center gap-4">
                    {socialItems.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-(--bg-primary) shadow-[5px_5px_10px_var(--shadow-small-dark),-5px_-5px_10px_var(--shadow-small-light)] flex items-center justify-center text-(--text-secondary) hover:text-(--accent-color) transition-colors duration-300 border border-gray-800/10"
                        >
                            <social.icon size={18} />
                        </motion.a>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
