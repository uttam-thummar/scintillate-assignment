import { Rubik, Press_Start_2P } from 'next/font/google';

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
});

const press_start_2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-press-start-2p',
});

const variables = [rubik, press_start_2P].map((f) => f.variable).join(' ');

const fonts = {
    rubik,
    variables
}

export { fonts };