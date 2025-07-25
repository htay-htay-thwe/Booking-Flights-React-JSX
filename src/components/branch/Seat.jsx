import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons';

function Seat({ t, bookSeats, flightSummary, currency, paymentData, setPaymentData, setSelectSeat, selectSeat, setSelectedSeat, seatRows }) {
    const [tempSeat, setTempSeat] = useState(null);
    const [tempSeatPrice, setTempSeatPrice] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    console.log(bookSeats);
    const getSeatPrice = (seatId) => {
        const row = parseInt(seatId.match(/\d+/)[0]);
        return (row >= 15 && row <= 31) ? (6.35 * currency?.rate).toFixed(2) : (9.35 * currency?.rate).toFixed(2);
    };

    const handleOpen = (index) => {
        setSelectedIndex(index);
        if (index !== null && index !== undefined) {
            setTempSeat(paymentData.seat?.[index] || '');
            setTempSeatPrice(paymentData.seatPrice?.[index] || '');
        } else {
            setTempSeat(paymentData.seat || '');
            setTempSeatPrice(paymentData.seatPrice || '');
        }
        setSelectSeat(true);
    };

    const handleConfirm = () => {
        if (selectedIndex !== null && selectedIndex !== undefined) {
            setPaymentData(prev => {
                const chooseSeat = [...(prev.seat || [])];
                const seatPrice = [...(prev.seatPrice || [])];
                chooseSeat[selectedIndex] = tempSeat;
                seatPrice[selectedIndex] = tempSeatPrice;
                return { ...prev, seat: chooseSeat, seatPrice: seatPrice };
            });
        } else {
            setPaymentData(prev => ({
                ...prev,
                seat: String(tempSeat),
                seatPrice: String(tempSeatPrice)
            }));
        }
        setSelectedSeat(tempSeat);
        setSelectSeat(false);
    };

    const handleClose = () => {
        setSelectSeat(false);
        setTempSeat(null);
        setTempSeatPrice(null);
    };

    return (
        <div className='rounded-lg shadow border p-4 border-gray-300'>
            {Array.isArray(flightSummary) ? flightSummary.map((flight, index) => (
                <div key={index} className="bg-white">
                    <div className='flex items-center'>
                        <img src="/img/holiday.png" className='w-14 h-14' />
                        <h3 className="font-medium mb-2 text-xl mt-4">Seat selection</h3>
                        <div className='flex gap-3 ml-3 text-blue-500 font-semibold'>
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
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{t('seatSelection')}</p>
                    {paymentData.seat?.[index] && (
                        <div className='flex gap-3'>
                            <div className='w-28 text-red-700 bg-red-200 p-1 rounded text-xl font-medium mt-4'>
                                Seat no. {paymentData.seat?.[index]}
                            </div>
                            <div className='text-green-800 font-medium p-1 text-xl rounded bg-green-200 mt-4'>
                                {paymentData.seatPrice?.[index]} {currency?.cur}
                            </div>
                        </div>
                    )}
                    <button onClick={() => handleOpen(index)} className="mt-3 text-blue-600 text-lg font-medium hover:underline">
                        {t('seatSelect')}
                    </button>
                </div>
            )) : (
                <div className="bg-white">
                    <div className='flex items-center'>
                        <img src="/img/holiday.png" className='w-14 h-14' />
                        <h3 className="font-medium mb-2 text-xl mt-4">Seat selection</h3>
                        <div className='flex gap-3 ml-3 text-blue-500 font-semibold'>
                            <div className="mt-2">{flightSummary.FromCity}
                                {flightSummary.airport_code_from != null && (
                                    (flightSummary.airport_code_from)
                                )}</div>
                            <div>__</div>
                            <div className="mt-2">{flightSummary.ToCity}
                                {flightSummary.airport_code_to != null && (
                                    (flightSummary.airport_code_to)
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{t('seatSelection')}</p>
                    {paymentData.seat && (
                        <div className='flex gap-3'>
                            <div className='w-28 text-red-700 bg-red-200 p-1 rounded text-xl font-medium mt-4'>
                                Seat no. {paymentData.seat}
                            </div>
                            <div className='text-green-800 font-medium p-1 text-xl rounded bg-green-200 mt-4'>
                                {paymentData.seatPrice} {currency?.cur}
                            </div>
                        </div>
                    )}
                    <button onClick={() => handleOpen(null)} className="mt-3 text-blue-600 text-lg font-medium hover:underline">
                        {t('seatSelect')}
                    </button>
                </div>
            )}

            {selectSeat && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl h-[95vh] sm:h-[90vh] relative overflow-hidden flex flex-col">
                        <button onClick={handleClose} className="absolute top-3 right-3 text-xl text-gray-400 hover:text-gray-600 z-10">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>

                        <div className="p-4 overflow-y-auto flex-1">
                            <h2 className="text-xl font-medium mb-1">Seat Selection</h2>
                            {(() => {
                                const selectedFlight = Array.isArray(flightSummary)
                                    ? flightSummary[selectedIndex] || {}
                                    : flightSummary;

                                return (
                                    <div className="border-b flex justify-center gap-3 border-gray-500 text-center font-medium pb-2 text-md">
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

                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-500 w-5 h-5 rounded"></div>
                                    <span>{t('notAvail')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-500 w-5 h-5 rounded"></div>
                                    <span>{currency?.cur} {(6.35 * currency?.rate).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500 w-5 h-5 rounded"></div>
                                    <span>{currency?.cur} {(9.35 * currency?.rate).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-700 w-5 h-5 rounded flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faCheckDouble} className="text-xs" />
                                    </div>
                                    <span>{t('select')}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 items-center h-[40vh] sm:h-[50vh] overflow-y-auto mt-6">
                                {Object.entries(seatRows).map(([row, rowSeats]) => {
                                    const left = rowSeats.filter(seat => ['A', 'B', 'C'].includes(seat.id.slice(-1)));
                                    const right = rowSeats.filter(seat => ['D', 'E', 'F'].includes(seat.id.slice(-1)));
                                    console.log('s', right);

                                    return (
                                        <div key={row} className='flex gap-6 items-center px-3 py-2 rounded'>
                                            <div className="flex gap-2">
                                                {left.map(seat => {


                                                    const isSelected = tempSeat === seat.id;
                                                    const booked = Array.isArray(bookSeats?.[selectedIndex])
                                                        ? bookSeats?.[selectedIndex]?.includes(seat.id)
                                                        : bookSeats?.includes?.(seat.id);
                                                    // const price = parseInt(row) <= 14 ? 9.78 : 6.23;
                                                    const bgClass = isSelected
                                                        ? 'bg-gray-700 text-white'
                                                        : booked
                                                            ? 'bg-red-500'
                                                            : parseInt(row) <= 14
                                                                ? 'bg-green-500 text-white'
                                                                : parseInt(row) > 14
                                                                    ? 'bg-blue-500 text-white'
                                                                    : 'bg-gray-200 text-gray-700';

                                                    return (
                                                        <div
                                                            key={seat.id}
                                                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center text-sm font-medium cursor-pointer ${bgClass}`}
                                                            onClick={() => {
                                                                if (!booked) {
                                                                    const newSeat = tempSeat === seat.id ? null : seat.id;
                                                                    const price = newSeat ? getSeatPrice(seat.id) : null;
                                                                    setTempSeat(newSeat);
                                                                    setTempSeatPrice(price);
                                                                }
                                                            }}
                                                        >
                                                            {booked ? <FontAwesomeIcon icon={faXmark} className='text-xl text-white' /> : isSelected ? <FontAwesomeIcon icon={faCheckDouble} className="text-md" /> : seat.id}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="w-6 sm:w-10"></div>
                                            <div className="flex gap-2">
                                                {right.map(seat => {

                                                    const isSelected = tempSeat === seat.id;
                                                    const booked = Array.isArray(bookSeats?.[selectedIndex])
                                                        ? bookSeats?.[selectedIndex]?.includes(seat.id)
                                                        : bookSeats?.includes?.(seat.id);
                                                    const bgClass = isSelected
                                                        ? 'bg-gray-700 text-white'
                                                        : booked
                                                            ? 'bg-red-500'
                                                            : parseInt(row) <= 14
                                                                ? 'bg-green-500 text-white'
                                                                : parseInt(row) > 14
                                                                    ? 'bg-blue-500 text-white'
                                                                    : 'bg-gray-200 text-gray-700';

                                                    return (
                                                        <div
                                                            key={seat.id}
                                                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center text-sm font-medium cursor-pointer ${bgClass}`}
                                                            onClick={() => {
                                                                if (!booked) {
                                                                    const newSeat = tempSeat === seat.id ? null : seat.id;
                                                                    const price = newSeat ? getSeatPrice(seat.id) : null;
                                                                    setTempSeat(newSeat);
                                                                    setTempSeatPrice(price);
                                                                }
                                                            }}
                                                        >
                                                            {booked ? <FontAwesomeIcon icon={faXmark} className='text-xl text-white' /> : isSelected ? <FontAwesomeIcon icon={faCheckDouble} className="text-md" /> : seat.id}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between items-center mt-6 flex-wrap gap-3 max-w-2xl mx-auto">
                                <div className="text-green-600 font-semibold text-lg">
                                    {currency?.cur} {(tempSeatPrice * currency?.rate).toFixed(2) || '0.00'}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleClose} className="text-sm sm:text-md px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
                                        Close
                                    </button>
                                    <button onClick={handleConfirm} className="text-sm sm:text-md px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Confirm
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Seat;
