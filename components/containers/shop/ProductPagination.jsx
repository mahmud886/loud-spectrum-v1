import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const buttonStyle =
  'rounded-full bg-umbra-10 text-umbra-100 px-4 py-2 hover:bg-umbra-40 hover:text-white transition-colors';

const ProductPagination = () => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" className={buttonStyle}>
              <ArrowLeft />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">8</PaginationLink>
          </PaginationItem>
          <PaginationLink href="#" className={buttonStyle}>
            <ArrowRight />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPagination;
