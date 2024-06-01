export interface UserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    city: string;
    state: any;
    country: string;
    occupation: string;
    phoneNumber: string;
    transactions: string[];
    role: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface IResGetUserById {
    message: string;
    data: UserType;
}

export interface ProductType {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    supply: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
    state: {
        _id: string;
        productId: string;
        yearlySalesTotal: number;
        yearlyTotalSoldUnits: number;
        monthlyData: {
            month: string;
            totalSales: number;
            totalUnits: number;
            _id: string;
        }[];
        dailyData: {
            date: string;
            totalSales: number;
            totalUnits: number;
        }[];
        __v: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IResGetProducts {
    message: string;
    data: {
        products: ProductType[];
        limit: number;
        page: number;
        totalPage: number;
    };
}

export interface IResGetCustomers {
    message: string;
    data: {
        users: UserType[];
        limit: number;
        page: number;
        totalPage: number;
    };
}

export interface TransactionType {
    _id: string;
    userId: string;
    cost: string;
    products: string[];
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface IResGetTransactions {
    message: string;
    data: {
        transactions: TransactionType[];
        limit: number;
        page: number;
        totalPage: number;
    };
}

export interface OverallStatType {
    totalCustomers: number;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: {
        month: string;
        totalSales: number;
        totalUnits: number;
    }[];
    dailyData: {
        date: string;
        totalSales: number;
        totalUnits: number;
    }[];
    salesByCategory: {
        type: any;
        of: number;
    };
}

export interface IResGetOverallStat {
    message: string;
    data: OverallStatType[];
}

export interface TotalLineType {
    id: string;
    color: string;
    data: { x: string; y: number }[];
}
