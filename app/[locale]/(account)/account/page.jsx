'use client';

import { PackageCheck, RotateCw, Clock, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import React from 'react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Delivered Orders',
      value: 120,
      icon: <PackageCheck className="h-6 w-6 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Returned Orders',
      value: 12,
      icon: <RotateCw className="h-6 w-6 text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      title: 'Pending Orders',
      value: 34,
      icon: <Clock className="h-6 w-6 text-yellow-600" />,
      bg: 'bg-yellow-50',
    },
    {
      title: 'Total Orders',
      value: 166,
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      bg: 'bg-blue-50',
    },
  ];

  return (
    <div className="p-4 md:p-0">
      <h1 className="mb-6 text-[24px] font-normal text-gray-800">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className={`rounded-xl p-4 shadow-sm ${stat.bg} flex items-center justify-between`}>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="ml-4">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div>
        <h6 className="my-6 text-[24px] font-normal text-gray-800">Continue Buying</h6>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
