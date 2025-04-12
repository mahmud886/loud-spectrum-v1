import localFont from 'next/font/local';

const adelphiSans = localFont({
  src: '../public/assets/fonts/AdelphiPEVF-All.ttf',
  variable: '--font-sans',
  display: 'swap',
});


const neueHaasUnicaW1GMono = localFont({
  src: [
    // {
//       path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Thin.ttf',
//       weight: '100',
//       style: 'normal',
//     },
//     {
//       path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Light.ttf',
//       weight: '300',
//       style: 'normal',
//     },
    {
      path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NeueHaasUnicaW1G/NeueHaasUnicaW1G-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});


export {adelphiSans, neueHaasUnicaW1GMono}
