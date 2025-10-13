'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SidebarCard = () => (
  <div className="mb-4 rounded-xl border border-gray-100 p-4">
    <Skeleton className="mb-2 h-4 w-24" />
    <Skeleton className="mb-3 h-3 w-16" />
    <div className="space-y-2">
      <Skeleton className="h-9 w-full rounded-lg" />
      <Skeleton className="h-9 w-full rounded-lg" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

const TableRowShimmer = () => (
  <div className="grid grid-cols-[96px_1fr_96px_120px_120px_96px] items-center gap-3 px-3 py-3">
    <Skeleton className="h-4 w-14" />
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-8 w-24 rounded-md" />
    <div className="flex items-center gap-2">
      <Skeleton className="h-7 w-7 rounded-full" />
      <Skeleton className="h-4 w-6" />
      <Skeleton className="h-7 w-7 rounded-full" />
    </div>
    <Skeleton className="h-8 w-16 rounded-full" />
  </div>
);

const PageShimmer = () => {
  return (
    <div className="py-6 xl:py-10">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        {/* Sidebar */}
        <aside className="order-2 rounded-2xl border border-gray-200 bg-white p-4 xl:order-1">
          <Skeleton className="mb-4 h-5 w-32" />
          <SidebarCard />
          <SidebarCard />
          <SidebarCard />
        </aside>

        {/* Main */}
        <section className="order-1 space-y-6 xl:order-2">
          {/* Controls */}
          <div className="flex w-full gap-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="grid grid-cols-[96px_1fr_96px_120px_120px_96px] items-center gap-2 px-3 py-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRowShimmer key={i} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>

          {/* Note + Cart (Desktop only) */}
          <div className="hidden grid-cols-1 gap-6 xl:grid xl:grid-cols-[1fr_360px]">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-36 w-full rounded-lg" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <Skeleton className="mb-3 h-5 w-40" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3">
                  <Skeleton className="h-4 w-44" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              ))}
              <Skeleton className="mt-4 h-10 w-full rounded-full" />
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-4 h-12 w-full rounded-full" />
            </div>
          </div>
        </section>

        {/* Mobile-only Note + Cart at bottom */}
        <div className="order-4 xl:hidden">
          {/* Mobile Note */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-36 w-full rounded-lg" />
          </div>

          {/* Mobile Cart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <Skeleton className="mb-3 h-5 w-40" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                <Skeleton className="h-4 w-44" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            ))}
            <Skeleton className="mt-4 h-10 w-full rounded-full" />
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="mt-4 h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageShimmer;
