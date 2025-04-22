'use client';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const MenuButton = ({ setMenuOpen, isSpecialPath }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setMenuOpen(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isRotating ? -45 : 0 }}
        transition={{ duration: 0.5 }}
        className={`transition-colors duration-300 ${
          isSpecialPath ? 'hover:text-umbra-40 text-umbra-100' : 'hover:text-white-40 text-white'
        }`}
      >
        <PlusIcon width={27} height={27} />
      </motion.div>
    </div>
  );
};

export default MenuButton;
