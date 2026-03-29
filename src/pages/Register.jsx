import { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Fingerprint, BookOpen, Calendar, ChevronRight, Phone, Camera, RotateCcw, Upload, Image as ImageIcon, UserPlus } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import Webcam from 'react-webcam';
import ImageCropper from '../components/ImageCropper';

const DEPARTMENTS = [
  'Select Department',
  'Instrumentation Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering'
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', rollNo: '', department: DEPARTMENTS[0], year: 'Select Year', phoneNumber: '', profilePhoto: ''
  });
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [tempImg, setTempImg] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadMode, setUploadMode] = useState('gallery');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid college email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setTempImg(imageSrc);
    setShowCropper(true);
  }, [webcamRef]);

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImg(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setImgSrc(croppedImage);
    setFormData(prev => ({ ...prev, profilePhoto: croppedImage }));
    setShowCropper(false);
  };

  const retake = () => {
    setImgSrc(null);
    setFormData(prev => ({ ...prev, profilePhoto: '' }));
  };
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please correct the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(formData);
      showNotification('Registration successful. Welcome to the club!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.';
      showNotification(msg, 'error');
      setIsSubmitting(false);
    }
  };

  const inputWrapperBase = "flex items-center gap-3 px-4 py-3.5 rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-300";
  const inputStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' };
  const inputStyleError = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(244, 63, 94, 0.3)' };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-20 md:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-6 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden surface-card"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl" />
        
        <div className="mb-10">
          <img 
            src="/logo.png" 
            alt="CORTEX Logo" 
            className="w-14 h-14 rounded-2xl object-contain mb-5" 
          />
          <h2 className="font-heading text-3xl font-extrabold mb-2 tracking-tight">
            Create <span className="text-primary">Account</span>
          </h2>
          <p className="text-white/25 font-mono text-xs">Join the CORTEX community at GEC Bhojpur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-5">
              {[
                { name: 'name', icon: <User size={16} />, placeholder: 'Full Name', label: 'Name' },
                { name: 'email', icon: <Mail size={16} />, placeholder: 'you@email.com', type: 'email', label: 'Email' },
                { name: 'password', icon: <Lock size={16} />, placeholder: '••••••••', type: 'password', label: 'Password' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">{f.label}</label>
                  <div 
                    className={inputWrapperBase}
                    style={errors[f.name] ? inputStyleError : inputStyle}
                  >
                    <span className={`${errors[f.name] ? 'text-red-400' : 'text-white/20'} transition-colors`}>{f.icon}</span>
                    <input
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                      value={formData[f.name]}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFormData(prev => ({ ...prev, [f.name]: value }));
                        if (errors[f.name]) setErrors(prev => ({ ...prev, [f.name]: null }));
                      }}
                    />
                  </div>
                  {errors[f.name] && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors[f.name]}</p>}
                </div>
              ))}
            </div>

            <div className="space-y-5">
              {/* Roll Number */}
              <div>
                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Roll Number</label>
                <div 
                  className={inputWrapperBase}
                  style={errors.rollNo ? inputStyleError : inputStyle}
                >
                  <span className={`${errors.rollNo ? 'text-red-400' : 'text-white/20'} transition-colors`}><Fingerprint size={16} /></span>
                  <input
                    placeholder="e.g. 2023XXXX"
                    className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                    value={formData.rollNo}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData(prev => ({ ...prev, rollNo: value }));
                      if (errors.rollNo) setErrors(prev => ({ ...prev, rollNo: null }));
                    }}
                  />
                </div>
                {errors.rollNo && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.rollNo}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Department</label>
                <div 
                  className={inputWrapperBase}
                  style={inputStyle}
                >
                  <span className="text-white/20 transition-colors"><BookOpen size={16} /></span>
                  <select 
                    className="bg-transparent border-none outline-none w-full font-mono text-sm appearance-none text-white/80"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept} disabled={dept === 'Select Department'} className="bg-[#0A0A0A] text-white">{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Year</label>
                <div 
                  className={inputWrapperBase}
                  style={inputStyle}
                >
                  <span className="text-white/20 transition-colors"><Calendar size={16} /></span>
                  <select 
                    className="bg-transparent border-none outline-none w-full font-mono text-sm appearance-none text-white/80"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  >
                    <option value="Select Year" disabled className="bg-[#0A0A0A] text-white">Select Year</option>
                    {[1,2,3,4].map(y => <option key={y} value={y} className="bg-[#0A0A0A] text-white">{y} Year</option>)}  
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="font-mono text-[10px] text-white/25 font-bold uppercase tracking-[0.15em] ml-1 mb-1.5 block">Phone</label>
                <div 
                  className={inputWrapperBase}
                  style={errors.phoneNumber ? inputStyleError : inputStyle}
                >
                  <span className={`${errors.phoneNumber ? 'text-red-400' : 'text-white/20'} transition-colors`}><Phone size={16} /></span>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    className="bg-transparent border-none outline-none w-full font-mono text-sm text-white/80 placeholder:text-white/15"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData(prev => ({ ...prev, phoneNumber: value }));
                      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: null }));
                    }}
                  />
                </div>
                {errors.phoneNumber && <p className="text-[10px] text-red-400 mt-1 ml-1 font-mono">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-4 pt-5 mt-5 border-t border-white/[0.06]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Profile Photo <span className="text-white/15">(Optional)</span></h3>
              <div className="flex p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  type="button"
                  onClick={() => { setUploadMode('camera'); retake(); }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-300 flex items-center gap-1.5 ${uploadMode === 'camera' ? 'bg-primary text-white shadow-glow-sm' : 'text-white/30 hover:text-white/60'}`}
                >
                  <Camera size={11} />
                  Camera
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadMode('gallery'); retake(); }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all duration-300 flex items-center gap-1.5 ${uploadMode === 'gallery' ? 'bg-primary text-white shadow-glow-sm' : 'text-white/30 hover:text-white/60'}`}
                >
                  <Upload size={11} />
                  Gallery
                </button>
              </div>
            </div>

            <div 
              className="relative rounded-xl overflow-hidden aspect-video flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {!imgSrc ? (
                <>
                  {uploadMode === 'camera' ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        videoConstraints={{ facingMode: "user" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent flex items-end justify-center pb-5">
                        <button
                          type="button"
                          onClick={capture}
                          className="btn-primary text-[10px] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full"
                        >
                          <Camera size={14} />
                          Capture Photo
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                        <ImageIcon size={28} />
                      </div>
                      <input
                        type="file"
                        id="gallery-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleGalleryUpload}
                        ref={fileInputRef}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="btn-primary text-[10px] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full"
                      >
                        <Upload size={14} />
                        Choose from Gallery
                      </button>
                      <p className="font-mono text-[9px] text-white/15 uppercase tracking-[0.15em] mt-1">JPG / PNG / WEBP</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <img src={imgSrc} alt="Capture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent flex items-end justify-center pb-5 gap-3">
                    <div className="px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-2 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Photo Set
                    </div>
                    <button
                      type="button"
                      onClick={retake}
                      className="btn-secondary text-[10px] tracking-[0.1em] uppercase px-4 py-2 rounded-full"
                    >
                      <RotateCcw size={12} />
                      Retake
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 ${isSubmitting ? 'opacity-40 cursor-not-allowed' : ''} btn-primary justify-center py-4 text-sm`}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            {!isSubmitting && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-xs text-white/20">
          Already a member? <Link to="/login" className="text-primary hover:text-primary/80 transition-colors duration-300">Sign In</Link>
        </p>
      </motion.div>

      <AnimatePresence>
        {showCropper && (
          <ImageCropper 
            image={tempImg} 
            onCropComplete={handleCropComplete} 
            onCancel={() => setShowCropper(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;
