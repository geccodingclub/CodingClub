import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';
import { 
  Hash, Code, ChevronRight, Loader2, 
  CheckCircle2, BookOpen, Clock, AlertCircle, Trophy, Zap,
  User, Mail, BookMarked, Building, Phone, LogIn
} from 'lucide-react';

const LANGUAGES = [
  'Select Language',
  'C',
  'C++',
  'Java',
  'Python',
  'JavaScript',
  'Other',
];

const CodeItRegister = () => {
  const { user, loading: authLoading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNumber: '',
    programmingLanguage: LANGUAGES[0],
    otherLanguage: '',
    usedHackerRank: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  // Countdown to April 10th deadline
  useEffect(() => {
    const deadline = new Date('2026-04-10T23:59:59');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        setTimeLeft({ expired: true });
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if user is already registered for CodeIt
  useEffect(() => {
    if (!user) {
      setCheckingStatus(false);
      return;
    }
    const checkStatus = async () => {
      try {
        const res = await API.get('/codeit/status');
        if (res.data.isRegistered) {
          setAlreadyRegistered(true);
          setRegistrationData(res.data.registration);
        }
      } catch (err) {
        console.error('Failed to check CodeIt status:', err);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!formData.registrationNumber.trim()) errs.registrationNumber = 'University registration number is required';
    if (formData.programmingLanguage === 'Select Language') errs.programmingLanguage = 'Select a language';
    if (formData.programmingLanguage === 'Other' && !formData.otherLanguage.trim()) errs.otherLanguage = 'Specify your language';
    if (!formData.usedHackerRank) errs.usedHackerRank = 'This field is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    
    try {
      const payload = {
        registrationNumber: formData.registrationNumber,
        programmingLanguage: formData.programmingLanguage === 'Other' 
          ? formData.otherLanguage 
          : formData.programmingLanguage,
        usedHackerRank: formData.usedHackerRank,
      };
      await API.post('/codeit/register', payload);
      setIsSubmitted(true);
      showNotification('Successfully registered for CodeIt!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      showNotification(msg, 'error');
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const inputStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' };
  const inputStyleErr = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(244, 63, 94, 0.35)' };
  const inputBase = "w-full px-4 py-3.5 rounded-xl font-mono text-sm text-white/80 placeholder:text-white/15 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300";
  const prefilledStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' };

  // Loading state
  if (authLoading || checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={28} className="text-primary animate-spin" />
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em]">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center p-10 rounded-2xl surface-card"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <LogIn size={28} className="text-orange-400" />
          </div>
          <h2 className="font-heading text-2xl font-extrabold mb-3 tracking-tight">
            Login <span className="text-primary">Required</span>
          </h2>
          <p className="text-white/30 font-mono text-xs mb-8 leading-relaxed">
            You must be a registered member of CORTEX to participate in CodeIt.<br />
            Please login or create an account first.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn-primary justify-center py-3 text-sm">
              <LogIn size={16} />
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary justify-center py-3 text-sm">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Already registered
  if (alreadyRegistered && !isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center p-10 rounded-2xl surface-card"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h2 className="font-heading text-3xl font-extrabold mb-3 tracking-tight">
            Already <span className="text-emerald-400">Registered!</span>
          </h2>
          <p className="text-white/30 font-mono text-xs mb-6 leading-relaxed">
            You've already registered for CodeIt.<br />
            Further details will be shared via email.
          </p>
          
          {registrationData && (
            <div className="p-4 rounded-xl mb-6 text-left space-y-2" style={prefilledStyle}>
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.15em] mb-3">Your Registration</p>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-white/25 uppercase">Reg. No.</span>
                <span className="font-mono text-xs text-white/60">{registrationData.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-white/25 uppercase">Language</span>
                <span className="font-mono text-xs text-white/60">{registrationData.programmingLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-white/25 uppercase">Registered</span>
                <span className="font-mono text-xs text-white/60">{new Date(registrationData.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            <Link to="/codeit/rulebook" className="btn-primary justify-center py-3 text-sm">
              <BookOpen size={16} />
              View Rulebook
            </Link>
            <Link to="/dashboard" className="btn-secondary justify-center py-3 text-sm">
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state after fresh registration
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center p-10 rounded-2xl surface-card"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h2 className="font-heading text-3xl font-extrabold mb-3 tracking-tight">
            You're <span className="text-emerald-400">In!</span>
          </h2>
          <p className="text-white/30 font-mono text-xs mb-8 leading-relaxed">
            Registration confirmed for CodeIt, {user.name}!<br />
            Further details will be shared via email.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/codeit/rulebook" className="btn-primary justify-center py-3 text-sm">
              <BookOpen size={16} />
              View Rulebook
            </Link>
            <Link to="/dashboard" className="btn-secondary justify-center py-3 text-sm">
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Registration form (logged in, not yet registered)
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <Zap size={14} />
            <span>Registration Open</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
          >
            Code<span className="text-primary">It</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/30 font-mono text-sm max-w-md mx-auto mb-8"
          >
            CORTEX presents the ultimate coding showdown.<br />
            Register now. Compete. Conquer.
          </motion.p>

          {/* Countdown */}
          {!timeLeft.expired ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-1 mb-4"
            >
              <Clock size={14} className="text-orange-400 mr-2" />
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.15em] mr-3">Registration closes in</span>
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="flex items-center">
                  <div className="px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold text-orange-400" style={{ background: 'rgba(251, 146, 60, 0.08)', border: '1px solid rgba(251, 146, 60, 0.15)' }}>
                    {String(timeLeft[unit] || 0).padStart(2, '0')}
                  </div>
                  <span className="font-mono text-[8px] text-white/15 uppercase ml-1 mr-2">{unit[0]}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-4 text-red-400 font-mono text-xs">
              <AlertCircle size={14} />
              Registration deadline has passed
            </div>
          )}

          <Link
            to="/codeit/rulebook"
            className="inline-flex items-center gap-2 text-primary font-mono text-xs hover:text-primary/80 transition-colors duration-300"
          >
            <BookOpen size={14} />
            Read the Rulebook before registering
            <ChevronRight size={12} />
          </Link>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="p-6 md:p-10 rounded-2xl surface-card max-w-2xl mx-auto"
        >
          {/* Your Profile Info (Pre-filled, read-only) */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary"><User size={18} /></div>
              )}
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-white">{user.name}</h2>
              <p className="font-mono text-[10px] text-white/20">{user.email}</p>
            </div>
            <div className="ml-auto">
              <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[8px] text-emerald-400 uppercase tracking-[0.15em] font-bold">
                {user.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>

          {/* Pre-filled data (read-only display) */}
          <div className="mb-6">
            <p className="font-mono text-[9px] text-white/15 uppercase tracking-[0.15em] mb-3">From your profile (auto-filled)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: <User size={12} />, label: 'Name', value: user.name },
                { icon: <Mail size={12} />, label: 'Email', value: user.email },
                { icon: <Hash size={12} />, label: 'Roll No.', value: user.rollNo },
                { icon: <Building size={12} />, label: 'Branch', value: user.department },
                { icon: <BookMarked size={12} />, label: 'Year', value: `${user.year}${user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year` },
                { icon: <Phone size={12} />, label: 'Phone', value: user.phoneNumber },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg" style={prefilledStyle}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-white/15">{item.icon}</span>
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.1em]">{item.label}</span>
                  </div>
                  <p className="font-mono text-xs text-white/50 truncate">{item.value || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06] pt-6 mb-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">Additional Details</h3>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em]">Complete these to register</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Registration Number */}
            <div>
              <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">
                University Registration Number *
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-300"
                style={errors.registrationNumber ? inputStyleErr : inputStyle}
              >
                <Hash size={16} className={errors.registrationNumber ? 'text-red-400' : 'text-white/20'} />
                <input
                  type="text"
                  placeholder="e.g. 2023XXXX"
                  className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                  value={formData.registrationNumber}
                  onChange={(e) => handleChange('registrationNumber', e.target.value)}
                />
              </div>
              {errors.registrationNumber && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.registrationNumber}</p>}
            </div>

            {/* Programming Language */}
            <div>
              <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">
                Preferred Programming Language *
              </label>
              <p className="font-mono text-[9px] text-white/15 ml-1 mb-2">Select the language you're most comfortable with for the competition</p>
              <select
                className={inputBase + ' appearance-none cursor-pointer'}
                style={errors.programmingLanguage ? inputStyleErr : inputStyle}
                value={formData.programmingLanguage}
                onChange={(e) => handleChange('programmingLanguage', e.target.value)}
              >
                {LANGUAGES.map(l => (
                  <option key={l} value={l} disabled={l === 'Select Language'} className="bg-[#0A0A0A] text-white">{l}</option>
                ))}
              </select>
              {errors.programmingLanguage && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.programmingLanguage}</p>}

              <AnimatePresence>
                {formData.programmingLanguage === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <input
                      type="text"
                      placeholder="Specify your language"
                      className={inputBase}
                      style={errors.otherLanguage ? inputStyleErr : inputStyle}
                      value={formData.otherLanguage}
                      onChange={(e) => handleChange('otherLanguage', e.target.value)}
                    />
                    {errors.otherLanguage && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.otherLanguage}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* HackerRank Experience */}
            <div>
              <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-2 block">
                Have you previously used the HackerRank platform? *
              </label>
              <div className="flex gap-3">
                {['Yes', 'No'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange('usedHackerRank', opt)}
                    className={`flex-1 py-3 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                      formData.usedHackerRank === opt
                        ? 'bg-primary text-white shadow-glow-sm'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                    style={formData.usedHackerRank === opt 
                      ? {} 
                      : (errors.usedHackerRank ? inputStyleErr : inputStyle)
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.usedHackerRank && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.usedHackerRank}</p>}
            </div>

            {/* Error message */}
            {errors.submit && (
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 font-mono text-xs">
                {errors.submit}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || timeLeft.expired}
              className={`w-full mt-4 ${(isSubmitting || timeLeft.expired) ? 'opacity-40 cursor-not-allowed' : ''} btn-primary justify-center py-4 text-sm`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Registering...
                </>
              ) : timeLeft.expired ? (
                'Registration Closed'
              ) : (
                <>
                  Register for CodeIt
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            <p className="text-center font-mono text-[9px] text-white/15 mt-3">
              By registering, you agree to the <Link to="/codeit/rulebook" className="text-primary hover:text-primary/80 transition-colors">competition rules</Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CodeItRegister;
