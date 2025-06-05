'use client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function RadioGroupButtons({ categories, onCategoryChange }) {
  const [selected, setSelected] = useState(['All']);

  const options = ['All', ...categories.map((category) => category.name)];

  const toggleOption = (option) => {
    if (option === 'All') {
      setSelected(['All']);
      onCategoryChange?.([]);
    } else {
      let updated;
      if (selected.includes(option)) {
        updated = selected.filter((item) => item !== option);
      } else {
        updated = [...selected.filter((item) => item !== 'All'), option];
      }

      setSelected(updated.length === 0 ? ['All'] : updated);

      // Emit selected categories to parent
      const selectedCategories = updated.length === 0 ? [] : categories.filter((cat) => updated.includes(cat.name));
      onCategoryChange?.(selectedCategories);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md space-y-2" role="group" aria-label="Filter Options">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                'group relative flex w-full cursor-pointer items-center justify-between rounded-sm border px-3 py-2 text-white transition',
                isSelected ? 'bg-stardust' : 'bg-white-100',
              )}
              aria-pressed={isSelected}
              layout
            >
              <span className="text-umbra-100 font-mono text-[16px] leading-[140%]">{option}</span>
              <span
                className={clsx(
                  'flex h-[9px] w-[9px] items-center justify-center rounded-full border transition-all duration-300',
                  isSelected ? 'border-[#0D1117]' : 'border-gray-400',
                )}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      className="h-[5px] w-[5px] rounded-full bg-[#0D1117]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/*'use client';
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
}*/
