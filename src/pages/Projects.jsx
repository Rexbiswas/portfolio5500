import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Layers, Smartphone, Globe } from 'lucide-react';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            id: 1,
            title: "SneakerHead",
            category: "Web App",
            description: "A modern Sneakerhead web application built with React.js, Three.js, and Framer Motion, featuring immersive 3D sneaker visualizations, smooth animations, and an interactive user experience designed for sneaker enthusiasts.",
            tags: ["React", "FramerMotion", "Threejs", "Tailwind"],
            image: "from-blue-500/20 to-cyan-500/20",
            imageSrc: "https://www.shutterstock.com/image-vector/stylish-vector-icon-sports-shoe-260nw-2657361259.jpg",
            githubUrl: "https://github.com/Rexbiswas/sneakerhead",
            projectUrl: "https://sneakerhead-khaki.vercel.app/"
        },
        {
            id: 2,
            title: "VisualConcept",
            category: "Web Design",
            description: "This visual concept showcases a futuristic concept car presented through an immersive, interactive web experience. Built using React for a component-driven architecture, Tailwind CSS for a clean and modern UI, and Framer Motion for smooth, cinematic animations, the project focuses on blending technology with design storytelling.",
            tags: ["React", "Tailwind", "FramerMotion", "GSAP", "Threejs"],
            image: "from-purple-500/20 to-pink-500/20",
            imageSrc: "https://www.shutterstock.com/image-illustration/styled-racing-car-260nw-285209789.jpg",
            githubUrl: "https://github.com/Rexbiswas/visual_concept",
            projectUrl: "https://visual-concept.vercel.app/"
        },
        {
            id: 3,
            title: "Rockerz",
            category: "Web App",
            description: "A modern and responsive web application built with React that showcases the Rockerz headphone lineup with an intuitive and visually appealing user interface.",
            tags: ["React", "tailwind", "FramerMotion"],
            image: "from-orange-500/20 to-red-500/20",
            imageSrc: "https://media.istockphoto.com/id/1244097573/vector/headphones-minimal-icon-with-sound-waves.jpg?s=612x612&w=0&k=20&c=OvARZEMYt_CM9M9-oJmMZ3O-HtEB-CAKqpGZPSA1acM=",
            githubUrl: "https://github.com/Rexbiswas/rockerz",
            projectUrl: "https://rockerz-kappa.vercel.app/"
        },
        {
            id: 4,
            title: "Coral Cookies",
            category: "Web App",
            description: "A modern and responsive web application built with React that showcases the Rockerz headphone lineup with an intuitive and visually appealing user interface.",
            tags: ["React", "tailwind", "FramerMotion", "Matter.js"],
            image: "from-orange-500/20 to-red-500/20",
            imageSrc: "https://static.vecteezy.com/system/resources/previews/006/735/371/non_2x/cookies-icon-for-website-presentation-symbol-free-vector.jpg",
            githubUrl: "https://github.com/Rexbiswas/rockerz",
            projectUrl: "https://rockerz-kappa.vercel.app/"
        }
    ];

    // "Productivity"

    const filters = ["All", "Web App", "Web Design"];

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
                <div className="w-full flex md:justify-center overflow-x-auto md:overflow-visible py-6 md:py-0 mb-10 md:mb-16 px-6 md:px-0 scrollbar-hide">
                    <div className="flex flex-nowrap md:flex-wrap gap-3 md:gap-4 mx-auto md:mx-0 min-w-min">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-full font-medium transition-all duration-300 border border-gray-800/20 whitespace-nowrap shrink-0
                                    ${filter === f
                                        ? 'bg-[#212121] text-[#00ebff] shadow-[inset_5px_5px_10px_#151515,inset_-5px_-5px_10px_#2d2d2d]'
                                        : 'bg-[#212121] text-gray-500 shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2d2d2d] hover:text-gray-300 hover:shadow-[7px_7px_14px_#151515,-7px_-7px_14px_#2d2d2d]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
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
                                <div className={`h-64 rounded-2xl bg-linear-to-br ${project.imageSrc ? '' : project.image} shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.05)] mb-6 flex items-center justify-center relative overflow-hidden`}>

                                    {project.imageSrc ? (
                                        <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    ) : (
                                        <project.icon size={64} className="text-white/20 group-hover:text-white/40 transition-colors duration-500 transform group-hover:scale-110" />
                                    )}

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-[#212121] text-[#00ebff] shadow-[5px_5px_10px_black] hover:scale-110 transition-transform"
                                            title="View Code"
                                        >
                                            <Github size={24} />
                                        </a>
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
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
