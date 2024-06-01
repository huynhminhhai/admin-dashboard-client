import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { IResGetCustomers } from '../../store/utils/interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAdminsQuery } from '../../store/utils/api';

const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, isLoading } = useGetAdminsQuery({
        limit: 10,
        page: 1,
    }) as { data: IResGetCustomers; isLoading: boolean };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.7,
            disableColumnMenu: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 1,
            renderCell: (params) => {
                return params.value.replace(
                    /^(\d{3})(\d{3})(\d{4})/,
                    '($1)$2-$3'
                );
            },
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.7,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'occupation',
            headerName: 'Occupation',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
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
                    rows={data?.data?.users || []}
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

export default Admin;
