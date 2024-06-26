import { Box, CircularProgress } from '@mui/material';
import Header from '../../components/Header';
import OverviewChart from '../../components/OverviewChart';
import { useGetOverallStatQuery } from '../../store/utils/api';
import { IResGetOverallStat } from '../../store/utils/interface';

const Overview = () => {
    const { data, isLoading } = useGetOverallStatQuery({}) as {
        data: IResGetOverallStat;
        isLoading: boolean;
    };

    return (
        <Box>
            <Header title="OVERALL STATE" subtitle="Overview Chart" />
            <Box>
                {data || !isLoading ? (
                    <OverviewChart salesData={data?.data[0].monthlyData} />
                ) : (
                    <CircularProgress color="success" />
                )}
            </Box>
        </Box>
    );
};

export default Overview;
