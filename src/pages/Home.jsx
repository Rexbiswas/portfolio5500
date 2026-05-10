import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative min-h-screen pt-32 pb-24 px-6 bg-white"
        >
            <Navbar />
            
            <div className="max-w-7xl mx-auto">



            </div>
        </motion.div>
    );
};

const ProjectPreview = ({ title, type, color }) => (
    <motion.div 
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`aspect-video rounded-3xl ${color} border border-black/5 p-12 flex flex-col justify-end group cursor-pointer relative overflow-hidden`}
    >
        <div className="absolute top-0 right-0 p-8 text-black">
            <MousePointer2 className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform" />
        </div>
        <div className="flex flex-col gap-2 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/30">{type}</span>
            <h3 className="text-2xl font-black text-black group-hover:text-[#66ad69] transition-colors">{title}</h3>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
);

export default Home;
