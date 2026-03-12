import { motion } from 'framer-motion';

const Terminal = () => {
  const lines = [
    { text: 'git init coding-club', color: 'text-green-400' },
    { text: 'Initialized empty Git repository...', color: 'text-slate-400' },
    { text: 'npm install passion innovation', color: 'text-green-400' },
    { text: 'added 2 packages in 0.5s', color: 'text-slate-400' },
    { text: 'npm run grow', color: 'text-green-400' },
    { text: '> Success! You are now a member.', color: 'text-blue-400 font-bold' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 overflow-hidden shadow-2xl font-mono text-sm md:text-base">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-slate-500 text-xs ml-2">bash — coding-club</span>
      </div>
      <div className="p-6 space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex gap-3"
          >
            <span className="text-blue-500 shrink-0">$</span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-5 bg-blue-500 ml-6"
        />
      </div>
    </div>
  );
};

export default Terminal;
