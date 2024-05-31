import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers'],
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
        getCustomers: build.query({
            query: ({ limit, page }: { limit: number; page: number }) =>
                `client/customers?limit=${limit}&page=${page}`,
            providesTags: ['Customers'],
        }),
    }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
    api;
