import { useTranslations } from 'next-intl';

const BlogPageTitle = () => {
  const t = useTranslations('BlogPage');

  return (
    <div className="space-y-10">
      <h1 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal tracking-normal xl:text-[60px]">
        {t('title')}
      </h1>
      <div className="border-1"></div>
    </div>
  );
};

export default BlogPageTitle;
