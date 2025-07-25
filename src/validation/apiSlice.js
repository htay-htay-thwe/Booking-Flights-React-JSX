// src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // unique key for the reducer
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers) => {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            // If token exists, set Authorization header
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRegister: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            }),
        }),
        getLogin: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),
        searchFlights: builder.query({
            query: ({ from, to, departure_date, return_date, tripType }) => ({
                url: '/flights/search',
                method: 'GET',
                params: { from, to, departure_date, return_date, tripType },
            }),
        }),
        getCountry: builder.query({
            query: () => 'country_name', // API endpoint path
        }),
        getDates: builder.query({
            query: () => 'generate-dates', // API endpoint path
        }),
    }),
});

export const {
    useGetCountryQuery,
    useGetRegisterMutation,
    useGetLoginMutation,
    useGetDatesQuery,
    useSearchFlightsQuery,
} = apiSlice;
