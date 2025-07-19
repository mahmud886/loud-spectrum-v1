'use client';
const TransitionAnimation = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Left Column */}
        <div className="flex h-full w-1/2 flex-col items-start justify-start">
          <div className="h-1/7 w-[6.94%] bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[23.61%] bg-[linear-gradient(90deg,_#101820_25.53%,_#0077C8_47.13%,_#C0AEE7_77.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[44.44%] bg-[linear-gradient(90deg,_#101820_30.53%,_#0077C8_52.13%,_#C0AEE7_82.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[61.81%] bg-[linear-gradient(90deg,_#101820_35.53%,_#0077C8_57.13%,_#C0AEE7_87.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[79.16%] bg-[linear-gradient(90deg,_#101820_40.53%,_#0077C8_62.13%,_#C0AEE7_92.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[93.05%] bg-[linear-gradient(90deg,_#101820_45.53%,_#0077C8_67.13%,_#C0AEE7_97.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[100%] bg-[linear-gradient(90deg,_#101820_50.53%,_#0077C8_74.13%,_#C0AEE7_107.27%,_#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[100%] bg-[linear-gradient(90deg,_#101820_57.53%,_#0077C8_107.64%)]"></div>
        </div>

        {/* Right Column */}
        <div className="flex h-full w-1/2 flex-col items-end justify-start">
          <div className="h-1/7 w-[6.94%] bg-[linear-gradient(270deg,#101820_21.53%,#0077C8_44.13%,#C0AEE7_74.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[23.61%] bg-[linear-gradient(270deg,#101820_25.53%,#0077C8_47.13%,#C0AEE7_77.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[44.44%] bg-[linear-gradient(270deg,#101820_30.53%,#0077C8_52.13%,#C0AEE7_82.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[61.81%] bg-[linear-gradient(270deg,#101820_35.53%,#0077C8_57.13%,#C0AEE7_87.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[79.16%] bg-[linear-gradient(270deg,#101820_40.53%,#0077C8_62.13%,#C0AEE7_92.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[93.05%] bg-[linear-gradient(270deg,#101820_45.53%,#0077C8_67.13%,#C0AEE7_97.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[100%] bg-[linear-gradient(270deg,#101820_50.53%,#0077C8_74.13%,#C0AEE7_107.27%,#DDDAE8_107.64%)]"></div>
          <div className="h-1/7 w-[100%] bg-[linear-gradient(270deg,#101820_57.53%,#0077C8_107.64%)]"></div>
        </div>
      </div>
    </div>
  );
};

export default TransitionAnimation;
