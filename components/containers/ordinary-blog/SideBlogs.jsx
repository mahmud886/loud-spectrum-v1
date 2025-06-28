import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const SideBlogs = ({ blogs }) => {
  const blogPosts = blogs || [
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
      {blogs.map((blog, index) => (
        <div key={index} className={`group mt-10 md:mt-0 ${index !== 0 ? 'border-umbra-40 border-t py-5' : 'pb-5'}`}>
          <div className="flex flex-col items-center gap-5 overflow-hidden bg-white transition-all duration-300 md:flex-row">
            <Link href={`/blog/${blog?._id}`} className="w-full overflow-hidden md:w-[177px]">
              <Image
                width={177}
                height={150}
                src={'/assets/images/blog/side-blog.png'}
                alt={blog?.title}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-115 md:w-[177px]"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col justify-between gap-5">
                <div className="mb-2 flex items-center gap-5">
                  <button className="outline-button-white text-umbra-100 border-umbra-100 !bg-white-100 rounded-sm border-1 px-2.5 py-1 !text-[12px] font-normal">
                    {blog?.tags || 'Tag'}
                  </button>
                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                    {blog?.created_at ? formatDate(blog.created_at) : ''}
                  </p>
                </div>
                <Link href={`/blog/${blog?._id}`} className="group w-full">
                  <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[22px]">
                    {blog?.title}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBlogs;
