import React from 'react';
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
      <div className="bg-stardust container">
        <div className="p-[100px]">
          <h6 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal">
            Loud Spectrum offers the widest range of terpene profiles<sup>1</sup>, crafted from premium ingredients and
            engineered to the highest standards<sup>2</sup> for connoisseurs<sup>3</sup> seeking heightened experiences
            <sup>4</sup>. <br /> <br />
            We know that’s a bit of a mouthful. So, we broke it down for you:
          </h6>
          <div className="mt-[77px] flex justify-between gap-12">
            {points.map((point, index) => (
              <div key={index} className="flex min-h-[240px] w-[228px] flex-col space-y-5">
                <h5 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal">{point.title}</h5>
                <div className="border-umbra-40 border-1"></div>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto w-[1440px]">
        <img
          src="/assets/images/about-section-mask2.png"
          width={1440}
          height={195}
          className="h-[195px] w-[1440px]"
          alt="about-section-mask2.png"
        />
      </div>
    </>
  );
};

export default TerpeneProfile;
