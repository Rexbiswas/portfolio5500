import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Skills = () => {
    const webSkills = [
        { name: "Html", level: "90%" },
        { name: "React", level: "75%" },
        { name: "JavaScript", level: "85%" },
        { name: "CSS/Tailwind", level: "95%" },
        { name: "Node.js", level: "60%" },
        { name: "UI/UX Design", level: "75%" },
        { name: "Framer Motion", level: "50%" },
    ];

    const programmingSkills = [
        { name: "C", level: "80%" },
        { name: "C++", level: "75%" },
        { name: "R Language", level: "50%" },
        { name: "Python", level: "85%" },
    ];

    const SkillCard = ({ skill, index }) => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-[#212121] shadow-[10px_10px_20px_#1c1c1c,-10px_-10px_20px_#262626] border border-gray-800/10"
        >
            <div className="flex justify-between mb-4">
                <span className="font-bold text-lg tracking-wide">{skill.name}</span>
                <span className="text-[#00ebff] font-mono">{skill.level}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#1a1a1a] shadow-[inset_3px_3px_6px_#121212,inset_-3px_-3px_6px_#222222] overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: skill.level }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-linear-to-r from-[#00ebff] to-purple-500 shadow-[0_0_10px_#00ebff]"
                />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#212121] text-gray-200 p-8 pt-32">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-12 text-[#00ebff] text-center">My Skills</h1>

                <h2 className="text-2xl font-semibold mb-6 text-gray-300 border-l-4 border-[#00ebff] pl-4">Web Technologies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {webSkills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-gray-300 border-l-4 border-[#00ebff] pl-4">Programming Languages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {programmingSkills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Skills;
