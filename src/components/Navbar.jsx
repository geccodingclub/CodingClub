import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const navLinkClass = "relative text-white/60 hover:text-white transition-colors duration-300 py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav 
      className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ 
        background: 'rgba(5, 5, 5, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="CORTEX Logo" 
              className="w-9 h-9 rounded-lg object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-heading font-extrabold tracking-wide uppercase text-white">
                CORTEX
              </span>
              
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 font-mono text-[11px] font-medium uppercase tracking-[0.15em]">
            <Link to="/about" className={navLinkClass}>About</Link>
            <Link to="/events" className={navLinkClass}>Events</Link>
            <Link to="/notices" className={navLinkClass}>Notices</Link>
            <Link to="/contests" className={`${navLinkClass} text-primary`}>
              Contests
              <span className="absolute top-1 -right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </Link>
            <Link to="/leaderboard" className={`${navLinkClass} text-amber-400 hover:text-amber-300`}>Rankings</Link>
            <Link to="/members" className={navLinkClass}>Members</Link>
            <Link to="/contact" className={navLinkClass}>Contact</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 py-2">
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </Link>
                <button onClick={logout} className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors duration-300 py-2">
                  <LogOut size={14} />
                  <span>Exit</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={navLinkClass}>Login</Link>
                <Link to="/register" className="btn-primary text-[11px] tracking-[0.15em] uppercase px-5 py-2">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 text-white/40 hover:text-white transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/[0.06] overflow-hidden"
            style={{ 
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-4 py-6 space-y-2 font-mono text-xs uppercase tracking-[0.15em] font-medium">
              <Link to="/about" onClick={closeMenu} className="block p-3.5 rounded-xl surface-card-hover text-white/60 hover:text-white transition-all duration-300">
                About
              </Link>
              <Link to="/events" onClick={closeMenu} className="block p-3.5 rounded-xl surface-card-hover text-white/60 hover:text-white transition-all duration-300">
                Events
              </Link>
              <Link to="/notices" onClick={closeMenu} className="block p-3.5 rounded-xl surface-card-hover text-white/60 hover:text-white transition-all duration-300">
                Notices
              </Link>
              <Link to="/contests" onClick={closeMenu} className="block p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold">
                Contests
              </Link>
              <Link to="/leaderboard" onClick={closeMenu} className="block p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-400 font-bold">
                Rankings
              </Link>
              <Link to="/members" onClick={closeMenu} className="block p-3.5 rounded-xl surface-card-hover text-white/60 hover:text-white transition-all duration-300">
                Members
              </Link>
              <Link to="/contact" onClick={closeMenu} className="block p-3.5 rounded-xl surface-card-hover text-white/60 hover:text-white transition-all duration-300">
                Contact
              </Link>

              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-primary"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400"
                    >
                      <LogOut size={18} />
                      Exit Session
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3.5 rounded-xl surface-card-hover text-white/60"
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-primary text-white font-bold"
                    >
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
