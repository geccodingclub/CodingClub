import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ShieldCheck, Users, Search, Code, Cpu, Terminal as TerminalIcon, Plus, X } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    if (user && (user.role === 'VOLUNTEER' || user.role === 'PRESIDENT')) {
      fetchStudents();
    }
    if (user && user.role === 'PRESIDENT') {
      fetchMembers();
    }
    if (user) {
      fetchEvents();
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

  const handleVerify = async (id) => {
    try {
      await API.patch(`/users/verify/${id}`);
      setStudents(students.map(s => s._id === id ? { ...s, isVerified: true } : s));
    } catch (err) {
      alert('Verification failed');
    }
  };

  const handleAssignRole = async (userId, role) => {
    try {
      await API.post('/users/assign-role', { userId, role });
      alert('Role updated successfully');
      fetchMembers();
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', newEvent);
      setShowEventModal(false);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      fetchEvents();
      alert('Event deployed successfully');
    } catch (err) {
      alert('Failed to deploy event');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete event?')) return;
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) { alert('Delete failed'); }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/30">
             <TerminalIcon size={24} />
           </div>
           <div>
             <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Console<span className="text-blue-500">_Output</span></h1>
             <p className="text-slate-500 font-mono text-xs mt-1 uppercase tracking-widest">// Logged in as: {user.name} ({user.role})</p>
           </div>
        </div>
      </header>

      {(user.role === 'VOLUNTEER' || user.role === 'PRESIDENT') ? (
        <div className="space-y-12">
          {/* Stats Bar */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'DB_TOTAL', value: students.length, icon: <Users size={16}/>, color: 'blue' },
              { label: 'QUEUE_PENDING', value: students.filter(s => !s.isVerified).length, icon: <Clock size={16}/>, color: 'amber' },
              { label: 'DB_VERIFIED', value: students.filter(s => s.isVerified).length, icon: <CheckCircle size={16}/>, color: 'emerald' },
              { label: 'SYS_LOAD', value: '1.2ms', icon: <Cpu size={16}/>, color: 'purple' }
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
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                <Code size={16} className="text-blue-500" />
                Root_Registry
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-500">
                    <th className="px-6 py-4 uppercase tracking-widest">Entry_Name</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Index_ID</th>
                    <th className="px-6 py-4 uppercase tracking-widest">Sector_Year</th>
                    <th className="px-6 py-4 uppercase tracking-widest">State</th>
                    <th className="px-6 py-4 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((student) => (
                    <tr key={student._id} className="hover:bg-blue-500/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-200">{student.name}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono italic">{student.collegeId}</td>
                      <td className="px-6 py-4 text-slate-400">[{student.department}]_{student.year}y</td>
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
                            onClick={() => handleVerify(student._id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-black px-4 py-2 rounded text-[10px] uppercase transition-all italic tracking-widest"
                          >
                            Verify_Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
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
                <div className="overflow-x-auto">
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
                              onClick={() => handleAssignRole(member._id, 'VOLUNTEER')}
                              className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 font-black px-3 py-1 rounded text-[10px] uppercase transition-all"
                            >
                              VOLUNTEER
                            </button>
                            <button 
                              onClick={() => handleAssignRole(member._id, 'STUDENT')}
                              className="bg-slate-700/20 hover:bg-slate-700 text-slate-400 border border-white/10 font-black px-3 py-1 rounded text-[10px] uppercase transition-all"
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
                <div className="p-6 grid md:grid-cols-2 gap-4">
                  {events.length > 0 ? events.map((event) => (
                    <div key={event._id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-slate-200 uppercase tracking-tight">{event.title}</h4>
                        <p className="text-[10px] font-mono text-slate-500 mt-1">{new Date(event.date).toLocaleDateString()} @ {event.location}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteEvent(event._id)}
                        className="text-slate-600 hover:text-red-500 transition-colors"
                      >
                        <Clock size={16} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest col-span-2">No_Events_Found</p>
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
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(147,51,234,0.3)] transition-all uppercase italic tracking-widest mt-4"
                  >
                    Authorize_Deployment
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
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-10 italic underline underline-offset-8 decoration-blue-500/50">
              Profile_Metadata
            </h3>
            <div className="space-y-8">
              {[
                { label: 'UID', value: user.collegeId },
                { label: 'DEPT', value: user.department },
                { label: 'YEAR', value: `${user.year}nd Year` },
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
    </div>
  );
};

export default Dashboard;
