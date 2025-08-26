import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import terpeneOptions from '@/lib/terpene-chart-data.json';

const TerpeneSelection = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-umbra-5 min-h-12 w-full text-[17px] xl:min-h-[42px] xl:max-w-[280px] xl:min-w-[156px]">
        <SelectValue placeholder="Select a Profile" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="!text-[17px]">Terpene Chart</SelectLabel>
          {terpeneOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TerpeneSelection;

// const terpeneOptions = [
//   { id: '1', label: 'Gorilla Glue' },
//   { id: '2', label: 'Silver Haze' },
//   { id: '3', label: 'Bubba Kush' },
//   { id: '4', label: 'Granddaddy Purple' },
//   { id: '5', label: 'OG Kush' },
//   { id: '7', label: 'Blue Dream' },
//   { id: '8', label: 'Trainwreck' },
//   { id: '9', label: 'Green Crack' },
//   { id: '10', label: 'Lemon Skunk' },
//   { id: '11', label: 'Skywalker OG' },
//   { id: '12', label: 'The Original Z' },
//   { id: '13', label: 'Sour Diesel' },
//   { id: '14', label: 'Maui Wowie' },
//   { id: '15', label: 'Cheese' },
//   { id: '16', label: 'White Widow' },
//   { id: '17', label: 'GSC' },
//   { id: '18', label: 'Agent Orange' },
//   { id: '19', label: 'Jack Herer' },
//   { id: '20', label: 'AK-47' },
//   { id: '21', label: 'Gelato' },
//   { id: '22', label: 'Durban Poison' },
//   { id: '23', label: 'Tangerine Dream' },
//   { id: '24', label: 'Platinum Kush' },
//   { id: '25', label: 'Northern Lights' },
//   { id: '26', label: 'ACDC' },
//   { id: '27', label: 'Banana Express' },
//   { id: '28', label: 'Berry Blast' },
//   { id: '29', label: 'Biscotti' },
//   { id: '30', label: 'Birthday Cake' },
//   { id: '31', label: 'Blackberry Kush (BBK)' },
//   { id: '32', label: 'Blueberry OG' },
//   { id: '33', label: 'Bubble Gum Glue' },
//   { id: '34', label: 'Bull Wings' },
//   { id: '35', label: 'Pink Champagne' },
//   { id: '36', label: 'Cherry Burst' },
//   { id: '37', label: 'Chocolate Milk Cookies' },
//   { id: '38', label: 'Cotton Candy' },
//   { id: '39', label: 'Cucumber Water' },
//   { id: '40', label: 'Dutch Treat' },
//   { id: '41', label: 'Grape Ape Candy' },
//   { id: '42', label: 'Grapefruit OG' },
//   { id: '43', label: 'Green Apple Jack' },
//   { id: '44', label: 'Gushers' },
//   { id: '45', label: 'Harlequin' },
//   { id: '46', label: 'Lemon Lime' },
//   { id: '47', label: 'Mango OG' },
//   { id: '48', label: 'Matcha Green Tea' },
//   { id: '49', label: 'Mocha Express' },
//   { id: '50', label: 'Passion Fruit OG' },
//   { id: '51', label: 'Peach Dream' },
//   { id: '52', label: 'Pineapple Express' },
//   { id: '53', label: 'Raspberry Dream' },
//   { id: '54', label: 'Rose Dream' },
//   { id: '55', label: 'Rum & Cola' },
//   { id: '56', label: 'SinMint' },
//   { id: '57', label: 'Strawberry Banana' },
//   { id: '58', label: 'Strawberry Diesel' },
//   { id: '59', label: 'Tropical OG' },
//   { id: '60', label: 'True OG' },
//   { id: '61', label: 'Watermelon OG' },
//   { id: '62', label: 'Wild Mountain Pomegranate' },
//   { id: '63', label: 'Cherry Pie' },
//   { id: '64', label: 'Peanut Butter Breath' },
//   { id: '65', label: 'Mac 1' },
//   { id: '66', label: 'Forbidden Fruit' },
//   { id: '67', label: 'Fruity Pebbles OG' },
//   { id: '68', label: 'Fuji Apple' },
// ];
