import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tripsReducer from './slices/tripsSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedTripsReducer = persistReducer(persistConfig, tripsReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
	reducer: {
		trips: persistedTripsReducer,
		user: persistedUserReducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
export default store;

export const persistor = persistStore(store);