import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faTrash, faSmile, faCheck, faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './../../api/index';
import { fetchCart } from '../../redux/action/fetch';
import Swal from 'sweetalert2'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router';



const Cart = ({ t, user }) => {
    const [selectedCartId, setSelectedCartId] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState('');
    const dispatch = useDispatch();


    const handleSelect = (cartId) => {
        const newCartId = selectedCartId === cartId ? null : cartId;
        setSelectedCartId(newCartId);

        const selected = mockFlights.find(f => {
            const id = Array.isArray(f) ? f[0].id : f.id;
            return id === newCartId;
        });

        setSelectedFlight(selected || '');
    };

    const getFlightId = (flight) => {
        return Array.isArray(flight) ? flight[0].flight_id : flight.flight_id;
    };

    console.log('selected', selectedFlight);
    const mockFlights = useSelector(state => state.flights.cart || []);

    const removeCart = async (cart_id) => {
        console.log('cart', cart_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log('user', user.id);
                const res = await api.get(`remove/cart/${cart_id}/${user.id}`);
                dispatch(fetchCart(res.data));

                Swal.fire({
                    title: "Deleted!",
                    text: "Flights has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
            {/* Left: Flight List */}
            {mockFlights.length === 0 ? (
                <div className='w-full'>
                    <div className="text-2xl font-semibold border border-gray-300 shadow p-4 rounded-lg mb-4">
                        {t('cartName')}
                        {mockFlights.length > 0 && (<span>({mockFlights.length})</span>)}
                    </div>
                    <div>{t('fromCity')}</div>
                    <div className="flex flex-col  justify-center items-center text-center w-full gap-4 py-10">
                        <img src="/img/group.svg" className="w-24 h-24" alt="Empty Cart" />
                        <div className="text-2xl font-semibold text-gray-800">{t('emptyCart')}</div>
                        <div className="text-lg text-gray-600 w-full">
                            {t('cartLetter')}
                        </div>
                        <Link to="/" className='w-full'>
                            <button className="bg-blue-500 w-full mt-3 hover:bg-blue-600 px-6 py-2 rounded-md text-white">
                                {t('searchTravel')}
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-full md:w-4/6">
                    <div className="text-2xl font-semibold border border-gray-300 shadow p-4 rounded-lg mb-4">
                        {t('cartName')} {mockFlights.length !== 0 && (<span>({mockFlights.length})</span>)}
                    </div>

                    {mockFlights.map((flight, index) => {
                        const cartId = Array.isArray(flight) ? flight[0].id : flight.id;
                        const isSelected = cartId === selectedCartId;
                        const isDimmed = selectedCartId !== null && !isSelected;

                        return (
                            <div
                                key={index} onClick={() => { handleSelect(cartId); }}
                                className={`border rounded-xl p-4 mb-4 shadow-sm transition cursor-pointer
                              ${isSelected ? 'border-blue-600 bg-blue-50' : 'bg-white border-gray-300 hover:bg-gray-50'}
                                    ${isDimmed ? 'opacity-50 pointer-events-none' : ''}`}>

                                {flight.length > 0 ? (
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FontAwesomeIcon icon={faPlane} className="text-blue-600" />
                                                <h3 className="font-semibold">
                                                    {flight[0].FromCity} → {flight[0].ToCity}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeCart(flight[0].id);
                                                }}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>

                                        {/* flight departure round trip */}
                                        <div>
                                            <div className="text-sm text-gray-900 flex items-center ">
                                                <div className='flex gap-4'>
                                                    <FontAwesomeIcon icon={faPlaneDeparture} className="text-gray-500 bg-blue-100 p-1 mt-1.5 rounded-sm" />
                                                    <img src={flight[0].airline_logo} className='w-10 h-10' />
                                                </div>
                                                {new Date(flight[0].departure_date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}{' '}
                                                • {flight[0].fromTime} - {flight[0].toTime}
                                            </div>

                                            <p className="text-sm text-gray-500 mb-2">
                                                {flight[0].airline} • Economy • {flight[0].duration} • type
                                            </p>
                                        </div>

                                        {/* flight return round trip */}
                                        <div>
                                            <div className="text-sm text-gray-900 flex items-center ">
                                                <div className='flex gap-4'>
                                                    <FontAwesomeIcon icon={faPlaneArrival} className="text-gray-500 bg-blue-100 p-1 mt-1.5 rounded-sm" />
                                                    <img src={flight[1].airline_logo} className='w-10 h-10' />
                                                </div>
                                                {new Date(flight[1].departure_date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}{' '}
                                                • {flight[1].fromTime} - {flight[1].toTime}
                                            </div>

                                            <p className="text-sm text-gray-500 mb-2">
                                                {flight[1].airline} • Economy • {flight[1].duration} • type
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-5 h-5 flex items-center justify-center rounded-sm border-2
                                         ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-transparent'}`}>
                                                    <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                                </div>
                                                <span className="text-blue-600 font-semibold">1 x Passenger</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">${flight.price}</p>
                                                <p className="text-xs text-gray-500">Includes taxes & fees</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FontAwesomeIcon icon={faPlane} className="text-blue-600" />
                                                <h3 className="font-semibold">
                                                    {flight.FromCity} → {flight.ToCity}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeCart(flight.id);
                                                }}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>

                                        <div className="text-sm text-gray-900 flex items-center mb-2">
                                            <FontAwesomeIcon icon={faSmile} className="mr-2 text-yellow-400" />
                                            {new Date(flight.departure_date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}{' '}
                                            • {flight.fromTime} - {flight.toTime}
                                        </div>

                                        <p className="text-sm text-gray-500 mb-2">
                                            {flight.airline} • Economy • {flight.duration} • type
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-5 h-5 flex items-center justify-center rounded-sm border-2
                                         ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-transparent'}`}>
                                                    <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                                </div>
                                                <span className="text-blue-600 font-semibold">1 x Passenger</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">${flight.price}</p>
                                                <p className="text-xs text-gray-500">Includes taxes & fees</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );

                    })}

                </div>
            )
            }


            {/* Right: Summary */}
            {
                mockFlights.length !== 0 && (
                    <div className="w-full md:w-2/6 sticky top-24 h-fit">
                        <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-sm h-fit">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700">{t('totalPriceLetter')}</span>
                                <span className="text-red-600 font-semibold text-xl">
                                    $ {Array.isArray(selectedFlight) ? selectedFlight[0].price + selectedFlight[1].price : selectedFlight ? selectedFlight.price : '0.0'}
                                </span>
                            </div>
                            {selectedFlight ? (

                                <Link to={`/buy/ticket/${selectedCartId}/${getFlightId(selectedFlight)}`}>
                                    <button
                                        className='w-full py-2 rounded-full text-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700'>
                                        {t('nextBtn')}
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    disabled={!selectedFlight}
                                    className='w-full py-2 rounded-full text-lg font-semibold transition bg-gray-300 text-gray-500  cursor-not-allowed'>
                                    {t('nextBtn')}
                                </button>

                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Cart;
