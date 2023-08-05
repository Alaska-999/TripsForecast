import {FC} from 'react';
import './WeekDay.css'

interface IWeekDay {
    date: string;
    tempMin: number;
    tempMax: number;
    icon: string
}

const WeekDay: FC<IWeekDay> = ({date, tempMin, tempMax, icon}) => {
    const dateFormat = new Date(date);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[dateFormat.getDay()];

    return (
        <div className='day-weather'>
            <div className="day-weather__name">
                {dayOfWeek}
            </div>
            <img src={`/assets/icons/weather/${icon}.svg`}
                 alt='weather image'
                 className='day-weather__icon'
            />
            <div className="day-weather__temp">
                {Math.round(tempMin) + '\u00B0C' + '/' + Math.round(tempMax) + '\u00B0C'}
            </div>
        </div>
    );
};

export default WeekDay;