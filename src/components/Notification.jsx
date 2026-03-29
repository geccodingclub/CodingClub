import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const Notification = ({ message, type = 'success', onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 p-4 rounded-xl border shadow-2xl min-w-[300px] ${
        type === 'success' 
          ? 'bg-emerald-500/5 border-emerald-500/15 text-emerald-400' 
          : 'bg-rose-500/5 border-rose-500/15 text-rose-400'
      }`}
      style={{ 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: type === 'success' 
          ? 'rgba(16, 185, 129, 0.05)' 
          : 'rgba(244, 63, 94, 0.05)',
      }}
    >
      <div className={`p-1.5 rounded-lg ${type === 'success' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
        {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      </div>
      
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold mb-0.5 opacity-60">
          {type === 'success' ? 'Success' : 'Error'}
        </p>
        <p className="text-sm text-white/80">{message}</p>
      </div>

      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/5 rounded-lg transition-colors duration-200 text-white/25 hover:text-white/60"
      >
        <X size={14} />
      </button>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 4, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-[2px] rounded-b-xl ${type === 'success' ? 'bg-emerald-500/60' : 'bg-rose-500/60'}`}
      />
    </motion.div>
  );
};

export default Notification;
