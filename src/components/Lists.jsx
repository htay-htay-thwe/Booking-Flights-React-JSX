import React, { useEffect, useState } from 'react';
import FlightLists from './Form/FlightLists';
import { api } from '../api';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../redux/action/action';
import { fetchCurrencyList } from '../redux/action/fetch';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function Lists() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currencyModal, setCurrencyModal] = useState(false);

    const currencyRedux = useSelector(state => state.flights.currency);
    const [currency, setCurrency] = useState({ cur: currencyRedux.cur || 'USD', rate: currencyRedux.rate || 1 });

    const user = useSelector(state => state.flights.user);
    const formData = useSelector(state => state.flights.formData);


    useEffect(() => {
        const currencyApi = async () => {
            const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
            const data = await res.json();
            dispatch(fetchCurrencyList((data.conversion_rates)));
        }
        currencyApi();
    }, [dispatch, currencyModal])

    // Function to load airports dynamically from your Laravel backend
    const loadAirports = async (inputValue) => {
        const query = inputValue || '';
        const response = await api.get(`airports?search=${query}`);
        const data = await response.data;

        return data.map(airport => ({
            value: airport.icao,
            label: `${airport.city} - ${airport.name}${airport.iata ? ` (${airport.iata})` : ''}  , ${airport.country}`
        }));
    };

    // Handle swap button: swap from and to airports
    const handleSwapPlaces = () => {
        dispatch({
            type: ActionType.FETCH_FORMDATA,
            payload: {
                ...formData,
                from: formData.to,
                to: formData.from,
            }
        });
    };

    // Handle date and trip type changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: ActionType.FETCH_FORMDATA,
            payload: {
                ...formData,
                [name]: value,
            }
        });
    };

    // Handle select change for 'from' and 'to'
    const handleFromChange = (selectedOption) => {
        dispatch({
            type: ActionType.FETCH_FORMDATA,
            payload: {
                ...formData,
                from: selectedOption,
            }
        });
    };

    const handleToChange = (selectedOption) => {
        dispatch({
            type: ActionType.FETCH_FORMDATA,
            payload: {
                ...formData,
                to: selectedOption,
            }
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page'); // client-side, no reload
        }
    }, [])

    return (
        <div className="min-h-screen">
            <Navbar currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />
            <FlightLists t={t}
                currency={currency}
                user={user}
                formData={formData}
                loadAirports={loadAirports}
                handleFromChange={handleFromChange}
                handleSwapPlaces={handleSwapPlaces}
                handleToChange={handleToChange}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}

export default Lists;
