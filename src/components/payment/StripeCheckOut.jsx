import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../api';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useNavigate } from 'react-router';
import { fetchFlightCheckOut, fetchOutboundFlight, fetchReserveFlight } from '../../redux/action/fetch';



const StripeCheckout = ({ loadingStatus, setLoadingStatus, reserve, flightPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [clientSecret, setClientSecret] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('United States');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [ids, setIds] = useState(null);
    const countryArray = useSelector(state => state.flights.country);
    const countryOptions = countryArray.map((co) => ({
        value: co.abbreviation,
        label: ` ${co.country}`,
    }));



    useEffect(() => {
        api.post("create-payment-intent", {
            amount: flightPrice // cents
        })
            .then((res) => {
                console.log("Client secret from backend:", res.data.clientSecret); // ✅ Debug
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
                console.error("Failed to create PaymentIntent", err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            Toastify({
                text: "Something is Wrong!",
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FE0112",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            return;
        }

        if (!clientSecret) {
            Toastify({
                text: "Error",
                duration: 5000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#00b09b",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            return;
        }
        setLoading(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name,
                    email,
                    address: {
                        postal_code: zip,
                        country,
                    },
                },
            },
        });
        setLoading(false);

        if (result.error) {
            Toastify({
                text: "Payment failed",
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FE0112",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            // alert(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            setLoadingStatus(true);
            await api.post('payment/update-status', { uuid: reserve.uuid, cart_id: reserve.cart_id, paymentStatus: 'paid', reserveId: ids });
            Toastify({
                text: "✅ Payment successful!",
                duration: 3000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#00b09b",
                },
                onClick: function () { } // Callback after click
            }).showToast();

            dispatch(fetchFlightCheckOut(''));
            dispatch(fetchOutboundFlight(''));
            dispatch(fetchReserveFlight(''));
            setLoadingStatus(false);
            let seconds = 6;
            setCountdown(seconds);

            const interval = setInterval(() => {
                seconds -= 1;
                setCountdown(seconds);
                if (seconds === 0) {
                    clearInterval(interval);
                    navigate('/');
                }
            }, 1000);

        }
    };



    useEffect(() => {
        if (reserve) {
            setIds(
                Array.isArray(reserve) && reserve.length > 0
                    ? reserve.map(f => f.id)
                    : reserve && reserve.id
                        ? [reserve.id]
                        : []
            );
        }
    }, [reserve]);

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption?.value || '');
    };

    return (
        <div>
            {loadingStatus && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-100/10 bg-opacity-80 rounded">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white border border-gray-300 shadow rounded-lg space-y-4">
                <h2 className="text-md text-blue-500 font-semibold"><FontAwesomeIcon icon={faLock} /> Secure Payment</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Name on card"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <Select
                    options={countryOptions}
                    value={countryOptions.find(option => option.value === country) || null}            // Controlled input
                    onChange={handleCountryChange}      // Called when user selects a new country
                    placeholder="Select a country"
                    isClearable
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? '#99A1AF' : '#99A1AF',
                            boxShadow: state.isFocused ? '0 0 0 1px #99A1AF' : 'none',
                            '&:hover': {
                                borderColor: '#99A1AF',
                            },
                            minHeight: '42px',
                        }),
                    }}
                />


                <input
                    type="text"
                    placeholder="ZIP Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <CardElement className="p-3 border rounded" />

                <button
                    type="submit"
                    className="w-full p-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                >
                    <FontAwesomeIcon icon={faLock} /> {loading ? "Processing..." : countdown !== null ? "Payment Succeed" : "Pay Now"}
                </button>

                {/* Countdown Message */}
                {countdown !== null && (
                    <p className="text-sm text-gray-500 text-center">
                        Payment Succeeded.  Redirecting in <span className='text-red-400'>{countdown}</span> second{countdown !== 1 ? 's' : ''}...
                    </p>
                )}
            </form>
        </div>
    );
};

export default StripeCheckout;
