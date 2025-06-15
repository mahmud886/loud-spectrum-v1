import { getCookieValue } from '@/helpers/cookies';
import { useSelector } from 'react-redux';

/**
 * Custom hook to get the authentication token from either Redux store or browser cookies
 * @returns {string} The authentication token
 */
const useAuthToken = () => {
  const reduxToken = useSelector((state) => state.auth.token);
  const browserToken = getCookieValue('authToken');

  // Return Redux token if available, otherwise fall back to browser token
  return reduxToken === undefined ? browserToken : reduxToken;
};

export { useAuthToken };
