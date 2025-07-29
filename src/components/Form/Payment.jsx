import { React, useEffect, useState } from 'react'
import StripeCheckout from '../payment/StripeCheckOut';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Total from '../branch/Total';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
import { api } from '../../api';
import CountdownTimer from '../branch/CountdownTime';
import UpdateContact from '../branch/UpdateContact';
import Navbar from '../Navbar';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';

function Payment() {
    const [reservationExpired, setReservationExpired] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useTranslation();
    const [loadingStatus, setLoadingStatus] = useState(false);

    const currency = useSelector(state => state.flights.currency);
    const navigate = useNavigate();
    const reserve = useSelector(state => state.flights.reserveFlight);
    const flightSummary = useSelector(state => state.flights.checkout);
    const flightPrice = Array.isArray(flightSummary)
        ? (flightSummary[0]?.price || 0) + (flightSummary[1]?.price || 0)
        : (flightSummary?.price || 0);

    // When timer hits 0, call backend to delete reserve, show warning or redirect
    const handleTimeout = async () => {

        try {
            // Call your API to delete reservation or mark as expired
            await api.post('/delete/unpaid-reserve', { reserveId: reserve.id });

            setReservationExpired(true);
            Swal.fire({
                title: "Sorry, Payment Session Time is Expired!",
                text: "Please Go Back To Main Page.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Back To Main Page"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            })

        } catch (error) {
            console.error('Failed to delete unpaid reservation', error);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page'); // client-side, no reload
        }
    }, [])

    return (
        <div>

            <div className={`max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 text-sm text-gray-700 ${loadingStatus ? 'opacity-60 pointer-events-none' : ''}`}>
                <div className=''>
                    {
                        Array.isArray(reserve) ? (
                            <div className='border border-gray-300 shadow rounded-lg p-4'>
                                {/* Contact Details */}
                                <div>
                                    <div className='flex justify-between'>
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('contactDetail')}</h2>

                                        {/* edit button */}
                                        <div className="relative group inline-block">
                                            <div onClick={() => setIsEditing(true)} className="text-xl hover:text-red-400">
                                                <FontAwesomeIcon icon={faPen} />
                                            </div>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                    px-2 py-1 text-sm text-white bg-red-500 rounded opacity-0 group-hover:opacity-100 transition">
                                                Edit
                                            </div>
                                        </div>
                                        {/* end edit button */}

                                    </div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-gray-500">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-800">{reserve[0]['firstName']} {reserve[0]['lastName']}</span>
                                    </div>
                                    <p className="text-blue-600 hover:underline ml-7">{reserve[0]['email']}</p>
                                    <p className="text-blue-600 hover:underline ml-7">{reserve[0]['country_code']} {reserve[0]['phone_no']}</p>
                                </div>

                                {/* Passenger Details */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('passengerDetail')}</h2>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-gray-500">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-800">{reserve[0]['passenger_first_name']} {reserve[0]['passenger_last_name']}</span>
                                    </div>
                                    <p className="ml-7">
                                        <span className="text-gray-500">Passport: </span>
                                        <span className="text-blue-600 hover:underline">MH522614</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='border border-gray-300 shadow rounded-lg p-4'>
                                {/* Contact Details */}
                                <div>
                                    <div className='flex justify-between'>
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('contactDetail')}</h2>

                                        {/* edit button */}
                                        <div className="relative group inline-block">
                                            <div onClick={() => setIsEditing(true)} className="text-xl hover:text-red-400">
                                                <FontAwesomeIcon icon={faPen} />
                                            </div>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                    px-2 py-1 text-sm text-white bg-red-500 rounded opacity-0 group-hover:opacity-100 transition">
                                                Edit
                                            </div>
                                        </div>
                                        {/* end edit button */}

                                    </div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-gray-500">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-800">{reserve['firstName']} {reserve['lastName']}</span>
                                    </div>
                                    <p className="text-blue-600 hover:underline ml-7">{reserve['email']}</p>
                                    <p className="text-blue-600 hover:underline ml-7">{reserve['country_code']} {reserve['phone_no']}</p>
                                </div>

                                {/* Passenger Details */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('passengerDetail')}</h2>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-gray-500">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-800">{reserve['passenger_first_name']} {reserve['passenger_last_name']}</span>
                                    </div>
                                    <p className="ml-7">
                                        <span className="text-gray-500">Passport: </span>
                                        <span className="text-blue-600 hover:underline">MH522614</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    <div>
                        {isEditing && (
                            <UpdateContact t={t} reserve={reserve} setIsEditing={setIsEditing} />
                        )}
                    </div>
                    <div className='mt-5'>
                        <StripeCheckout loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus} reserve={reserve} flightPrice={flightPrice} />
                    </div>
                </div>
                <div className="sticky top-6 h-fit">
                    <Total t={t} currency={currency} reserve={reserve} flightPrice={flightPrice} flightSummary={flightSummary} />
                    {!reservationExpired && (
                        <div className='p-4 mx-auto text-center text-gray-500 font-semibold bg-green-100 rounded-lg mt-5'>
                            <CountdownTimer initialSeconds={300} onTimeout={handleTimeout} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payment
