import { FC } from 'react';
import './SidePanel.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import CountDown from '../UI/CountDown/CountDown';
import { selectTodayWeather } from '../../store/slices/tripsSlice';
import { selectName, selectPicture } from '../../store/slices/userSlice';

const SidePanel: FC = () => {
	const picture = useAppSelector(selectPicture);
	const name = useAppSelector(selectName);
	const today = useAppSelector(selectTodayWeather);

	const currentDate = new Date();
	const dayOfWeekNumber = currentDate.getDay();
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

	return (
		<div className="side-panel">
			{name && (
				<img className="user-avatar" src={picture} alt="user-avatar" />
			)}
			{today && (
				<div className="today">
					<div className="today__week-day">{dayOfWeekName}</div>
					<div className="today__weather">
						<img
							src={`assets/icons/weather/${today.icon}.svg`}
							alt="weather image"
							className="today__weather-icon"
						/>
						<div className="today__temp">
							{Math.round(today.temp)}
							<sup className="today__temp--sm">{'\u00B0C'}</sup>
						</div>
					</div>
					<div className="today__trip-city">{today.city}</div>
					<CountDown startDate={today.startDate} />
				</div>
			)}
		</div>
	);
};

export default SidePanel;
