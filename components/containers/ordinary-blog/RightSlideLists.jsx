import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const RightSlideLists = () => {
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
      <div className="mb-5">
        <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
          Similar Reads
        </h5>
      </div>
      <div>
        {blogPosts.map((post, index) => (
          <div key={index} className="group border-umbra-40 border-t py-5">
            <div className="flex flex-col items-center gap-5 overflow-hidden bg-white md:flex-row">
              <Link href={`/blog/1`} className="w-full overflow-hidden">
                <Image
                  width={177}
                  height={150}
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-[102px] md:w-[120px]"
                />
              </Link>

              <div className="flex flex-col justify-between gap-3 py-2">
                <div className="mb-2 flex items-center gap-5">
                  <div className="block md:hidden">
                    <button className="outline-button-white text-umbra-100 border-umbra-100 !bg-white-100 rounded-sm border-1 px-2.5 py-1 !text-[12px] font-normal">
                      {post.tag}
                    </button>
                  </div>
                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">{post.date}</p>
                </div>
                <Link href={`/blog/1`} className="group w-full">
                  <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[19px]">
                    {post.title}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSlideLists;
