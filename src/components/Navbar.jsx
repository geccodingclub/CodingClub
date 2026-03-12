import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
              <Rocket size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Coding<span className="text-blue-500">Club</span>
            </span>
          </Link>

          <div className="flex items-center gap-8 font-mono text-xs font-bold uppercase tracking-widest">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
