import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICityData, ITrip, ITripsState, IWeatherData } from '../../types/types.ts';
import { Store } from '..';

const initialState: ITripsState = {
	cities: [],
	trips: [
		{
			city: 'Kyiv',
			startDate: '2023-09-02',
			endDate: '2023-09-07',
			tripDays: [],
			image: '/assets/cities/kyiv.jpg',
		},
	],
	selectedTrip: null,
	todayWeather: null,
	searchTerm: '',
};

const tripsSlice = createSlice({
	name: 'tripsSlice',
	initialState,
	reducers: {
		addCitiesData(state, action: PayloadAction<ICityData[]>) {
			state.cities = action.payload;
		},
		setForecast(state, action: PayloadAction<IWeatherData>) {
			const { city, tripForecast } = action.payload;

			const updatedTrips = state.trips.map((trip) => {
				if (trip.city === city) {
					return { ...trip, tripDays: tripForecast };
				}
				return trip;
			});
			state.trips = updatedTrips;
		},
		selectTrip(state, action: PayloadAction<ITrip>) {
			state.selectedTrip = action.payload;
		},
		addTrip(state, action: PayloadAction<ITrip>) {
			const newTrip = action.payload;
			const isDuplicate = state.trips.find(
				(trip) =>
					trip.city === newTrip.city &&
					trip.startDate === newTrip.startDate &&
					trip.endDate === newTrip.endDate
			);
			if (isDuplicate) {
				return state;
			}
			const cityData = state.cities.find((city) => city.city === newTrip.city);
			if (cityData) {
				newTrip.image = cityData.image;
			}
			const tripsArray = Array.isArray(state.trips) ? state.trips : [];
			state.trips = [...tripsArray, newTrip];
		},
		removeTrip(state, action: PayloadAction<ITrip>) {
			const updatedTrips = state.trips.filter(
				(trip) =>
					trip.city !== action.payload.city ||
					trip.startDate !== action.payload.startDate ||
					trip.endDate !== action.payload.endDate
			);
			state.trips = updatedTrips;
		},
		setToday(
			state,
			action: PayloadAction<{ todayWeather: number; icon: string }>
		) {
			if (state.selectedTrip)
				state.todayWeather = {
					city: state.selectedTrip.city,
					startDate: state.selectedTrip.startDate,
					temp: action.payload.todayWeather,
					icon: action.payload.icon,
				};
		},
		searchTrip(state, action: PayloadAction<string>) {
			state.searchTerm = action.payload;
		},
	},
});

export const selectCities = (store: Store) => store.trips.cities;
export const selectSearchTerm = (store: Store) => store.trips.searchTerm;
export const selectSelectedTrip = (store: Store) => store.trips.selectedTrip;
export const selectTodayWeather = (store: Store) => store.trips.todayWeather;
export const selectTrips = (store: Store) => store.trips.trips;

export const {
	addCitiesData,
	setForecast,
	selectTrip,
	addTrip,
	removeTrip,
	setToday,
	searchTrip,
} = tripsSlice.actions;
export default tripsSlice.reducer;
