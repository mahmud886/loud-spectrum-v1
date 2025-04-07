import ArrowRight from '@/components/svgs/arrow-right';
import { Button } from '@/components/ui/button';

export default function ColorsPage() {
  return (
    <div className="container mx-auto mt-2">
      <div className="flex flex-col">
        <h2 className="py-[50px] text-[32px] font-bold">Button rules</h2>
        <div className=" flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span className="text-umbra-100">Special Button</span>
            </p>
            <button className="special-button h-[42px] w-[128px] rounded-full cursor-grab">
              Wholesale
              <ArrowRight />
            </button>
          </div>

          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span className="text-umbra-100">Main Button</span>
            </p>
            <button className="main-button-black h-[42px] w-[128px] rounded-full cursor-grab">
              Wholesale
            </button>
          </div>

          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span className="text-umbra-100">Main Button white</span>
            </p>
            <button
              className="main-button-white h-[42px] w-[128px] rounded-full cursor-grab">
              Wholesale
            </button>
          </div>


          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span className="text-umbra-100">Outline Button</span>
            </p>
            <button  className="outline-button-white h-[42px] w-[128px] rounded-full cursor-grab">
              Wholesale
            </button>
          </div>

          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span className="text-umbra-100">Outline Button</span>
            </p>
            <button  className="outline-button-black h-[42px] w-[128px] rounded-full cursor-grab">
              Wholesale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
