'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const AddAReview = ({ productId, authToken, categoryId }) => {
  const t = useTranslations('ContactPage');
  const token = authToken;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 0,
    product_id: productId,
    category_id: categoryId,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.review.trim()) {
      newErrors.review = 'Review message is required';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error response:', errorData);
          throw new Error(errorData.message || 'Failed to submit review');
        }

        const data = await response.json();
        toast.success('Review submitted successfully');
        setFormData({
          name: '',
          email: '',
          review: '',
          rating: 0,
          product_id: productId,
        });
      } catch (error) {
        console.error('Submit error:', error);
        toast.error('Failed to submit review. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  return (
    <div className={'container py-[80px]'}>
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">Add a Review</h2>
      <div className="mt-6 w-full md:w-[60%]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-6 space-y-4">
            <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal">
              {t('contactForm.requiredNote')}
            </p>
            <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal">
              Your email address will not be published.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="w-full">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contactForm.namePlaceholder')}
                className={`bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal ${errors.name ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="w-full">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contactForm.emailPlaceholder')}
                className={`bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal ${errors.email ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
          <div>
            <Textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder={t('contactForm.messagePlaceholder')}
              className={`bg-umbra-5 placeholder:text-umbra-100 min-h-[173px] py-2 font-mono text-[16px] leading-[140%] font-normal ${errors.review ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.review && <p className="mt-1 text-sm text-red-500">{errors.review}</p>}
          </div>
          <div className="flex items-center justify-start gap-4">
            <p>Select Rating: </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="focus:outline-none"
                  disabled={isSubmitting}
                >
                  <svg
                    className={`h-6 w-6 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="main-button-black rounded-full border-1 px-6 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAReview;
