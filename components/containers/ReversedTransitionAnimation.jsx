'use client';

const ReversedTransitionAnimation = () => {
  // Static widths for each div - these are the final widths from the original animation
  const getDivWidth = (index) => {
    const baseWidths = [6.94, 23.61, 44.44, 61.81, 79.16, 93.05, 100, 100];
    return baseWidths[index];
  };

  // Get gradient colors (same as original but reversed order)
  const getGradientColors = (index, isLeft = true) => {
    const direction = isLeft ? '90deg' : '270deg';

    // Original gradients for each div - but we'll reverse the order
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
    <div className="flex h-[200px] w-full items-center justify-center overflow-hidden lg:h-[800px]">
      <div className="flex h-full w-full">
        {/* Left Column - Reversed order (bottom to top becomes top to bottom) */}
        <div className="flex h-full w-1/2 flex-col items-start justify-start">
          {[7, 6, 5, 4, 3, 2, 1, 0].map((originalIndex, displayIndex) => (
            <div
              key={`left-${displayIndex}`}
              className="h-[25px] transition-all duration-500 ease-out lg:h-[100px]"
              style={{
                width: `${getDivWidth(originalIndex)}%`,
                background: getGradientColors(originalIndex, true),
              }}
            />
          ))}
        </div>

        {/* Right Column - Reversed order (bottom to top becomes top to bottom) */}
        <div className="flex h-full w-1/2 flex-col items-end justify-start">
          {[7, 6, 5, 4, 3, 2, 1, 0].map((originalIndex, displayIndex) => (
            <div
              key={`right-${displayIndex}`}
              className="h-[25px] transition-all duration-500 ease-out lg:h-[100px]"
              style={{
                width: `${getDivWidth(originalIndex)}%`,
                background: getGradientColors(originalIndex, false),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReversedTransitionAnimation;
