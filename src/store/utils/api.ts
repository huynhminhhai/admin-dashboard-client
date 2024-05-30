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

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id: string) => `general/user/${id}`,
            providesTags: ['User'],
        }),
    }),
});

export const { useGetUserQuery } = api;
