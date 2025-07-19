'use client';
import { useEffect, useRef, useState } from 'react';

const TransitionAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on how much of the component is visible
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate width for each div based on scroll progress
  const getDivWidth = (index, isLeft = true) => {
    const baseWidths = [6.94, 23.61, 44.44, 61.81, 79.16, 93.05, 97.05, 100];
    const baseWidth = baseWidths[index];

    // Start with 0% width for all divs except the 8th (index 7)
    let initialWidth = index === 7 ? 10 : 0;

    // Calculate the target width based on scroll progress
    const targetWidth = baseWidth;

    // Make all divs animate 1 time faster
    const adjustedProgress = Math.min(1, scrollProgress * 2);

    // Smooth transition from initial to target width
    const currentWidth = initialWidth + (targetWidth - initialWidth) * adjustedProgress;

    return Math.max(0, Math.min(100, currentWidth));
  };

  // Get gradient colors (always at 100% - no transition)
  const getGradientColors = (index, isLeft = true) => {
    const direction = isLeft ? '90deg' : '270deg';

    // Original gradients for each div (always at 100%)
    const gradients = [
      { stops: ['21.53%', '44.13%', '74.27%', '107.64%'] },
      { stops: ['25.53%', '47.13%', '77.27%', '107.64%'] },
      { stops: ['30.53%', '52.13%', '82.27%', '107.64%'] },
      { stops: ['35.53%', '57.13%', '87.27%', '107.64%'] },
      { stops: ['40.53%', '62.13%', '92.27%', '107.64%'] },
      { stops: ['45.53%', '67.13%', '97.27%', '107.64%'] },
      { stops: ['50.53%', '74.13%', '107.27%', '107.64%'] },
      { stops: ['57.53%', '107.64%'] }, // Last div has only 2 colors
    ];

    const gradient = gradients[index];
    const colors = ['#101820', '#0077C8', '#C0AEE7', '#DDDAE8'];

    if (index === 7) {
      // Last div has only 2 colors
      return `linear-gradient(${direction}, ${colors[0]} ${gradient.stops[0]}, ${colors[1]} ${gradient.stops[1]})`;
    } else {
      // Other divs have 4 colors
      return `linear-gradient(${direction}, ${colors[0]} ${gradient.stops[0]}, ${colors[1]} ${gradient.stops[1]}, ${colors[2]} ${gradient.stops[2]}, ${colors[3]} ${gradient.stops[3]})`;
    }
  };

  return (
    <div ref={containerRef} className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Left Column */}
        <div className="flex h-full w-1/2 flex-col items-start justify-start">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div
              key={`left-${index}`}
              className="h-1/7 transition-all duration-500 ease-out"
              style={{
                width: `${getDivWidth(index, true)}%`,
                background: getGradientColors(index, true),
              }}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex h-full w-1/2 flex-col items-end justify-start">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div
              key={`right-${index}`}
              className="h-1/7 transition-all duration-500 ease-out"
              style={{
                width: `${getDivWidth(index, false)}%`,
                background: getGradientColors(index, false),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransitionAnimation;

// 'use client';
// const TransitionAnimation = () => {
//   return (
//     <div className="flex h-screen w-full items-center justify-center overflow-hidden">
//       <div className="flex h-screen w-full">
//         {/* Left Column */}
//         <div className="flex h-full w-1/2 flex-col items-start justify-start">
//           <div className="h-1/7 w-[6.94%] bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[23.61%] bg-[linear-gradient(90deg,_#101820_25.53%,_#0077C8_47.13%,_#C0AEE7_77.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[44.44%] bg-[linear-gradient(90deg,_#101820_30.53%,_#0077C8_52.13%,_#C0AEE7_82.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[61.81%] bg-[linear-gradient(90deg,_#101820_35.53%,_#0077C8_57.13%,_#C0AEE7_87.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[79.16%] bg-[linear-gradient(90deg,_#101820_40.53%,_#0077C8_62.13%,_#C0AEE7_92.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[93.05%] bg-[linear-gradient(90deg,_#101820_45.53%,_#0077C8_67.13%,_#C0AEE7_97.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[100%] bg-[linear-gradient(90deg,_#101820_50.53%,_#0077C8_74.13%,_#C0AEE7_107.27%,_#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[100%] bg-[linear-gradient(90deg,_#101820_57.53%,_#0077C8_107.64%)]"></div>
//         </div>

//         {/* Right Column */}
//         <div className="flex h-full w-1/2 flex-col items-end justify-start">
//           <div className="h-1/7 w-[6.94%] bg-[linear-gradient(270deg,#101820_21.53%,#0077C8_44.13%,#C0AEE7_74.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[23.61%] bg-[linear-gradient(270deg,#101820_25.53%,#0077C8_47.13%,#C0AEE7_77.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[44.44%] bg-[linear-gradient(270deg,#101820_30.53%,#0077C8_52.13%,#C0AEE7_82.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[61.81%] bg-[linear-gradient(270deg,#101820_35.53%,#0077C8_57.13%,#C0AEE7_87.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[79.16%] bg-[linear-gradient(270deg,#101820_40.53%,#0077C8_62.13%,#C0AEE7_92.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[93.05%] bg-[linear-gradient(270deg,#101820_45.53%,#0077C8_67.13%,#C0AEE7_97.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[100%] bg-[linear-gradient(270deg,#101820_50.53%,#0077C8_74.13%,#C0AEE7_107.27%,#DDDAE8_107.64%)]"></div>
//           <div className="h-1/7 w-[100%] bg-[linear-gradient(270deg,#101820_57.53%,#0077C8_107.64%)]"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransitionAnimation;
