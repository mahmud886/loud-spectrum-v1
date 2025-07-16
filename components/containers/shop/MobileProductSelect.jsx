'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { encodeCategoryForUrl, getCategoryFromPathname } from '@/helpers/url-category-utils';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

export default function MobileProductSelect({ categories, totalCategoryProducts }) {
  const pathname = usePathname();
  const currentCategory = getCategoryFromPathname(pathname);
  const sortedCategories = [
    { name: 'All', _id: 'all', productCount: totalCategoryProducts },
    ...categories.sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const handleChange = (value) => {
    const selectedCategory = sortedCategories.find((cat) => cat._id === value);
    if (selectedCategory) {
      const link = document.getElementById(`mobile-category-link-${value}`);
      if (link) {
        link.click();
      }
    }
  };

  return (
    <>
      <Select
        value={sortedCategories.find((cat) => cat.name.toLowerCase() === currentCategory)?._id || 'all'}
        onValueChange={handleChange}
      >
        <SelectTrigger className="bg-umbra-5 min-h-12 w-full text-[17px] md:min-h-[42px] md:max-w-[280px] md:min-w-[156px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="!text-[17px]">Filter</SelectLabel>
            {sortedCategories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name} <span className="text-umbra-40 text-[12px]">({category?.productCount || 0})</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {sortedCategories.map((category) => (
        <Link
          key={category._id}
          id={`mobile-category-link-${category._id}`}
          href={`/shop/${encodeCategoryForUrl(category.name)}`}
          className="hidden"
        >
          {category.name}
        </Link>
      ))}
    </>
  );
}
