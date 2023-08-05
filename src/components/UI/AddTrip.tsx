import {FC} from "react";
import './AddTrip.css'

interface AddTripProps {
    onClick: () => void;
}

const AddTrip: FC<AddTripProps> = ({ onClick }) => {
    return (
        <div className='add-trip-btn' onClick={onClick}>
            <img className='add-trip-btn__plus' src='../src/assets/icons/plus.svg' alt='plus'/>
            <div className="add-trip-btn__text">Add trip</div>
        </div>
    );
};

export default AddTrip