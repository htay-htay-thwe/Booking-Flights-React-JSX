import React from 'react'
import From from '../branch/From';
import SwapBtn from '../branch/SwapBtn';
import To from '../branch/To';
import Date from '../branch/Date';

function SearchForm({
    t,
    handleSubmit,
    fromErrors,
    formData,
    handleFromChange,
    loadAirports,
    handleSwapPlaces,
    handleToChange,
    handleInputChange }) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-2 mb-6">
                    <div className="flex-1">
                        <From t={t}
                            fromErrors={fromErrors}
                            from={formData.from}
                            handleFromChange={handleFromChange}
                            loadAirports={loadAirports}
                        />
                    </div>
                    <div className="flex items-center justify-center mb-3">
                        <SwapBtn handleSwapPlaces={handleSwapPlaces} />
                    </div>
                    <div className="flex-1">
                        <To t={t}
                            fromErrors={fromErrors}
                            to={formData.to}
                            handleToChange={handleToChange}
                            loadAirports={loadAirports}
                        />
                    </div>
                    <div className="flex-1 mt-1">
                        <Date t={t}
                            fromErrors={fromErrors}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            tripType={formData.tripType}
                        />
                    </div>
                    <div className="flex justify-end items-end mb-6">
                        <button type='submit' className="px-5 py-2.5 rounded font-semibold bg-blue-500 text-white w-full lg:w-auto">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm
