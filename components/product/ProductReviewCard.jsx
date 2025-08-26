import { Star } from 'lucide-react';

const ProductReviewCard = ({ review }) => {
  if (!review) return null;
  const { name, review: reviewText, rating, created_at } = review;
  const date = created_at
    ? new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="h-full w-full px-2 xl:min-h-[300px] xl:w-[450px]">
      <div className="flex h-full flex-col items-start justify-between gap-6">
        <div className="space-y-6">
          <div>
            <span className={'flex items-center justify-start'}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill={i < rating ? '#000' : 'none'} stroke="#000" />
              ))}
            </span>
          </div>
          <div className="max-w-[95%]">
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">{reviewText}</p>
          </div>
        </div>
        <div>
          <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">{name}</p>
          <p className="text-umbra-40 font-mono text-[20px] leading-[140%] font-normal">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
