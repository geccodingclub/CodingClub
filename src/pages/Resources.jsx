import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Code2, Cpu, Globe, Layout, Layers, Smartphone, 
  Database, Terminal, Sparkles, ArrowUpRight, X, 
  CheckCircle2, PlayCircle, FileText, Github, ExternalLink,
  Target, Zap, Shield, Rocket, MessageSquare
} from 'lucide-react';

const Resources = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);

    const resourceTracks = [
        {
            id: 'web-dev',
            title: "Web Development",
            icon: <Globe className="text-blue-400" />,
            author: "Cortex SDG",
            tags: ["Frontend", "Backend", "Fullstack"],
            description: "Master the art of building modern, scalable web applications using the latest technologies.",
            link: "#",
            detailedContent: {
                title: "COPS SDG Summer of Code 2025 - Web Track",
                preRequisites: [
                    {
                        title: "Git and GitHub",
                        description: "Git is a distributed version control system that allows developers to track changes in their code and collaborate with others. GitHub is a web-based platform that hosts Git repositories.",
                        resources: [
                            { name: "Git & GitHub Tutorial - Complete beginner One shot", type: "video", link: "#" },
                            { name: "Git Cheat Sheet", type: "doc", link: "#" }
                        ]
                    }
                ],
                weeks: [
                    {
                        number: 1,
                        title: "The Foundations",
                        topics: [
                            {
                                name: "HTML (HyperText Markup Language)",
                                description: "HTML is the standard markup language used to create web pages. It provides the structure and content of a webpage using various tags and elements.",
                                resources: [
                                    { name: "Documentation: W3Schools HTML Tutorial", type: "doc", link: "https://www.w3schools.com/html/" },
                                    { name: "One-Shot: HTML Crash Course", type: "video", link: "#" }
                                ]
                            },
                            {
                                name: "CSS (Cascading Style Sheets)",
                                description: "CSS is a style sheet language used to describe the look and formatting of a document written in HTML. CSS controls visual presentation.",
                                resources: [
                                    { name: "Documentation: W3Schools CSS Tutorial", type: "doc", link: "https://www.w3schools.com/css/" },
                                    { name: "One-Shot Video: CSS Crash Course", type: "video", link: "#" }
                                ]
                            },
                            {
                                name: "Tailwind CSS",
                                description: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.",
                                resources: [
                                    { name: "Tutorial: Tailwind CSS Tutorial", type: "video", link: "#" },
                                    { name: "Documentation: Tailwind CSS Docs", type: "doc", link: "https://tailwindcss.com/docs" },
                                    { name: "HTML + CSS Lecture Series: Yt Playlist(L1 - L50)", type: "playlist", link: "#" }
                                ]
                            },
                            {
                                name: "JavaScript",
                                description: "JavaScript is a programming language that enables interactive web pages. It runs on the client side to provide dynamic functionality.",
                                resources: [
                                    { name: "One-Shot Tutorial: JavaScript Crash Course", type: "video", link: "#" },
                                    { name: "Lecture Series: JavaScript Playlist", type: "playlist", link: "#" },
                                    { name: "Documentation: JavaScript.info", type: "doc", link: "https://javascript.info/" },
                                    { name: "DOM Manipulation: JavaScript DOM Tutorial", type: "video", link: "#" }
                                ]
                            }
                        ],
                        task: {
                            title: "Week 1 Task – Mock Musical Instrument 🎶",
                            problemStatement: "Build a web-based musical instrument using HTML, CSS, and JavaScript. The instrument should respond to key presses or clicks to play sounds, with appropriate visual feedback.",
                            requirements: [
                                "Design a musical instrument interface (e.g., piano, drums, guitar)",
                                "Map keyboard keys to play corresponding sounds",
                                "Trigger audio playback using the Audio API",
                                "Provide visual feedback when keys are pressed",
                                "Include a guide/instruction section on how to use the site"
                            ],
                            optionalEnhancements: [
                                "CSS animations for key-press/play effects",
                                "Support for multiple instruments",
                                "Recording and download functionality",
                                "Responsive layout and/or dark mode toggle"
                            ],
                            deliverables: ["index.html", "style.css", "script.js", "/sounds/ folder", "README.md"]
                        }
                    },
                    {
                        number: 2,
                        title: "Advanced Frontend",
                        topics: [
                            {
                                name: "TypeScript",
                                description: "TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions.",
                                resources: [
                                    { name: "Official Docs", type: "doc", link: "https://www.typescriptlang.org/docs/" },
                                    { name: "One-Shot Tutorial", type: "video", link: "https://youtu.be/ZchBYjHFCC4?si=Ezr59GKIO6yYJm4J" },
                                    { name: "Blog: Learning TypeScript", type: "article", link: "https://blogs.copsiitbhu.co.in/learning-typescipt-advent-of-ts-24" },
                                    { name: "Comprehensive Guide: TypeScript Deep Dive", type: "doc", link: "#" }
                                ]
                            },
                            {
                                name: "React",
                                description: "React is a popular JavaScript library for building user interfaces, particularly single-page applications.",
                                resources: [
                                    { name: "Official Docs", type: "doc", link: "https://react.dev/learn" },
                                    { name: "One-Shot Tutorial", type: "video", link: "#" },
                                    { name: "Hooks Deep Dive", type: "video", link: "https://youtu.be/6wf5dIrryoQ?si=z5VAJheKtf2GVRhR" },
                                    { name: "React Ecosystem Essentials (Redux, Hook Form, UI Libs)", type: "doc", link: "#" }
                                ]
                            }
                        ],
                        task: {
                            title: "Week 2 Task – Build Your Own SnippetHub! 🧠💻",
                            problemStatement: "SnippetHub – like a special notebook just for cool links, code, notes, or files you want to save and use again later.",
                            requirements: [
                                "Save things like links, text, code, or files",
                                "Categories and tags for organization",
                                "Click a card to open and edit",
                                "Drag and drop or sorting functionality",
                                "Create new categories and sub-categories",
                                "Sidebar for pinned favorites",
                                "Responsive design and clean UI"
                            ],
                            optionalEnhancements: [
                                "Animations and premium UI",
                                "Search and filters",
                                "Download buttons",
                                "List vs Grid toggle",
                                "TypeScript integration"
                            ],
                            deliverables: ["React application", "No backend - use state only", "Sidebar", "Snippet management page"]
                        }
                    },
                    {
                        number: 3,
                        title: "Fullstack Mastery",
                        topics: [
                            {
                                name: "Backend Fundamentals",
                                description: "Data storage, business logic, authentication, and communication between users.",
                                resources: [
                                    { name: "REST API Basics", type: "video", link: "https://youtu.be/-mN3VyJuCjM?si=46wRHANHh8-KOGnA" },
                                    { name: "Backend Architecture Overview", type: "video", link: "https://youtu.be/XBu54nfzxAQ?si=f0RxluYBKOO2qdCM" }
                                ]
                            },
                            {
                                name: "Node & Express",
                                description: "Node.js is a runtime that allows you to run JS on server. Express is a minimal web framework for Node.",
                                resources: [
                                    { name: "Express Docs", type: "doc", link: "https://expressjs.com/" },
                                    { name: "Complete Tutorial", type: "video", link: "https://youtu.be/Oe421EPjeBE" },
                                    { name: "REST APIs with Express", type: "video", link: "https://youtu.be/l8WPWK9mS5M?si=rYenFgSelKJIcRGZ" }
                                ]
                            },
                            {
                                name: "Databases (SQL & NoSQL)",
                                description: "Databases store application data persistently. Choose between relational (PostgreSQL) or document-based (MongoDB).",
                                resources: [
                                    { name: "MongoDB Tutorial", type: "video", link: "#" },
                                    { name: "PostgreSQL Tutorial", type: "video", link: "#" },
                                    { name: "Mongoose ODM Docs", type: "doc", link: "https://mongoosejs.com/docs/" }
                                ]
                            },
                            {
                                name: "Authentication & Security",
                                description: "Secure user identity and resource access using JWT, OAuth, and modern security practices.",
                                resources: [
                                    { name: "JWT Authentication", type: "video", link: "https://youtu.be/7Q17ubqLfaM" },
                                    { name: "OAuth 2.0 Explained", type: "video", link: "#" }
                                ]
                            }
                        ],
                        task: {
                            title: "Week 3 Task – Powering Up SnippetHub 🚀",
                            problemStatement: "Evolve SnippetHub into a production-ready full-stack app with secure accounts, database storage, and real-time collaboration.",
                            requirements: [
                                "Backend Integration (Express/Node or Flask)",
                                "Database persistence (PostgreSQL/MongoDB)",
                                "JWT Authentication and 2FA",
                                "Real-time collaboration using WebSockets",
                                "Shareable URLs and Private/Public collections",
                                "Deployment of both frontend and backend"
                            ],
                            optionalEnhancements: [
                                "Export as Markdown/PDF",
                                "Fuzzy search",
                                "GitHub/Google OAuth",
                                "Dark mode / Theme customization"
                            ],
                            deliverables: ["Full-stack repo", "README with setup", "Live demo link", "Feature overview"]
                        }
                    }
                ]
            }
        },
        {
            id: 'web3',
            title: "Web3 & Blockchain",
            icon: <Layers className="text-purple-400" />,
            author: "Cortex SDG",
            tags: ["Smart Contracts", "DeFi", "Solidity"],
            description: "Decentralize the future. Learn about blockchain architecture and smart contract development.",
            link: "#"
        },
        {
            id: 'app-dev',
            title: "App Development",
            icon: <Smartphone className="text-pink-400" />,
            author: "Cortex SDG",
            tags: ["Flutter", "React Native", "Native"],
            description: "Build high-performance, cross-platform mobile applications that users love.",
            link: "#"
        },
        {
            id: 'cp',
            title: "Competitive Programming",
            icon: <Terminal className="text-emerald-400" />,
            author: "Cortex CP Wing",
            tags: ["Algorithms", "DS", "Problem Solving"],
            description: "Sharpen your analytical skills and master complex data structures and algorithms.",
            link: "#"
        },
        {
            id: 'ml',
            title: "Machine Learning",
            icon: <Cpu className="text-orange-400" />,
            author: "Cortex AI Wing",
            tags: ["Data Science", "Neural Networks", "NLP"],
            description: "Dive into the world of artificial intelligence and build models that learn from data.",
            link: "#"
        },
        {
            id: 'devops',
            title: "DevOps & Cloud",
            icon: <Database className="text-cyan-400" />,
            author: "Cortex Systems Wing",
            tags: ["Docker", "CI/CD", "AWS/GCP"],
            description: "Automate and scale. Learn the modern tools for deployment and infrastructure management.",
            link: "#"
        }
    ];

    return (
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8"
                    >
                        <Sparkles size={14} />
                        <span>Knowledge_Base</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic"
                    >
                        Learn. Build. <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Conquer.
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto font-mono text-lg leading-relaxed"
                    >
                        // Curated learning paths and resources to bridge the gap <br />
                        // between academic learning and industry standards.
                    </motion.p>
                </div>

                {/* Resources Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resourceTracks.map((resource, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm group hover:border-blue-500/30 transition-all flex flex-col cursor-pointer"
                            onClick={() => resource.detailedContent && setSelectedTrack(resource)}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-blue-600/20 transition-colors">
                                {resource.icon}
                            </div>
                            
                            <div className="mb-4">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{resource.author}</span>
                                <h3 className="text-2xl font-black mt-1 italic group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                    {resource.title}
                                </h3>
                            </div>

                            <p className="text-slate-400 font-mono text-sm leading-relaxed mb-6 flex-grow">
                                {resource.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {resource.tags.map((tag, j) => (
                                    <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="inline-flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest group/btn">
                                <span>{resource.detailedContent ? "View_Content" : "Explore_Track"}</span>
                                <ArrowUpRight size={16} className="text-blue-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal for Detailed Content */}
                <AnimatePresence>
                    {selectedTrack && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedTrack(null)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                            />
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
                            >
                                {/* Modal Header */}
                                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            {selectedTrack.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black italic tracking-tight">{selectedTrack.detailedContent.title}</h2>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{selectedTrack.author}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedTrack(null)}
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Content Scrollable */}
                                <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                                    {/* Pre-requisites */}
                                    <div className="mb-16">
                                        <div className="flex items-center gap-2 mb-8">
                                            <Shield className="text-blue-500" size={20} />
                                            <h3 className="text-lg font-black uppercase tracking-widest italic">_Pre_Requisites</h3>
                                        </div>
                                        <div className="grid gap-6">
                                            {selectedTrack.detailedContent.preRequisites.map((pre, i) => (
                                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                                    <h4 className="text-xl font-bold mb-3">{pre.title}</h4>
                                                    <p className="text-slate-400 text-sm font-mono leading-relaxed mb-6">{pre.description}</p>
                                                    <div className="flex flex-wrap gap-4">
                                                        {pre.resources.map((res, j) => (
                                                            <a key={j} href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs font-black uppercase tracking-widest group">
                                                                {res.type === 'video' ? <PlayCircle size={14} /> : <FileText size={14} />}
                                                                <span>{res.name}</span>
                                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Weekly Content */}
                                    {selectedTrack.detailedContent.weeks.map((week, i) => (
                                        <div key={i} className="mb-20">
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 flex items-center justify-center text-blue-500 font-black italic">
                                                    {week.number}
                                                </div>
                                                <h3 className="text-3xl font-black italic tracking-tighter">Week {week.number}: {week.title}</h3>
                                            </div>

                                            {/* Topics */}
                                            <div className="grid lg:grid-cols-2 gap-6 mb-12">
                                                {week.topics.map((topic, j) => (
                                                    <div key={j} className="p-8 rounded-[2rem] bg-slate-800/50 border border-white/5 hover:border-blue-500/20 transition-all">
                                                        <h4 className="text-xl font-black mb-4 italic text-blue-400">{topic.name}</h4>
                                                        <p className="text-slate-400 text-xs font-mono leading-relaxed mb-8">{topic.description}</p>
                                                        <div className="space-y-4">
                                                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Learning Resources:</div>
                                                            {topic.resources.map((res, k) => (
                                                                <a key={k} href={res.link} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                                                                {res.type === 'video' ? <PlayCircle size={16} /> : res.type === 'playlist' ? <Rocket size={16} /> : <FileText size={16} />}
                                                                            </div>
                                                                            <span className="text-xs font-mono text-slate-200">{res.name}</span>
                                                                        </div>
                                                                        <ExternalLink size={12} className="text-slate-500 group-hover:text-blue-500" />
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Week Task */}
                                            <div className="relative rounded-[2.5rem] overflow-hidden border border-blue-500/20 bg-blue-500/5 p-8 md:p-12">
                                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                                    <Target size={120} />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                                        <Zap size={12} />
                                                        <span>Official_Task</span>
                                                    </div>
                                                    <h4 className="text-3xl font-black mb-6 italic tracking-tight">{week.task.title}</h4>
                                                    <p className="text-slate-300 font-mono text-sm leading-relaxed mb-8 max-w-3xl">
                                                        {week.task.problemStatement}
                                                    </p>
                                                    
                                                    <div className="grid md:grid-cols-2 gap-12">
                                                        <div>
                                                            <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Core Requirements:</h5>
                                                            <ul className="space-y-3">
                                                                {week.task.requirements.map((req, l) => (
                                                                    <li key={l} className="flex items-start gap-3 text-xs font-mono text-slate-400">
                                                                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                                                        <span>{req}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Deliverables:</h5>
                                                            <div className="flex flex-wrap gap-2">
                                                                {week.task.deliverables.map((del, m) => (
                                                                    <span key={m} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-[10px] font-mono text-white">
                                                                        {del}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Modal Footer */}
                                <div className="p-8 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={18} className="text-blue-500" />
                                        <p className="text-slate-400 text-xs font-mono">Need help? Join our community discord or contact a mentor.</p>
                                    </div>
                                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
                                        Join_Discord_Channel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Newsletter / Stay Tuned Section */}
                <div className="mt-40 relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/20 py-24 px-8 md:px-20 backdrop-blur-xl text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 italic">
                            Missing Something? <br />
                            <span className="text-blue-500 italic uppercase">_Request Resource</span>
                        </h2>
                        <p className="text-slate-400 font-mono text-base leading-relaxed max-w-2xl mx-auto mb-12">
                            If there's a specific technology or topic you want to learn, let us know and we'll work on adding it to our roadmap.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-blue-400 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-blue-500/20"
                        >
                            Contact_Team
                        </motion.button>
                    </div>
                </div>
            </div>
            
            {/* Custom Styles for Scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Resources;
