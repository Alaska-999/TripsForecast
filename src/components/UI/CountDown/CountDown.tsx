import {FC, useEffect, useState} from 'react';
import CountdownItem from "./CountdownItem";
import './CountDown.css'

interface ICountDown {
    startDate: string
}

const CountDown:FC<ICountDown> = ({startDate}) => {

    const [countdown, setCountdown] = useState<{
        days: number,
        hours: number,
        min: number,
        sec: number
    }>({
        days: 0,
        hours: 0,
        min: 0,
        sec: 0
    });

    const targetDateStr = startDate?.toString();
    const targetDate = new Date(targetDateStr);
    const currentDate = new Date();

    useEffect(() => {
        const interval = setInterval(() => {
            const timeDifference = targetDate.getTime() - currentDate.getTime();
            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const min = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const sec = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setCountdown({days, hours, min, sec});
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentDate, targetDate]);

    return (
        <div className="countdown">
                <CountdownItem unit={countdown.days} measure='Days'/>
                <CountdownItem unit={countdown.hours} measure='Hours'/>
                <CountdownItem unit={countdown.min} measure='Minutes'/>
                <CountdownItem unit={countdown.sec} measure='Seconds'/>

        </div>
    );
};

export default CountDown;