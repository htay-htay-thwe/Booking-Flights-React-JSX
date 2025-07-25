import React from 'react'

function Outbound({ currency, outbound }) {

    return (
        <div>
            <div className='text-xl font-semibold text-blue-500 mb-3'>Departure to {outbound.ToCity}</div>
            <div className="max-w-6xl mx-auto rounded-2xl p-4 shadow-sm mb-4 bg-white hover:shadow-md transition-shadow duration-200">
                <div className="flex  justify-between  items-center gap-4 p-4">
                    {/* Left Section */}
                    <div className=" flex-col gap-1 hidden md:flex">
                        {/* Cheapest price */}
                        {/* {flight.price == minPrice && (
                                      <div className="text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded w-fit font-semibold">
                                          Cheapest
                                      </div>
                                  )} */}
                        <div className="flex items-center gap-1">
                            <img src={outbound.airline_logo} alt="VietJet" className="h-10 w-10 rounded-full " />
                            <span className="text-sm font-medium">{outbound.airline}</span>
                        </div>
                        <div className="text-green-600 text-sm">Included: 🧳</div>
                    </div>


                    <div className="flex  justify-between text-center gap-0 md:gap-10  w-auto">
                        <div>
                            <div className="text-lg font-semibold">{outbound.fromTime}</div>
                            <p className="text-gray-500 text-sm">{outbound.airport_code_from ? (outbound.airport_code_from) : ''}</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <svg width="120" height="20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="10" y1="10" x2="100" y2="10" stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="100,5 110,10 100,15" fill="#c0c0c0" />
                            </svg>

                            <div className="text-xs text-gray-600">{outbound.duration}</div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold">{outbound.toTime}</div>
                            <p className="text-gray-500 text-sm">{outbound.airport_code_to ? (outbound.airport_code_to) : ''}</p>
                        </div>
                    </div>

                    {/* Toggle button */}
                    <div className="w-auto">
                        <button
                            className="text-red-600 text-lg font-semibold flex items-center justify-end gap-1"
                        >
                            {currency?.cur} {(outbound.price * (currency?.rate ?? 1)).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outbound
