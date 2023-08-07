import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {ITrip} from '../../types/types.ts';
import './TripsSlider.css';
import {FC} from "react";
import Trip from "./Trip.tsx";

interface ITripsSlider {
    trips: ITrip[];
    activeTrip: {
        city: string;
        startDate: string;
        endDate: string;
    } | null;
    setActiveTrip: (tripInfo: {
        city: string,
        startDate: string,
        endDate: string
    }) => void
}

const TripSlider: FC<ITripsSlider> = ({
                                          trips,
                                          activeTrip,
                                          setActiveTrip
                                      }) => {


    const sliderWidth = window.innerWidth <= 1800 ? 310 * Math.min(trips.length, 2) : 300 * Math.min(trips.length, 3);
    const slidesView = window.innerWidth <= 1800 ? Math.min(trips.length, 2) : Math.min(trips.length, 3);

    return (
        <Swiper
            spaceBetween={60}
            modules={[Navigation]}
            slidesPerView={slidesView}
            className="swiper"
            navigation
            style={{
                width: `${sliderWidth}px`
            }}
        >
            {
                trips.map((trip) => (
                    <div key={Math.random()}>
                        <SwiperSlide>
                            <Trip
                                isActive={
                                    trip.city === activeTrip?.city &&
                                    trip.startDate === activeTrip?.startDate &&
                                    trip.endDate === activeTrip?.endDate
                                }
                                setActiveTrip={setActiveTrip}
                                city={trip.city}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                                image={trip.image}
                            />

                        </SwiperSlide>
                    </div>
                ))
            }
        </Swiper>
    );
};

export default TripSlider;