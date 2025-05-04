'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MinusIcon, PlusIcon, Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const ProductBuyDialog = ({ open, onOpenChange }) => {
  const t = useTranslations('ProductDetails');
  const [quantity, setQuantity] = useState(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white-100 text-umbra-100 h-[90vh] overflow-y-scroll p-5 md:h-[587px] md:w-[413px]">
        <VisuallyHidden>
          <DialogTitle>{'Product Details'}</DialogTitle>
        </VisuallyHidden>

        <div className="flex h-full w-full flex-col items-start justify-between gap-5">
          <div className="self-start">
            <div className="space-y-5">
              <div className="mt-1 flex w-[90%] items-center justify-between gap-5 md:mt-[2px]">
                <button className="border-alive text-alive rounded-[3px] border-1 px-2 text-[10px] font-normal md:text-[12px]">
                  {t('CannabisDerived')}
                </button>
                <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[10px] leading-[130%] font-normal md:text-[14px]">
                  <span className="flex items-center justify-start">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} size={15} fill={'#000000'} />
                      ))}
                  </span>{' '}
                  6 {t('Reviews')}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">Mango OG</h2>
                <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal">$10.00</h6>
              </div>
              <hr className="terpene-border" />
              <div className="space-y-2">
                <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal">
                  Mango / Sweet / Tropical
                </h6>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%]">
                  Mango OG is a relaxing, herbal remedy strain made by crossing KC 33 with Afghani. This profile
                  produces euphoric and uplifting effects that are sure to boost your mood.
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <Select>
                    <SelectTrigger className="bg-umbra-5 text-umbra-100 h-[42px] w-full font-mono text-[16px]">
                      <SelectValue placeholder={t('ChooseFormula')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">710Terps</SelectItem>
                      <SelectItem value="2">Suace Terp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-umbra-5 text-umbra-100 h-[42px] w-full font-mono text-[16px]">
                      <SelectValue placeholder={t('ChooseVolume')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1ml</SelectItem>
                      <SelectItem value="5">5ml</SelectItem>
                      <SelectItem value="10">10ml</SelectItem>
                      <SelectItem value="20">20ml</SelectItem>
                      <SelectItem value="50">50ml</SelectItem>
                      <SelectItem value="100">100ml</SelectItem>
                      <SelectItem value="500">500ml</SelectItem>
                      <SelectItem value="1000">1000ml</SelectItem>
                      <SelectItem value="3785">1 Gallon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
            {/*<div className="md:hidden">*/}
            {/*  <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">*/}
            {/*    Mango OG is a strain-specific, organically grown, and botanically derived terpene profile.*/}
            {/*  </p>*/}
            {/*</div>*/}

            <div className="flex w-full items-center justify-between gap-5 md:flex-row">
              {/*<div className="md:hidden">*/}
              {/*  <button className="outline-button-white rounded-full border px-5 py-2">{t('SeePDF')}</button>*/}
              {/*</div>*/}

              <div className="flex items-center gap-2">
                <button
                  className="border-umbra-40 flex size-10 items-center justify-center rounded-full border bg-white"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon size={14} fill="#C2C2C2" />
                </button>

                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="text-umbra-100 h-10 w-[40px] text-center font-sans text-[17px] font-normal"
                />

                <button
                  className="border-umbra-40 bg-white-40/10 flex size-10 items-center justify-center rounded-full border backdrop-blur-2xl"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <PlusIcon size={14} fill="#000000" />
                </button>
              </div>
            </div>

            <button className="main-button-black w-full rounded-full px-2 py-2 md:max-w-[132px]">
              {t('AddToCart')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBuyDialog;
