import React from 'react';
import './css/inputLogIn.css';

const InputLogIn = ({type, name, id, className, placeholder, value, maxLength, onChange, onKeyPress, fontawesome, error}) => {
    return ( 
        <div className="form-group">
            <i className={fontawesome} htmlFor={name} aria-hidden="true"></i>
            <input 
                type={type}
                name={name}
                id={id}
                className={className}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={onChange}
                onKeyPress={onKeyPress}
                error = {error}
             />
            <div className="errorMsg">{error}</div>
        </div>
     );
}
 
export default InputLogIn;