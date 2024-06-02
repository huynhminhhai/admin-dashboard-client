import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: [
        'User',
        'Products',
        'Customers',
        'Transactions',
        'OverallStat',
        'Admin',
        'Performance',
        'Dashboard',
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id: string) => `general/user/${id}`,
            providesTags: ['User'],
        }),
        getProducts: build.query({
            query: ({ limit, page }: { limit: number; page: number }) => ({
                url: `client/products`,
                method: 'GET',
                params: { limit, page },
            }),
            providesTags: ['Products'],
        }),
        getCustomers: build.query({
            query: ({ limit, page }: { limit: number; page: number }) => ({
                url: `client/customers`,
                method: 'GET',
                params: { limit, page },
            }),
            providesTags: ['Customers'],
        }),
        getTransactions: build.query({
            query: ({
                limit,
                page,
                search,
            }: {
                limit: number;
                page: number;
                search: String;
            }) => ({
                url: `client/transactions`,
                method: 'GET',
                params: { limit, page, search },
            }),
            providesTags: ['Transactions'],
        }),
        getOverallStat: build.query({
            query: () => `sales/overall-state`,
            providesTags: ['OverallStat'],
        }),
        getAdmins: build.query({
            query: ({ limit, page }: { limit: number; page: number }) => ({
                url: `management/admins`,
                method: 'GET',
                params: { limit, page },
            }),
            providesTags: ['Admin'],
        }),
        getPerformance: build.query({
            query: ({
                limit,
                page,
                id,
            }: {
                limit: number;
                page: number;
                id: string;
            }) => ({
                url: `management/performance/${id}`,
                method: 'GET',
                params: { limit, page },
            }),
            providesTags: ['Performance'],
        }),
        getDashboard: build.query({
            query: ({
                currentYear,
                currentMonth,
                currentDay,
            }: {
                currentYear: number;
                currentMonth: string;
                currentDay: string;
            }) => ({
                url: `general/dashboard`,
                method: 'POST',
                body: { currentYear, currentMonth, currentDay },
            }),
            providesTags: ['Dashboard'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetOverallStatQuery,
    useGetAdminsQuery,
    useGetPerformanceQuery,
    useGetDashboardQuery,
} = api;
