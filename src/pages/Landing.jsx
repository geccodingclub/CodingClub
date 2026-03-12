import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Users, Trophy, ChevronRight, Binary, Cpu, Globe } from 'lucide-react';
import Terminal from '../components/Terminal';

const Landing = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase"
            >
              <Binary size={14} />
              <span>Next Gen Developers</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]"
            >
              Zero to <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                One.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 max-w-xl mb-12 leading-relaxed font-mono"
            >
              // The ultimate ecosystem for student innovators. <br />
              // Learn. Build. Ship. Repeat.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/register" className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-lg font-black text-lg transition-all flex items-center gap-3 group relative overflow-hidden">
                <span className="relative z-10">Initialize Profile</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                />
              </Link>
              <button className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg font-bold text-lg transition-all flex items-center gap-2">
                <Code2 size={20} />
                <span>Explore Code</span>
              </button>
            </motion.div>
          </div>

          <div className="flex-1 w-full lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, rotateY: 20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="perspective-1000"
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-800/50 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Lines of Code', value: '1.2M+' },
            { label: 'Hackathons', value: '24' },
            { label: 'Active Members', value: '800+' },
            { label: 'Projects Shipped', value: '150+' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Grid */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black mb-4">Powered by Innovation</h2>
          <p className="text-slate-500 font-mono">Exploring the frontiers of technology</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu />, title: "Systems & AI", desc: "Diving deep into LLMs, neural networks, and high-performance computing." },
            { icon: <Globe />, title: "Distributed Web", desc: "Building scalable, real-time applications using MERN, Next.js, and WebSockets." },
            { icon: <Binary />, title: "Competitive Pro", desc: "Mastering algorithms and data structures for world-class competitions." }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-10 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/40 transition-all group"
            >
              <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center mb-8 border border-white/5 text-blue-400 group-hover:text-blue-300 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed font-mono text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
