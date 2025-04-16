import React from 'react';
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="outline-button-white border-umbra-10 rounded-md border-1 px-6 py-2">Filter</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
