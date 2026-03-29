import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ChevronRight } from 'lucide-react';
import Background from '../components/Background';

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Background />
      
      <div className="relative z-10 max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-8 mx-auto">
            <AlertTriangle size={40} />
          </div>
          
          <h1 className="font-heading text-8xl md:text-9xl font-extrabold text-white mb-2 leading-none tracking-tight">
            404
          </h1>
          <p className="text-white/25 font-mono text-xs uppercase tracking-[0.2em] mb-8">
            Page Not Found
          </p>
          
          <div className="p-6 rounded-2xl surface-card mb-10">
            <p className="text-white/40 text-sm leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a different URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/" 
              className="btn-primary px-8 py-3.5 text-sm justify-center"
            >
              <Home size={16} />
              Go Home
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/dashboard" 
              className="btn-secondary px-8 py-3.5 text-sm justify-center"
            >
              Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)' }}
        />
      </div>
    </div>
  );
};

export default NotFound;
