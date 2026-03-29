import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: '#050505' }}>
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial Fade Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,#050505_100%)]" />
      
      {/* Animated Accent Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.2, 0.12],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.18, 0.1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[15%] -right-[10%] w-[45%] h-[45%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)' }}
      />

      {/* Floating Code Fragments */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-[0.06]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${10 + Math.random() * 80}vw`, opacity: 0 }}
            animate={{ 
              y: "-10vh",
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-blue-500/40 text-lg font-mono"
          >
            {['{ }', '</>', '( )', '=>', '[ ]', '/**/', '&&', '||'][i % 8]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Background;
