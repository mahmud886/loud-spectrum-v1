'use client';

const OrderDetailsPageShimmer = () => {
  return (
    <div className="mx-auto w-full max-w-full p-4 xl:p-0">
      {/* Back to Orders Button Shimmer */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      <div className="animate-pulse">
        {/* Order Title Shimmer */}
        <div className="mb-2 h-8 w-48 rounded bg-gray-200"></div>

        {/* Product List Shimmer */}
        <div className="mb-4">
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <div className="w-full">
              {/* Table Header */}
              <div className="bg-stardust/20">
                <div className="grid grid-cols-4 gap-4 py-1">
                  <div className="h-9 rounded bg-gray-200"></div>
                  <div className="h-9 rounded bg-gray-200"></div>
                  <div className="h-9 rounded bg-gray-200"></div>
                  <div className="h-9 rounded bg-gray-200"></div>
                </div>
              </div>
              {/* Table Rows */}
              <div className="divide-y">
                {[1, 2, 3].map((index) => (
                  <div key={`shimmer-${index}`} className="grid grid-cols-4 gap-4 py-1">
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address and Summary Section Shimmer */}
        <div className="flex flex-col gap-2 xl:flex-row xl:space-x-6">
          {/* Address Section */}
          <div className="w-full xl:flex-1">
            <div className="mb-4 h-6 w-24 rounded bg-gray-200"></div>
            <div className="bg-stardust/20 divide-umbra-10 divide-y rounded-[10px]">
              {/* Shipping Address */}
              <div className="p-4">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                </div>
              </div>
              {/* Billing Address */}
              <div className="p-4">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full xl:flex-1">
            <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
            <div className="rounded-[10px] bg-gray-50 p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-4 w-40 rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPageShimmer;
