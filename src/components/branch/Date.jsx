import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFormData } from '../../redux/action/fetch';

function Date({ t, fromErrors, formData, handleInputChange, tripType }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const isFlightsPage = location.pathname === '/flights';
    const isReturnPage = location.pathname === '/return/flight';

    const isRoundTrip = formData?.tripType === 'round' || tripType === 'round';

    const handleRemoveReturn = () => {
        dispatch(fetchFormData({
            ...formData,
            tripType: 'oneway',
            return_date: '',
        }));
    };

    const handleAddReturn = () => {
        handleInputChange({
            target: {
                name: 'tripType',
                value: 'round',
            },
        });
    };

    return (
        <div className="flex flex-1 gap-2 mb-6">
            {/* Departure Date */}
            <div className="flex-1 flex flex-col">
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                    {t('departureDate')}
                </label>
                <input
                    type="date"
                    name="departure_date"
                    value={formData?.departure_date || ''}
                    onChange={handleInputChange}
                    className="w-full h-[42px] px-4 py-2 border border-gray-400 rounded"
                />
                {fromErrors?.departure_date && (
                    <p className="text-sm text-red-500">{fromErrors.departure_date}</p>
                )}
            </div>

            {/* Return Date / Add Return */}
            <div className="flex-1 flex flex-col">
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                    {isRoundTrip ? t('returnDate') : (isFlightsPage || isReturnPage) ? <span className="invisible">Add Return</span> : null}
                </label>

                {isRoundTrip ? (
                    <div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="date"
                                name="return_date"
                                value={formData?.return_date || ''}
                                onChange={handleInputChange}
                                className="flex-grow h-[42px] px-4 py-2 border border-gray-400 rounded"
                            />
                            {(isFlightsPage || isReturnPage) && (
                                <button
                                    type="button"
                                    onClick={handleRemoveReturn}
                                    className="w-[42px] h-[42px] bg-red-100 border border-red-300 text-red-600 rounded hover:bg-red-200 flex items-center justify-center text-lg"
                                    title="Remove Return Date"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                        {fromErrors?.return_date && (
                            <p className="text-sm text-red-500">{fromErrors.return_date}</p>
                        )}
                    </div>
                ) : (
                    (isFlightsPage || isReturnPage) && (
                        <button
                            type="button"
                            onClick={handleAddReturn}
                            className="w-full h-[42px] px-4 py-2 flex text-white items-center justify-center text-md border border-gray-400 rounded bg-blue-500 hover:bg-blue-400"
                        >
                            + Add Return
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

export default Date;



