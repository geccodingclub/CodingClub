import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MapPin, Globe, Loader2, Sparkles, Terminal } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        userEmail: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // We'll use our existing backend but a new contact endpoint
            // For now, let's assume a generic contact endpoint
            await axios.post('https://coding-r06j.onrender.com/api/contact', formData);
            setStatus({ type: 'success', message: 'Transmission Successful! We will get back to you soon.' });
            setFormData({ name: '', userEmail: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Uplink Failed. please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: <Mail />, label: 'Email', value: 'geccodingclub@gmail.com' },
        { icon: <MapPin />, label: 'Uplink HQ', value: 'GEC Bhojpur, Arrah, Bihar' },
        { icon: <Globe />, label: 'Network', value: 'coding-club-chi.vercel.app' }
    ];

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8"
                    >
                        <Terminal size={14} />
                        <span>Establish_Uplink</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black mb-6 italic tracking-tighter">
                        Let's <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic">
                            Interface_
                        </span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-16">
                    {/* Info Side */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl">
                            <h3 className="text-2xl font-black mb-8 italic tracking-tight">Access_Points</h3>
                            <div className="space-y-8">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{info.label}</p>
                                            {info.label === 'Network' ? (
                                                <a href={`https://${info.value}`} target="_blank" rel="noopener noreferrer" className="text-white font-mono hover:text-blue-400 transition-colors flex items-center gap-2">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-mono">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden group">
                            <Sparkles className="absolute top-4 right-4 text-white/20" />
                            <h3 className="text-xl font-black mb-4 italic tracking-tight relative z-10 font-bold uppercase tracking-widest">Join_The_Network</h3>
                            <p className="font-mono text-sm opacity-90 mb-8 relative z-10 uppercase leading-relaxed font-bold">
                                // Looking for mentorship? <br />
                                // Want to collaborate on projects? <br />
                                // Jump into our specialized WhatsApp Group.
                            </p>
                            <a 
                                href="https://chat.whatsapp.com/DE6tIZb43IyGUZ3pTbQIjs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 w-full py-4 bg-black text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all inline-block text-center"
                            >
                                Launch_WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-2">Codename</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-2">Email_Address</label>
                                    <input 
                                        type="email"
                                        required
                                        value={formData.userEmail}
                                        onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                                        className="w-full px-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                        placeholder="admin@gec.edu"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-2">Subject_Query</label>
                                <input 
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    className="w-full px-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                    placeholder="Mentorship / Sponsorship / Collaboration"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-2">Transmission_Data</label>
                                <textarea 
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full px-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm resize-none"
                                    placeholder="Describe your initiative..."
                                />
                            </div>

                            {status && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-xl font-mono text-xs uppercase tracking-widest font-black italic border ${
                                        status.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-500'
                                    }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-400 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Send_Uplink</span>
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
