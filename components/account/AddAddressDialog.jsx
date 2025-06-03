'use client';

import { addNewAddress } from '@/app/actions/user-actions';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddAddressDialog({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
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

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const result = await addNewAddress(newAddress);

      if (result.success) {
        toast.success('Address added successfully');
        onSave(result.data);
        setIsOpen(false);
        setNewAddress({
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
      } else {
        toast.error(result.message || 'Failed to add address');
      }
    } catch (error) {
      toast.error('An error occurred while adding the address');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="main-button-black rounded-[10px] px-6 py-2">Add New Address</button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto md:max-w-5xl">
        {' '}
        {/* <- Wider dialog */}
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
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
                value={newAddress[name]}
                onChange={handleInputChange}
                placeholder={`Enter ${label}`}
                className="input-field"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
        <DialogFooter className="mt-4">
          <button
            className="main-button-black inline-flex w-full items-center justify-center rounded-[10px] px-6 py-2"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
