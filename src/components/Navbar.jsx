import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlaneDeparture, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchCurrency, fetchLanguage } from '../redux/action/fetch';
import { api } from '../api';
import { persistor } from "../redux/store/index"
import Currency from './Nav/Currency';
import { useTranslation } from 'react-i18next';


function Navbar({ setCurrency, currency, currencyModal, setCurrencyModal }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const cart = useSelector(state => state.flights.cart);
    const user = useSelector(state => state.flights.user);
    const language = useSelector(state => state.flights.language);

    const logOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        await persistor.purge();
        navigate('/login/page');
    }

    const changeLan = (value) => {
        console.log('click');
        console.log(value);
        dispatch(fetchLanguage(value));
    }


    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    useEffect(() => {
        dispatch(fetchCurrency(currency));
    }, [currency])

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const res = await api.get(`get/cart/${user.id}`);
                dispatch(fetchCart(res.data));
            } catch (err) {
                console.error("Failed to fetch cart:", err);
            }
        };
        fetchCartData();
    }, [dispatch]);

    return (
        <div className='sticky top-0 z-30'>
            <div className='sticky top-0 z-30'>
                <nav className="w-full  bg-gray-100 shadow-sm px-4 md:px-10 py-4 flex justify-between items-center">
                    <div className='flex justify-between w-40'>
                        {/* <!-- Logo --> */}
                        <div className="flex items-center space-x-2">
                            <img src="./img/flight-logo.png" alt="Logo" className="h-16 w-auto" />
                            {/* <span class="text-xl font-bold text-gray-800">YourBrand</span> */}
                        </div>
                        <Link to="/" className='hover:text-blue-500 text-lg text-center mt-4'>
                            <FontAwesomeIcon icon={faPlaneDeparture} className='text-amber-600' /> Flights
                        </Link>
                    </div>

                    {/* <!-- Right side controls --> */}
                    <div className="flex items-center space-x-6 text-sm text-gray-700">
                        {/* home  */}
                        {/* <button className='text-xl hover:text-gray-700 mb-1'><FontAwesomeIcon icon={faHouse} /></button> */}

                        {/* <!-- Cart --> */}
                        <Link to="/flight/cart">
                            <button className="relative hover:text-blue-600 transition mt-1 ">
                                <FontAwesomeIcon icon={faCartShopping} className='text-xl' />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>
                                )}
                            </button>
                        </Link>
                        {/* <!-- Language --> */}
                        {i18n.language !== 'en' ? (
                            <button onClick={() => changeLan('en')}>
                                <img src="/img/eng_flag.jpg" className="w-10" />
                            </button>
                        ) : (
                            <button onClick={() => changeLan('my')}>
                                <img src="/img/myanmar.png" className="w-10" />
                            </button>
                        )}


                        {/* <!-- Currency --> */}
                        <button onClick={() => setCurrencyModal(true)} className="hover:text-blue-600 text-xl transition">{currency?.cur}</button>

                        {/* <!-- Profile Dropdown --> */}
                        <div className="relative group">
                            {/* <!-- Profile Avatar Button --> */}
                            <img
                                src={
                                    user.image
                                        ? user.image.startsWith('http')
                                            ? user.image
                                            : `http://localhost:8000/storage/${user.image}`
                                        : '/img/default.png'
                                }
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 group-hover:border-blue-500 transition"
                            />


                            {/* <!-- Dropdown Menu --> */}
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-150 z-50"
                            >
                                <Link to="/bookings" className="block px-4 py-2 text-gray-700 text-md hover:bg-gray-100"><FontAwesomeIcon icon={faPlaneDeparture} /> My Bookings</Link>
                                <Link to="/settings" className="block px-4 py-2 text-gray-700 text-md hover:bg-gray-100"><FontAwesomeIcon icon={faGear} /> Setting</Link>
                                <a onClick={() => logOut()} className="block px-4 py-2 text-red-600 text-md hover:bg-red-100"><FontAwesomeIcon icon={faRightFromBracket} /> Sign Out</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {currencyModal && (
                <Currency currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />
            )}
        </div>
    )
}

export default Navbar
