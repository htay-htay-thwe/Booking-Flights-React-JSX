import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { fetchBooking, fetchCurrencyList } from '../redux/action/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api';

function Bookings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.flights.user);

    const bookFlights = async () => {
        const user_id = user.id;
        const res = await api.get(`get/bookings/${user_id}`);
        dispatch(fetchBooking(res.data));
    }

    const booking = useSelector(state => state.flights.book);

    const currency = useSelector(state => state.flights.currency);

    useEffect(() => {
        bookFlights();
    }, [])


    const currencyApi = async () => {
        const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
        const data = await res.json();
        dispatch(fetchCurrencyList((data.conversion_rates)));
    }

    useEffect(() => {
        currencyApi();
    }, [])

    return (
        <div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:max-w-6xl gap-5 mx-auto">
                {booking.map((flight, index) => {

                    return (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-xl p-4 mb-4 shadow-sm bg-white hover:bg-gray-100 cursor-pointer transition"
                        >
                            <div>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FontAwesomeIcon icon={faPlane} className="text-blue-600" />
                                        <h3 className="font-semibold">
                                            {flight.FromCity} → {flight.ToCity}
                                        </h3>
                                    </div>
                                </div>

                                {/* Departure */}
                                <div className="text-sm text-gray-900 flex items-center gap-4 mb-2">
                                    <FontAwesomeIcon
                                        icon={faPlaneDeparture}
                                        className="text-gray-500 bg-blue-100 p-1 rounded-sm"
                                    />
                                    <img src={flight.airline_logo} className="w-10 h-10" />
                                    {new Date(flight.departure_date).toLocaleDateString()} • {flight.fromTime} - {flight.toTime}
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    {flight.airline} • Economy • {flight.duration}
                                </p>



                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-blue-600 font-semibold">1 x Passenger</span>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">{currency?.cur} {(flight.price * (currency?.rate)).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Includes taxes & fees</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default Bookings
