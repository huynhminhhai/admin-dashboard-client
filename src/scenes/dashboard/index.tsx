import {
    Box,
    Button,
    CircularProgress,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { useGetDashboardQuery } from '../../store/utils/api';
import { IResGetDashboardState } from '../../store/utils/interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FlexBetween from '../../components/FlexBetween';
import {
    DownloadOutlined,
    Email,
    PersonAdd,
    PointOfSale,
} from '@mui/icons-material';
import StatBox from '../../components/StatBox';
import OverviewChart from '../../components/OverviewChart';
import BreakdownChart from '../../components/BreakdownChart';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMediumScreen = useMediaQuery('(min-width: 1200px)');
    const { data, isLoading } = useGetDashboardQuery({
        currentYear: 2021,
        currentMonth: 'November',
        currentDay: '2021-11-15',
    }) as { data: IResGetDashboardState; isLoading: boolean };

    const columns: GridColDef[] = [
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 0.7,
            disableColumnMenu: true,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.7,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => params.value.length,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            sortable: false,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
            disableColumnMenu: true,
        },
    ];

    return (
        <Box>
            <FlexBetween>
                <Header
                    title="DASHBOARD"
                    subtitle="Management admin dashboard"
                />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.secondary[300],
                            color: colors.primary[400],
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            '&:hover': {
                                backgroundColor: colors.secondary[600],
                            },
                        }}
                    >
                        <DownloadOutlined sx={{ mr: '20px' }} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridAutoRows: '160px',
                    gap: '20px',
                    '& > div': {
                        gridColumn: isNonMediumScreen ? undefined : 'span 12',
                    },
                }}
            >
                {/* Row 1 */}
                <StatBox
                    title={'Total Customers'}
                    value={data?.data && data?.data.totalCustomers}
                    increase={'14%'}
                    description="Since last month"
                    icon={
                        <Email
                            sx={{
                                color: colors.secondary[300],
                                fontSize: '26px',
                            }}
                        />
                    }
                />
                <StatBox
                    title={'Sales Today'}
                    value={data?.data && data?.data.todayStat.totalSales}
                    increase={'21%'}
                    description="Since today"
                    icon={
                        <PointOfSale
                            sx={{
                                color: colors.secondary[300],
                                fontSize: '26px',
                            }}
                        />
                    }
                />

                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    bgcolor={colors.primary[400]}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    {data || !isLoading ? (
                        <OverviewChart
                            salesData={data?.data.monthlyData}
                            height="100%"
                        />
                    ) : (
                        <CircularProgress color="success" />
                    )}
                </Box>

                <StatBox
                    title={'Monthly Sales'}
                    value={data?.data && data?.data.thisMonthStat.totalSales}
                    increase={'+5%'}
                    description="Since last month"
                    icon={
                        <PersonAdd
                            sx={{
                                color: colors.secondary[300],
                                fontSize: '26px',
                            }}
                        />
                    }
                />

                <StatBox
                    title={'Yearly Sales'}
                    value={data?.data && data?.data.yearlySalesTotal}
                    increase={'43%'}
                    description="Since last year"
                    icon={
                        <PersonAdd
                            sx={{
                                color: colors.secondary[300],
                                fontSize: '26px',
                            }}
                        />
                    }
                />

                {/* Row 2 */}
                <Box
                    p="1rem"
                    bgcolor={colors.primary[400]}
                    borderRadius="0.55rem"
                    gridColumn="span 8"
                    gridRow="span 3"
                    sx={{
                        '& .MuiDataGrid-root': {
                            border: 'none',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-footerContainer, & .MuiDataGrid-columnHeader':
                            {
                                backgroundColor: colors.primary[400],
                            },
                        '& .MuiDataGrid-columnHeader': {
                            color: colors.secondary[100],
                            borderBottom: 'none',
                        },
                        // '& .MuiDataGrid-virtualScroller': {
                        //     backgroundColor: colors.primary[100],
                        // },
                        '& .Mui-checked': {
                            color: colors.secondary[200],
                        },
                        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                            color: `${colors.grey[100]} !important`,
                            marginBottom: '5px',
                        },
                    }}
                >
                    <DataGrid
                        checkboxSelection
                        loading={isLoading || !data}
                        rows={data?.data?.transactions || []}
                        getRowId={(row) => row._id}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    bgcolor={colors.primary[400]}
                    borderRadius="0.55rem"
                    p={'1rem'}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: colors.secondary[100] }}
                    >
                        Sales by Categoies
                    </Typography>
                    {data || !isLoading ? (
                        <BreakdownChart
                            salesData={data?.data?.salesByCategory}
                            height="80%"
                            isDashboard={true}
                        />
                    ) : (
                        <CircularProgress color="success" />
                    )}
                    <Typography
                        sx={{
                            p: '0 0 0.6rem',
                            fontSize: '0.8rem',
                            color: colors.secondary[200],
                            mt: '1rem',
                        }}
                    >
                        Breakdown of real states and information via category
                        for revenue made for this year and total sales.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
