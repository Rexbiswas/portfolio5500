import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Layers, Smartphone, Globe } from 'lucide-react';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            category: "Web App",
            description: "A fully functional online store with cart management, user authentication, and payment gateway integration.",
            tags: ["React", "Redux", "Node.js", "MongoDB"],
            image: "from-blue-500/20 to-cyan-500/20",
            icon: Globe
        },
        {
            id: 2,
            title: "Task Management App",
            category: "Productivity",
            description: "Smart task manager with drag-and-drop kanban boards and real-time collaboration features.",
            tags: ["React", "Firebase", "Tailwind"],
            image: "from-purple-500/20 to-pink-500/20",
            icon: Layers
        },
        {
            id: 3,
            title: "Social Media Dashboard",
            category: "Web Design",
            description: "Analytics dashboard aggregating data from multiple social platforms with interactive charts.",
            tags: ["Next.js", "Chart.js", "API Integration"],
            image: "from-orange-500/20 to-red-500/20",
            icon: Smartphone
        }
    ];

    const filters = ["All", "Web App", "Productivity", "Web Design"];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-[#212121] text-gray-200 p-8 pt-32 pb-20 selection:bg-[#00ebff] selection:text-[#212121]">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-500 drop-shadow-[5px_5px_10px_rgba(0,0,0,0.3)]"
                    >
                        Featured <span className="text-[#00ebff]">Work</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore a collection of my digital creations, ranging from complex web applications to intuitive design systems.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border border-gray-800/20
                                ${filter === f
                                    ? 'bg-[#212121] text-[#00ebff] shadow-[inset_5px_5px_10px_#151515,inset_-5px_-5px_10px_#2d2d2d]'
                                    : 'bg-[#212121] text-gray-500 shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2d2d2d] hover:text-gray-300 hover:shadow-[7px_7px_14px_#151515,-7px_-7px_14px_#2d2d2d]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-[#212121] rounded-3xl p-6 shadow-[20px_20px_60px_#1c1c1c,-20px_-20px_60px_#262626] hover:shadow-[25px_25px_70px_#1a1a1a,-25px_-25px_70px_#282828] transition-all duration-300 border border-gray-800/10"
                            >
                                {/* Image / Preview Area (Inset Shadow) */}
                                <div className={`h-64 rounded-2xl bg-linear-to-br ${project.image} shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.05)] mb-6 flex items-center justify-center relative overflow-hidden`}>
                                    <project.icon size={64} className="text-white/20 group-hover:text-white/40 transition-colors duration-500 transform group-hover:scale-110" />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                        <a
                                            href="#"
                                            className="p-3 rounded-full bg-[#212121] text-[#00ebff] shadow-[5px_5px_10px_black] hover:scale-110 transition-transform"
                                            title="View Code"
                                        >
                                            <Github size={24} />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-3 rounded-full bg-[#212121] text-[#00ebff] shadow-[5px_5px_10px_black] hover:scale-110 transition-transform"
                                            title="Live Demo"
                                        >
                                            <ExternalLink size={24} />
                                        </a>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-2xl font-bold text-gray-200 group-hover:text-[#00ebff] transition-colors">
                                            {project.title}
                                        </h3>
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1a1a1a] text-gray-400 border border-gray-800">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-sm font-medium rounded-lg bg-[#212121] text-gray-400 shadow-[3px_3px_6px_#181818,-3px_-3px_6px_#2a2a2a]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Projects;
