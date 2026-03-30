import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = ({ redirectTo = '/dashboard', text = 'Continue with Google' }) => {
  const { loginWithGoogle } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Exchange access token for user info
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        // Send to our backend
        const data = await loginWithGoogle({
          googleId: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        });

        const user = data.user;
        showNotification(`Welcome${user.isProfileComplete ? ' back' : ''}, ${user.name.split(' ')[0]}!`);

        if (!user.isProfileComplete) {
          navigate(`/complete-profile${redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}`);
        } else {
          navigate(redirectTo);
        }
      } catch (err) {
        showNotification(err.response?.data?.message || 'Google sign-in failed. Please try again.', 'error');
      }
    },
    onError: () => {
      showNotification('Google sign-in was cancelled or failed.', 'error');
    },
    flow: 'implicit',
  });

  return (
    <button
      type="button"
      onClick={() => handleGoogle()}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-mono text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      {/* Google SVG Icon */}
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
        <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
        <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
        <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
      </svg>
      {text}
    </button>
  );
};

export default GoogleSignInButton;
