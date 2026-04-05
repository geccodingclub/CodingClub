import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import EventsPage from './pages/EventsPage';
import Contact from './pages/Contact';
import VerifiedID from './pages/VerifiedID';
import NotFound from './pages/NotFound';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventBanner from './components/EventBanner';
import NoticePage from './pages/NoticePage';
import Resources from './pages/Resources';
import ContestsPage from './pages/ContestsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CodeItRegister from './pages/CodeItRegister';
import CodeItRulebook from './pages/CodeItRulebook';
import CompleteProfile from './pages/CompleteProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './index.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
console.log('Google Client ID found:', GOOGLE_CLIENT_ID ? 'YES' : 'NO');
if (!GOOGLE_CLIENT_ID) {
  console.warn('CRITICAL: VITE_GOOGLE_CLIENT_ID is not defined in your .env file! Please check client/.env');
}

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono text-sm text-white/25">Loading...</div>;
  if (!user) return <Navigate to={`/login?redirect=${location.pathname}`} />;
  if (user.isProfileComplete === false && location.pathname !== '/complete-profile') {
    return <Navigate to={`/complete-profile?redirect=${location.pathname}`} />;
  }
  if (user.isProfileComplete !== false && location.pathname === '/complete-profile') {
    return <Navigate to="/dashboard" />;
  }
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/notices" element={
          <ProtectedRoute>
            <PageWrapper><NoticePage /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/members" element={
          <ProtectedRoute>
            <PageWrapper><VerifiedID /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/contests" element={
          <ProtectedRoute>
            <PageWrapper><ContestsPage /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <PageWrapper><LeaderboardPage /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/resources" element={<PageWrapper><Resources /></PageWrapper>} />
        <Route path="/codeit" element={<PageWrapper><CodeItRegister /></PageWrapper>} />
        <Route path="/codeit/rulebook" element={<PageWrapper><CodeItRulebook /></PageWrapper>} />
        <Route path="/complete-profile" element={
          <ProtectedRoute>
            <PageWrapper><CompleteProfile /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <PageWrapper><Dashboard /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen relative text-white/90 selection:bg-primary/30 overflow-x-hidden flex flex-col" style={{ backgroundColor: '#050505' }}>
            <Background />
            <Navbar />
            <div className="flex-grow">
              <AnimatedRoutes />
            </div>
            <EventBanner />
            <Footer />
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
