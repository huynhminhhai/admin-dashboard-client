import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Layout } from './scenes';

function App() {
    const mode = useSelector(
        (state: RootState) => state.global.mode
    ) as PaletteMode;

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
