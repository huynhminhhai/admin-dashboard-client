import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { LineChart } from '@mui/x-charts/LineChart';

const OverviewChart = ({
    salesData,
    height = '70vh',
    isDashboard = false,
}: {
    salesData: {
        month: string;
        totalSales: number;
        totalUnits: number;
    }[];
    height?: string;
    isDashboard?: boolean;
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const saleData = salesData.map((data) => data.totalSales);
    const unitData = salesData.map((data) => data.totalUnits);

    // Lấy các nhãn từ dữ liệu ban đầu
    const xLabels = salesData.map((data) => data.month);

    return (
        <Box height={height} width="100%">
            <LineChart
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                series={[
                    { data: saleData, label: 'Sales' },
                    { data: unitData, label: 'Units' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                colors={[colors.secondary[100], colors.secondary[600]]}
            />
        </Box>
    );
};

export default OverviewChart;
