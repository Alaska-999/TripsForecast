import Main from './components/Main/Main';
import SidePanel from './components/SidePanel/SidePanel';
import './App.css';
import {useEffect} from 'react';
import data from './data/data.json';
import {addCitiesData} from "./store/slices/tripsSlice.ts";
import {useAppDispatch} from "./hooks/useAppDispatch.ts";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(addCitiesData(data))
    }, [])

    return (
        <div className="wrapper">
            <Main/>
            <SidePanel/>
        </div>
    );
}

export default App;
