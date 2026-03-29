import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Users, ChevronRight, Binary, Cpu, Globe } from 'lucide-react';
import Terminal from '../components/Terminal';
import FeaturedEvent from '../components/FeaturedEvent';
import TeamSection from '../components/TeamSection';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Landing = () => {
  const [stats, setStats] = useState({ verifiedCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://coding-r06j.onrender.com'}/api/users/public-stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="relative">
      {/* ======== HERO SECTION ======== */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold mb-6 tracking-[0.2em] uppercase"
            >
              <Binary size={14} />
              <span>Next Gen Developers</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 md:mb-8 leading-[1.05] tracking-tight"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              Zero to <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-white/40 max-w-xl mb-10 leading-relaxed font-mono"
            >
              think. code. evolve.<br />
              The ultimate ecosystem for student innovators.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/register" className="btn-white text-base px-8 py-4 group">
                <span>Initialize Profile</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <a 
                href="https://github.com/geccodingclub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4"
              >
                <Github size={18} />
                <span>Explore Code</span>
              </a>
            </motion.div>
          </div>

          <div className="flex-1 w-full lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, rotateY: 15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="perspective-1000"
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======== STATS SECTION ======== */}
      <section 
        className="py-16 border-y border-white/[0.04]"
        style={{ background: 'rgba(10, 10, 10, 0.4)' }}
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: 'Lines of Code', value: '1K+' },
            { label: 'Hackathons', value: '2' },
            { label: 'Active Members', value: `${stats.verifiedCount}+` },
            { label: 'Projects Shipped', value: '1+' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======== FEATURED EVENT ======== */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-3"
            >
              Don't Miss This
            </motion.h2>
            <p className="font-mono text-sm text-white/25">Our next big event is right around the corner</p>
          </div>
          <FeaturedEvent />
        </div>
      </section>

      {/* ======== TECH GRID ======== */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-extrabold mb-4 text-white"
          >
            Powered by Innovation
          </motion.h2>
          <p className="text-white/25 font-mono text-sm">Exploring the frontiers of technology</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: <Cpu size={24} />, title: "Systems & AI", desc: "Diving deep into LLMs, neural networks, and high-performance computing." },
            { icon: <Globe size={24} />, title: "Distributed Web", desc: "Building scalable, real-time applications using MERN, Next.js, and WebSockets." },
            { icon: <Binary size={24} />, title: "Competitive Pro", desc: "Mastering algorithms and data structures for world-class competitions." }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-10 rounded-2xl group transition-all duration-300 surface-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-8 text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">{card.title}</h3>
              <p className="text-white/30 leading-relaxed font-mono text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======== TEAM SECTION ======== */}
      <TeamSection />
    </div>
  );
};

export default Landing;
