import {selectTrips, selectSearchTerm} from '../../store/slices/tripsSlice';
import AddTrip from '../UI/AddTrip';
import Modal from '../Modal/Modal';
import {useState} from "react";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import TripSlider from "./TripsSlider.tsx";

const TripsList = () => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const [activeTrip, setActiveTrip] = useState<{
        city: string;
        startDate: string;
        endDate: string;
    } | null>(null);

    const trips = useAppSelector(selectTrips);
    const searchTerm = useAppSelector(selectSearchTerm);

    if (!trips) {
        return <div>Loading trips...</div>;
    }

    const filteredTrips = Array.isArray(trips)
        ? trips.filter((trip) =>
            trip.city.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    filteredTrips.sort((a, b) => a.startDate.localeCompare(b.startDate));


    return (
        <div className="trips-list">
            <TripSlider trips={filteredTrips} activeTrip={activeTrip} setActiveTrip={setActiveTrip}/>
            <AddTrip onClick={() => setModalVisible(true)} noTripsAvailable={filteredTrips.length === 0} />
            {isModalVisible && <Modal setModalVisible={setModalVisible} />}
        </div>
    );
};

export default TripsList;