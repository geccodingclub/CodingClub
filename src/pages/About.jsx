import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, Sparkles, Github } from 'lucide-react';
import TeamSection from '../components/TeamSection';

const About = () => {
    const values = [
        {
            icon: <Target size={24} className="text-primary" />,
            title: "Zero to One",
            desc: "We don't just optimize what exists; we build what doesn't. Our focus is on true innovation and first-principles thinking."
        },
        {
            icon: <Zap size={24} className="text-purple-400" />,
            title: "Rapid Iteration",
            desc: "Build, break, and ship. We believe in the power of fast feedback loops and constant learning."
        },
        {
            icon: <Users size={24} className="text-cyan-400" />,
            title: "Deep Collaboration",
            desc: "Coding is a team sport. We foster an environment where silos are broken and collective intelligence thrives."
        }
    ];

    const stats = [
        { label: "Open Source Projects", value: "1+" },
        { label: "Hackathons Hosted", value: "2" }
    ];

    return (
        <div className="pt-28 md:pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                    >
                        <Sparkles size={14} />
                        <span>Our Origin Story</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                    >
                        More Than Just <br />
                        <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            A Cortex.
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/35 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed"
                    >
                        We are a collective of thinkers, builders, and dreamers at GEC Bhojpur.<br />
                        think. code. evolve.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-2xl group transition-all duration-300 surface-card-hover"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                {value.icon}
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                            <p className="text-white/30 font-mono text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Philosophy Section */}
                <div 
                    className="relative rounded-2xl lg:rounded-3xl overflow-hidden mb-32 py-20 px-8 md:px-16"
                    style={{
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
                        }}
                    />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-8 leading-tight text-white">
                                Why We Exist
                                <br />
                                <span className="text-primary">Initiative 01</span>
                            </h2>
                            <div className="space-y-5 text-white/35 text-sm leading-relaxed">
                                <p>
                                    Technical education often stops at the theory. We exist to bridge the chasm between academic learning and high-impact shipping.
                                </p>
                                <p>
                                    By providing an environment where failure is encouraged as a data point for success, we enable students to tackle real-world problems with confidence.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <div 
                                    key={i} 
                                    className="p-7 rounded-2xl text-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <p className="font-heading text-3xl font-extrabold text-white mb-2">{stat.value}</p>
                                    <p className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <TeamSection />

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-block"
                    >
                        <Link 
                            to="/register" 
                            className="btn-white text-lg px-12 py-5 shadow-glow-lg"
                        >
                            <Github size={22} />
                            <span>Join The Movement</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
