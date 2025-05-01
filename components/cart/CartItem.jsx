'use client';
import React from 'react';
import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

const CartItem = ({ item }) => {
  return (
    <div className="border-umbra-10 flex items-center gap-4 rounded-md border-1 py-2.5 pr-5 pl-2.5">
      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
      <div className="flex w-full flex-col justify-between gap-5">
        <h6 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">{item.name}</h6>
        <div className="flex w-full items-end justify-between gap-5">
          <div className="mt-2 flex items-center gap-2">
            {/* Quantity Control */}
            <div className="bg-umbra-5 inline-flex overflow-hidden rounded-full">
              {/* Minus Button */}
              <button
                className="group text-umbra-100 hover:text-white-100 flex cursor-pointer items-center justify-center px-2 py-1 transition hover:bg-red-500"
                onClick={() => console.log('decrease')}
              >
                <MinusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
              </button>

              {/* Quantity */}
              <div className="text-umbra-100 flex items-center justify-center px-3 py-1 font-medium">
                {item.quantity}
              </div>

              {/* Plus Button */}
              <button
                className="group text-umbra-100 hover:text-white-100 hover:bg-alive flex cursor-pointer items-center justify-center px-2 py-1 transition"
                onClick={() => console.log('increase')}
              >
                <PlusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              className="group text-umbra-100 hover:text-white-100 bg-umbra-5 flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-red-500"
              onClick={() => console.log('remove')}
            >
              <TrashIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
            </button>
          </div>
          <div>
            <p className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">${item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
