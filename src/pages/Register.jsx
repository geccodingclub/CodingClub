import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Fingerprint, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', collegeId: '', department: '', year: 1
  });
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      showNotification('Identity record created. Welcome to the club.');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration sequence failure';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900/60 backdrop-blur-xl p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Initialize<span className="text-blue-500">_User</span></h2>
          <p className="text-slate-500 font-mono text-sm">// Create your permanent record in the club database</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {[
                { name: 'name', icon: <User size={18} />, placeholder: 'Full Name' },
                { name: 'email', icon: <Mail size={18} />, placeholder: 'College Email', type: 'email' },
                { name: 'password', icon: <Lock size={18} />, placeholder: 'Password', type: 'password' },
              ].map((f) => (
                <div key={f.name} className="group/input">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                    <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors">{f.icon}</span>
                    <input
                      required
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      className="bg-transparent border-none outline-none w-full font-mono text-sm placeholder:text-slate-600"
                      value={formData[f.name]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { name: 'collegeId', icon: <Fingerprint size={18} />, placeholder: 'ID Number' },
                { name: 'department', icon: <BookOpen size={18} />, placeholder: 'Department' },
              ].map((f) => (
                <div key={f.name} className="group/input text-sm">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                    <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors">{f.icon}</span>
                    <input
                      required
                      placeholder={f.placeholder}
                      className="bg-transparent border-none outline-none w-full font-mono placeholder:text-slate-600"
                      value={formData[f.name]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
              
              <div className="group/input">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all text-sm">
                  <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors"><Calendar size={18} /></span>
                  <select 
                    className="bg-transparent border-none outline-none w-full font-mono appearance-none"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  >
                    {[1,2,3,4].map(y => <option key={y} value={y} className="bg-slate-900">{y} Year</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 group/btn uppercase tracking-widest italic mt-8">
            Execute_Registration
            <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-10 text-center font-mono text-xs text-slate-500">
          ALREADY_MEMBER? <Link to="/login" className="text-blue-400 hover:underline hover:text-blue-300">AUTH_NOW</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
