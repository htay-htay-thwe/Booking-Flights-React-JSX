import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';


function Modal({ cartOne, showCartModal, setShowCartModal, flight }) {
    console.log('modal', flight);
    const getFlightId = (flight) => {
        return Array.isArray(flight) ? flight[0].id : flight.id;
    };

    return (
        <div className="relative z-60 shadow-2xl">
            {/* Overlay and Modal Container */}
            <div
                className={`fixed inset-0 flex transition-all duration-300 ease-in-out ${showCartModal ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
            >
                {/* Overlay (Dimmed + Blur) */}
                <div className='fixed inset-0 z-40 bg-black/20  transition-opacity duration-300' onClick={() =>
                    setShowCartModal(false)}></div>

                {/* Slide-in Modal */}
                <div
                    className={`ml-auto h-full w-[350px] gap-3 flex flex-col bg-white shadow-lg transition-transform duration-300 z-50
                        ${showCartModal ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <div className="p-4 border-b border-gray-500 flex justify-between items-center">
                        <h2 className="text-lg  text-green-500 font-semibold"> <FontAwesomeIcon icon={faCircleCheck} /> Add Cart Successfully!</h2>
                        <button
                            onClick={() => setShowCartModal(false)}
                            className="text-gray-600 hover:text-black text-2xl"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto  flex gap-2 border-b border-gray-300 ">
                        <img src="/img/eng_flag.jpg" className='w-14 h-14 rounded-md' />
                        <div>
                            <div>From City To City $ USD 29</div>
                            <div className='text-red-500 font-semibold'>Jul 3</div>
                        </div>
                    </div>
                    <div className='border-b border-gray-300 p-4'>
                        <div className='flex justify-center'>
                            <Link to="/flight/cart">
                                <button className='p-3 bg-blue-500 hover:bg-blue-400 font-semibold rounded-full text-white w-72'>
                                    Proceed To Cart
                                </button>
                            </Link>
                        </div>

                        <div className='flex justify-center'>
                            <Link to={`/buy/ticket/${cartOne.id}/${getFlightId(flight)}`}>
                                <button className='p-3 border-gray-400 hover:bg-blue-50 hover:border-blue-500 border font-semibold rounded-full text-blue-500 w-72 mt-3'>
                                    Book this flight only
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-col justify-center items-center gap-1 mt-5'>
                            <div className='text-green-900 font-semibold text-sm'>Add more , save more !</div>
                            <div className='bg-green-100 font-semibold text-green-900 text-xs text-center w-80 rounded-sm'>Book multiple items together to earn bigger savings!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal;
