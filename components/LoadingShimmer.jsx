'use client';

import HeroShimmer from '@/components/HeroShimmer';
import NavbarShimmer from '@/components/navbar/NavbarShimmer';

const LoadingShimmer = () => {
  return (
    <div className="bg-white-100 min-h-screen">
      {/* Navbar Shimmer */}
      <NavbarShimmer />

      {/* Hero Shimmer */}
      <HeroShimmer />

      {/* Additional content shimmer */}
      <div className="animate-pulse">
        <div className="container mx-auto px-4 py-16">
          {/* Section shimmer */}
          <div className="space-y-16">
            {/* First section */}
            <div className="space-y-8">
              <div className="h-12 w-64 rounded bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-2">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="space-y-4">
                    <div className="h-48 w-full rounded bg-gray-200"></div>
                    <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second section */}
            <div className="space-y-8">
              <div className="h-12 w-80 rounded bg-gray-200"></div>
              <div className="h-64 w-full rounded bg-gray-200"></div>
            </div>

            {/* Third section */}
            <div className="space-y-8">
              <div className="h-12 w-72 rounded bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {[1, 2].map((index) => (
                  <div key={index} className="space-y-4">
                    <div className="h-32 w-full rounded bg-gray-200"></div>
                    <div className="h-6 w-2/3 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingShimmer;
