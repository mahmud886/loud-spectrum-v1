'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProductPriceByVolume } from '@/helpers/get-product-price-by-volume';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { parseProductAttributes } from '@/helpers/product-attributes';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon, Star, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ProductBuyDialog = ({ open, onOpenChange, product }) => {
  const t = useTranslations('ProductDetails');
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState('');
  const [showVolumeError, setShowVolumeError] = useState(false);
  const dispatch = useDispatch();

  const volumeOptions = parseProductAttributes(product, 'volume');
  const { min, max } = getProductPriceRange(product?.subProducts);

  const selectedPrice = getProductPriceByVolume(product?.subProducts, selectedVolume);

  useEffect(() => {
    if (selectedPrice) {
      toast.success(`Selected price: $${selectedPrice.toFixed(2)} for ${selectedVolume}`);
    }
  }, [selectedPrice, selectedVolume]);

  // Find the selected subProduct based on volume
  const selectedSubProduct = product.subProducts?.find((subProduct) => {
    const attribute = JSON.parse(subProduct.attribute);
    return attribute.volume === selectedVolume;
  });

  const handleAddToCart = () => {
    if (!selectedVolume) {
      setShowVolumeError(true);
      toast.error(t('PleaseSelectVolume'));
      return;
    }
    setShowVolumeError(false);

    if (!selectedSubProduct) {
      toast.error('Selected volume not found');
      return;
    }

    // Create modified product with selectedSubProduct
    const modifiedProduct = {
      ...product,
      subProducts: selectedSubProduct,
    };

    dispatch(
      addToCart({
        id: product._id,
        product: modifiedProduct,
        quantity,
        price: selectedPrice,
        selectedVolume,
        isRegular: true,
        flavor: '',
      }),
    );
    onOpenChange(false);
    setSelectedVolume('');
    setQuantity(1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white-100 text-umbra-100 relative max-h-[90vh] w-[90%] overflow-y-auto rounded-lg p-5 md:h-[587px] md:w-[413px]">
        <button
          className="text-umbra-100 hover:bg-umbra-100 focus:ring-ring border-umbra-10 absolute top-5 right-5 cursor-pointer rounded-full border bg-white p-1 transition-all duration-200 ease-in-out hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex h-full w-full flex-col items-start justify-between gap-5">
          <div className="w-full self-start">
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
                <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">{product?.name}</h2>
                <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal">
                  {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
                </h6>
              </div>
              <hr className="terpene-border" />
              <div className="space-y-2">
                <h6 className="text-umbra-100 font-sans text-[20px] leading-snug md:text-[22px]">
                  {product?.tags?.split(',').map((tag, index, array) => (
                    <span key={tag.trim()}>
                      {tag.trim()}
                      {index < array.length - 1 ? ' / ' : ''}
                    </span>
                  ))}
                </h6>
                <p className="text-umbra-40 line-clamp-3 font-mono text-[16px] leading-[140%]">
                  {product?.meta_description}
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
                      {volumeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex w-full items-center justify-between gap-5 md:flex-row">
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
    </div>
  );
};

export default ProductBuyDialog;
