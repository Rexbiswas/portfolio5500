import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import resumeFile from '../assets/Rishi_Frontend_CV.pdf';

const Resume = () => {
    return (
        <div className="min-h-screen bg-(--bg-primary) text-gray-200 p-8 pt-32 pb-20">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto flex flex-col items-center"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4 text-(--accent-color)">Resume</h1>
                    <p className="text-gray-400">View or download my resume below.</p>
                </div>

                <motion.div
                    className="relative group cursor-pointer mb-12"
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="relative w-80 h-[420px] bg-(--bg-primary) rounded-4xl shadow-[20px_20px_60px_var(--shadow-color-dark),-20px_-20px_60px_var(--shadow-color-light)] border border-gray-800/20 flex flex-col items-center justify-center overflow-hidden z-10 transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(0,235,255,0.15)]">

                        {/* Animated Border Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-(--accent-color)/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        {/* Icon Container with multi-layered neumorphism */}
                        <div className="relative z-10 p-8 rounded-full bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#121212,inset_-8px_-8px_16px_#222222] group-hover:scale-110 transition-transform duration-500 mb-8 border border-gray-800/30">
                            <FileText size={72} className="text-gray-500 group-hover:text-(--accent-color) transition-colors duration-300 drop-shadow-[0_0_15px_rgba(0,235,255,0.3)]" />

                            {/* Live Status Dot */}
                            <div className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500/80 rounded-full shadow-[0_0_8px_red] group-hover:bg-green-500 group-hover:shadow-[0_0_10px_#00ff00] transition-colors duration-300 border border-gray-900"></div>
                        </div>

                        {/* Document Details */}
                        <div className="mt-4 text-center z-10 space-y-2">
                            <h2 className="text-3xl font-bold text-gray-200 tracking-widest font-mono group-hover:text-(--accent-color) transition-colors duration-300">Rishi's CV</h2>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-green-400 font-mono uppercase tracking-[0.2em] bg-[#1a1a1a] px-3 py-1 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(72,187,120,0.1)]">Verified</span>
                                <span className="text-[10px] text-gray-500 font-mono">PDF • 1.4 MB • Read-Only</span>
                            </div>
                        </div>

                        {/* Tech Grid Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[30px_30px] pointer-events-none"></div>

                        {/* Corner Accents */}
                        <div className="absolute top-6 left-6 w-3 h-3 border-l-2 border-t-2 border-gray-600/50 rounded-tl-lg"></div>
                        <div className="absolute top-6 right-6 w-3 h-3 border-r-2 border-t-2 border-gray-600/50 rounded-tr-lg"></div>
                        <div className="absolute bottom-6 left-6 w-3 h-3 border-l-2 border-b-2 border-gray-600/50 rounded-bl-lg"></div>
                        <div className="absolute bottom-6 right-6 w-3 h-3 border-r-2 border-b-2 border-gray-600/50 rounded-br-lg"></div>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-6">
                    <a
                        href={resumeFile}
                        download="Rishi_Biswas_Resume.pdf"
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-(--bg-primary) text-(--accent-color) font-bold tracking-wider shadow-[8px_8px_16px_var(--shadow-small-dark),-8px_-8px_16px_var(--shadow-small-light)] hover:shadow-[inset_8px_8px_16px_var(--shadow-small-dark),inset_-8px_-8px_16px_var(--shadow-small-light)] hover:scale-[0.98] transition-all duration-300 border border-gray-800/10"
                    >
                        <Download size={20} />
                        Download PDF
                    </a>

                    <a
                        href={resumeFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-(--bg-primary) text-gray-400 font-bold tracking-wider shadow-[8px_8px_16px_var(--shadow-small-dark),-8px_-8px_16px_var(--shadow-small-light)] hover:text-gray-200 hover:shadow-[inset_8px_8px_16px_var(--shadow-small-dark),inset_-8px_-8px_16px_var(--shadow-small-light)] hover:scale-[0.98] transition-all duration-300 border border-gray-800/10"
                    >
                        <Eye size={20} />
                        Open in New Tab
                    </a>
                </div>

            </motion.div>
        </div>
    );
};

export default Resume;
