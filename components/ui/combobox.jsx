'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ComboBox = ({
  options = [],
  value,
  onValueChange,
  placeholder = 'Select...',
  className,
  triggerClassName,
  contentClassName,
  searchable = true,
  emptyMessage = 'No results found',
  required = false,
  name,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus input when opened
      if (inputRef.current && searchable) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, searchable]);

  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex];
      if (item) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (optionValue) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].value);
      } else if (filteredOptions.length === 1 && searchTerm) {
        handleSelect(filteredOptions[0].value);
      } else if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }
    } else if (e.key === 'Tab') {
      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setHighlightedIndex(-1);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onValueChange?.('');
    setSearchTerm('');
    setHighlightedIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const displayValue = isOpen && searchable ? searchTerm : selectedOption?.label || '';

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value || ''} required={required && !value} />

      {/* Trigger/Input */}
      <div
        className={cn(
          'bg-umbra-5 placeholder:text-umbra-60 hover:bg-umbra-10 text-umbra-100 relative flex min-h-[48px] w-full cursor-pointer items-center rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal transition-colors',
          isOpen && 'ring-ring/50 border-ring ring-[3px]',
          disabled && 'cursor-not-allowed opacity-50',
          triggerClassName,
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="placeholder:text-umbra-100/50 w-full bg-transparent outline-none"
            placeholder={placeholder}
            autoComplete="off"
          />
        ) : (
          <span className={cn('flex-1 truncate text-left', !selectedOption && 'text-umbra-100/50')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        )}

        <div className="flex items-center gap-2">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-umbra-100/50 hover:text-umbra-100 transition-colors"
              tabIndex={-1}
            >
              <X size={16} />
            </button>
          )}
          <ChevronDownIcon className={cn('text-umbra-100/50 size-4 transition-transform', isOpen && 'rotate-180')} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'bg-popover text-popover-foreground absolute z-50 mt-1 max-h-[300px] w-full overflow-y-auto rounded-md border shadow-lg',
            contentClassName,
          )}
          role="listbox"
        >
          <ul ref={listRef} className="p-1">
            {filteredOptions.length === 0 ? (
              <li className="text-muted-foreground px-2 py-1.5 text-sm">{emptyMessage}</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={cn(
                    'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm px-2 py-1.5 text-[17px] transition-colors outline-none',
                    value === option.value && 'bg-accent text-accent-foreground',
                    highlightedIndex === index && 'bg-accent text-accent-foreground',
                  )}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { ComboBox };
