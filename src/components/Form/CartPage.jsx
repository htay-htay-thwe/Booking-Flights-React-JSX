import React, { useEffect, useState } from 'react'
import Cart from '../branch/Cart'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { fetchCurrencyList } from '../../redux/action/fetch';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function CartPage() {
    const user = useSelector(state => state.flights.user);
    const [currencyModal, setCurrencyModal] = useState(false);
    const [currency, setCurrency] = useState({ cur: "USD", rate: 1 });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currencyApi = async () => {
        const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
        const data = await res.json();
        dispatch(fetchCurrencyList((data.conversion_rates)));
    }
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page'); // client-side, no reload
        }

        currencyApi()
    }, []);

    return (
        <div>
            <Navbar currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />
            <Cart t={t} user={user} />
        </div>
    )
}

export default CartPage
