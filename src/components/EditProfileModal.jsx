import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Camera, Upload, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import ImageCropper from './ImageCropper';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const DEPARTMENTS = [
  'Select Department',
  'Instrumentation Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering'
];

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUserInfo } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber || '',
    profilePhoto: user.profilePhoto || '',
    rollNo: user.rollNo || '',
    department: user.department || DEPARTMENTS[0],
    year: user.year || 1
  });
  const [tempImg, setTempImg] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

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
    setFormData(prev => ({ ...prev, profilePhoto: croppedImage }));
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await API.patch('/users/profile', formData);
      updateUserInfo(res.data);
      showNotification('Profile updated successfully');
      onClose();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-lg relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8">Update<span className="text-blue-500">_Profile_Metadata</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {/* Photo Edit */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative group/photo cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-slate-800">
                {formData.profilePhoto ? (
                  <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700"><User size={40} /></div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity rounded-2xl">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleGalleryUpload}
            />
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">// Click image to update visual ID</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-slate-500 uppercase tracking-widest text-[10px]">Codename_Entry</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <User size={16} className="text-slate-500" />
                  <input 
                    type="text" 
                    className="bg-transparent border-none outline-none w-full text-slate-200"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-500 uppercase tracking-widest text-[10px]">Access_ID_Token</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <Check size={16} className="text-slate-500" />
                  <input 
                    type="text" 
                    className="bg-transparent border-none outline-none w-full text-slate-200"
                    placeholder="College Roll No"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-500 uppercase tracking-widest text-[10px]">Uplink_Contact</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <Phone size={16} className="text-slate-500" />
                  <input 
                    type="tel" 
                    className="bg-transparent border-none outline-none w-full text-slate-200"
                    placeholder="10-digit phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-slate-500 uppercase tracking-widest text-[10px]">Division_Assignment</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <ImageIcon size={16} className="text-slate-500" />
                  <select 
                    className="bg-transparent border-none outline-none w-full text-slate-200 appearance-none"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept} disabled={dept === 'Select Department'} className="bg-slate-900">{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-500 uppercase tracking-widest text-[10px]">Phase_Year</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus-within:border-blue-500/50 transition-all">
                  <ImageIcon size={16} className="text-slate-500" />
                  <select 
                    className="bg-transparent border-none outline-none w-full text-slate-200 appearance-none"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  >
                    {[1,2,3,4].map(y => <option key={y} value={y} className="bg-slate-900">{y} Year</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'} font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all uppercase italic tracking-widest mt-4 flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                SYNCING_CHANGES...
              </>
            ) : (
              <>
                <Check size={16} />
                Authorize_Update
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {showCropper && (
            <ImageCropper 
              image={tempImg} 
              onCropComplete={handleCropComplete} 
              onCancel={() => setShowCropper(false)} 
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
