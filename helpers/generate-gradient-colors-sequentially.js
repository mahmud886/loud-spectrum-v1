// export const generateGradientColorsSequentially = (length) => {
//   const gradientColors = [
//     '#101820',
//     '#00AF66',
//     '#00AF66E5',
//     '#00AF66B2',
//     '#00AF6699',
//     '#00AF6666',
//     '#00AF6633',
//     '#DDDAE833',
//     '#DDDAE880',
//     '#DDDAE8B2',
//     '#DDDAE8CC',
//     '#DDDAE8',
//     '#B2A9F5',
//     '#DDDAE8',
//   ];
//   const colors = [];
//   for (let i = 0; i < length; i++) {
//     colors.push(gradientColors[i % gradientColors.length]);
//   }
//
//   return colors;
// };

export const generateGradientColorsSequentially = (length) => {
  const solidColors = [
    '#00AF66E5',
    '#00AF66B2',
    '#00AF6699',
    '#00AF6666',
    '#00AF6633',
    '#DDDAE833',
    '#DDDAE880',
    '#DDDAE8B2',
    '#DDDAE8CC',
    '#DDDAE8',
    '#DDDAE8',
  ];

  const colors = [];

  for (let i = 0; i < length; i++) {
    if (i < 1) {
      colors.push('url(#firstTwoGradient)');
    } else {
      colors.push(solidColors[(i - 1) % solidColors.length]);
    }
  }

  return colors;
};
