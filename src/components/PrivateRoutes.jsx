// src/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const expirationDate = new Date(decoded.exp * 1000);

        console.log('Expiration Date:', expirationDate.toLocaleString()); // readable format
        console.log('Is token valid?', expirationDate > new Date());
        return expirationDate > new Date();
    } catch (err) {
        console.log(err);
        return false;
    }
};

const PrivateRoutes = ({ children }) => {
    const valid = isTokenValid();
    console.log('PrivateRoutes render - token valid:', valid);
    return isTokenValid() ? children : <Navigate to="/login/page" />;
};

export default PrivateRoutes;
