import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Addons from '../branch/Addons';
import Kg from '../branch/kg';
import Seat from '../branch/Seat';
import Insurance from '../branch/Insurance';
import ContactClient from '../branch/ContactClient';
import FlightSummary from '../branch/FlightSummary'
import { api } from '../../api';
import { fetchFlightCheckOut, fetchReserveFlight, fetchSeats } from './../../redux/action/fetch/index';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';

const Ticket = () => {
    const [selectedUpgrade, setSelectedUpgrade] = useState('eco');
    const [insuranceOption, setInsuranceOption] = useState('yes');
    const [selectAddOn, setSelectAddOn] = useState(false);
    const [selectSeat, setSelectSeat] = useState(false);
    const [open, setOpen] = useState(false);
    const [valueKg, setValueKg] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedPassenger, setSelectedPassenger] = useState('Create a new passenger');
    const [isOpenRadio, setIsOpenRadio] = useState(false);
    const currency = useSelector(state => state.flights.currency);
    const { id, flightId } = useParams();
    const user = useSelector(state => state.flights.user);
    const flightSummary = useSelector(state => state.flights.checkout);

    const initialValues = {
        user_id: user.id,
        flight_id: [],
        cart_id: id || null,
        trip_type: '',
        firstName: '',
        lastName: '',
        email: '',
        country: null,
        country_code: null,
        phone_no: '',
        passenger_first_name: '',
        passenger_last_name: '',
        gender: '',
        birthday: {
            day: '',
            month: '',
            year: ''
        },
        nationality: '',
        class: null,
        classPrice: null,
        kg: null,
        seat: null,
        seatPrice: null,
        kgPrice: null,
        insurance: '',
        insurancePrice: '',
        currency: '',
        total: null,
        save: false,
    }
    const [fromErrors, setFromErrors] = useState({});
    const [paymentData, setPaymentData] = useState(initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const outbound = useSelector(state => state.flights.outbound);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const validate = (values) => {
        const errors = {}
        if (!values.firstName) {
            errors.firstName = "*required"
        }
        if (!values.lastName) {
            errors.lastName = "*required"
        }
        if (!values.email) {
            errors.email = "*required"
        }
        if (!values.country) {
            errors.country = "*required"
        }

        if (!values.country_code) {
            errors.country_code = "*required"
        }
        if (!values.phone_no) {
            errors.phone_no = "*required"
        }
        if (!values.passenger_first_name) {
            errors.passenger_first_name = "*required"
        }
        if (!values.passenger_last_name) {
            errors.passenger_last_name = "*required"
        }
        if (!values.gender) {
            errors.gender = "*required"
        }
        if (!values.birthday.day) {
            errors.birthday = { ...(errors.birthday || {}), day: "*required" };
        }
        if (!values.birthday.month) {
            errors.birthday = { ...(errors.birthday || {}), month: "*required" };
        }
        if (!values.birthday.year) {
            errors.birthday = { ...(errors.birthday || {}), year: "*required" };
        }
        if (!values.nationality) {
            errors.nationality = "*required"
        }
        if (!values.class) {
            errors.class = "*required"
        }
        if (!values.insurance) {
            errors.insurance = "*required"
        }

        return errors;
    }

    useEffect(() => {
        if (flightSummary && user?.id) {
            const ids = Array.isArray(flightSummary)
                ? flightSummary.map(f => f?.id).filter(Boolean)
                : [flightSummary?.id].filter(Boolean);

            setPaymentData(prev => ({
                ...prev,
                flight_id: ids,
            }));
        }
    }, [flightSummary]);

    useEffect(() => {

        setPaymentData(prev => ({
            ...prev,
            currency: currency?.cur
        }));

    }, [currency?.cur])

    // checkout flight
    useEffect(() => {
        if (id && flightId) {
            setLoading(true);
            const flightInfo = async () => {
                try {
                    const res = await api.get(`/get/flight/info/${id}/`,);
                    dispatch(fetchFlightCheckOut(res.data));
                    setLoading(false);

                } catch (error) {
                    console.error("Failed to fetch flight info:", error);
                }
            };
            const getSeat = async () => {
                const res = await api.get(`/get/seats/${flightId}`);
                console.log(res.data);
                dispatch(fetchSeats(res.data));
            }
            flightInfo();
            getSeat();
        } else if (flightId) {
            setLoading(true);
            const flightInfo = async () => {
                try {
                    const data = {
                        outbound: outbound.id,
                        flightId: Number(flightId)
                    };
                    const res = await api.post('/direct/get/flight/info/', data);
                    dispatch(fetchFlightCheckOut(res.data));
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch flight info:", error);
                }
            };
            const getSeat = async () => {
                const res = await api.get(`/get/seats/array/${outbound.id}/${flightId}`);
                console.log(res.data);
                dispatch(fetchSeats(res.data));
            }

            flightInfo();
            getSeat();
        }
    }, [id, flightId]);

    const bookSeats = useSelector(state => state.flights.seat);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newInsurancePrice =
            name === 'insurance' && value === 'yes' ? (7.11 * (currency?.rate)).toFixed(2) : null;
        const newClassPrice =
            name === 'class' && value === 'eco' ? null : value === 'deluxe' ? (27.24 * (currency?.rate)).toFixed(2) : value === 'skyboss' ? (42.80 * (currency?.rate)).toFixed(2) : null;
        setPaymentData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'insurance' && { insurancePrice: newInsurancePrice }),
            ...(name === 'class' && { classPrice: newClassPrice })
        }));
    };

    const rows = 31;
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

    const seats = [];

    for (let row = 1; row <= rows; row++) {
        for (let col of columns) {
            seats.push({ id: `${row}${col}` });
        }
    }

    const seatRows = {};

    seats.forEach(seat => {
        const rowNum = seat.id.match(/^\d+/)[0];
        if (!seatRows[rowNum]) seatRows[rowNum] = [];
        seatRows[rowNum].push(seat);
    });

    const countryArray = useSelector(state => state.flights.country);
    const countryOptions = countryArray.map((co) => ({
        value: co.country,
        label: ` ${co.country}`,
    }));
    const codeOptions = countryArray.map((co) => ({
        value: co.country,
        label: ` ${co.country} (+${co.calling_code})`,
        shortLabel: `+${co.calling_code}`,
    }));

    const passengerOptions = useSelector((state) => state.flights.passenger);
    const passengers = ['Create a new passenger', ...passengerOptions];

    const handleSelect = (passenger) => {
        if (passenger === 'Create a new passenger') {
            setSelectedPassenger('Create a new passenger');
            setPaymentData({
                ...paymentData,
                passenger_first_name: '',
                passenger_last_name: '',
                gender: '',
                birthday: { day: '', month: '', year: '' },
                nationality: '',
                save: false,
            });
        } else {
            const fullName = `${passenger.passenger_first_name} ${passenger.passenger_last_name}`;
            setSelectedPassenger(fullName);

            // Convert "2004-01-25" to parts
            const [year, month, day] = passenger.birthday.split('-');
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const monthName = monthNames[parseInt(month, 10) - 1]; // "01" → 0 → "January"

            setPaymentData({
                ...paymentData,
                passenger_first_name: passenger.passenger_first_name,
                passenger_last_name: passenger.passenger_last_name,
                gender: passenger.gender,
                birthday: {
                    day: parseInt(day, 10),
                    month: monthName,
                    year: parseInt(year, 10),
                },
                nationality: passenger.nationality,
                save: Boolean(passenger.save),
            });
        }
        setIsOpenRadio(false);
    };

    useEffect(() => {
        if (open || selectSeat) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [open, selectSeat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(paymentData);
        setFromErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            const res = await api.post('/get/information', paymentData);
            dispatch(fetchReserveFlight(res.data));
            setLoading(false);
            navigate('/checkout');
        }
    }

    const handleCountryChange = (selectedOption) => {
        setPaymentData((prev) => ({
            ...prev,
            country: selectedOption
        }));
    };
    const handleNationalityChange = (selectedOption) => {
        setPaymentData((prev) => ({
            ...prev,
            nationality: selectedOption
        }));
    };
    const handleCodeChange = (selectedOption) => {
        setPaymentData((prev) => ({
            ...prev,
            country_code: selectedOption
        }));
    };

    const handleBirthdayChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({
            ...prev,
            birthday: {
                ...prev.birthday,
                [name]: value,
            },
        }));
    };

    console.log(paymentData);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || jwtDecode(token).exp * 1000 < Date.now()) {
            navigate('/login/page');
        }
    }, [])

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/20 ">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}


            <form onSubmit={handleSubmit} className={loading ? 'opacity-60 pointer-events-none' : ''}>
                <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 text-sm text-gray-700">

                    <div>
                        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-sm text-gray-700">
                            {/* Contact Details */}
                            <ContactClient t={t} handleNationalityChange={handleNationalityChange} fromErrors={fromErrors} handleBirthdayChange={handleBirthdayChange} handleCodeChange={handleCodeChange} handleCountryChange={handleCountryChange} paymentData={paymentData} handleChange={handleChange} handleSelect={handleSelect} passengers={passengers} setIsOpenRadio={setIsOpenRadio} isOpenRadio={isOpenRadio} selectedPassenger={selectedPassenger} setSelectAddOn={setSelectAddOn} selectAddOn={selectAddOn} countryOptions={countryOptions} codeOptions={codeOptions} />

                            <button
                                type="button"
                                onClick={() => setSelectAddOn(true)}
                                className={`${selectAddOn ? 'hidden' : 'bg-blue-600 text-white py-2 px-6 rounded-lg shadow-2xl mt-6 hover:bg-blue-700'}`}
                            >
                                {t('addOns')} <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                            {
                                selectAddOn == true && (
                                    <div className='space-y-6'>
                                        {/* Flight Upgrades */}
                                        <Addons t={t} currency={currency} fromErrors={fromErrors}
                                            paymentData={paymentData}
                                            handleChange={handleChange}
                                            selectedUpgrade={selectedUpgrade}
                                            setSelectedUpgrade={setSelectedUpgrade}
                                        />

                                        {/* Baggage Section */}
                                        <Kg
                                            flightSummary={flightSummary}
                                            t={t}
                                            currency={currency}
                                            setPaymentData={setPaymentData}
                                            paymentData={paymentData}
                                            handleChange={handleChange}
                                            setOpen={setOpen}
                                            open={open}
                                            setValueKg={setValueKg}
                                            valueKg={valueKg}
                                        />

                                        {/* Seat Selection */}
                                        <Seat
                                            bookSeats={bookSeats}
                                            flightSummary={flightSummary}
                                            t={t}
                                            currency={currency}
                                            setPaymentData={setPaymentData}
                                            paymentData={paymentData}
                                            handleChange={handleChange}
                                            setSelectSeat={setSelectSeat}
                                            selectSeat={selectSeat}
                                            setSelectedSeat={setSelectedSeat}
                                            selectedSeat={selectedSeat}
                                            seatRows={seatRows}
                                        />

                                        {/* Insurance */}
                                        <Insurance
                                            t={t}
                                            currency={currency}
                                            fromErrors={fromErrors}
                                            setPaymentData={setPaymentData}
                                            paymentData={paymentData}
                                            handleChange={handleChange}
                                            setInsuranceOption={setInsuranceOption}
                                            insuranceOption={insuranceOption}
                                        />
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {/* Right-side Summary */}

                    <div className="sticky top-6 h-fit">
                        <FlightSummary t={t} flightSummary={flightSummary} currency={currency} paymentData={paymentData} setPaymentData={setPaymentData} />
                    </div>

                </div>
            </form>
        </div >
    );
};

export default Ticket;
