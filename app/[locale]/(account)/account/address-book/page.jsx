'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import AddAddressDialog from '@/components/account/AddAddressDialog';

const initialAddresses = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    city: 'New York',
    province: 'NY',
    country: 'USA',
    postalCode: '10001',
    street: '123 Main St',
    type: 'Home',
  },
];

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState(initialAddresses);

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2 p-4 md:p-0">
        <h1 className="text-umbra-100 font-sans text-[24px] font-normal">Address Book</h1>
        <AddAddressDialog onSave={handleSaveAddress} />
      </div>

      <div className="mt-5 space-y-6 p-4 md:p-0">
        {addresses.map((address) => (
          <div key={address.id} className="relative rounded-lg border bg-white p-6 shadow-sm">
            <button
              aria-label="Edit Address"
              className="absolute top-4 right-4 text-gray-500 transition hover:text-[#D00234]"
            >
              <Edit className="h-5 w-5" />
            </button>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <p>
                <span className="font-semibold">Name:</span> {address.firstName} {address.lastName}
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
                <span className="font-semibold">Postal Code:</span> {address.postalCode}
              </p>
              <p>
                <span className="font-semibold">Street:</span> {address.street}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {address.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
