import { React, useState, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { faDollarSign, faSun, faClock, faMoon } from "@fortawesome/free-solid-svg-icons";
import ListBranch from './ListBranch';
import { fetchFlights } from '../../redux/action/fetch';
import { api } from '../../api';

function FlightLists({ t, currency, user, handleFromChange, loadAirports, handleToChange, handleSwapPlaces, handleInputChange }) {
    const [sortBy, setSortBy] = useState('price_asc');
    const [sortedFlights, setSortedFlights] = useState([]);
    const [selected, setSelected] = useState('price_asc');
    const [showCartModal, setShowCartModal] = useState(false);
    const dispatch = useDispatch();
    const formData = useSelector(state => state.flights.formData || []);
    const [selectedDate, setSelectedDate] = useState({ dep: '', arr: null });
    const hasFetched = useRef(false);

    useEffect(() => {
        if (formData.departure_date) {
            setSelectedDate({
                dep: formData.departure_date,
                arr: formData.tripType === 'round' ? formData.return_date || null : null,
            });
        }
    }, [formData]);

    const flights = useSelector(state => {
        const data = state.flights.flights;
        return data.flights?.length ? data.flights : data.outbound || [];
    });


    useEffect(() => {
        if (!selectedDate?.dep || !formData.from || !formData.to) return;

        const searchData = {
            ...formData,
            departure_date: selectedDate.dep,
            return_date: selectedDate.arr || '',
        };

        const fetchFlight = async () => {
            try {
                const res = await api.post('/search/airports', searchData);
                if (formData.tripType == 'round') {
                    if (res.data) {
                        dispatch(fetchFlights(res.data));
                        hasFetched.current = false; // reset
                    } else {
                        if (!hasFetched.current) {
                            dispatch(fetchFlights([]));
                            hasFetched.current = true;
                        }
                    }
                } else {
                    if (res.data && Array.isArray(res.data.flights) && res.data.flights.length > 0) {
                        dispatch(fetchFlights(res.data));
                        hasFetched.current = false; // reset
                    } else {
                        if (!hasFetched.current) {
                            dispatch(fetchFlights([]));
                            hasFetched.current = true;
                        }
                    }
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchFlight();
    }, [selectedDate]);



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
            label: t('cheapest'),
            price: `USD ${priceSort[0]?.price || '-'}`,
            duration: `${priceSort[0]?.duration || '-'}`,
        },
        {
            id: 2,
            key: "fastest",
            icon: faClock,
            label: t('fastest'),
            price: `USD ${fastestSort[0]?.price || '-'}`,
            duration: `${fastestSort[0]?.duration || '-'}`,
            iconClass: "text-green-500",
        },
        {
            id: 3,
            key: "earliest",
            icon: faSun,
            label: t('earliest'),
            price: `USD ${earliestSort[0]?.price || '-'}`,
            duration: `${earliestSort[0]?.duration || '-'}`,
            iconClass: "text-yellow-500",
        },
        {
            id: 4,
            key: "latest",
            icon: faMoon,
            label: t('latest'),
            price: `USD ${latestSort[0]?.price || '-'}`,
            duration: `${latestSort[0]?.duration || '-'}`,
            iconClass: "text-yellow-500",
        },
    ], [priceSort, fastestSort, earliestSort, latestSort]);


    const handleSelect = (key) => {
        setSelected(key);
        setSortBy(key);
    };

    //  Sorting effect
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

    return (
        <div>
            <div className="bg-blue-50   shadow">
                <div className={`transition-opacity duration-300 ${showCartModal ? 'opacity-70 pointer-events-none ' : 'opacity-100 pointer-events-auto'}`}>
                    <div className="max-w-6xl p-4 md:p-6 mx-auto rounded">
                        <ListBranch t={t} user={user}
                            currency={currency}
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            formData={formData}
                            handleFromChange={handleFromChange}
                            loadAirports={loadAirports}
                            handleSwapPlaces={handleSwapPlaces}
                            handleToChange={handleToChange}
                            handleInputChange={handleInputChange}
                            flights={flights}
                            handleSelect={handleSelect}
                            options={options}
                            selected={selected}
                            sortedFlights={sortedFlights}
                            setShowCartModal={setShowCartModal}
                            showCartModal={showCartModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightLists


