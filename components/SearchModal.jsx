import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProductSearch } from '@/hooks/useProductSearch';
import * as React from 'react';
import ProductGridCardShimmer from './product/ProductGridCardShimmer';
import SearchProductCard from './product/SearchProductCard';

const SearchModal = ({ open, onOpenChange }) => {
  const [search, setSearch] = React.useState('');
  const { products, loading, error, fetched } = useProductSearch(search);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[96vw] !max-w-[96vw] md:!w-[80vw]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogClose asChild>
            {/* <button className="absolute top-4 right-4" aria-label="Close">
              <X size={20} />
            </button> */}
          </DialogClose>
        </DialogHeader>
        <div className="mt-4">
          <Input
            autoFocus
            placeholder="Type to search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full text-center text-lg md:text-xl"
          />
        </div>
        <div className="mt-4">
          {!search ? null : loading ? (
            <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-2 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductGridCardShimmer key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-400">{error}</div>
          ) : products.length === 0 && fetched ? (
            <div className="py-4 text-center text-gray-400">No products found.</div>
          ) : (
            <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-2 md:grid-cols-4">
              {products.map((product) => (
                <SearchProductCard key={product._id} product={product} onOpenChange={onOpenChange} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
