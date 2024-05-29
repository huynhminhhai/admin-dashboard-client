import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useMemo } from 'react';
import { themeSettings } from './theme';

function App() {

  const mode = useSelector((state: RootState) => state.global.mode) as PaletteMode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
