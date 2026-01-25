import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Terminal, Code, Cpu, Globe, Zap, Database, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // Mouse tracking for background effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Dampened movement for smoother feel
        mouseX.set((clientX - centerX) / 15);
        mouseY.set((clientY - centerY) / 15);
    };

    // Typing Effect State
    const words = ["Full Stack Developer", "Frontend Development Specialist", "UI/UX Designer", "Coding Enthusiast"];
    const [currentWord, setCurrentWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 100;
        const fullWord = words[wordIndex % words.length];

        const handleTyping = () => {
            setCurrentWord(prev =>
                isDeleting
                    ? fullWord.substring(0, prev.length - 1)
                    : fullWord.substring(0, prev.length + 1)
            );

            if (!isDeleting && currentWord === fullWord) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end of word
            } else if (isDeleting && currentWord === "") {
                setIsDeleting(false);
                setWordIndex(prev => prev + 1);
            }
        };

        const timer = setTimeout(handleTyping, typeSpeed);
        return () => clearTimeout(timer);
    }, [currentWord, isDeleting, wordIndex]);

    return (
        <div
            className="min-h-screen bg-[#212121] text-gray-200 overflow-hidden relative selection:bg-[#00ebff] selection:text-[#212121]"
            onMouseMove={handleMouseMove}
        >
            <Navbar />

            {/* Interactive Background Blob */}
            <motion.div
                className="fixed top-1/2 left-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-linear-to-r from-[#00ebff]/10 to-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ x: mouseX, y: mouseY }}
            />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">

                {/* Intro Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm md:text-xl font-medium text-[#00ebff] tracking-[0.2em] uppercase mb-4 opacity-80">
                        Hello, World! I am
                    </h2>
                </motion.div>

                {/* Name with Neumorphic/Gradient Style */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    className="mb-8 relative"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-[#e0e0e0] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.3)]">
                        RISHI <br className="md:hidden" /> BISWAS
                    </h1>
                    {/* Subtle text stroke/outline duplicate for depth - optional, kept simple for now */}
                </motion.div>

                {/* Typing Effect Container */}
                {/* Code Snippet Box with Neumorphism */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#212121] rounded-xl p-6 md:p-8 max-w-2xl mx-auto text-left shadow-[inset_5px_5px_10px_#151515,inset_-5px_-5px_10px_#2d2d2d] relative overflow-hidden group mb-12 border border-gray-800/10"
                >
                    {/* Status Bar of Code Window */}
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-700/30 pb-4">
                        <div className="flex gap-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono flex items-center gap-2">
                            <Terminal size={12} />
                            developer.config.js
                        </span>
                    </div>

                    <div className="text-sm md:text-lg font-mono space-y-2 text-gray-400 leading-relaxed">
                        <p><span className="text-purple-400">const</span> <span className="text-yellow-200">profile</span> = <span className="text-blue-400">{'{'}</span></p>
                        <div className="pl-6 space-y-1 border-l-2 border-gray-800 ml-2">
                            <p>name: <span className="text-green-400">'Rishi Biswas'</span>,</p>
                            <p>role: <span className="text-green-400">'<span className="text-(--accent-color) font-bold">{currentWord}<span className="animate-pulse">|</span></span>'</span>,</p>
                            <p>status: <span className="text-orange-400">true</span>,</p>
                            <p>tools: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Node'</span>, <span className="text-green-400">'Design'</span>]</p>
                        </div>
                        <p className="text-blue-400">{'}'}</p>
                    </div>

                    {/* Subtle Corner Accent */}
                    <div className="absolute bottom-0 right-0 p-4 opacity-10">
                        <Code size={64} />
                    </div>
                </motion.div>

                {/* Neumorphic CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-8 mt-4"
                >
                    <button
                        onClick={() => navigate('/projects')}
                        className="px-8 py-4 rounded-2xl bg-[#212121] text-[#00ebff] font-bold tracking-wider shadow-[8px_8px_16px_#151515,-8px_-8px_16px_#2d2d2d] hover:shadow-[inset_8px_8px_16px_#151515,inset_-8px_-8px_16px_#2d2d2d] hover:scale-[0.98] transition-all duration-300 border border-gray-800/10 flex items-center gap-3 group"
                    >
                        View Projects
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => navigate('/contact')}
                        className="px-8 py-4 rounded-2xl bg-[#212121] text-gray-400 font-bold tracking-wider shadow-[8px_8px_16px_#151515,-8px_-8px_16px_#2d2d2d] active:shadow-[inset_8px_8px_16px_#151515,inset_-8px_-8px_16px_#2d2d2d] hover:text-gray-200 transition-all duration-300 border border-gray-800/10 flex items-center gap-3"
                    >
                        Contact Me
                        <Mail size={20} />
                    </button>
                </motion.div>

                {/* Background Grid Pattern for Technical/Coding Vibe */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-20 pointer-events-none"></div>

                {/* Floating Neumorphic Code Keys/Icons */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[12%] right-[5%] md:top-[20%] md:right-[10%] w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-[#212121] shadow-[8px_8px_16px_#151515,-8px_-8px_16px_#2d2d2d] flex items-center justify-center text-gray-500/50 border border-gray-800/10 -z-10"
                >
                    <Code className="w-6 h-6 md:w-9 md:h-9" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[15%] left-[5%] md:bottom-[20%] md:left-[8%] w-14 h-14 md:w-24 md:h-24 rounded-2xl bg-[#212121] shadow-[8px_8px_16px_#151515,-8px_-8px_16px_#2d2d2d] flex items-center justify-center text-gray-500/50 border border-gray-800/10 -z-10"
                >
                    <Database className="w-7 h-7 md:w-10 md:h-10" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[15%] left-[5%] md:top-[25%] md:left-[12%] w-10 h-10 md:w-16 md:h-16 rounded-xl bg-[#212121] shadow-[6px_6px_12px_#151515,-6px_-6px_12px_#2d2d2d] flex items-center justify-center text-gray-500/50 border border-gray-800/10 -z-10"
                >
                    <Hash className="w-5 h-5 md:w-7 md:h-7" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -8, 0]
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-[18%] right-[5%] md:bottom-[30%] md:right-[15%] w-10 h-10 md:w-18 md:h-18 rounded-xl bg-[#212121] shadow-[6px_6px_12px_#151515,-6px_-6px_12px_#2d2d2d] flex items-center justify-center text-gray-500/50 border border-gray-800/10 -z-10"
                >
                    <Cpu className="w-5 h-5 md:w-8 md:h-8" />
                </motion.div>

            </div>
        </div>
    )
}

export default Home
