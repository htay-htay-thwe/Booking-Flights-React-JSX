import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PriceDate = ({ t, currency, setSelectedDate, selectedDate, formData, flights }) => {
  const dates = useSelector(state => state.flights.dates || []);

  const minPrice = flights.length > 0
    ? Math.min(...flights.map(flight => flight.price))
    : 0;

  // Normalize selectedDate on first render
  useEffect(() => {
    if (!selectedDate && formData.departure_date) {
      setSelectedDate({
        dep: formData.departure_date,
        arr: formData.return_date || null,
      });
    }
  }, []);

  // Calculate window of 6 dates around selectedDate
  const visibleDates = (() => {
    const totalDates = dates.length;
    const windowSize = 6;

    const selectedDep = selectedDate?.dep || ''; // fallback if undefined
    const selectedIndex = dates.findIndex(date => date === selectedDep);

    if (selectedIndex === -1) {
      return dates.slice(0, windowSize);
    }

    let start = selectedIndex - 3;
    if (start < 0) start = 0;

    if (start + windowSize > totalDates) {
      start = Math.max(0, totalDates - windowSize);
    }

    return dates.slice(start, start + windowSize);
  })();

  // Generate 5-day range of dep/arr pairs for round trip
  const getDateRange = (departureStr, returnStr) => {
    const departure = new Date(departureStr);
    const arrival = new Date(returnStr);
    const visibleDatePairs = [];

    for (let i = -2; i <= 2; i++) {
      const newDeparture = new Date(departure);
      newDeparture.setDate(newDeparture.getDate() + i);

      const newArrival = new Date(arrival);
      newArrival.setDate(newArrival.getDate() + i);

      visibleDatePairs.push({
        dep: newDeparture.toISOString().split('T')[0],
        arr: newArrival.toISOString().split('T')[0],
      });
    }

    return visibleDatePairs;
  };

  const visibleDatePairs = (formData.tripType === 'round' && formData.return_date)
    ? getDateRange(formData.departure_date, formData.return_date)
    : [];

  return (
    <div className="py-6 px-4 w-full max-w-6xl mx-auto">
      {/* Horizontal Scrollable Dates */}
      <div className="overflow-x-auto">
        <div className="flex gap-3 justify-center whitespace-nowrap pb-3">
          {formData.tripType === 'round' ? (
            visibleDatePairs.map(({ dep, arr }) => {

              const isSelected =
                selectedDate?.dep == dep &&
                selectedDate?.arr == arr;

              return (
                <div
                  key={dep + '_' + arr}
                  onClick={() => setSelectedDate({ dep, arr })}
                  className={`cursor-pointer min-w-[140px] sm:min-w-[150px] px-4 py-3 rounded-2xl text-center border 
                    ${isSelected
                      ? "bg-blue-100 text-blue-600 border-blue-600 border-2"
                      : "bg-white text-gray-800 border-gray-300 hover:shadow"
                    }`}
                >
                  <div className="flex justify-between pl-2 pr-2">
                    <div className="text-base">
                      {new Date(dep).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div>-</div>
                    <div className="text-base">
                      {new Date(arr).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <p className="text-sm">{t('from')} {currency?.cur} {(minPrice * (currency?.rate ?? 1)).toFixed(2)}</p>
                </div>
              );
            })
          ) : (
            visibleDates.map((date) => {
              const isSelected = selectedDate?.dep === date;

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate({ dep: date, arr: null })}
                  className={`cursor-pointer min-w-[140px] sm:min-w-[150px] px-4 py-3 rounded-2xl text-center border 
                    ${isSelected
                      ? "bg-blue-100 text-blue-600 border-blue-600 border-2"
                      : "bg-white text-gray-800 border-gray-300 hover:shadow"
                    }`}
                >
                  <p className="text-base">
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm">{t('from')} {currency?.cur} {(minPrice * (currency?.rate ?? 1)).toFixed(2)}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-4 space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Flights from {flights[0]?.FromCity} to {flights[0]?.ToCity}
        </h2>
        <p className="text-sm text-gray-600">
          {t('priceDate')}
        </p>
      </div>
    </div>
  );
};

export default PriceDate;
