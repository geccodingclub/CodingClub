import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Megaphone, Calendar, ShieldAlert, Clock, ChevronRight, Loader2 } from 'lucide-react';
import API from '../api/axios';

const NoticePage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await API.get('/notices');
                setNotices(response.data);
            } catch (error) {
                console.error('Failed to fetch notices:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-950">
            <div className="max-w-5xl mx-auto">
                <header className="mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                            <Megaphone size={24} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Nexus<span className="text-red-500">_Broadcasts</span></h1>
                    </motion.div>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em] ml-16 underline underline-offset-8 decoration-red-500/30">
                        Official updates from GEC Coding Club Command
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="text-red-500 animate-spin" size={40} />
                        <p className="font-mono text-xs text-slate-500 animate-pulse tracking-widest uppercase font-black">Decrypting_Broadcast_Stream...</p>
                    </div>
                ) : notices.length > 0 ? (
                    <div className="space-y-6">
                        {notices.map((notice, i) => (
                            <motion.div
                                key={notice._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative group p-8 rounded-3xl border transition-all overflow-hidden ${
                                    notice.isImportant 
                                    ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.05)]' 
                                    : 'bg-slate-900/40 border-white/5 hover:border-blue-500/30'
                                }`}
                            >
                                {notice.isImportant && (
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <ShieldAlert size={120} className="text-red-500" />
                                    </div>
                                )}
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            {notice.isImportant && (
                                                <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                                                    CRITICAL_PRIORITY
                                                </span>
                                            )}
                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(notice.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <h2 className={`text-xl font-black uppercase tracking-tight mb-3 ${notice.isImportant ? 'text-red-400' : 'text-slate-100'}`}>
                                            {notice.title}
                                        </h2>
                                        
                                        <p className="text-slate-400 font-mono text-sm leading-relaxed max-w-3xl">
                                            {notice.content}
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black italic">// BROADCASTED_BY</p>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-200 uppercase tracking-tighter">{notice.author?.name || 'System'}</p>
                                                <p className="text-[10px] font-mono text-red-500/60 uppercase tracking-widest">{notice.author?.role || 'President'}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 px-8 rounded-3xl border border-dashed border-white/5 bg-slate-900/10">
                        <Megaphone className="mx-auto text-slate-800 mb-6 opacity-20" size={48} />
                        <h3 className="text-2xl font-black text-slate-600 mb-2 italic tracking-tight">Broadcast_Silence</h3>
                        <p className="text-slate-500 font-mono text-xs max-w-sm mx-auto uppercase tracking-widest">
                            // No official notices have been deployed to the nexus yet.
                        </p>
                    </div>
                )}
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default NoticePage;
