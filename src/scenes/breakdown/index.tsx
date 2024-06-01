import { Box, CircularProgress } from '@mui/material';
import Header from '../../components/Header';
import { useGetOverallStatQuery } from '../../store/utils/api';
import { IResGetOverallStat } from '../../store/utils/interface';
import BreakdownChart from '../../components/BreakdownChart';

const Breadown = () => {
    const { data, isLoading } = useGetOverallStatQuery({}) as {
        data: IResGetOverallStat;
        isLoading: boolean;
    };

    return (
        <Box>
            <Header
                title="BREAKDOWN"
                subtitle="Breakdown of Sales by Category"
            />
            <Box>
                {data || !isLoading ? (
                    <BreakdownChart salesData={data?.data[0].salesByCategory} />
                ) : (
                    <CircularProgress color="success" />
                )}
            </Box>
        </Box>
    );
};

export default Breadown;
