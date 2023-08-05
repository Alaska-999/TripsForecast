import {FC} from "react";
import './AddTrip.css'

interface AddTripProps {
    onClick: () => void;
    noTripsAvailable: boolean
}

const AddTrip: FC<AddTripProps> = ({onClick, noTripsAvailable}) => {
    return (
        <div className={noTripsAvailable ? "add-trip-btn--no-trips add-trip-btn" : "add-trip-btn"}  onClick={onClick}>
            <img className='add-trip-btn__plus' src='/assets/icons/plus.svg' alt='plus'/>
            <div className="add-trip-btn__text">Add trip</div>
        </div>
    );
};

export default AddTrip
//