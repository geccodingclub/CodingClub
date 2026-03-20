import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Calendar, Plus, X, Upload, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ContestsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Forms
  const [formData, setFormData] = useState({ title: '', description: '', platformLink: '', pointsReward: 10, startDate: '', endDate: '' });
  const [submissionData, setSubmissionData] = useState({ contestId: null, proofUrl: '' });

  // Student's submissions to track status
  const [mySubmissions, setMySubmissions] = useState([]);

  useEffect(() => {
    fetchContests();
    if (user?.role === 'STUDENT') {
      fetchMySubmissions();
    }
  }, [user]);

  const fetchContests = async () => {
    try {
      const { data } = await api.get('/contests');
      setContests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMySubmissions = async () => {
    try {
      const { data } = await api.get('/submissions/me');
      setMySubmissions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await api.post('/contests', formData);
      showNotification('Contest created successfully', 'success');
      setShowCreateModal(false);
      setFormData({ title: '', description: '', platformLink: '', pointsReward: 10, startDate: '', endDate: '' });
      fetchContests();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to create contest', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this challenge?")) return;
    try {
      await api.delete(`/contests/${id}`);
      showNotification('Challenge deleted successfully', 'success');
      fetchContests();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete challenge', 'error');
    }
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await api.post('/submissions', submissionData);
      showNotification('Proof submitted successfully! Awaiting review.', 'success');
      setShowSubmitModal(false);
      setSubmissionData({ contestId: null, proofUrl: '' });
      fetchMySubmissions();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to submit proof', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const getSubmissionStatus = (contestId) => {
    const sub = mySubmissions.find(s => s.contest?._id === contestId);
    if (!sub) return null;
    return sub.status;
  };

  const isAdmin = user?.role === 'PRESIDENT' || user?.role === 'VOLUNTEER';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic flex items-center gap-4">
            <Code className="text-blue-500 w-10 h-10 md:w-14 md:h-14" />
            Active <span className="text-blue-500">Contests</span>
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-xl">
            Participate in our daily and weekly challenges to earn points and climb the leaderboard.
          </p>
        </motion.div>
        
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/25"
          >
            <Plus size={18} />
            Create Challenge
          </motion.button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, i) => {
            const status = getSubmissionStatus(contest._id);
            const isFinished = new Date(contest.endDate) < new Date();
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={contest._id}
                className="bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-blue-500/50 rounded-2xl p-6 transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    {contest.pointsReward} PTS
                  </div>
                  <div className="flex items-center gap-2">
                    {isFinished && (
                      <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-[10px] font-black uppercase tracking-widest">
                        Ended
                      </div>
                    )}
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="p-1 px-2 flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded border border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
                        title="Delete Contest"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{contest.title}</h3>
                <p className="text-sm text-slate-400 mb-6 flex-grow">{contest.description}</p>
                
                <div className="space-y-4 font-mono text-[10px] text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    Due: {new Date(contest.endDate).toLocaleDateString()}
                  </div>
                  <a 
                    href={contest.platformLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:underline"
                  >
                    <ExternalLink size={14} />
                    Platform Link
                  </a>
                </div>

                {!isAdmin && !isFinished && status !== 'APPROVED' && (
                  <button
                    onClick={() => { setSubmissionData({ contestId: contest._id, proofUrl: '' }); setShowSubmitModal(true); }}
                    className="w-full py-3 bg-white/5 hover:bg-blue-600 text-white rounded-lg font-black uppercase text-xs tracking-widest transition-all group-hover:bg-blue-600"
                  >
                    {status === 'PENDING' ? 'Update Proof' : status === 'REJECTED' ? 'Resubmit Proof' : 'Submit Solution'}
                  </button>
                )}

                {!isAdmin && status === 'APPROVED' && (
                  <div className="w-full py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 border border-emerald-500/20">
                    <CheckCircle2 size={16} /> Completed
                  </div>
                )}
                {!isAdmin && status === 'PENDING' && (
                  <div className="w-full py-2 text-yellow-400 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 mt-2">
                    <Clock size={16} /> Under Review
                  </div>
                )}
              </motion.div>
            );
          })}
          
          {contests.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
              <Code className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 font-mono text-sm max-w-sm mx-auto">
                No active challenges right now. Rest your keyboard and prepare for the next battle.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modals omitted for brevity, will add next if needed */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold uppercase italic">New_Challenge</h3>
                <button onClick={() => setShowCreateModal(false)}><X className="text-slate-400 hover:text-white" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <input placeholder="Contest Title" required className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <textarea placeholder="Description" required className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input placeholder="Platform URL (e.g. LeetCode link)" required type="url" className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm" value={formData.platformLink} onChange={e => setFormData({...formData, platformLink: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Points</label>
                    <input type="number" required className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm" value={formData.pointsReward} onChange={e => setFormData({...formData, pointsReward: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Start</label>
                    <input type="datetime-local" required className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">End</label>
                    <input type="datetime-local" required className="w-full bg-slate-800 border-none p-3 rounded-lg text-sm" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>
                <button type="submit" disabled={processing} className={`w-full ${processing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'} p-3 rounded-lg font-bold uppercase tracking-widest mt-4`}>
                  {processing ? 'Deploying...' : 'Deploy'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {showSubmitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold uppercase italic flex items-center gap-2"><Upload size={20}/> Submit_Proof</h3>
                <button onClick={() => setShowSubmitModal(false)}><X className="text-slate-400 hover:text-white" /></button>
              </div>
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <p className="text-sm text-slate-400 mb-4">Paste the link to your accepted solution on the platform, or a link to a screenshot.</p>
                <input placeholder="Proof URL" required type="url" className="w-full bg-slate-800 border-none p-4 rounded-lg text-sm font-mono" value={submissionData.proofUrl} onChange={e => setSubmissionData({...submissionData, proofUrl: e.target.value})} />
                <button type="submit" disabled={processing} className={`w-full ${processing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'} p-4 rounded-lg font-black uppercase tracking-widest mt-4`}>
                  {processing ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContestsPage;
