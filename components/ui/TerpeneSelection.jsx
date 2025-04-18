import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TerpeneSelection = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="min-h-[42px] max-w-[280px] min-w-[156px]">
          <SelectValue placeholder="Select a Profile" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Terpene Chart</SelectLabel>
            <SelectItem value="1">Gorilla Glue</SelectItem>
            <SelectItem value="2">Silver Haze</SelectItem>
            <SelectItem value="3">Bubba Kush</SelectItem>
            <SelectItem value="4">Granddaddy Purple</SelectItem>
            <SelectItem value="5">OG Kush</SelectItem>
            <SelectItem value="7">Blue Dream</SelectItem>
            <SelectItem value="8">Trainwreck</SelectItem>
            <SelectItem value="9">Green Crack</SelectItem>
            <SelectItem value="10">Lemon Skunk</SelectItem>
            <SelectItem value="11">Skywalker OG</SelectItem>
            <SelectItem value="12">The Original Z</SelectItem>
            <SelectItem value="13">Sour Diesel</SelectItem>
            <SelectItem value="14">Maui Wowie</SelectItem>
            <SelectItem value="15">Cheese</SelectItem>
            <SelectItem value="16">White Widow</SelectItem>
            <SelectItem value="17">GSC</SelectItem>
            <SelectItem value="18">Agent Orange</SelectItem>
            <SelectItem value="19">Jack Herer</SelectItem>
            <SelectItem value="20">AK-47</SelectItem>
            <SelectItem value="21">Gelato</SelectItem>
            <SelectItem value="22">Durban Poison</SelectItem>
            <SelectItem value="23">Tangerine Dream</SelectItem>
            <SelectItem value="24">Platinum Kush</SelectItem>
            <SelectItem value="25">Northern Lights</SelectItem>
            <SelectItem value="26">ACDC</SelectItem>
            <SelectItem value="27">Banana Express</SelectItem>
            <SelectItem value="28">Berry Blast</SelectItem>
            <SelectItem value="29">Biscotti</SelectItem>
            <SelectItem value="30">Birthday Cake</SelectItem>
            <SelectItem value="31">Blackberry Kush (BBK)</SelectItem>
            <SelectItem value="32">Blueberry OG</SelectItem>
            <SelectItem value="33">Bubble Gum Glue</SelectItem>
            <SelectItem value="34">Bull Wings</SelectItem>
            <SelectItem value="35">Pink Champagne</SelectItem>
            <SelectItem value="36">Cherry Burst</SelectItem>
            <SelectItem value="37">Chocolate Milk Cookies</SelectItem>
            <SelectItem value="38">Cotton Candy</SelectItem>
            <SelectItem value="39">Cucumber Water</SelectItem>
            <SelectItem value="40">Dutch Treat</SelectItem>
            <SelectItem value="41">Grape Ape Candy</SelectItem>
            <SelectItem value="42">Grapefruit OG</SelectItem>
            <SelectItem value="43">Green Apple Jack</SelectItem>
            <SelectItem value="44">Gushers</SelectItem>
            <SelectItem value="45">Harlequin</SelectItem>
            <SelectItem value="46">Lemon Lime</SelectItem>
            <SelectItem value="47">Mango OG</SelectItem>
            <SelectItem value="48">Matcha Green Tea</SelectItem>
            <SelectItem value="49">Mocha Express</SelectItem>
            <SelectItem value="50">Passion Fruit OG</SelectItem>
            <SelectItem value="51">Peach Dream</SelectItem>
            <SelectItem value="52">Pineapple Express</SelectItem>
            <SelectItem value="53">Raspberry Dream</SelectItem>
            <SelectItem value="54">Rose Dream</SelectItem>
            <SelectItem value="55">Rum & Cola</SelectItem>
            <SelectItem value="56">SinMint</SelectItem>
            <SelectItem value="57">Strawberry Banana</SelectItem>
            <SelectItem value="58">Strawberry Diesel</SelectItem>
            <SelectItem value="59">Tropical OG</SelectItem>
            <SelectItem value="60">True OG</SelectItem>
            <SelectItem value="61">Watermelon OG</SelectItem>
            <SelectItem value="62">Wild Mountain Pomegranate</SelectItem>
            <SelectItem value="63">Cherry Pie</SelectItem>
            <SelectItem value="64">Peanut Butter Breath</SelectItem>
            <SelectItem value="65">Mac 1</SelectItem>
            <SelectItem value="66">Forbidden Fruit</SelectItem>
            <SelectItem value="67">Fruity Pebbles OG</SelectItem>
            <SelectItem value="68">Fuji Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TerpeneSelection;
