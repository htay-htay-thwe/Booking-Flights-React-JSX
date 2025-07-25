import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async';


function To({ t, fromErrors, loadAirports, to, handleToChange }) {
  return (
    <div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          <FontAwesomeIcon icon={faPlaneArrival} /> {t('toCity')}
        </label>

        <AsyncSelect
          cacheOptions
          loadOptions={loadAirports}
          defaultOptions
          value={to}
          onChange={handleToChange}
          placeholder={t('toCity')}
          isClearable
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? '#99A1AF' : '#99A1AF', // Tailwind gray-800
              boxShadow: state.isFocused ? '0 0 0 1px #99A1AF' : 'none',
              '&:hover': {
                borderColor: '#99A1AF',
              },
              minHeight: '42px', // match your other inputs
            }),
          }}
        />
        {fromErrors?.to && <p className='text-sm text-red-500'>{fromErrors.to}</p>}
      </div>
    </div>
  )
}

export default To
