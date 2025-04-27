import React from 'react';
import { useTranslations } from 'next-intl';
import { MinusIcon, PlusIcon, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const SamplePackHeroCard = () => {
  const t = useTranslations('TrySamplePack');
  return (
    <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="self-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[14px] leading-[130%] font-normal">
                <span className={'flex items-center justify-start'}>
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                </span>{' '}
                6 {t('Reviews')}
              </p>
            </div>
            <div className="space-y-2">
              <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                {t('StartingAt')} $10.00
              </h6>
            </div>
            <hr className="terpene-border" />
            <div className="space-y-2">
              <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                Mango OG is a relaxing, herbal remedy strain made by crossing KC 33 with Afghani. This profile produces
                euphoric and uplifting effects that are sure to boost your mood.
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <Select>
                  <SelectTrigger className="text-umbra-100 bg-umbra-5 h-[42px] w-full font-mono text-[16px] leading-[140%] font-normal">
                    <SelectValue placeholder={t('ChooseFormula')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">710Terps</SelectItem>
                    <SelectItem value="2">Suace Terp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full">
                <p className="text-umbra-100 pointer-events-none absolute top-2 left-3 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('CustomizeYourPack')}
                </p>
                <Textarea placeholder={t('Note')} className="bg-umbra-5 h-[130px] pt-9" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <div className="">
            <div className="flex items-center gap-2">
              <button
                className="border-umbra-40 flex size-10 cursor-not-allowed items-center justify-center rounded-full border bg-white"
                disabled
              >
                <MinusIcon size={14} fill="#C2C2C2" />
              </button>

              <input
                id="quantity-input"
                type="number"
                defaultValue="01"
                className="text-umbra-100 h-10 w-[40px] appearance-none text-center font-sans text-[17px] font-normal [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button className="border-umbra-40 bg-white-40/10 flex size-10 items-center justify-center rounded-full border backdrop-blur-2xl">
                <PlusIcon size={14} fill="#000000" />
              </button>
            </div>
          </div>

          <button className="main-button-black w-full rounded-full px-2 py-2 md:max-w-[132px]">{t('AddToCart')}</button>
        </div>
      </div>
    </div>
  );
};

export default SamplePackHeroCard;
