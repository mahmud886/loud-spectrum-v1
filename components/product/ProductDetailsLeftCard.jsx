'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Shimmer from '@/components/ui/shimmer';
import { getProductPriceByVolume } from '@/helpers/get-product-price-by-volume';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { parseProductAttributes } from '@/helpers/product-attributes';
import { getStarRatingData } from '@/helpers/star-rating';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { getProductReviews } from '@/services/get-product-reviews';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ProductDetailsLeftCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState('');
  const [showVolumeError, setShowVolumeError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const dispatch = useDispatch();

  const t = useTranslations('ProductDetails');

  const volumeOptions = parseProductAttributes(product?.subproducts, 'volume');
  const { min, max } = getProductPriceRange(product?.subproducts);
  const selectedPrice = getProductPriceByVolume(product?.subproducts, selectedVolume);
  const formulaOptions = parseProductAttributes(product?.subproducts, 'formula');

  useEffect(() => {
    if (selectedPrice) {
      toast.success(`Selected price: $${selectedPrice.toFixed(2)} for ${selectedVolume}`);
    }
  }, [selectedPrice, selectedVolume]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (product?._id) {
        try {
          setReviewsLoading(true);
          const reviewsData = await getProductReviews(product._id);
          setReviews(reviewsData || []);
        } catch (error) {
          console.error('Error fetching product reviews:', error);
          setReviews([]);
        } finally {
          setReviewsLoading(false);
        }
      }
    };

    fetchReviews();
  }, [product?._id]);
  const { starComponents } = getStarRatingData(reviews);

  // Find the selected subProduct based on volume
  const selectedSubProduct = product.subproducts?.find((subProduct) => {
    const attribute = JSON.parse(subProduct.attribute);
    return attribute.volume === selectedVolume;
  });

  // Create modified product with selectedSubProduct
  const modifiedProduct = {
    ...product,
    subProducts: selectedSubProduct,
  };

  const handleAddToCart = () => {
    if (!selectedVolume) {
      setShowVolumeError(true);
      toast.error(t('PleaseSelectVolume'));
      return;
    }
    setShowVolumeError(false);
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
    setSelectedVolume('');
    setQuantity(1);
  };

  return (
    <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="w-full self-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              <button className="border-alive text-alive rounded-[3px] border-1 px-2 text-[12px] font-normal">
                {product?.category?.name}
              </button>
              <div className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[14px] leading-[130%] font-normal">
                {reviewsLoading ? (
                  <div className="flex items-center gap-2">
                    <Shimmer className="h-[15px] w-[75px] rounded" />
                    <Shimmer className="h-[15px] w-[60px] rounded" />
                  </div>
                ) : (
                  <>
                    <span className={'flex items-center justify-start'}>{starComponents}</span> {reviews.length}{' '}
                    {t('Reviews')}
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-umbra-100 line-clamp-2 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
                {product?.name}
              </h2>
              <h6 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
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
                {formulaOptions?.length > 0 && (
                  <Select>
                    <SelectTrigger className="bg-umbra-5 text-umbra-100 h-[42px] w-full font-mono text-[16px]">
                      <SelectValue placeholder={t('ChooseFormula')} />
                    </SelectTrigger>
                    <SelectContent>
                      {formulaOptions?.map((option) => (
                        <SelectItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
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
