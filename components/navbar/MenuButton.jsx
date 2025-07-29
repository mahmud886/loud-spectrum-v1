'use client';
import { motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const MenuButton = ({ setMenuOpen, isSpecialPath }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setMenuOpen(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer" onClick={handleClick}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isRotating ? -45 : 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-full border p-1 transition-colors duration-300 ${
              isSpecialPath ? 'hover:text-umbra-40 text-umbra-100' : 'hover:text-white-40 text-white'
            }`}
          >
            <MenuIcon width={20} height={20} />
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open Menu</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default MenuButton;
