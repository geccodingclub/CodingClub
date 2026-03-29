import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MapPin, Globe, Loader2, Sparkles, MessageCircle } from 'lucide-react';
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
            await axios.post('https://coding-r06j.onrender.com/api/contact', formData);
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', userEmail: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: <Mail size={20} />, label: 'Email', value: 'geccodingclub@gmail.com' },
        { icon: <MapPin size={20} />, label: 'Location', value: 'GEC Bhojpur, Arrah, Bihar' },
        { icon: <Globe size={20} />, label: 'Website', value: 'coding-club-chi.vercel.app' }
    ];

    const inputClass = "w-full px-5 py-3.5 rounded-xl font-mono text-sm text-white/90 placeholder:text-white/15 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300";

    return (
        <div className="pt-28 md:pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                    >
                        <MessageCircle size={14} />
                        <span>Get In Touch</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-5 tracking-tight"
                    >
                        Let's <br />
                        <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                            Connect
                        </span>
                    </motion.h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Info Side */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-7 rounded-2xl surface-card">
                            <h3 className="font-heading text-xl font-bold mb-7 text-white">Contact Info</h3>
                            <div className="space-y-7">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all duration-300"
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                                        >
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] mb-1">{info.label}</p>
                                            {info.label === 'Website' ? (
                                                <a href={`https://${info.value}`} target="_blank" rel="noopener noreferrer" className="text-white/70 font-mono text-sm hover:text-primary transition-colors duration-300">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-white/70 font-mono text-sm">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-7 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.03))', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                            <Sparkles className="absolute top-4 right-4 text-primary/20" />
                            <h3 className="font-heading text-lg font-bold mb-3 text-white relative z-10">Join Our Community</h3>
                            <p className="font-mono text-xs text-white/30 mb-6 relative z-10 leading-relaxed">
                                Looking for mentorship? Want to collaborate? Jump into our WhatsApp group.
                            </p>
                            <a 
                                href="https://chat.whatsapp.com/DE6tIZb43IyGUZ3pTbQIjs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full justify-center text-sm py-3.5 relative z-10"
                            >
                                <MessageCircle size={16} />
                                Join WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-2xl space-y-6 surface-card">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] pl-1">Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={inputClass}
                                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] pl-1">Email</label>
                                    <input 
                                        type="email"
                                        required
                                        value={formData.userEmail}
                                        onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                                        className={inputClass}
                                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        placeholder="you@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] pl-1">Subject</label>
                                <input 
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    className={inputClass}
                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    placeholder="Mentorship / Sponsorship / Collaboration"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] pl-1">Message</label>
                                <textarea 
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className={`${inputClass} resize-none`}
                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    placeholder="Tell us about your idea..."
                                />
                            </div>

                            {status && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-xl font-mono text-xs border ${
                                        status.type === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'
                                    }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="btn-white w-full justify-center text-sm py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
