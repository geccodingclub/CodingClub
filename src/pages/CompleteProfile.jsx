import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { Fingerprint, BookOpen, Calendar, Phone, ChevronRight, User, Mail } from 'lucide-react';

const DEPARTMENTS = [
  'Select Department',
  'Instrumentation Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering'
];

const CompleteProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [formData, setFormData] = useState({
    rollNo: '',
    department: DEPARTMENTS[0],
    year: 'Select Year',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.rollNo.trim()) errs.rollNo = 'Roll number is required';
    if (formData.department === 'Select Department') errs.department = 'Select your department';
    if (formData.year === 'Select Year') errs.year = 'Select your year';
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errs.phoneNumber = 'Enter a valid 10-digit phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await API.put('/auth/complete-profile', {
        rollNo: formData.rollNo,
        department: formData.department,
        year: parseInt(formData.year),
        phoneNumber: formData.phoneNumber,
      });
      updateUserInfo(res.data);
      showNotification('Profile completed successfully!');
      navigate(redirectTo);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile.';
      showNotification(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputWrapperBase = "flex items-center gap-3 px-4 py-3.5 rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-300";
  const inputStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' };
  const inputStyleError = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(244, 63, 94, 0.3)' };
  const prefilledStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden surface-card"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl" />

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary"><User size={22} /></div>
              )}
            </div>
            <div>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight">
                Complete <span className="text-primary">Profile</span>
              </h2>
              <p className="text-white/25 font-mono text-[10px] uppercase tracking-[0.15em]">
                One last step, {user.name?.split(' ')[0]}
              </p>
            </div>
          </div>

          {/* Pre-filled from Google */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            {[
              { icon: <User size={12} />, label: 'Name', value: user.name },
              { icon: <Mail size={12} />, label: 'Email', value: user.email },
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Roll Number */}
          <div>
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Roll Number</label>
            <div className={inputWrapperBase} style={errors.rollNo ? inputStyleError : inputStyle}>
              <span className={`${errors.rollNo ? 'text-red-400' : 'text-white/20'} transition-colors`}><Fingerprint size={16} /></span>
              <input
                placeholder="e.g. 2023XXXX"
                className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                value={formData.rollNo}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, rollNo: e.target.value }));
                  if (errors.rollNo) setErrors(prev => ({ ...prev, rollNo: null }));
                }}
              />
            </div>
            {errors.rollNo && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.rollNo}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Department</label>
            <div className={inputWrapperBase} style={errors.department ? inputStyleError : inputStyle}>
              <span className={`${errors.department ? 'text-red-400' : 'text-white/20'} transition-colors`}><BookOpen size={16} /></span>
              <select
                className="bg-transparent border-none outline-none w-full font-mono text-sm appearance-none text-white/80"
                value={formData.department}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, department: e.target.value }));
                  if (errors.department) setErrors(prev => ({ ...prev, department: null }));
                }}
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept} disabled={dept === 'Select Department'} className="bg-[#0A0A0A] text-white">{dept}</option>
                ))}
              </select>
            </div>
            {errors.department && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.department}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Year</label>
            <div className={inputWrapperBase} style={errors.year ? inputStyleError : inputStyle}>
              <span className={`${errors.year ? 'text-red-400' : 'text-white/20'} transition-colors`}><Calendar size={16} /></span>
              <select
                className="bg-transparent border-none outline-none w-full font-mono text-sm appearance-none text-white/80"
                value={formData.year}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, year: e.target.value }));
                  if (errors.year) setErrors(prev => ({ ...prev, year: null }));
                }}
              >
                <option value="Select Year" disabled className="bg-[#0A0A0A] text-white">Select Year</option>
                {[1, 2, 3, 4].map(y => <option key={y} value={y} className="bg-[#0A0A0A] text-white">{y} Year</option>)}
              </select>
            </div>
            {errors.year && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.year}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Phone Number</label>
            <div className={inputWrapperBase} style={errors.phoneNumber ? inputStyleError : inputStyle}>
              <span className={`${errors.phoneNumber ? 'text-red-400' : 'text-white/20'} transition-colors`}><Phone size={16} /></span>
              <input
                type="tel"
                placeholder="10-digit number"
                className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                  if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: null }));
                }}
              />
            </div>
            {errors.phoneNumber && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.phoneNumber}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 ${isSubmitting ? 'opacity-40 cursor-not-allowed' : ''} btn-primary justify-center py-4 text-sm`}
          >
            {isSubmitting ? 'Saving...' : 'Complete Profile'}
            {!isSubmitting && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
