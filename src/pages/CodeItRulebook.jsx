import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, ChevronRight, Shield, Clock, Code, AlertTriangle,
  CheckCircle2, XCircle, Users, Trophy, Zap, FileText, Laptop, 
  MessageCircle, Award
} from 'lucide-react';

const rules = [
  {
    icon: <Users size={20} />,
    title: 'Eligibility',
    items: [
      'The competition is open to all students of GEC Bhojpur.',
      'Individual participation only — no teams allowed.',
      'Participants must register before the deadline (April 10, 2026).',
      'Each participant can register only once using their college email or personal email.',
    ],
  },
  {
    icon: <Laptop size={20} />,
    title: 'Platform & Environment',
    items: [
      'The competition will be hosted on the HackerRank platform.',
      'Participants are advised to create a HackerRank account before the event.',
      'Supported languages: C, C++, Java, Python, JavaScript, and more.',
      'You may use any IDE locally, but final submissions must be made on HackerRank.',
    ],
  },
  {
    icon: <Clock size={20} />,
    title: 'Duration & Format',
    items: [
      'The exact duration will be communicated before the competition.',
      'The contest will consist of multiple coding problems of varying difficulty.',
      'Problems will range from Easy → Medium → Hard.',
      'Scoring is based on correctness, efficiency, and time of submission.',
    ],
  },
  {
    icon: <Code size={20} />,
    title: 'Submission Rules',
    items: [
      'All code must be written and submitted by the participant individually.',
      'Each problem may allow multiple submissions — the best submission is scored.',
      'Partial scoring applies: solving some test cases of a problem earns partial marks.',
      'The platform automatically evaluates solutions against hidden test cases.',
    ],
  },
  {
    icon: <Shield size={20} />,
    title: 'Fair Play & Integrity',
    items: [
      'Plagiarism of any kind will result in immediate disqualification.',
      'Using AI tools (ChatGPT, Copilot, etc.) to generate solutions is strictly prohibited.',
      'Sharing solutions or discussing problems during the contest is not allowed.',
      'Code similarity checks will be run post-contest using advanced plagiarism detectors.',
      'Any suspicious activity will be investigated by the organizing committee.',
    ],
  },
  {
    icon: <AlertTriangle size={20} />,
    title: 'Disqualification Criteria',
    items: [
      'Submitting code copied from the internet, another participant, or AI tools.',
      'Attempting to exploit/hack the platform or test cases.',
      'Using multiple accounts for the same competition.',
      'Any form of collaborative solving during the live contest.',
      'Decision of the organizing committee will be final and binding.',
    ],
  },
  {
    icon: <Trophy size={20} />,
    title: 'Scoring & Ranking',
    items: [
      'Each problem carries a predefined score based on its difficulty.',
      'In case of a tie, the participant with the earlier submission time ranks higher.',
      'Penalty may apply for wrong submissions on some problem formats.',
      'Final standings will be visible on the leaderboard after the contest ends.',
    ],
  },
  {
    icon: <Award size={20} />,
    title: 'Prizes & Recognition',
    items: [
      'Top performers will receive certificates and prizes.',
      'All participants will receive a certificate of participation.',
      'Winners will be featured on the CORTEX website and social media.',
      'Prize details will be announced on the day of the competition.',
    ],
  },
  {
    icon: <MessageCircle size={20} />,
    title: 'Communication',
    items: [
      'All official updates will be shared via email and the CORTEX WhatsApp group.',
      'For queries, reach out to the organizing committee via the Contact page.',
      'Follow CORTEX on social media for real-time updates.',
    ],
  },
];

const CodeItRulebook = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <FileText size={14} />
            <span>Official Rulebook</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
          >
            Code<span className="text-primary">It</span> Rules
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/30 font-mono text-sm max-w-lg mx-auto mb-8"
          >
            Read carefully before registering. By participating, you agree to all rules outlined below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/codeit" className="btn-primary text-sm px-8 py-3.5">
              <Zap size={16} />
              Register Now
              <ChevronRight size={14} />
            </Link>
            <div className="flex items-center gap-2 text-orange-400 font-mono text-[10px] uppercase tracking-[0.15em]">
              <Clock size={12} />
              Deadline: April 10, 2026
            </div>
          </motion.div>
        </div>

        {/* Quick Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 md:p-8 rounded-2xl surface-card mb-10"
        >
          <h2 className="font-heading text-lg font-bold text-white mb-5 flex items-center gap-3">
            <Zap size={18} className="text-primary" />
            Quick Overview
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Format', value: 'Individual', icon: <Users size={14} /> },
              { label: 'Platform', value: 'HackerRank', icon: <Laptop size={14} /> },
              { label: 'Languages', value: 'C, C++, Java, Python, JS', icon: <Code size={14} /> },
              { label: 'Deadline', value: 'April 10, 2026', icon: <Clock size={14} /> },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  {item.icon}
                  <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.15em]">{item.label}</span>
                </div>
                <p className="font-heading text-sm font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rules Sections */}
        <div className="space-y-6">
          {rules.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="p-6 md:p-8 rounded-2xl surface-card group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {section.icon}
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.15em]">Section {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-lg font-bold text-white">{section.title}</h3>
                </div>
              </div>
              <ul className="space-y-3 ml-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {section.title === 'Disqualification Criteria' ? (
                      <XCircle size={14} className="text-red-400/60 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 size={14} className="text-primary/50 shrink-0 mt-0.5" />
                    )}
                    <span className="text-white/40 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-white/20 font-mono text-xs mb-6">
            Ready to compete? Register before April 10th.
          </p>
          <Link to="/codeit" className="btn-white text-base px-10 py-4">
            <Zap size={18} />
            Register for CodeIt
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeItRulebook;
