import { useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Download, ShieldCheck, Terminal, Cpu } from 'lucide-react';

const MemberCard = ({ user }) => {
  const cardRef = useRef(null);

  const getRoleTheme = (role) => {
    switch (role) {
      case 'PRESIDENT':
        return {
          primary: 'from-amber-400 to-yellow-600',
          accent: 'text-amber-400',
          bg: 'rgba(251, 191, 36, 0.15)',
          glow: 'bg-amber-500/10',
          border: 'border-amber-500/50',
          label: 'LEGACY_COMMANDER',
          icon: <ShieldCheck size={18} className="text-amber-400" />
        };
      case 'VOLUNTEER':
        return {
          primary: 'from-emerald-400 to-cyan-600',
          accent: 'text-emerald-400',
          bg: 'rgba(16, 185, 129, 0.15)',
          glow: 'bg-emerald-500/10',
          border: 'border-emerald-500/50',
          label: 'CORE_VALIDATOR',
          icon: <Cpu size={18} className="text-emerald-400" />
        };
      default:
        return {
          primary: 'from-blue-400 to-indigo-600',
          accent: 'text-blue-400',
          bg: 'rgba(37, 99, 235, 0.15)',
          glow: 'bg-blue-500/10',
          border: 'border-blue-500/50',
          label: 'SYSTEM_OPERATOR',
          icon: <Terminal size={18} className="text-blue-400" />
        };
    }
  };

  const theme = getRoleTheme(user.role);

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      download(dataUrl, `coding_club_card_${user.rollNo}.png`);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 w-full max-w-full overflow-hidden">
      {/* Card Container */}
      <div 
        ref={cardRef}
        className={`w-full max-w-[400px] aspect-[400/580] bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border ${theme.border}`}
        style={{
          backgroundImage: `radial-gradient(circle at top right, ${theme.bg} 0%, transparent 70%)`,
        }}
      >
        {/* Decorative Background Elements */}
        <div className={`absolute top-0 right-0 w-40 h-40 ${theme.glow} blur-3xl rounded-full -mr-20 -mt-20`} />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/40 blur-3xl rounded-full -ml-32 -mb-32" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                Coding<span className={`bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>_Club</span>
              </h2>
              <p className={`text-[9px] font-mono ${theme.accent} uppercase tracking-[0.3em] font-bold mt-2`}>GEC BHOJPUR // {theme.label}</p>
            </div>
            <div className={`w-12 h-12 border ${theme.border} rounded-xl flex items-center justify-center ${theme.accent} bg-white/5 backdrop-blur-md shadow-inner`}>
              {theme.icon}
            </div>
          </div>

          {/* Photo Section */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className={`w-40 h-40 rounded-3xl overflow-hidden border-2 ${theme.border} shadow-[0_0_40px_rgba(0,0,0,0.4)] bg-slate-900 transition-transform duration-500 group-hover:scale-105`}>
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-slate-700`}>
                    <Cpu size={56} />
                  </div>
                )}
              </div>
              {user.isVerified && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -bottom-3 -right-3 ${user.role === 'PRESIDENT' ? 'bg-amber-500' : 'bg-blue-600'} text-white p-2 rounded-xl border-4 border-slate-950 shadow-2xl z-20`}
                >
                  <ShieldCheck size={20} />
                </motion.div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-3 drop-shadow-lg">{user.name}</h1>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border ${theme.border} rounded-full text-[10px] font-black tracking-[0.2em] ${theme.accent} uppercase mb-8 shadow-inner`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'PRESIDENT' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
              DEPT_RANK: {user.role}
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-left mt-4 px-4">
              <div>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Access_ID</p>
                <p className="text-sm font-black text-slate-200 tracking-wider">#{user.rollNo}</p>
              </div>
              <div>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Division</p>
                <p className="text-sm font-black text-slate-200 truncate">{user.department}</p>
              </div>
              <div>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Batch_Year</p>
                <p className="text-sm font-black text-slate-200">{user.year}nd Phase</p>
              </div>
              <div>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Auth_Date</p>
                <p className="text-sm font-black text-slate-200">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 rounded bg-slate-900 border border-white/5">
                <p className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">System_Online</p>
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] font-black italic">ROOT_GEC_BHP</p>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={downloadCard}
        className={`flex items-center gap-4 px-12 py-5 bg-gradient-to-r ${theme.primary} text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] italic shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all`}
      >
        <Download size={20} />
        Generate_Social_Asset
      </motion.button>
    </div>
  );
};

export default MemberCard;
