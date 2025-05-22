'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ProductDetailsLeftCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState('');
  const [showVolumeError, setShowVolumeError] = useState(false);
  const dispatch = useDispatch();

  const t = useTranslations('ProductDetails');

  const handleAddToCart = () => {
    if (!selectedVolume) {
      setShowVolumeError(true);
      toast.error(t('PleaseSelectVolume'));
      return;
    }
    setShowVolumeError(false);
    dispatch(addToCart({ id: product._id, product, quantity, selectedVolume }));
    setSelectedVolume('');
    setQuantity(1);
  };

  return (
    <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="self-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              <button className="border-alive text-alive rounded-[3px] border-1 px-2 text-[12px] font-normal">
                {t('CannabisDerived')}
              </button>
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
              <h2 className="text-umbra-100 line-clamp-2 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
                {product?.name}
              </h2>
              <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                $10.00
              </h6>
            </div>
            <hr className="terpene-border" />
            <div className="space-y-2">
              <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                {product?.tag?.map((tag, index, array) => (
                  <span key={tag.trim()}>
                    {tag.trim()}
                    {index < array.length - 1 ? ' / ' : ''}
                  </span>
                ))}
              </h6>
              <p className="text-umbra-40 line-clamp-3 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {product?.meta_description}
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <Select>
                  <SelectTrigger className="bg-umbra-5 text-umbra-100 h-[42px] w-full font-mono text-[16px] leading-[140%] font-normal">
                    <SelectValue placeholder={t('ChooseFormula')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">710Terps</SelectItem>
                    <SelectItem value="2">Suace Terp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={selectedVolume}
                  onValueChange={(value) => {
                    setSelectedVolume(value);
                    setShowVolumeError(false);
                  }}
                >
                  <SelectTrigger
                    className={`bg-umbra-5 text-umbra-100 h-[42px] w-full font-mono text-[16px] ${showVolumeError ? 'border-2 border-red-500' : ''}`}
                  >
                    <SelectValue placeholder={t('ChooseVolume')} />
                  </SelectTrigger>
                  <SelectContent>
                    {product?.variation?.[0]?.volume?.map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:hidden">
            <p className="text-umbra-100 line-clamp-3 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
              {product?.meta_description}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-5 md:flex-row">
            <div className="md:hidden">
              <button className="outline-button-white rounded-full border px-5 py-2">{t('SeePDF')}</button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border-umbra-40 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white disabled:cursor-not-allowed"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <MinusIcon size={14} fill="#C2C2C2" />
              </button>

              <input
                type="number"
                value={quantity}
                min={1}
                max={99}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= 99) {
                    setQuantity(val);
                  }
                }}
                onBlur={() => {
                  if (!quantity || quantity < 1) {
                    setQuantity(1);
                  } else if (quantity > 99) {
                    setQuantity(99);
                  }
                }}
                className="text-umbra-100 h-10 w-[60px] appearance-none text-center font-sans text-[17px] font-normal [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                className="border-umbra-40 bg-white-40/10 flex size-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-2xl disabled:cursor-not-allowed"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <PlusIcon size={14} fill="#000000" />
              </button>
            </div>
          </div>
          <button
            className="main-button-black w-full rounded-full px-2 py-2 md:max-w-[132px]"
            onClick={handleAddToCart}
          >
            {t('AddToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLeftCard;
