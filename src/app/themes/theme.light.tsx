// themes/theme.light.ts
'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

// 🔹 Cores base
const PRIMARY = {
    50: '#e4fff7',
    100: '#beffec',
    200: '#97ffe0',
    300: '#71ffd5',
    400: '#4bffc9',
    500: '#25ffbe',
    600: '#1fd29d',
    700: '#18a67c',
    800: '#12795a',
    900: '#0b4d39',
    main: '#25ffbe',
    contrastText: '#000000', // Texto escuro em fundos claros
};

const SECONDARY = {
    50: '#e6efff',
    100: '#c3d8fe',
    200: '#a0c1fd',
    300: '#7daafc',
    400: '#5a93fc',
    500: '#377cfb',
    600: '#2d66cf',
    700: '#2451a3',
    800: '#1a3b77',
    900: '#11254b',
    main: '#377cfb',
    contrastText: '#ffffff',
};

const SUCCESS = {
    50: '#e2f9f2',
    100: '#b9efdf',
    200: '#91e6cd',
    300: '#68ddba',
    400: '#40d4a8',
    500: '#17cb95',
    600: '#13a77b',
    700: '#0f8461',
    800: '#0b6047',
    900: '#073d2d',
    main: '#17cb95',
    contrastText: '#ffffff',
};

const WARNING = {
    50: '#fffbea',
    100: '#fff5cd',
    200: '#ffefb0',
    300: '#ffea92',
    400: '#ffe475',
    500: '#ffde58',
    600: '#d2b749',
    700: '#a69039',
    800: '#79692a',
    900: '#4d431a',
    main: '#ffde58',
    contrastText: '#000000',
};

const ERROR = {
    50: '#ffe5e5',
    100: '#ffc1c1',
    200: '#ff9d9d',
    300: '#ff7979',
    400: '#ff5555',
    500: '#ff3131',
    600: '#d22828',
    700: '#a62020',
    800: '#791717',
    900: '#4d0f0f',
    main: '#ff3131',
    contrastText: '#ffffff',
};

// 🌞 Tema Claro
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: PRIMARY,
        secondary: SECONDARY,
        success: SUCCESS,
        warning: WARNING,
        error: ERROR,
        background: {
            default: '#f9f9f9',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555555',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 600 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f9f9f9',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 20,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
            },
        },
    },
};

// 🌙 Tema Escuro (CORRIGIDO)
const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: PRIMARY,
        secondary: SECONDARY,
        success: SUCCESS,
        warning: WARNING,
        error: ERROR,
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#aaaaaa',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 600 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#121212',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 20,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
            },
        },
    },
};

// ✅ Exportação dos temas
export const themelight = createTheme(lightThemeOptions);
export const themeDark = createTheme(darkThemeOptions);

// 💡 Dica: Para usar no Toolpad, você pode exportar também:
// export const toolpadTheme = { light: themelight, dark: themeDark };
