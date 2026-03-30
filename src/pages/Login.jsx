import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ChevronRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showNotification('Access authorized. Welcome back.');
      navigate(redirectTo);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Authorization failed. Check credentials.', 'error');
      setLoading(false);
    }
  };

  const inputWrapperClass = "flex items-center gap-3 px-4 py-3.5 rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 rounded-2xl shadow-2xl relative surface-card"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl" />
        
        <div className="mb-10 flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="CORTEX Logo" 
            className="w-14 h-14 rounded-2xl object-contain mb-5" 
          />
          <h2 className="font-heading text-2xl font-extrabold tracking-tight">
            Sign <span className="text-primary">In</span>
          </h2>
          <p className="text-white/25 font-mono text-[10px] mt-2 uppercase tracking-[0.15em]">Identity verification required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1">Email</label>
            <div className={inputWrapperClass} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Mail size={16} className="text-white/20" />
              <input
                required
                type="email"
                placeholder="you@email.com"
                className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1">Password</label>
            <div className={inputWrapperClass} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Lock size={16} className="text-white/20" />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className={`w-full mt-6 ${loading ? 'opacity-40 cursor-not-allowed' : ''} btn-primary justify-center py-3.5 text-sm`}
          >
            {loading ? 'Verifying...' : 'Sign In'}
            {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-xs text-white/20">
          Don't have an account? <Link to={`/register${redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}`} className="text-primary hover:text-primary/80 transition-colors duration-300">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
