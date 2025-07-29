import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights, fetchFormData } from '../redux/action/fetch';
import { api } from '../api';

import Navbar from './Navbar';
import SearchForm from './Form/SearchForm';
import Outbound from './branch/Outbound';
import Sorting from './branch/Sorting';
import Flights from './Form/Flights';
import { jwtDecode } from 'jwt-decode';
import { faDollarSign, faSun, faClock, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

function Return() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCartModal, setShowCartModal] = useState(false);
    const [sortedFlights, setSortedFlights] = useState([]);
    const [sortBy, setSortBy] = useState('price_asc');
    const { t } = useTranslation();

    const currency = useSelector(state => state.flights.currency);

    // Redux selectors
    const formData = useSelector(state => state.flights.formData);
    const flights = useSelector(state => state.flights.flights?.return || []);
    const user = useSelector(state => state.flights.user);
    const outbound = useSelector(state => state.flights.outbound);
    console.log('curl', currency);
    // Sort option state
    const [selected, setSelected] = useState('price_asc');

    // Form validation errors
    const [fromErrors, setFromErrors] = useState({});

    // Validation function
    const validate = (values) => {
        const errors = {};
        if (!values.from) errors.from = '*required';
        if (!values.to) errors.to = '*required';
        if (values.tripType === 'round') {
            if (!values.departure_date) errors.departure_date = '*required';
            if (!values.return_date) errors.return_date = '*required';
        } else {
            if (!values.departure_date) errors.departure_date = '*required';
        }
        return errors;
    };



    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formData);
        setFromErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const res = await api.post('/search/airports', formData);
                dispatch(fetchFlights(res.data));

                navigate('/flights');
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Input change handlers dispatch changes to Redux
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(fetchFormData({ ...formData, [name]: value }));
    };

    const handleFromChange = (option) => {
        dispatch(fetchFormData({ ...formData, from: option }));
    };

    const handleToChange = (option) => {
        dispatch(fetchFormData({ ...formData, to: option }));
    };

    const handleSwapPlaces = () => {
        dispatch(fetchFormData({ ...formData, from: formData.to, to: formData.from }));
    };

    // Async load airports for dropdown
    const loadAirports = async (inputValue) => {
        const query = inputValue || '';
        const response = await api.get(`airports?search=${query}`);
        const data = await response.data;

        return data.map(airport => ({
            value: airport.icao,
            label: `${airport.city} - ${airport.name}${airport.iata ? ` (${airport.iata})` : ''}  , ${airport.country}`
        }));
    };

    function parseDurationToMinutes(durationStr) {
        const hourMatch = durationStr.match(/(\d+)h/);
        const minuteMatch = durationStr.match(/(\d+)m/);
        const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
        const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;
        return hours * 60 + minutes;
    }

    // use Memo show data
    const { priceSort, fastestSort, earliestSort, latestSort } = useMemo(() => {
        return {
            priceSort: [...flights].sort((a, b) => a.price - b.price),
            fastestSort: [...flights].sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration)),
            earliestSort: [...flights].sort((a, b) => new Date(`1970-01-01T${a.fromTime}:00`) - new Date(`1970-01-01T${b.fromTime}:00`)),
            latestSort: [...flights].sort((a, b) => new Date(`1970-01-01T${b.fromTime}:00`) - new Date(`1970-01-01T${a.fromTime}:00`)),
        };
    }, [flights]);

    //  Options depend on sorted data
    const options = useMemo(() => [
        {
            id: 1,
            key: "price_asc",
            icon: faDollarSign,
            label: "Cheapest",
            price: `${currency?.cur} ${(priceSort[0]?.price * currency?.rate).toFixed(2) || '-'}`,
            duration: `${priceSort[0]?.duration || '-'}`,
        },
        {
            id: 2,
            key: "fastest",
            icon: faClock,
            label: "Fastest",
            price: `${currency?.cur} ${(fastestSort[0]?.price * currency?.rate).toFixed(2) || '-'}`,
            duration: `${fastestSort[0]?.duration || '-'}`,
            iconClass: "text-green-500",
        },
        {
            id: 3,
            key: "earliest",
            icon: faSun,
            label: "Earliest First",
            price: `${currency?.cur} ${(earliestSort[0]?.price * currency?.rate).toFixed(2) || '-'}`,
            duration: `${earliestSort[0]?.duration || '-'}`,
            iconClass: "text-yellow-500",
        },
        {
            id: 4,
            key: "latest",
            icon: faMoon,
            label: "Latest First",
            price: `${currency?.cur} ${(latestSort[0]?.price * currency?.rate).toFixed(2) || '-'}`,
            duration: `${latestSort[0]?.duration || '-'}`,
            iconClass: "text-yellow-500",
        },
    ], [priceSort, fastestSort, earliestSort, latestSort]);

    const handleSelect = (key) => {
        setSelected(key);
        setSortBy(key);
    };

    useEffect(() => {
        let sorted = [];
        switch (sortBy) {
            case 'price_asc':
                sorted = [...flights].sort((a, b) => a.price - b.price);
                break;
            case 'fastest':
                sorted = [...flights].sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration));
                break;
            case 'earliest':
                sorted = [...flights].sort((a, b) => new Date(`1970-01-01T${a.fromTime}:00`) - new Date(`1970-01-01T${b.fromTime}:00`));
                break;
            case 'latest':
                sorted = [...flights].sort((a, b) => new Date(`1970-01-01T${b.fromTime}:00`) - new Date(`1970-01-01T${a.fromTime}:00`));
                break;
            default:
                sorted = flights;
        }
        setSortedFlights(sorted);
    }, [flights, sortBy]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page'); // client-side, no reload
        }
    }, [])

    return (
        <>
            <div className="bg-blue-50 min-h-screen shadow">
                <div className="max-w-6xl p-4 md:p-6 mx-auto rounded">
                    <SearchForm t={t}
                        handleSubmit={handleSubmit}
                        fromErrors={fromErrors}
                        formData={formData}
                        handleFromChange={handleFromChange}
                        loadAirports={loadAirports}
                        handleSwapPlaces={handleSwapPlaces}
                        handleToChange={handleToChange}
                        handleInputChange={handleInputChange}
                    />
                    <Outbound t={t} currency={currency} outbound={outbound} />
                    <Sorting t={t} options={options} selected={selected} handleSelect={handleSelect} />
                    <Flights t={t} currency={currency} steps="return" formData={formData} user={user} sortedFlights={sortedFlights} setShowCartModal={setShowCartModal} showCartModal={showCartModal} />
                </div>
            </div>
        </>
    );
}

export default Return;
