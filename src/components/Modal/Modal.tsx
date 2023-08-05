import React, { FC, FormEvent, useState } from 'react';
import './Modal.css';
import FormField from './FormField';
import DropDown from './DropDown';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTrip } from '../../store/slices/tripsSlice';

interface IModal {
	setModalVisible: (isVisible: boolean) => void;
}

const Modal: FC<IModal> = ({ setModalVisible }) => {
	const [city, setCity] = useState<string>('');
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [formErr, setFormErr] = useState<boolean>(false)

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};
	const dispatch = useAppDispatch();

	const handleCity = (handledCity: string) => {
		setCity(handledCity);
	};

	const handleStartDate = (start: string) => {
		setStartDate(start);
	};

	const handleEndDate = (end: string) => {
		setEndDate(end);
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (city !== '' && startDate && endDate) {
			const newTrip = {
				city,
				startDate,
				endDate,
				tripDays: [],
			};
			dispatch(addTrip(newTrip));
			setModalVisible(false);
		} else {
			setFormErr(true)
		}
	};

	const cancelHandler = () => {
		setStartDate('');
		setEndDate('');
	};

	return (
		<div className="modal" onClick={() => setModalVisible(false)}>
			<div className="modal__content" onClick={handleModalClick}>
				<div className="modal__header">
					<h2 className="modal__heading">Create trip</h2>
					<div
						className="modal__close"
						onClick={() => setModalVisible(false)}
					/>
				</div>

				<form className="form" onSubmit={submitHandler}>
					<div className="form__content">
						<DropDown
							handleCity={handleCity}
							formErr={formErr}

						/>
						<FormField
							handleDate={handleStartDate}
							date={startDate}
							id={'startDateInput'}
							type="text"
							label="Start date"
							formErr={formErr}
						/>
						<FormField
							handleDate={handleEndDate}
							date={endDate}
							id={'endDateInput'}
							type="text"
							label="End date"
							formErr={formErr}
						/>
					</div>
					<div className="modal__buttons">
						<button type="button" onClick={cancelHandler} className="button">
							Cancel
						</button>
						<button type="submit" className="button">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
