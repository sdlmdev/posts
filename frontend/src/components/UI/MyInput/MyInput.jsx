import React from 'react';
import './MyInput.css';

function MyInput({ ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input {...props} className={`custom-input ${props.className ? props.className : ''}`} />
  );
}

export default MyInput;
