import { stateReducer } from "./state";
import { combineReducers } from "redux";

const reducers = combineReducers({
    flights : stateReducer
})

export default reducers;