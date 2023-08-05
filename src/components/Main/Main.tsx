import {FC} from 'react';
import Search from "../UI/Search";
import Trips from "../Trips/Trips";
import Week from "../Week/Week";
import './Main.css'
import Auth from "../Auth/Auth.tsx";

const Main: FC = () => {
    return (
        <div className='main'>
            <div className="header">
            <h1 className='main__heading'>Weather
                <span className='main__heading--b'> Forecast</span>
            </h1>
                <Auth/>
            </div>
            <Search/>
            <Trips/>
            <Week/>
        </div>
    );
};

export default Main;