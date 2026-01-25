import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
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
                <div className="h-16 md:h-24 flex items-center justify-center mb-8">
                    <motion.p
                        className="text-lg md:text-3xl lg:text-4xl font-light text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        I am a{' '}
                        <span className="text-[#00ebff] font-semibold inline-block min-w-[20px] relative">
                            {currentWord}
                            <span className="animate-pulse absolute -right-3 top-0 md:top-1 h-full w-[2px] md:w-[3px] bg-[#00ebff]"></span>
                        </span>
                    </motion.p>
                </div>

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

                {/* Floating Abstract 3D-like Shapes */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-[5%] lg:right-[15%] w-20 h-20 lg:w-32 lg:h-32 rounded-3xl bg-linear-to-br from-[#262626] to-[#1a1a1a] shadow-[15px_15px_30px_#151515,-15px_-15px_30px_#2d2d2d] -z-10 hidden md:block border border-gray-700/10"
                />
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-[5%] lg:left-[15%] w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-linear-to-tl from-[#262626] to-[#1a1a1a] shadow-[15px_15px_30px_#151515,-15px_-15px_30px_#2d2d2d] -z-10 hidden md:block border border-gray-700/10"
                />

            </div>
        </div>
    )
}

export default Home
