import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Navigation',
            links: [
                { name: 'About', path: '/about' },
                { name: 'Events', path: '/events' },
                { name: 'Notices', path: '/notices' },
                { name: 'Members', path: '/members' },
                { name: 'Leaderboard', path: '/leaderboard' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Resources Hub', path: '/resources' },
                { name: 'Open Source', path: 'https://github.com/geccodingclub' },
                { name: 'Contests', path: '/contests' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Contact Us', path: '/contact' }
            ]
        }
    ];

    const socialLinks = [
        { icon: <Instagram size={18} />, url: 'https://www.instagram.com/cortex_gec_bhj/', label: 'Instagram' },
        { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/company/cortex-gec-bhojpur/', label: 'LinkedIn' },
        { icon: <MessageCircle size={18} />, url: 'https://chat.whatsapp.com/DE6tIZb43IyGUZ3pTbQIjs', label: 'WhatsApp' },
        { icon: <Github size={18} />, url: 'https://github.com/geccodingclub', label: 'GitHub' },
        { icon: <Mail size={18} />, url: 'mailto:geccodingclub@gmail.com', label: 'Email' },
    ];

    return (
        <footer 
            className="relative mt-20 border-t border-white/[0.12] pt-16 pb-8 overflow-hidden"
            style={{ background: '#050505' }}
        >
            {/* Top Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2.5 group mb-5">
                            <img 
                                src="/logo.png" 
                                alt="CORTEX Logo" 
                                className="w-9 h-9 rounded-lg object-contain group-hover:scale-110 transition-transform duration-300" 
                            />
                            <div className="flex flex-col leading-none">
                                <span className="text-[15px] font-heading font-extrabold tracking-wide uppercase text-white">
                                    CORTEX
                                </span>
                               
                            </div>
                        </Link>
                        <p className="text-white/60 font-mono text-xs max-w-xs mb-2 leading-relaxed">
                            think. code. evolve.
                        </p>
                        <p className="text-white/50 font-mono text-[10px] max-w-xs mb-8 leading-relaxed">
                            The premier student developer community at GEC Bhojpur.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/55 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section, i) => (
                        <div key={i}>
                            <h4 className="text-[11px] font-heading font-bold uppercase tracking-[0.15em] text-white/70 mb-5">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        {link.path.startsWith('http') ? (
                                            <a 
                                                href={link.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/55 hover:text-primary transition-colors duration-300 font-mono text-xs flex items-center gap-2 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ) : (
                                            <Link 
                                                to={link.path}
                                                className="text-white/55 hover:text-primary transition-colors duration-300 font-mono text-xs flex items-center gap-2 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/[0.10] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/45 font-mono text-[10px] uppercase tracking-[0.15em]">
                        © {currentYear} CORTEX — GEC Bhojpur. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.1em] flex items-center gap-1.5">
                            Built with
                            <Heart size={10} className="text-red-500 animate-pulse" fill="currentColor" />
                            by CORTEX
                        </p>
                        <a 
                            href="https://github.com/Abudarda12" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 text-white/40 hover:text-primary transition-colors duration-300 font-mono text-[10px] uppercase tracking-[0.1em] group"
                        >
                            <span>@Abudarda</span>
                            <ArrowUpRight size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
