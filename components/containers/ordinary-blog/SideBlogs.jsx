import Image from 'next/image';

const SideBlogs = () => {
  const blogPosts = [
    {
      tag: 'Tag',
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
    {
      tag: 'Tag',
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
    {
      tag: 'Tag',
      date: 'March 7, 2025',
      title: 'Terpene-Infused Products That You Can Make At Home: Oils, And Candles',
      imageUrl: '/assets/images/blog/side-blog.png',
    },
  ];

  return (
    <div>
      {blogPosts.map((post, index) => (
        <div key={index} className={`${index !== 0 ? 'border-umbra-40 border-t py-5' : 'pb-5'}`}>
          <div className="flex flex-col items-center gap-5 overflow-hidden bg-white md:flex-row">
            <Image
              width={177}
              height={150}
              src={post.imageUrl}
              alt={post.title}
              className="h-auto w-[177px] object-cover"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col justify-between gap-5">
                <div className="mb-2 flex items-center gap-5">
                  <button className="outline-button-white text-umbra-100 border-umbra-100 !bg-white-100 rounded-sm border-1 px-2.5 py-1 !text-[12px] font-normal">
                    {post.tag}
                  </button>
                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">{post.date}</p>
                </div>
                <h2 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBlogs;
