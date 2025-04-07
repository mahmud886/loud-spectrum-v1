export default function ColorsPage() {
  return (
    <div className="container mx-auto mt-2">
      <div className="flex flex-col">
        <h2 className="py-[50px] text-[32px] font-bold">Main colors</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Umbra</span> <span>#101820</span>
            </p>
            <div className="bg-umbra-100 h-[415px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Atmosphere</span> <span>#0077C8</span>
            </p>
            <div className="bg-atmosphere h-[415px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Aurora</span> <span>#B2A9F5</span>
            </p>
            <div className="bg-aurora h-[415px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Stardust</span> <span>#DDDAE8</span>
            </p>
            <div className="bg-stardust h-[415px] rounded-[10px]"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <div className="bg-gradient-four-colors h-[415px] rounded-[10px]"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <div className="main-gradient h-[415px] rounded-[10px]"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="py-[50px] text-[32px] font-bold">Product line colors (secondary)</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Alive</span> <span>#00AF66</span>
            </p>
            <div className="bg-alive h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Sweet</span> <span>#F33CC8</span>
            </p>
            <div className="bg-sweet h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Dank</span> <span>#BFB800</span>
            </p>
            <div className="bg-dank h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Classic</span> <span>#6435C8</span>
            </p>
            <div className="bg-classic h-[215px] rounded-[10px]"></div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <div className="bg-gradient-alive h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="bg-gradient-sweet h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="bg-gradient-dank h-[215px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="bg-gradient-classic h-[215px] rounded-[10px]"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="py-[50px] text-[32px] font-bold">Neutrals</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Umbra</span> <span>#101820</span>
            </p>
            <div className="bg-umbra-100 h-[150px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>60%</span>
            </p>
            <div className="bg-umbra-60 h-[150px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>40%</span>
            </p>
            <div className="bg-umbra-40 h-[150px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>10%</span>
            </p>
            <div className="bg-umbra-10 h-[150px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>5%</span>
            </p>
            <div className="bg-umbra-5 h-[150px] rounded-[10px]"></div>
          </div>
        </div>

        <div className="bg-umbra-100 mt-2 flex items-center justify-center gap-2 p-2">
          <div className="bg-white-100 h-[150px] w-[405px] rounded-[10px]"></div>
          <div className="bg-white-40 h-[150px] w-[405px] rounded-[10px]"></div>
          <div className="bg-white-20 h-[150px] w-[405px] rounded-[10px]"></div>
          <div className="bg-white-10 h-[150px] w-[405px] rounded-[10px]"></div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="py-[50px] text-[32px] font-bold">Systems</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Success</span> <span>#29AE47</span>
            </p>
            <div className="bg-success h-[60px] rounded-[10px]"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="inline-flex gap-2 pb-5">
              <span>Error</span> <span>#29AE47</span>
            </p>
            <div className="bg-error h-[60px] rounded-[10px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
