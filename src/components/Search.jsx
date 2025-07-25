import { React, useEffect, useState } from 'react'
import SearchFlight from './Form/SearchFlight';
import { api } from '../api';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartOne, fetchCountry, fetchCurrencyList, fetchFlightCheckOut, fetchFlights, fetchOutboundFlight, fetchPassenger, fetchReserveFlight, fetchSeats } from '../redux/action/fetch';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function Search() {
    const initialValues = {
        from: null,
        to: null,
        departure_date: '',
        return_date: '',
    };
    const [formData, setFormData] = useState(initialValues);
    const [currencyModal, setCurrencyModal] = useState(false);
    const currencyRedux = useSelector(state => state.flights.currency);
    const [currency, setCurrency] = useState({
        cur: currencyRedux?.cur || 'USD',
        rate: currencyRedux?.rate || 1
    });
    const dispatch = useDispatch();
    const user = useSelector(state => state.flights.user);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const currencyApi = async () => {
        const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
        const data = await res.json();
        dispatch(fetchCurrencyList((data.conversion_rates)));
    }

    // Function to load airports dynamically from your Laravel backend
    const loadAirports = async (inputValue) => {
        const query = inputValue || ''; // empty string means initial load
        const response = await api.get(`airports?search=${query}`);
        const data = await response.data;

        return data.map(airport => ({
            value: airport.icao,
            label: `${airport.city} - ${airport.name}${airport.iata ? ` (${airport.iata})` : ''}  , ${airport.country}`

        }));
    };

    // Handle swap button: swap from and to airports
    const handleSwapPlaces = () => {
        setFormData(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    // Handle date and trip type changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle select change for 'from' and 'to'
    const handleFromChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            from: selectedOption,
        }));

    };

    const handleToChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            to: selectedOption,
        }));

    };

    const getCountry = async () => {
        try {
            const res = await api.get('country_name');
            dispatch(fetchCountry(res.data));
        } catch (error) {
            console.log(error);
        }
    }


    const getPassengers = async () => {
        try {
            const res = await api.get(`passenger/${user.id}`)
            dispatch(fetchPassenger(res.data));
            console.log('data', res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCountry();
        currencyApi()
        getPassengers()
        dispatch(fetchFlightCheckOut(''));
        dispatch(fetchFlights(''));
        dispatch(fetchFlightCheckOut(''));
        dispatch(fetchOutboundFlight(''));
        dispatch(fetchReserveFlight(''));
        dispatch(fetchCartOne(''));
        dispatch(fetchSeats(''));

        const token = localStorage.getItem('token');
        console.log('t', token);
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            console.log('w');
            navigate('/login/page');
        }

        // const res = api.get('/user-info');
        // dispatch(fetchUser(res.data));

    }, [])


    return (
        <div>
            <Navbar currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />
            <SearchFlight t={t} formData={formData} loadAirports={loadAirports} handleFromChange={handleFromChange} handleSwapPlaces={handleSwapPlaces} handleToChange={handleToChange} handleInputChange={handleInputChange} />
        </div>
    )
}

export default Search
