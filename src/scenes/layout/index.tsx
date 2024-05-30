import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { IResGetUserById, useGetUserQuery } from '../../store/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/apps/global';

const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const userId = useSelector((state: RootState) => state.global.userId);
    const { data } = useGetUserQuery(userId) as { data: IResGetUserById };

    return (
        <Box display="flex" width="100%" height="100%">
            <Sidebar
                user={data?.data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="280px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box width="100%" display="flex" flexDirection="column">
                <Navbar
                    user={data?.data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Box p="0 1.5rem 1.5rem" flex="1" overflow="auto">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
