import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ExternalLink, Terminal, Cpu } from 'lucide-react';

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const email = "rexbiswas1@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const contactMethods = [
        {
            id: "email",
            title: "Email Access",
            value: email,
            icon: Mail,
            action: handleCopyEmail,
            secondaryIcon: copied ? Check : Copy,
            color: "text-green-400",
            delay: 0.2
        },
        {
            id: "github",
            title: "Code Repository",
            value: "github.com/Rexbiswas",
            icon: Github,
            link: "https://github.com/Rexbiswas",
            secondaryIcon: ExternalLink,
            color: "text-purple-400",
            delay: 0.3
        },
        {
            id: "linkedin",
            title: "Professional Network",
            value: "linkedin.com/in/rishi-biswas",
            icon: Linkedin,
            link: "https://www.linkedin.com/in/rishi-biswas-0474a6258/",
            secondaryIcon: ExternalLink,
            color: "text-blue-400",
            delay: 0.4
        },
        {
            id: "location",
            title: "Base Operations",
            value: "India",
            icon: MapPin,
            color: "text-red-400",
            delay: 0.5,
            static: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#212121] text-gray-200 selection:bg-[#00ebff] selection:text-[#212121] overflow-hidden relative">
            <Navbar />

            {/* Background Grid Pattern (Consistent with Home) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10 min-h-screen flex flex-col items-center justify-center">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-gray-800 text-[#00ebff] text-sm font-mono mb-6 shadow-[inset_2px_2px_4px_#101010,inset_-2px_-2px_4px_#262626]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ebff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ebff]"></span>
                        </span>
                        System Online
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-500 drop-shadow-md">
                        Establish <span className="text-[#00ebff]">Connection</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Select a secure channel to initiate communication protocol.
                    </p>
                </motion.div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {contactMethods.map((method) => (
                        <motion.div
                            key={method.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: method.delay, type: "spring" }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            <div
                                onClick={() => {
                                    if (method.action) method.action();
                                    if (method.link) window.open(method.link, '_blank');
                                }}
                                className={`
                                    relative p-8 rounded-3xl bg-[#212121] 
                                    shadow-[15px_15px_30px_#1a1a1a,-15px_-15px_30px_#282828] 
                                    hover:shadow-[inset_5px_5px_10px_#1a1a1a,inset_-5px_-5px_10px_#282828] 
                                    transition-all duration-300 border border-gray-800/10 cursor-pointer overflow-hidden
                                    ${method.id === 'email' && copied ? 'border-[#00ebff]/50' : ''}
                                `}
                            >
                                {/* Decorative Circuit Lines */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Cpu size={100} />
                                </div>

                                <div className="flex items-start justify-between relative z-10">
                                    <div className={`p-4 rounded-2xl bg-[#212121] shadow-[5px_5px_10px_#181818,-5px_-5px_10px_#2a2a2a] ${method.color} mb-6`}>
                                        <method.icon size={32} />
                                    </div>

                                    {!method.static && (
                                        <div className={`text-gray-500 group-hover:text-[#00ebff] transition-colors duration-300`}>
                                            <method.secondaryIcon size={20} />
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-gray-500 text-sm font-mono tracking-wider mb-2 uppercase">{method.title}</h3>
                                    <p className={`text-xl md:text-2xl font-bold text-gray-200 group-hover:text-[#00ebff] transition-colors break-words ${method.id === 'email' && copied ? 'text-[#00ebff]' : ''}`}>
                                        {method.id === 'email' && copied ? 'Copied to Clipboard!' : method.value}
                                    </p>
                                </div>

                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#00ebff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Terminal Decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 w-full max-w-2xl hidden md:block"
                >
                    <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-xs text-gray-500 shadow-[inset_2px_2px_5px_black]">
                        <div className="flex gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <p className="typing-effect">
                            <span className="text-green-500">user@portfolio:~$</span> initiating_contact_sequence.sh<br />
                            <span className="text-blue-500">System:</span> Channels open. Waiting for input...<br />
                            <span className="animate-pulse">_</span>
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Contact;
