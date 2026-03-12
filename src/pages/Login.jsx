import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ChevronRight, Terminal as TerminalIcon } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-10 rounded-2xl border border-white/5 shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
        
        <div className="mb-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
            <TerminalIcon size={32} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Auth<span className="text-blue-500">_Portal</span></h2>
          <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">// Identity verification required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Member_Email</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
              <Mail size={18} className="text-slate-500" />
              <input
                required
                type="email"
                placeholder="root@club.edu"
                className="bg-transparent border-none outline-none w-full font-mono text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Access_Key</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
              <Lock size={18} className="text-slate-500" />
              <input
                required
                type="password"
                placeholder="********"
                className="bg-transparent border-none outline-none w-full font-mono text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 group/btn uppercase tracking-widest italic mt-8">
            Access_Now
            <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-10 text-center font-mono text-xs text-slate-500">
          NOT_REGISTERED? <Link to="/register" className="text-blue-400 hover:underline">NEW_SESSION</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
