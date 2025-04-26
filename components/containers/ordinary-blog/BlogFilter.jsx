import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const BlogFilter = () => {
  return (
    <div className="w-full sm:w-auto">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full sm:w-auto">
          <p className="outline-button-white border-umbra-10 w-full rounded-md border-1 px-6 py-2 text-center">
            Filter
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Filter</DropdownMenuItem>
          <DropdownMenuItem>Filter</DropdownMenuItem>
          <DropdownMenuItem>Filter</DropdownMenuItem>
          <DropdownMenuItem>Filter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BlogFilter;
