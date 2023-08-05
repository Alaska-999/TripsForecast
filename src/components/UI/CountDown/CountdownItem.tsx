import {FC} from 'react';

interface ICountdownItem {
    unit: number;
    measure: string
}


const CountdownItem:FC <ICountdownItem>= ({unit, measure} ) => {

    return (
        <div className="countdown__item">
            <div className="countdown__unit">{unit}</div>
            <div className="countdown__measure">{measure}</div>
        </div>
    );
};

export default CountdownItem;