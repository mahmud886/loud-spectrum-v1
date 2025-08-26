import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductFilter = ({ categories, onCategoryChange }) => {
  const handleChange = (value) => {
    if (value === 'all') {
      onCategoryChange?.([]);
    } else {
      const selectedCategory = categories.find((cat) => cat._id === value);
      onCategoryChange?.(selectedCategory ? [selectedCategory] : []);
    }
  };

  return (
    <Select defaultValue="all" onValueChange={handleChange}>
      <SelectTrigger className="bg-umbra-5 min-h-12 w-full text-[17px] xl:min-h-[42px] xl:max-w-[280px] xl:min-w-[156px]">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="!text-[17px]">Filter</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {categories.map((option) => (
            <SelectItem key={option._id} value={option._id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProductFilter;
