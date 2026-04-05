import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, ChevronRight, X } from 'lucide-react';

const EventBanner = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const deadlineDate = new Date('2026-04-10T23:59:59');
  
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

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Hide banner on the registration page or rulebook to avoid clutter
    if (location.pathname === '/codeit' || location.pathname === '/codeit/rulebook') {
      setIsVisible(false);
      return;
    }

    const checkStatus = async () => {
      if (user) {
        try {
          const res = await API.get('/codeit/status');
          if (!res.data.isRegistered) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        } catch (err) {
          setIsVisible(true);
        }
      } else {
        // Show to guests
        setIsVisible(true);
      }
    };
    
    if (!isDismissed) {
      checkStatus();
    }
  }, [user, isDismissed, location.pathname]);

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="relative bg-slate-900 border border-primary/30 rounded-xl p-4 shadow-[0_-10px_40px_rgba(59,130,246,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10" />
            
            <div className="relative flex items-center gap-4 z-10 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-white text-sm flex items-center gap-2 flex-wrap">
                  CodeIt Registration is Open!
                  {!timeLeft.expired && (
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  )}
                </h4>
                <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">Compete in the ultimate coding showdown at GEC Bhojpur.</p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link 
                to="/codeit" 
                className="flex-1 sm:flex-none text-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2"
                onClick={() => setIsDismissed(true)} // Optional: dismiss when they click
              >
                Register Now <ChevronRight size={14} />
              </Link>
              <button 
                onClick={() => setIsDismissed(true)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventBanner;
