import React from 'react';
import Image from 'next/image';

const BehindTheProccess = () => {
  return (
    <div className="bg-umbra-100 container px-[198px] py-20">
      <div className="space-y-6">
        <h5 className="text-white-40 font-sans text-[16px] leading-[100%] font-normal tracking-normal uppercase">
          Behind the Process
        </h5>
        <h6 className="text-white-100 w-1/2 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
          Our Process, Your Advantage
        </h6>
      </div>
      <div className="flex items-center justify-between gap-[145px] py-20">
        <Image
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
            Premium Sourcing: Only the Best
          </h5>
          <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
            We begin with the purest ingredients, carefully selecting:
          </p>
          <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
            <li className="border-t border-b py-2.5">Food-grade botanical isolates</li>
            <li className="border-b py-2.5">Pesticide-free, heavy metal-free extracts</li>
            <li className="border-b py-2.5">The finest cultivated hemp for flower-extracted terpenes</li>
          </ul>
          <p className="text-white-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
            Every raw material meets strict safety and purity standards, ensuring clean, consistent, and
            authentic terpene profiles.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[145px] py-20">
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
            Advanced Extraction: Oregon Facility
          </h5>
          <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
            Our Oregon-based extraction facility is equipped with cutting-edge technology to capture the true essence of
            terpenes. Using state-of-the-art extraction methods, we preserve the full complexity and potency of every
            strain.
          </p>
          <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
            <li className="border-t border-b py-2.5">Food-grade botanical isolates</li>
            <li className="border-b py-2.5">Pesticide-free, heavy metal-free extracts</li>
            <li className="border-b py-2.5">The finest cultivated hemp for flower-extracted terpenes</li>
          </ul>
        </div>
        <Image
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-[145px] py-20">
        <Image
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
            Expert Formulation & Testing: Santa Ana Lab
          </h5>
          <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
            Once extracted, our terpenes move to our GMP-certified lab in Santa Ana, CA, where we meticulously formulate
            and refine each profile.
          </p>
          <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
            <li className="border-t border-b py-2.5">Custom terpene blends crafted by experts</li>
            <li className="border-b py-2.5">Collaboration with industry leaders to fine-tune flavors</li>
            <li className="border-b py-2.5">Rigorous testing to ensure unmatched depth & experience</li>
          </ul>
          <p className="text-white-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
            Our team works closely with partners in the industry to perfect every flavor, ensuring authenticity,
            richness, and precision in every drop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BehindTheProccess;
