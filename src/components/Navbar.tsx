import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search as SearchIcon,
    SettingsOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../store';
import {
    AppBar,
    IconButton,
    InputBase,
    Toolbar,
    useTheme,
} from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <AppBar
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left side */}
                <FlexBetween>
                    <IconButton
                        onClick={() => console.log('open/close sidebar')}
                    >
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        bgcolor={theme.palette.background.default}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* Right side */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
