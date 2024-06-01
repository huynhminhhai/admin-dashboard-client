import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { OverallStatType } from '../store/utils/interface';
import { LineChart } from '@mui/x-charts/LineChart';

const OverviewChart = ({
    isDashboard = false,
    salesData,
    isLoading,
}: {
    isDashboard?: boolean;
    salesData: OverallStatType;
    isLoading: boolean;
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const saleData = salesData.monthlyData.map((data) => data.totalSales);
    const unitData = salesData.monthlyData.map((data) => data.totalUnits);

    // Lấy các nhãn từ dữ liệu ban đầu
    const xLabels = salesData.monthlyData.map((data) => data.month);

    return (
        <Box height="70vh" width="100%">
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
