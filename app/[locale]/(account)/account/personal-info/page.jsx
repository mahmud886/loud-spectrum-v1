'use client';

import { updateUserProfile } from '@/app/actions/user-actions';
import { validateUserInfo } from '@/helpers/validations/user-info-validation';
import { selectCurrentUser, setCredentials } from '@/lib/store/slices/authSlice';
import { motion } from 'framer-motion';
import { Edit, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function PersonalInfoPage() {
  const userInformation = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInformation) {
      setFormData({
        name: userInformation.name || '',
        phone: userInformation.phone_number || '',
        email: userInformation.email || '',
      });
    }
  }, [userInformation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userInformation?.name || '',
      phone: userInformation?.phone_number || '',
      email: userInformation?.email || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    const validationResult = await validateUserInfo(formData);

    if (!validationResult.success) {
      const newErrors = {};
      validationResult.errors.forEach((error) => {
        newErrors[error.field] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateUserProfile(userInformation.id, {
        name: formData.name,
        phone_number: formData.phone,
      });

      if (!result.success) {
        toast.error(result.message || 'Failed to update profile');
        return;
      }
      dispatch(setCredentials({ ...userInformation, name: formData.name, phone_number: formData.phone }));

      toast.success('Profile updated successfully');
      setErrors({});
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-umbra-100 font-mono text-[24px] leading-[130%] font-normal">Personal Information</h2>
      </div>

      <div className="relative min-h-[300px] w-full rounded-lg bg-white p-6 shadow-sm">
        {/* Edit icon */}
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          aria-label="Edit Info"
          className="absolute top-4 right-4 cursor-pointer text-gray-500 transition hover:text-[#D00234]"
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? '' : <Edit className="h-5 w-5" />}
        </motion.button>

        <div className="flex h-[300px] flex-col items-center justify-center gap-10 md:flex-row">
          {/* User photo */}
          <motion.div
            className="bg-stardust flex h-[200px] w-[200px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300"
            whileHover={{ scale: 1.02 }}
          >
            <UserIcon className="text-umbra-40 h-32 w-32" />
          </motion.div>

          {/* Display or Edit Form */}
          <div className="flex w-full flex-col gap-4">
            {!isEditing ? (
              <>
                <motion.div
                  className="inline-flex items-center justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-umbra-100 font-mono text-[20px] leading-[130%] font-normal">{formData.name}</h2>
                </motion.div>
                <motion.div
                  className="inline-flex items-center justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="text-umbra-100 font-mono text-[18px] leading-[130%] font-normal">Phone:</span>
                  <p className="text-umbra-100 font-mono text-[16px] leading-[130%] font-normal">{formData.phone}</p>
                </motion.div>
                <motion.div
                  className="inline-flex items-center justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <span className="text-umbra-100 font-mono text-[18px] leading-[130%] font-normal">Email:</span>
                  <p className="text-umbra-100 font-mono text-[16px] leading-[130%] font-normal">{formData.email}</p>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
                      errors.name ? 'border border-red-500' : ''
                    }`}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </motion.div>
                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
                      errors.phone ? 'border border-red-500' : ''
                    }`}
                    disabled={isLoading}
                  />
                  {errors.phone && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {errors.phone}
                    </motion.span>
                  )}
                </motion.div>
                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="bg-umbra-10 text-umbra-60 min-h-[48px] w-full cursor-not-allowed rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                    disabled={true}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-umbra-60 text-sm"
                  >
                    Email cannot be changed
                  </motion.span>
                </motion.div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleCancel}
                    className="border-umbra-20 text-umbra-100 hover:bg-umbra-10 flex-1 cursor-pointer rounded-[10px] border px-6 py-3 transition disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    className="main-button-black flex-1 rounded-[10px] px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </motion.button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
