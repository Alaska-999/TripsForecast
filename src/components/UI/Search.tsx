import React, {FC} from 'react';
import search from '/assets/icons/search.svg'
import './Search.css'
import {useDispatch} from "react-redux";
import {searchTrip} from "../../store/slices/tripsSlice.ts";


const Search:FC = () => {

    const dispatch = useDispatch();
    const searchTripsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchTrip(e.target.value))
    }

    return (
        <div className='search'>
            <img className='search__icon' src={search} alt='search image'/>
            <input type='text' className='search__input' placeholder='Search your trip' onChange={searchTripsHandler}/>
        </div>
    );
};

export default Search;