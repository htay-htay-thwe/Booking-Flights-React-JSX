import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '../../api';
import From from '../branch/From';
import To from '../branch/To';
import SwapBtn from '../branch/SwapBtn';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchDatesData, fetchFlightCheckOut, fetchFlights, fetchFormData } from './../../redux/action/fetch/index';
import Date from '../branch/Date'

const SearchFlight = ({ t, formData, loadAirports, handleSwapPlaces, handleToChange, handleFromChange, handleInputChange }) => {
    const [tripType, setTripType] = useState('round');
    const [fromErrors, setFromErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(formData);
    const fetchDate = async () => {
        try {
            const res = await api.get('generate-dates');
            dispatch(fetchDatesData(res.data))
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    };
    useEffect(() => {
        fetchDate();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate(formData);
        setFromErrors(errors);

        if (Object.keys(errors).length === 0) {
            const data = {
                tripType,
                from: formData.from,
                to: formData.to,
                departure_date: formData.departure_date,
                return_date: formData.return_date || "",
            };
            setLoading(true);

            const res = await api.post('/search/airports', data);
            console.log(res.data.outbound);
            dispatch(fetchFlights(res.data));
            dispatch(fetchFormData(data));
            setLoading(false);
            dispatch(fetchFlightCheckOut(''));
            navigate('/flights');
        }
    };


    const validate = (values) => {
        const errors = {}
        if (!values.from) {
            errors.from = "*required"
        }
        if (!values.to) {
            errors.to = "*required"
        }
        if (tripType == 'round') {
            if (!values.departure_date) {
                errors.departure_date = "*required"
            }
            if (!values.return_date) {
                errors.return_date = "*required"
            }
        }
        if (tripType == 'oneway') {
            if (!values.departure_date) {
                errors.departure_date = "*required"
            }
        }
        return errors;
    }

    useEffect(() => {
        loadAirports();
    }, [])


    return (
        <div className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded shadow">
            {/* <h2 className="mb-6 text-2xl font-bold text-gray-800">
                <FontAwesomeIcon icon="plane" /> Let's Book!
            </h2> */}
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-100/10 bg-opacity-80 rounded">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className={loading ? 'opacity-50 pointer-events-none' : ''}>
                {/* Trip Type */}
                <div className="flex mb-4 space-x-4">
                    {['round', 'oneway'].map(type => (
                        <label key={type} className="cursor-pointer">
                            <input
                                type="radio"
                                name="trip_type"
                                value={type}
                                checked={tripType === type}
                                onChange={() => setTripType(type)}
                                className="hidden peer"
                            />
                            <div className="px-4 py-2 transition border rounded peer-checked:bg-pink-500 peer-checked:text-white hover:text-black hover:bg-blue-200">
                                {type === 'round' ? t('roundTrip') : t('oneway')}
                            </div>
                        </label>
                    ))}
                </div>

                {/* From / To Airport */}
                <div className="relative mb-6">
                    <div className="flex flex-col lg:flex-row gap-1 mb-6">
                        <div className="flex-1">
                            <From t={t}
                                fromErrors={fromErrors}
                                from={formData.from}
                                handleFromChange={handleFromChange}
                                loadAirports={loadAirports}
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <SwapBtn handleSwapPlaces={handleSwapPlaces} />
                        </div>
                        <div className="flex-1">
                            <To t={t}
                                fromErrors={fromErrors}
                                to={formData.to}
                                handleToChange={handleToChange}
                                loadAirports={loadAirports}
                            />
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <Date t={t} formData={formData} fromErrors={fromErrors} handleInputChange={handleInputChange} tripType={tripType} />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white transition bg-pink-500 rounded hover:bg-pink-700"
                >
                    {t('searchFlight')}
                </button>
            </form>
        </div>
    );
};

export default SearchFlight;
