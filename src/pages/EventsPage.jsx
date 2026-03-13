import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ExternalLink, Sparkles, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsPage = () => {
    // Mock events for public view
    const events = [
        {
            id: 1,
            title: "Genesis Hackathon 2024",
            date: "April 15-17, 2024",
            time: "09:00 AM",
            location: "GEC Tech Hub",
            category: "HACKATHON",
            desc: "The ultimate 48-hour build challenge. Turn your wildest ideas into functional prototypes.",
            icon: <Binary className="text-blue-400" />
        },
        {
            id: 2,
            title: "Web3 Mastery Workshop",
            date: "March 20, 2024",
            time: "02:00 PM",
            location: "Cloud Lounge",
            category: "WORKSHOP",
            desc: "Learn the fundamentals of blockchain, smart contracts, and decentralized applications.",
            icon: <Sparkles className="text-purple-400" />
        },
        {
            id: 3,
            title: "Competitive Programming Camp",
            date: "Every Saturday",
            time: "05:00 PM",
            location: "Virtual HQ",
            category: "TRAINING",
            desc: "Master data structures and algorithms with our elite CP team. Prepare for world-class contests.",
            icon: <Users className="text-pink-400" />
        }
    ];

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
                        >
                            <Calendar size={14} />
                            <span>Live_Calendar</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6"
                        >
                            Upcoming <br />
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Expeditions_</span>
                        </motion.h1>
                        <p className="text-slate-400 font-mono leading-relaxed">
                            // Join us for our next wave of technical deep dives, hackathons, and innovative sessions. 
                            // Open your mind, sharpen your tools.
                        </p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl hidden lg:block"
                    >
                        <p className="text-slate-500 text-[10px] uppercase font-black mb-4 tracking-widest">Active_Events</p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Registration_Open
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                                <Clock size={14} />
                                24/7 Support
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                    {event.icon}
                                </div>
                                
                                <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-[10px] font-black text-slate-400 mb-6 tracking-widest">
                                    {event.category}
                                </span>
                                
                                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-blue-400 transition-colors italic">
                                    {event.title}
                                </h3>
                                
                                <p className="text-slate-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                    {event.desc}
                                </p>
                                
                                <div className="space-y-3 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 text-slate-500 font-mono text-xs">
                                        <Calendar size={14} className="text-blue-400" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-mono text-xs">
                                        <Clock size={14} className="text-blue-400" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-mono text-xs">
                                        <MapPin size={14} className="text-blue-400" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <Link 
                                    to="/register"
                                    className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold flex items-center justify-between group-hover:bg-white group-hover:text-black transition-all"
                                >
                                    <span>Register_Now</span>
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center p-12 rounded-3xl border border-dashed border-white/10 bg-slate-900/10">
                    <p className="text-slate-500 font-mono italic">
                        // More events are currently under encryption. Stay tuned for further transmissions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
