import { PaletteMode, ThemeOptions } from '@mui/material';

// color design tokens export
export const tokens = (mode: PaletteMode) => ({
    ...(mode === 'dark'
        ? {
              grey: {
                  100: '#e0e0e0',
                  200: '#c2c2c2',
                  300: '#a3a3a3',
                  400: '#858585',
                  500: '#666666',
                  600: '#525252',
                  700: '#3d3d3d',
                  800: '#292929',
                  900: '#141414',
              },
              primary: {
                  100: '#d0d1d5',
                  200: '#a1a4ab',
                  300: '#727681',
                  400: '#191723',
                  500: '#120f17',
                  600: '#101624',
                  700: '#0c101b',
                  800: '#080b12',
                  900: '#040509',
              },
              secondary: {
                  100: '#dbf5ee',
                  200: '#b7ebde',
                  300: '#94e2cd',
                  400: '#5d547c',
                  500: '#5d547c',
                  600: '#5d547c',
                  700: '#2e7c67',
                  800: '#1e5245',
                  900: '#0f2922',
              },
          }
        : {
              grey: {
                  100: '#141414',
                  200: '#292929',
                  300: '#3d3d3d',
                  400: '#525252',
                  500: '#666666',
                  600: '#858585',
                  700: '#a3a3a3',
                  800: '#c2c2c2',
                  900: '#e0e0e0',
              },
              primary: {
                  100: '#040509',
                  200: '#080b12',
                  300: '#0c101b',
                  400: '#f2f0f0', // manually changed
                  500: '#141b2d',
                  600: '#1F2A40',
                  700: '#727681',
                  800: '#a1a4ab',
                  900: '#d0d1d5',
              },
              secondary: {
                  100: '#0f2922',
                  200: '#1e5245',
                  300: '#2e7c67',
                  400: '#5d547c',
                  500: '#4cceac',
                  600: '#70d8bd',
                  700: '#94e2cd',
                  800: '#b7ebde',
                  900: '#dbf5ee',
              },
          }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
    const colors = tokens(mode);

    const fontFamily = ['Lexend', 'sans-serif'].join(',');

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.primary[500],
                      },
                      secondary: {
                          main: colors.secondary[500],
                      },
                      neural: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: colors.primary[500],
                      },
                  }
                : {
                      primary: {
                          main: colors.primary[100],
                      },
                      secondary: {
                          main: colors.secondary[500],
                      },
                      neural: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: '#fcfcfc',
                      },
                  }),
        },
        typography: {
            fontFamily: fontFamily,
            fontSize: 13,
            h1: {
                fontFamily: fontFamily,
                fontSize: 40,
            },
            h2: {
                fontFamily: fontFamily,
                fontSize: 32,
            },
            h3: {
                fontFamily: fontFamily,
                fontSize: 24,
            },
            h4: {
                fontFamily: fontFamily,
                fontSize: 20,
            },
            h5: {
                fontFamily: fontFamily,
                fontSize: 16,
            },
            h6: {
                fontFamily: fontFamily,
                fontSize: 14,
            },
        },
    };
};
