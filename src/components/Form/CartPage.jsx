import React, { useEffect } from 'react'
import Cart from '../branch/Cart'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function CartPage() {
    const user = useSelector(state => state.flights.user);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const currency = useSelector(state => state.flights.currency);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page'); // client-side, no reload
        }
    }, []);

    return (
        <div>
            <Cart t={t} user={user} currency={currency} />
        </div>
    )
}

export default CartPage
