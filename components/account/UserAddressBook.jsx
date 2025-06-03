'use client';

import { updateAddress } from '@/app/actions/user-actions';
import AddAddressDialog from '@/components/account/AddAddressDialog';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialAddresses = [
  {
    _id: '683f38006b13381c17176d1c',
    user_id: '683c21626b13381c171769a5',
    first_name: 'Iqbals',
    last_name: 'Mahmud',
    email: 'iqbal886mahmud@gmail.com',
    phone: '01670161693',
    city: 'Dhaka',
    province: 'Dhaka',
    country: 'Bangladesh',
    post_code: '2490',
    street_address: 'Kytle,Madan, Netrakona',
    is_default: true,
    type: 'shipping',
    status: 'Active',
    created_at: '2025-06-03T17:59:28.407Z',
    updated_at: '2025-06-03T17:59:28.407Z',
  },
];

export default function UserAddressBook({ userAddressBook }) {
  const [addresses, setAddresses] = useState(userAddressBook?.addresss || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      setIsLoading(true);
      const currentAddress = addresses.find((addr) => addr._id === addressId);
      const newDefaultStatus = !currentAddress.is_default;

      const result = await updateAddress(addressId, { is_default: newDefaultStatus });

      if (result.success) {
        setAddresses(
          addresses.map((addr) => ({
            ...addr,
            is_default: addr._id === addressId ? newDefaultStatus : false,
          })),
        );
        toast.success(newDefaultStatus ? 'Address set as default' : 'Address removed from default');
      } else {
        toast.error(result.message || 'Failed to update address status');
      }
    } catch (error) {
      toast.error('An error occurred while updating the address status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2 p-4 md:p-0">
        <h1 className="text-umbra-100 font-sans text-[24px] font-normal">Address Book</h1>
        <AddAddressDialog onSave={handleSaveAddress} />
      </div>

      <div className="mt-5 space-y-6 p-4 md:p-0">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="relative cursor-pointer rounded-lg border bg-white p-6 shadow-sm transition-colors hover:border-[#D00234]"
            onClick={() => handleSetDefaultAddress(address._id)}
          >
            <button
              aria-label="Edit Address"
              className="absolute top-4 right-4 text-gray-500 transition hover:text-[#D00234]"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit className="h-5 w-5" />
            </button>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <p>
                <span className="font-semibold">Name:</span> {address.first_name} {address.last_name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {address.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {address.phone}
              </p>
              <p>
                <span className="font-semibold">City:</span> {address.city}
              </p>
              <p>
                <span className="font-semibold">Province:</span> {address.province}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {address.country}
              </p>
              <p>
                <span className="font-semibold">Postal Code:</span> {address.post_code}
              </p>
              <p>
                <span className="font-semibold">Street:</span> {address.street_address}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {address.type}
              </p>
              {address.is_default ? (
                <p className="text-green-600">
                  <span className="font-semibold">Click to remove from default</span>
                </p>
              ) : (
                <p className="text-gray-500">
                  <span className="font-semibold">Click to set as default</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
