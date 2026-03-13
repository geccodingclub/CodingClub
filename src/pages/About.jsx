import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, Shield, Sparkles, Code2 } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Target className="text-blue-400" />,
            title: "Zero to One",
            desc: "We don't just optimize what exists; we build what doesn't. Our focus is on true innovation and first-principles thinking."
        },
        {
            icon: <Zap className="text-purple-400" />,
            title: "Rapid Iteration",
            desc: "Build, breaking, and shipping. We believe in the power of fast feedback loops and constant learning."
        },
        {
            icon: <Users className="text-pink-400" />,
            title: "Deep Collaboration",
            desc: "Coding is a team sport. We foster an environment where silos are broken and collective intelligence thrives."
        }
    ];

    const stats = [
        { label: "Open Source Projects", value: "1+" },
        { label: "Hackathons Hosted", value: "2" }
    ];

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8"
                    >
                        <Sparkles size={14} />
                        <span>Our_Origin_Story</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic"
                    >
                        More Than Just <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            A_Coding_Club.
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto font-mono text-lg leading-relaxed"
                    >
                        // We are a collective of thinkers, builders, and dreamers at GEC. <br />
                        // Engineering the future, one pull request at a time.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-40">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm group hover:border-blue-500/30 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-blue-600/20 transition-colors">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight italic">{value.title}</h3>
                            <p className="text-slate-400 font-mono text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Philosophy Section */}
                <div className="relative rounded-[3rem] overflow-hidden mb-40 border border-white/5 bg-slate-900/20 py-24 px-8 md:px-20 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic">
                                Why We Exist <br />
                                <span className="text-blue-500">_Initiative 01</span>
                            </h2>
                            <div className="space-y-6 text-slate-400 font-mono text-base leading-relaxed">
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
                                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <p className="text-3xl font-black text-white mb-2 tracking-tighter italic">{stat.value}</p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link 
                            to="/register" 
                            className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-blue-400 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20 flex items-center gap-4"
                        >
                            <Code2 />
                            <span>Join_The_Movement</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
