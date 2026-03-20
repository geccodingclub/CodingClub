import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Award, TrendingUp } from 'lucide-react';
import api from '../api/axios';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await api.get('/users/leaderboard');
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic flex items-center gap-4">
          <Trophy className="text-yellow-500 w-10 h-10 md:w-14 md:h-14" />
          Hall of <span className="text-blue-500">Fame</span>
        </h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest max-w-2xl">
          Top performers in our coding challenges. Keep pushing boundaries.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              {users.map((user, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={user._id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 rounded-xl border transition-all ${
                    index === 0 ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]' :
                    index === 1 ? 'bg-slate-300/10 border-slate-300/50' :
                    index === 2 ? 'bg-amber-700/10 border-amber-700/50' :
                    'bg-slate-800/30 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
                    <div className="text-2xl font-black font-mono text-slate-500 w-8 md:w-12 text-center">
                      #{index + 1}
                    </div>
                    
                    <div className="relative">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt={user.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-700" />
                      ) : (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 text-slate-500 font-black">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                          {index === 0 && <Medal className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                          {index === 1 && <Medal className="w-5 h-5 text-slate-300 fill-slate-300" />}
                          {index === 2 && <Medal className="w-5 h-5 text-amber-600 fill-amber-600" />}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white">{user.name}</h3>
                      <p className="text-xs font-mono text-slate-400">
                        {user.department} • {user.year} Year
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-950/50 px-6 py-3 rounded-lg border border-white/5 md:ml-auto w-fit">
                    <Star className={`w-5 h-5 ${index === 0 ? 'text-yellow-500' : 'text-blue-500'}`} />
                    <span className="font-mono text-xl font-black text-white">{user.points}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-black uppercase tracking-widest">PTS</span>
                  </div>
                </motion.div>
              ))}

              {users.length === 0 && (
                <div className="text-center py-20">
                  <Award className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-400 font-mono text-sm">No rankings yet. Be the first to earn points!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
