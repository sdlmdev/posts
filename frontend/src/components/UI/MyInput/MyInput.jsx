import React from 'react';
import './MyInput.css';

function MyInput({ longText, ...props }) {
  return (
    props.longText
      ? <textarea {...props} className={`custom-input ${props.className ? props.className : ''}`} />
      : <input {...props} className={`custom-input ${props.className ? props.className : ''}`} />
  );
}

export default MyInput;
