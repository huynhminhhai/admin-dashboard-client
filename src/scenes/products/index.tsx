import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';
import {
    IResProducts,
    ProductType,
    useGetProductsQuery,
} from '../../store/utils/api';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { useState } from 'react';

const CardProduct = ({ data }: { data: ProductType }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { _id, category, name, price, description, supply, state } = data;

    return (
        <Card
            key={_id}
            sx={{
                backgroundImage: 'none',
                backgroundColor: colors.primary[400],
                borderRadius: '0.55rem',
            }}
        >
            <CardContent>
                <Typography
                    sx={{
                        fontSize: '14px',
                        textTransform: 'capitalize',
                    }}
                    color={colors.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography
                    sx={{
                        mb: '1.5rem',
                    }}
                    color={colors.secondary[400]}
                >
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={4.9} readOnly />
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                    sx={{
                        color: colors.secondary[200],
                    }}
                >
                    See more
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent
                    sx={{
                        '& > p': {
                            fontSize: '12px',
                        },
                    }}
                >
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>
                        Yearly Sales This Year: {state.yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold This Year:
                        {state.yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const Products = () => {
    const isNonMobile = useMediaQuery('(min-width: 1000px)');
    const { data, isLoading } = useGetProductsQuery({ limit: 30, page: 1 }) as {
        data: IResProducts;
        isLoading: boolean;
    };

    return (
        <Box>
            <Header title="PRODUCTS" subtitle="See your list of products" />
            <Box>
                {data || !isLoading ? (
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%"
                        sx={{
                            '& > div': {
                                gridColumn: isNonMobile ? undefined : 'span 4',
                            },
                        }}
                    >
                        {data.data.products.map((product) => (
                            <CardProduct data={product} />
                        ))}
                    </Box>
                ) : (
                    <CircularProgress color="success" />
                )}
            </Box>
        </Box>
    );
};

export default Products;
