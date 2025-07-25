import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { api } from "../../api";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchCartOne, fetchFlightCheckOut } from "../../redux/action/fetch";
import { Link, useLocation, useNavigate } from "react-router";
import Modal from "../branch/Modal";
import { ActionType } from "../../redux/action/action";

function Flights({ t, currency, steps, formData, user, setShowCartModal, showCartModal, sortedFlights }) {
    const [open, setOpen] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [flightID, setFlightID] = useState(null);
    const minPrice = Math.min(...sortedFlights.map(flight => flight.price));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isReturnPage = location.pathname === '/return/flight';

    const cartOne = useSelector(state => state.flights.cartOne);
    const flight = useSelector(state => state.flights.checkout);

    const outbound = useSelector(state => state.flights.outbound); // flight + uuid
    const addToCart = async (returnFlightId) => {
        setLoading(true);
        // setFlightID(returnFlightId);
        // Save outbound flight
        if (formData.tripType == 'round') {
            const uuid = outbound.uuid;
            console.log(loading);
            const res = await api.post('add/cart/multiple', {
                user_id: user.id,
                flight_ids: [outbound.id, returnFlightId], // both flights
                uuid,
            });
            dispatch(fetchCart(res.data.cartData));
            dispatch(fetchCartOne(res.data.cartOne));

            if (cartOne && cartOne.uuid) {
                const response = await api.get(`/get/flight/info/${cartOne.uuid}/`);
                dispatch(fetchFlightCheckOut(response.data));
            }
            setLoading(false);

        } else if (formData.tripType == 'oneway') {
            const res = await api.get(`add/cart/${returnFlightId}/${user.id}`);
            dispatch(fetchCart(res.data.cartData));
            dispatch(fetchCartOne(res.data.cartOne));

            if (cartOne && cartOne.uuid) {
                const response = await api.get(`/get/flight/info/${cartOne.uuid}/`,);
                dispatch(fetchFlightCheckOut(response.data));
            }
            setLoading(false);
        }
        setShowCartModal(true);
    };

    // Flight 1 (Departure)
    const handleDepartureSelect = (flight) => {
        const uuid = crypto.randomUUID(); // generate shared uuid
        dispatch({
            type: ActionType.FETCH_OUTBOUND_FLIGHT,
            payload: { ...flight, uuid },
        });

        console.log('so', sortedFlights);
        navigate('/return/flight', {
            state: {
                uuid,
                from: formData.from,
                to: formData.to,
                departure_date: formData.departure_date,
                return_date: formData.return_date,
                tripType: formData.tripType,
            }
        });
    };

    return (
        <div>
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-100/10 bg-opacity-80 rounded">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
            {(formData.tripType == 'round' && isReturnPage) && (
                <div className="font-semibold text-xl text-blue-500 mt-10 mb-3">Return To <p>{formData.from?.label || formData.from}</p>
                </div>
            )}
            {sortedFlights.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex items-center space-x-4">
                        <img src="/img/noflight.svg" alt="No flight" className="w-40 h-40" />
                        <p className="text-lg font-semibold text-gray-500">No Flight Available!</p>
                    </div>
                </div>

            ) : (sortedFlights.map((flight, index) => (
                <div key={index} className="max-w-6xl mx-auto rounded-2xl p-4 shadow-sm mb-4 bg-white hover:shadow-md transition-shadow duration-200">
                    <div className="flex  justify-between  items-center gap-4 p-4">
                        {/* Left Section */}
                        <div className=" flex-col gap-1 hidden md:flex">
                            {/* Cheapest price */}
                            {flight.price == minPrice && (
                                <div className="text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded w-fit font-semibold">
                                    Cheapest
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <img src={flight.airline_logo} alt="VietJet" className="h-10 w-10 rounded-full " />
                                <span className="text-sm font-medium">{flight.airline}</span>
                            </div>
                            <div className="text-green-600 text-sm">{t('included')}: 🧳</div>
                        </div>


                        <div className="flex  justify-between text-center gap-0 md:gap-10  w-auto">
                            <div>
                                <div className="text-lg font-semibold">{flight.fromTime}</div>
                                <p className="text-gray-500 text-sm">{flight.airport_code_from ? (flight.airport_code_from) : ''}</p>
                            </div>
                            <div className="mt-3 sm:mt-0">
                                <svg width="120" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="10" y1="10" x2="100" y2="10" stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" />
                                    <polygon points="100,5 110,10 100,15" fill="#c0c0c0" />
                                </svg>

                                <div className="text-xs text-gray-600">{flight.duration}</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold">{flight.toTime}</div>
                                <p className="text-gray-500 text-sm">{flight.airport_code_to ? (flight.airport_code_to) : ''}</p>
                            </div>
                        </div>

                        {/* Toggle button */}
                        <div className="w-auto">
                            <button
                                onClick={() => setOpen(open === flight.id ? null : flight.id)}
                                className="text-red-600 text-lg font-semibold flex items-center justify-end gap-1"
                            >
                                {currency?.cur} {(flight.price * (currency?.rate ?? 1)).toFixed(2)}
                                {open == flight.id ? (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={`overflow-hidden transition-all w-full duration-300 ease-in-out ${open == flight.id ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                        {/* Dropdown Content */}
                        <div className="flex w-full gap-4 px-4 pt-4 text-sm">
                            {/* Flight details + dots */}
                            <div className="flex gap-4 ">
                                <div className="flex flex-col w-20 sm:gap-6 gap-12 items-center text-gray-600">
                                    <div>
                                        <div className="font-bold text-black">{flight.fromTime}</div>
                                        <div className="text-xs">
                                            {new Date(flight.departure_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}</div>
                                    </div>
                                    <div className="text-xs">{flight.duration}</div>
                                    <div>
                                        <div className="font-bold text-black">{flight.toTime}</div>
                                        <div className="text-xs">
                                            {new Date(flight.departure_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <FontAwesomeIcon icon={faCircleDot} className="text-gray-400" />
                                    <div className="sm:h-24 h-32 border-l-2 border-dotted border-gray-400"></div>
                                    <FontAwesomeIcon icon={faCircleDot} className="text-gray-400" />
                                </div>
                            </div>

                            {/* Airport info */}
                            <div className="flex-1 flex flex-col gap-6">
                                <div><strong>{flight.FromCity} {flight.airport_code_from ? (flight.airport_code_from) : ''}</strong> • {flight.from}</div>
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <img src={flight.airline_logo} className="h-7" />
                                        <div className="text-xs text-gray-600">{flight.airline}</div>
                                    </div>
                                    <div className="text-xs text-gray-600">Economy • VZ 130 • Airbus A320</div>
                                </div>
                                <div><strong>{flight.ToCity} {flight.airport_code_to ? (flight.airport_code_to) : ''}</strong> • {flight.to}</div>
                            </div>

                            {/* Features */}
                            <div className="hidden lg:flex flex-col gap-2 text-xs text-gray-600">
                                <div>✈️ A320 {t('jet')}</div>
                                <div>🍷 {t('alcohol')} </div>
                                <div>🍽 {t('meal')} </div>
                                <div>💺 {t('layout')}</div>
                            </div>
                        </div>

                        {/* CTA buttons */}

                        {formData.tripType != 'round' || steps == 'return' ? (
                            <div className="flex justify-end gap-2 px-4 pb-4 pt-3">
                                <button onClick={() => addToCart(flight.id)} className="border border-blue-600 text-blue-600 rounded-full px-4 py-1.5 hover:bg-blue-50">
                                    {t('addToCart')}
                                </button>

                                <Link to={`/direct/buy/ticket/${flight.id}`}>
                                    <button className="bg-blue-600 text-white rounded-full px-6 py-1.5 hover:bg-blue-700">
                                        {t('buy')}
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex justify-end gap-2 px-4 pb-4 pt-3">
                                <button onClick={() => handleDepartureSelect(flight)} className="bg-blue-600 text-white rounded-full px-6 py-1.5 hover:bg-blue-700">
                                    {t('buy')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )))
            }

            {
                showCartModal && (
                    <Modal
                        cartOne={cartOne}
                        flight={flight}
                        setShowCartModal={setShowCartModal}
                        showCartModal={showCartModal}
                    />
                )
            }

        </div >
    )
}

export default Flights; 