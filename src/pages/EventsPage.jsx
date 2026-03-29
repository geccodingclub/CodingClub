import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ExternalLink, Sparkles, Binary, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FeaturedEvent from '../components/FeaturedEvent';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://coding-r06j.onrender.com'}/api/events/public`);
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch public events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const getIcon = (category) => {
        switch (category) {
            case 'HACKATHON': return <Binary className="text-primary" />;
            case 'WORKSHOP': return <Sparkles className="text-purple-400" />;
            default: return <Users className="text-pink-400" />;
        }
    };

    return (
        <div className="pt-28 md:pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
                        >
                            <Calendar size={14} />
                            <span>Live Calendar</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5"
                        >
                            Upcoming <br />
                            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Events</span>
                        </motion.h1>
                        <p className="text-white/30 font-mono text-sm leading-relaxed max-w-lg">
                            Join us for our next wave of technical deep dives, hackathons, and innovative sessions.
                        </p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 rounded-2xl hidden lg:block surface-card"
                    >
                        <p className="text-white/25 font-mono text-[10px] uppercase font-bold mb-3 tracking-[0.15em]">Status</p>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/15 text-green-400 font-mono text-[10px] font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Registration Open
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15 text-primary font-mono text-[10px] font-bold">
                                <Clock size={12} />
                                24/7 Support
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Featured Event */}
                <div className="mb-20">
                    <FeaturedEvent />
                </div>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="text-primary animate-spin" size={36} />
                        <p className="font-mono text-[10px] text-white/25 animate-pulse tracking-[0.2em] uppercase font-bold">Loading Events...</p>
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {events.map((event, i) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -5 }}
                                className="group relative"
                            >
                                <div 
                                    className="relative p-7 rounded-2xl transition-all duration-300 overflow-hidden h-full flex flex-col surface-card-hover"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity duration-300">
                                        {getIcon(event.status)}
                                    </div>
                                    
                                    <span className="inline-block px-2.5 py-1 rounded-md bg-white/[0.03] text-[10px] font-mono font-bold text-white/30 mb-5 tracking-[0.15em] uppercase w-fit">
                                        {event.status}
                                    </span>
                                    
                                    <h3 className="font-heading text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {event.title}
                                    </h3>
                                    
                                    <p className="text-white/30 font-mono text-sm leading-relaxed mb-6 flex-grow">
                                        {event.description}
                                    </p>
                                    
                                    <div className="space-y-2.5 pt-5 border-t border-white/[0.06]">
                                        <div className="flex items-center gap-3 text-white/25 font-mono text-xs">
                                            <Calendar size={13} className="text-primary" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/25 font-mono text-xs">
                                            <MapPin size={13} className="text-primary" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <Link 
                                        to="/register"
                                        className="btn-primary mt-6 justify-center text-sm py-3"
                                    >
                                        <span>Register Now</span>
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-28 px-8 rounded-2xl border border-dashed border-white/[0.06] mb-16" style={{ background: 'rgba(10,10,10,0.3)' }}>
                        <Calendar className="mx-auto text-white/10 mb-5" size={44} />
                        <h3 className="font-heading text-xl font-bold text-white/30 mb-2">No Active Events</h3>
                        <p className="text-white/20 font-mono text-xs max-w-sm mx-auto">
                            The President has not launched any new events yet. Check back soon.
                        </p>
                    </div>
                )}

                <div className="text-center p-10 rounded-2xl border border-dashed border-white/[0.06]" style={{ background: 'rgba(10,10,10,0.2)' }}>
                    <p className="text-white/20 font-mono text-sm">
                        More events coming soon. Stay tuned for further announcements.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
