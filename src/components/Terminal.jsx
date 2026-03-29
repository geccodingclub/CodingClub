import { motion } from 'framer-motion';

const Terminal = () => {
  const lines = [
    { text: 'git init cortex', color: 'text-green-400' },
    { text: 'Initialized empty Git repository...', color: 'text-white/30' },
    { text: 'npm install passion innovation', color: 'text-green-400' },
    { text: 'added 2 packages in 0.5s', color: 'text-white/30' },
    { text: 'npm run grow', color: 'text-green-400' },
    { text: '> Welcome to CORTEX. think. code. evolve.', color: 'text-primary font-bold' },
  ];

  return (
    <div 
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl font-mono text-sm md:text-base"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div 
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ 
          background: 'rgba(255,255,255,0.02)', 
          borderBottom: '1px solid rgba(255,255,255,0.06)' 
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/40" />
        </div>
        <span className="text-white/20 text-[10px] ml-2 font-mono tracking-wide">bash — cortex</span>
      </div>
      <div className="p-6 space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, ease: 'easeOut' }}
            className="flex gap-3"
          >
            <span className="text-primary shrink-0">$</span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-5 bg-primary ml-6 rounded-[1px]"
        />
      </div>
    </div>
  );
};

export default Terminal;
