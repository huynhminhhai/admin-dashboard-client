import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';

type OutputObject = {
    id: number;
    value: number;
    label: string;
};

const BreakdownChart = ({
    salesData,
    height = '70vh',
    isDashboard = false,
}: {
    salesData: {
        [key: string]: number;
    };
    height?: string;
    isDashboard?: boolean;
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
        <Box height={height} width="100%">
            <PieChart
                sx={{
                    '& > g': {
                        transform: isDashboard ? 'translate(10%, 0%)' : 'none',
                    },
                    '& > .MuiChartsLegend-column': {
                        transform: 'none',
                    },
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
                slotProps={{
                    legend: !isDashboard
                        ? {}
                        : {
                              direction: 'row',
                              position: {
                                  vertical: 'bottom',
                                  horizontal: 'middle',
                              },
                              padding: 0,
                          },
                }}
            />
        </Box>
    );
};

export default BreakdownChart;
