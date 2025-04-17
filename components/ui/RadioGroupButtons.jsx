'use client';
import { useState } from 'react';
import clsx from 'clsx';

const options = ['All', 'Active', 'Relaxed', 'Classic', 'Sweet', 'Dank', 'Alive', 'Sample Packed'];

export default function RadioGroupButtons() {
  const [selected, setSelected] = useState(['All']);

  const toggleOption = (option) => {
    if (option === 'All') {
      setSelected(['All']);
    } else {
      let updated;
      if (selected.includes(option)) {
        updated = selected.filter((item) => item !== option);
      } else {
        updated = [...selected.filter((item) => item !== 'All'), option];
      }

      setSelected(updated.length === 0 ? ['All'] : updated);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md space-y-2" role="group" aria-label="Filter Options">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className={clsx(
                'group relative flex w-full cursor-pointer items-center justify-between rounded-sm border px-3 py-2 text-white transition',
                isSelected ? 'bg-stardust' : 'bg-white-100',
              )}
              aria-pressed={isSelected}
            >
              <span className="text-umbra-100 font-mono text-[16px] leading-[140%]">{option}</span>
              <span
                className={clsx(
                  'flex h-[9px] w-[9px] items-center justify-center rounded-full border',
                  isSelected ? 'border-[#0D1117]' : 'border-gray-400',
                )}
              >
                {isSelected && <span className="h-[5px] w-[5px] rounded-full bg-[#0D1117]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
