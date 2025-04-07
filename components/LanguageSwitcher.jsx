"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const options = [
  { country: 'English', code: 'en' },
  { country: 'Japanese', code: 'jp' },
  { country: 'Deutsch', code: 'de' },
  { country: 'Français', code: 'fr' },
  { country: 'Español', code: 'es' },
  { country: 'Русский', code: 'ru' },
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const currentLang = segments[0] || "en";
  const urlSegments = segments.slice(1);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent hover:bg-white/10 cursor-pointer font-sans font-bold text-[16px] hover:text-white w-full h-full md:w-[120px] md:h-[42px] flex items-center justify-between gap-[10px] px-4"
        >
          <span className="flex items-center gap-2">
            <Globe />
            {currentLang.toUpperCase()}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px] flex flex-col gap-[5px]">
        {options.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}/${urlSegments.join("/")}`}
          >
            <button
              lang={lang.code}
              onMouseDown={(e) => e.preventDefault()}
              className={`w-full px-4 py-2 text-umbra-100 rounded text-left text-[17px] hover:bg-stardust capitalize font-sans ${
                currentLang === lang.code
                  ? "bg-stardust text-primary"
                  : "text-secondary"
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
