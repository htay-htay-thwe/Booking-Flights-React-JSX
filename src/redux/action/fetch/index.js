import { ActionType } from "../action"

export const fetchFlights = (flights) => ({
    type: ActionType.FETCH_AIRPORTS,
    payload: Array.isArray(flights)
        ? { tripType: 'oneway', outbound: flights, return: [] }
        : flights,
});



export const fetchDatesData = (dates) => {
    return {
        type: ActionType.FETCH_DATES,
        payload: dates
    }
}

export const fetchSelectedDate = (selectDate) => {
    return {
        type: ActionType.FETCH_SELECT_DATE,
        payload: selectDate
    }
}

export const fetchFormData = (formData) => {
    return {
        type: ActionType.FETCH_FORMDATA,
        payload: formData
    }
}

export const fetchCart = (cart) => ({
    type: ActionType.FETCH_CART_DATA,
    payload: cart
});


export const fetchCountry = (country) => {
    return {
        type: ActionType.FETCH_COUNTRY,
        payload: country
    }
}

export const fetchReserveFlight = (reserveFlight) => {
    return {
        type: ActionType.FETCH_RESERVE_FLIGHT,
        payload: reserveFlight
    }
}

export const fetchFlightCheckOut = (checkout) => {
    return {
        type: ActionType.FETCH_FLIGHT_CHECK_OUT,
        payload: checkout
    }
}

export const fetchPassenger = (passenger) => {
    return {
        type: ActionType.FETCH_PASSENGERS,
        payload: passenger
    }
}

export const fetchUser = (user) => {
    return {
        type: ActionType.FETCH_USERS,
        payload: user
    }
}

export const fetchCartOne = (cartOne) => {
    return {
        type: ActionType.FETCH_CART_ONE,
        payload: cartOne
    }
}

export const fetchOutboundFlight = (outbound) => ({
    type: ActionType.FETCH_OUTBOUND_FLIGHT,
    payload: outbound,
});

export const fetchCurrencyList = (currencyList) => ({
    type: ActionType.FETCH_CURRENCY_LIST,
    payload: currencyList,
});

export const fetchCurrency = (currency) => ({
    type: ActionType.FETCH_CURRENCY,
    payload: currency,
});

export const fetchLanguage = (language) => ({
    type: ActionType.FETCH_LANGUAGE,
    payload: language,
});

export const fetchBooking = (book) => ({
    type: ActionType.FETCH_BOOKING,
    payload: book,
});

export const fetchSeats = (seat) => ({
    type: ActionType.FETCH_SEATS,
    payload: seat,
});
