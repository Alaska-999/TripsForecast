import {FC} from 'react';
import WeekDay from './WeekDay';
import './Week.css';
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {selectSelectedTrip, selectTrips} from "../../store/slices/tripsSlice.ts";

const Week: FC = () => {
    const selectedTrip = useAppSelector(selectSelectedTrip);
    const trips = useAppSelector(selectTrips);

    const findSelected = selectedTrip
        ? trips?.find(
            (trip) =>
                trip.city === selectedTrip.city &&
                trip.startDate === selectedTrip.startDate &&
                trip.endDate === selectedTrip.endDate
        )
        : null;

    const tripDays = findSelected?.tripDays;
    return (
        <div className="week">
            <h2 className="week__heading">Week</h2>
            <div className="week__days">
                {tripDays?.map((day) => {
                    return (
                        <WeekDay
                            key={day.datetime}
                            date={day.datetime}
                            tempMin={day.tempmin}
                            tempMax={day.tempmax}
                            icon={day.icon}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Week;
