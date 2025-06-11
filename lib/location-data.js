export const countries = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'australia', label: 'Australia' },
  { value: 'india', label: 'India' },
];

export const provincesByCountry = {
  usa: [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
    { value: 'il', label: 'Illinois' },
  ],
  canada: [
    { value: 'on', label: 'Ontario' },
    { value: 'qc', label: 'Quebec' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'ab', label: 'Alberta' },
  ],
  uk: [
    { value: 'eng', label: 'England' },
    { value: 'sct', label: 'Scotland' },
    { value: 'wls', label: 'Wales' },
    { value: 'nir', label: 'Northern Ireland' },
  ],
  australia: [
    { value: 'nsw', label: 'New South Wales' },
    { value: 'vic', label: 'Victoria' },
    { value: 'qld', label: 'Queensland' },
    { value: 'wa', label: 'Western Australia' },
  ],
  india: [
    { value: 'mh', label: 'Maharashtra' },
    { value: 'ka', label: 'Karnataka' },
    { value: 'tn', label: 'Tamil Nadu' },
    { value: 'dl', label: 'Delhi' },
  ],
};

export const citiesByProvince = {
  // USA
  ca: [
    { value: 'la', label: 'Los Angeles' },
    { value: 'sf', label: 'San Francisco' },
    { value: 'sd', label: 'San Diego' },
  ],
  ny: [
    { value: 'nyc', label: 'New York City' },
    { value: 'buf', label: 'Buffalo' },
    { value: 'alb', label: 'Albany' },
  ],
  // Canada
  on: [
    { value: 'tor', label: 'Toronto' },
    { value: 'ott', label: 'Ottawa' },
    { value: 'ham', label: 'Hamilton' },
  ],
  qc: [
    { value: 'mon', label: 'Montreal' },
    { value: 'qcc', label: 'Quebec City' },
  ],
  // UK
  eng: [
    { value: 'lon', label: 'London' },
    { value: 'man', label: 'Manchester' },
    { value: 'bir', label: 'Birmingham' },
  ],
  // Australia
  nsw: [
    { value: 'syd', label: 'Sydney' },
    { value: 'new', label: 'Newcastle' },
  ],
  // India
  mh: [
    { value: 'mum', label: 'Mumbai' },
    { value: 'pun', label: 'Pune' },
  ],
};
