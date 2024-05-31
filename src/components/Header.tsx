import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="1.5rem">
            <Typography
                variant="h2"
                color={colors.secondary[100]}
                fontWeight="bold"
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.secondary[300]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
