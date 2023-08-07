import {FC} from 'react';
import './Trip.css';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {removeTrip} from '../../store/slices/tripsSlice';

interface ITripProps {
    city: string;
    startDate: string;
    endDate: string;
    image: string | undefined;
    isActive: boolean;
    onClick: () => void
}

const TripView: FC<ITripProps> = ({
                                  city,
                                  startDate,
                                  endDate,
                                  image,
                                  isActive,
                                  onClick,
                              }) => {
    const dispatch = useAppDispatch();

    const removeTripHandler = () => {
        dispatch(removeTrip({city, startDate, endDate, tripDays: []}));
    };

    return (
        <div className={`trip ${isActive ? 'trip--active' : ''}`} onClick={onClick}>
            <img className="trip__img" src={image} alt="City image"/>
            <div className="trip__delete" onClick={removeTripHandler}/>
            <div className="trip__info">
                <div className="trip__city-name">{city}</div>
                <div className="trip__dates">
                    {startDate.split('-').join('.')} - {endDate.split('-').join('.')}
                </div>
            </div>
        </div>
    );
};

export default TripView;
