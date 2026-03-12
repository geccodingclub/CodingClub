import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Home, ChevronRight } from 'lucide-react';
import Background from '../components/Background';

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Background />
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-500 mb-6 mx-auto">
            <Terminal size={48} />
          </div>
          
          <h1 className="text-8xl font-black italic tracking-tighter text-white mb-2 leading-none">
            404<span className="text-blue-500">_</span>
          </h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.2em] mb-8">
            // Error: Request_Target_Not_Found
          </p>
          
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl mb-12">
            <p className="text-slate-300 text-lg leading-relaxed">
              The sector you are trying to access is either restricted or does not exist in our current database index.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-600/20 group"
            >
              <Home size={18} />
              Return_Home
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm transition-all"
            >
              Access_Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

export default NotFound;
