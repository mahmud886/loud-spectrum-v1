'use client';

import { addNewAddress, getAddresses, updateAddress } from '@/app/actions/user-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AddAddressDialog({ onSave, editMode = false, editAddress = null, trigger = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    country: '',
    post_code: '',
    street_address: '',
    is_default: false,
  });

  // Populate form when editing
  useEffect(() => {
    if (editMode && editAddress) {
      setAddressData({
        first_name: editAddress.first_name || '',
        last_name: editAddress.last_name || '',
        email: editAddress.email || '',
        phone: editAddress.phone || '',
        city: editAddress.city || '',
        province: editAddress.province || '',
        country: editAddress.country || '',
        post_code: editAddress.post_code || '',
        street_address: editAddress.street_address || '',
        is_default: editAddress.is_default || false,
      });
    } else {
      // Reset form for add mode
      setAddressData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        province: '',
        country: '',
        post_code: '',
        street_address: '',
        is_default: false,
      });
    }
  }, [editMode, editAddress, isOpen]);

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (checked) => {
    setAddressData({ ...addressData, is_default: checked });
  };

  const resetForm = () => {
    setAddressData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      country: '',
      post_code: '',
      street_address: '',
      is_default: false,
    });
  };

  const handleDefaultAddressLogic = async (addressId) => {
    try {
      // Get all current addresses
      const result = await getAddresses();
      if (!result.error) {
        const allAddresses = result.data?.addresss || [];

        // Find addresses that are currently default (excluding the one we're updating)
        const currentDefaultAddresses = allAddresses.filter((addr) => addr._id !== addressId && addr.is_default);

        // Update all current default addresses to not be default
        for (const addr of currentDefaultAddresses) {
          await updateAddress(addr._id, { is_default: false });
        }
      }
    } catch (error) {
      console.error('Error handling default address logic:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let result;

      // If setting as default, handle removing default from other addresses first
      if (addressData.is_default) {
        if (editMode && editAddress) {
          await handleDefaultAddressLogic(editAddress._id);
        } else {
          // For new addresses, remove default from all existing addresses
          await handleDefaultAddressLogic(null);
        }
      }

      if (editMode && editAddress) {
        // Update existing address
        result = await updateAddress(editAddress._id, addressData);
      } else {
        // Add new address
        result = await addNewAddress(addressData);
      }

      if (result.success) {
        toast.success(editMode ? 'Address updated successfully' : 'Address added successfully');
        onSave(result.data);
        setIsOpen(false);
        if (!editMode) {
          resetForm();
        }
      } else {
        toast.error(result.message || (editMode ? 'Failed to update address' : 'Failed to add address'));
      }
    } catch (error) {
      toast.error(`An error occurred while ${editMode ? 'updating' : 'adding'} the address`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="main-button-black rounded-[10px] px-6 py-2">
            {editMode ? 'Edit Address' : 'Add New Address'}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto md:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ['First Name', 'first_name'],
            ['Last Name', 'last_name'],
            ['Email', 'email'],
            ['Phone', 'phone'],
            ['City', 'city'],
            ['Province', 'province'],
            ['Country', 'country'],
            ['Postal Code', 'post_code'],
            ['Street', 'street_address'],
          ].map(([label, name]) => (
            <div key={name}>
              <Label className="input-label" htmlFor={name}>
                {label}
              </Label>
              <Input
                id={name}
                name={name}
                value={addressData[name]}
                onChange={handleInputChange}
                placeholder={`Please enter ${label}`}
                className="input-field"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>

        {/* Default Address Checkbox */}
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="is_default"
            checked={addressData.is_default}
            onCheckedChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <Label
            htmlFor="is_default"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default address
          </Label>
        </div>

        <DialogFooter className="mt-4">
          <button
            className="main-button-black inline-flex w-full items-center justify-center rounded-[10px] px-6 py-2"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (editMode ? 'Updating...' : 'Saving...') : editMode ? 'Update' : 'Save'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
