
export interface ICityData {
	city: string;
	image: string;
}

export interface ITripDay {
	datetime: string;
	tempmin: number;
	tempmax: number;
	icon: string;
}

export interface IWeatherData {
	city: string;
	tripForecast: ITripDay[] | [];
}

export interface ITrip {
	city: string;
	startDate: string;
	endDate: string;
	tripDays: ITripDay[] | [];
	image?: string;
}

export interface ITodayWeather {
	city: string;
	startDate: string;
	temp: number;
	icon: string;
}

//state

export interface ITripsState {
	cities: ICityData[] | [];
	trips: ITrip[] | [];
	selectedTrip: ITrip | null;
	todayWeather: ITodayWeather | null;
	searchTerm: string;
}

export interface IUserProfile {
	picture: string;
	name: string;
}


//actions

// export interface IAddCitiesData {
// 	type: typeof ADD_CITIES_DATA;
// 	payload: ICityData[];
// }
//
// export interface IGetForecast {
// 	type: typeof GET_FORECAST;
// 	payload: IWeatherData;
// }
//
// export interface ISelectTrip {
// 	type: typeof SELECT_TRIP;
// 	payload: ITrip;
// }
//
// export interface IAddTrip {
// 	type: typeof ADD_TRIP;
// 	payload: ITrip;
// }
//
// export interface IRemoveTrip {
// 	type: typeof REMOVE_TRIP;
// 	payload: { city: string; startDate: string; endDate: string };
// }
//
// export interface IGetToday {
// 	type: typeof GET_TODAY;
// 	payload: { todayWeather: number; icon: string };
// }
//
// export interface ITripSearch {
// 	type: typeof SEARCH_TRIP;
// 	payload: string;
// }
//
// export interface IAddUserInfo {
// 	type: typeof SET_USER_INFO;
// 	payload: IUser;
// }
//
// export type tripsActionTypes =
// 	| IGetForecast
// 	| IAddCitiesData
// 	| IAddTrip
// 	| ISelectTrip
// 	| IGetToday
// 	| ITripSearch
// 	| IRemoveTrip;
//
// export type userActionTypes = IAddUserInfo;
