import { Input } from '@/components/ui/input';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchModalCardShimmer from './product/SearchModalCardShimmer';
import SearchProductCard from './product/SearchProductCard';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const SearchModal = ({ open, onOpenChange }) => {
  const [search, setSearch] = useState('');
  const { products, loading, error, fetched } = useProductSearch(search);

  // Clear search when modal closes
  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="bg-umbra-5/80 absolute inset-0 backdrop-blur-sm" onClick={() => onOpenChange(false)} />

      {/* Modal Content */}
      <div className="bg-umbra-100 relative max-h-[90vh] w-[96vw] max-w-[96vw] overflow-hidden rounded-lg shadow-xl xl:w-[760px]">
        <div className="flex w-full items-center border-b border-white/10 px-4">
          <Search size={16} className="mr-3 text-white" />
          <Input
            autoFocus
            placeholder="Type to search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full border-0 p-0 text-left text-lg text-white placeholder:text-white focus:ring-0 focus-visible:ring-0"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="cursor-pointer rounded-full text-white transition-colors"
                onClick={() => {
                  setSearch('');
                }}
              >
                {/* <X size={20} className="text-white hover:text-white/90" /> */}
                Clear
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Input</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="p-4">
          {!search ? null : loading ? (
            <div className="grid max-h-[60vh] grid-cols-1 items-center gap-4 overflow-y-auto p-4 align-middle lg:grid-cols-2 xl:grid-cols-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <SearchModalCardShimmer key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-400">{error}</div>
          ) : products.length === 0 && fetched ? (
            <div className="py-4 text-center text-gray-400">No products found.</div>
          ) : (
            <div className="grid max-h-[60vh] grid-cols-1 items-center gap-4 overflow-y-auto p-4 align-middle lg:grid-cols-2 xl:grid-cols-2">
              {products.map((product) => (
                <SearchProductCard key={product._id} product={product} onOpenChange={onOpenChange} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
