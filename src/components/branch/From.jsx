import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async';

function From({ t, fromErrors, loadAirports, from, handleFromChange }) {
  return (
    <div>
      <div>
        <label className="block mb-1 font-medium text-gray-700 ">
          <FontAwesomeIcon icon={faPlaneDeparture} /> {t('fromCity')}
        </label>

        <AsyncSelect
          cacheOptions
          loadOptions={loadAirports}
          defaultOptions
          value={from}
          onChange={handleFromChange}
          placeholder={t('fromCity')}
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
        {fromErrors?.from && <p className='text-sm text-red-500'>{fromErrors.from}</p>}
      </div>
    </div>
  )
}

export default From
