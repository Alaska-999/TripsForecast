import React, {FC} from 'react';

interface IFormField {
    id: string;
    type: string;
    label: string;
    handleDate: (date: string) => void;
    date: string;
    formErr: boolean
}

const FormField: FC<IFormField> = ({ date, handleDate, id, type, label, formErr }) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);
    const maxDate = currentDate.toISOString().split('T')[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        handleDate(selectedDate);
    };


    return (
        <div className='form__field'>
            <label className='form__label' htmlFor={id}>
                {formErr ? <div className='form__label-err'>*</div> : ''}
                {label}
            </label>
            <input
                className='form__input'
                value={date}
                onChange={handleChange}
                id={id}
                type={type}
                placeholder={'Select date'}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                min={new Date().toISOString().split('T')[0]}
                max={maxDate}
            />
        </div>
    );
};

export default FormField;