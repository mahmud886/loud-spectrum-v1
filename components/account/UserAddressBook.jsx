'use client';

import { getAddresses, updateAddress } from '@/app/actions/user-actions';
import AddAddressDialog from '@/components/account/AddAddressDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  addUserAddress,
  selectUserAddresses,
  setUserAddresses,
  updateUserAddress as updateUserAddressAction,
} from '@/lib/store/slices/authSlice';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function UserAddressBook({ userAddressBook }) {
  const dispatch = useDispatch();
  const addresses = useSelector(selectUserAddresses);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Initialize addresses from props if Redux store is empty
  useEffect(() => {
    if (userAddressBook?.addresss && addresses.length === 0) {
      dispatch(setUserAddresses(userAddressBook.addresss));
    }
  }, [userAddressBook, addresses.length, dispatch]);

  const handleSaveAddress = (newAddress) => {
    dispatch(addUserAddress(newAddress));
  };

  const handleUpdateAddress = (updatedAddress) => {
    dispatch(updateUserAddressAction(updatedAddress));
    // Refresh addresses from server to get the latest data
    refreshAddresses();
    setEditingAddress(null);
  };

  const refreshAddresses = async () => {
    try {
      const result = await getAddresses();
      if (!result.error) {
        // Use the correct property name 'addresss'
        const fetchedAddresses = result.data?.addresss || [];
        dispatch(setUserAddresses(fetchedAddresses));
      }
    } catch (error) {
      console.error('Error refreshing addresses:', error);
    }
  };

  const handleSetDefaultAddress = async (addressId, checked) => {
    try {
      setIsLoading(true);

      // If setting as default, first remove default from all other addresses
      if (checked) {
        // Get all addresses that are currently default (excluding the one we're updating)
        const currentDefaultAddresses = addresses.filter((addr) => addr._id !== addressId && addr.is_default);

        // Update all current default addresses to not be default
        for (const addr of currentDefaultAddresses) {
          await updateAddress(addr._id, { is_default: false });
          // Update Redux store
          dispatch(updateUserAddressAction({ ...addr, is_default: false }));
        }
      }

      // Then update the clicked address
      const result = await updateAddress(addressId, { is_default: checked });

      if (result.success) {
        // Update the specific address in Redux store
        const addressToUpdate = addresses.find((addr) => addr._id === addressId);
        if (addressToUpdate) {
          dispatch(updateUserAddressAction({ ...addressToUpdate, is_default: checked }));
        }

        // Refresh addresses from server to ensure UI is in sync
        await refreshAddresses();
        toast.success(checked ? 'Address set as default' : 'Address removed from default');
      } else {
        toast.error(result.message || 'Failed to update address status');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('An error occurred while updating the address status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2 p-4 md:p-0">
        <h1 className="text-umbra-100 font-sans text-[24px] font-normal">Address Book</h1>
        <AddAddressDialog onSave={handleSaveAddress} />
      </div>

      <div className="mt-5 space-y-6 p-4 md:p-0">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className="relative rounded-lg border bg-white p-6 shadow-sm transition-colors">
              <AddAddressDialog
                editMode={true}
                editAddress={editingAddress}
                onSave={handleUpdateAddress}
                trigger={
                  <button
                    aria-label="Edit Address"
                    className="absolute top-4 right-4 text-gray-500 transition hover:text-[#D00234]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                }
              />
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
                {/* Default Address Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`default-${address._id}`}
                    checked={address.is_default}
                    onCheckedChange={(checked) => handleSetDefaultAddress(address._id, checked)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={`default-${address._id}`}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Default Address
                  </Label>
                </div>
              </div>
              {isLoading && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D00234]"></div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No addresses found. Please add a new address.</p>
          </div>
        )}
      </div>
    </div>
  );
}
