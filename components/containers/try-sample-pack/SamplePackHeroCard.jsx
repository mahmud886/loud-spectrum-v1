'use client';

import DiscountPriceDisplay from '@/components/ui/DiscountPriceDisplay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { calculateDiscountForSelectedPrice } from '@/helpers/calculate-discount';
import { getTranslatedCategoryName } from '@/helpers/dynamic-translations';
import { getCategoryColorClasses, getCategoryTextClasses } from '@/helpers/get-category-color-classes';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { getStarRatingData, renderStars } from '@/helpers/star-rating';
import { addToCartAndOpenDrawer } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const SamplePackHeroCard = ({ filteredSamplePackProducts, filteredProductReviews }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [remark, setRemark] = useState('');
  const [showVolumeError, setShowVolumeError] = useState(false);
  const [showRemarkError, setShowRemarkError] = useState(false);
  const [showSelectedProductError, setShowSelectedProductError] = useState(false);

  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const dispatch = useDispatch();

  const t = useTranslations('TrySamplePack');
  const tCategories = useTranslations('ProductCategories');

  // Calculate discount for selected price (for cart functionality)
  const selectedPriceDiscount = calculateDiscountForSelectedPrice(selectedProduct?.category, selectedPrice);

  const { starComponents } = getStarRatingData(filteredProductReviews);

  const handleSelectVolume = (value) => {
    if (selectedProduct && selectedProduct.subProducts) {
      const subProduct = selectedProduct.subProducts.find((sub) => {
        const attribute = JSON.parse(sub.attribute);
        return attribute.volume === value;
      });

      if (subProduct) {
        setSelectedVolume(value);
        setSelectedPrice(subProduct.price);
        setShowVolumeError(false);
      }
    }
  };

  const handleRemarkChange = (value) => {
    setRemark(value);
    if (value.trim()) {
      setShowRemarkError(false);
    }
  };

  const handleProductSelection = (value) => {
    const product = filteredSamplePackProducts.find((item) => item._id === value);

    if (product) {
      const { min, max } = getProductPriceRange(product?.subProducts);
      setMin(min);
      setMax(max);
      setSelectedProduct(product);
      setSelectedProductName(product.name);
      setShowSelectedProductError(false);
      setSelectedVolume(null);
      setSelectedPrice(null);
    }
  };

  const selectedSubProduct = selectedProduct?.subProducts?.find((subProduct) => {
    if (!subProduct?.attribute) return false;
    try {
      const attribute = JSON.parse(subProduct.attribute);
      return attribute?.volume === selectedVolume;
    } catch (error) {
      console.error('Error parsing subProduct attribute:', error);
      return false;
    }
  });

  // Create modified product with selectedSubProduct
  const modifiedProduct = {
    ...selectedProduct,
    subProducts: selectedSubProduct,
  };

  useEffect(() => {
    if (selectedProduct) {
      setSelectedVolume(null);
      setSelectedPrice(null);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedPrice) {
      const displayPrice = selectedPriceDiscount.hasDiscount ? selectedPriceDiscount.discountedPrice : selectedPrice;
    }
  }, [selectedPrice, selectedVolume, selectedPriceDiscount]);

  const handleAddToCart = () => {
    if (!selectedProduct) {
      setShowSelectedProductError(true);
      toast.error('Please select a product');
      return;
    }
    if (!selectedVolume) {
      setShowVolumeError(true);
      toast.error('Please select a volume');
      return;
    }
    if (!remark) {
      setShowRemarkError(true);
      toast.error('Please add a remark');
      return;
    }

    // Use discounted price if available
    const finalPrice = selectedPriceDiscount.hasDiscount ? selectedPriceDiscount.discountedPrice : selectedPrice;
    dispatch(
      addToCartAndOpenDrawer({
        id: selectedProduct._id,
        product: modifiedProduct,
        quantity,
        price: finalPrice,
        selectedVolume,
        isRegular: true,
        flavor: selectedProductName,
        remarks: remark,
      }),
    );

    toast.success('Product added to cart successfully!');

    setSelectedProduct(null);
    setSelectedProductName(null);
    setSelectedVolume(null);
    setSelectedPrice(null);
    setRemark('');
    setShowSelectedProductError(false);
    setShowVolumeError(false);
    setShowRemarkError(false);
    setQuantity(1);
  };

  return (
    <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="w-full self-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              <button
                className={`${getCategoryColorClasses(filteredProductReviews?.[0]?.category?.name)} mb-0 rounded-[3px] border-1 px-2 text-[12px] font-normal capitalize`}
              >
                {filteredProductReviews?.[0]?.category?.name
                  ? getTranslatedCategoryName(tCategories, t, filteredProductReviews?.[0]?.category, 'tag')
                  : `${tCategories('sample-packs')}`}
              </button>
              <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[14px] leading-[130%] font-normal">
                <span className={'flex items-center justify-start'}>
                  {filteredProductReviews?.length === 0
                    ? renderStars(5, { size: 15, fillColor: '#ffffff', strokeColor: '#00000' })
                    : starComponents}
                </span>{' '}
                {filteredProductReviews?.length} {t('Reviews')}
              </p>
            </div>

            <div className="space-y-2">
              <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                {selectedPrice ? '' : `${t('StartingAt')} $10.00`}
              </h6>

              {selectedPrice ? (
                <DiscountPriceDisplay
                  category={selectedProduct?.category}
                  selectedPrice={selectedPrice}
                  originalPriceClass="text-18px text-umbra-100/30 line-through"
                  discountedPriceClass={`text-[22px] ${getCategoryTextClasses(selectedProduct?.category?.name)}`}
                  regularPriceClass="text-umbra-100 text-[22px]"
                  discountTextClass={`text-[14px]  md:text-xs font-bold ${getCategoryTextClasses(selectedProduct?.category?.name)}`}
                  containerClass="flex flex-col gap-1 font-sans leading-[130%] font-normal tracking-normal"
                  showOriginalPrice={true}
                  showDiscountText={true}
                />
              ) : (
                ''
              )}

              {selectedProduct && (
                <p className="text-umbra-40 font-mono text-[14px] leading-[140%] font-normal">
                  {selectedProduct.name} - {selectedVolume}
                </p>
              )}
            </div>
            <hr className="terpene-border" />
            <div className="space-y-2">
              <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-[100px] overflow-y-auto">
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {selectedProduct?.short_description ||
                    'Mango OG is a relaxing, herbal remedy strain made by crossing KC 33 with Afghani. Produces euphoric and uplifting effects that are sure to boost your mood.'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                {filteredSamplePackProducts?.length > 0 && (
                  <Select onValueChange={handleProductSelection} value={selectedProduct?._id || ''}>
                    <SelectTrigger
                      className={`text-umbra-100 bg-umbra-5 h-[42px] w-full font-mono text-[16px] leading-[140%] font-normal ${showSelectedProductError ? 'border-2 border-red-500' : ''}`}
                    >
                      <SelectValue placeholder={selectedProductName ? selectedProductName : t('ChooseFormula')} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSamplePackProducts.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {selectedProduct && selectedProduct.subProducts && (
                <div>
                  <Select onValueChange={handleSelectVolume} value={selectedVolume || ''}>
                    <SelectTrigger
                      className={`text-umbra-100 bg-umbra-5 h-[42px] w-full font-mono text-[16px] leading-[140%] font-normal ${showVolumeError ? 'border-2 border-red-500' : ''}`}
                    >
                      <SelectValue placeholder={t('SelectVolume')} />
                    </SelectTrigger>
                    <SelectContent>
                      {(() => {
                        const uniqueVolumes = [];
                        const seenVolumes = new Set();

                        selectedProduct.subProducts.forEach((subProduct) => {
                          const attribute = JSON.parse(subProduct.attribute);
                          if (!seenVolumes.has(attribute.volume)) {
                            seenVolumes.add(attribute.volume);
                            uniqueVolumes.push({
                              volume: attribute.volume,
                              price: subProduct.price,
                              id: subProduct._id,
                            });
                          }
                        });

                        return uniqueVolumes.map((item) => (
                          <SelectItem key={item.id} value={item.volume}>
                            {item.volume}
                            {/* - ${item.price} */}
                          </SelectItem>
                        ));
                      })()}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="relative w-full">
                <p className="text-umbra-100 pointer-events-none absolute top-2 left-3 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('CustomizeYourPack')}
                </p>
                <Textarea
                  placeholder={t('Note')}
                  className={`bg-umbra-5 h-[130px] pt-9 ${showRemarkError ? 'border-2 border-red-500' : ''}`}
                  value={remark}
                  onChange={(e) => handleRemarkChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row">
          <div className="">
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

export default SamplePackHeroCard;
