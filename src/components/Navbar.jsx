import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, LogIn, UserPlus, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/*
- Added **Submission Guards** (anti-double-click) to all forms and administrative actions to prevent duplicate data.
- Implemented a **Responsive Mobile Navbar** with a smooth-transition slide-down drawer and premium Cyberpunk aesthetics.
- Implemented a **Cyberpunk-styled Membership Card** using `html-to-image`.
*/
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
              <Rocket size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Coding<span className="text-blue-500">Club</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold uppercase tracking-widest">
            <Link to="/about" className="hover:text-blue-400 transition-colors py-2 underline-offset-8 hover:underline">
              About
            </Link>
            <Link to="/events" className="hover:text-blue-400 transition-colors py-2 underline-offset-8 hover:underline">
              Events
            </Link>
            <Link to="/members" className="hover:text-blue-400 transition-colors py-2 underline-offset-8 hover:underline">
              Members
            </Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors py-2 underline-offset-8 hover:underline">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-400 transition-colors py-2">
                  <LayoutDashboard size={16} />
                  <span>[ Dashboard ]</span>
                </Link>
                <button onClick={logout} className="flex items-center gap-2 hover:text-red-400 transition-colors py-2">
                  <LogOut size={16} />
                  <span>[ Exit ]</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400 transition-colors py-2 underline-offset-8 hover:underline">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-black px-6 py-2.5 rounded hover:bg-slate-200 transition-all flex items-center gap-2">
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-slate-900/90 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4 font-mono text-sm uppercase tracking-[0.2em] font-black italic">
                  <Link to="/about" onClick={closeMenu} className="block p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                    About
                  </Link>
                  <Link to="/events" onClick={closeMenu} className="block p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                    Events
                  </Link>
                  <Link to="/members" onClick={closeMenu} className="block p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                    Members
                  </Link>
                  <Link to="/contact" onClick={closeMenu} className="block p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                    Contact
                  </Link>
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        onClick={closeMenu}
                        className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <LogOut size={20} />
                    Exit_Session
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={closeMenu}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-slate-300"
                  >
                    <LogIn size={20} />
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={closeMenu}
                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-600 text-white"
                  >
                    <UserPlus size={20} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
