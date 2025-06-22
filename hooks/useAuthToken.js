import { getCookieValue } from '@/helpers/cookies';
import { useRouter } from '@/i18n/navigation';
import { logout } from '@/lib/store/slices/authSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook to get the authentication token from browser cookies
 * @returns {string|null} The browser authentication token or null if no browser token exists
 */
const useAuthToken = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.auth.token);
  const browserToken = getCookieValue('authToken');

  // Handle logout and navigation in useEffect to avoid render-time side effects
  useEffect(() => {
    if (reduxToken && !browserToken) {
      dispatch(logout());
      router.push('/login');
    }
  }, [reduxToken, browserToken, dispatch, router]);

  // Return browser token if available, otherwise null
  return browserToken || null;
};

export { useAuthToken };
