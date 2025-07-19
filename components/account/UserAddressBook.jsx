'use client';

import { getAddresses, updateAddress } from '@/app/actions/user-actions';
import AddAddressDialog from '@/components/account/AddAddressDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAuthToken } from '@/hooks/useAuthToken';
import {
  addUserAddress,
  removeUserAddress,
  selectUserAddresses,
  setUserAddresses,
  updateUserAddress as updateUserAddressAction,
} from '@/lib/store/slices/authSlice';
import { deleteOrderAddressById } from '@/services/delete-order-address-by-id';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function UserAddressBook({ userAddressBook }) {
  const dispatch = useDispatch();
  const authToken = useAuthToken();
  const addresses = useSelector(selectUserAddresses) || [];
  const [isLoading, setIsLoading] = useState(false);

  // Initialize addresses from props if Redux store is empty
  useEffect(() => {
    try {
      if (userAddressBook?.addresss && Array.isArray(userAddressBook.addresss) && addresses.length === 0) {
        dispatch(setUserAddresses(userAddressBook.addresss));
      }
    } catch (error) {
      console.error('Error initializing addresses:', error);
    }
  }, [userAddressBook, addresses.length, dispatch]);

  const handleSaveAddress = (newAddress) => {
    dispatch(addUserAddress(newAddress));
  };

  const handleUpdateAddress = (updatedAddress) => {
    dispatch(updateUserAddressAction(updatedAddress));
    // Refresh addresses from server to get the latest data
    refreshAddresses();
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

  const handleDeleteAddress = async (addressId) => {
    try {
      setIsLoading(true);

      // Show confirmation dialog only on client side
      let confirmed = false;
      if (typeof window !== 'undefined') {
        confirmed = window.confirm('Are you sure you want to delete this address? This action cannot be undone.');
      }

      if (!confirmed) {
        setIsLoading(false);
        return;
      }

      // Call the delete service
      const result = await deleteOrderAddressById(addressId, authToken);

      if (!result.error) {
        // Remove from Redux store
        dispatch(removeUserAddress(addressId));

        // Refresh addresses from server to ensure UI is in sync
        await refreshAddresses();
        toast.success('Address deleted successfully');
      } else {
        toast.error(result.message || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('An error occurred while deleting the address');
    } finally {
      setIsLoading(false);
    }
  };

  // Add error boundary for the component
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only add event listeners on client side
    if (typeof window === 'undefined') return;

    const handleError = (error) => {
      console.error('UserAddressBook Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="p-4">
        <h1 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">Address Book</h1>
        <div className="py-8 text-center">
          <p className="text-red-500">Something went wrong loading your addresses. Please try refreshing the page.</p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
            className="main-button-black mt-4 rounded-[10px] px-6 py-2"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2 p-4 md:p-0">
        <h1 className="text-umbra-100 font-sans text-[24px] font-normal">Address Book</h1>
        <AddAddressDialog onSave={handleSaveAddress} />
      </div>

      <div className="mt-5 space-y-6 p-4 md:p-0">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address) => {
            // Safety check for address object
            if (!address || !address._id) {
              console.warn('Invalid address object:', address);
              return null;
            }

            return (
              <div key={address._id} className="relative rounded-lg border bg-white p-6 shadow-sm transition-colors">
                <div className="absolute top-4 right-4 flex items-center justify-center gap-2">
                  <AddAddressDialog
                    editMode={true}
                    editAddress={address}
                    onSave={handleUpdateAddress}
                    trigger={
                      <button
                        aria-label="Edit Address"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-100 text-green-600 transition-all duration-200 hover:scale-105 hover:bg-green-200 hover:text-green-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    }
                  />
                  {/* <button
                    aria-label="Delete Address"
                    onClick={() => handleDeleteAddress(address._id)}
                    disabled={isLoading}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button> */}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  <p>
                    <span className="font-semibold">Name:</span> {address.first_name || ''} {address.last_name || ''}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {address.email || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {address.phone || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {address.city || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Province:</span> {address.province || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span> {address.country || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Postal Code:</span> {address.post_code || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Street:</span> {address.street_address || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {address.type || 'N/A'}
                  </p>
                  {/* Default Address Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`default-${address._id}`}
                      checked={Boolean(address.is_default)}
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
            );
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No addresses found. Please add a new address.</p>
          </div>
        )}
      </div>
    </div>
  );
}
