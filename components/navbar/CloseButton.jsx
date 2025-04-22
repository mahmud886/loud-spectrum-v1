'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

const CloseButton = ({ onClose }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClose?.();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <motion.div initial={{ rotate: 0 }} animate={{ rotate: isRotating ? -90 : 0 }} transition={{ duration: 0.5 }}>
        <X width={27} height={27} className="hover:text-umbra-40 text-[#191919]" />
      </motion.div>
    </div>
  );
};

export default CloseButton;
