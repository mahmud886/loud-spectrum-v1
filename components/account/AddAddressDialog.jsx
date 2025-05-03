'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddAddressDialog({ onSave }) {
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    street: '',
    type: '',
  });

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      ...newAddress,
    };
    onSave(newEntry);
    setNewAddress({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      street: '',
      type: '',
    });
  };

  return (
    <Dialog>
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
            ['First Name', 'firstName'],
            ['Last Name', 'lastName'],
            ['Email', 'email'],
            ['Phone', 'phone'],
            ['City', 'city'],
            ['Province', 'province'],
            ['Country', 'country'],
            ['Postal Code', 'postalCode'],
            ['Street', 'street'],
            ['Address Type', 'type'],
          ].map(([label, name]) => (
            <div key={name}>
              <Label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal" htmlFor={name}>
                {label}
              </Label>
              <Input
                id={name}
                name={name}
                value={newAddress[name]}
                onChange={handleInputChange}
                placeholder={`Enter ${label}`}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
          ))}
        </div>
        <DialogFooter className="mt-4">
          <button
            className="main-button-black inline-flex w-full items-center justify-center rounded-[10px] px-6 py-2"
            onClick={handleSave}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
