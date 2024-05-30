import {
    LightModeOutlined,
    DarkModeOutlined,
    Search as SearchIcon,
    SettingsOutlined,
    MenuOutlined,
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
import { tokens } from '../theme';

const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <AppBar
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none',
            }}
        >
            <Toolbar
                sx={{ justifyContent: 'space-between', padding: '1.5rem' }}
            >
                {/* Left side */}
                <FlexBetween>
                    <IconButton
                        sx={{ marginRight: '24px' }}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <FlexBetween
                        bgcolor={colors.primary[400]}
                        borderRadius="9px"
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
