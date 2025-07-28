import ProductCard from '@/components/product/ProductCard';
import { Link } from '@/i18n/navigation';
import { getCategoryProducts } from '@/services/get-category-products';
import { ArrowRightIcon } from 'lucide-react';

export default async function DashboardPage() {
  const products = await getCategoryProducts('all');

  // const stats = [
  //   {
  //     title: 'Delivered Orders',
  //     value: 120,
  //     icon: <PackageCheck className="h-6 w-6 text-green-600" />,
  //     bg: 'bg-green-50',
  //   },
  //   {
  //     title: 'Returned Orders',
  //     value: 12,
  //     icon: <RotateCw className="h-6 w-6 text-red-600" />,
  //     bg: 'bg-red-50',
  //   },
  //   {
  //     title: 'Pending Orders',
  //     value: 34,
  //     icon: <Clock className="h-6 w-6 text-yellow-600" />,
  //     bg: 'bg-yellow-50',
  //   },
  //   {
  //     title: 'Total Orders',
  //     value: 166,
  //     icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
  //     bg: 'bg-blue-50',
  //   },
  // ];

  return (
    <div className="p-4 md:p-0">
      <h1 className="mb-6 text-[24px] font-normal text-gray-800">User Dashboard</h1>

      {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className={`rounded-xl p-4 shadow-sm ${stat.bg} flex items-center justify-between`}>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="ml-4">{stat.icon}</div>
          </div>
        ))}
      </div> */}

      <div>
        <div className="my-4 flex items-center justify-between rounded-xl border p-4">
          <h6 className="text-[24px] font-normal text-gray-800">Continue Buying</h6>
          <Link href="/shop" className="text-umbra-100 flex items-center gap-2 font-mono text-[10px] font-normal">
            <button className="main-button-black flex items-center gap-2 rounded-full px-6 py-2 opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              Shop
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products?.data?.slice(0, 3).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
