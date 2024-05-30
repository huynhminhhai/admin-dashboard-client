import { Box, IconButton, Typography, useTheme } from '@mui/material';

import {
    MenuOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

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
        text: 'Geography',
        icon: <PublicOutlined />,
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
        text: 'Daily',
        icon: <TodayOutlined />,
    },
    {
        text: 'Monthly',
        icon: <CalendarMonthOutlined />,
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
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}: {
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
            sx={{
                '& .ps-sidebar-root': {
                    height: '100%',
                },
                '& .ps-sidebar-container::-webkit-scrollbar': {
                    width: '5px',
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
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        icon={isSidebarOpen ? <MenuOutlined /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.grey[100],
                        }}
                    >
                        {!isSidebarOpen && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography
                                    variant="h3"
                                    color={colors.grey[100]}
                                >
                                    ADMINIS
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        setIsSidebarOpen(!isSidebarOpen)
                                    }
                                >
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {navItems.map(({ text, icon }) => {
                        const lcText = text.toLowerCase();

                        return (
                            <MenuItem
                                className={icon === null ? 'isNotActive' : ''}
                                disabled={icon === null}
                                active={active === lcText}
                                style={{ color: colors.grey[100] }}
                                onClick={() => {
                                    navigate(`/${lcText}`);
                                    setActive(lcText);
                                }}
                                icon={icon}
                            >
                                <Typography>{text}</Typography>
                                <Link to={lcText} />
                            </MenuItem>
                        );
                    })}
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
