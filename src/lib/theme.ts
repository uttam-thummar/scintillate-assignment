import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    sm: '320px',
    md: '481px',
    lg: '768px',
    xl: '1025px',
    '2xl': '1201px',
}

const colors = {
    dark_sienna: {
        100: '#d7cfcf',
        200: '#af9f9f',
        300: '#887070',
        400: '#604040',
        500: '#381010',
        600: '#2d0d0d',
        700: '#220a0a',
        800: '#160606',
        900: '#0b0303'
    },
    coffee: {
        100: '#ede5d9',
        200: '#dbccb4',
        300: '#cab28e',
        400: '#b89969',
        500: '#a67f43',
        600: '#856636',
        700: '#644c28',
        800: '#42331b',
        900: '#21190d',
    }
}

const borderRadius = {
    radii: {
        none: '0',
        sm: '4px',
        base: '7px',
        md: '13px',
        lg: '18px',
        xl: '25px',
        '2xl': '33px',
        '3xl': '50px',
        full: '9999px',
    },
}

const components = {
    Button: {
        defaultProps: {
            colorScheme: 'dark_sienna'
        }
    }
}

const theme = extendTheme({ breakpoints, colors, ...borderRadius, components });

export { theme };