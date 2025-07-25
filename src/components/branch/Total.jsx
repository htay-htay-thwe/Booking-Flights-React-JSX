import React from 'react'


function Total({ t, currency, reserve, flightPrice, flightSummary }) {

    return (
        <div>
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 mb-5 rounded-xl p-4 text-white font-medium">
                {
                    Array.isArray(flightSummary) ? (
                        flightSummary.map((flight, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-md">{flight.FromCity} → {flight.ToCity}</h3>
                                <p className="text-sm">{new Date(flight.departure_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })} · 1 Passenger · Economy</p>
                                <div className="flex gap-2">
                                    <img src={flight.airline_logo} className="h-5 w-5" alt="" />
                                    <p className="text-sm text-gray-700">{flight.airline}</p>
                                </div>
                                <p className="text-sm text-gray-700">{new Date(flight.departure_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })} · {flight.fromTime} - {flight.toTime} · {flight.duration}</p>
                                <hr className="my-2" />
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3 className="font-semibold text-md">{flightSummary.FromCity} → {flightSummary.ToCity}</h3>
                            <p className="text-sm">{new Date(flightSummary.departure_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })} · 1 Passenger · Economy</p>
                            <div className="flex gap-2">
                                <img src={flightSummary.airline_logo} className="h-5 w-5" alt="" />
                                <p className="text-sm text-gray-700">{flightSummary.airline}</p>
                            </div>
                            <p className="text-sm text-gray-700">{new Date(flightSummary.departure_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })} · {flightSummary.fromTime} - {flightSummary.toTime} · {flightSummary.duration}</p>
                            <hr className="my-2" />
                        </div>
                    )}
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
                {(reserve.seatPrice || reserve.kgPrice || reserve.classPrice || reserve.insurancePrice) && (
                    <div>  <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-gray-600">
                            <span>SubTotal</span>
                            <span>{(flightSummary.price * (currency?.rate)).toFixed(2)}</span>
                        </div>
                    </div>
                )}
                {reserve.seatPrice && (
                    <div className="flex justify-between  text-gray-600">
                        <span>Seat Selection</span>
                        <span>{(reserve.seatPrice * (currency?.rate)).toFixed(2)}</span>
                    </div>
                )}
                {reserve.kgPrice && (
                    <div className="flex justify-between  text-gray-600">
                        <span>Checked Baggage</span>
                        <span>{(reserve.kgPrice * (currency?.rate)).toFixed(2)}</span>
                    </div>
                )}
                {reserve.classPrice && (
                    <div className="flex justify-between  text-gray-600">
                        <span>ClassPrice</span>
                        <span>{(reserve.classPrice * (currency?.rate)).toFixed(2)}</span>
                    </div>
                )}
                {reserve.insurancePrice && (
                    <div className="flex justify-between  text-gray-600">
                        <span>Insurance Price</span>
                        <span>{(reserve.insurancePrice * (currency?.rate)).toFixed(2)}</span>
                    </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-gray-600">
                    <span>Total</span>
                    {currency?.cur} {(flightPrice * (currency?.rate)).toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default Total
