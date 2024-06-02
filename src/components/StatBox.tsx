import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import FlexBetween from './FlexBetween';
import { ReactNode } from 'react';

const StatBox = ({
    title,
    value,
    increase,
    icon,
    description,
}: {
    title: string;
    value: string | number;
    increase: any;
    icon: ReactNode;
    description: string;
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn="span 2"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            bgcolor={colors.primary[400]}
            borderRadius="0.55rem"
        >
            <FlexBetween>
                <Typography variant="h6" sx={{ color: colors.secondary[100] }}>
                    {title}
                </Typography>
                {icon}
            </FlexBetween>

            <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: colors.secondary[200] }}
            >
                {value}
            </Typography>

            <FlexBetween gap="1rem">
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: theme.palette.secondary.light }}
                >
                    {increase}
                </Typography>
                <Typography>{description}</Typography>
            </FlexBetween>
        </Box>
    );
};

export default StatBox;
