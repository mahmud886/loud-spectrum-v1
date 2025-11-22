const CustomerTestimonialsCard = ({ review }) => {
  if (!review) return null;
  const { name, review: reviewText, created_at } = review;
  const date = created_at
    ? new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="relative h-full w-full px-2 xl:min-h-[300px] xl:w-auto xl:max-w-[600px] xl:min-w-[474px]">
      <div className="flex h-full flex-col items-start justify-between gap-4 px-4 md:px-8 lg:gap-6">
        <div className="space-y-4 lg:space-y-6">
          {/* <Quote
            className="text-umbra-100 absolute top-0 left-0 h-6 w-6 rotate-180 lg:h-10 lg:w-10"
            strokeWidth={1.5}
          /> */}
          <div className="relative max-w-[85%] md:max-w-[90%] lg:max-w-[85%]">
            <p className="text-umbra-100 text-right font-serif text-[16px] leading-[140%] font-normal italic lg:text-[22px]">
              {reviewText}
            </p>
            {/* <Quote
              className="text-umbra-100 absolute -right-8 -bottom-2 h-6 w-6 lg:-right-12 lg:-bottom-4 lg:h-10 lg:w-10"
              strokeWidth={1.5}
            /> */}
          </div>
        </div>
        <div className="relative flex w-full items-start justify-start">
          <p className="text-umbra-100 font-sans text-[18px] leading-[140%] font-normal uppercase lg:text-[24px]">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonialsCard;
