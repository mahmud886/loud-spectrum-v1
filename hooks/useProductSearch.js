import { getSearchProducts } from '@/services/get-search-products';
import { useEffect, useState } from 'react';

export function useProductSearch(search) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!search) {
      setProducts([]);
      setLoading(false);
      setError(null);
      setFetched(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const handler = setTimeout(() => {
      (async () => {
        try {
          const res = await getSearchProducts(search, { signal: controller.signal });
          if (res.error) {
            setError(res.message || 'Failed to fetch products');
            setProducts([]);
          } else {
            setProducts((res?.data || []).filter((p) => p.status === 'Active' && p.is_deleted === false));
          }
          setFetched(true);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError('Failed to fetch products');
          }
        } finally {
          setLoading(false);
        }
      })();
    }, 600);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [search]);

  return { products, loading, error, fetched };
}
