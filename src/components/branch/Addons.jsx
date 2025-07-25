import React from 'react'

function Addons({ t, currency, fromErrors, paymentData, handleChange }) {
    return (
        <div>
            <div>
                <h2 className="text-lg font-semibold mb-2">{t('addOnsLetter')}</h2>
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Flight upgrades</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Eco */}
                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentData.class === 'eco' ? 'border-blue-600 bg-blue-50' : ''
                                }`}>
                            <div className='flex gap-2'>
                                <input type="radio" className='h-5 w-5' value="eco" name="class"
                                    checked={paymentData.class === 'eco'}
                                    onChange={handleChange} />
                                <h4 className="font-semibold mb-2">Eco</h4>
                            </div>
                            <ul className="text-sm mt-2 space-y-6">
                                <li>✔️ Cabin baggage: 7 kg</li>
                                <li>❌ Checked baggage (extra charge)</li>
                                <li>❌ Refunds</li>
                                <li>❌ Voluntary changes</li>
                                <li>❌ Seat selection</li>
                                <li>❌ Meal</li>
                            </ul>
                            <p className="mt-3 font-semibold text-right">+ {currency?.cur} 0.00</p>
                        </div>

                        {/* Deluxe */}
                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentData.class === 'deluxe' ? 'border-blue-600 bg-blue-50' : ''
                                }`}>
                            <div className='flex gap-2'>
                                <input type="radio" className='h-5 w-5' value="deluxe" name="class"
                                    checked={paymentData.class === 'deluxe'}
                                    onChange={handleChange} />
                                <h4 className="font-semibold mb-2">deluxe</h4>
                            </div>
                            <ul className="text-sm mt-2 space-y-6">
                                <li>✔️ Cabin baggage: 7 kg</li>
                                <li>✔️ Checked baggage: 20 kg</li>
                                <li>❌ Refunds</li>
                                <li>✔️ Voluntary changes</li>
                                <li>✔️ Seat selection</li>
                                <li>❌ Meal</li>
                            </ul>
                            <p className="mt-3 font-semibold text-right">+ {currency?.cur} {(27.24 * (currency?.rate)).toFixed(2)}</p>
                        </div>

                        {/* Skyboss */}
                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentData.class === 'skyboss' ? 'border-blue-600 bg-blue-50' : ''
                                }`}>
                            <div className='flex gap-2'>
                                <input type="radio" className='h-5 w-5' value="skyboss" name="class"
                                    checked={paymentData.class === 'skyboss'}
                                    onChange={handleChange} />
                                <h4 className="font-semibold mb-2">Skyboss</h4>
                            </div>
                            <ul className="text-sm mt-2 space-y-6">
                                <li>✔️ Cabin baggage: 10 kg</li>
                                <li>✔️ Checked baggage: 30 kg</li>
                                <li>✔️ Refunds (with charge)</li>
                                <li>✔️ Voluntary changes</li>
                                <li>✔️ Seat selection</li>
                                <li>✔️ Meal</li>
                            </ul>
                            <p className="mt-3 font-semibold text-right">+ {currency?.cur} {(42.80 * (currency?.rate)).toFixed(2)}</p>
                        </div>
                    </div>
                    {fromErrors?.class && <p className='text-sm text-red-500'>{fromErrors.class}</p>}
                </div>
            </div>
        </div>
    )
}

export default Addons
