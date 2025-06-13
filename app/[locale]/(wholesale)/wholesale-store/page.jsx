'use client';

import WholesaleProductCard from '@/components/wholesale/WholesaleProductCard';
import WholesaleProductCardShimmer from '@/components/wholesale/WholesaleProductCardShimmer';
import { getWholesalerProducts } from '@/services/get-wholesaler-products';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WholesaleStorePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user?.id) {
        try {
          const response = await getWholesalerProducts(user.id, token);
          setProducts(response?.data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [user, token]);

  if (!user?.id) {
    return <div className="py-20 text-center">Please log in to view wholesale products</div>;
  }

  if (loading) {
    return (
      <div className="py-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <WholesaleProductCardShimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center">Error loading products. Please try again later.</div>;
  }

  if (!products) {
    return <div className="py-20 text-center">No products available</div>;
  }

  return (
    <div className="py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {products?.wholesalerProducts?.[0]?.products?.map((product) => (
          <WholesaleProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WholesaleStorePage;
