'use client';
import { getUserStatus } from '@/services/get-user-status';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthToken } from './useAuthToken';

export function useUserStatus() {
  const authToken = useAuthToken();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchStatus() {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserStatus(authToken);
        if (!isMounted) return;
        // console.log('useUserStatus: API response received', response);
        if (response?.error) {
          setData(null);
          setError(new Error(response?.message || 'Failed to fetch user status'));
        } else {
          setData(response?.data ?? null);
          setError(null);
        }
      } catch (err) {
        if (!isMounted) return;
        // console.error('useUserStatus: API error', err);
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    // Only attempt fetch if we have a token; otherwise clear to defaults
    if (authToken && isAuthenticated) {
      fetchStatus();
    } else {
      setData(null);
      setError(null);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [authToken, isAuthenticated]);

  return { data, userStatus: data, error, loading };
}
