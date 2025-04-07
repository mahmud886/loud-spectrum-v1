import localFont from 'next/font/local';

const adelphiSans = localFont({
  src: '../public/assets/fonts/AdelphiPEVF.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const neueHaasUnicaW1GMono = localFont({
  src: '../public/assets/fonts/NeueHaasUnicaW1G.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export {adelphiSans, neueHaasUnicaW1GMono}
