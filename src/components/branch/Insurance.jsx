import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


function Insurance({ t, currency, fromErrors, paymentData, handleChange }) {
    return (
        <div className='w-full'>
            <div className='border shadow-sm border-gray-300 w-full rounded-lg'>

                {/* Insurance */}
                <div className="bg-white p-4 ">
                    <h3 className="font-medium mb-3">{t('insurance')}</h3>
                    <div className="space-y-4">

                        {/* Yes option */}
                        <label className="flex gap-3 items-start">
                            <input
                                type="radio"
                                name="insurance"
                                value="yes"
                                checked={paymentData.insurance === 'yes'}
                                onChange={handleChange}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-semibold">{t('yes')}</p>
                                <ul className="text-sm list-disc pl-5 text-gray-600">
                                    <li>{t('travelIn')}</li>
                                    <li>{t('lose')}</li>
                                    <li>{t('delay')}</li>
                                    <li>{t('personal')}</li>
                                </ul>
                                <p className="mt-1 text-sm font-medium text-red-500">{currency?.cur} {(7.11 * (currency?.rate)).toFixed(2)}</p>
                            </div>
                        </label>

                        {/* No option */}
                        <label className="flex gap-3 items-start">
                            <input
                                type="radio"
                                name="insurance"
                                value="no"
                                checked={paymentData.insurance === 'no'}
                                onChange={handleChange}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-semibold">{t('noInsurance')}</p>
                                <p className="text-sm text-gray-600">{t('noConfirmation')}</p>
                                <p className="mt-1 text-sm font-medium text-red-500">{currency?.cur} 0.00</p>
                            </div>
                        </label>
                    </div>
                    {fromErrors?.insurance && <p className='text-sm text-red-500'>{fromErrors.insurance}</p>}
                </div>

                {/* Terms & Continue Button */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">
                        By proceeding with this booking, I agree to Agoda’s <a href="#" className="text-blue-600">Terms of Use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
                    </p>
                </div>

            </div>
            <div className='w-full flex justify-end mt-4'>

                <button className="bg-blue-600  text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition">
                    Continue to payment <FontAwesomeIcon icon={faChevronRight} />
                </button>

            </div>
        </div>
    )
}

export default Insurance
