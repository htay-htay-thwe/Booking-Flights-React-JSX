import React, { useEffect } from 'react';
import FlightLists from './Form/FlightLists';
import { api } from '../api';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../redux/action/action';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function Lists() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const currency = useSelector(state => state.flights.currency);
    const user = useSelector(state => state.flights.user);
    const formData = useSelector(state => state.flights.formData);

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
