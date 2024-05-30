import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';

import {
    ChevronLeftOutlined,
    ChevronRightOutlined,
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tokens } from '../theme';
import FlexBetween from './FlexBetween';

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
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            color: colors.secondary[200],
                            backgroundColor: colors.primary[400],
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile ? 0 : '2px',
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 16px">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        color={colors.secondary[200]}
                                    >
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isNonMobile)
                                        }
                                    >
                                        <ChevronLeftOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (icon === null) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: '2.25rem 0 1rem 16px' }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                } else {
                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? colors
                                                                  .secondary[300]
                                                            : 'transparent',
                                                    color:
                                                        active === lcText
                                                            ? colors
                                                                  .primary[600]
                                                            : colors
                                                                  .secondary[200],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color:
                                                            active === lcText
                                                                ? colors
                                                                      .primary[600]
                                                                : colors
                                                                      .secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                }
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
