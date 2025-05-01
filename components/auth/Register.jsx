'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-6">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Full Name*</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Phone*</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
        </div>

        {/* Email & Company */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Email*</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Company</label>
            <input
              type="text"
              placeholder="Enter your company name"
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Website</label>
          <input
            type="url"
            placeholder="Enter your website"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Confirm Password*</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
            required
          />
          <label htmlFor="terms" className="text-umbra-100 font-sans text-[14px] leading-[140%]">
            I agree to the terms and conditions
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Register
          </button>
          <Link
            href="/wholesaler-registration"
            type="button"
            className="main-button-white hover:bg-umbra-10 inline-flex w-full items-center justify-center rounded-full border border-black bg-transparent px-6 py-3 text-black transition"
          >
            Create Wholesaler Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
