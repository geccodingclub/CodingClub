import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, ShieldCheck, User, Binary, Filter, Globe, Loader2, Award } from 'lucide-react';
import API from '../api/axios';

const VerifiedID = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('ALL');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await API.get('/users/verified-directory');
                setMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch verified members:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const filteredMembers = members.filter(member => {
        const safeName = member.name || '';
        const safeRollNo = member.rollNo || '';
        const matchesSearch = safeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             safeRollNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = filterYear === 'ALL' || member.year === filterYear;
        return matchesSearch && matchesYear;
    });

    const yearOptions = [
        { label: 'ALL', value: 'ALL' },
        { label: '1st Year', value: 1 },
        { label: '2nd Year', value: 2 },
        { label: '3rd Year', value: 3 },
        { label: '4th Year', value: 4 }
    ];

    const getRoleColor = (role) => {
        switch (role) {
            case 'PRESIDENT': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
            case 'VOLUNTEER': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
            default: return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
                        >
                            <ShieldCheck size={14} />
                            <span>Blockchain_Verified_Nodes</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6"
                        >
                            Member <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent italic">
                                ID_Registry_
                            </span>
                        </motion.h1>
                        <p className="text-slate-400 font-mono leading-relaxed max-w-lg">
                            // Public directory of officially verified club members. <br />
                            // Identity authentication protocol v2.0 active.
                        </p>
                    </div>

                    <div className="w-full lg:max-w-md space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text"
                                placeholder="Search by name or roll number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                            />
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {yearOptions.map(option => (
                                <button
                                    key={option.label}
                                    onClick={() => setFilterYear(option.value)}
                                    className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all border whitespace-nowrap ${
                                        filterYear === option.value 
                                        ? 'bg-blue-600 border-blue-500 text-white' 
                                        : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="text-blue-500 animate-spin" size={40} />
                        <p className="font-mono text-xs text-slate-500 animate-pulse tracking-widest uppercase font-black">Decrypting_Registry...</p>
                    </div>
                ) : filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMembers.map((member, i) => (
                            <motion.div
                                key={member._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 8) * 0.05 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-xl group-hover:bg-blue-500/10 transition-colors" />
                                <div className="relative p-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm group-hover:border-blue-500/30 transition-all">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                                {member.profilePhoto ? (
                                                    <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                                                        <User size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-green-500 border-2 border-slate-950 flex items-center justify-center text-white scale-90">
                                                <ShieldCheck size={12} />
                                            </div>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase border ${getRoleColor(member.role)}`}>
                                            {member.role === 'STUDENT' ? 'OPERATOR' : member.role}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-black tracking-tight text-white mb-1 group-hover:text-blue-400 transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                                ID: {member.rollNo || 'NODE_PENDING'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div>
                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Sector</p>
                                                <p className="text-[10px] font-mono text-white group-hover:text-blue-300 transition-colors uppercase">{member.department}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Batch</p>
                                                <p className="text-[10px] font-mono text-white group-hover:text-blue-300 transition-colors uppercase">{member.year} Year</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Binary size={10} />
                                        <span>Verified_Protocol_Active</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 px-8 rounded-3xl border border-dashed border-white/5 bg-slate-900/5 backdrop-blur-sm">
                        <Award className="mx-auto text-slate-800 mb-6" size={48} />
                        <h3 className="text-2xl font-black text-slate-600 mb-2 italic tracking-tight">No_Nodes_Match_Query</h3>
                        <p className="text-slate-500 font-mono text-sm max-w-sm mx-auto uppercase">
                            // Search parameters returned 0 verified entities in this sector.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifiedID;
