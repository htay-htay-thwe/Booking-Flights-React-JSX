import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Currency({ setCurrency, currency, setCurrencyModal, currencyModal }) {
    console.log(currencyModal);
    const navigate = useNavigate();
    const currencyLists = useSelector(state => state.flights.currencyList);
    const entries = Object.entries(currencyLists || {});
    console.log(entries);


    return (
        <div>

            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg max-h-4/5 max-w-xl w-full relative">
                    {/* Close button (top-right) */}
                    <button
                        onClick={() => setCurrencyModal(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
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

                    {/* Modal content */}
                    <div className='p-7'>
                        <h2 className='text-xl font-semibold'>All Currencies</h2>

                        <div className='grid grid-cols-3 gap-3 mt-8 overflow-y-auto h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]'>
                            {entries.map(([cur, rate]) => {
                                return (
                                    <div
                                        key={cur}
                                        onClick={() => {
                                            setCurrency({ cur, rate });
                                            setCurrencyModal(false);
                                            if (location.pathname === '/checkout') {
                                                navigate('/');
                                            }
                                        }}
                                        className={`text-xl p-2 ${cur === currency.cur ? 'border-blue-300 bg-blue-100' : ''} hover:border-blue-300 rounded-md text-center hover:bg-blue-100 flex items-center`}
                                    >
                                        <div className="w-6 text-start text-blue-400">
                                            {cur === currency.cur && <FontAwesomeIcon icon={faCheck} />}
                                        </div>
                                        <div className="flex-1 text-center text-gray-700">
                                            {cur}
                                        </div>
                                    </div>

                                );
                            })}

                        </div>
                    </div>
                </div>


            </div>
        </div>


    )
}

export default Currency
