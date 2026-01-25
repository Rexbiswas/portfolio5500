import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { User, Heart, Coffee, Star, Code, Cpu, Globe, Zap } from 'lucide-react';

const About = () => {
    // Stagger container for grid items
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#212121] text-gray-200 p-8 pt-32 pb-20 selection:bg-[#00ebff] selection:text-[#212121]">
            <Navbar />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00ebff] drop-shadow-[0_0_15px_rgba(0,235,255,0.3)]">
                        About <span className="text-gray-200">Me</span>
                    </h1>
                    <p className="text-xl text-gray-400">Coding with passion, designing with purpose.</p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {/* 1. Main Bio (Spans 2 cols, 2 rows) */}
                    <motion.div
                        variants={item}
                        className="col-span-1 md:col-span-2 row-span-2 p-8 rounded-3xl bg-[#212121] shadow-[20px_20px_60px_#1c1c1c,-20px_-20px_60px_#262626] border border-gray-800/10 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-full bg-[#212121] shadow-[inset_5px_5px_10px_#151515,inset_-5px_-5px_10px_#2d2d2d] flex items-center justify-center mb-6">
                                <User className="text-[#00ebff]" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Who am I?</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                I’m a frontend web developer who enjoys turning ideas into fast, responsive, and easy-to-use websites. I focus on building clean user interfaces that look good on every screen and feel smooth to use. I care about details, performance, and writing code that’s easy to maintain. If you need a modern, reliable UI that actually works for users, I’m happy to help.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <span className="px-4 py-2 rounded-full bg-[#1a1a1a] text-sm text-[#00ebff] font-mono border border-gray-800">#OpenToWork</span>
                            <span className="px-4 py-2 rounded-full bg-[#1a1a1a] text-sm text-purple-400 font-mono border border-gray-800">#Developer</span>
                        </div>
                    </motion.div>

                    {/* 2. Experience Stat */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="col-span-1 p-6 rounded-3xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10 flex flex-col items-center justify-center text-center group"
                    >
                        <div className="mb-2 text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-[#00ebff] to-purple-600">
                            1+
                        </div>
                        <div className="text-gray-400 font-medium group-hover:text-[#00ebff] transition-colors">Years Experience</div>
                    </motion.div>

                    {/* 3. Projects Stat */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="col-span-1 p-6 rounded-3xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10 flex flex-col items-center justify-center text-center group"
                    >
                        <div className="mb-2 text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-orange-400 to-red-600">
                            4+
                        </div>
                        <div className="text-gray-400 font-medium group-hover:text-orange-400 transition-colors">Projects Done</div>
                    </motion.div>

                    {/* 4. Focus: UI/UX */}
                    <motion.div
                        variants={item}
                        className="col-span-1 p-6 rounded-3xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10 flex items-center gap-4"
                    >
                        <div className="p-3 rounded-xl bg-[#1a1a1a] text-pink-500">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-bold">UI/UX Design</h3>
                            <p className="text-xs text-gray-500">Pixel Perfect</p>
                        </div>
                    </motion.div>

                    {/* 5. Focus: Clean Code */}
                    <motion.div
                        variants={item}
                        className="col-span-1 p-6 rounded-3xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10 flex items-center gap-4"
                    >
                        <div className="p-3 rounded-xl bg-[#1a1a1a] text-green-500">
                            <Code size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Clean Code</h3>
                            <p className="text-xs text-gray-500">Maintainable</p>
                        </div>
                    </motion.div>

                    {/* 6. Quote / Hobbies (Spans 2 cols) */}
                    <motion.div
                        variants={item}
                        className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-[#212121] shadow-[inset_10px_10px_20px_#1c1c1c,inset_-10px_-10px_20px_#262626] border border-gray-800/10 flex flex-col justify-center items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Coffee size={100} />
                        </div>
                        <p className="text-xl md:text-2xl font-serif italic text-gray-300 relative z-10">
                            "Functionality without design is boring. Design without functionality is decoration."
                        </p>
                    </motion.div>

                    {/* 7. Fast Performance */}
                    <motion.div
                        variants={item}
                        whileHover={{ rotate: -5 }}
                        className="col-span-1 p-6 rounded-3xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10 flex flex-col items-center justify-center text-center"
                    >
                        <Zap size={40} className="text-yellow-400 mb-2" fill="currentColor" />
                        <span className="font-bold text-gray-200">Fast Performance</span>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default About;
