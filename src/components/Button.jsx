import React from 'react';

const Button = ({title, type ,class_names, handleOnClick}) => {
    return (
        <button 
            type={type} 
            className={`btn ${class_names}`} 
            onClick={handleOnClick || undefined}
            >
            {title}
        </button>
    )
}

export default Button;