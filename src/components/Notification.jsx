import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const Notification = ({ message, type = 'success', onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[320px] ${
        type === 'success' 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
          : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
      }`}
    >
      <div className={`p-2 rounded-lg ${type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
        {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </div>
      
      <div className="flex-1">
        <p className="text-xs font-mono uppercase tracking-widest font-black mb-0.5">
          {type === 'success' ? 'SYSTEM_CONFIRM' : 'SYSTEM_ERROR'}
        </p>
        <p className="text-sm font-medium text-white/90">{message}</p>
      </div>

      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
      >
        <X size={16} />
      </button>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 4, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-0.5 ${type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}
      />
    </motion.div>
  );
};

export default Notification;
