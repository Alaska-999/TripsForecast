import React, { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCities } from '../../store/slices/tripsSlice';

interface ICustomDropdown {
	handleCity: (city: string) => void;
	formErr: boolean
}

const CustomDropdown: FC<ICustomDropdown> = ({ handleCity , formErr}) => {
	const cities = useAppSelector(selectCities);

	const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = e.target.value;
		setIsOptionSelected(selectedOption !== '');
		handleCity(selectedOption);
	};

	return (
		<div className="form__field">
			<label className="form__label" htmlFor="cities">
				{formErr ? <div className='form__label-err'>*</div> : ''}
				City
			</label>
			<label
				className={`select-placeholder ${
					isOptionSelected ? 'select-placeholder--hidden' : ''
				}`}
			>
				Please select a city
			</label>
			<select
				className="form__input"
				id="cities"
				name="cities"
				onChange={handleChange}
				defaultValue=""
				onBlur={() => setIsOptionSelected(true)}
			>
				<option disabled value="" ></option>
				{cities.map((city) => (
					<option key={city.city} value={city.city}>
						{city.city}
					</option>
				))}
			</select>
		</div>
	);
};

export default CustomDropdown;
