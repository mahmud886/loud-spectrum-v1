'use client';

const NavbarShimmer = () => {
  return (
    <div className="animate-pulse">
      {/* Top Navigation Shimmer */}
      <nav className="bg-white-100/60 fixed top-0 left-0 z-50 w-full backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-5 py-12 transition-all duration-300 lg:px-[40px] xl:px-[40px] xl:px-[80px] 2xl:px-[320px]">
          {/* Logo shimmer */}
          <div className="h-[25px] w-[153px] rounded bg-gray-200 lg:h-[36px] lg:w-[221px] xl:h-[36px] xl:w-[221px]"></div>

          {/* Right side - Navigation items */}
          <div className="flex items-center gap-2 xl:gap-3">
            {/* Search shimmer */}
            <div className="h-10 w-10 rounded-full border bg-gray-200"></div>

            {/* User icon shimmer */}
            <div className="h-10 w-10 rounded-full border bg-gray-200"></div>

            {/* Cart icon shimmer */}
            <div className="h-10 w-10 rounded-full border bg-gray-200"></div>

            {/* Menu button shimmer */}
            <div className="h-10 w-10 rounded border bg-gray-200"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Shimmer (when menu is open) */}
      <div className="fixed inset-0 z-50 bg-white xl:hidden">
        <div className="flex h-full flex-col">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="h-8 w-32 rounded bg-gray-200"></div>
            <div className="h-8 w-8 rounded bg-gray-200"></div>
          </div>

          {/* Navigation menu items */}
          <div className="flex-1 p-4">
            <div className="space-y-6">
              {/* Menu items shimmer */}
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="h-6 w-32 rounded bg-gray-200"></div>
                  <div className="h-6 w-6 rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              <div className="h-6 w-24 rounded bg-gray-200"></div>
              <div className="h-6 w-32 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarShimmer;
