'use client';

import { useState } from 'react';
import { Edit, UserIcon } from 'lucide-react';

export default function PersonalInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '+1 234 567 890',
    email: 'john@example.com',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-umbra-100 font-mono text-[24px] leading-[130%] font-normal">Personal Information</h2>
      </div>

      <div className="relative min-h-[300px] w-full rounded-lg bg-white p-6 shadow-sm">
        {/* Edit icon */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          aria-label="Edit Info"
          className="absolute top-4 right-4 text-gray-500 transition hover:text-[#D00234]"
        >
          <Edit className="h-5 w-5" />
        </button>

        <div className="flex h-[300px] flex-col items-center justify-center gap-10 md:flex-row">
          {/* User photo */}
          <div className="bg-stardust flex h-[200px] w-[200px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300">
            <UserIcon className="text-umbra-40 h-32 w-32" />
          </div>

          {/* Display or Edit Form */}
          <div className="flex w-full flex-col gap-4">
            {!isEditing ? (
              <>
                <div className="inline-flex items-center justify-start gap-2">
                  <h2 className="text-umbra-100 font-mono text-[20px] leading-[130%] font-normal">{formData.name}</h2>
                </div>
                <div className="inline-flex items-center justify-start gap-2">
                  <span className="text-umbra-100 font-mono text-[18px] leading-[130%] font-normal">Phone:</span>
                  <p className="text-umbra-100 font-mono text-[16px] leading-[130%] font-normal">{formData.phone}</p>
                </div>
                <div className="inline-flex items-center justify-start gap-2">
                  <span className="text-umbra-100 font-mono text-[18px] leading-[130%] font-normal">Email:</span>
                  <p className="text-umbra-100 font-mono text-[16px] leading-[130%] font-normal">{formData.email}</p>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />

                <button
                  onClick={handleSave}
                  className="main-button-black inline-flex w-full items-center justify-center rounded-[10px] px-6 py-3"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
