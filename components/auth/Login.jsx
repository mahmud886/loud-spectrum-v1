'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // make sure you have `lucide-react` installed

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-4">
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
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Password*</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        <div className="mt-6 w-full">
          <button
            type="submit"
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
