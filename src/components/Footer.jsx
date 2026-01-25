import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: Github, url: 'https://github.com' },
        { icon: Linkedin, url: 'https://linkedin.com' },
        { icon: Twitter, url: 'https://twitter.com' },
        { icon: Mail, url: 'mailto:contact@rishibiswas.com' }, // Placeholder email
    ];

    return (
        <footer className="bg-[#212121] text-gray-200 pt-20 pb-10 relative overflow-hidden">

            {/* Decorative Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00ebff] to-transparent opacity-50"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Upper Section: CTA */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-[#00ebff] to-purple-500">
                            Ready to Collaborate?
                        </h2>
                        <p className="text-gray-400">Let's build something extraordinary together.</p>
                    </div>

                    <motion.button
                        onClick={() => navigate('/contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-[#212121] text-[#00ebff] font-bold tracking-wider shadow-[8px_8px_16px_#151515,-8px_-8px_16px_#2d2d2d] hover:shadow-[inset_8px_8px_16px_#151515,inset_-8px_-8px_16px_#2d2d2d] transition-all duration-300 border border-gray-800/10"
                    >
                        Say Hello!
                    </motion.button>
                </div>

                {/* Divider with Neumorphic Style */}
                <div className="h-px w-full bg-[#212121] shadow-[0_1px_0_#2d2d2d] mb-12"></div>

                {/* Middle Section: Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-2xl font-bold text-gray-100 mb-4">Rishi<span className="text-[#00ebff]">.</span></h3>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            Crafting pixel-perfect, engaging, and accessible digital experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-bold text-gray-200 mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About', 'Projects', 'Skills', 'Resume', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => navigate(`/${item.toLowerCase()}`)}
                                        className="text-gray-500 hover:text-[#00ebff] transition-colors"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-bold text-gray-200 mb-6">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, color: '#00ebff' }}
                                    className="w-12 h-12 rounded-full bg-[#212121] shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2d2d2d] flex items-center justify-center text-gray-500 border border-gray-800/10 transition-colors"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2d2d2d]">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Rishi Biswas. All rights reserved.
                    </p>

                    

                    {/* Back to Top Button */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#212121] text-[#00ebff] shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2d2d2d] flex items-center justify-center border border-gray-800/10 z-50 md:static md:w-10 md:h-10 md:shadow-[3px_3px_6px_#151515,-3px_-3px_6px_#2d2d2d]"
                        title="Back to Top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                </div>

            </div>

            {/* Background Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-linear-to-t from-[#00ebff]/5 to-transparent pointer-events-none"></div>
        </footer>
    );
};

export default Footer;
