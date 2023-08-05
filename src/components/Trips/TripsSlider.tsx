import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {ITrip} from '../../types/types.ts';
import Trip from './Trip';
import './Trips.css'
import {FC} from "react";

interface ITripsSlider {
    trips: ITrip[];
    handleTripActive: (city: string, startDate: string, endDate: string) => void;
    activeTrip: {
        city: string;
        startDate: string;
        endDate: string;
    } | null
}

const TripSlider: FC<ITripsSlider>= ({
                        trips,
                        handleTripActive,
                        activeTrip
                    }) => {
    const sliderWidth = 300 * Math.min(trips.length, 3);

    return (
        <Swiper
            spaceBetween={60}
            modules={[Navigation]}
            slidesPerView={Math.min(trips.length, 3)}
            className="swiper"
            navigation
            style={{width: `${sliderWidth}px`}}
        >
            {trips.map((trip) => (
                <SwiperSlide key={Math.random()}>
                    <Trip
                        city={trip.city}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        image={trip.image}
                        isActive={
                            trip.city === activeTrip?.city &&
                            trip.startDate === activeTrip?.startDate &&
                            trip.endDate === activeTrip?.endDate
                        }
                        onClick={() => handleTripActive(trip.city, trip.startDate, trip.endDate)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TripSlider;