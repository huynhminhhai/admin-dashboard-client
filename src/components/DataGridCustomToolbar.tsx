import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarProps,
    ToolbarPropsOverrides,
} from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar: React.JSXElementConstructor<
    GridToolbarProps & ToolbarPropsOverrides
> = ({ setSearch, searchInput, setSearchInput }) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField
                    variant="standard"
                    color="secondary"
                    label="Search..."
                    sx={{ width: '15rem', mb: '1.5rem' }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setSearch(searchInput);
                                        setSearchInput('');
                                    }}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridCustomToolbar;
