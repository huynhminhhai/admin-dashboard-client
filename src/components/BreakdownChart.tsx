import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';

type OutputObject = {
    id: number;
    value: number;
    label: string;
};

const BreakdownChart = ({
    salesData,
}: {
    salesData: {
        [key: string]: number;
    };
}) => {
    const convert = (input: { [key: string]: number }): OutputObject[] => {
        return Object.entries(input).map(([key, value], index) => ({
            id: index,
            value: value,
            label: key,
        }));
    };

    const dataChart = convert(salesData);

    return (
        <Box height="70vh" width="100%">
            <PieChart
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                series={[
                    {
                        data: dataChart,
                        highlightScope: {
                            faded: 'global',
                            highlighted: 'item',
                        },
                        faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: 'gray',
                        },
                    },
                ]}
            />
        </Box>
    );
};

export default BreakdownChart;
