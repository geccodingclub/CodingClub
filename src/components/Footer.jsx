import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Ecosystem',
            links: [
                { name: 'About Club', path: '/about' },
                { name: 'Events', path: '/events' },
                { name: 'Notices', path: '/notices' },
                { name: 'Members', path: '/members' },
                { name: 'Leaderboard', path: '/dashboard' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Resources', path: '/resources' },
                { name: 'Open Source', path: 'https://github.com/geccodingclub' },
                { name: 'Community', path: '#' },
                { name: 'Contact Us', path: '/contact' }
            ]
        }
    ];

    const socialLinks = [
        { icon: <Github size={18} />, url: 'https://github.com/geccodingclub' },
        { icon: <Twitter size={18} />, url: '#' },
        { icon: <Linkedin size={18} />, url: '#' },
        { icon: <Mail size={18} />, url: 'mailto:geccodingclub@gmail.com' }
    ];

    return (
        <footer className="relative mt-20 border-t border-white/5 bg-slate-950/20 backdrop-blur-xl pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 group mb-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                <Rocket size={24} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic">
                                Coding<span className="text-blue-500">Club</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 font-mono text-sm max-w-sm mb-8 leading-relaxed">
                            // The premier student developer community. <br />
                            // Building the innovators of tomorrow, <br />
                            // one line of code at a time.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section, i) => (
                        <div key={i}>
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6 italic">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        {link.path.startsWith('http') ? (
                                            <a 
                                                href={link.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-blue-400 transition-colors font-mono text-xs flex items-center gap-2 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ) : (
                                            <Link 
                                                to={link.path}
                                                className="text-slate-400 hover:text-blue-400 transition-colors font-mono text-xs flex items-center gap-2 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                        © {currentYear} CODING_CLUB_GEC. SYSTEM_VERSION: 2.0.0
                    </p>
                    <a 
                        href="https://github.com/Abudarda12" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors font-mono text-[10px] uppercase tracking-widest group"
                    >
                        <span>made with</span>
                        <Heart size={10} className="text-red-500 animate-pulse group-hover:scale-125 transition-transform" fill="currentColor" />
                        <span>love by Abudarda</span>
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
