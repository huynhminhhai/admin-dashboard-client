import {
    LightModeOutlined,
    DarkModeOutlined,
    Search as SearchIcon,
    SettingsOutlined,
    MenuOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../store/apps/global';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    Toolbar,
    Typography,
    useTheme,
    MenuItem,
} from '@mui/material';
import { tokens } from '../theme';
import { UserType } from '../store/utils/api';
import { useState } from 'react';

const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    user: UserType;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState<
        (EventTarget & HTMLButtonElement) | null
    >(null);
    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => setAnchorEl(null);

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
                    <FlexBetween>
                        <Button
                            onClick={handleClickProfile}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textTransform: 'none',
                                gap: '1rem',
                            }}
                        >
                            <Box display="flex" alignItems="center" gap="1rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src="https://static.vecteezy.com/system/resources/previews/016/724/121/non_2x/pain-tendo-akatsuki-free-vector.jpg"
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box textAlign="left">
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.9rem"
                                        sx={{
                                            color: colors.secondary[100],
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        fontSize="0.8rem"
                                        sx={{
                                            color: colors.secondary[200],
                                        }}
                                    >
                                        {user.occupation}
                                    </Typography>
                                </Box>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{
                                    color: colors.secondary[300],
                                    fontSize: '25px',
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={handleCloseMenu}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
