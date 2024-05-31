import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        monthlyData: [
            {
                month: string;
                totalSales: number;
                totalUnits: number;
                _id: string;
            }[]
        ];
        __v: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IResProducts {
    message: string;
    data: {
        products: ProductType[];
        limit: number;
        page: number;
        totalPage: number;
    };
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id: string) => `general/user/${id}`,
            providesTags: ['User'],
        }),
        getProducts: build.query({
            query: ({ limit, page }: { limit: number; page: number }) =>
                `client/products?limit=${limit}&page=${page}`,
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetUserQuery, useGetProductsQuery } = api;
