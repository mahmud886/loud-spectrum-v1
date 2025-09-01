import { useTranslations } from 'next-intl';

const TerpeneProfile = () => {
  const t = useTranslations('AboutPage');
  const points = [
    {
      title: t('Point_01_Title'),
      description: t('Point_01_Description'),
    },
    {
      title: t('Point_02_Title'),
      description: t('Point_02_Description'),
    },
    {
      title: t('Point_03_Title'),
      description: t('Point_03_Description'),
    },
    {
      title: t('Point_04_Title'),
      description: t('Point_04_Description'),
    },
  ];
  return (
    <>
      <div className="bg-stardust">
        <div className="container">
          <div className="py-[100px] xl:px-[100px]">
            <h6
              className="text-umbra-100 font-sans text-[26px] leading-[130%] font-normal xl:text-[35px]"
              dangerouslySetInnerHTML={{ __html: t.raw('Header_Description') }}
            />
            <div className="mt-[77px] flex flex-col justify-between gap-12 xl:flex-row">
              {points.map((point, index) => (
                <div key={index} className="flex w-full flex-col space-y-5 xl:min-h-[240px] xl:w-[228px]">
                  <h5 className="text-umbra-100 font-sans text-[26px] leading-[130%] font-normal xl:text-[35px]">
                    {point.title}
                  </h5>
                  <div className="border-umbra-40 border-1"></div>
                  <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-screen">
          <div className="w-full">
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[30%] bg-white"></div>
              <div className="bg-stardust w-[70%]"></div>
              <div className="bg-stardust w-[15%]"></div>
            </div>
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[50%] bg-white"></div>
              <div className="bg-stardust w-[35%]"></div>
              <div className="w-[15%] bg-white"></div>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto w-full xl:w-[1440px]">
        <img
          src="/assets/images/about-section-mask2.png"
          width={1440}
          height={195}
          className="w-full xl:h-[195px] xl:w-[1440px]"
          alt="about-section-mask2.png"
        />
      </div> */}
      </div>
    </>
  );
};

export default TerpeneProfile;
