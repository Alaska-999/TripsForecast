import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {ITrip} from '../../types/types.ts';
import Trip from './Trip';
import './TripsSlider.css';
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

const TripSlider: FC<ITripsSlider> = ({
                                          trips,
                                          handleTripActive,
                                          activeTrip

                                      }) => {



    const sliderWidth = window.innerWidth <= 1800 ? 310 * Math.min(trips.length, 2) : 300 * Math.min(trips.length, 3);
    const slidesView = window.innerWidth <= 1800 ? Math.min(trips.length, 2)  : Math.min(trips.length, 3);

    return (
        <Swiper
            spaceBetween={60}
            modules={[Navigation]}
            slidesPerView={slidesView}
            className="swiper"
            navigation
            style={{width: `${sliderWidth}px`
        }}
        >
            {
                trips.map((trip) => (
                    <div>
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
                    </div>
                ))
            }
        </Swiper>
    );
};

export default TripSlider;