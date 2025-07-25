import { createStore } from 'redux';
import reducers from '../reducer';

// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',         // key for localStorage
    storage,             // use localStorage
    whitelist: ['flights'],  // reducers you want to persist, here you persist the 'flights' slice (which is your whole stateReducer)
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export { store, persistor };
