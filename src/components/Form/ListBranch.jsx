import React, { useState } from 'react'
import PriceDate from '../branch/PriceDate'
import Sorting from '../branch/Sorting'
import Flights from './Flights';
import SearchForm from './SearchForm'
import { fetchFlights, fetchFormData } from '../../redux/action/fetch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { api } from '../../api';

function ListBranch({ t, currency, setSelectedDate, selectedDate, user, formData, handleFromChange, loadAirports, handleSwapPlaces, handleToChange, handleInputChange, flights, handleSelect, options, selected, sortedFlights, setShowCartModal, showCartModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fromErrors, setFromErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formData);
        setFromErrors(errors);

        if (Object.keys(errors).length === 0) {
            const data = {
                tripType: formData.tripType,
                from: formData.from,
                to: formData.to,
                departure_date: formData.departure_date,
                return_date: formData.return_date || "",
            };

            const res = await api.post('/search/airports', data);
            dispatch(fetchFlights(res.data));
            dispatch(fetchFormData(data));
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
        if (formData.tripType == 'round') {
            if (!values.departure_date) {
                errors.departure_date = "*required"
            }
            if (!values.return_date) {
                errors.return_date = "*required"
            }
        }
        if (formData.tripType == 'oneway') {
            if (!values.departure_date) {
                errors.departure_date = "*required"
            }
        }
        return errors;
    }

    return (

        <div>
            {/* Form + Inputs */}
            <SearchForm t={t}
                fromErrors={fromErrors}
                handleSubmit={handleSubmit}
                formData={formData}
                handleFromChange={handleFromChange}
                loadAirports={loadAirports}
                handleSwapPlaces={handleSwapPlaces}
                handleToChange={handleToChange}
                handleInputChange={handleInputChange} />

            {/* Date and Sorting */}
            <div className="space-y-6">
                <PriceDate t={t}
                    currency={currency}
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                    formData={formData}
                    flights={flights} />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <Sorting handleSelect={handleSelect} options={options} selected={selected} />
                </div>

                {/* Flight list - sample */}
                <Flights t={t} currency={currency} steps="departure" formData={formData} user={user} sortedFlights={sortedFlights} setShowCartModal={setShowCartModal} showCartModal={showCartModal} />
            </div>
        </div>
    )
}

export default ListBranch
