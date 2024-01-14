import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';

// Font files can be colocated inside of `pages`
export const cloisterBlack = localFont({ src: 'fonts/CloisterBlack.ttf' });
export const kalnia = localFont({ src: 'fonts/Kalnia.ttf' });
export const playfair = localFont({ src: 'fonts/Playfair.ttf' });
export const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
});
