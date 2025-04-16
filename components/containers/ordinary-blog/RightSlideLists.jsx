import Image from 'next/image';

const RightSlideLists = () => {
  const blogPosts = [
    {
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
    {
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
    {
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
          Similar Reads
        </h5>
      </div>
      <div>
        {blogPosts.map((post, index) => (
          <div key={index} className="border-umbra-40 border-t py-5">
            <div className="flex flex-col items-center gap-5 overflow-hidden bg-white md:flex-row">
              <Image
                width={177}
                height={150}
                src={post.imageUrl}
                alt={post.title}
                className="h-[102px] w-[120px] object-cover"
              />

              <div className="flex flex-col justify-between gap-3 py-2">
                <div className="mb-2 flex items-center gap-5">
                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">{post.date}</p>
                </div>
                <h2 className="text-umbra-100 line-clamp-2 font-sans text-[19px] leading-[130%] font-normal tracking-normal">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSlideLists;
