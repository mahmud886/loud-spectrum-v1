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

export default function MobileProductSelect({ categories, totalCategoryProducts, productTypes }) {
  const pathname = usePathname();
  const currentCategory = getCategoryFromPathname(pathname);

  const sortedCategories = [
    { name: 'All', _id: 'all', slug: 'all', productCount: totalCategoryProducts },
    ...categories
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((category) => ({
        ...category,
        productCount: category.productCount || 0,
      })),
    ...productTypes?.map((productType) => ({
      _id: productType._id,
      name: productType.name,
      slug: productType.slug || productType.name,
      productCount: productType?.productCount || 0,
    })),
  ];

  // Find the current category by matching slug or name
  const getCurrentCategoryId = () => {
    if (currentCategory === 'all') {
      return 'all';
    }

    const foundCategory = sortedCategories.find((cat) => {
      const categorySlug = cat.slug || '';
      const encodedName = encodeCategoryForUrl(cat.name);
      return categorySlug === currentCategory || encodedName === currentCategory;
    });

    return foundCategory?._id || 'all';
  };

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
      <Select value={getCurrentCategoryId()} onValueChange={handleChange}>
        <SelectTrigger className="bg-umbra-5 min-h-12 w-full text-[17px] md:min-h-[42px] md:max-w-[280px] md:min-w-[156px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="!text-[17px]">Filter</SelectLabel>
            {sortedCategories?.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name} <span className="text-umbra-40 text-[12px]">({category?.productCount || 0})</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {sortedCategories?.map((category) => (
        <Link
          key={category._id}
          id={`mobile-category-link-${category._id}`}
          href={category.name === 'All' ? '/shop/all' : `/shop/${category.slug || encodeCategoryForUrl(category.name)}`}
          className="hidden"
        >
          {category.name}
        </Link>
      ))}
    </>
  );
}
