'use client';

import { addNewAddress } from '@/app/actions/user-actions';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getCities, getCountries, getStates } from '@/services/locationService';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AddAddressDialog({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [newAddress, setNewAddress] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    post_code: '',
    street_address: '',
    is_default: false,
  });

  const [openCountry, setOpenCountry] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(
          data.map((country) => ({
            value: country.iso2,
            label: country.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load countries');
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!newAddress.country) {
        setStates([]);
        return;
      }
      try {
        const data = await getStates(newAddress.country);
        setStates(
          data.map((state) => ({
            value: state.iso2,
            label: state.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load states');
      }
    };
    fetchStates();
  }, [newAddress.country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!newAddress.country || !newAddress.province) {
        setCities([]);
        return;
      }
      try {
        const data = await getCities(newAddress.country, newAddress.province);
        setCities(
          data.map((city) => ({
            value: city.name,
            label: city.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load cities');
      }
    };
    fetchCities();
  }, [newAddress.country, newAddress.province]);

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (value) => {
    setNewAddress({
      ...newAddress,
      country: value,
      province: '',
      city: '',
    });
    setOpenCountry(false);
  };

  const handleProvinceSelect = (value) => {
    setNewAddress({
      ...newAddress,
      province: value,
      city: '',
    });
    setOpenProvince(false);
  };

  const handleCitySelect = (value) => {
    setNewAddress({
      ...newAddress,
      city: value,
    });
    setOpenCity(false);
    setIsCustomCity(false);
  };

  const handleCustomCityInput = (e) => {
    setNewAddress({
      ...newAddress,
      city: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const result = await addNewAddress(newAddress);

      if (result.success) {
        toast.success('Address added successfully');
        onSave(result.data);
        setIsOpen(false);
        setNewAddress({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          country: '',
          province: '',
          city: '',
          post_code: '',
          street_address: '',
          is_default: false,
        });
      } else {
        toast.error(result.message || 'Failed to add address');
      }
    } catch (error) {
      toast.error('An error occurred while adding the address');
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedCountryLabel = () => {
    const country = countries.find((c) => c.value === newAddress.country);
    return country ? country.label : 'Select country...';
  };

  const getSelectedProvinceLabel = () => {
    if (!newAddress.country) return 'Select province...';
    const province = states.find((p) => p.value === newAddress.province);
    return province ? province.label : 'Select province...';
  };

  const getSelectedCityLabel = () => {
    if (!newAddress.province) return 'Select city...';
    const city = cities.find((c) => c.value === newAddress.city);
    return city ? city.label : 'Select city...';
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="main-button-black rounded-[10px] px-6 py-2">
        Add New Address
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-50 max-h-[90vh] w-[calc(100%-40px)] overflow-y-auto rounded-lg bg-white p-6 md:w-1/2">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Add New Address</h2>
              <p className="mt-1 text-gray-500">
                Fill in your address details below. All fields marked with * are required.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ['First Name', 'first_name'],
                ['Last Name', 'last_name'],
                ['Email', 'email'],
                ['Phone', 'phone'],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="input-label" htmlFor={name}>
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    value={newAddress[name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${label}`}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
              ))}

              {/* Country Combobox */}
              <div>
                <Label className="input-label">Country</Label>
                <Popover open={openCountry} onOpenChange={setOpenCountry}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCountry}
                      className="input-field w-full justify-between"
                    >
                      {getSelectedCountryLabel()}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="max-h-[200px] overflow-y-auto">
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.label}
                              onSelect={() => handleCountrySelect(country.value)}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  newAddress.country === country.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Province Combobox */}
              <div>
                <Label className="input-label">Province</Label>
                <Popover open={openProvince} onOpenChange={setOpenProvince}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProvince}
                      className="input-field w-full justify-between"
                      disabled={!newAddress.country}
                    >
                      {getSelectedProvinceLabel()}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="max-h-[200px] overflow-y-auto">
                      <CommandInput placeholder="Search province..." />
                      <CommandList>
                        <CommandEmpty>No province found.</CommandEmpty>
                        <CommandGroup>
                          {states.map((province) => (
                            <CommandItem
                              key={province.value}
                              value={province.label}
                              onSelect={() => handleProvinceSelect(province.value)}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  newAddress.province === province.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {province.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* City Combobox */}
              <div>
                <Label className="input-label">City</Label>
                {cities.length > 0 ? (
                  <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCity}
                        className="input-field w-full justify-between"
                        disabled={!newAddress.province}
                      >
                        {getSelectedCityLabel()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="max-h-[200px] overflow-y-auto">
                        <CommandInput placeholder="Search city..." />
                        <CommandList>
                          <CommandEmpty>
                            <div className="p-2">
                              <p className="mb-2 text-sm text-gray-500">No cities found in the list.</p>
                              <button
                                className="text-sm text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                  setIsCustomCity(true);
                                  setOpenCity(false);
                                }}
                              >
                                Enter custom city name
                              </button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city.value}
                                value={city.label}
                                onSelect={() => handleCitySelect(city.value)}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    newAddress.city === city.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {city.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input
                    id="city"
                    name="city"
                    value={newAddress.city}
                    onChange={handleCustomCityInput}
                    placeholder="Enter city name"
                    className="input-field"
                    disabled={!newAddress.province || isLoading}
                  />
                )}
              </div>

              {[
                ['Postal Code', 'post_code'],
                ['Street', 'street_address'],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="input-label" htmlFor={name}>
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    value={newAddress[name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${label}`}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                className="main-button-black inline-flex w-full items-center justify-center rounded-[10px] px-6 py-2"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
