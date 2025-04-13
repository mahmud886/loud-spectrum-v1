import React from 'react';
import { useTranslations } from 'next-intl';

const InTheLab = () => {
  const t = useTranslations('InTheLab');
  return (
    <div className="container">
      <div className="py-[80px]">
        <div className="flex max-w-[630px] flex-col space-y-6">
          <h5 className="text-umbra-40 font-sans text-[16px] font-normal uppercase">{t('In_the_Lab')}</h5>
          <h2 className="font-sans text-[44px] leading-[120%] font-normal">{t('Science_Is_in_Our_DNA')}</h2>
          <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
            {t(
              'Traditional_terpene_delivery_has_its_limits_which_is_why_Loud_Spectrum_pushed_the_boundaries_and_developed_a_signature_Flavor_Science_process_to_elevate_terpenes_beyond_the_ordinary',
            )}
          </p>
          <div className="mt-6 w-full">
            <button className="main-button-black rounded-full px-6 py-2">{t('Discover_the_Science')}</button>
          </div>
        </div>

        <div className="mt-[140px]">
          <div className="grid grid-cols-3 gap-[50px]">
            <div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
                  {t('1st')}
                </h2>
                <div className="custom-border"></div>
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {t('Industry_pioneers')}
                </h5>
                <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                  {t(
                    'In_2015_we_introduced_the_first_Strain_Specific_Terpene_Profiles_setting_the_standard_and_continuing_to_lead_the_industry',
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
                  {t('2015')}
                </h2>
                <div className="custom-border"></div>
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {t('Over_a_decade_of_innovation')}
                </h5>
                <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                  {t(
                    'From_our_first_customer_to_today_our_commitment_to_research_innovation_and_quality_continues_to_push_the_industry_forward',
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
                  {t('3_500')}
                </h2>
                <div className="custom-border"></div>
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {t('Custom_profiles_crafted')}
                </h5>
                <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                  {t(
                    'Tailored_terpene_solutions_designed_for_our_customers_earning_us_long_standing_industry_partnerships',
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
                  {t('1000')}
                </h2>
                <div className="custom-border"></div>
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {t('Food_grade_ingredients')}
                </h5>
                <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('A_diverse_library_of_natural_high_quality_flavors_formulated_for_depth_complexity_and_effect')}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-umbra-100 font-sans text-[35px] leading-[130%] font-normal tracking-normal">
                  {t('100')}
                </h2>
                <div className="custom-border"></div>
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  {t('Uncompromising_consistency')}
                </h5>
                <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
                  {t(
                    'Every_batch_is_third_party_tested_cGMP_certified_and_manufactured_to_exceed_industry_standards_for_purity_and_performance',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InTheLab;
