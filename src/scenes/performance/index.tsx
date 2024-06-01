import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { IResGetCustomers } from '../../store/utils/interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPerformanceQuery } from '../../store/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/apps/global';

const Performance = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const userId = useSelector((state: RootState) => state.global.userId);
    const { data, isLoading } = useGetPerformanceQuery({
        limit: 10,
        page: 1,
        id: userId,
    }) as { data: any; isLoading: boolean };

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
            <Header title="CUSTOMERS" subtitle="List of customer" />
            <Box
                height="70vh"
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
                }}
            >
                <DataGrid
                    checkboxSelection
                    loading={isLoading || !data}
                    rows={data?.sales || []}
                    getRowId={(row) => row._id}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />
            </Box>
        </Box>
    );
};

export default Performance;
