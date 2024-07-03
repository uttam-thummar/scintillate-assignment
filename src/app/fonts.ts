import { Rubik } from 'next/font/google';

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
});

const variables = [rubik].map((f) => f.variable).join(' ');

const fonts = {
    rubik,
    variables
}

export { fonts };