import * as Yup from 'yup';

export const searchFlightSchema = Yup.object().shape({
    from: Yup.object().required('From airport is required'),
    to: Yup.object().required('To airport is required'),
    departure_date: Yup.string().required('Departure date is required'),
    return_date: Yup.string().when('tripType', {
        is: 'round',
        then: schema => schema.required('Return date is required'),
    }),
});


// src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './apiSlice';

// export const store = configureStore({
//     reducer: {
//         // Add the API reducer
//         [apiSlice.reducerPath]: apiSlice.reducer,
//     },
//     // Add the API middleware for caching, invalidation, etc.
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });
