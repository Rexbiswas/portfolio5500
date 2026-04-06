import React from 'react';
import { motion } from 'framer-motion';
import TerminalHero from '../components/TerminalHero';
import { MousePointer2, Zap, Layout, Server, Database } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <TerminalHero />

            {/* Highlights Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-accent">Expertise</span></h2>
                        <p className="text-text-secondary max-w-xl mx-auto">Specialized in building high-performance, visually stunning digital experiences.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 rounded-2xl group transition-all hover:border-accent/30"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Section - Preview of projects maybe? */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="glass p-12 rounded-3xl border-white/5"
                    >
                        <Zap className="mx-auto text-accent mb-6" size={48} />
                        <h2 className="text-4xl font-bold mb-6">Let's build something <span className="text-accent underline decoration-accent/30 underline-offset-8">Extraordinary</span></h2>
                        <p className="text-lg text-text-secondary mb-10 italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
                        >
                            Get In Touch
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        icon: Layout,
        title: "Frontend",
        desc: "Crafting pixel-perfect, responsive interfaces using React and modern CSS."
    },
    {
        icon: Server,
        title: "Backend",
        desc: "Scalable server-side logic and robust API development with Node.js."
    },
    {
        icon: Database,
        title: "Database",
        desc: "Expertise in SQL and NoSQL databases for efficient data management."
    },
    {
        icon: MousePointer2,
        title: "UI/UX",
        desc: "Focusing on user-centric design with intuitive flow and high aesthetics."
    }
];

export default Home;

