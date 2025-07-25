import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Kg({ t, flightSummary, currency, paymentData, setPaymentData, setOpen, open }) {
    const [tempKg, setTempKg] = useState(null);
    const [tempKgPrice, setTempKgPrice] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    console.log(paymentData);

    const baggageOptions = [
        { label: 'Not Extra', price: '' },
        { label: '15kg', price: (16.16 * (currency?.rate)).toFixed(2) },
        { label: '20kg', price: (27.89 * (currency?.rate)).toFixed(2) },
        { label: '25kg', price: (22.23 * (currency?.rate)).toFixed(2) },
        { label: '30kg', price: (35.22 * (currency?.rate)).toFixed(2) },
        { label: '35kg', price: (42.16 * (currency?.rate)).toFixed(2) },
        { label: '40kg', price: (52.56 * (currency?.rate)).toFixed(2) },
    ];
    console.log(tempKg);

    const handleOpen = (index) => {
        setSelectedIndex(index);
        if (index !== null && index !== undefined) {
            // Access using kg[index] and kgPrice[index]
            setTempKg(paymentData.kg?.[index] || '');
            setTempKgPrice(paymentData.kgPrice?.[index] || '');
        } else {
            setTempKg(paymentData.kg || '');
            setTempKgPrice(paymentData.kgPrice || '');
        }
        setOpen(true);
    };


    const handleConfirm = () => {
        console.log('tempKg type:', selectedIndex);
        if (selectedIndex !== null && selectedIndex !== undefined) {
            setPaymentData(prev => {
                const updatedKg = Array.isArray(prev.kg) ? [...prev.kg] : [];
                const updatedKgPrice = Array.isArray(prev.kgPrice) ? [...prev.kgPrice] : [];

                updatedKg[selectedIndex] = tempKg;        // tempKg must be a string like "15kg"
                updatedKgPrice[selectedIndex] = tempKgPrice; // tempKgPrice is string like "16.16"

                return {
                    ...prev,
                    kg: updatedKg,
                    kgPrice: updatedKgPrice,
                };
            });
        } else {
            setPaymentData(prev => ({
                ...prev,
                kg: String(tempKg),       // tempKg should be a string
                kgPrice: String(tempKgPrice), // tempKgPrice should be a string
            }));
        }
        setOpen(false);
    };



    const handleClose = () => {
        setOpen(false); // discard changes
    };

    return (
        <div>
            <div className="bg-white w-full border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex gap-2">
                    <img src="/img/BaggageAddOnTitleIcon.svg" className="h-12 w-12" />
                    <h3 className="font-medium mb-3 text-xl mt-2">Baggage</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                    {t('checkIn')}
                </p>
                <div className="flex flex-col border-t pt-2 gap-3">
                    {Array.isArray(flightSummary) ? (
                        flightSummary.map((flight, index) => (
                            <div key={index}>
                                <div className="flex space-x-3 text-md font-semibold">
                                    <img src="/img/BaggageAddOnTitleIcon.svg" className="w-8 h-8" />
                                    <div className="mt-2">{flight.FromCity}
                                        {flight.airport_code_from != null && (
                                            (flight.airport_code_from)
                                        )}</div>
                                    <div>__</div>
                                    <div className="mt-2">{flight.ToCity}
                                        {flight.airport_code_to != null && (
                                            (flight.airport_code_to)
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-3 text-md font-semibold">
                                    <img src="/img/cabin-bag.png" className="w-5 h-5" />
                                    <div>
                                        <div>Carry-on bags</div>
                                        <div className="font-medium text-xs text-gray-500 bg-blue-100 p-1 rounded-sm">
                                            <FontAwesomeIcon icon={faSuitcaseRolling} /> included 1 x 7 kg / Adult
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between max-w-lg">
                                    <div className="flex space-x-3 text-md font-semibold">
                                        <img src="/img/checked-bag.png" className="h-5" />
                                        <div>
                                            <div>Check bags</div>
                                            <div className="font-medium text-xs mb-1 text-red-500 bg-red-100 p-1 rounded-sm">
                                                <FontAwesomeIcon icon={faSuitcaseRolling} /> Not included / Adult
                                            </div>
                                            {
                                                paymentData.kgPrice?.[index] && (
                                                    <div className="font-medium text-xs bg-green-200 text-green-500 p-1 rounded-sm">
                                                        <FontAwesomeIcon icon={faSuitcaseRolling} /> {paymentData.kg?.[index]} . Passenger 1
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleOpen(index)}
                                        className="text-blue-600 font-medium hover:bg-blue-100 p-3 border rounded-full px-5 border-blue-500 text-md h-12 mt-10"
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="text-lg" />{' '}
                                        {paymentData[index]?.kgPrice ? t('edit') : t('addBag')}
                                    </button>
                                </div>
                            </div>
                        ))) : (
                        <div>
                            <div className="flex space-x-3 text-md font-semibold">
                                <img src="/img/BaggageAddOnTitleIcon.svg" className="w-8 h-8" />
                                <div className="mt-2">{flightSummary.FromCity}
                                    {flightSummary.airport_code_from != null && (
                                        (flightSummary.airport_code_from)
                                    )}</div>
                                <div>__</div>
                                <div className="mt-2">{flightSummary.to}
                                    {flightSummary.airport_code_to != null && (
                                        (flightSummary.airport_code_to)
                                    )}</div>
                            </div>
                            <div className="flex space-x-3 text-md font-semibold">
                                <img src="/img/cabin-bag.png" className="w-5 h-5" />
                                <div>
                                    <div>Carry-on bags</div>
                                    <div className="font-medium text-xs text-gray-500 bg-blue-100 p-1 rounded-sm">
                                        <FontAwesomeIcon icon={faSuitcaseRolling} /> included 1 x 7 kg / Adult
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between max-w-lg">
                                <div className="flex space-x-3 text-md font-semibold">
                                    <img src="/img/checked-bag.png" className="h-5" />
                                    <div>
                                        <div>Check bags</div>
                                        <div className="font-medium text-xs text-red-500 bg-red-100 p-1 rounded-sm">
                                            <FontAwesomeIcon icon={faSuitcaseRolling} /> Not included / Adult
                                        </div>
                                        {paymentData.kgPrice !== null && paymentData.kgPrice !== '' && (
                                            <div>
                                                <div className="text-sm text-green-400 font-light">Extra bags:</div>
                                                <div className="font-medium text-xs bg-green-200 text-green-500 p-1 rounded-sm">
                                                    <FontAwesomeIcon icon={faSuitcaseRolling} /> {paymentData.kg} . Passenger 1
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleOpen(null)}
                                    className="text-blue-600 font-medium hover:bg-blue-100 p-3 border rounded-full px-5 border-blue-500 text-md h-12 mt-10"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="text-lg" />{' '}
                                    {paymentData.kgPrice !== null && paymentData.kgPrice !== '' ? t('edit') : t('addBag')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl h-[90vh] md:h-[80vh] relative flex flex-col">

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
              1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
              1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
              10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Modal Header Image */}
                        <img src="/img/baggage-checkin-hero.svg" className="w-full rounded-t-xl h-40 object-cover" />

                        {/* Modal Content */}
                        <div className="p-4 md:p-6 overflow-y-auto flex-1">
                            <h2 className="text-xl font-medium">Checked Baggage</h2>
                            {(() => {
                                const selectedFlight = Array.isArray(flightSummary)
                                    ? flightSummary[selectedIndex] || {}
                                    : flightSummary;

                                return (
                                    <div className="flex flex-wrap gap-2 text-md font-semibold mt-1">
                                        <div>
                                            {selectedFlight.FromCity}
                                            {selectedFlight.airport_code_from && ` (${selectedFlight.airport_code_from})`}
                                        </div>
                                        <div>→</div>
                                        <div>
                                            {selectedFlight.ToCity || selectedFlight.to}
                                            {selectedFlight.airport_code_to && ` (${selectedFlight.airport_code_to})`}
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="mt-4 font-medium text-lg">Passenger 1: Adult</div>
                            <div className="text-red-600 mb-4 flex flex-wrap items-center gap-2">
                                <FontAwesomeIcon icon={faSuitcaseRolling} className="mt-1" /> Not Included
                                {tempKg !== 'Not Extra' && tempKg && (
                                    <div className="text-green-500">
                                        <FontAwesomeIcon icon={faArrowRight} /> {tempKg}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {baggageOptions.map((option) => (
                                    <div
                                        key={option.label}
                                        onClick={() => {
                                            setTempKg(option.label);
                                            setTempKgPrice(option.price);
                                        }}
                                        className={`p-4 text-center text-md font-medium rounded-xl cursor-pointer transition-all duration-150 ${tempKg === option.label
                                            ? 'border-blue-500 text-blue-500 border-2'
                                            : 'border border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        {option.label}
                                        <div className={`text-sm mt-1 ${tempKg === option.label ? 'text-blue-500' : 'text-gray-600'}`}>
                                            {option.price ? `${currency?.cur} ${option.price}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
                            <button
                                onClick={handleClose}
                                className="border border-gray-400 px-5 py-2 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Kg;
