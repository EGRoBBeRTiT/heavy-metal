import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// Font files can be colocated inside of `pages`
export const cloisterBlack = localFont({ src: 'fonts/CloisterBlack.ttf' });
export const kalnia = localFont({ src: 'fonts/Kalnia.ttf' });
export const playfair = localFont({ src: 'fonts/Playfair.ttf' });
export const inter = Inter({ subsets: ['latin'] });
