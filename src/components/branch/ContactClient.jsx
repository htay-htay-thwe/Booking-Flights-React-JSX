import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

function ContactClient({ t, fromErrors, handleBirthdayChange, handleCodeChange, handleNationalityChange, handleCountryChange, paymentData, handleChange, handleSelect, passengers, setIsOpenRadio, isOpenRadio, selectedPassenger, countryOptions, codeOptions }) {
    const formatPassengerName = (passenger) => {
        if (typeof passenger === 'string') return passenger;
        return `${passenger.passenger_first_name} ${passenger.passenger_last_name}`;
    };
    return (
        <div className="space-y-6">
            {/* Contact Section */}
            <div className="shadow p-8 border space-y-3 border-gray-300 rounded-lg">
                <h2 className="text-xl font-bold">{t('contactDetail')}</h2>
                <p>{t('dataSent')}</p>

                <div>
                    <label className="block font-medium">{t('firstName')} *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={paymentData.firstName || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 h-10 border-gray-400"
                    />
                    {fromErrors?.firstName && <p className='text-sm text-red-500'>{fromErrors.firstName}</p>}
                </div>

                <div>
                    <label className="block font-medium">{t('lastName')} *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={paymentData.lastName || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 h-10 border-gray-400"
                    />
                    {fromErrors?.lastName && <p className='text-sm text-red-500'>{fromErrors.lastName}</p>}
                </div>

                <div>
                    <label className="block font-medium">{t('email')} *</label>
                    <input
                        type="email"
                        name="email"
                        value={paymentData.email || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 h-10 border-gray-400"
                    />
                    {fromErrors?.email && <p className='text-sm text-red-500'>{fromErrors.email}</p>}
                </div>

                <div>
                    <label className="block font-medium">{t('residenceCountry')} *</label>
                    <Select
                        options={countryOptions}
                        value={paymentData.country}
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
                            value={paymentData.country_code}
                            onChange={handleCodeChange}
                            placeholder="Select code"
                            isSearchable
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
                        <input
                            type="text"
                            name="phone_no"
                            value={paymentData.phone_no || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-10 border-gray-400"
                        />
                        {fromErrors?.phone_no && <p className='text-sm text-red-500'>{fromErrors.phone_no}</p>}
                    </div>
                </div>
            </div>

            {/* Passenger Section */}
            <div className="shadow p-8 space-y-3 border border-gray-300 rounded-lg">
                <h3 className="font-semibold text-base mb-2">{t('passenger')} 1: ({t('ageLimit')})</h3>
                <p className="mb-4 text-gray-600">{t('dataPP')}</p>

                {/* Passenger Selector */}
                <div className="relative w-1/2">
                    <div
                        className="flex p-3 justify-between border w-full border-gray-400 rounded bg-white cursor-pointer"
                        onClick={() => setIsOpenRadio(!isOpenRadio)}
                    >
                        <div>{selectedPassenger}</div>
                        <div><FontAwesomeIcon icon={faChevronDown} /></div>
                    </div>

                    {isOpenRadio && (
                        <div className="absolute w-full border border-gray-400 rounded bg-white mt-1 z-10 shadow-2xl">
                            {passengers.map((passenger, index) => {
                                const name = formatPassengerName(passenger);
                                return (
                                    <label key={index} className="flex items-center z-10 gap-2 p-3 hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="passenger"
                                            value={name}
                                            checked={selectedPassenger === name}
                                            onChange={() => handleSelect(passenger)}
                                        />
                                        {name}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Gender */}
                <div className="flex gap-4 items-center mt-4">
                    <label className="font-medium">{t('gender')} *</label>
                    <label>
                        <input type="radio" value="Male" checked={paymentData.gender === 'Male'} name="gender" onChange={handleChange} className="mr-1" />
                        {t('male')}
                    </label>
                    <label>
                        <input type="radio" value="Female" checked={paymentData.gender === 'Female'} name="gender" onChange={handleChange} className="mr-1" />
                        {t('female')}
                    </label>
                </div>
                {fromErrors?.gender && <p className='text-sm text-red-500'>{fromErrors.gender}</p>}

                {/* Names */}
                <div>
                    <label className="block font-medium">{t('firstMiddle')} *</label>
                    <input
                        type="text"
                        name="passenger_first_name"
                        value={paymentData.passenger_first_name || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-5 py-2.5 border-gray-400"
                    />
                    {fromErrors?.passenger_first_name && <p className='text-sm text-red-500'>{fromErrors.passenger_first_name}</p>}
                </div>
                <div>
                    <label className="block font-medium">{t('lastName')} *</label>
                    <input
                        type="text"
                        name="passenger_last_name"
                        value={paymentData.passenger_last_name || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2.5 border-gray-400"
                    />
                    {fromErrors?.passenger_last_name && <p className='text-sm text-red-500'>{fromErrors.passenger_last_name}</p>}
                </div>

                {/* Birthday */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">{t('day')} *</label>
                        <input
                            type="number"
                            name="day"
                            placeholder="DD"
                            value={paymentData.birthday?.day || ''}
                            onChange={handleBirthdayChange}
                            className="w-full border rounded px-3 py-2.5 border-gray-400"
                        />
                        {fromErrors?.birthday?.day && <p className='text-sm text-red-500'>{fromErrors.birthday.day}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">{t('month')} *</label>
                        <select
                            name="month"
                            value={paymentData.birthday?.month || ''}
                            onChange={handleBirthdayChange}
                            className="w-full border rounded px-3 py-2.5 border-gray-400"
                        >
                            <option value="">Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        {fromErrors?.birthday?.month && <p className='text-sm text-red-500'>{fromErrors.birthday.month}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">{t('year')} *</label>
                        <input
                            type="number"
                            name="year"
                            placeholder="YYYY"
                            value={paymentData.birthday?.year || ''}
                            onChange={handleBirthdayChange}
                            className="w-full border rounded px-3 py-2.5 border-gray-400"
                        />
                        {fromErrors?.birthday?.year && <p className='text-sm text-red-500'>{fromErrors.birthday.year}</p>}
                    </div>
                </div>

                {/* Nationality */}
                <div>
                    <label className="block font-medium">{t('nationality')} *</label>
                    <Select
                        options={countryOptions}
                        value={countryOptions.find(option => option.value === paymentData.nationality) || null}
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
                    {fromErrors?.country && <p className='text-sm text-red-500'>{fromErrors.country}</p>}
                </div>

                {/* Save checkbox */}
                <div className="flex items-center gap-2">
                    <input
                        name="save"
                        type="checkbox"
                        checked={paymentData.save || false}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                    <label>
                        {t('save')} <a href="#" className="text-blue-600">{t('policy')}</a>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default ContactClient
