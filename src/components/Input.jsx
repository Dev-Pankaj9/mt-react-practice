import React from "react";

const Input = ({ labelName,type, id, name, placeholder, value, disabled, handleOnChange }) => {
  return (
    <>
        <label htmlFor={id}>{labelName}</label>
        <input
          onChange={handleOnChange}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
        />
    </>
  );
};

export default Input;
