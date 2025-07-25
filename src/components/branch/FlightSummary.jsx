import { React, useEffect } from 'react'


function FlightSummary({ t, flightSummary, currency, paymentData, setPaymentData }) {

    const sumPrices = (prices) => {
        if (Array.isArray(prices)) {
            return prices.reduce((acc, val) => acc + Number(val || 0), 0);
        }
        return Number(prices || 0);
    };


    const calculateTotal = (base, seat, kg, insurance, classPrice) => (
        Number(base || 0) +
        Number(seat || 0) +
        Number(kg || 0) +
        Number(classPrice || 0) +
        Number(insurance || 0)
    ).toFixed(2);

    const totalSeatPrice = sumPrices(paymentData.seatPrice);
    const totalKgPrice = sumPrices(paymentData.kgPrice);

    const flightPrice = Array.isArray(flightSummary)
        ? (flightSummary[0]?.price || 0) + (flightSummary[1]?.price || 0)
        : (flightSummary?.price || 0);

    const total = calculateTotal(
        flightPrice * currency?.rate,
        totalSeatPrice,
        totalKgPrice,
        Number(paymentData.insurancePrice),
        Number(paymentData.classPrice)
    );

    // Optional: Save total to paymentData if needed
    useEffect(() => {
        setPaymentData(prev => ({
            ...prev,
            total: Number(total)
        }));
    }, [total]);
    return (
        <div>
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl p-4 text-white font-medium">
                    {
                        Array.isArray(flightSummary) ? (
                            flightSummary.map((flight, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-md">{flight.FromCity} → {flight.ToCity}</h3>
                                    <p className="text-xs text-gray-500">
                                        {new Date(flight.departure_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })} · 1 Passenger · {paymentData.class || 'economy'}
                                    </p>
                                    <div className="flex gap-2">
                                        <img src={flight.airline_logo} className="h-5 w-5" alt="" />
                                        <p className="text-sm text-gray-700">{flight.airline}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(flight.departure_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })} · {flight.fromTime} - {flight.toTime} · {flight.duration}
                                    </p>
                                    <hr className="my-2" />
                                </div>
                            ))
                        ) : (
                            <div>
                                <h3 className="font-semibold text-md">{flightSummary.FromCity} → {flightSummary.ToCity}</h3>
                                <p className="text-sm">
                                    {new Date(flightSummary.departure_date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })} · 1 Passenger · {paymentData.class || 'economy'}
                                </p>
                                <div className="flex gap-2">
                                    <img src={flightSummary.airline_logo} className="h-5 w-5" alt="" />
                                    <p className="text-sm text-gray-700">{flightSummary.airline}</p>
                                </div>
                                <p className="text-sm text-gray-700">
                                    {new Date(flightSummary.departure_date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })} · {flightSummary.fromTime} - {flightSummary.toTime} · {flightSummary.duration}
                                </p>
                                <hr className="my-2" />
                            </div>
                        )
                    }
                    <p className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">{t('baggagePolicy')}</p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white border border-gray-300 shadow rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Price breakdown</h4>
                    <div className="flex justify-between">
                        <span>Adult</span>
                        <span>{currency?.cur} {((flightPrice - 5.52) * (currency?.rate)).toFixed(2)} x 1</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Taxes and fees</span>
                        <span>{currency?.cur} {(5.52 * (currency?.rate)).toFixed(2)}</span>
                    </div>
                    {(paymentData.seatPrice || paymentData.kgPrice || paymentData.classPrice || paymentData.insurancePrice) && (
                        <div>  <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-gray-600">
                                <span>SubTotal</span>
                                {Array.isArray(flightSummary) ? (
                                    <span>{((flightSummary[0].price + flightSummary[1].price) * (currency?.rate)).toFixed(2)}</span>
                                ) : (
                                    <span>{(flightSummary.price * (currency?.rate)).toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    )}
                    {paymentData.seatPrice && (
                        <div className="flex justify-between  text-gray-600">
                            <span>Seat Selection</span>
                            <span>{totalSeatPrice}</span>
                        </div>
                    )}
                    {paymentData.kgPrice && (
                        <div className="flex justify-between  text-gray-600">
                            <span>Checked Baggage</span>
                            <span>{totalKgPrice}</span>
                        </div>
                    )}
                    {paymentData.classPrice && (
                        <div className="flex justify-between  text-gray-600">
                            <span>ClassPrice</span>
                            <span>{paymentData.classPrice}</span>
                        </div>
                    )}
                    {paymentData.insurancePrice && (
                        <div className="flex justify-between  text-gray-600">
                            <span>Insurance Price</span>
                            <span>{paymentData.insurancePrice}</span>
                        </div>
                    )}
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold text-gray-600">
                        <span>Total</span>
                        {currency?.cur} {total}
                    </div>
                </div>

                {/* Booking Conditions */}
                <div className='bg-white border p-5    border-gray-300 shadow rounded-xl  text-md text-gray-600 space-y-2'>
                    <div className='text-lg text-gray-600 sticky top-0 z-30  font-medium'>Booking Conditions</div>
                    <ul className="h-48 list-disc ml-6 -z-10 overflow-y-auto">
                        <li>Passenger(s) are responsible for ensuring that all necessary travel documents are valid and available upon travel.</li>
                        <br />
                        <li>Please ensure that your contact information in your booking is correct. We cannot be held responsible for any issues resulting from inaccurate contact details.</li>
                        <br />
                        <li>If you make changes to your flights directly with the airline or the airline(s) make changes, they may contact you. Agoda will notify you if informed.</li>
                        <br />
                        <li>Once the booking is confirmed, any changes or cancellations are subject to the estimated ticket policies attached to your reservation, which may differ from the airline's. Certain tickets are non-changeable and non-refundable. All tickets are non-transferable under any circumstances, unless communicated otherwise.</li>
                        <br />
                        <li>Any changes or cancellations to your flight booking through Agoda may be subject to an additional charge of up to US$50 per passenger per change. Note that this is in addition to any applicable charges by intermediary travel suppliers and airlines.</li>
                        <br />
                        <li>Please visit the airline's official website for the latest flight details, including departure times, terminals, and terms and conditions of carriage. Add-on services such as baggage, seats, meals, and other offerings may be added directly on the airline's official website and may incur additional charges.</li>
                        <br />
                        <li>In the event any government-imposed taxes on the purchased air transportation are raised or imposed before your scheduled flight, you may be required to pay the newly imposed or increased tax or fee.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FlightSummary
