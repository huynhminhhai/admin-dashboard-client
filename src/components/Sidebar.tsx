import { Box, Divider, Typography, useTheme } from '@mui/material';

import {
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PointOfSaleOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    SettingsOutlined,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import FlexBetween from './FlexBetween';
import { UserType } from '../store/utils/interface';

const navItems = [
    {
        text: 'Dashboard',
        icon: <HomeOutlined />,
    },
    {
        text: 'Client Facing',
        icon: null,
    },
    {
        text: 'Products',
        icon: <ShoppingCartOutlined />,
    },
    {
        text: 'Customers',
        icon: <Groups2Outlined />,
    },
    {
        text: 'Transactions',
        icon: <ReceiptLongOutlined />,
    },
    {
        text: 'Sales',
        icon: null,
    },
    {
        text: 'Overviews',
        icon: <PointOfSaleOutlined />,
    },
    {
        text: 'Breakdown',
        icon: <PieChartOutline />,
    },
    {
        text: 'Management',
        icon: null,
    },
    {
        text: 'Admin',
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: 'Performance',
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    user,
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    user: UserType;
    isNonMobile: boolean;
    drawerWidth: string;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState<string>('');
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box
            component="nav"
            height="100%"
            position="relative"
            sx={{
                '& .ps-sidebar-root': {
                    height: '100vh',
                },
                '& .ps-sidebar-root.ps-collapsed': {
                    width: isNonMobile ? '80px' : '0px',
                    minWidth: isNonMobile ? '80px' : '0px',
                },
                '& .ps-sidebar-container::-webkit-scrollbar': {
                    width: '5px',
                },
                '& .ps-sidebar-container': {
                    paddingBottom: '24px',
                },
                '& .ps-sidebar-container, & .ps-submenu-content': {
                    background: `${colors.primary[400]} !important`,
                },
                '& .ps-menu-button:hover': {
                    color: `${colors.secondary[900]} !important`,
                    backgroundColor: `transparent !important`,
                },
                '& .ps-menuitem-root.ps-active .ps-menu-button': {
                    color: `${colors.secondary[900]} !important`,
                },
                '& .ps-menuitem-root.ps-active': {
                    backgroundColor: `${colors.secondary[500]} !important`,
                },
                '& .ps-menuitem-root:hover': {
                    backgroundColor: `${colors.secondary[500]} !important`,
                },
                '& .ps-menuitem-root.isNotActive:hover': {
                    backgroundColor: `transparent !important`,
                },
            }}
        >
            <ProSidebar width={drawerWidth} collapsed={isSidebarOpen}>
                <Menu>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        className="isNotActive"
                        icon={undefined}
                        style={{
                            margin: '24px 0',
                            color: colors.grey[100],
                        }}
                        component={<Link to={'/'} />}
                    >
                        {!isSidebarOpen && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                >
                                    ADMINIS
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>

                    {navItems.map(({ text, icon }) => {
                        const lcText = text.toLowerCase();

                        return (
                            <MenuItem
                                key={text}
                                className={icon === null ? 'isNotActive' : ''}
                                disabled={icon === null}
                                active={active === lcText}
                                style={{ color: colors.grey[100] }}
                                onClick={() => {
                                    navigate(`/${lcText}`);
                                    setActive(lcText);
                                }}
                                icon={icon}
                                component={<Link to={lcText} />}
                            >
                                <Typography>{text}</Typography>
                            </MenuItem>
                        );
                    })}

                    <MenuItem
                        className="isNotActive"
                        style={{ marginTop: '12px' }}
                    >
                        <Divider />
                        <FlexBetween textTransform="none" m="1.5rem 2rem 0 0">
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
                            <SettingsOutlined
                                sx={{
                                    color: colors.secondary[300],
                                    fontSize: '25px',
                                }}
                            />
                        </FlexBetween>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
