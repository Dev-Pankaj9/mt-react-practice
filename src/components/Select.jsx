import React from 'react';

const Select = ({ labelName, select_id, name, select_value, select_disabled, options, handleOnChange }) => {
    const options_jsx = options.map(({id, title, value, disabled}) => <option key={id} value={value} disabled={disabled}>{title}</option>)
    // const options_jsx = options.map(({id, title, value, disabled}) => (
    //     <option key={id} value={value} disabled={disabled} selected={value === select_value ? true : false}>{title}</option>
    // ));
    return (
        <>
            <label htmlFor={select_id}>{labelName}</label>
            <select 
                onChange={handleOnChange} 
                id={select_id} 
                name={name} 
                value={select_value} 
                disabled={select_disabled}>
                {options_jsx}
            </select>
        </>
    )
}

export default Select;