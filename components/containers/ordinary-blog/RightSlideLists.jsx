import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import { getBlogs } from '@/services/get-blogs';
import Image from 'next/image';

const RightSlideLists = async ({ blogId }) => {
  const blogs = await getBlogs();
  const blogPosts = blogs.filter((blog) => blog._id !== blogId);

  return (
    <div>
      <div className="mb-5">
        <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
          Similar Reads
        </h5>
      </div>
      <div>
        {blogPosts?.map((blog, index) => (
          <div key={index} className="group border-umbra-40 border-t py-5">
            <div className="flex w-full flex-col items-center gap-5 overflow-hidden bg-white md:flex-row">
              <Link href={`/blog/${blog?._id}`} className="w-[170px] overflow-hidden">
                <div className="h-[102px] w-[120px] overflow-hidden">
                  <Image
                    width={120}
                    height={102}
                    src={
                      blog?.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/public${blog?.image}`
                        : '/assets/images/blog/side-blog.png'
                    }
                    alt={blog?.alt_tag || blog?.title || 'blog-image-featuted'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex w-full flex-col justify-between gap-3 py-2">
                <div className="mb-2 flex items-center gap-5">
                  <div className="block md:hidden">
                    <button className="outline-button-white text-umbra-100 border-umbra-100 !bg-white-100 rounded-sm border-1 px-2.5 py-1 !text-[12px] font-normal">
                      {blog?.tags}
                    </button>
                  </div>
                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                    {blog?.created_at ? formatDate(blog.created_at) : ''}
                  </p>
                </div>
                <Link href={`/blog/${blog?._id}`} className="group w-full">
                  <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[19px]">
                    {blog?.title}
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
