import {selectTrips, selectSearchTerm, setForecast, setToday, selectTrip} from '../../store/slices/tripsSlice';
import axios from 'axios';
import AddTrip from '../UI/AddTrip';
import Modal from '../Modal/Modal';
import {useState} from "react";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {ITripDay} from "../../types/types.ts";
import TripSlider from "./TripsSlider.tsx";
import {API_KEY} from "../../keys.ts";

const TripsList = () => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeTrip, setActiveTrip] = useState<{
        city: string;
        startDate: string;
        endDate: string;
    } | null>(null);

    const trips = useAppSelector(selectTrips);
    const searchTerm = useAppSelector(selectSearchTerm);
    const dispatch = useAppDispatch();

    if (!trips) {
        return <div>Loading trips...</div>;
    }

    const filteredTrips = Array.isArray(trips)
        ? trips.filter((trip) =>
            trip.city.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    filteredTrips.sort((a, b) => a.startDate.localeCompare(b.startDate));

    const handleTripActive = async (
        city: string,
        startDate: string,
        endDate: string
    ) => {
        setActiveTrip({city, startDate, endDate});

        const getWeather = async () => {
            try {
                const res = await axios.get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
                );
                const address: string = res.data.address;
                const days: ITripDay[] = res.data.days;
                if (!days) return;
                const forecastData = days.map((day: ITripDay) => ({
                    datetime: day.datetime,
                    tempmax: day.tempmax,
                    tempmin: day.tempmin,
                    icon: day.icon,
                }));
                return {address, forecastData};
            } catch (error) {
                console.error(error);
            }
        };
        const data = await getWeather()
        if(data?.address && data.forecastData) {
            dispatch(setForecast({city: data.address, tripForecast: data.forecastData}));
        }

        dispatch(selectTrip({city, startDate, endDate, tripDays: []}));

        const getTodayWeather = async () => {
            try {
                const res = await axios.get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
                );
                const {data} = res;
                const {days} = data;
                const todayData = days[0];
                const {temp, icon} = todayData;
                return {temp, icon};
            } catch (error) {
                console.error(error);
            }
        };
        const todayData = await getTodayWeather();
        if(todayData?.icon && todayData.temp) {
            dispatch(setToday({todayWeather: todayData.temp, icon: todayData.icon}));
        }
    };


    return (
        <div className="trips-list">
            <TripSlider trips={filteredTrips} handleTripActive={handleTripActive} activeTrip={activeTrip} />
            <AddTrip onClick={() => setModalVisible(true)} noTripsAvailable={filteredTrips.length === 0} />
            {isModalVisible && <Modal setModalVisible={setModalVisible} />}
        </div>
    );
};

export default TripsList;