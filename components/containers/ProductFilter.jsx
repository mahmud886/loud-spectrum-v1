import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import terpeneCategories from '@/lib/terpene-product-categories.json';

const ProductFilter = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-umbra-5 min-h-12 w-full text-[17px] md:min-h-[42px] md:max-w-[280px] md:min-w-[156px]">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="!text-[17px]">Filter</SelectLabel>
          {terpeneCategories.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProductFilter;
