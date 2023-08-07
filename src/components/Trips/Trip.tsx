import TripView from "./TripView.tsx";
import {FC} from "react";
import axios from "axios";
import {API_KEY} from "../../keys.ts";
import {ITripDay} from "../../types/types.ts";
import {selectTrip, setForecast, setToday} from "../../store/slices/tripsSlice.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

interface ITripProps {
    city: string;
    startDate: string;
    endDate: string;
    image: string | undefined;
    isActive: boolean;
    setActiveTrip: (tripInfo: {
        city: string,
        startDate: string,
        endDate: string
    }) => void
}

const Trip: FC<ITripProps> = ({
                                      city,
                                      startDate,
                                      endDate,
                                      image,
                                      setActiveTrip,
                                      isActive
                                  }) => {

    const dispatch = useAppDispatch();


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
        if (data?.address && data.forecastData) {
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
        if (todayData?.icon && todayData.temp) {
            dispatch(setToday({todayWeather: todayData.temp, icon: todayData.icon}));
        }
    };

    return (
        <div>
            <TripView
                city={city}
                startDate={startDate}
                endDate={endDate}
                image={image}
                isActive={
                    isActive
                }
                onClick={() => handleTripActive(city, startDate, endDate)}
            />
        </div>
    );
};

export default Trip;