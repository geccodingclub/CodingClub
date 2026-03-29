import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedEvent = () => {
  const deadlineDate = new Date('2026-04-10T23:59:59');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = deadlineDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Corner Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' }}
      />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-0">
        {/* Content Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6 w-fit">
            <Zap size={12} />
            Featured Event
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Code<span className="text-primary">It</span>
          </h2>
          <p className="font-mono text-sm text-white/40 mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Trophy size={14} className="text-primary" />
              Coding Competition
            </span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-orange-400" />
              Registration closes April 10th
            </span>
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
            CORTEX presents the ultimate coding showdown. Put your problem-solving skills to the test, compete against the sharpest minds at GEC Bhojpur, and climb the leaderboard.
          </p>

          {/* Countdown to Registration Deadline */}
          {!timeLeft.expired ? (
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Registration Closes In</p>
              <div className="flex gap-3">
                {countdownBlocks.map((block, i) => (
                  <div key={i} className="text-center">
                    <div className="countdown-digit">
                      {String(block.value).padStart(2, '0')}
                    </div>
                    <p className="countdown-label">{block.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-8 flex items-center gap-2 text-red-400 font-mono text-sm font-bold">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              Registration Closed
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/codeit" 
              className="btn-primary text-sm px-8 py-3.5 flex items-center gap-2"
            >
              <Trophy size={16} />
              Register Now
              <ChevronRight size={14} />
            </Link>
            <Link 
              to="/codeit/rulebook" 
              className="btn-secondary text-sm px-6 py-3.5 flex items-center gap-2"
            >
              <BookOpen size={16} />
              Rulebook
            </Link>
          </div>
        </div>

        {/* Visual Side — Event Poster Placeholder */}
        <div className="relative hidden lg:flex items-center justify-center p-12">
          <div 
            className="w-full aspect-[3/4] max-w-sm rounded-2xl flex flex-col items-center justify-center text-center p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.15)',
            }}
          >
            <img 
              src="/logo.png" 
              alt="CORTEX" 
              className="w-16 h-16 rounded-2xl object-contain mb-6" 
            />
            <h3 className="font-heading text-2xl font-extrabold text-white mb-1">
              Code<span className="text-primary">It</span>
            </h3>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">by CORTEX</p>
            <div className="w-12 h-[1px] bg-white/10 mb-4" />
            <p className="text-white/30 text-xs font-mono">Coding Competition</p>
            <p className="text-white/15 text-[10px] font-mono mt-1">GEC Bhojpur</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedEvent;
