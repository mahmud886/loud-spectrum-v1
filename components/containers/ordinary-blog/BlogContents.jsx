import Image from 'next/image';
import RightSlideLists from './RightSlideLists';

const BlogContents = () => {
  return (
    <div className="flex justify-between gap-[160px] py-[80px]">
      <div className="max-w-[58%]">
        <h2 className="text-umbra-100 mb-4 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
          Lorem ipsum dolor sit amet, consectetur.
        </h2>
        <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
        <br />
        <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-bold tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </p>
        <br />
        <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>{' '}
        <br />
        <h5 className="text-umbra-100 mb-4 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam.
        </h5>
        <div className="pt-10 pb-[100px]">
          <Image
            width={743}
            height={435}
            src="/assets/images/blog/single-blog2.png"
            alt="blog-image2"
            className="h-[435px] w-[743px] object-cover"
          />

          <div className="mt-20">
            <div className="flex flex-col space-y-5">
              <h5 className="text-umbra-100 mb-4 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
                Lorem ipsum dolor sit amet, consectetur.
              </h5>
              <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum
              </p>
            </div>
            <div className="mt-20 flex gap-3">
              <Image
                width={240}
                height={246}
                src="/assets/images/blog/single-blog3.png"
                className="h-[256px] w-[240px] object-cover"
                alt="blog-image2"
              />
              <Image
                width={240}
                height={246}
                src="/assets/images/blog/single-blog3.png"
                className="h-[256px] w-[240px] object-cover"
                alt="blog-image2"
              />
              <Image
                width={240}
                height={246}
                src="/assets/images/blog/single-blog3.png"
                className="h-[256px] w-[240px] object-cover"
                alt="blog-image2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[45%]">
        <RightSlideLists />
      </div>
    </div>
  );
};

export default BlogContents;
