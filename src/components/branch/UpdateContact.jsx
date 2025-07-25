import { React, useEffect, useState } from 'react'
import { api } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchReserveFlight } from '../../redux/action/fetch';


function UpdateContact({ t, reserve, setIsEditing }) {
    const [fromErrors, setFromErrors] = useState({});
    const dispatch = useDispatch();
    const parseBirthday = (birthdayString) => {
        if (!birthdayString) return { day: '', month: '', year: '' };
        const [year, month, day] = birthdayString.split('-');
        return {
            day: day.startsWith('0') ? day.slice(1) : day,
            month: month.startsWith('0') ? month.slice(1) : month,
            year
        };
    };

    const isArray = Array.isArray(reserve);
    const first = isArray ? reserve[0] : reserve;

    const [paymentData, setPaymentData] = useState({
        id: [],
        flight_id: first?.flight_id || null,
        user_id: first?.user_id || null,
        cart_id: first?.cart_id || null,
        firstName: first?.firstName || null,
        lastName: first?.lastName || null,
        email: first?.email || null,
        country: first?.country || null,
        country_code: first?.country_code || null,
        phone_no: first?.phone_no || null,
        nationality: first?.nationality || null,
        passenger_first_name: first?.passenger_first_name || null,
        passenger_last_name: first?.passenger_last_name || null,
        gender: first?.gender || null,
        birthday: parseBirthday(first?.birthday),
    });


    useEffect(() => {
        if (reserve) {
            const ids = Array.isArray(reserve) && reserve.length > 0
                ? reserve.map(f => f.id)
                : reserve && reserve.id
                    ? [reserve.id]
                    : [];

            setPaymentData(prev => ({
                ...prev,
                id: ids,
            }));
        }
    }, [reserve]);

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

        return errors;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({ ...prev, [name]: value }));
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
    const countryArray = useSelector(state => state.flights.country);
    const countryOptions = countryArray.map((co) => ({
        value: co.country,
        label: ` ${co.country}`,
    }));
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

    const codeOptions = countryArray.map((co) => ({
        value: co.country,
        label: ` ${co.country} (+${co.calling_code})`,
        shortLabel: `+${co.calling_code}`,
    }));
    const handleCodeChange = (selectedOption) => {
        setPaymentData((prev) => ({
            ...prev,
            country_code: selectedOption
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const errors = validate(paymentData);
        setFromErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                const res = await api.post('/update-reservation/passenger/info', paymentData);
                setIsEditing(false);
                dispatch(fetchReserveFlight(res.data));
            } catch (err) {
                console.error('Failed to update', err);
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSave} className="space-y-6 mt-5">
                {/* Contact Details */}
                <div className="shadow p-8 border border-gray-300 space-y-4 rounded-lg">
                    <h2 className="text-xl font-bold">{t('updateDetail')}</h2>
                    <p>T{t('dataSent')}</p>

                    <div>
                        <label className="block font-medium">{t('firstName')} *</label>
                        <input type="text" name="firstName" value={paymentData.firstName} onChange={handleChange} className="w-full border rounded px-3 py-2 h-10 border-gray-400" />
                        {fromErrors?.firstName && <p className='text-sm text-red-500'>{fromErrors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">{t('lastName')} *</label>
                        <input type="text" name="lastName" value={paymentData.lastName} onChange={handleChange} className="w-full border rounded px-3 py-2 h-10 border-gray-400" />
                        {fromErrors?.lastName && <p className='text-sm text-red-500'>{fromErrors.lastName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">{t('email')} *</label>
                        <input type="email" name="email" value={paymentData.email} onChange={handleChange} className="w-full border rounded px-3 py-2 h-10 border-gray-400" />
                        {fromErrors?.email && <p className='text-sm text-red-500'>{fromErrors.email}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">{t('residenceCountry')} *</label>
                        <Select
                            options={countryOptions}
                            value={countryOptions.find(option => option.value === paymentData.country?.value || option.value === paymentData.country)}
                            onChange={handleCountryChange}
                            placeholder="Select a country"
                            isClearable
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: '#99A1AF',
                                    boxShadow: state.isFocused ? '0 0 0 1px #99A1AF' : 'none',
                                    minHeight: '42px',
                                }),
                            }}
                        />
                        {fromErrors?.country && <p className='text-sm text-red-500'>{fromErrors.country}</p>}
                    </div>

                    <div className="flex gap-2">
                        <div className="w-1/3">
                            <label className="block font-medium">{t('countryCode')} *</label>
                            <Select
                                options={codeOptions}
                                value={codeOptions.find(option => option.shortLabel === paymentData.country_code?.value || option.shortLabel === paymentData.country_code)}
                                onChange={handleCodeChange}
                                placeholder="Select"
                                isClearable
                                formatOptionLabel={(option, { context }) =>
                                    context === "menu" ? option.label : option.shortLabel
                                }
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: '#99A1AF',
                                        boxShadow: state.isFocused ? '0 0 0 1px #99A1AF' : 'none',
                                        minHeight: '42px',
                                    }),
                                }}
                            />
                            {fromErrors?.country_code && <p className='text-sm text-red-500'>{fromErrors.country_code}</p>}
                        </div>

                        <div className="w-2/3">
                            <label className="block font-medium">{t('phone')} *</label>
                            <input type="text" name="phone_no" value={paymentData.phone_no} onChange={handleChange} className="w-full border rounded px-3 py-2 h-10 border-gray-400" />
                            {fromErrors?.phone_no && <p className='text-sm text-red-500'>{fromErrors.phone_no}</p>}
                        </div>
                    </div>
                </div>

                {/* Passenger Section */}
                <div className='shadow p-8 border border-gray-300 rounded-lg'>
                    <h3 className="font-semibold text-base mb-2">{t('passenger')} 1: ({t('ageLimit')})</h3>
                    <p className="mb-4 text-gray-600">{t('dataPP')}</p>

                    <div className="space-y-4">

                        {/* Passenger Form */}
                        <div className="flex gap-4 items-center">
                            <label className="font-medium">{t('gender')} *</label>
                            <label><input type="radio" value="Male" name="gender" checked={paymentData.gender === 'Male'} onChange={handleChange} className="mr-1" /> {t('male')}</label>
                            <label><input type="radio" value="Female" name="gender" checked={paymentData.gender === 'Female'} onChange={handleChange} className="mr-1" /> {t('female')}</label>
                            {fromErrors?.gender && <p className='text-sm text-red-500'>{fromErrors.gender}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">{t('firstMiddle')} *</label>
                            <input type="text" name="passenger_first_name" value={paymentData.passenger_first_name} onChange={handleChange} className="w-full border rounded px-5 py-2.5 border-gray-400" />
                            {fromErrors?.passenger_first_name && <p className='text-sm text-red-500'>{fromErrors.passenger_first_name}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">{t('lastName')} *</label>
                            <input type="text" name="passenger_last_name" value={paymentData.passenger_last_name} onChange={handleChange} className="w-full border rounded px-3 py-2.5 border-gray-400" />
                            {fromErrors?.passenger_last_name && <p className='text-sm text-red-500'>{fromErrors.passenger_last_name}</p>}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium">{t('day')} *</label>
                                <input type="number" name="day" value={paymentData.birthday.day} onChange={handleBirthdayChange} placeholder="DD" className="w-full border rounded px-3 py-2.5 border-gray-400" />
                                {fromErrors?.birthday?.day && <p className='text-sm text-red-500'>{fromErrors.birthday.day}</p>}
                            </div>
                            <div>
                                <label className="block font-medium">{t('month')} *</label>
                                <select name="month" value={String(paymentData.birthday.month || '')} onChange={handleBirthdayChange} className="w-full border rounded px-3 py-2.5 border-gray-400">
                                    <option value="">Select</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                {fromErrors?.birthday?.month && <p className='text-sm text-red-500'>{fromErrors.birthday.month}</p>}
                            </div>
                            <div>
                                <label className="block font-medium">{t('year')} *</label>
                                <input type="number" value={paymentData.birthday.year} name="year" onChange={handleBirthdayChange} placeholder="YYYY" className="w-full border rounded px-3 py-2.5 border-gray-400" />
                                {fromErrors?.birthday?.year && <p className='text-sm text-red-500'>{fromErrors.birthday.year}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium">{t('nationality')} *</label>
                            <Select
                                options={countryOptions}
                                value={countryOptions.find(option => option.value === paymentData.nationality?.value || option.value === paymentData.nationality)}
                                onChange={handleNationalityChange}
                                placeholder="Nationality"
                                isClearable
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: '#99A1AF',
                                        boxShadow: state.isFocused ? '0 0 0 1px #99A1AF' : 'none',
                                        minHeight: '42px',
                                    }),
                                }}
                            />
                            {fromErrors?.nationality && <p className='text-sm text-red-500'>{fromErrors.nationality}</p>}
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 justify-end'>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UpdateContact
