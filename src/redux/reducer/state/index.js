import { ActionType } from "../../action/action"

const initialStates = {
    flights: [],
    returnFlight: [],
    dates: [],
    cart: [],
    country: [],
    reserveFlight: [],
    checkout: [],
    passenger: [],
    user: [],
    currency: {},
    cartOne: [],
    currencyList: {},
    outbound: {},
    language: '',
    book: [],
    seat: {},
    formData: {
        from: '',
        to: '',
        departure_date: '',  // Initialize here
        return_date: '',     // Also initialize if used
        tripType: '',        // Other form fields you have
    }
}

export const stateReducer = (state = initialStates, { type, payload }) => {
    switch (type) {
        case ActionType.FETCH_AIRPORTS:
            return { ...state, flights: payload || [] };

        case ActionType.FETCH_DATES:
            return { ...state, dates: payload };

        case ActionType.FETCH_FORMDATA:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...payload
                },
            };

        case ActionType.FETCH_CART_DATA:
            return { ...state, cart: payload };

        case ActionType.FETCH_COUNTRY:
            return { ...state, country: payload };

        case ActionType.FETCH_RESERVE_FLIGHT:
            return { ...state, reserveFlight: payload };

        case ActionType.FETCH_FLIGHT_CHECK_OUT:
            return { ...state, checkout: payload };

        case ActionType.FETCH_PASSENGERS:
            return { ...state, passenger: payload };

        case ActionType.FETCH_USERS:
            return { ...state, user: payload };

        case ActionType.FETCH_CART_ONE:
            return { ...state, cartOne: payload };

        case ActionType.FETCH_OUTBOUND_FLIGHT:
            return {
                ...state, outbound: payload,
            };

        case ActionType.FETCH_CURRENCY_LIST:
            return {
                ...state, currencyList: payload,
            };

        case ActionType.FETCH_CURRENCY:
            return {
                ...state, currency: payload,
            };

        case ActionType.FETCH_LANGUAGE:
            return {
                ...state, language: payload,
            };

        case ActionType.FETCH_BOOKING:
            return {
                ...state, book: payload,
            };

        case ActionType.FETCH_SEATS:
            return {
                ...state, seat: payload,
            };

        default:
            return state;
    }
}