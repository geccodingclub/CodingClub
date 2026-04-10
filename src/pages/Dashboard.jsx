import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ShieldCheck, Users, Search, Code, Cpu, Terminal as TerminalIcon, Plus, X, Rocket, Power, Megaphone, Trash2, AlertTriangle, Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import MemberCard from '../components/MemberCard';
import EditProfileModal from '../components/EditProfileModal';
import { User as UserIcon, Settings, Camera, Download } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import download from 'downloadjs';

const Dashboard = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);


  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [processing, setProcessing] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', isImportant: false });
  const [progress, setProgress] = useState({ points: 0, rank: 'Unranked' });
  const [submissions, setSubmissions] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [codeItStatus, setCodeItStatus] = useState({ isRegistered: false, registration: null, loading: true });
  const [codeItRegistrations, setCodeItRegistrations] = useState([]);
  const [codeItSearch, setCodeItSearch] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);

  useEffect(() => {
    if (user && (user.role === 'VOLUNTEER' || user.role === 'PRESIDENT')) {
      fetchStudents();
      fetchPendingSubmissions();
      fetchCodeItRegistrations();
    } else if (user && user.role === 'STUDENT') {
      fetchProgress();
    }
    if (user && user.role === 'PRESIDENT') {
      fetchMembers();
    }
    if (user) {
      fetchEvents();
      fetchNotices();
      fetchCodeItStatus();
    }
  }, [user]);

  const fetchMembers = async () => {
    try {
      const res = await API.get('/users/members');
      setMembers(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchNotices = async () => {
    try {
      const res = await API.get('/notices');
      setNotices(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchProgress = async () => {
    try {
      const res = await API.get('/users/progress');
      setProgress(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchCodeItStatus = async () => {
    try {
      const res = await API.get('/codeit/status');
      setCodeItStatus({ isRegistered: res.data.isRegistered, registration: res.data.registration, loading: false });
    } catch (err) {
      setCodeItStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const fetchCodeItRegistrations = async () => {
    try {
      const res = await API.get('/codeit/registrations');
      setCodeItRegistrations(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchPendingSubmissions = async () => {
    try {
      const res = await API.get('/submissions?status=PENDING');
      setSubmissions(res.data);
    } catch (err) { console.error(err); }
  };

  const handleUpdateSubmissionStatus = async (id, status) => {
    if (!window.confirm(`Mark this submission as ${status}?`)) return;
    setProcessing(true);
    try {
      await API.put(`/submissions/${id}/status`, { status });
      fetchPendingSubmissions();
      showNotification(`Submission marked as ${status}`);
    } catch (err) {
      showNotification('Update failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await API.get('/users/all');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeItCheckIn = async (id) => {
    setProcessing(true);
    try {
      const res = await API.put(`/codeit/checkin/${id}`);
      showNotification(res.data.message);
      fetchCodeItRegistrations();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Check-in failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (showQrScanner) {
      const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: { width: 250, height: 250 } }, false);
      scanner.render((text) => {
        scanner.clear();
        setShowQrScanner(false);
        handleCodeItCheckIn(text);
      }, () => { /* ignore */ });

      return () => {
        scanner.clear().catch(e => console.log('Clear failed', e));
      };
    }
  }, [showQrScanner]);

  const downloadCodeItCSV = () => {
    const headers = ['Name', 'Email', 'Roll_No', 'Branch', 'Reg_No', 'Language', 'Checked_In', 'Check_In_Time'];
    const rows = codeItRegistrations.map(reg => [
      reg.user?.name,
      reg.user?.email,
      reg.user?.rollNo,
      reg.user?.department,
      reg.registrationNumber,
      reg.programmingLanguage,
      reg.isCheckedIn ? 'YES' : 'NO',
      reg.checkInTime ? new Date(reg.checkInTime).toLocaleString() : 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(item => `"${(item || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    download(csvContent, 'CodeIt_Registrations.csv', 'text/csv');
  };

  const handleVerify = async (id) => {
    setProcessing(true);
    try {
      await API.patch(`/users/verify/${id}`);
      setStudents(students.map(s => s._id === id ? { ...s, isVerified: true } : s));
      showNotification('Sector verified successfully');
    } catch (err) {
      showNotification('Verification protocol failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleAssignRole = async (userId, role) => {
    setProcessing(true);
    try {
      await API.post('/users/assign-role', { userId, role });
      showNotification(`Role updated to ${role}`);
      fetchMembers();
      fetchStudents();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Access level update failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await API.post('/events', newEvent);
      setShowEventModal(false);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      fetchEvents();
      showNotification('Event nexus deployed successfully');
    } catch (err) {
      showNotification('Event deployment failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Terminate event deployment?')) return;
    setProcessing(true);
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
      showNotification('Event termination successful');
    } catch (err) { 
      showNotification('Event termination failed', 'error'); 
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleLaunch = async (id) => {
    setProcessing(true);
    try {
      await API.patch(`/events/launch/${id}`);
      fetchEvents();
      showNotification('Event visibility toggled');
    } catch (err) {
      showNotification('Launch protocol failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await API.post('/notices/fire-up', newNotice);
      setShowNoticeModal(false);
      setNewNotice({ title: '', content: '', isImportant: false });
      fetchNotices();
      showNotification('Broadcast fired up successfully! Emails sent to Nexus.');
    } catch (err) {
      showNotification('Broadcast system offline', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Retract this broadcast?')) return;
    setProcessing(true);
    try {
      await API.delete(`/notices/${id}`);
      fetchNotices();
      showNotification('Broadcast retracted');
    } catch (err) {
      showNotification('Retraction failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 min-h-screen">
      <header className="mb-8 md:mb-16">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/30">
             <TerminalIcon size={20} className="md:w-6 md:h-6" />
           </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">Console<span className="text-blue-500">_Output</span></h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">// Logged in as: {user.name} ({user.role})</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowCardModal(true)}
                    className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/30 rounded text-[8px] md:text-[10px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-600 hover:text-white transition-all italic"
                  >
                    View_ID_Nexus
                  </button>
                  {(user.role === 'VOLUNTEER' || user.role === 'PRESIDENT') && (
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="px-2 py-0.5 bg-slate-600/10 border border-slate-500/30 rounded text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-600 hover:text-white transition-all italic flex items-center gap-1"
                    >
                      <Settings size={10} />
                      Edit_Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
        </div>
      </header>

      {(user.role === 'VOLUNTEER' || user.role === 'PRESIDENT') ? (
        <div className="space-y-8 md:space-y-12">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'DB_TOTAL', value: students.length, icon: <Users size={16}/>, color: 'blue' },
              { label: 'QUEUE_PENDING', value: students.filter(s => !s.isVerified).length, icon: <Clock size={16}/>, color: 'amber' },
              { label: 'DB_VERIFIED', value: students.filter(s => s.isVerified).length, icon: <CheckCircle size={16}/>, color: 'emerald' },
              { label: 'CODEIT_REG', value: codeItRegistrations.length, icon: <Trophy size={16}/>, color: 'blue' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-xl group hover:border-blue-500/20 transition-all">
                <div className={`text-${stat.color}-500/50 mb-3`}>{stat.icon}</div>
                <p className="text-2xl font-black mb-1">{stat.value}</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 flex-wrap gap-4">
              <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                <Code size={16} className="text-blue-500" />
                Root_Registry
              </h2>
              <div className="relative w-full sm:w-auto">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search name or ID..." 
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500/50 w-full sm:w-64 transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-500">
                    <th className="px-6 py-4 uppercase tracking-widest">Entry_Bio</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Entry_Name</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Roll_No</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Sector_Year</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Mobile_No</th>
                    <th className="px-6 py-4 uppercase tracking-widest">State</th>
                    <th className="px-6 py-4 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.filter(s => s.name?.toLowerCase().includes(studentSearch.toLowerCase()) || s.rollNo?.toString().toLowerCase().includes(studentSearch.toLowerCase())).map((student) => (
                    <tr key={student._id} className="hover:bg-blue-500/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 border border-white/5">
                          {student.profilePhoto ? (
                            <img src={student.profilePhoto} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600"><UserIcon size={16} /></div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-200">{student.name}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono italic">{student.rollNo}</td>
                      <td className="px-6 py-4 text-slate-400">[{student.department}]_{student.year}y</td>
                      <td className="px-6 py-4 text-slate-400">{student.phoneNumber}</td>
                      <td className="px-6 py-4">
                        {student.isVerified ? (
                          <span className="text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase text-[10px] font-black tracking-widest">Verified</span>
                        ) : (
                          <span className="text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 uppercase text-[10px] font-black tracking-widest">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!student.isVerified && (
                          <button 
                            disabled={processing}
                            onClick={() => handleVerify(student._id)}
                            className={`${processing ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white font-black px-4 py-2 rounded text-[10px] uppercase transition-all italic tracking-widest`}
                          >
                            {processing ? 'SYNCING...' : 'Verify_Now'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admins: Submission Review Console */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                <Code size={16} className="text-blue-500" />
                Proof_Validation_Queue
              </h2>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-500">
                    <th className="px-6 py-4 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Contest</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Proof_URL</th>
                    <th className="px-6 py-4 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-blue-500/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-200">{sub.user?.name} <span className="text-slate-500 italic">({sub.user?.rollNo})</span></td>
                      <td className="px-6 py-4 text-slate-400 font-mono italic">{sub.contest?.title}</td>
                      <td className="px-6 py-4">
                        <a href={sub.proofUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View_Proof</a>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          disabled={processing}
                          onClick={() => handleUpdateSubmissionStatus(sub._id, 'APPROVED')}
                          className={`${processing ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'} text-white font-black px-3 py-1.5 rounded text-[10px] uppercase transition-all tracking-widest`}
                        >
                          Approve
                        </button>
                        <button 
                          disabled={processing}
                          onClick={() => handleUpdateSubmissionStatus(sub._id, 'REJECTED')}
                          className={`${processing ? 'bg-slate-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'} text-white font-black px-3 py-1.5 rounded text-[10px] uppercase transition-all tracking-widest`}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  {submissions.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-slate-500 font-mono italic uppercase">Queue is empty</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CodeIt Registrations Table */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 flex-wrap gap-4">
              <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                <Trophy size={16} className="text-primary" />
                CodeIt_Registrations
                <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                  {codeItRegistrations.length}
                </span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {codeItRegistrations.filter(r => r.isCheckedIn).length} IN
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowQrScanner(!showQrScanner)}
                  className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                >
                  <Camera size={14} /> Scanner
                </button>
                <button
                  onClick={downloadCodeItCSV}
                  className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                >
                  <Download size={14} /> CSV
                </button>
                <div className="relative w-full sm:w-auto">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search participant..." 
                    value={codeItSearch}
                    onChange={(e) => setCodeItSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500/50 w-full sm:w-64 transition-all"
                  />
                </div>
              </div>
            </div>
            {showQrScanner && (
              <div className="p-6 border-b border-white/5 bg-slate-900/50 flex flex-col items-center">
                <p className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">Point Mobile QR at Camera Scanner</p>
                <div id="qr-reader" className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-2xl pb-4 border-2 border-dashed border-blue-500/30" />
              </div>
            )}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-500">
                    <th className="px-6 py-4 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Roll_No</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Branch</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Reg_No</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Language</th>
                    <th className="px-6 py-4 uppercase tracking-widest">HackerRank</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {codeItRegistrations
                    .filter(r => 
                      r.user?.name?.toLowerCase().includes(codeItSearch.toLowerCase()) || 
                      r.user?.rollNo?.toString().toLowerCase().includes(codeItSearch.toLowerCase()) ||
                      r.registrationNumber?.toLowerCase().includes(codeItSearch.toLowerCase())
                    )
                    .map((reg) => (
                    <tr key={reg._id} className="hover:bg-blue-500/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-800 border border-white/5 shrink-0">
                            {reg.user?.profilePhoto ? (
                              <img src={reg.user.profilePhoto} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600"><UserIcon size={14} /></div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-200">{reg.user?.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{reg.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono italic">{reg.user?.rollNo}</td>
                      <td className="px-6 py-4 text-slate-400 text-[10px]">{reg.user?.department}</td>
                      <td className="px-6 py-4 text-slate-300 font-bold">{reg.registrationNumber}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                          {reg.programmingLanguage}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          reg.usedHackerRank === 'Yes' 
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                            : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        }`}>
                          {reg.usedHackerRank}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-[10px]">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {codeItRegistrations.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-slate-500 font-mono italic uppercase">No registrations yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* President Special Sections */}
          {user.role === 'PRESIDENT' && (
            <div className="mt-12 space-y-12">
              {/* Member Management */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    Member_Management_Lvl_99
                  </h2>
                </div>
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="bg-white/5 text-slate-500">
                        <th className="px-6 py-4 uppercase tracking-widest">Member_Name</th>
                        <th className="px-6 py-4 uppercase tracking-widest">Current_Role</th>
                        <th className="px-6 py-4 uppercase tracking-widest text-right">Promote/Demote</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {members.map((member) => (
                        <tr key={member._id} className="hover:bg-emerald-500/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-200">{member.name}</td>
                          <td className="px-6 py-4 text-slate-400 font-mono italic">{member.role}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              disabled={processing}
                              onClick={() => handleAssignRole(member._id, 'VOLUNTEER')}
                              className={`${processing ? 'bg-slate-800 cursor-not-allowed text-slate-600' : 'bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30'} font-black px-3 py-1 rounded text-[10px] uppercase transition-all`}
                            >
                              VOLUNTEER
                            </button>
                            <button 
                              disabled={processing}
                              onClick={() => handleAssignRole(member._id, 'STUDENT')}
                              className={`${processing ? 'bg-slate-800 cursor-not-allowed text-slate-600' : 'bg-slate-700/20 hover:bg-slate-700 text-slate-400 border border-white/10'} font-black px-3 py-1 rounded text-[10px] uppercase transition-all`}
                            >
                              STUDENT
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Event Console */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                    <TerminalIcon size={16} className="text-purple-500" />
                    Event_Nexus_Control
                  </h2>
                  <button 
                    onClick={() => setShowEventModal(true)}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-black px-4 py-2 rounded text-[10px] uppercase transition-all italic tracking-widest flex items-center gap-2"
                  >
                    <Plus size={14} />
                    Deploy_New_Event
                  </button>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                  {events.length > 0 ? events.map((event) => (
                    <div key={event._id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          disabled={processing}
                          onClick={() => handleToggleLaunch(event._id)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                            event.isLaunched 
                            ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                            : 'bg-slate-800 border-white/10 text-slate-500 grayscale'
                          }`}
                          title={event.isLaunched ? 'Active_on_Nexus' : 'In_Draft_Mode'}
                        >
                          <Rocket size={18} className={event.isLaunched ? 'animate-pulse' : ''} />
                        </button>
                        <div>
                          <h4 className="font-black text-slate-200 uppercase tracking-tight">{event.title}</h4>
                          <p className="text-[10px] font-mono text-slate-500 mt-1">
                            {new Date(event.date).toLocaleDateString()} @ {event.location} | {event.isLaunched ? 'LIVE' : 'DRAFT'}
                          </p>
                        </div>
                      </div>
                      <button 
                        disabled={processing}
                        onClick={() => handleDeleteEvent(event._id)}
                        className={`${processing ? 'text-slate-700 cursor-not-allowed' : 'text-slate-600 hover:text-red-500'} transition-colors ml-4`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest col-span-2">No_Events_Found</p>
                  )}
                </div>
              </div>

              {/* Notice Management Console */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                    <Megaphone size={16} className="text-red-500" />
                    Notice_Broadcast_Console
                  </h2>
                  <button 
                    onClick={() => setShowNoticeModal(true)}
                    className="bg-red-600 hover:bg-red-500 text-white font-black px-4 py-2 rounded text-[10px] uppercase transition-all italic tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                  >
                    <Plus size={14} />
                    Fire_Up_Notice
                  </button>
                </div>
                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  {notices.length > 0 ? notices.map((notice) => (
                    <div key={notice._id} className={`p-4 rounded-xl border transition-all flex justify-between items-center ${notice.isImportant ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notice.isImportant ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                          <Megaphone size={18} />
                        </div>
                        <div>
                          <h4 className={`font-black uppercase tracking-tight ${notice.isImportant ? 'text-red-400' : 'text-slate-200'}`}>
                            {notice.title}
                          </h4>
                          <p className="text-[10px] font-mono text-slate-500 mt-1">
                            {new Date(notice.createdAt).toLocaleDateString()} | {notice.isImportant ? 'PRIORITY_ALPHA' : 'STANDARD_BROADCAST'}
                          </p>
                        </div>
                      </div>
                      <button 
                        disabled={processing}
                        onClick={() => handleDeleteNotice(notice._id)}
                        className={`${processing ? 'text-slate-700' : 'text-slate-600 hover:text-red-500'} transition-colors ml-4`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No_Active_Broadcasts</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Event Creation Modal */}
          {showEventModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8">Deploy_New<span className="text-purple-500">_Nexus_Event</span></h2>
                
                <form onSubmit={handleCreateEvent} className="space-y-6 font-mono text-xs">
                  <div className="space-y-2">
                    <label className="text-slate-500 uppercase tracking-widest">Entry_Title</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-purple-500 outline-none transition-all"
                      placeholder="EVENT_NAME_01"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-purple-500 outline-none transition-all min-h-[100px]"
                      placeholder="SYSTEM_LOGS..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-slate-500 uppercase tracking-widest">Sector_Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-purple-500 outline-none transition-all"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500 uppercase tracking-widest">Location</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-purple-500 outline-none transition-all"
                        placeholder="HQ_SECTOR"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={processing}
                    className={`w-full ${processing ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'} font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(147,51,234,0.3)] transition-all uppercase italic tracking-widest mt-4`}
                  >
                    {processing ? 'DEPLOYING_NEXUS...' : 'Authorize_Deployment'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
          {/* Notice Creation Modal */}
          {showNoticeModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
                <button 
                  onClick={() => setShowNoticeModal(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8">Fire_Up<span className="text-red-500">_Nexus_Broadcast</span></h2>
                
                <form onSubmit={handleCreateNotice} className="space-y-6 font-mono text-xs">
                  <div className="space-y-2">
                    <label className="text-slate-500 uppercase tracking-widest">Broadcast_Title</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-red-500 outline-none transition-all"
                      placeholder="URGENT_UPDATE_01"
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500 uppercase tracking-widest">Message_Payload</label>
                    <textarea 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-red-500 outline-none transition-all min-h-[120px]"
                      placeholder="INPUT_BROADCAST_DETAILS..."
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <input 
                      type="checkbox"
                      id="isImportant"
                      className="w-4 h-4 accent-red-600"
                      checked={newNotice.isImportant}
                      onChange={(e) => setNewNotice({...newNotice, isImportant: e.target.checked})}
                    />
                    <label htmlFor="isImportant" className="text-slate-300 font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                      <AlertTriangle size={14} className="text-amber-500" />
                      Priority_Alpha
                    </label>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-[10px] text-red-400 font-mono leading-relaxed uppercase">
                      // WARNING: Executing 'Fire_Up' will broadcast this notice via Nexus email to every verified member. Verify payload integrity before authorization.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={processing}
                    className={`w-full ${processing ? 'bg-slate-800 text-slate-600' : 'bg-red-600 hover:bg-red-500 text-white'} font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(239,68,68,0.3)] transition-all uppercase italic tracking-widest mt-4`}
                  >
                    {processing ? 'FIRE_UP_IN_PROGRESS...' : 'Authorize_Broadcast'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Report */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest italic mb-2 flex items-center gap-3">
                    <div className="w-2 h-6 bg-yellow-500" />
                    Combat_Record
                  </h3>
                  <p className="text-xs font-mono text-slate-400">Total accumulated points and club ranking</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-black text-yellow-500">{progress.points}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Points</p>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-blue-500">#{progress.rank}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Rank</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest italic mb-10 flex items-center gap-3">
                <div className="w-2 h-6 bg-blue-600" />
                Auth_Status
              </h3>
              
              {user.isVerified ? (
                <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle size={40} />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black text-emerald-400 mb-2 uppercase tracking-tight italic">Verified_Member</h4>
                    <p className="text-slate-500 font-mono text-sm leading-relaxed">System recognizes your identity. Full access to projects, repositories, and events is now unlocked.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    <Clock size={40} />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black text-amber-400 mb-2 uppercase tracking-tight italic">Pending_Review</h4>
                    <p className="text-slate-500 font-mono text-sm leading-relaxed">Your application is in the queue. Our volunteers are manually verifying college IDs for data integrity.</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* CodeIt Competition Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' }}
              />
              <h3 className="text-xl font-black uppercase tracking-widest italic mb-6 flex items-center gap-3 relative z-10">
                <div className="w-2 h-6 bg-primary" />
                CodeIt_Status
              </h3>
              
              {codeItStatus.loading ? (
                <div className="flex items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/5">
                  <Clock size={16} className="text-slate-500 animate-spin" />
                  <p className="font-mono text-xs text-slate-500 uppercase">Loading...</p>
                </div>
              ) : codeItStatus.isRegistered ? (
                <div className="relative z-10">
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle size={24} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-400 uppercase tracking-tight text-sm">Registered for CodeIt</h4>
                      <p className="text-slate-500 font-mono text-[10px] mt-1">You're all set! Details will be shared via email.</p>
                    </div>
                  </div>
                  {codeItStatus.registration && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Reg. No.</p>
                        <p className="font-mono text-xs text-slate-200 font-bold">{codeItStatus.registration.registrationNumber}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Language</p>
                        <p className="font-mono text-xs text-slate-200 font-bold">{codeItStatus.registration.programmingLanguage}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Registered</p>
                        <p className="font-mono text-xs text-slate-200 font-bold">{new Date(codeItStatus.registration.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  <Link to="/codeit/rulebook" className="inline-flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.15em] hover:text-primary/80 transition-colors">
                    <BookOpen size={12} />
                    View Rulebook
                    <ChevronRight size={10} />
                  </Link>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Trophy size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-black text-primary uppercase tracking-tight text-sm">CodeIt — Coding Competition</h4>
                      <p className="text-slate-500 font-mono text-[10px] mt-1">CORTEX presents the ultimate coding showdown. Register now!</p>
                    </div>
                  </div>
                  <Link 
                    to="/codeit" 
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-black px-6 py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  >
                    <Trophy size={14} />
                    Register Now
                    <ChevronRight size={12} />
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Upcoming Events for Students */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5"
            >
              <h3 className="text-xl font-black uppercase tracking-widest italic mb-10 flex items-center gap-3">
                <div className="w-2 h-6 bg-purple-600" />
                Upcoming_Events
              </h3>
              
              <div className="grid gap-6">
                {events.length > 0 ? events.map((event) => (
                  <div key={event._id} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-slate-100 uppercase tracking-tight">{event.title}</h4>
                      <p className="text-slate-400 font-mono text-sm mt-2">{event.description}</p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded">Date: {new Date(event.date).toLocaleDateString()}</span>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Loc: {event.location}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Organizer: {event.organizer?.name || 'System'}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">// No_Broadcasts_Available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 rounded-2xl bg-slate-950/40 border border-white/5 font-mono"
          >
            <div className="flex flex-col items-center mb-10 pb-10 border-b border-white/5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-slate-900 mb-4">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700"><UserIcon size={40} /></div>
                )}
              </div>
              <button 
                onClick={() => setShowCardModal(true)}
                className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group/id"
              >
                <ShieldCheck size={14} className="group-hover/id:scale-110 transition-transform" />
                View_Member_ID
              </button>
              <button 
                onClick={() => setShowEditModal(true)}
                className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-2 group/edit"
              >
                <Settings size={14} className="group-hover/edit:rotate-90 transition-transform duration-500" />
                Edit_Profile
              </button>
            </div>

            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-10 italic underline underline-offset-8 decoration-blue-500/50">
              Profile_Metadata
            </h3>
            <div className="space-y-8">
              {[
                { label: 'ROLL_NO', value: user.rollNo },
                { label: 'DEPT', value: user.department },
                { label: 'YEAR', value: `${user.year}nd Year` },
                { label: 'CONTACT', value: user.phoneNumber || 'N/A' },
                { label: 'TIMESTAMP', value: new Date(user.createdAt).toLocaleDateString() }
              ].map((meta, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-600 mb-1 tracking-widest">{meta.label}</p>
                  <p className="text-slate-200 text-sm font-bold">{meta.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Member Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 overflow-y-auto flex flex-col p-4 sm:p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="my-auto relative flex flex-col items-center w-full mx-auto max-w-md"
          >
            <button 
              onClick={() => setShowCardModal(false)}
              className="mb-6 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white flex items-center gap-2 uppercase font-mono text-[10px] sm:text-xs tracking-[0.2em] transition-all backdrop-blur-md sticky top-4 z-50"
            >
              <X size={16} /> Exit_Visualizer
            </button>
            <div className="w-full">
              <MemberCard user={user} />
            </div>
          </motion.div>
        </div>
      )}

      <EditProfileModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
    </div>
  );
};

export default Dashboard;
