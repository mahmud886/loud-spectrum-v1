import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const BillingAddress = () => {
  return (
    <form className="mx-auto w-full space-y-6">
      <h2 className="text-umbra-100 font-sans text-[24px] font-normal">Shipping Address</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">First Name*</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Last Name*</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Phone*</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Country*</label>
          <Select required>
            <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="text-umbra-100 font-mono text-[16px]">
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="india">India</SelectItem>
              {/* Add more as needed */}
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Province*</label>
          <input
            type="text"
            placeholder="Enter your province"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">City*</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Postal / ZIP Code*</label>
          <input
            type="text"
            placeholder="Enter ZIP or postal code"
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Street Address*</label>
        <Textarea
          rows="3"
          placeholder="Enter your street address"
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          required
        ></Textarea>
      </div>
    </form>
  );
};

export default BillingAddress;
