'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const options = [
  { country: 'English', code: 'en' },
  { country: 'Japanese', code: 'ja' },
  { country: 'Deutsch', code: 'de' },
  { country: 'Français', code: 'fr' },
  { country: 'Español', code: 'es' },
  { country: 'Русский', code: 'ru' },
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const segments = pathname.split('/').filter(Boolean);
  const currentLang = segments[0] || 'en';
  const urlSegments = segments.slice(1);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white-20 bg-white-10 hover:bg-white-20 m-[2px] flex h-full w-full cursor-pointer items-center justify-between gap-[10px] border-1 px-4 font-sans text-[16px] font-bold hover:text-white md:h-[42px] md:w-[100px]"
        >
          <span className="flex items-center gap-2">
            <Globe />
            {currentLang.toUpperCase()}
          </span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex w-[160px] flex-col gap-[5px]">
        {options.map((lang) => (
          <Link key={lang.code} href={`/${lang.code}/${urlSegments.join('/')}`}>
            <button
              lang={lang.code}
              onMouseDown={(e) => e.preventDefault()}
              className={`text-umbra-100 hover:bg-stardust w-full rounded px-4 py-2 text-left font-sans text-[17px] capitalize ${
                currentLang === lang.code ? 'bg-stardust text-primary' : 'text-secondary'
              }`}
            >
              {capitalize(lang.country)}
            </button>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
