import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';


function SwapBtn({ handleSwapPlaces }) {
  return (
    <div className='mt-4'>
      {/* Swap Button */}
      <button
        type="button"
        onClick={handleSwapPlaces}
        className="pt-2 pb-2 pr-3 pl-3 bg-white border border-gray-400 rounded-full shadow-md hover:bg-gray-100"
        title="Swap From & To"
      >
        <FontAwesomeIcon icon={faRightLeft} className="text-gray-600" />
      </button>
    </div>
  )
}

export default SwapBtn
