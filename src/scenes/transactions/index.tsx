import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { useGetTransactionsQuery } from '../../store/utils/api';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IResGetTransactions } from '../../store/utils/interface';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

const Transactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [search, setSearch] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [paginationMode, setPaginationMode] = useState({
        page: 0,
        pageSize: 10,
    });

    const { data, isLoading } = useGetTransactionsQuery({
        limit: paginationMode.pageSize,
        page: paginationMode.page + 1,
        search,
    }) as { data: IResGetTransactions; isLoading: boolean };

    const columns: GridColDef[] = [
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'createdAt',
            headerName: 'Created AT',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 1,
            sortable: false,
            renderCell: (params) => params.value.length,
            disableColumnMenu: true,
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
            <Header title="TRANSACTIONS" subtitle="List of transactions" />
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
                    rowCount={data?.data?.limit * data?.data?.totalPage || 0}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 1,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    paginationMode="server"
                    paginationModel={paginationMode}
                    onPaginationModelChange={setPaginationMode}
                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { setSearch, searchInput, setSearchInput },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;
