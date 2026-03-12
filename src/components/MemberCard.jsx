import { useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Download, ShieldCheck, Terminal, Cpu } from 'lucide-react';

const MemberCard = ({ user }) => {
  const cardRef = useRef(null);

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
        className="w-full max-w-[400px] aspect-[400/580] bg-slate-950 text-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-2xl border border-blue-500/30"
        style={{
          backgroundImage: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 blur-3xl rounded-full -ml-24 -mb-24" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                Coding<span className="text-blue-500">_Club</span>
              </h2>
              <p className="text-[8px] font-mono text-blue-500 uppercase tracking-widest mt-1">GEC BHOJPUR // SYSTEM_ALPHA</p>
            </div>
            <div className="w-10 h-10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-500 bg-blue-500/5 backdrop-blur-sm">
              <Terminal size={18} />
            </div>
          </div>

          {/* Photo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.3)] bg-slate-900">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <Cpu size={48} />
                  </div>
                )}
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg border-2 border-slate-950 shadow-lg animate-bounce">
                  <ShieldCheck size={16} />
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{user.name}</h1>
            <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-500/30 rounded-full text-[10px] font-black tracking-widest text-blue-400 uppercase mb-6 italic">
              Level: {user.role}
            </div>

            <div className="grid grid-cols-2 gap-4 text-left mt-6 px-2">
              <div>
                <p className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Roll_No</p>
                <p className="text-xs font-bold text-slate-200">{user.rollNo}</p>
              </div>
              <div>
                <p className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Dept</p>
                <p className="text-xs font-bold text-slate-200 truncate">{user.department}</p>
              </div>
              <div>
                <p className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Year</p>
                <p className="text-xs font-bold text-slate-200">{user.year}nd Year</p>
              </div>
              <div>
                <p className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Issued</p>
                <p className="text-xs font-bold text-slate-200">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Status: Active_Stream</p>
            </div>
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.2em]">001-992-B882</p>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadCard}
        className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl transition-all"
      >
        <Download size={18} />
        Download_Social_Asset
      </motion.button>
    </div>
  );
};

export default MemberCard;
