import { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Fingerprint, BookOpen, Calendar, ChevronRight, Phone, Camera, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import Webcam from 'react-webcam';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', rollNo: '', department: 'Computer Science', year: 1, phoneNumber: '', profilePhoto: ''
  });
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadMode, setUploadMode] = useState('camera'); // 'camera' or 'gallery'

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setFormData(prev => ({ ...prev, profilePhoto: imageSrc }));
  }, [webcamRef]);

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
    if (!formData.profilePhoto) {
      showNotification('Identity visual record required', 'error');
      return;
    }
    try {
      await register(formData);
      showNotification('Identity record created. Welcome to the club.');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration sequence failure';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900/60 backdrop-blur-xl p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Initialize<span className="text-blue-500">_User</span></h2>
          <p className="text-slate-500 font-mono text-sm">// Create your permanent record in the club database</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {[
                { name: 'name', icon: <User size={18} />, placeholder: 'Full Name' },
                { name: 'email', icon: <Mail size={18} />, placeholder: 'College Email', type: 'email' },
                { name: 'password', icon: <Lock size={18} />, placeholder: 'Password', type: 'password' },
              ].map((f) => (
                <div key={f.name} className="group/input">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                    <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors">{f.icon}</span>
                    <input
                      required
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      className="bg-transparent border-none outline-none w-full font-mono text-sm placeholder:text-slate-600"
                      value={formData[f.name]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="group/input text-sm">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors"><Fingerprint size={18} /></span>
                  <input
                    required
                    placeholder="College Roll No"
                    className="bg-transparent border-none outline-none w-full font-mono placeholder:text-slate-600"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  />
                </div>
              </div>

              <div className="group/input text-sm">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors"><BookOpen size={18} /></span>
                  <select 
                    className="bg-transparent border-none outline-none w-full font-mono appearance-none"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {['Instrumentation Engineering', 'Civil Engineering', 'Computer Science and Engineering', 'Mechanical Engineering', 'Electrical', 'Electronics Engineering'].map(dept => (
                      <option key={dept} value={dept} className="bg-slate-900">{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="group/input text-sm">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors"><Calendar size={18} /></span>
                  <select 
                    className="bg-transparent border-none outline-none w-full font-mono appearance-none"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  >
                    {[1,2,3,4].map(y => <option key={y} value={y} className="bg-slate-900">{y} Year</option>)}
                  </select>
                </div>
              </div>

              <div className="group/input text-sm">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <span className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors"><Phone size={18} /></span>
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-transparent border-none outline-none w-full font-mono placeholder:text-slate-600"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic">Verify_Identity_Bio</h3>
              <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => { setUploadMode('camera'); retake(); }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all flex items-center gap-2 ${uploadMode === 'camera' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Camera size={12} />
                  Cam
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadMode('gallery'); retake(); }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all flex items-center gap-2 ${uploadMode === 'gallery' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Upload size={12} />
                  Gallery
                </button>
              </div>
            </div>

            <div className="relative group/camera rounded-xl overflow-hidden bg-slate-800/50 border border-white/5 aspect-video flex items-center justify-center">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-6">
                        <button
                          type="button"
                          onClick={capture}
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                        >
                          <Camera size={16} />
                          Capture_Visual_ID
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <ImageIcon size={32} />
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
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                      >
                        <Upload size={16} />
                        Select_From_Gallery
                      </button>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-2">Format: JPG/PNG/WEBP</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <img src={imgSrc} alt="Capture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-6 gap-4">
                    <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Visual_Fixed
                    </div>
                    <button
                      type="button"
                      onClick={retake}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 flex items-center gap-2 backdrop-blur-sm"
                    >
                      <RotateCcw size={14} />
                      Re-scan
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!formData.profilePhoto}
            className={`w-full ${!formData.profilePhoto ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'} font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 group/btn uppercase tracking-widest italic mt-8`}
          >
            {formData.profilePhoto ? 'Execute_Registration' : 'Visual_ID_Required'}
            <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-10 text-center font-mono text-xs text-slate-500">
          ALREADY_MEMBER? <Link to="/login" className="text-blue-400 hover:underline hover:text-blue-300">AUTH_NOW</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
